---
title: "Defeating Approval Laundering: Act Pinning and Successor Grants"
subtitle: "Approval must bind the exact act before the worker environment exists, authority must be re-derived at commit, and recovery must not fabricate the original session's receipt."
author: "Blayne Aina"
datePublished: "2026-10-31T14:00:00-06:00"
dateModified: "2026-11-01T12:00:00-06:00"
canonicalUrl: "https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/"
series: "From Proposal to Consequence: The AINA Transition-Governance Series"
position: 7
description: "Pre-resume kernel verification, controller-fixed RequestedAct, fenced SQLite execution, multi-destination holds, and non-fabricating successor result grants."
keywords:
  - approval laundering prevention
  - controller-fixed RequestedAct
  - approval-execution binding
  - act pinning architecture
  - pre-resume kernel verification
  - SQLite BEGIN IMMEDIATE
  - crash recovery continuity
  - successor result grants
  - crash-straddling continuity
  - process snapshotting
  - CompareObjectHandles
isAccessibleForFree: true
inLanguage: en-US
---

# Defeating Approval Laundering: Act Pinning and Successor Grants

*Approval must bind the exact act before the worker environment exists, authority must be re-derived at commit, and recovery must not fabricate the original session's receipt.*

**By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026**

---

Hashing a worker's proposal after it arrives is too late.

A human or policy may approve action \(A\), but the worker can still execute \(A'\): a different row, target, payload, route, or time. A safe execution boundary cannot trust that the proposal and its effect remain identical unless the trusted controller fixes the act before the worker environment exists and revalidates that exact object at the destination's ordering point.

Three coupled failures follow:

1. **Launch substitution:** a worker begins life with an unclassified handle, an inherited capability, or a native unconfined route.
2. **Approval laundering:** a valid general approval becomes a different mutation at execution.
3. **Crash-straddling:** the destination commits, the worker dies before first receipt, and a successor either repeats the effect or invents original-session completion.

Article 06 preserved recovery evidence. Article 07 binds the execution itself: pre-resume kernel inspection, controller-brokered model egress, `RequestedAct`, fenced SQLite execution, multi-destination holds, and non-fabricating successor grants.

> **The controller fixes the act. The destination rechecks it. History may be read by a successor, but the original return is never invented.**

## One Approved Mutation, Three Places to Fail

Suppose a policy approves raising one customer's credit limit from 10,000 to 25,000.

The trusted controller first projects exactly that row and prepares the change. A prompt-injected worker then tries to substitute a different customer and a higher limit. At the same time, an unrelated writer increments the approved row's version, and the worker's host dies immediately after the database commits.

The machine handles each failure separately:

- **Before launch:** the suspended worker's package SID, LPAC attribute, capabilities, Job membership, and current handle inventory are verified. A sentinel match or unclassified handle terminates the Job before instruction 0.
- **Before execution:** the controller has already fixed the exact row, key, fields, and expected version in `RequestedAct`. The substitute customer is not a permissible interpretation of that act.
- **At the destination:** SQLite takes its write reservation, the row is reread, recovery is captured, and current task, source, tenancy, act, and approval are revalidated. The other writer's version increment makes the conditional update fail instead of overwriting new state.
- **After commit:** a fresh result-only successor may read the historical outcome if its tenancy, grant, wake, source, and Room-return proofs all hold. It does not repeat the write and does not claim the dead worker received the result.

Approval is therefore not one event at the prompt. It is a chain of proof that survives substitution, concurrency, and crash—without being confused with the original session's receipt.

## 1. Pre-Resume Kernel Verification

A confined process must be inspected before instruction 0. Once the worker runs, every later control is negotiating with an already-active environment.

### Exhibit 7.1 — Pre-resume kernel audit

```text
Derive exclusive AppContainer profile or per-launch host SID
→ CreateProcessW(CREATE_SUSPENDED) inside owned Job Object
→ Query raw token: package SID + WIN://NOALLAPPPKG + exact capabilities
→ PssCaptureSnapshot + PssWalkSnapshot handle table
→ DuplicateHandle + CompareObjectHandles against owned references
→ reject any sentinel match or unclassified object
     ├─ PASS → ResumeThread exactly once
     └─ FAIL → terminate suspended Job; no worker instruction executes
```

<aside class="context-callout" aria-label="Linux and POSIX kernel counterparts">
  <h2>Linux / POSIX Kernel Counterparts</h2>
  <p><code>CreateProcessW(CREATE_SUSPENDED)</code> + <code>PssCaptureSnapshot</code> + PEB inspection maps on Linux to <code>clone3()</code> / <code>pidfd_open()</code> stopped-start spawning with <code>/proc/&lt;pid&gt;/fd</code>, <code>/proc/&lt;pid&gt;/cmdline</code>, and <code>/proc/&lt;pid&gt;/maps</code> verification prior to <code>execve</code> / signal continuation.</p>
</aside>

### Exclusive identity and anti-reuse

`container_sid` calls `CreateAppContainerProfile` for a fresh per-launch profile. `E_ALREADY_EXISTS_HR = 0x8007_00B7` becomes `confinement_identity_reused`; an existing profile cannot be borrowed with its old ACLs, files, or residual state.

Brokered hosts that cannot run inside an AppContainer receive an application-defined Resource Manager SID in `S-1-9`. Its first sub-authority is ASCII `"SQAD"` (`0x5351_4144`), followed by four 32-bit words carrying 128 SHA-256 bits derived from the launch's container name. It names no local user, group, or domain account, so host permissions come only from explicit launch grants.

### Raw LPAC attribute verification

`verify_worker_token` queries the suspended process token directly:

- `TokenAppContainerSid` must equal the owned package SID;
- `TokenSecurityAttributes` must contain `WIN://NOALLAPPPKG`;
- the attribute must be integer kind `2`, count `1`, not disabled (`flags & 0x10 == 0`), and nonzero.

The controller does not rely on a platform LPAC query that may be unavailable. It parses the raw table with buffer bounds and UTF-16 decoding, then compares the actual restriction to the requested one.

### Handle-table object identity, not numeric equality

Windows handle values are process-local indices. They do not prove which kernel object they name, and two different values can name the same object.

`PssCaptureSnapshot` and `PssWalkSnapshot` enumerate the suspended child's current handle table. The controller duplicates candidate handles and calls `CompareObjectHandles` against owned references for expected stdio, Job, and other provenance objects. A deliberately excluded sentinel proves whether anything outside the launch list was inherited. Unknown objects, missing expected matches, sentinel matches, incomplete inventory, or token mismatch refuse the resume.

PSS proves the **current handle inventory at capture time**, not historical inheritance. The architecture therefore combines the explicit launch `HANDLE_LIST`, current inventory, and object comparison rather than inventing an inheritance proof.

### The native spawn gate

`require_native_spawn_allowed` refuses a native launch or existing-session attachment whenever owner policy or staged grants mandate confinement. Expired or revoked grants do not create an unconfined fallback. Project-mandated work runs only under its staged project identity.

This is the anti-fallback rule: if the worker cannot launch under the required boundary, it does not launch.

## 2. Controller-Brokered Model Egress

Confined workers have no general network capability. Model access is a separate controller-owned transition, not an ambient HTTP client.

### Authenticated local channels

For LPAC workers, the controller exposes a per-worker `AF_UNIX` endpoint with a restrictive ACL. It verifies the held worker with `IsProcessInJob`, `verify_worker_token`, exact capabilities, and a 32-byte launch nonce. It does not pretend that AF_UNIX supplies a portable peer-process identity; the held process is the evidence.

Brokered hosts use a first-instance Named Pipe with `PIPE_REJECT_REMOTE_CLIENTS`. `QueryFullProcessImageNameW` must resolve to the exact staged bridge executable.

Every request and response is bounded and rechecked. Revocation before response transport produces a typed refusal; partial responses produce `severed_mid_response`, not a second contradictory frame.

### The controller owns the route

The worker names only an owner route ID and JSON body. The controller owns:

- exact HTTPS destination or isolated subscription CLI;
- credential injection and fixed headers;
- allowed models and output-token ceilings;
- request/response byte limits and request budget;
- project, agent, expiry, and control-epoch admission.

Routes can use API credentials or isolated `claude.exe`/`codex.exe` subscription CLIs. The worker never receives the credential or chooses a URL.

### Journal before dispatch; never replay uncertainty

Every request is appended to `model-egress/ledger.jsonl` **before** network transmission. A last admission check occurs immediately before send.

Stopping a broker stops the worker from receiving a result, but it does not recall an in-flight HTTP request. `settle_in_flight` waits for controller-side outcomes to append. If the provider outcome remains unknown, the operation stays `unresolved`, counts against the route's budget, and can be settled only by a trusted operator through `reconcile` using provider-side evidence. Reconciliation never resends and does not automatically return the budget slot.

### Exhibit 7.6 — Unresolved model egress

```json
{
  "operation_id": "model_op_synthetic_07",
  "route": "owner-approved-analysis-route",
  "destination": "https://models.example/v1/respond",
  "actor": "reviewer-beta",
  "task": "TSK-2026-ACT-007",
  "project_id": "proj_synthetic",
  "begun_at": "2026-10-31T19:00:00Z",
  "request_sha256": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
  "latest_outcome": null,
  "disposition": "unresolved; never resent; operator reconciliation required"
}
```

An approved model route does not prove semantic confidentiality of the staged projection. It proves destination, credential, budget, and continuity authority. Content still needs Semantic Switch to transform native values before provider-exposed qBlock and later computation, with native rows and the private crosswalk retained locally as Article 03 establishes.

## 3. Controller-Fixed `RequestedAct`

The act is derived from exact projected bytes before the worker environment is issued. It is not re-read from live model prose at execution time.

This is the **strict confined-worker staging path**. The destination also admits controller-driven record changes, whose authority must not be described as if every call used identical staging. Those changes still require the exact task, row, pre-state, act, approval, and current tenancy; they do not inherit the worker environment's proof by implication. The common invariant is exact-act and current-authority verification, not a claim that all routes are physically identical.

### Exhibit 7.2 — `RequestedAct` lifecycle

```text
prepare: projected bytes → one typed row key + integer version + permitted changes
→ persist: environment + task authority + source tenancy + RFC 8785 digest
→ create-only requested_acts/<sha256>.json + sync_all + exact readback
→ worker receives environment and act reference
→ validate: open with FILE_SHARE_READ and retain handle through UPDATE/commit
→ re-derive current task authority, source tenancy, and exact destination
→ historical: verify completed act without consulting current tenancy
```

### Derivation

`prepare` requires one staged SQLite row and validates that its typed key matches the projection. Proposed changes must be nonempty, at most 64 fields and 16 KiB, exclude the key and `version`, and remain inside the declared projection fields. The current version must be a nonnegative integer.

The destination becomes `{source}#{table}#{key_column}={typed_key}`. Worker input does not select a different row.

### Durable fixation

`persist` re-resolves task authority and source tenancy, then binds:

- environment ID and worker;
- staging actor and complete task binding;
- exact source projection receipt;
- source generation and source tenancy;
- the controller-fixed destination.

RFC 8785 JCS canonicalization produces the act reference. The record is written with create-new semantics to `requested_acts/<sha256>.json`, flushed with `sync_all()`, and read back for exact body and digest equality. JCS is an **Informational RFC**, and the implementation uses it to make the digest repeatable rather than to make the act authorized by hashing alone.

### Execution revalidation

`validate` opens the act with Windows `share_mode(1)` and retains that handle through update and commit. It recomputes the digest, re-derives current task authority and source tenancy, and requires the environment, worker, actor, task binding, source, generation, and exact destination to match. Any authority drift becomes `requested_act_authority_changed`; any target, key, field, or version divergence becomes `requested_act_mismatch`.

The pinned handle prevents deletion or replacement of the act object during the mutation window.

### Historical verification

`historical` verifies a completed act against the immutable submission without consulting current tenancy (`current_authority_consulted: false`). A retired environment or released row task does not falsify a valid past act. It checks the reference, environment, worker, task, staged source, tenancy-at-staging, and exact destination rather than reviving execution authority.

### Exhibit 7.4 — Sanitized `RequestedAct` record

```json
{
  "schema": 1,
  "environment_id": "env_synthetic_worker_07",
  "worker": "reviewer-beta",
  "actor": "controller-alpha",
  "task_binding": {
    "id": "TSK-2026-ACT-007",
    "owner": "controller-alpha",
    "project_id": "proj_synthetic",
    "project_root_pin": "project:/workspace",
    "source": "doc_20261030_142011_a1b2c3d4",
    "scope": "session://sqlite.records/accounts.db#customers#customer_id=cust_994182",
    "coordination_only": false,
    "epoch": 4,
    "revision": 2,
    "delegation": null
  },
  "source": {
    "path": "project:/data/accounts.db",
    "projection": {
      "format": "sqlite",
      "table": "customers",
      "row_key": "customer_id",
      "row_values": ["cust_994182"],
      "fields": ["tier", "status", "credit_limit"]
    },
    "sha256": "4a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b"
  },
  "source_generation": 12,
  "source_tenancy": {
    "scope": "session://sqlite.records/accounts.db#customers#customer_id=cust_994182",
    "task": "TSK-2026-ACT-007",
    "generation": 12,
    "control_epoch": 4
  },
  "act": {
    "destination": {
      "target": "accounts.db#customers#customer_id=cust_994182",
      "key": "cust_994182",
      "key_field": "customer_id",
      "expected_version": 3,
      "fields": {
        "tier": "enterprise_gold",
        "status": "active"
      }
    }
  }
}
```

### Exhibit 7.5 — `requested_act_mismatch`

```json
"requested_act_mismatch: proposed target, key, changes or prepared version differs from the controller-fixed act"
```

The worker's altered proposal does not acquire authority by resembling the approved one.

## 4. The Fenced SQLite Execution Window

`destinations/records.rs` executes the mutation inside one ordered window that joins lease authority, transaction isolation, act validation, recovery, and observation.

### Exhibit 7.3 — SQLite fenced execution flow

```text
acquire file coordination lease
→ with_transition
→ BEGIN IMMEDIATE (write reservation)
→ reread row and require now_version == expected
→ capture prior row values + JCS digest for recovery
→ recheck locator identity
→ revalidate pinned RequestedAct
→ recheck live approval
→ recheck locator identity again
→ UPDATE ... WHERE key = ? AND version = expected
→ require changed_rows == 1
→ pre-commit readback: exact fields and version = expected + 1
→ transaction.commit()
→ release lease
→ independent post-commit observation and durable outcome
```

`BEGIN IMMEDIATE` starts a write transaction immediately instead of waiting for the first write statement. The version predicate adds a second, destination-native optimistic concurrency check: if an uncooperative writer moved the row, the conditional update cannot satisfy `key + expected_version`, and the operation refuses rather than overwriting it.

The transaction is not trusted merely because it is immediate. The engine also revalidates target, act, and approval inside that same window and requires readback to equal the approved result before commit.

### Exhibit 7.7 — Row-version refusal

```json
"record_version_changed: the row moved to version 4 after operation model_op_synthetic_07 was proposed; nothing applied, it returns for review (reconcile the operation as absent)"
```

The proposed version was 3. The current version is 4. Nothing was applied.

### Recovery capture is separate from the mutation

Before update, the engine records prior row values and their JCS digest through `prepare_recovery`. A governed restoration is separately authorized and requires the exact post-operation state. Recovery is not a license to repeat the original mutation or to erase its uncertainty.

### Exhibit 7.8 — Pre-write recovery capture

```json
{
  "method": "row_values",
  "version": 3,
  "values": {
    "customer_id": "cust_994182",
    "tier": "standard",
    "status": "pending",
    "credit_limit": 10000
  },
  "sha256": "58b2e91f4c03d8a7126590ef4312ab98c7654321fedcba09876543210fedcba9"
}
```

The capture proves what preceded the write. It does not prove that the write occurred or that its result was returned.

## 5. Multi-Destination Capability Plans

A coordinated plan is not a distributed transaction. Each destination declares what its own write path can actually guarantee.

| Destination | Declared guarantees | `cross_destination_atomic` |
|---|---|---|
| `sqlite.records` | `conditional_write`, `idempotent_retry`, `recovery_capture` | `false` |
| `goose.sessions.db` | `conditional_write`, `idempotent_retry`, `recovery_capture` | `false` |
| `opencode.http_api` | Empty set; every fresh effect is held | `false` |

A plan names required guarantees for each step. `require_route` evaluates them before an operation begins and again before effect. An unmet requirement produces `destination_route_incompatible` and the step is held. Nothing silently accepts the gap.

A versioned revision is the only way to change those requirements. It names every removed requirement and the weaker semantics now in force, records its authorization, and invalidates decisions made for the prior version. Authorization comes from a trusted operator other than the plan's author, or from the author only when every step runs under the owner's exact project assignment.

Partial completion is tracked per step. Compensation is a separately governed restore naming the exact applied operation. There is no simulated 2PC and no `cross_destination_atomic: true` hiding behind an orchestration diagram.

## 6. Non-Fabricating Successor Grants

A committed effect and its first receipt are different events. A crash can separate them permanently.

### The `ResultGrant`

A controller may issue a `ResultGrant` for one historical proposal to a **new receiving task and environment**. The grant binds:

- the original proposal ID and nested payload digest;
- the whole immutable submission record digest;
- the whole executor outcome digest and outcome class;
- the receiving worker, task, environment, project, tenancy, and control epoch;
- the issuer's current authenticated controller identity and grant expiry.

The receiving environment gets persistent `purpose: "result_read_only"`. It receives no destination tenancy, proposal, apply, restore, private-write, or terminal authority. Revoking or superseding the grant cannot restore those privileges.

The original controller remains historical provenance. The current trusted issuer must own and stage the receiving task.

### What a successor acknowledgement must prove

`successor_return_for_task` verifies all of the following:

1. The expected original's current proposal head and receiving-environment head name the same unrevoked, unexpired grant, and the saved original has not changed.
2. The receiving task, environment, tenancy, Room, and current lease still reproduce the grant's binding. The receiving task remains a fresh result-only recipient with no protected submission of its own.
3. Exactly one acknowledgement exists. Its source event is fresh, not the original delivery.
4. The native `room-wake-job-v3` verifies, names the expected Room, worker, task, sender, registration, attempt, and has `dispatch_status: "completed"`.
5. Acknowledgement time lies inside the grant's validity window and the wake job's sealed window.
6. The acknowledgement's delivery identity matches the actual sealed wake job.
7. The governing source was served to that worker on the same broker session.
8. A fresh correlated Room return exists and every addressed mention and obligation is resolved by the Room service at or after the reply.

Only then does the return report an historical outcome. It does not execute, repair, issue, revoke, register, or resend anything.

### Exhibit 7.9 — Successor acknowledgement

```json
{
  "schema": 1,
  "kind": "successor_result_receipt",
  "successor": true,
  "satisfies_original_return": false,
  "resolves_original_obligation": false,
  "grant_id": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  "proposal_id": "a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f809",
  "proposal_sha256": "8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4",
  "record_bytes_sha256": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
  "outcome_bytes_sha256": "9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e",
  "outcome": "applied",
  "outcome_at": "2026-10-31T19:22:15.012480Z",
  "worker": "reviewer-beta",
  "task": "TSK-2026-SUCCESSOR-009",
  "environment_id": "env_synthetic_successor_11",
  "worker_session": "worker-mcp:00000000-0000-0000-0000-000000000011",
  "delivery_id": "dlv_synthetic_fresh_wake_8821",
  "delivery": {
    "room": "architecture-demo",
    "agent": "reviewer-beta",
    "task": "TSK-2026-SUCCESSOR-009",
    "source_event": "evt_0123456789abcdef_0000beef",
    "wake_attempt": 1,
    "worker_pid": 14208
  },
  "at": "2026-10-31T19:24:00.912004Z"
}
```

The original return obligation is untouched. The successor has read and acknowledged the historical result; the original session has not been made to witness it.

## 7. Official Platform and Standards Crosswalk

The architecture uses existing platform primitives without pretending they are complete governance systems by themselves.

| Platform or specification | Native property | How AINA composes it into execution standing |
|---|---|---|
| Microsoft AppContainer and LPAC security architecture | Package identity, capability restriction, and the `WIN://NOALLAPPPKG` attribute can limit ambient package access. | Fresh identity per launch, exact raw-token verification, exclusive grants, and anti-fallback native spawn refusal. |
| Microsoft [`CompareObjectHandles`](https://learn.microsoft.com/en-us/windows/win32/api/handleapi/nf-handleapi-compareobjecthandles) | Determines whether two handles refer to the same underlying kernel object without imposing object-specific access requirements. | Audits suspended-child handles by object identity, expected provenance, and deliberate sentinel exclusion instead of trusting numeric values. |
| Microsoft Process Snapshotting | Captures the current handle table and basic descriptors for a process. | Produces pre-resume inventory while explicitly declining to claim historical inheritance. |
| Microsoft [`CreateFileW` sharing modes](https://learn.microsoft.com/en-us/windows/win32/fileio/creating-and-opening-files) | Sharing declarations control whether later opens are compatible. | Keeps the immutable `RequestedAct` pinned with `FILE_SHARE_READ` through update and commit. |
| IETF [`RFC 8785`](https://www.rfc-editor.org/rfc/rfc8785.html), JSON Canonicalization Scheme, Informational RFC | Defines deterministic JSON representation for repeatable cryptographic operations. | Binds the fixed act, source, tenancy, and destination to one digest recomputed at persistence, validation, and historical verification. |
| SQLite [`BEGIN IMMEDIATE`](https://www.sqlite.org/lang_transaction.html) | Starts a write transaction immediately; concurrent write transactions are limited by the engine. | Takes the write reservation before rereading and re-deciding, then adds exact row-version and readback predicates. |
| Crash-straddling and multi-destination failure physics | A destination commit and its receipt are different events; heterogeneous destinations do not share a transaction coordinator. | Uses historical result grants with explicit non-fabrication and capability plans with holds instead of imaginary distributed ACID. |

The functional-equivalence concession remains: another stack that fixes the same exact act, confines its workers, fences the destination, and preserves honest return semantics can defeat approval laundering without AINA's names. The names are optional; the proof obligations are not.

**Evidence availability and performance boundary:** the confinement, act, destination, and successor records are `CONTROLLED` for qualified, method-scoped technical review, with adverse findings permitted. They are not unrestricted public downloads or independent validation. Pre-resume inspection, broker calls, transition serialization, recovery capture, and receipt verification must be measured for the exact worker count, projection size, database profile, and destination latency; this article does not claim a universal performance envelope.

## The Confinement, Act-Pinning & Crash-Straddling Continuity Challenge

The **Confinement, Act-Pinning & Crash-Straddling Continuity Challenge** uses one approved database mutation or worker result that could be replayed. It demonstrates a fixed-act refusal when the payload changes, a fenced row update with current authority and pre-state, and the receipt distinction between original-session completion and successor historical acknowledgement.

The challenge excludes cross-destination atomicity, universal external exactly-once effects, fabricated original-session proof, and independent validation. Deployment and paid pilots are separately scoped; independent evaluation remains outside the commercial ladder through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## The Fourteen Execution Claims

| ID | Bounded claim | Evidence and ceiling |
|---|---|---|
| `07-C01` | AppContainer profiles are single-launch and anti-reuse | Implemented and author-verified; existing identities fail with `confinement_identity_reused` |
| `07-C02` | Brokered hosts use deterministic `S-1-9` identities with `SQAD` and 128 digest bits | Implemented and author-verified; no SAM account or ambient group authority is inherited |
| `07-C03` | LPAC is verified directly from raw token attributes before resume | Implemented and author-verified for package, kind, count, flags, and nonzero value |
| `07-C04` | Suspended handles are compared by kernel object identity with sentinel exclusion | Implemented and author-verified; PSS inventory is not historical inheritance proof |
| `07-C05` | Mandated actors cannot escape through native launch or existing-session attachment | Implemented and author-verified; revoked/expired grants create no fallback |
| `07-C06` | Model access is controller-brokered over authenticated local channels | Implemented and author-verified for LPAC and brokered-host routes; no ambient worker network |
| `07-C07` | Model requests are journaled before dispatch and uncertain outcomes remain unresolved | Implemented and author-verified; reconciliation never resends or fabricates a free retry |
| `07-C08` | `RequestedAct` derives a single typed row and permitted changes from projected bytes | Implemented and author-verified; multi-row and out-of-scope changes are refused |
| `07-C09` | Fixed acts are JCS-bound, create-only, and readback verified | Implemented and author-verified; persistence and binding are distinct from authority |
| `07-C10` | Act files remain pinned while current authority and exact destination are revalidated | Implemented and author-verified through update and commit; historical checks consult no current tenancy |
| `07-C11` | SQLite uses `BEGIN IMMEDIATE` plus exact row-version predicates | Implemented and author-verified; concurrent and uncooperative changes are refused, not overwritten |
| `07-C12` | Pre-commit readback must equal approved fields and version +1 | Implemented and author-verified; mismatch prevents commit and remains unresolved |
| `07-C13` | Capability plans hold unmet requirements and expose non-atomic partial completion | Implemented and author-verified; revisions name weaker semantics and invalidate old decisions |
| `07-C14` | Successor grants deliver historical outcomes without fabricating original receipt or write authority | Implemented and author-verified through fresh receiving tenancy, purpose, wake, source, and Room-return proof |

## The Article 07 Claim Card

```text
Mechanism:
  AINA Execution Confinement, Act Fixation, Fenced Destination,
  and Non-Fabricating Successor Continuity
  (pre-resume token/handle inspection, spawn gate, model egress,
   RequestedAct, SQLite IMMEDIATE, capability plans, ResultGrant)

Failure it governs:
  Unclassified handles and ambient capabilities at launch;
  approved A becoming a different A' at execution;
  stale task/source/lease authority and out-of-band destination writes;
  blind model-request replay and cross-destination atomicity claims;
  crash-straddled receipt loss and fabricated original-session completion.

Positive path:
  staged projection and confined launch
  → controller-fixed RequestedAct with JCS digest and create-only persistence
  → pinned act revalidation under current task/source/lease authority
  → BEGIN IMMEDIATE + expected version + recovery capture
  → conditional single-row update + exact pre-commit readback
  → commit and independent observation
  → strict original first receipt or explicit successor historical acknowledgement.

Refusal / hold path:
  confinement_identity_reused, native_spawn_refused
  unclassified handle or sentinel match
  requested_act_authority_changed, requested_act_mismatch
  record_version_changed, changed_rows != 1
  destination_route_incompatible, result_grant_tenancy_required
  unresolved model request; severed_mid_response; effect_unconfirmed.

Evidence status:
  Implemented and Author-Verified on the declared Windows/SQLite reference paths.
  Official platform specifications supply primitives, not independent validation.
  No cross-destination atomicity, total-effect coverage, or original-receipt fabrication.

Verifier and artifacts:
  AppContainer/host SID and raw LPAC token attributes
  PSS handle inventory + CompareObjectHandles + sentinel result
  launch-observation receipt and native spawn refusal
  model-egress ledger and unresolved reconciliation
  RequestedAct record and pinned file handle
  pre-write recovery capture and SQLite readback
  destination-plan holds/revisions and ResultGrant
  successor acknowledgement with false original-return flags.

Scope and claim ceiling:
  PSS proves current inventory, not historical inheritance.
  JCS binds identity; it does not authorize the act.
  Approved model routes do not prove semantic confidentiality.
  SQLite IMMEDIATE is a write reservation, not universal external exactly-once.
  Cross-destination atomicity is false; partial completion is explicit.
  Successor acknowledgement is historical, never original first receipt or write authority.

Next stage in the machine:
  Article 07 confines the worker, fixes the act, fences execution, and preserves
  honest return continuity. Article 08 proves sovereign stop and binary assurance:
  break-glass epochs and the 45-case candidate-binary publication gate.

Commercial doorway:
  Confinement, Act-Pinning & Crash-Straddling Continuity Challenge — bring one
  approved database mutation or worker result that could be replayed; receive
  a fixed-act refusal replay, fenced row update, recovery evidence, and an
  original-versus-successor receipt demonstration (Article 09 · me@blayneaina.com).
```

## Approval Ends at the Destination, Not at the Prompt

The approved act cannot be allowed to drift between the prompt and the write.

The controller therefore fixes it early, persists it immutably, and holds it open while the destination rereads current authority. SQLite takes its write reservation, the row version is checked again, recovery is captured, the update is conditioned, and only exact readback permits commit. If the worker dies afterward, the historical result remains readable—but the original receipt is not invented.

That is the complete execution loop: confined launch, fixed act, fenced effect, honest return.

> **The worker may propose. The controller fixes the act. The destination decides whether it still applies. A successor may acknowledge history; it may never manufacture the original return.**

Article 08 addresses the sovereign question that remains: how to stop the entire domain immediately and prove, before publication, that the candidate binary enforces the complete machine.

## Frequently Asked Questions

### Why isn't numeric handle equality enough?

Handle values are process-local indices, not kernel object identities. `CompareObjectHandles` tests the underlying object. The pre-resume audit also checks expected provenance and a deliberate sentinel because numeric equality cannot prove confinement.

### Why must the act be fixed before the worker environment exists?

Fixing it afterward lets the worker alter the target or parameters before the controller sees them. `RequestedAct` binds the exact row, fields, version, source, task, and tenancy first, then revalidates that same object through update and commit.

### Why use `BEGIN IMMEDIATE` and a row-version predicate?

`BEGIN IMMEDIATE` takes the write reservation before rereading and re-deciding. The version predicate independently rejects a row changed by an uncooperative writer. Readback then proves the exact approved result before commit.

### What happens if a destination commits but the worker crashes before receipt?

The historical outcome is preserved. A new receiving task may receive a result-only grant after current tenancy and all proof checks pass. The successor acknowledges history without replaying the effect or claiming the original session received it.

### Does a successor grant complete the original return obligation?

No. The receipt explicitly records `satisfies_original_return: false` and `resolves_original_obligation: false`. It is a separate historical acknowledgement, not original first-receipt completion or restored write authority.

### Are multi-destination plans distributed transactions?

No. Each destination supplies its own guarantees, and unmet requirements hold the step. Partial completion is tracked and compensated by separately governed restoration. `cross_destination_atomic` is false.

## Continue the Series

- **Series index:** [From Proposal to Consequence: The AINA Transition-Governance Series](https://blayneaina.com/series/from-proposal-to-consequence)
- **Previous:** [Article 06 — Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine](https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/)
- **Next:** [Article 08 — The Sovereign Kill Switch: Break-Glass Epochs and the Conformance Gate](https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/)
- **Deployment and independent review:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)

---

## Primary Platform References

- [Microsoft `CompareObjectHandles` — compare underlying kernel object identity](https://learn.microsoft.com/en-us/windows/win32/api/handleapi/nf-handleapi-compareobjecthandles)
- [Microsoft `CreateFileW` and File-Sharing Documentation](https://learn.microsoft.com/en-us/windows/win32/fileio/creating-and-opening-files)
- [IETF `RFC 8785` — JSON Canonicalization Scheme, Informational RFC](https://www.rfc-editor.org/rfc/rfc8785.html)
- [SQLite Transaction Control — `BEGIN IMMEDIATE`](https://www.sqlite.org/lang_transaction.html)

---

## Publication Metadata

**Title tag:** Defeating Approval Laundering: Act Pinning and Successor Grants  
**Meta description:** Pre-resume kernel verification, controller-fixed RequestedAct, fenced SQLite execution, multi-destination holds, and non-fabricating successor result grants.  
**Series navigation:** [Series index](https://blayneaina.com/series/from-proposal-to-consequence) · Article 07 of *From Proposal to Consequence: The AINA Transition-Governance Series*.  
**Previous installment:** [Article 06 — Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine](https://blayneaina.com/architecture/rollback-is-not-erasure-dual-tier-vaults/).  
**Next installment:** [Article 08 — The Sovereign Kill Switch: Break-Glass Epochs and the Conformance Gate](https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/"
      },
      "headline": "Defeating Approval Laundering: Act Pinning and Successor Grants",
      "alternativeHeadline": "Pre-Resume Confinement, Controller-Fixed Acts, Fenced SQLite Execution, and Non-Fabricating Successor Grants",
      "description": "Pre-resume kernel verification, controller-fixed RequestedAct, fenced SQLite execution, multi-destination holds, and non-fabricating successor result grants.",
      "proficiencyLevel": "Expert",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T14:00:00-06:00",
      "dateModified": "2026-11-01T12:00:00-06:00",
      "position": 7,
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
        { "@type": "Thing", "name": "Approval Laundering Prevention" },
        { "@type": "Thing", "name": "Pre-Resume Kernel Verification" },
        { "@type": "Thing", "name": "Controller-Fixed RequestedAct" },
        { "@type": "Thing", "name": "SQLite Immediate Concurrency" },
        { "@type": "Thing", "name": "Non-Fabricating Successor Grants" }
      ],
      "citation": [
        "https://learn.microsoft.com/en-us/windows/win32/api/handleapi/nf-handleapi-compareobjecthandles",
        "https://learn.microsoft.com/en-us/windows/win32/fileio/creating-and-opening-files",
        "https://www.rfc-editor.org/rfc/rfc8785.html",
        "https://www.sqlite.org/lang_transaction.html"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/#breadcrumb",
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
          "name": "Defeating Approval Laundering: Act Pinning and Successor Grants",
          "item": "https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/"
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
  "@id": "https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why isn't numeric handle equality enough?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Handle values are process-local indices, not kernel object identities. `CompareObjectHandles` tests the underlying object. The pre-resume audit also checks expected provenance and a deliberate sentinel because numeric equality cannot prove confinement."
      }
    },
    {
      "@type": "Question",
      "name": "Why must the act be fixed before the worker environment exists?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fixing it afterward lets the worker alter the target or parameters before the controller sees them. `RequestedAct` binds the exact row, fields, version, source, task, and tenancy first, then revalidates that same object through update and commit."
      }
    },
    {
      "@type": "Question",
      "name": "Why use `BEGIN IMMEDIATE` and a row-version predicate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "`BEGIN IMMEDIATE` takes the write reservation before rereading and re-deciding. The version predicate independently rejects a row changed by an uncooperative writer. Readback then proves the exact approved result before commit."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if a destination commits but the worker crashes before receipt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The historical outcome is preserved. A new receiving task may receive a result-only grant after current tenancy and all proof checks pass. The successor acknowledges history without replaying the effect or claiming the original session received it."
      }
    },
    {
      "@type": "Question",
      "name": "Does a successor grant complete the original return obligation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The receipt explicitly records `satisfies_original_return: false` and `resolves_original_obligation: false`. It is a separate historical acknowledgement, not original first-receipt completion or restored write authority."
      }
    },
    {
      "@type": "Question",
      "name": "Are multi-destination plans distributed transactions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Each destination supplies its own guarantees, and unmet requirements hold the step. Partial completion is tracked and compensated by separately governed restoration. `cross_destination_atomic` is false."
      }
    }
  ]
}
</script>
