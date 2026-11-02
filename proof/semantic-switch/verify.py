#!/usr/bin/env python3
"""Reproduce the public Semantic Switch relation-isomorphism proof pack."""
import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


def run(command, *, allow_failure=False):
    proc = subprocess.run(command, capture_output=True, text=True)
    if proc.returncode != 0 and not allow_failure:
        raise RuntimeError(
            f"Command failed ({proc.returncode}): {' '.join(map(str, command))}\n"
            f"stdout: {proc.stdout}\nstderr: {proc.stderr}"
        )
    return proc


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--binary", required=True, help="Path to semantic-switch executable")
    args = parser.parse_args()
    binary = Path(args.binary).resolve()
    if not binary.is_file():
        parser.error(f"binary not found: {binary}")

    fixture = Path(__file__).resolve().parent
    work = Path(tempfile.mkdtemp(prefix="semantic-switch-public-proof-"))
    try:
        key = work / "stage1.key"
        key.write_bytes(os.urandom(32))
        verification = {}
        for side in ("A", "B"):
            run_dir = work / f"run-{side}"
            run([
                str(binary), "stage1-prepare",
                "--input", str(fixture / f"input_{side}.json"),
                "--blocks", str(fixture / f"blocks_{side}.jsonl"),
                "--key-file", str(key),
                "--release", "invariance-v1",
                "--out", str(run_dir),
            ])
            receipt = json.loads(run([
                str(binary), "stage1-verify",
                "--run", str(run_dir),
                "--key-file", str(key),
            ]).stdout)
            verification[side] = {
                "verification": receipt.get("verification"),
                "native_records_accounted_for": receipt.get("native_records_accounted_for"),
                "source_blocks": receipt.get("source_blocks"),
                "field_values": receipt.get("field_values"),
            }

        run([
            sys.executable, str(fixture / "harness" / "fingerprint.py"),
            str(work / "run-A"), str(work / "run-B"),
            str(fixture / "fixture.json"), str(work / "iso.result.json"),
        ], allow_failure=True)
        run([
            sys.executable, str(fixture / "harness" / "relation_audit.py"),
            str(work / "run-A"), str(fixture / "input_A.json"),
            str(fixture / "fixture.json"), str(work / "iso.relations.json"),
        ])

        result = json.loads((work / "iso.result.json").read_text(encoding="utf-8"))
        relations = json.loads((work / "iso.relations.json").read_text(encoding="utf-8"))
        passed = (
            result.get("pass") is True
            and result.get("blocks") == 20
            and result.get("isomorphic_blocks") == 20
            and result.get("failed_blocks") == 0
            and relations.get("relation_preserved_total") == relations.get("eligible_relations") == 23
        )
        summary = {
            "schema": "SEMANTIC_SWITCH_PUBLIC_REPRODUCTION_V1",
            "binary_sha256": hashlib.sha256(binary.read_bytes()).hexdigest(),
            "verification": verification,
            "invariance": {k: result.get(k) for k in ("pass", "blocks", "isomorphic_blocks", "failed_blocks")},
            "eligible_native_relations": relations.get("eligible_relations"),
            "exact_native_relations_preserved": relations.get("relation_preserved_total"),
            "provider_calls": 0,
            "pass": passed,
        }
        print(json.dumps(summary, indent=2))
        return 0 if passed else 1
    except Exception as exc:
        print(json.dumps({"pass": False, "error": str(exc)}, indent=2))
        return 1
    finally:
        shutil.rmtree(work, ignore_errors=True)


if __name__ == "__main__":
    raise SystemExit(main())
