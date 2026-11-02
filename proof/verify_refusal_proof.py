#!/usr/bin/env python3
import hashlib
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent
ERRORS = []


def fail(message):
    ERRORS.append(message)
    print(f"FAIL: {message}")


def load(relative):
    path = ROOT / relative
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as error:
        fail(f"{relative}: {error}")
        return {}


def sha256(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def verify_case(relative):
    case = load(relative)
    if not case:
        return
    label = case.get("case_id", relative)
    if case.get("evidence_strength") == "reason_only_absent_preimage":
        if case.get("refusal_receipt", {}).get("reason_code") != "stale_lease_generation":
            fail(f"{label}: wrong reason-only refusal code")
        elif case.get("pre_attempt", {}).get("file_presence") != "absent" or case.get("post_refusal", {}).get("file_presence") != "absent":
            fail(f"{label}: absent-preimage state is inconsistent")
        else:
            print(f"PASS: {label} (reason-only; absent preimage)")
        return
    if case.get("evidence_strength") != "complete_digest_chain":
        fail(f"{label}: unknown evidence strength")
        return
    pre = case.get("pre_attempt", {})
    post = case.get("post_refusal", {})
    if pre.get("sha256") != post.get("sha256"):
        fail(f"{label}: pre/post digest mismatch")
        return
    target = case.get("protected_target", {})
    fixture_name = target.get("fixture")
    if not fixture_name:
        fail(f"{label}: fixture missing")
        return
    fixture = ROOT / "refusal" / fixture_name
    if not fixture.is_file():
        fail(f"{label}: fixture not found: {fixture_name}")
        return
    actual = sha256(fixture)
    if actual != pre.get("sha256"):
        fail(f"{label}: fixture digest differs from pre/post evidence")
    if fixture.stat().st_size != target.get("bytes"):
        fail(f"{label}: fixture byte length mismatch")
    if case.get("destination_unchanged") is not True:
        fail(f"{label}: destination_unchanged is not true")
    if case.get("refusal_receipt", {}).get("disposition") != "REFUSED":
        fail(f"{label}: refusal disposition missing")
    if not case.get("execution", {}).get("recorded_pass"):
        fail(f"{label}: execution did not record PASS")
    if not ERRORS:
        print(f"PASS: {label} ({actual})")


def verify_conformance():
    manifest = load("conformance/conformance_45_manifest.json")
    attestation = load("conformance/binary_attestation.json")
    cases = manifest.get("cases", [])
    if len(cases) != 45 or manifest.get("total_cases") != 45:
        fail("conformance: expected exactly 45 cases")
    if manifest.get("passed_cases") != 45 or manifest.get("failed_cases") != 0:
        fail("conformance: manifest is not 45/45 passing")
    if any(case.get("recorded_execution_status") != "PASS" for case in cases):
        fail("conformance: non-PASS case present")
    candidate = manifest.get("candidate", {})
    if candidate.get("published") is not False:
        fail("conformance: candidate binary must not be published")
    if candidate != attestation.get("candidate"):
        fail("conformance: candidate attestation mismatch")
    evidence = load("conformance/evidence_20_manifest.json")
    if len(evidence.get("cases", [])) != 20 or any(case.get("recorded_execution_status") != "PASS" for case in evidence.get("cases", [])):
        fail("evidence conformance: expected 20/20 PASS")
    if not ERRORS:
        print(f"PASS: conformance 45/45; evidence 20/20; candidate {candidate.get('sha256')}")


def verify_schemas():
    schemas = list((ROOT / "schemas").glob("*.json"))
    if len(schemas) < 10:
        fail(f"schemas: expected at least 10 declarations, found {len(schemas)}")
    for path in schemas:
        try:
            json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as error:
            fail(f"schemas/{path.name}: {error}")
    eisa = load("schemas/squad.eisa.act_envelope.v1.json")
    expected = ["version", "stage", "actor", "opcode", "operands", "evidenceRefs", "confidence", "boundedReason", "sourceEvent", "artifactHash"]
    if eisa.get("required") != expected or eisa.get("additionalProperties") is not False:
        fail("schemas: EISA envelope does not match the exact ten-key contract")
    lease = load("schemas/squad.lease.declarations.v1.json")
    expected_map = {"File": "file://", "Session": "session://", "Window": "window://", "Account": "account://", "Focus": "focus://", "Browser": "browser://"}
    if lease.get("namespace_prefix_map") != expected_map:
        fail("schemas: lease namespace map mismatch")
    if not ERRORS:
        print(f"PASS: {len(schemas)} public-safe schema declarations")


def verify_sums():
    sums = ROOT / "SHA256SUMS.txt"
    if not sums.is_file():
        fail("SHA256SUMS.txt is missing")
        return
    entries = []
    for line in sums.read_text(encoding="utf-8").splitlines():
        if not line.strip():
            continue
        try:
            digest, relative = line.split("  ", 1)
        except ValueError:
            fail(f"SHA256SUMS.txt malformed line: {line}")
            continue
        path = ROOT / relative
        if not path.is_file():
            fail(f"SHA256SUMS.txt missing file: {relative}")
        elif sha256(path) != digest:
            fail(f"SHA256SUMS.txt digest mismatch: {relative}")
        entries.append(relative)
    expected = {
        "verify_refusal_proof.py",
        "refusal/evidence-selector.json",
        "refusal/unleased-write.json",
        "refusal/act-pinning.json",
        "refusal/stale-generation.json",
        "conformance/conformance_45_manifest.json",
        "conformance/evidence_20_manifest.json",
        "conformance/conformance-output.json",
        "conformance/binary_attestation.json",
    }
    if not expected.issubset(entries):
        fail(f"SHA256SUMS.txt missing required entries: {sorted(expected.difference(entries))}")
    if not ERRORS:
        print(f"PASS: {len(entries)} files match SHA256SUMS.txt")


def verify_sanitization():
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in {".json", ".md", ".txt", ".py"}:
            continue
        text = path.read_text(encoding="utf-8")
        windows_path = re.search(r"(?i)(?<![A-Za-z0-9+.-])[A-Za-z]:[\\/](?:users|windows|temp|tmp|program files|programdata)[\\/]", text)
        unix_user_path = re.search(r"/Users/[A-Za-z0-9_.-]+", text)
        if windows_path or unix_user_path or ("PRIVATE " + "KEY-----") in text:
            fail(f"sanitization: local path or private key material in {path.relative_to(ROOT)}")
    if not ERRORS:
        print("PASS: no local paths or private key material detected")


def main():
    print(f"Verifying AINA refusal and conformance bundle at {ROOT}")
    verify_case("refusal/evidence-selector.json")
    verify_case("refusal/unleased-write.json")
    verify_case("refusal/act-pinning.json")
    verify_case("refusal/stale-generation.json")
    verify_conformance()
    verify_schemas()
    verify_sums()
    verify_sanitization()
    if ERRORS:
        print(f"\n{len(ERRORS)} verification error(s) found.")
        return 1
    print("\nAll refusal, fixture, schema, conformance, integrity, and sanitization checks passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
