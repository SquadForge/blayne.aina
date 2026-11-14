# AINA Refusal & Conformance Proof Bundle

This bundle provides public, offline-verifiable evidence for deterministic refusal behavior and unchanged protected destinations. It does not publish the proprietary `squad.exe` binary or `squad-connector` engine source.

## AI-native engineering method and independent peer review

AINA is a recursive proof-of-work: Blayne built a deterministic system to govern AI agents while directing a vendor-agnostic fleet of 9 concurrent AI IDE lanes under the runtime's own confinement and verification rules. The architect holds problem selection, invariants, bounded slice decomposition, and the 45-case gate; no lane is accepted merely because its code compiles or its explanation sounds plausible.

For independent technical peer review and R&D due diligence, evaluation follows five steps: threat-model and boundary discovery, bounded slice decomposition, dependency/lease coordination, adversarial review of plausible-but-wrong output, and deterministic verification with receipts and state hashes. A 15–45 minute live `squad.exe` walkthrough can demonstrate permitted execution, `requested_act_mismatch`, and `stale_lease_generation`.

The public layer contains this evidence bundle and bounded schema declarations. The proprietary binary and core Rust implementation remain private and are demonstrated live during technical peer review and R&D due diligence or provided in a sanitized evaluation build under mutual NDA. TypeScript is used only as minimal glue; this repository's JavaScript and Python files provide website-build and offline-verification tooling, not the runtime implementation.

## Public repository and complete bundle

Browse or clone the public verification repository at [github.com/SquadForge/blayne.aina](https://github.com/SquadForge/blayne.aina). The complete standalone archive is [aina-refusal-proof-pack-v1.zip](aina-refusal-proof-pack-v1.zip), and portable commands are in [one_line_verify_commands.md](one_line_verify_commands.md).

## Five-second verification

From this directory, with Python 3:

```bash
python verify_refusal_proof.py
```

The verifier uses only the Python standard library. It performs three distinct categories of offline verification:
1. **Checksum Manifest Integrity (`39/39` files):** Verifies that all 39 published files in `proof/` match their recorded SHA-256 digests in `SHA256SUMS.txt` and contain no local paths or private key material.
2. **Refusal Fixture & Manifest Consistency (`4/4` refusal records; `45/45` conformance & `20/20` evidence manifests):** Recomputes the SHA-256 digests and exact byte lengths of the 3 static fixtures (`er-repeat.txt`, `ungated.txt`, `contacts.db`) to verify `pre_attempt.sha256 == post_refusal.sha256 == actual_fixture_sha256`, checks the absent-preimage `stale-generation.json` receipt, and verifies the 45-case and 20-case manifests against candidate attestation.
3. **Recursive Draft-07 Schema & Pre-Parse Bound Validation Suite (`12/12` schemas; `18/18` positive & `26/26` negative tests):** Recursively checks every object declaration across all 12 schemas for explicit `additionalProperties` closure, validates `conformance_45_manifest.json` and `evidence_20_manifest.json` against `squad.conformance.manifest.v1.json`, and runs 18 positive and 26 negative test vectors exercising all 12 schemas, all 7 closed `EISA` opcodes (`BindEvidenceTag`, `RequestHumanReview`, `RejectUnlawfulAct`, `AssertLayoutRelation`, `AssertDuplicatePair`, `AssertTransitiveClosure`, `ProposePartition`), RFC 6901 pointer depth (`MAX_POINTER_DEPTH = 8`), integer basis-point bounds (`0..10000`), duplicate JSON key rejection, and pre-parse byte ceilings.

Hardware-rooted cryptographic signature attestation of receipt authorship (`Authenticated PCNA v2`) and third-party live runtime reproduction are separate assurance layers addressed in our R&D roadmap (`PRJ-LC-01`) and live evaluation sessions.

## Complete unchanged-destination chains

- `refusal/evidence-selector.json`: an out-of-bounds citation selector is refused with `selector_out_of_bounds`; `er-repeat.txt` retains the same 65 bytes and SHA-256 before and after.
- `refusal/unleased-write.json`: a write attempted after lease release is refused; `ungated.txt` retains the same 3 bytes and SHA-256. Its pre-attempt identity comes from the gated seed/release baseline; its post-refusal bytes were independently captured.
- `refusal/act-pinning.json`: a worker substitutes `Unrequested but valid value` for the controller-fixed `Controller fixed value`. The runtime emits `requested_act_mismatch`, records zero effects, and leaves `contacts.db` at the same 16,384 bytes and SHA-256.

`refusal/stale-generation.json` is intentionally reason-only: the stale request is refused before target creation. No nonexistent preimage or artificial digest is claimed.

Quarantine is not universal. These refusals occur before destination mutation, so the records explicitly show where no Amber destination-payload capture exists. The act-pinning divergence is preserved in its committed refusal receipt.

## Conformance evidence

- `conformance/conformance_45_manifest.json`: all 45 fresh candidate-binary cases with expected and observed results.
- `conformance/evidence_20_manifest.json`: the 20 evidence-acceptance cases.
- `conformance/conformance-output.json`: sanitized fresh execution transcript.
- `conformance/binary_attestation.json`: candidate identity and execution binding.

The fresh run passed 45/45 cases in 118.753576 seconds. Candidate `squad.exe` is 56,239,616 bytes with SHA-256 `94d26802c3744182a6cb93ac4e47250c6140b6ff92e0902a7c415ab13e59f4b5`. The binary is attested, not distributed.

**Note on Fault-Class Coverage:** The 45 conformance cases in `conformance_45_manifest.json` represent end-to-end execution boundary scenarios (several exercising compound EISA fault classes simultaneously), whereas the 47 individual EISA fault classes registered in §03 are covered across combine-level and crate-level unit suites.

## Public interface declarations and Three Enforcement Layers

`schemas/` contains bounded JSON Schema declarations for evidence references and serving receipts, the exact ten-key EISA act envelope (`squad.eisa.act_envelope.v1.json`: closed 7-opcode stage-and-operand bindings, 15 non-inferential evidence tags, 47 registered fault codes, RFC 6901 8-token pointer depth, integer-only basis-point confidence bounds `0..10000`, and explicit string/array/byte ceilings), typed leases, `RequestedAct`, break-glass state, conformance reports, and package results. Bounds are enforced across three explicit layers:
1. **Layer 1 (Pre-Parse & Serialization Bounds):** Stream byte caps (`MAX_SUBMISSION_BYTES = 1,048,576`, `MAX_REQUESTED_ACT_BYTES = 65,536`, `MAX_EVIDENCE_REF_BYTES = 4,096`), `MAX_ACTS = 256`, single-stage submission homogeneity, duplicate JSON key rejection, and non-finite number rejection.
2. **Layer 2 (Draft-07 JSON Schema Validation):** Recursive `additionalProperties: false` closure, 7-opcode `allOf` stage/operand binding, 15-tag and 47-fault enums, `MAX_POINTER_DEPTH = 8` regex, and integer/array/string bounds.
3. **Layer 3 (Runtime Four-Gate Recognizer & OS Kernel Confinement):** Sealed `eisacase_<32hex>` checks (`MAX_CASE_BYTES = 4,194,304`, `MAX_CASE_RECORDS = 1,000`), 12 deterministic comparators (`MAX_VALUE_CHARS = 1,024`), acyclic DAG & Disjoint-Set Union-Find partition verification, and Windows NT kernel process/handle confinement (`CreateProcessW(CREATE_SUSPENDED)` + `PssCaptureSnapshot`).

## What this establishes and what requires live diligence

This package provides real deterministic refusal receipts, fresh 45-case conformance vectors, public schema contracts, preserved fixtures, and offline cryptographic digest and Draft-07 schema verification. To protect core intellectual property developed over 14 months, the proprietary `squad.exe` / `squad-connector` source code and executable binaries are not published; they are demonstrated live during technical peer review and R&D due diligence or provided in a sanitized evaluation build under mutual NDA.

The 45-case gate is author-controlled release qualification against declared vectors in isolated fixtures. It is not independent third-party certification, formal proof of the whole system, evidence of customer production deployment, or a claim that every refusal produces a destination digest pair.
