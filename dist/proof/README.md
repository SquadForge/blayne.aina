# AINA Refusal & Conformance Proof Bundle

This bundle provides public, offline-verifiable evidence for deterministic refusal behavior and unchanged protected destinations. It does not publish the proprietary `squad.exe` binary or `squad-connector` engine source.

## AI-native engineering method and live evaluation

AINA is a recursive proof-of-work: Blayne built a deterministic system to govern AI agents while directing a vendor-agnostic fleet of 9 concurrent AI IDE lanes under the runtime's own confinement and verification rules. The architect holds problem selection, invariants, bounded slice decomposition, and the 45-case gate; no lane is accepted merely because its code compiles or its explanation sounds plausible.

For a live enterprise work trial, the evaluation follows five steps: operational discovery, bounded slice decomposition, dependency/lease coordination, adversarial review of plausible-but-wrong output, and deterministic verification with receipts and state hashes. A separate 15-minute `squad.exe` walkthrough can demonstrate permitted execution, `requested_act_mismatch`, and `stale_lease_generation`.

The public layer contains this evidence bundle and declaration-only schemas. The proprietary binary and core Rust implementation remain private and are demonstrated live during interviews or provided in a sanitized evaluation build under mutual NDA. TypeScript is used only as minimal glue; this repository's JavaScript and Python files provide website-build and offline-verification tooling, not the runtime implementation.

## Public repository and complete bundle

Browse or clone the public verification repository at [github.com/SquadForge/blayne.aina](https://github.com/SquadForge/blayne.aina). The complete standalone archive is [aina-refusal-proof-pack-v1.zip](aina-refusal-proof-pack-v1.zip), and portable commands are in [one_line_verify_commands.md](one_line_verify_commands.md).

## Five-second verification

From this directory, with Python 3:

```bash
python verify_refusal_proof.py
```

The verifier uses only the Python standard library. It recomputes every fixture digest, validates the refusal records, checks the fresh 45-case and 20-case manifests, parses the public schema declarations, and verifies every file listed in `SHA256SUMS.txt`.

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

## Public interface declarations

`schemas/` contains header/schema-level declarations for evidence references and serving receipts, the exact ten-key EISA act envelope, typed leases, `RequestedAct`, break-glass state, conformance reports, and package results. These files do not contain engine function bodies or implementation algorithms.

## What this establishes and what requires live diligence

This package provides real deterministic refusal receipts, fresh 45-case conformance vectors, public schema contracts, preserved fixtures, and offline cryptographic verification. To protect core intellectual property developed over 14 months, the proprietary `squad.exe` / `squad-connector` source code and executable binaries are not published; they are demonstrated live during technical interviews or provided in a sanitized evaluation build under mutual NDA.

The 45-case gate is author-controlled release qualification against declared vectors in isolated fixtures. It is not independent third-party certification, formal proof of the whole system, evidence of customer production deployment, or a claim that every refusal produces a destination digest pair.
