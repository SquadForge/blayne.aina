---
title: "Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion"
subtitle: "A lease clock can expire without removing a stale worker's ability to write. Authority must be revalidated at the effect boundary and held through the rename."
author: "Blayne Aina"
datePublished: "2026-10-31T12:00:00-06:00"
dateModified: "2026-11-05T12:00:00-06:00"
canonicalUrl: "https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/"
series: "From Proposal to Consequence: The AINA Transition-Governance Series"
position: 5
description: "Why wall-clock lease expiry cannot stop stale AI writes: typed scopes, monotonic generations, five-role Win32 handle exchange, preimage forensics, and release quarantine."
keywords:
  - lease expiry is not fencing
  - monotonic fencing tokens
  - Win32 handle sharing modes
  - stale writer prevention
  - kernel write fencing
  - Windows memory mapping ceiling
  - atomic POSIX file rename by handle
  - preimage displacement detection
  - AI agent concurrency control
  - room.generation.v2
  - typed lease namespaces
isAccessibleForFree: true
inLanguage: en-US
---

# Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion

*A lease clock can expire without removing a stale worker's ability to write. Authority must be revalidated at the effect boundary and held through the rename.*

**By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026**

---

Worker A's lease expires. Worker B takes over and commits. Worker A resumes with a valid-looking local state and tries to write.

The clock cannot stop it.

Expiry is a liveness mechanism: it allows ownership to move after a holder stops responding. It is not a physical fence. A paused process, delayed packet, cached credential, or lingering thread can still attempt the write. Only current authority at the effect boundary can refuse it.

The local version is just as important. A background script does not consult your JSON lockfile. It opens the target with `GENERIC_WRITE` and changes the bytes while your coordination plane is busy being correct.

Article 04 established who may receive and perform work. Article 05 enforces ownership at the actual mutation window: typed scopes, monotonic generations, conditional lifecycle, kernel-backed handle exclusion, guarded replacement, and explicit reconciliation.

> **A lease is not a timer with a filename. It is a current tenancy whose generation must match at execution and whose kernel exclusion must survive every handle handoff.**

## The Two Hazards the Architecture Must Defeat

### Hazard 1: The resurrected worker

```text
Worker A acquires generation 14 and stalls
→ TTL expires; Worker B acquires generation 15 and commits
→ Worker A resumes and presents generation 14
→ executor rejects stale_lease_generation
```

The refusal must happen at the resource. A wake-time check is not enough because authority can change after the wake. A heartbeat alone is not enough because a delayed heartbeat can arrive after succession. The worker's generation and the resource's high-water mark must be compared at commit.

### Hazard 2: The uncooperative local writer

A lease record under `.squad/locks` is advisory to cooperating software. It has no power over a process that never reads it. On Windows, the enforcement mechanism is a kernel handle whose sharing mode denies later incompatible opens.

A long-lived server holding `FILE_SHARE_READ` causes later write, delete, or rename attempts to fail with `ERROR_SHARING_VIOLATION` (32). That is an operating-system boundary, not a prompt convention.

The two hazards require different but composed responses:

```text
stale logical authority → monotonic generation + tenancy revalidation
uncooperative file opens → Win32 share-mode exclusion
replacement races → overlapping guard handoff + identity/content/path verification
divergent bytes after release → Amber quarantine, never silent baseline laundering
```

## 1. Six Typed Namespaces and Real Target Identity

Leases are partitioned by resource class, not by an undifferentiated path string.

| Namespace | Example resource | Conflict rule |
|---|---|---|
| `file://` | Exact files or directory hierarchies | Canonical path-prefix conflicts; parent and child scopes overlap |
| `session://` | Managed sessions and virtual resources such as `sqlite.records/<target>` | Canonical session-resource prefix conflicts |
| `window://` | GUI application windows | Hierarchical prefix conflicts |
| `account://` | Shared service accounts or external identities | Hierarchical prefix conflicts |
| `focus://` | Global user focus and interaction ownership | Singleton: every pair of distinct focus scopes conflicts |
| `browser://` | Browser automation contexts and page targets | Hierarchical prefix conflicts |

Bare paths default to `file://` for compatibility. A `TypedScope` contains the namespace and full `resource_id`; different namespaces never conflict with one another **at the lease-algebra level**. That does not prove two names cannot designate the same physical resource. A `session://sqlite.records/<target>` lease and a `file://` lease over the underlying database file are different authority domains: the session route is not a Win32 guarded-file replacement, and the file route is not a SQLite row-version fence. A deployment exposing both routes must bind their path and transition authority explicitly rather than assuming namespace separation has made them mutually exclusive. `with_transition` serializes governed controller mutations; it does not invent a global fence around every out-of-band alias.

FNV-1a 64-bit derives a deterministic routing key from `prefix() + resource_id`, used for filenames such as `locks/write/<hash:016x>.json`. It is **not** a cryptographic capability, a fencing token, or a collision-resistant authority proof. Security decisions compare the full canonical namespace and resource identity, not the hash alone.

### Lexical paths are not kernel object identity

`file_scope` rejects empty paths, wildcards, parent traversal, NTFS alternate data stream colons, and trailing dots or spaces. For a not-yet-created target, it finds the nearest existing ancestor, canonicalizes that object, and reattaches the suffix. Windows paths normalize to lowercase forward-slash form.

`opened_file_scope` goes further: it calls `GetFinalPathNameByHandleW` on the already-open handle and resolves the actual file object. This is how the system distinguishes “the path I intended” from “the object I actually opened,” piercing junctions, symlinks, mount points, and other reparse indirection.

The non-equivalence is fundamental:

```text
path string                 ≠ opened kernel object identity
FNV-1a routing key          ≠ authority proof
lease record                ≠ current tenancy
```

## 2. Workspace-Wide Monotonic Generations

A per-file counter can restart when the file is replaced or a lease is released. That makes old authority look current again. AINA therefore uses a **workspace-wide high-water sequence** in `room.generation.v2`.

### Two-phase persistence

Each new generation is the maximum counter across the store plus one, computed with `checked_add(1)` and an overflow refusal (`generation_exhausted`). Persistence has two ordered steps:

```text
Phase 1: write .generations-initialized
  protocol: room.generation.v2
  map_sha256: SHA-256 of the complete prepared counter map
  high_water: the newly issued generation
  prepared_counters: the complete prepared map

Phase 2: atomically publish generations.json
```

A missing store after initialization is `generation_store_missing`. A marker digest or high-water mismatch is `generation_checkpoint_mismatch`. Unknown protocols, malformed counters, and persistence failure (`generation_persist_failed`) refuse acquisition. Missing, corrupt, or rolled-back state never silently becomes generation zero.

The marker detects partial writes, divergence, and one-sided or inconsistent rollback. It does **not** prove monotonicity against a privileged actor who restores both the marker and `generations.json` to the same earlier, internally consistent snapshot. Defeating that complete-snapshot rollback requires a monotonic anchor outside the rollback domain, such as separately protected authority or hardware-backed state; no two-file local protocol can supply it.

### Exhibit 1 — A sealed generation marker

```json
{
  "protocol": "room.generation.v2",
  "map_sha256": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
  "high_water": 15,
  "prepared_counters": {
    "0123456789abcdef": 14,
    "fedcba9876543210": 15
  }
}
```

The marker binds the intended complete map before the store is published. A rollback to an earlier valid JSON map is still a refusal, not a fresh start.

### Exhibit 2 — The stale-worker refusal

```json
"stale_lease_generation: expected 14, current 15"
```

A later operation cannot borrow the fact that generation 14 used to be correct.

## 3. A 30-Second Cross-Process Transition Mutex

Generation, lease mutation, vault capture, guarded replacement, and readback must form one authoritative transition. `with_transition` serializes them through `.lease-transition.mutex`, an OS file lock opened with read/write sharing but no delete sharing.

The guard supports re-entrant acquisition and polls in 10 ms intervals for up to **30 seconds**. A still-held transition returns `lease_transition_busy`; it is never stolen because a timer elapsed. The lock is released by handle drop.

This is not the same thing as the 15-minute lease TTL:

- The **transition mutex** serializes one commit and is held across decision, capture, replacement, and verification.
- The **lease TTL** bounds tenancy and requires heartbeat renewal.
- The **generation** determines whether a tenancy is current at execution.
- The **control epoch** can revoke an entire lineage immediately, independent of remaining TTL.

## 4. Acquisition, Re-Grant, and Conditional Lifecycle

Acquisition checks break-glass admission, package/source exclusion, namespace conflicts, and existing tenancy. A lease cannot silently change tasks; `lease_task_mismatch` preserves the original binding. Fresh acquisition captures pre-write state and binds the current control epoch.

### Dead-holder re-granting requires proof of death

A disconnected holder does not make its lease instantly reusable by anyone. Re-granting is limited to the **same owner and same task**, and requires:

1. an enforced server-held tenancy, or an eligible identity-bound managed SQLite session;
2. `holder_alive` to be false;
3. the recorded `holder_pid` to be absent according to `process_alive`.

A missing server record alone is not proof of death, and a reused or uncertain PID fails closed. Once those conditions hold, re-granting issues a **new generation**, fencing delayed writes and proposals from the old process or lingering children.

### Conditional lifecycle compares all six tenancy keys

Heartbeat and release compare:

```text
namespace + resource_id + owner + generation + started_at + task_id
```

If any key differs, the action fails with `stale_lease_generation`. A delayed release cannot drop a successor's lease, and a heartbeat cannot adopt one.

Heartbeats cannot resurrect expired tenancies. Requested TTLs clamp to `MAX_LEASE_TTL_MINS = 15`, and every renewal buys at most 15 minutes from the current instant.

`transfer_holder` supports process-image handoff: every target record must name the current process and session, and all updates roll back to their preimages if any write fails. The holder fields move; the generation remains stable because this is process migration, not ownership succession.

## 5. The Five-Role Overlapping Handle Exchange

Windows refuses to rename over an existing destination when any open handle withholds `FILE_SHARE_DELETE`. The long-term guard therefore cannot simply remain open across replacement. Closing it naively would create a write-open race.

The solution is an overlapping exchange of five named file roles. `G`, `W`, `T`, `H`, and `G'` are role names, not invented lease types, and they are not the only live handles: the parent pin `P`, authorization guards, and process records have their own jobs.

```text
HANDLE ROLE & ACCESS / SHARING TIMELINE DURING replace_guarded:

Role G — long-term guard
  READ | share READ
  Held across the lease lifetime; denies later write/delete opens
  ===========================================> Close G
                                             │
Role W — window guard                         │ opened while G remains open
  READ | share READ | DELETE                  │
  Pins and hashes the exact preimage          │
  ------------------------------------------->│ Close W after rename
                                             │
Role P — parent directory pin                 │
  TRAVERSE | READ_ATTR | SYNC                 │
  share READ | WRITE; no DELETE sharing       │
  Proves the parent object identity           │
  ------------------------------------------->│ Close P after rename
                                             │
INTERVAL 1: G closes; W and P remain          │
  Write opens denied; delete/rename possible  │
                                             ▼
Role T — staged file                          │
  READ | DELETE | share READ | WRITE_THROUGH  │
  Staged bytes must equal planned_sha256      │
  NtSetInformationFile(FileRenameInformationEx)├─ Rename → Drop T
                                             │
Role H — handoff guard                        │ opened on new file while T is open
  READ | share READ | DELETE                  │
  Bridges publication without a write-open gap│
  ------------------------------------------->│ Close H after G' verifies
                                             │
INTERVAL 2: T closes; H remains               │
  Write opens denied; delete/rename possible  │
                                             ▼
Role G' — new long-term guard                 │
  READ | share READ                           │
  Verifies object identity, full content hash,│
  resolved path, and preimage displacement    │
  ===========================================> Active tenancy
```

### Role G: the long-term exclusion

At acquisition, a long-lived server holds the exact file with read access and `FILE_SHARE_READ`. Later incompatible write/delete/rename opens fail. A short-lived CLI process cannot retain that handle after exit, so its lease is explicitly advisory: `short_lived_process_cannot_hold_a_handle`. Protected execution requires a server-held resource handle.

### Role W: pin and hash the preimage

While `G` is still held, `W` opens with `READ | DELETE` sharing. It identifies the same object as `G`, records its link count, and hashes the source bytes through the handle. The authorization precondition receives that observation, not a second path-based read.

Because `W` shares `DELETE`, it permits the upcoming rename while continuing to deny writes.

### Role P: pin the parent directory

The parent opens with `FILE_FLAG_BACKUP_SEMANTICS`, traversal/read-attribute/synchronize access, and `READ | WRITE` sharing without `DELETE`. External processes cannot delete or rename the containing directory while `P` is held; ordinary child reads and writes are not globally blocked.

`opened_file_scope(&P)` must equal the leased parent. A junction swap produces `destination_parent_redirected`; an unresolvable parent produces `destination_parent_unverifiable`, not a pass.

### Role T: stage and rename the new object

The staged file opens with `READ | DELETE` access, `FILE_SHARE_READ`, and `FILE_FLAG_WRITE_THROUGH`. Its complete bytes must hash to `planned_sha256` before authority runs.

Authorization executes while `G` still denies write. Then `G` closes, and `T` renames immediately by handle.

The rename does not use a path-level convenience call. It invokes native `ntdll::NtSetInformationFile` with:

- `FILE_RENAME_INFORMATION_EX` class **65**;
- `FILE_RENAME_FLAG_POSIX_SEMANTICS` (`0x2`);
- `FILE_RENAME_FLAG_REPLACE_IF_EXISTS` (`0x1`) when replacement is allowed;
- `RootDirectory = parent_pin.as_raw_handle()`;
- one verified relative UTF-16 leaf name.

Negative status maps through `RtlNtStatusToDosError` and fails closed.

### Role H: bridge publication to the next guard

While `T` still holds the published object, `H` opens the new destination with `READ | DELETE` sharing. When `T` closes, `H` continues denying writes and bridges to `G'`.

### Role G': verify before success

`G'` opens while `H` remains, with `FILE_SHARE_READ`. Success requires all of the following:

1. `H` and `G'` identify the same object that `T` published by volume serial and file index.
2. The complete content through `G'` hashes to `planned_sha256`.
3. `opened_file_scope(&G')` resolves to the exact leased scope.
4. The surviving `W` handle has not produced positive evidence that the captured preimage moved elsewhere first.

Only then does the new long-term guard become active.

## 6. Two Residual Intervals—and the Evidence They Produce

The handle exchange closes write-open gaps. It does not make every delete or rename impossible. During Interval 1, only `W` and `P` remain; during Interval 2, only `H` remains. Those handles share `DELETE`, so a third party can rename or delete the destination but cannot open it for writing.

These intervals are explicit architecture, not something the article should hide:

- Interval 2's object substitution is detected by `G'` identity verification.
- A reparse redirect is detected by comparing `G'`'s resolved path with the leased scope.
- A moved preimage is detected through `W`.
- A third-party delete-and-recreate can remain indistinguishable from ordinary replacement. The bytes published **at the leased path** are still verified; the architecture does not claim to recover every uncaptured third-party object.

**Verification is not a power-loss atomicity proof.** If power fails after the rename but before `G'` is established, the destination may have changed while no success record exists. Restart must compare the surviving destination, `T`, `W`, and vault-backed preimages, then classify the result through the reconciliation path rather than assuming either a clean publish or an automatic rollback. Filesystem and directory-metadata durability are separate deployment claims, not something this handle sequence proves by itself. Article 06 owns that recovery boundary.

### Preimage displacement forensics

`W` follows the original file object rather than its name. After the rename, `preimage_displacement` requires positive evidence of all three conditions:

1. `links_after == links_before`—the object kept every link;
2. `deleted == false`—it was not deleted;
3. `opened_file_scope(w)` resolves to an ordinary path different from the leased scope and outside NTFS `$Extend\$Deleted`.

When those hold, the original preimage was moved before the rename, and the object superseded at the leased name was never captured. That is `destination_preimage_displaced`, not a clean publish.

A link-count reduction, pending deletion, deleted-files path, or unreadable state is not claimed as displacement. This distinction prevents false certainty from ambiguous evidence.

### Exhibit 3 — Successful guarded replacement verification

```json
{
  "leased_scope": "project:/artifacts/renewal-result.json",
  "planned_sha256": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
  "published_identity": "volume-64:file-index-128",
  "guard_identity_matches_published": true,
  "guard_content_matches_planned": true,
  "guard_resolved_path_matches_scope": true,
  "preimage_displaced_to": null,
  "new_long_term_guard": "G'",
  "verification": "complete"
}
```

This is a complete verification result, not merely a successful rename return.

### Six typed reconciliation faults

Verification failures do not trigger an imagined automatic rollback. They produce structured evidence and operational next actions.

| Fault | What broke | `reconcile_by` action |
|---|---|---|
| `GuardLost` | The destination guard could not be acquired or reacquired | If the rename completed, hash the path to distinguish published bytes from preimage; if it failed, re-establish the lease before any further write |
| `NameRedirected` | `G'` resolves somewhere other than the leased path | Resolve the name, locate the published bytes at the resolved target, and trust neither location by name alone |
| `IdentityChanged` | The object at the leased name is not the object `T` published | Treat the current bytes as foreign and restore the verified vault preimage |
| `ContentDiverged` | The guarded object does not contain `planned_sha256` | Restore the vault preimage instead of retrying blindly |
| `PreimageDisplaced` | The captured preimage survived intact at another path | Verify the displaced object and the uncaptured replacement's ownership before deciding whether planned bytes remain |
| `Unverifiable` | Identity, content, or path checks could not run | Establish state by hashing and comparing against planned and preimage digests; do not claim either success or a definite change |

Every reconciliation record carries the fault kind, `rename_completed`, planned and preimage digests, whether the destination existed, optional `preimage_displaced_to`, and `reconcile_by`. It also records an integrity signal and annotates `os_lock` so a later operation does not inherit false enforcement.

### Exhibit 4 — `destination_preimage_displaced`

```json
{
  "path": "project:/artifacts/renewal-result.json",
  "scope": "file://project:/artifacts/renewal-result.json",
  "error": "the captured preimage was moved before the rename, so an uncaptured object was replaced",
  "fault": "destination_preimage_displaced",
  "rename_completed": true,
  "planned_sha256": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
  "preimage_sha256": "58b2e91f4c03d8a7126590ef4312ab98c7654321fedcba09876543210fedcba9",
  "destination_existed_before": true,
  "preimage_displaced_to": "project:/artifacts/renewal-result.previous",
  "reconcile_by": "Verify the displaced preimage and the uncaptured replacement's ownership before deciding whether planned_sha256 stays at the leased path",
  "pid": 4104,
  "ts": "2026-10-31T18:00:00Z"
}
```

The rename completed. The verification did not produce success. That distinction is preserved instead of being flattened into a generic lock error.

## 7. Server Liveness and Zero-Downtime Image Handoff

A fencing system cannot depend on a PID alone. PID reuse would let a dead holder appear alive.

`enter_server_mode` publishes `.squad/servers/<pid>.json` with build, session, and protocol identity, then holds the record itself with `FILE_SHARE_READ`. Another process testing liveness attempts to open that record for write. A sharing violation proves the owner still holds it; process death closes the handle and releases the violation regardless of exit status.

This gives a kernel-backed liveness signal immune to PID reuse. `holder_alive` additionally compares the recorded start time, so a new process with the same PID does not inherit the old identity.

### Adopting leases without an exclusion gap

When a new engine image is fully published, the running server hands the native connection to a successor:

1. Generate a one-time handoff secret and pass it only to the child.
2. The child authenticates with `squad/lease_adopt` before serving ordinary requests.
3. For every held scope, the child takes its own deny-write handle **while the parent still holds its handle**. Concurrent read-sharing opens coexist.
4. `transfer_holder` re-points the tenancy records to the child's PID, start time, and session under `with_transition`.
5. Only after every handle and record moves does the parent withdraw and close.

At no point does the target lose write-denying kernel exclusion. A failed adoption stops the child and leaves the parent serving with its original handles and records.

## 8. Fencing Continues Into Every Execution Surface

Generation checks would be decorative if they stopped at the lease manager. They are wired into file replacement, SQLite, worker acts, and successor result delivery.

### File write funnel

`require_write_binding` requires an exact file lease, expected generation equal to `lease.generation`, matching task, valid tenancy and control epoch, and a server execution handle. Parent-scope ownership alone cannot authorize an exact mutation. A governing source cannot also be the destination; that requires a separately governed revision task.

The precondition compares bytes observed through `W` with the planned preimage. A mismatch at execution is `preimage_hash_mismatch`, not permission to proceed on stale content.

### Fenced SQLite mutation

Protected row changes serialize through `with_transition` and open SQLite with `TransactionBehavior::Immediate`. Before update, the engine:

- rereads the current row and requires `now_version == expected`;
- captures recovery state;
- revalidates target identity, `RequestedAct`, and approval;
- executes a conditional `UPDATE ... WHERE key = ? AND version = ?`;
- requires exactly one changed row;
- reads the row back and verifies the new version and values before commit.

A competing change becomes `record_version_changed` and returns the operation for review instead of applying it. The observed post-commit destination is checked again before the receipt finishes.

### `RequestedAct` and result grants

For strict worker staging, `RequestedAct` derives the typed key and prepared version from exact projected bytes and binds the row task's current generation and control epoch. The worker cannot substitute a different row or revive an older generation.

`result_grant.rs` applies the same current-tenancy rule to the receiving task. Its scope must still have a nonzero current generation and matching control epoch. Otherwise result-only tools remain withheld. A successor can receive a historical result only under fresh receiving authority; the original return is not fabricated.

Break-glass adds the final lineage check: advancing the control epoch revokes leases minted under older epochs even when their wall-clock TTL has not expired.

## 9. Release Verification and Quarantine

Release is another evidence boundary, not a lockfile deletion with good intentions.

`release_content_check` compares on-disk bytes with:

- `post_sha256` from the last gated write under the lease, when one exists; or
- the lease's captured pre-write FNV-1a and byte count when no gated write occurred. That FNV-plus-length comparison is a **non-cryptographic drift check**, useful for noticing ordinary change, not for proving integrity against a malicious writer capable of engineering a collision. It is distinct from the SHA-256 comparisons used for gated-write and guarded-publication verification.

If content matches, release archives the post-edit state to Amber. If it diverges, release archives the divergent bytes as **`quarantine_ungated`**, emits `released_with_ungated_content`, and returns `content_mismatch: true`.

It never silently restores the baseline or deletes the foreign bytes. Out-of-band content is preserved for forensic review rather than being laundered into trusted history.

### The out-of-band owner lock kill-switch

Breaking another agent's live, unexpired lease is refused by default. Force release is permitted only when an owner has written `.squad/control/lock-release.json` out of band, naming the authorized owners, scopes, setter, reason, and optional expiry. No MCP tool can create that authorization. The force break records `lock_force_released_under_owner_authorization` in the integrity graph.

### Exhibit 5 — Release quarantine instead of baseline laundering

```json
{
  "released": "project:/artifacts/renewal-result.json",
  "owner": "reviewer-beta",
  "was_held": true,
  "amber_kind": "quarantine_ungated",
  "content_mismatch": true,
  "content_check": {
    "status": "mismatch",
    "baseline_source": "gated_write_post_sha256",
    "expected_sha256": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
    "actual_sha256": "c0ffee99887766554433221100ffeeddccbbaa99887766554433221100ffeedd"
  },
  "warning": "Divergent bytes preserved in Amber and released_with_ungated_content recorded; baseline was not silently restored"
}
```

## Platform and Route Matrix

| Route or condition | Enforcement and claim ceiling |
|---|---|
| Windows long-lived MCP server | Kernel handle exclusion is enforced across tenancy and all five replacement roles |
| Windows short-lived CLI | Lease is advisory because process exit drops handles; protected execution requires a server-held handle |
| Non-Windows | No equivalent Win32 share-mode, parent-pin, native-rename, or liveness claims; no false equivalence is asserted |
| Handles or memory mappings opened before acquisition | Not retroactively revoked; the gate governs later incompatible opens, not every pre-existing capability |
| Guarded replacement intervals | Write opens are continuously denied; delete/rename residuals are detected and reconciled as described, not claimed eliminated |
| SQLite destination | `IMMEDIATE` transaction and version fence govern the row; this is not the Win32 file-handle path |
| External SaaS or non-idempotent API | Requires destination-specific conditional-write, observation, and reconciliation guarantees; the local file gate does not prove external exactly-once effect |
| Privileged host administrator or volume unmount | Outside the application's prevention claim; remaining exposure is named rather than hidden |

The architecture is therefore strong without becoming unfalsifiable. It names the route it governs, the kernel primitives that enforce it, the interval it cannot close, and the evidence that remains when verification fails.

Consider a writer that opened `GENERIC_WRITE` or a memory-mapped section **before** `G` was acquired. The new guard cannot retroactively revoke that capability, and the mapping may outlive the original handle. Release-time content comparison and `quarantine_ungated` can preserve evidence of the resulting drift, but they cannot turn that into retroactive prevention. A deployment must inventory and exclude pre-existing write capabilities before claiming exclusive mediation of the resource.

Compatibility must be demonstrated for the exact Windows and filesystem profile in scope: destination present or absent, open readers, conflicting writers, reparse redirection, parent substitution, failure at every handoff, and crash recovery. NTFS/ReFS support is not inferred merely because the native rename API exists.

## 10. The 2026 Fencing Evidence Landscape

The research supports monotonic execution fencing and exposes the same limitation that matters here: a mechanism proves only the effect classes its boundary actually covers.

| 2026 primary source | What it establishes | How this architecture composes with it |
|---|---|---|
| Shu, [*Boundary-State Control for Tool-Using Language-Model Agents*](https://arxiv.org/abs/2609.37475), September 2026 preprint | BSC-R binds a single-use authorization to the exact action and semantic authorization state. It rejects all ten represented changed/replayed classes across 10,302 frozen proposals, prevents 1,200 represented non-replay invalid effects in CONTINUITY, handles 160 replay lifecycles, and withholds 200 ambiguous cases. In the broader external suite, it commits 25% of invalid effects. | This is direct evidence for exact-act and generation binding at commit. It is equally strong evidence for path and effect coverage ceilings: no fencing claim should exceed the contexts actually governed. |
| Lyu et al., [*CoAgent: Concurrency Control for Multi-Agent Systems*](https://arxiv.org/abs/2606.15376), June 2026 preprint | MTPO fixes a serialization order, serves order-filtered reads, and repairs dependent plans while preserving serializable outcomes. CoAgent stays within 5% of serial correctness at a 1.4× speedup and improves a bash-only target from 45/71 to 63/71 passes at 0.80× time. | Multi-agent concurrency requires authoritative ordering and current-state evaluation, not prompt cooperation. AINA's transition mutex and workspace high-water sequence supply that ordering for the local reference embodiment. |
| [Redisson FencedLock documentation](https://redisson.org/glossary/java-fencedlock.html), current 2026 reference | Defines a fencing token as a monotonically increasing value issued on each lock acquisition and presented to the resource so stale holders can be rejected. | This is the basic distributed-system model behind generation fencing. The Room adds two-phase counter persistence, kernel share-mode exclusion, and per-route verification rather than treating the token as self-enforcing. |
| Microsoft [`CreateFileW` and file-sharing documentation](https://learn.microsoft.com/en-us/windows/win32/fileio/creating-and-opening-files), current 2026 reference | Desired access and sharing modes determine which later opens are compatible; `FILE_SHARE_DELETE` is required for rename/delete semantics. | Explains why the long-term `FILE_SHARE_READ` guard must hand off through `W`, `T`, and `H` rather than closing and reopening around the rename. |
| Microsoft [`FILE_RENAME_INFORMATION_EX`](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/ntifs/ns-ntifs-_file_rename_information), current 2026 reference | Defines POSIX rename and replacement flags and relative rename behavior. | Grounds the native handle-relative atomic replacement with POSIX semantics; it is a primitive, not a complete proof of continuous exclusion. |
| Microsoft [`GetFinalPathNameByHandleW`](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getfinalpathnamebyhandlew), current 2026 reference | Resolves the canonical target of an opened file object through reparse indirection. | Grounds parent and published-object identity verification, catching cases where identity and content match but the leased name points elsewhere. |

The functional-equivalence concession still applies. A conventional stack using leases, fencing tokens, compare-and-swap, MVCC, durable logs, and destination-specific conditional writes can defeat the same defect if it binds the same exact transition through the same predicates. AINA's value is the inspectable composition and its refusal/evidence grammar, not a claim that alternative coordination theory cannot work.

**Evidence availability and performance boundary:** the implementation and replacement records are `CONTROLLED` for qualified, method-scoped technical review, with adverse findings permitted. They are not unrestricted public downloads or independent validation. Handle timing, lock contention, rename latency, and recovery cost must be measured for the exact Windows filesystem, antivirus/storage stack, destination state, and worker count; this article does not claim a universal performance envelope.

## The Adversarial Stale-Writer Challenge

The **Shared-Resource Lease & Kernel Fencing Challenge** uses a deliberately hostile sequence, not just a happy-path replacement:

1. Worker A acquires generation 14 and stalls.
2. Worker B acquires generation 15 and completes a guarded replacement.
3. Worker A resumes and attempts both a stale-generation write and a direct incompatible file open.
4. The executor returns `stale_lease_generation`; the kernel returns `ERROR_SHARING_VIOLATION`.
5. A separate parent-redirection or preimage-displacement attempt produces typed reconciliation evidence and, where applicable, `quarantine_ungated` rather than an invented clean rollback.

The challenge excludes retroactive revocation of pre-existing handles and mappings, universal OS/filesystem coverage, total effect coverage, and independent validation. Deployment and paid pilots are separately scoped; independent evaluation remains outside the commercial ladder through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## The Twelve Execution Claims

| ID | Bounded claim | Evidence and ceiling |
|---|---|---|
| `05-C01` | Six typed lease namespaces and hierarchical conflict rules govern ownership; FNV-1a is only a routing key | Implemented and author-verified for all lease requests; full canonical identity decides authority |
| `05-C02` | Filesystem scopes reject ambiguous paths and resolve opened object identity through handles | Implemented and author-verified on local NTFS/ReFS targets |
| `05-C03` | Workspace-wide monotonic generations use two-phase persistence and refuse rollback | Implemented and author-verified; missing state never resets to zero |
| `05-C04` | A 30-second cross-process mutex serializes lease and write transitions | Implemented and author-verified for local controller and worker transitions; it is never stolen by age |
| `05-C05` | Dead-holder re-granting requires same owner/task and proof of death, then mints a new generation | Implemented and author-verified; unknown or reused PIDs fail closed |
| `05-C06` | Heartbeats clamp to 15 minutes and cannot resurrect expired tenancies; holder transfer is all-or-restored | Implemented and author-verified for current lifecycle paths |
| `05-C07` | Long-lived servers deny later incompatible write/delete opens with `FILE_SHARE_READ` | Implemented and author-verified; pre-existing handles/mappings are not retroactively revoked and CLI leases are advisory |
| `05-C08` | Parent directories are pinned by handle and re-resolved during replacement | Implemented and author-verified for parent redirection, not volume unmount or privileged host-admin behavior |
| `05-C09` | Five-role overlapping replacement uses native POSIX handle rename with continuous write-open exclusion | Implemented and author-verified on supported Windows filesystems; delete/rename residuals remain separately disclosed |
| `05-C10` | Surviving `W` handles prove positive preimage displacement | Implemented and author-verified for intact-link, nondeleted, different-path cases; delete-and-recreate can remain indistinguishable |
| `05-C11` | Publication failures classify into six structured reconciliation records with exact next actions | Implemented and author-verified; no automatic rollback or clean success is invented |
| `05-C12` | Server liveness is PID-reuse-resistant and image handoff preserves exclusion | Implemented and author-verified through sharing-violation records and shared handle adoption |

## The Article 05 Claim Card

```text
Mechanism:
  AINA Typed Leases, Monotonic Generation Fencing, and Guarded Replacement
  (typed scopes, room.generation.v2, transition mutex, lifecycle guards,
   G/W/T/H/G' handles, parent pin, liveness, SQLite fences, and release quarantine)

Failure it governs:
  Stale workers resurrecting after lease expiry;
  uncooperative local write/delete/rename opens;
  rolled-back generation stores and successor-tenancy confusion;
  parent junction swaps and destination reparse redirection;
  displaced preimages and divergent post-release content.

Positive path:
  current task and tenancy
  → workspace-wide generation and control epoch
  → exact server-held scope and preimage observation
  → five-role guarded replacement with parent pin
  → identity + content + resolved-path + displacement verification
  → fresh destination observation
  → structured release or quarantine.

Refusal / reconciliation path:
  stale_lease_generation, lease_expired, lease_task_mismatch
  generation_store_missing, generation_checkpoint_mismatch
  ERROR_SHARING_VIOLATION (32), destination_parent_redirected
  GuardLost, NameRedirected, IdentityChanged, ContentDiverged,
  PreimageDisplaced, Unverifiable
  record_version_changed, result_grant_tenancy_required
  content_mismatch and released_with_ungated_content.

Evidence status:
  Implemented and Author-Verified on the declared Windows reference embodiment.
  2026 research is primary-source context, not endorsement or independent validation.
  No universal external exactly-once or total-effect-coverage claim is made.

Verifier and artifacts:
  .generations-initialized and generations.json
  lease tenancy records and pre-write state
  .lease-transition.mutex
  G/W/T/H/G' handle identities and content hashes
  parent object identity and resolved paths
  six structured PublishFault records
  server liveness records and transfer_holder
  SQLite readback and result_grant tenancy
  Amber post_edit and quarantine_ungated.

Scope and claim ceiling:
  Win32 NTFS/ReFS reference mechanisms, not POSIX-equivalent guarantees.
  Later incompatible opens are denied; pre-existing handles/mappings are not revoked.
  Delete/rename intervals are bounded and reconciled, not claimed eliminated.
  Third-party delete-and-recreate can remain indistinguishable from ordinary replace.
  External effects require destination-specific guarantees and observation.
  No privileged host-admin or universal external exactly-once claim.

Next stage in the machine:
  Article 05 enforces current ownership at the mutation window.
  Article 06 proves rollback is not erasure: Primary and Amber recovery,
  pre-write baseline verification, and ungated-content quarantine.

Commercial doorway:
  Shared-Resource Lease & Kernel Fencing Challenge — bring one shared file
  or SQLite row exposed to multiple workers; receive a stale-generation replay,
  guarded replacement demonstration, and recovery/quarantine evidence map
  (Article 09 · me@blayneaina.com).
```

## The Clock Is Not the Fence

A lease expires because coordination needs a way forward. That does not mean the old worker has become harmless. Authority must change form at the resource: a new generation, a new holder, a new epoch, and a kernel-enforced exclusion that survives the replacement.

The architecture does not stop at that success condition. It also preserves what happened when the world did not cooperate: which guard was lost, which name redirected, which object changed, which content diverged, which preimage moved, and which checks could not run. Failure becomes reconciliation evidence rather than a vague error or a fabricated rollback.

That is the difference between a lease timer and execution fencing.

> **Expiry lets ownership move. Generation decides whether an act is current. Kernel exclusion decides whether an uncooperative writer can open the file. Verification decides whether the published object actually earned success.**

Article 06 takes up the next non-equivalence: a verified replacement still needs recovery. Rollback restores a prior state; it does not erase what happened, and ungated mutations must never be hidden inside a clean baseline.

## Frequently Asked Questions

### Why is lease expiry not fencing?

Expiry allows ownership to move after a holder stops responding, but it does not erase a stale worker's process, cached authority, delayed request, or physical ability to write. The resource must reject the stale generation at execution.

### Is FNV-1a part of the security proof?

No. FNV-1a is only a deterministic routing key for lease filenames. Authority decisions compare the complete canonical namespace and resource identity, current generation, task, control epoch, and execution handle.

### Why are five handle roles necessary?

The long-term guard denies delete, but Windows requires delete sharing for rename-over. `G`, `W`, `T`, `H`, and `G'` hand off exclusion in overlapping stages so no interval permits a write open, while `P` pins the parent and verification proves the published object.

### Does the kernel gate revoke handles or mappings opened earlier?

No. Share modes govern later incompatible opens. They do not retroactively revoke pre-existing handles, memory-mapped sections, or privileged host-admin behavior. Those routes require separate inventory and controls.

### What does preimage displacement detection prove?

It proves that the original object kept all links, was not deleted, and now resolves to a different ordinary path. That means it moved before the rename and an uncaptured object was replaced. Delete-and-recreate can remain indistinguishable, so the article does not claim universal recovery.

### Does this guarantee exactly-once external effects?

No. It proves current ownership and verified replacement on the governed Windows file route, plus version-fenced SQLite mutations. External services and non-idempotent APIs need their own conditional-write, observation, and reconciliation guarantees.

## Continue the Series

- **Series index:** [From Proposal to Consequence: The AINA Transition-Governance Series](https://blayneaina.com/series/from-proposal-to-consequence)
- **Previous:** [Article 04 — The Room: Why Git and Chat Are Not Coordination Planes](https://blayneaina.com/architecture/the-room-coordination-plane/)
- **Next:** [Article 06 — Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine](https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/)
- **Deployment and independent review:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)

---

## Primary 2026 Sources

- [Shu — *Boundary-State Control for Tool-Using Language-Model Agents: Commit-Time Consistency under State Drift*, `arXiv:2609.37475`](https://arxiv.org/abs/2609.37475)
- [Lyu et al. — *CoAgent: Concurrency Control for Multi-Agent Systems*, `arXiv:2606.15376`](https://arxiv.org/abs/2606.15376)
- [Redisson FencedLock Documentation](https://redisson.org/glossary/java-fencedlock.html)
- [Microsoft `CreateFileW` and File-Sharing Documentation](https://learn.microsoft.com/en-us/windows/win32/fileio/creating-and-opening-files)
- [Microsoft `FILE_RENAME_INFORMATION_EX`](https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/ntifs/ns-ntifs-_file_rename_information)
- [Microsoft `GetFinalPathNameByHandleW`](https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getfinalpathnamebyhandlew)

---

## Publication Metadata

**Title tag:** Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion  
**Meta description:** Why wall-clock lease expiry cannot stop stale AI writes: typed scopes, monotonic generations, five-role Win32 handle exchange, preimage forensics, and release quarantine.  
**Series navigation:** [Series index](https://blayneaina.com/series/from-proposal-to-consequence) · Article 05 of *From Proposal to Consequence: The AINA Transition-Governance Series*.  
**Previous installment:** [Article 04 — The Room: Why Git and Chat Are Not Coordination Planes](https://blayneaina.com/architecture/the-room-coordination-plane/).  
**Next installment:** [Article 06 — Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine](https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/"
      },
      "headline": "Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion",
      "alternativeHeadline": "Why Wall-Clock TTLs Fail Under Worker Stalls and How Monotonic Generations and Five-Role Win32 Handle Exchanges Enforce Execution Fencing",
      "description": "Why wall-clock lease expiry cannot stop stale AI writes: typed scopes, monotonic generations, five-role Win32 handle exchange, preimage forensics, and release quarantine.",
      "proficiencyLevel": "Expert",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T12:00:00-06:00",
      "dateModified": "2026-11-05T12:00:00-06:00",
      "position": 5,
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
        { "@type": "Thing", "name": "Distributed Leases and Fencing Tokens" },
        { "@type": "Thing", "name": "Monotonic Generation Counters" },
        { "@type": "Thing", "name": "Win32 Handle Sharing Modes and Sharing Violation" },
        { "@type": "Thing", "name": "Atomic POSIX File Renaming by Handle" },
        { "@type": "Thing", "name": "Preimage Displacement Detection" },
        { "@type": "Thing", "name": "AI Agent Concurrency Control" }
      ],
      "citation": [
        "https://arxiv.org/abs/2609.37475",
        "https://arxiv.org/abs/2606.15376",
        "https://redisson.org/glossary/java-fencedlock.html",
        "https://learn.microsoft.com/en-us/windows/win32/fileio/creating-and-opening-files",
        "https://learn.microsoft.com/en-us/windows-hardware/drivers/ddi/ntifs/ns-ntifs-_file_rename_information",
        "https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-getfinalpathnamebyhandlew"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/#breadcrumb",
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
          "name": "Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion",
          "item": "https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/"
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
  "@id": "https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is lease expiry not fencing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Expiry allows ownership to move after a holder stops responding, but it does not erase a stale worker's process, cached authority, delayed request, or physical ability to write. The resource must reject the stale generation at execution."
      }
    },
    {
      "@type": "Question",
      "name": "Is FNV-1a part of the security proof?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. FNV-1a is only a deterministic routing key for lease filenames. Authority decisions compare the complete canonical namespace and resource identity, current generation, task, control epoch, and execution handle."
      }
    },
    {
      "@type": "Question",
      "name": "Why are five handle roles necessary?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The long-term guard denies delete, but Windows requires delete sharing for rename-over. `G`, `W`, `T`, `H`, and `G'` hand off exclusion in overlapping stages so no interval permits a write open, while `P` pins the parent and verification proves the published object."
      }
    },
    {
      "@type": "Question",
      "name": "Does the kernel gate revoke handles or mappings opened earlier?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Share modes govern later incompatible opens. They do not retroactively revoke pre-existing handles, memory-mapped sections, or privileged host-admin behavior. Those routes require separate inventory and controls."
      }
    },
    {
      "@type": "Question",
      "name": "What does preimage displacement detection prove?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It proves that the original object kept all links, was not deleted, and now resolves to a different ordinary path. That means it moved before the rename and an uncaptured object was replaced. Delete-and-recreate can remain indistinguishable, so the article does not claim universal recovery."
      }
    },
    {
      "@type": "Question",
      "name": "Does this guarantee exactly-once external effects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It proves current ownership and verified replacement on the governed Windows file route, plus version-fenced SQLite mutations. External services and non-idempotent APIs need their own conditional-write, observation, and reconciliation guarantees."
      }
    }
  ]
}
</script>
