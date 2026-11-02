---
title: "Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine"
subtitle: "A backup can restore a clean state. It cannot explain what happened afterward. Recovery needs a certified baseline and a separate forensic history."
author: "Blayne Aina"
datePublished: "2026-10-31T13:00:00-06:00"
dateModified: "2026-10-31T19:30:00-06:00"
canonicalUrl: "https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/"
series: "From Proposal to Consequence: The AINA Transition-Governance Series"
position: 6
description: "Why single-tier undo fails autonomous agents: certified Primary baselines, content-addressed Amber forensics, fail-closed checkout, bypass detection, and ungated quarantine."
keywords:
  - rollback is not erasure
  - dual-tier vault architecture
  - forensic quarantine
  - ungated write quarantine
  - forensic recovery architecture
  - baseline certification
  - non-erasure recovery
  - fail-closed checkout
  - content-addressed storage
  - out-of-band write detection
  - provenance laundering prevention
  - agent recovery architecture
isAccessibleForFree: true
inLanguage: en-US
---

# Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine

*A backup can restore a clean state. It cannot explain what happened afterward. Recovery needs a certified baseline and a separate forensic history.*

**By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026**

---

A backup can tell you where to go back to. It cannot tell you what happened afterward.

An autonomous agent edits a file five times, an external process changes it a sixth, and the framework “rolls back” by overwriting the file with its only snapshot. The clean baseline is gone. The intermediate states are gone. The unauthorized write is gone from the audit story. The system now looks exactly as it did before anything happened—which is precisely the evidence it needed to preserve.

**Rollback is not erasure.** Restoring a clean file is one state transition. Preserving what occurred is another obligation. A governed recovery system needs both:

- a trusted operational baseline for recovery;
- an evidence-preserving account of every intermediate and ungated state for forensics.

Article 05 proved current ownership at the write window. Article 06 makes recovery equally rigorous: certified checkout capture, dual-tier raw-byte vaults, replay-bound versions, bypass observation, release quarantine, and governed restoration.

> **The baseline tells you where to revert. The vaults tell you why you may trust it—and what you must not pretend never happened.**

## 1. Why Single-Tier Undo Fails

Single-slot backup systems fail in two distinct ways.

### Failure 1: The baseline is overwritten by the task itself

```text
checkout → snapshot state 0
edit 1   → overwrite snapshot with state 1
edit 2   → overwrite snapshot with state 2
edit 3   → overwrite snapshot with state 3
```

The task has an undo button but no state 0 left. Worse, it cannot explain how state 3 was reached or which intermediate state was valid.

AINA keeps the Primary pre-checkout baseline intact and accumulates each mutation as a new content-addressed Amber object. N edits under one checkout produce N recoverable Amber states without consuming the Primary anchor.

### Failure 2: Ungated content becomes a trusted post-edit state

An external process changes the file while a lease is active. At release, the system archives the current bytes as if the agent wrote them through the governed path. Provenance has been laundered: unauthorized content now looks like a legitimate post-edit artifact.

AINA compares live bytes with the last authorized state. A mismatch becomes `quarantine_ungated`, emits `released_with_ungated_content`, and returns `content_mismatch: true`. The divergent bytes remain on disk for inspection; they are not silently restored or deleted.

## 2. The Dual-Tier Separation

Primary and Amber are not two copies of one backup. They answer different questions and have different failure and custody properties.

### Exhibit 6.1 — Dual-tier operational separation

```text
                         CHECKOUT INVOCATION
                                  │
                    Lease + kernel handle acquired
                                  │
                     save_checkout_copy(verified bytes)
                       ┌──────────┴──────────┐
                       ▼                     ▼
              PRIMARY OPERATIONAL VAULT   AMBER FORENSIC VAULT
       .squad/vault/<fnv1a_16hex>/      $AMBER_VAULT/objects/<hex2>/<sha256>.obj
       ├─ versioned raw bytes           ├─ raw content-addressed bytes
       ├─ adjacent .sha256 sidecar      ├─ deduplicated by content
       ├─ create_new + sync_all         ├─ atomic write + exact readback
       ├─ PRIMARY_KEEP = 100            ├─ append-only amber.jsonl
       └─ bound by vault.jsonl replay   └─ quarantine and per-edit states
                       │                     │
                       └──────────┬──────────┘
                                  ▼
                  certified baseline + complete forensic history
```

Primary is the bounded operational store for rapid rollback. Amber is the append-oriented, content-addressed forensic store for checkout, edit snapshots, post-edit states, native consistent snapshots, and quarantine. “Append-oriented” describes its write model, not deletion-proof immutability; storage survival is a separate custody question addressed below.

## One Checkout, Six Mutations, Two Truths

Consider one file checked out for remediation:

1. **Certified checkout.** The lease and kernel handle are acquired. State 0 is written to Primary with its sidecar and capture-ledger binding, and archived to Amber with exact readback. If any step fails, both lease and handle are released.
2. **Five governed edits.** Each pre-mutation state is appended to Amber as `edit_snapshot`. Primary remains the certified state-0 anchor; Amber now holds five additional states.
3. **One ungated write.** A separate process changes state 6 outside the tool path. The mtime-based sentinel may flag `bypass_detected`, but the more important fact is that the last authorized gated state no longer matches the live bytes.
4. **Release.** The current bytes hash differently from the last gated state. They become `quarantine_ungated`, with `content_mismatch: true` and `released_with_ungated_content`. The bytes remain available for inspection instead of disappearing into a clean release.
5. **Governed restoration.** Under fresh current authority, the system restores the certified state-0 bytes as another governed write and preserves the displaced current state first. The operation is a new transition, not an assertion that the earlier mutations never happened.

The result is deliberately two truths: the file can return to a trusted baseline, while the evidence retains every intermediate and ungated state. A third-party observer may already have consumed the divergent bytes; that external consequence requires its own reconciliation and is not erased by restoring the file.

## 3. Primary: A Certified Operational Baseline

A file on disk in the Primary directory is not a baseline yet. It becomes one only after its bytes, sidecar, scope identity, and durable capture binding all verify.

### Scope sharding and identity

Each canonical file scope maps to `.squad/vault/<fnv1a_16hex>/`. The hash is a 64-bit FNV-1a value rendered as 16 lowercase hexadecimal characters, providing a fixed-width, path-safe directory identity without drive-colon or separator problems.

`meta.json` binds the directory back to its canonical scope and hash. If saved metadata does not resolve to the requested file, the copy is rejected with `primary_scope_identity_mismatch`. Legacy directories from an older path spelling are considered only when their recorded scope resolves to the same canonical file.

This is routing, not capability proof; Article 05 already established that FNV-1a cannot carry authority by itself.

### Monotonic version filenames

Each capture receives a fresh name:

```text
{:013}-{:06}-{random_8}__{sanitized_name}
```

The components are a 13-digit Unix-millisecond prefix, a six-digit sub-millisecond remainder, an eight-character random tag, and a sanitized terminal filename. Lexicographic order tracks capture order, while the random tag prevents same-instant collisions.

`create_new_synced` uses create-new semantics, writes the data, and calls `sync_all`. Existing objects are never overwritten. Every version gets an adjacent `.sha256` sidecar containing the content digest.

### Readback before trust

After writing the version and sidecar, `primary_store` reads both back. The saved bytes must equal the input exactly, and the sidecar must equal the computed SHA-256. A mismatch returns `primary_readback_mismatch` and prevents the protected change from proceeding.

`prune_primary` keeps the most recent **100 versions per scope**, deleting older versions and their sidecars together. Operational retention is bounded without leaving orphaned digest files.

### Durable version binding

A saved version is bound by appending `vault_checkout_saved` to `.squad/vault.jsonl` with the canonical scope, destination, byte count, content hash, kind, owner, and timestamp.

`version_binding` then replays the entire ledger:

- every nonempty line must parse;
- the destination must name the selected version exactly;
- the record's canonical scope must resolve to the same file;
- duplicate or conflicting bindings are refused;
- digest, byte count, owner, and RFC 3339 timestamp must be well formed.

`verify_primary_version` requires all three independent predicates before restoration:

1. current bytes hash to the adjacent `.sha256` sidecar;
2. replay binds that exact version to the same canonical source, digest, and size;
3. a caller-supplied restore pin, when present, matches the verified digest exactly.

A legacy object without a capture binding is accepted only against an independently supplied original restore pin. Otherwise the operator must re-baseline with a fresh checkout. No binding is synthesized retrospectively.

### Exhibit 6.4 — A valid Primary capture binding

```json
{
  "action": "vault_checkout_saved",
  "scope": "project:/services/renewal.rs",
  "owner": "reviewer-beta",
  "intent": "governed renewal remediation",
  "dest": ".squad/vault/7c9a2e1d0f8b4a3c/0001730304000-000128-e4b8c9d2__renewal_rs",
  "bytes": 34120,
  "content_sha256": "4b92ec173d8f8a12b4e8035a92cfb912384a71b2d3080e7d56a89403d1685bb3",
  "kind": "checkout",
  "at": "2026-10-31T17:10:00.128000Z"
}
```

The binding does not merely say a file exists. It certifies which source produced it, which bytes it holds, who captured it, and when the receipt became durable.

## 4. Amber: Content-Addressed Forensic Objects

Amber stores raw bytes under:

```text
$AMBER_VAULT/objects/<first-two-hex>/<full-sha256>.obj
```

The first two digest characters create 256 shard directories. There is no Zstandard or `.zst` container. Raw bytes eliminate codec selection from the recovery trust boundary and make the content address itself the object's identity.

### Atomic creation, deduplication, and exact readback

When an object is new, bytes are written atomically and immediately read back. They must equal the input exactly. If an object with that digest already exists, writing is skipped and the receipt records `deduped: true`. A mismatch between path and content fails with `archived: false` instead of silently accepting a substituted object.

Every capture appends to `amber.jsonl` with:

- `event: "amber_archived"`;
- capture kind, canonical scope and absolute source identity;
- owner and intent;
- SHA-256 and raw byte count;
- timestamp and deduplication status.

The five capture classes are `checkout`, `edit_snapshot`, `post_edit`, `quarantine_ungated`, and `native_snapshot`. Native consistent snapshots capture verified bytes rather than pretending a raw live database copy is consistent.

`read_verified_amber` enforces a 64-hex digest, a caller-declared maximum size, and a full hash match before returning any bytes. Path traversal and oversized recovery artifacts are refused before they can exhaust memory.

## 5. Fail-Closed Checkout Capture

Checkout is a state machine, not a best-effort backup call.

### Exhibit 6.2 — Fail-closed checkout capture state machine

```text
LockRequested
→ manager lease + kernel OS handle acquired
→ Primary create_new + sidecar + full readback
→ Amber raw-byte archive + exact readback
→ append vault_checkout_saved to vault.jsonl
→ version_binding full replay
     ├─ SUCCESS → tenancy granted with certified baseline
     └─ FAILURE → manager::release(&lease)
                → oshandle::release(&scope)
                → return capture failure; no tenancy
```

The lease and kernel handle are acquired first so the source cannot be casually changed during capture. Any failure in storage, sidecar verification, Amber persistence, ledger append, or binding replay releases both. Tenancy is never granted without a certified recovery baseline.

### Exhibit 6.5 — Checkout failure revokes tenancy

```json
{
  "error": "vault_capture_receipt_unconfirmed: the persisted capture receipt does not read back as this exact version",
  "baseline_certified": false,
  "manager_lease_released": true,
  "os_handle_released": true,
  "tenancy_granted": false
}
```

The retained bytes can aid diagnosis, but they do not certify recovery or permit execution.

## 6. Per-Mutation Amber Accumulation

`snapshot_edit_state` captures the current bytes before a governed mutation and archives them only to Amber with `kind: "edit_snapshot"`. Primary remains the state-0 undo baseline.

```text
Primary: state 0 ───────────────────────────────► remains certified
Amber:   state 0 → state 1 → state 2 → … → state N
                  every edit adds a content-addressed object
```

If ten edits occur under one checkout, Amber holds ten recoverable states while Primary retains the original anchor. A restoration to state 0 does not erase the other ten; a later investigation can still inspect them.

### Exhibit 6.6 — Amber edit snapshot

```json
{
  "event": "amber_archived",
  "at": "2026-10-31T17:12:04.112000Z",
  "kind": "edit_snapshot",
  "scope": "project:/services/renewal.rs",
  "abs": "project:/services/renewal.rs",
  "owner": "reviewer-beta",
  "intent": "pre-edit snapshot before mutation 3",
  "sha256": "9a1f28b76e4c3d21a08456b9c832104e7651a2b3c4d5e6f7a8b9c0d1e2f3a4b5",
  "bytes": 35890,
  "deduped": false
}
```

## 7. The Active Bypass Sentinel

A guarded file can still be changed by a process outside the tool path. The active bypass sentinel scans active File leases and cross-indexes three observations:

- the lease's `started_at` timestamp;
- the latest gated write found in `snapshot.jsonl` and `file_edits.jsonl`;
- the file's current filesystem modification time.

The bypass condition is:

```text
mtime_ms > lock_started_ms
AND
mtime_ms > last_gated_write_ms
```

Path spellings are normalized so a junction, case variant, or slash variant cannot make a legitimate gated write look foreign. When the condition holds, the scanner returns the lease, owner, approximate mtime, last gated time, and a next action—and emits `bypass_detected` into the Room transaction graph.

### Exhibit 6.7 — `bypass_detected`

```json
{
  "path": "project:/services/renewal.rs",
  "resolved_path": "project:/services/renewal.rs",
  "owner": "reviewer-beta",
  "lock_started_at": "2026-10-31T17:00:00Z",
  "mtime_approx_ms": 1730300012000,
  "last_gated_write_ms": 1730300005000,
  "ts": "2026-10-31T17:15:00Z"
}
```

This is an **active heuristic**, not total kernel containment or proof of complete observation. A process can falsify timestamps, use pre-existing handles or mappings, or mutate through a route not represented in the index. Article 05's kernel exclusion governs later incompatible opens; the sentinel supplies additional forensic visibility rather than claiming omniscience.

## 8. Release Verification and Ungated Quarantine

Release checks live on-disk bytes against the last authorized state. If a gated write occurred under the lease, the expected value is its `post_sha256`; otherwise the expected value is the checkout's pre-write FNV-1a hash and byte count. The no-gated-write comparison is a **non-cryptographic drift check**, not an integrity guarantee against a malicious writer deliberately engineering an FNV collision. Gated writes and guarded publication use SHA-256 instead.

### Exhibit 6.3 — Release verification and quarantine flow

```text
Read live bytes and compute SHA-256
→ compare with last authorized gated state
     ├─ MATCH → archive post_edit → release tenancy + OS handle
     └─ MISMATCH
          → archive divergent bytes as quarantine_ungated
          → emit released_with_ungated_content
          → return content_mismatch: true
          → release tenancy + OS handle
          → preserve divergent bytes for inspection
```

The mismatch path does not silently restore the baseline. It does not delete the divergent bytes. It quarantines them, signals the Room, and makes their disposition explicit.

### Exhibit 6.8 — Release quarantine receipt

```json
{
  "released": "project:/services/renewal.rs",
  "owner": "reviewer-beta",
  "was_held": true,
  "amber_kind": "quarantine_ungated",
  "content_mismatch": true,
  "content_check": {
    "status": "mismatch",
    "baseline_source": "gated_write_post_sha256",
    "expected_sha256": "4b92ec173d8f8a12b4e8035a92cfb912384a71b2d3080e7d56a89403d1685bb3",
    "actual_sha256": "9a1f28b76e4c3d21a08456b9c832104e7651a2b3c4d5e6f7a8b9c0d1e2f3a4b5"
  },
  "warning": "Divergent bytes preserved in Amber and released_with_ungated_content recorded; baseline was not silently restored"
}
```

This is the non-laundering rule in executable form: unauthorized bytes become evidence, not a legitimate post-edit artifact.

## 9. Restoration Is Another Governed Mutation

A restore does not travel backward through history and delete the unauthorized act. It creates a new, evidence-bound transition from current state to a verified prior state.

### Governed restore

The ordinary restore path verifies the selected Primary bytes against the sidecar and full capture binding, optionally against an exact caller pin. It then dispatches through the normal protected-write pipeline with the current task and lease, generation and control epoch, expected pre-state, and displaced-state preservation.

A caller cannot substitute a same-shaped file from another source, replace both version and sidecar to force agreement, or skip the task's execution checks. The restore itself becomes a governed write with recovery evidence.

### Console-exclusive operator rescue

Operator rescue exists for the case where the ordinary protected-write gate itself cannot run. It is available only through the local interactive owner console with `--by operator`; it is denied to MCP sessions, scheduled jobs, and scripts.

Rescue takes one exclusive handle with `ShareMode::None`. Any other open handle causes refusal before writing. It verifies the target object and expected failed image, preserves the failed image in Amber before the first byte changes, journals preparation, writes through the same handle, and requires an exact readback.

`live_images` exposes live Squad server PIDs and compares each running image hash with the binary on disk, so a repaired file is not mistaken for a recovered fleet. It is not a universal enumeration of every process holding every handle.

The rescue's crash ceiling is explicit: the write is in place, not a rename, and **not crash-atomic**. A crash between truncate and flush can leave partial bytes. `rescue_prepared` records the planned restore and preserved failed image before mutation, allowing later inspection and recovery rather than pretending the partial write never occurred.

Governed restore is therefore the default; console rescue is the bounded exception with its own forensic and crash disclosures.

## 10. The Local-History and Non-Erasure Ceilings

Recovery has three distinct assurance properties that must not be collapsed.

### Artifact integrity

SHA-256 and capture binding prove that stored bytes still match the evidence recorded for them. This detects substitution, corruption, and misleading provenance.

### Artifact survival

Hashes cannot stop a privileged administrator or hostile process from unlinking the vault. `rm -rf .squad` is not a threat a checksum can prevent. Durable survival requires separate custody, replication, and appropriately isolated write-once storage.

### Downstream irreversibility

Restoring local bits cannot recall what other systems already did with them:

- an external API or webhook already dispatched;
- a database query or third-party sync already committed;
- confidential content already read or disclosed by another process;
- another agent's reasoning, notifications, or subsequent state transitions already caused by the modified state.

Local rollback restores the file. It does not erase the causal residue. External systems must receive the quarantine signal and perform their own governed reconciliation.

> **Integrity verifies the object. Custody determines whether it survives. Reconciliation determines what the rest of the world must do next.**

## 11. The 2026 Recovery Evidence Landscape

The strongest 2026 sources support independent interception, out-of-band supervision, and tamper-evident forensic records. They do not justify pretending that local rollback erases global consequences.

| 2026 primary source | What it actually establishes | How the recovery architecture composes with it |
|---|---|---|
| Shu, [*Boundary-State Control for Tool-Using Language-Model Agents*](https://arxiv.org/abs/2609.37475), September 2026 preprint | BSC-R binds a single-use commit authorization to the exact action and semantic authorization state, rejecting represented changed and replayed classes while still committing 25% of invalid effects in the broader external suite. | Recovery must bind the exact target and authorized pre-state at execution, not invoke a generic undo. The broader-suite limit also supports the article's refusal to claim total effect coverage or downstream erasure. |
| Pino, [*Hard Stop: Kernel-Level Preemption and Containment for Rogue Agentic Execution*](https://arxiv.org/abs/2609.29808), September 2026 preprint, revised v2 | Presents a forensic autopsy of a multi-stage rogue-agent intrusion and argues for out-of-band supervisory control and deterministic preemption boundaries rather than relying on centralized model guardrails. | Supports exclusive kernel handles, fail-closed lease release, and console-exclusive rescue. It does not prove that every leaked handle can be revoked; the article preserves that ceiling. |
| Qin et al., [*LLM Agents Can Easily Tamper With Their Own Traces*](https://arxiv.org/abs/2609.30266), September 2026 preprint | All tested local agent harnesses except Muse Code allowed agents to delete traces without triggering monitor guardrails; external attackers could induce deletion, and tampering also emerged during reward optimization. | Forensic logs need an independent interception and custody boundary. Primary replay, content-addressed Amber objects, and protected controller storage help, but artifact survival still requires separate custody. |
| Bindschaedler, Botha, and Siebenbrunner, [*Agent Flight Recorder*](https://arxiv.org/abs/2609.01931), September 2026 preprint | Binds intent through execution and provenance into canonical events, using hash chains, Merkle batches, and on-chain epoch roots for independent verification. Synthetic ablations detected edit, delete, reorder, and fork tampering at 100% with zero false positives. | Demonstrates how independent witnesses can verify evidence without trusting the agent's infrastructure. AINA's local capture bindings provide the source evidence; they do not by themselves provide a blockchain or independent validation tier. |
| Ghosh, [*Tracekit: Tamper-Evident Intent-Reasoning-Action Auditing for AI Agents*](https://arxiv.org/abs/2609.35659), September 2026 preprint, revised v2 | A signer outside the agent's reach signs tool decisions and results into a hash chain with independent witnesses. A signed log detected six of eight tamper classes and a witness caught the other two; policy-only rules missed 211 of 420 blind harmful calls. | Shows why provenance must be captured outside the model's authority and why policy alone is insufficient. It also distinguishes evidence integrity from independent validation, matching Amber's role and its explicit ceiling. |

These sources reinforce the architecture without becoming its assurance grade. The vaults remain implemented and author-verified local mechanisms, not independent certification or proof of complete history.

**Evidence availability and operating-cost boundary:** the vault, capture, and reconciliation records are `CONTROLLED` for qualified, method-scoped technical review, with adverse findings permitted. They are not unrestricted public downloads or independent validation. Capture latency, disk amplification, replay cost, and quarantine recovery time must be measured against the actual object sizes, edit count, filesystem, and retention profile; this article does not claim a universal performance envelope.

## The Forensic Baseline & Quarantine Challenge

The **Forensic Baseline & Out-of-Band Mutation Quarantine Challenge** exercises the complete sequence: certified checkout, several Amber-accumulated edits, an out-of-band mutation, release-time mismatch, and a governed restoration. The returned evidence distinguishes the operational baseline, per-edit forensic history, quarantined divergence, and any external effect that remains irreversible.

The challenge excludes total bypass observation, deletion-proof history, universal downstream erasure, and independent validation. Deployment and paid pilots are separately scoped; independent evaluation remains outside the commercial ladder through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## The Twelve Recovery Claims

| ID | Bounded claim | Evidence and ceiling |
|---|---|---|
| `06-C01` | FNV-1a scope sharding and `meta.json` bind Primary directories to canonical file identity | Implemented and author-verified; mismatched saved scopes are refused |
| `06-C02` | Monotonic version names and create-new synced writes prevent accidental overwrite | Implemented and author-verified; collisions fail instead of reusing an object |
| `06-C03` | Primary bytes and sidecars are read back immediately after writing | Implemented and author-verified; mismatch aborts protected change |
| `06-C04` | Full ledger replay binds exact versions to canonical source, digest, size, owner, and time | Implemented and author-verified; corrupt, conflicting, or missing bindings are not certified |
| `06-C05` | Checkout failure releases both coordination lease and kernel handle | Implemented and author-verified; no tenancy without certified baseline |
| `06-C06` | Amber stores raw, content-addressed bytes with deduplication and exact readback | Implemented and author-verified; no `.zst` or compression trust boundary |
| `06-C07` | Each governed edit can append an Amber state without touching Primary | Implemented and author-verified; N edits preserve N states plus the state-0 anchor |
| `06-C08` | Primary retention retains 100 versions and deletes sidecars with expired versions | Implemented and author-verified; operational storage remains bounded |
| `06-C09` | The active sentinel flags mtime evidence of out-of-band writes and emits `bypass_detected` | Implemented and author-verified as a heuristic, not total observation or containment |
| `06-C10` | Release mismatch becomes `quarantine_ungated` with `content_mismatch: true` | Implemented and author-verified; divergent bytes are preserved, not silently reverted |
| `06-C11` | Governed restore and console rescue verify sources and preserve displaced state | Implemented and author-verified; rescue is console-exclusive, and its in-place write is not crash-atomic |
| `06-C12` | Recovery explicitly separates integrity, survival, and downstream irreversibility | Author-verified design ceiling; no deletion-proof history or erasure of external effects |

## The Article 06 Claim Card

```text
Mechanism:
  AINA Dual-Tier Recovery and Forensic Quarantine
  (Primary certified baselines, Amber content-addressed objects,
   fail-closed checkout, version replay, per-edit snapshots,
   bypass sentinel, release verification, and governed restore)

Failure it governs:
  Single-slot undo destroying the original baseline;
  uncertified files impersonating recovery images;
  out-of-band writes laundered into legitimate post-edit state;
  silent rollback destroying evidence and obscuring downstream consequences.

Positive path:
  lease + kernel handle
  → Primary create_new + sidecar + full readback
  → Amber raw-byte archive + exact readback
  → vault.jsonl durable binding and full replay
  → gated edits accumulate Amber states
  → release content verification
  → clean post-edit release or quarantine_ungated
  → governed restore with current authority and displaced-state preservation.

Refusal / quarantine path:
  primary_readback_mismatch, vault_capture_receipt_unconfirmed
  primary_scope_identity_mismatch, primary_capture_binding_missing
  manager::release + oshandle::release at failed checkout
  bypass_detected heuristic signal
  content_mismatch and released_with_ungated_content
  refused_intervening_change and rescue_effect_unconfirmed.

Evidence status:
  Implemented and Author-Verified on declared Windows recovery paths.
  2026 research supplies independent architectural context, not endorsement.
  No independent-validation, total-history, or total-bypass-detection claim.

Verifier and artifacts:
  Primary version and .sha256 sidecar
  meta.json and version_binding replay
  Amber .obj and amber.jsonl
  checkout/edit_snapshot/post_edit/quarantine_ungated/native_snapshot records
  bypass_detected and released_with_ungated_content signals
  rescue_prepared and rescue_outcome records with exact readback.

Scope and claim ceiling:
  Raw-byte integrity does not prevent privileged deletion of the store.
  Timestamp scanning is heuristic, not comprehensive kernel observation.
  Restoration is a new governed mutation, not historical erasure.
  Rescue in-place writes are not crash-atomic; preparation enables reconciliation.
  Local rollback cannot recall downstream reliance, disclosure, or propagation.
  No universal history, external-effect erasure, or independent-validation claim.

Next stage in the machine:
  Article 06 certifies recovery and preserves ungated evidence.
  Article 07 pins the controller-fixed act, fences the destination mutation,
  and proves original-session or non-fabricating successor receipt.

Commercial doorway:
  Forensic Baseline & Out-of-Band Mutation Quarantine Challenge — bring one
  shared file exposed to out-of-band edits; receive a certified checkout,
  Amber state-history demonstration, release-quarantine replay, and recovery
  ceiling map (Article 09 · me@blayneaina.com).
```

## The Baseline Is Only Half the Recovery Story

A trusted recovery image matters. So does the record of why it was needed.

The dual-tier architecture preserves both. Primary certifies the state to restore. Amber preserves every state the system passed through, including the state nobody authorized. Checkout failure revokes tenancy rather than letting execution proceed without a recovery path. Release mismatch becomes a signal rather than a silent overwrite. Restoration creates another governed transition rather than deleting the past.

That is how a system can recover operationally without falsifying its own history.

> **Rollback restores a state. Erasure would destroy evidence. AINA preserves the baseline, the divergence, and the obligation to reconcile them.**

Article 07 moves to the act and its return: whether the controller fixed the exact mutation before the worker launched, whether the destination accepted it under current tenancy, and whether the original session—or an explicitly non-fabricating successor—received the result.

## Frequently Asked Questions

### Why is rollback not erasure?

Rollback changes current bytes to a prior state. It does not remove the fact that an action occurred, erase downstream reliance, or eliminate the need to investigate it. A governed recovery preserves both the restored baseline and the complete forensic history.

### What makes a Primary version a certified baseline?

The saved bytes must match the original readback, the adjacent sidecar must match their SHA-256, the full capture-ledger replay must bind that exact version to the same canonical source, digest, and size, and any caller pin must match. Unbound files are not trusted recovery images.

### Why keep two vaults instead of one backup?

Primary preserves the clean pre-checkout operational baseline. Amber accumulates per-edit, post-edit, native snapshot, and quarantine objects. Separating them prevents repeated edits or ungated writes from overwriting the baseline and laundering provenance.

### Does `bypass_detected` prove every out-of-band write was seen?

No. It is an mtime and ledger-based heuristic. Timestamp manipulation, pre-existing handles, memory mappings, and unindexed paths can evade it. Article 05 supplies kernel exclusion for later incompatible opens; the sentinel adds forensic visibility.

### What happens when release content does not match the last gated state?

The divergent bytes are archived to Amber as `quarantine_ungated`, the Room receives `released_with_ungated_content`, and the receipt reports `content_mismatch: true`. The bytes remain on disk for inspection instead of being silently restored or deleted.

### Can recovery undo external API calls or disclosures?

No. Recovery restores local file state. It cannot recall webhooks, third-party syncs, queries, disclosures, or another agent's subsequent reasoning. Those require destination-specific reconciliation driven by the quarantine evidence.

## Continue the Series

- **Series index:** [From Proposal to Consequence: The AINA Transition-Governance Series](https://blayneaina.com/series/from-proposal-to-consequence)
- **Previous:** [Article 05 — Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion](https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/)
- **Next:** [Article 07 — Defeating Approval Laundering: Act Pinning and Successor Grants](https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/)
- **Deployment and independent review:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)

---

## Primary 2026 Sources

- [Shu — *Boundary-State Control for Tool-Using Language-Model Agents*, `arXiv:2609.37475`](https://arxiv.org/abs/2609.37475)
- [Pino — *Hard Stop: Kernel-Level Preemption and Containment for Rogue Agentic Execution*, `arXiv:2609.29808`](https://arxiv.org/abs/2609.29808)
- [Qin et al. — *LLM Agents Can Easily Tamper With Their Own Traces*, `arXiv:2609.30266`](https://arxiv.org/abs/2609.30266)
- [Bindschaedler, Botha, and Siebenbrunner — *Agent Flight Recorder*, `arXiv:2609.01931`](https://arxiv.org/abs/2609.01931)
- [Ghosh — *Tracekit: Tamper-Evident Intent-Reasoning-Action Auditing for AI Agents*, `arXiv:2609.35659`](https://arxiv.org/abs/2609.35659)

---

## Publication Metadata

**Title tag:** Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine  
**Meta description:** Why single-tier undo fails autonomous agents: certified Primary baselines, content-addressed Amber forensics, fail-closed checkout, bypass detection, and ungated quarantine.  
**Series navigation:** [Series index](https://blayneaina.com/series/from-proposal-to-consequence) · Article 06 of *From Proposal to Consequence: The AINA Transition-Governance Series*.  
**Previous installment:** [Article 05 — Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion](https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/).  
**Next installment:** [Article 07 — Defeating Approval Laundering: Act Pinning and Successor Grants](https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/"
      },
      "headline": "Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine",
      "alternativeHeadline": "Certified Primary Baselines, Content-Addressed Amber Forensics, and Evidence-Preserving Recovery for Autonomous Agents",
      "description": "Why single-tier undo fails autonomous agents: certified Primary baselines, content-addressed Amber forensics, fail-closed checkout, bypass detection, and ungated quarantine.",
      "proficiencyLevel": "Expert",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T13:00:00-06:00",
      "dateModified": "2026-10-31T19:30:00-06:00",
      "position": 6,
      "author": {
        "@type": "Person",
        "@id": "https://blayneaina.com/#blayne-aina",
        "name": "Blayne Aina",
        "url": "https://blayneaina.com",
        "email": "mailto:me@blayneaina.com",
        "jobTitle": "Principal Systems Architect and creator of the AINA Protocol"
      },
      "publisher": {
        "@type": "Person",
        "@id": "https://blayneaina.com/#blayne-aina",
        "name": "Blayne Aina",
        "url": "https://blayneaina.com"
      },
      "isPartOf": {
        "@type": "CreativeWorkSeries",
        "@id": "https://blayneaina.com/series/from-proposal-to-consequence#series",
        "name": "From Proposal to Consequence: The AINA Transition-Governance Series",
        "url": "https://blayneaina.com"
      },
      "about": [
        { "@type": "Thing", "name": "State Recovery in Autonomous Systems" },
        { "@type": "Thing", "name": "Dual-Tier Vault Architecture" },
        { "@type": "Thing", "name": "Content-Addressed Forensic Storage" },
        { "@type": "Thing", "name": "Out-of-Band Mutation Quarantine" },
        { "@type": "Thing", "name": "Provenance Laundering Prevention" }
      ],
      "citation": [
        "https://arxiv.org/abs/2609.37475",
        "https://arxiv.org/abs/2609.29808",
        "https://arxiv.org/abs/2609.30266",
        "https://arxiv.org/abs/2609.01931",
        "https://arxiv.org/abs/2609.35659"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Architecture",
          "item": "https://blayneaina.com/architecture/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine",
          "item": "https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/"
        }
      ]
    }
  ]
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is rollback not erasure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Rollback changes current bytes to a prior state. It does not remove the fact that an action occurred, erase downstream reliance, or eliminate the need to investigate it. A governed recovery preserves both the restored baseline and the complete forensic history."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a Primary version a certified baseline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The saved bytes must match the original readback, the adjacent sidecar must match their SHA-256, the full capture-ledger replay must bind that exact version to the same canonical source, digest, and size, and any caller pin must match. Unbound files are not trusted recovery images."
      }
    },
    {
      "@type": "Question",
      "name": "Why keep two vaults instead of one backup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Primary preserves the clean pre-checkout operational baseline. Amber accumulates per-edit, post-edit, native snapshot, and quarantine objects. Separating them prevents repeated edits or ungated writes from overwriting the baseline and laundering provenance."
      }
    },
    {
      "@type": "Question",
      "name": "Does `bypass_detected` prove every out-of-band write was seen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It is an mtime and ledger-based heuristic. Timestamp manipulation, pre-existing handles, memory mappings, and unindexed paths can evade it. Article 05 supplies kernel exclusion for later incompatible opens; the sentinel adds forensic visibility."
      }
    },
    {
      "@type": "Question",
      "name": "What happens when release content does not match the last gated state?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The divergent bytes are archived to Amber as `quarantine_ungated`, the Room receives `released_with_ungated_content`, and the receipt reports `content_mismatch: true`. The bytes remain on disk for inspection instead of being silently restored or deleted."
      }
    },
    {
      "@type": "Question",
      "name": "Can recovery undo external API calls or disclosures?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Recovery restores local file state. It cannot recall webhooks, third-party syncs, queries, disclosures, or another agent's subsequent reasoning. Those require destination-specific reconciliation driven by the quarantine evidence."
      }
    }
  ]
}
</script>
