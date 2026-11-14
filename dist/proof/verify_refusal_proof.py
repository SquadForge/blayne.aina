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


def reject_duplicate_keys(pairs):
    obj = {}
    for key, value in pairs:
        if key in obj:
            raise ValueError(f"duplicate JSON key refused: {key}")
        obj[key] = value
    return obj


def reject_non_finite_constant(token):
    raise ValueError(f"non-finite JSON constant refused: {token}")


def strict_json_loads(raw_text, max_bytes=None):
    raw_bytes = raw_text.encode("utf-8") if isinstance(raw_text, str) else raw_text
    if max_bytes is not None and len(raw_bytes) > max_bytes:
        raise ValueError(f"payload byte length {len(raw_bytes)} exceeds bound {max_bytes}")
    text = raw_bytes.decode("utf-8") if isinstance(raw_bytes, (bytes, bytearray)) else raw_text
    return json.loads(
        text,
        object_pairs_hook=reject_duplicate_keys,
        parse_constant=reject_non_finite_constant,
    )


def enforce_eisa_submission_preparse(raw_text, max_bytes=1048576, max_acts=256):
    submission = strict_json_loads(raw_text, max_bytes=max_bytes)
    if not isinstance(submission, list) or len(submission) < 1 or len(submission) > max_acts:
        raise ValueError("submission must be a non-empty array of at most 256 acts")
    stages = {act.get("stage") for act in submission if isinstance(act, dict)}
    if len(stages) > 1:
        raise ValueError("submission_mixed_stage: Fracture and Forge acts cannot be mixed")
    return submission


def resolve_ref(root_schema, ref):
    if not ref.startswith("#/"):
        raise ValueError(f"unsupported external $ref: {ref}")
    target = root_schema
    for token in ref[2:].split("/"):
        token = token.replace("~1", "/").replace("~0", "~")
        target = target[token]
    return target


def is_json_integer(value):
    return isinstance(value, int) and not isinstance(value, bool)


def is_json_number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def matches_type(value, expected_type):
    if isinstance(expected_type, list):
        return any(matches_type(value, t) for t in expected_type)
    if expected_type == "object":
        return isinstance(value, dict)
    if expected_type == "array":
        return isinstance(value, list)
    if expected_type == "string":
        return isinstance(value, str)
    if expected_type == "integer":
        return is_json_integer(value)
    if expected_type == "number":
        return is_json_number(value)
    if expected_type == "boolean":
        return isinstance(value, bool)
    if expected_type == "null":
        return value is None
    return False


def validate_draft07(instance, schema, root_schema=None, path="$"):
    if root_schema is None:
        root_schema = schema
    if "$ref" in schema:
        target = resolve_ref(root_schema, schema["$ref"])
        return validate_draft07(instance, target, root_schema, path)

    if "type" in schema and not matches_type(instance, schema["type"]):
        return [f"{path}: expected type {schema['type']}, got {type(instance).__name__}"]

    if "const" in schema and (type(instance) is not type(schema["const"]) or instance != schema["const"]):
        return [f"{path}: value does not match const {schema['const']!r}"]

    if "enum" in schema and not any(type(instance) is type(opt) and instance == opt for opt in schema["enum"]):
        return [f"{path}: value {instance!r} not in enum"]

    errors = []

    if isinstance(instance, str):
        if "minLength" in schema and len(instance) < schema["minLength"]:
            errors.append(f"{path}: string shorter than minLength {schema['minLength']}")
        if "maxLength" in schema and len(instance) > schema["maxLength"]:
            errors.append(f"{path}: string exceeds maxLength {schema['maxLength']}")
        if "pattern" in schema and re.search(schema["pattern"], instance) is None:
            errors.append(f"{path}: string {instance!r} does not match pattern {schema['pattern']}")

    if is_json_number(instance):
        if "minimum" in schema and instance < schema["minimum"]:
            errors.append(f"{path}: {instance} < minimum {schema['minimum']}")
        if "maximum" in schema and instance > schema["maximum"]:
            errors.append(f"{path}: {instance} > maximum {schema['maximum']}")

    if isinstance(instance, list):
        if "minItems" in schema and len(instance) < schema["minItems"]:
            errors.append(f"{path}: array length {len(instance)} < minItems {schema['minItems']}")
        if "maxItems" in schema and len(instance) > schema["maxItems"]:
            errors.append(f"{path}: array length {len(instance)} > maxItems {schema['maxItems']}")
        if "items" in schema:
            for idx, item in enumerate(instance):
                errors.extend(validate_draft07(item, schema["items"], root_schema, f"{path}[{idx}]"))

    if isinstance(instance, dict):
        if "minProperties" in schema and len(instance) < schema["minProperties"]:
            errors.append(f"{path}: object has fewer than {schema['minProperties']} properties")
        if "maxProperties" in schema and len(instance) > schema["maxProperties"]:
            errors.append(f"{path}: object exceeds maxProperties {schema['maxProperties']}")
        for req_key in schema.get("required", []):
            if req_key not in instance:
                errors.append(f"{path}: missing required property '{req_key}'")
        if "propertyNames" in schema:
            for prop_key in instance:
                errors.extend(validate_draft07(prop_key, schema["propertyNames"], root_schema, f"{path}.<key:{prop_key}>"))
        props = schema.get("properties", {})
        addl = schema.get("additionalProperties", True)
        for key, val in instance.items():
            if key in props:
                errors.extend(validate_draft07(val, props[key], root_schema, f"{path}.{key}"))
            elif addl is False:
                errors.append(f"{path}: additional property '{key}' is not permitted")
            elif isinstance(addl, dict):
                errors.extend(validate_draft07(val, addl, root_schema, f"{path}.{key}"))

    if "oneOf" in schema:
        matches = sum(1 for branch in schema["oneOf"] if not validate_draft07(instance, branch, root_schema, path))
        if matches != 1:
            errors.append(f"{path}: matched {matches} branches of oneOf (expected exactly 1)")

    if "allOf" in schema:
        for branch in schema["allOf"]:
            errors.extend(validate_draft07(instance, branch, root_schema, path))

    if "if" in schema and "then" in schema:
        if not validate_draft07(instance, schema["if"], root_schema, path):
            errors.extend(validate_draft07(instance, schema["then"], root_schema, path))

    return errors


def assert_closed_objects_recursively(node, schema_name, path="$"):
    if isinstance(node, dict):
        if node.get("type") == "object" and "additionalProperties" not in node:
            fail(f"{schema_name} ({path}): object declaration missing explicit additionalProperties policy")
        for key, value in node.items():
            assert_closed_objects_recursively(value, schema_name, f"{path}.{key}")
    elif isinstance(node, list):
        for idx, item in enumerate(node):
            assert_closed_objects_recursively(item, schema_name, f"{path}[{idx}]")


def load(relative):
    path = ROOT / relative
    try:
        return strict_json_loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as error:
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
    schema_paths = sorted((ROOT / "schemas").glob("*.json"))
    if len(schema_paths) != 12:
        fail(f"schemas: expected exactly 12 declarations, found {len(schema_paths)}")
    loaded_schemas = {}
    for path in schema_paths:
        try:
            schema_obj = strict_json_loads(path.read_text(encoding="utf-8"))
            loaded_schemas[path.name] = schema_obj
            assert_closed_objects_recursively(schema_obj, path.name)
        except (OSError, ValueError) as error:
            fail(f"schemas/{path.name}: {error}")

    eisa = loaded_schemas.get("squad.eisa.act_envelope.v1.json", {})
    expected_keys = ["version", "stage", "actor", "opcode", "operands", "evidenceRefs", "confidence", "boundedReason", "sourceEvent", "artifactHash"]
    expected_opcodes = [
        "BindEvidenceTag",
        "RequestHumanReview",
        "RejectUnlawfulAct",
        "AssertLayoutRelation",
        "AssertDuplicatePair",
        "AssertTransitiveClosure",
        "ProposePartition",
    ]
    if eisa.get("required") != expected_keys or eisa.get("additionalProperties") is not False:
        fail("schemas: EISA envelope does not match the exact ten-key contract")
    if eisa.get("properties", {}).get("opcode", {}).get("enum") != expected_opcodes:
        fail("schemas: EISA opcode enum does not match the 7 closed opcodes")

    lease = loaded_schemas.get("squad.lease.declarations.v1.json", {})
    expected_map = {"File": "file://", "Session": "session://", "Window": "window://", "Account": "account://", "Focus": "focus://", "Browser": "browser://"}
    if lease.get("namespace_prefix_map") != expected_map:
        fail("schemas: lease namespace map mismatch")

    # Validate published conformance manifests directly against squad.conformance.manifest.v1.json
    conf_schema = loaded_schemas.get("squad.conformance.manifest.v1.json", {})
    for manifest_rel in ("conformance/conformance_45_manifest.json", "conformance/evidence_20_manifest.json"):
        manifest_data = load(manifest_rel)
        errs = validate_draft07(manifest_data, conf_schema)
        if errs:
            fail(f"Draft-07 validation failed for {manifest_rel}: {errs[0]}")

    h64 = "a" * 64
    ev1 = "ev_" + "1" * 32
    ev2 = "ev_" + "2" * 32
    ev3 = "ev_" + "3" * 32

    def make_eisa_act(opcode, operands, stage="Fracture", refs=None, confidence=None):
        return {
            "version": "EISA_ACT_V1",
            "stage": stage,
            "actor": "agent_er_worker_01",
            "opcode": opcode,
            "operands": operands,
            "evidenceRefs": [ev1] if refs is None else refs,
            "confidence": {"bps": 9250} if confidence is None else confidence,
            "boundedReason": "Deterministic transition test vector",
            "sourceEvent": "evt_0123456789abcdef_01234567",
            "artifactHash": h64,
        }

    positive_vectors = [
        ("squad.eisa.act_envelope.v1.json", make_eisa_act("BindEvidenceTag", {"id": "bind_1", "tag": "PHONE_STRONG", "coordinates": [{"artifact": "records", "recordId": "rec_1", "pointer": "/contact/phone"}, {"artifact": "records", "recordId": "rec_2", "pointer": "/contact/phone"}]})),
        ("squad.eisa.act_envelope.v1.json", make_eisa_act("RequestHumanReview", {"id": "rev_1", "reason": "CONFLICTING_EVIDENCE", "members": ["rec_1", "rec_2"]})),
        ("squad.eisa.act_envelope.v1.json", make_eisa_act("RejectUnlawfulAct", {"id": "rej_1", "rejected": h64, "fault": "counterevidence_suppressed"})),
        ("squad.eisa.act_envelope.v1.json", make_eisa_act("AssertLayoutRelation", {"id": "lay_1", "relation": "CONNECTS", "connector": ev1, "from": ev2, "to": ev3}, stage="Forge", refs=[ev1, ev2, ev3])),
        ("squad.eisa.act_envelope.v1.json", make_eisa_act("AssertDuplicatePair", {"id": "dup_12", "pair": ["rec_1", "rec_2"], "support": ["bind_1"], "counter": []})),
        ("squad.eisa.act_envelope.v1.json", make_eisa_act("AssertTransitiveClosure", {"id": "tr_13", "pair": ["rec_1", "rec_3"], "chain": ["dup_12", "dup_23"]})),
        ("squad.eisa.act_envelope.v1.json", make_eisa_act("ProposePartition", {"id": "part_1", "groups": [["rec_1", "rec_2"], ["rec_3"]], "support": ["dup_12"]}, confidence={})),
        ("squad.requested_act.v1.json", {"schema": 1, "environment_id": "env_win_01", "worker": "worker_01", "actor": "agent_01", "task_binding": {"task_id": "t_1", "session_id": "s_1", "room_id": "r_1", "wake_digest": h64}, "source": {"source_revision": "doc_1", "view_digest": h64, "case_digest": h64}, "source_generation": 1, "source_tenancy": {"scope": "file://contacts.db", "task": "t_1", "generation": 1, "control_epoch": 1}, "act": {"key": "1", "key_field": "id", "destination": {"action": "field_change", "destination": "sqlite.records", "target": "contacts.db#contacts#id=1", "fields": {"note": "Controller fixed value"}, "expected_version": 1, "content_sha256": h64, "version_after": 2}}}),
        ("squad.evidence_ref.v1.json", {"version": 1, "source_revision": "doc_rev_01", "view_digest": h64, "node_id": "node_01", "selector": {"kind": "bounded_subrange", "unit": "unicode_scalar", "start": 0, "end": 26}, "source_native_locator": {"page": 1, "byte_offset": 0, "byte_length": 26}, "role": "supporting", "visibility": "all", "origin": "room_captured"}),
        ("squad.lease.declarations.v1.json", {"namespace": "File", "resource_id": "contacts.db"}),
        ("squad.breakglass.epoch_state.v1.json", {"sequence": 4, "scopes": {"machine": 2, "agent:worker_01": 4}}),
        ("squad.breakglass.latch.v1.json", {"kind": "breakglass_latch", "id": "latch_01", "scope": "machine", "by": "operator", "reason": "Emergency containment", "engaged_utc": "2026-11-01T15:00:00Z", "active_processes_quiesced": True, "unresolved_effects_count": 0}),
        ("squad.breakglass.recovery.v1.json", {"kind": "recovery_intent", "by": "operator", "reason": "Verified clean state", "scope": "machine", "new_epoch": 5, "carried_forward_operations": [], "state_disposition": "CLEARED"}),
        ("squad.conformance.manifest.v1.json", load("conformance/conformance_45_manifest.json")),
        ("squad.evidence.handle.v1.json", {"handle": ev1, "envelope": {"version": 1, "source_revision": "doc_01", "view_digest": h64, "node_id": "n_1", "selector": {"kind": "whole_node"}}, "issuance": {"room": "room_01", "recipient": "agent_01", "issued_utc": "2026-11-01T15:00:00Z", "first_hand_origin": True}}),
        ("squad.evidence.receipt.v1.json", {"receipt": "srv_" + "b" * 32, "room": "room_01", "source_revision": "doc_01", "view_digest": h64, "recipient": "agent_01", "delivery": {"status": "complete", "offset": 0, "delivered_chars": 65, "total_chars": 65, "next_offset": None}}),
        ("squad.evidence.view.v1.json", {"view_digest": h64, "room": "room_01", "source_revision": "doc_01", "source_sha256": h64, "parser": {"name": "aina_pdf", "profile": "strict_v1", "digest": h64}, "config": {"limits_sha256": h64}, "stories": [], "elements": [], "omissions": []}),
        ("squad.package.result.v3.json", {"schema": "squad-package-result-v3", "status": "passed", "built_at": "2026-11-01T15:38:18Z", "target": "x86_64-pc-windows-msvc", "build": {"dist": "dist/squad.exe", "skill": "squad", "verified_source_sha256": h64, "conformance": {"ok": True, "total": 45, "failed": 0, "cases": [{"id": "c1"}]}}}),
    ]

    for schema_name, instance in positive_vectors:
        errs = validate_draft07(instance, loaded_schemas[schema_name])
        if errs:
            fail(f"positive Draft-07 test failed for {schema_name}: {errs[0]}")

    negative_vectors = [
        ("EISA float confidence refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("BindEvidenceTag", {"id": "bind_1", "tag": "PHONE_STRONG", "coordinates": [{"artifact": "records", "recordId": "rec_1", "pointer": "/a"}, {"artifact": "records", "recordId": "rec_2", "pointer": "/a"}]}, confidence=0.95)),
        ("EISA bps > 10000 refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("BindEvidenceTag", {"id": "bind_1", "tag": "PHONE_STRONG", "coordinates": [{"artifact": "records", "recordId": "rec_1", "pointer": "/a"}, {"artifact": "records", "recordId": "rec_2", "pointer": "/a"}]}, confidence={"bps": 10001})),
        ("EISA unknown top-level field refused", "squad.eisa.act_envelope.v1.json", {**make_eisa_act("RequestHumanReview", {"id": "r1", "reason": "SOURCE_DEFECT", "members": ["rec_1"]}), "extra": 1}),
        ("EISA opcode/operand mismatch refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("BindEvidenceTag", {"id": "r1", "reason": "SOURCE_DEFECT", "members": ["rec_1"]})),
        ("EISA opcode/stage mismatch refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("AssertLayoutRelation", {"id": "lay_1", "relation": "CONNECTS", "connector": ev1, "from": ev2, "to": ev3}, stage="Fracture", refs=[ev1, ev2, ev3])),
        ("EISA inferential tag in BindEvidenceTag refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("BindEvidenceTag", {"id": "bind_1", "tag": "TRANSITIVE_CLOSURE_APPLIED", "coordinates": [{"artifact": "records", "recordId": "rec_1", "pointer": "/a"}, {"artifact": "records", "recordId": "rec_2", "pointer": "/a"}]})),
        ("EISA unregistered fault code refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("RejectUnlawfulAct", {"id": "rej_1", "rejected": h64, "fault": "made_up_fault_code"})),
        ("EISA pointer depth > 8 refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("BindEvidenceTag", {"id": "bind_1", "tag": "PHONE_STRONG", "coordinates": [{"artifact": "records", "recordId": "rec_1", "pointer": "/t1/t2/t3/t4/t5/t6/t7/t8/t9"}, {"artifact": "records", "recordId": "rec_2", "pointer": "/a"}]})),
        ("EISA invalid RFC 6901 ~2 escape refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("BindEvidenceTag", {"id": "bind_1", "tag": "PHONE_STRONG", "coordinates": [{"artifact": "records", "recordId": "rec_1", "pointer": "/bad~2escape"}, {"artifact": "records", "recordId": "rec_2", "pointer": "/a"}]})),
        ("EISA chain > MAX_CHAIN (4) refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("AssertTransitiveClosure", {"id": "tr_1", "pair": ["rec_1", "rec_6"], "chain": ["d1", "d2", "d3", "d4", "d5"]})),
        ("EISA evidenceRefs > MAX_REFS (16) refused", "squad.eisa.act_envelope.v1.json", make_eisa_act("RequestHumanReview", {"id": "r1", "reason": "SOURCE_DEFECT", "members": ["rec_1"]}, refs=[ev1] * 17)),
        ("RequestedAct float field refused", "squad.requested_act.v1.json", {**positive_vectors[7][1], "act": {**positive_vectors[7][1]["act"], "destination": {**positive_vectors[7][1]["act"]["destination"], "fields": {"score": 1.25}}}}),
        ("EvidenceRef selector > 4 MiB refused", "squad.evidence_ref.v1.json", {**positive_vectors[8][1], "selector": {"kind": "bounded_subrange", "unit": "unicode_scalar", "start": 0, "end": 4194305}}),
        ("TypedScope unknown namespace refused", "squad.lease.declarations.v1.json", {"namespace": "Registry", "resource_id": "hkcu"}),
        ("EpochState negative sequence refused", "squad.breakglass.epoch_state.v1.json", {"sequence": -1, "scopes": {}}),
        ("BreakGlassLatch extra field refused", "squad.breakglass.latch.v1.json", {**positive_vectors[11][1], "undeclared": True}),
        ("BreakGlassRecovery invalid disposition refused", "squad.breakglass.recovery.v1.json", {**positive_vectors[12][1], "state_disposition": "BYPASSED"}),
        ("ConformanceManifest published=true refused", "squad.conformance.manifest.v1.json", {**positive_vectors[13][1], "candidate": {**positive_vectors[13][1]["candidate"], "published": True}}),
        ("EvidenceHandle bad prefix refused", "squad.evidence.handle.v1.json", {**positive_vectors[14][1], "handle": "srv_" + "1" * 32}),
        ("EvidenceReceipt bad prefix refused", "squad.evidence.receipt.v1.json", {**positive_vectors[15][1], "receipt": "ev_" + "b" * 32}),
        ("EvidenceView short digest refused", "squad.evidence.view.v1.json", {**positive_vectors[16][1], "view_digest": "abc"}),
        ("PackageResult invalid status refused", "squad.package.result.v3.json", {**positive_vectors[17][1], "status": "unknown"}),
    ]

    for label, schema_name, bad_instance in negative_vectors:
        errs = validate_draft07(bad_instance, loaded_schemas[schema_name])
        if not errs:
            fail(f"negative Draft-07 test failed to reject: {label} ({schema_name})")

    # Pre-parse & serialization bound negative tests (Layer 1)
    preparse_checks = 0
    try:
        strict_json_loads('{"a": 1, "a": 2}')
        fail("pre-parse: duplicate JSON key was not refused")
    except ValueError:
        preparse_checks += 1
    try:
        strict_json_loads("b" * 4097, max_bytes=4096)
        fail("pre-parse: oversized payload was not refused")
    except ValueError:
        preparse_checks += 1
    try:
        enforce_eisa_submission_preparse("[]")
        fail("pre-parse: empty EISA submission array was not refused")
    except ValueError:
        preparse_checks += 1
    try:
        enforce_eisa_submission_preparse(json.dumps([positive_vectors[0][1], positive_vectors[3][1]]))
        fail("pre-parse: mixed Fracture/Forge stage submission was not refused")
    except ValueError:
        preparse_checks += 1

    if not ERRORS:
        print(
            f"PASS: {len(schema_paths)} public-safe schema declarations "
            f"(recursive additionalProperties closure verified; "
            f"{len(positive_vectors)}/{len(positive_vectors)} positive & "
            f"{len(negative_vectors) + preparse_checks}/{len(negative_vectors) + preparse_checks} negative Draft-07 + pre-parse bound tests passed)"
        )


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
