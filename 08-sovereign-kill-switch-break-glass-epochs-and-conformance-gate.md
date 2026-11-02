---
title: "The Sovereign Kill Switch: Break-Glass Epochs and the Conformance Gate"
subtitle: "Any admitted caller can stop the machine. Only the local interactive-console owner surface can recover it—and uncertainty survives recovery."
author: "Blayne Aina"
datePublished: "2026-10-31T15:00:00-06:00"
dateModified: "2026-11-01T12:00:00-06:00"
canonicalUrl: "https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/"
series: "From Proposal to Consequence: The AINA Transition-Governance Series"
position: 8
description: "Asymmetric emergency containment, scoped control-epoch revocation, in-doubt recovery, managed Job termination, and the 45-case candidate-binary publication gate."
keywords:
  - AI emergency stop architecture
  - AI incident response
  - asymmetric break-glass recovery
  - scoped emergency stop
  - control epoch revocation
  - stale authority revocation
  - in-doubt operation recovery
  - stop recovery race
  - candidate binary conformance
  - release qualification gate
  - interactive console owner gate
  - FROZEN_SAFE
isAccessibleForFree: true
inLanguage: en-US
---

# The Sovereign Kill Switch: Break-Glass Epochs and the Conformance Gate

*Any admitted caller can stop the machine. Only the local interactive-console owner surface can recover it—and uncertainty survives recovery.*

**By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026**

---

A kill switch that the agent can also clear is not a containment boundary. It is a pause button with an identity problem.

Many agent systems expose stop and resume through the same API, dashboard, or tool surface. That symmetry is convenient until the actor being stopped can call the resume endpoint, an automated retry clears the latch, or a recovery routine silently converts an uncertain write into a success. A high-consequence system needs the opposite shape: stopping must be easy and safe; recovery must require a separate owner surface and a new lineage of authority.

Article 07 fixed the act and fenced its execution. Article 08 governs the moment when execution must end. AINA publishes a containment latch before attempting cleanup, revokes matching authority through scoped control epochs, terminates owned Windows Jobs with observed quiescence, and carries every in-doubt operation forward. Recovery cannot invent an all-clear. Before a newly compiled `squad.exe` can be promoted, its own binary must also pass the 45-case boundary battery.

```text
permission to stop (safety)                ≠ permission to recover (local console authority)
clearing a break-glass latch               ≠ resolving carried-forward in-doubt operations
compiled release binary                    ≠ 45-case publication-qualified binary
author-controlled binary conformance gate  ≠ independent third-party certification
```

> **Anyone admitted may stop the machine. Only the owner console may recover it. Stop wins every race. Uncertainty remains evidence.**

## One Stop, Three Races, No Invented All-Clear

Suppose a safety monitor engages a **machine stop** after an autonomous worker begins behaving anomalously. Three races now matter, and none can be resolved by a dashboard toggle:

1. **Containment races cleanup.** The latch reaches durable storage before AINA attempts to terminate owned runs or cancel queued wakes. One worker termination remains unconfirmed; the latch still closes new effects. The receipt reports the incomplete cleanup instead of converting it into either success or a rolled-back stop.
2. **Recovery races unresolved effects.** A destination mutation and a brokered model request were in flight when the stop landed. The owner-console recovery plan carries both forward as unresolved. Clearing the latch does not decide whether the provider or destination observed them, and it does not replay them.
3. **Recovery races a new stop.** While the owner is applying the plan, another monitor engages. Recovery clears only the latch names fixed in its plan and then rescans. The new latch survives; the machine enters `FROZEN_SAFE`, not a false all-clear.

A **project-scoped stop** follows the same latch and recovery discipline without revoking unrelated projects: only authority covered by the later project revision is fenced. In both cases, the visible result is not merely “stopped.” It is a precise combination of latch state, observed worker quiescence, control lineage, and unresolved-effect evidence.

## 1. Asymmetric Containment

The emergency interface deliberately gives stop and recovery different authority.

### Exhibit 8.1 — Stop versus recovery authority

```text
ENGAGE: admitted CLI, MCP, monitor, peer, or operator
  reason + machine | agent:<name> | project:<canonical-root>
  → create and persist latch
  → selected effect gates refuse new work
  → stop owned runs and cancel queued wakes, reporting unconfirmed cleanup
  → advance the matching control-epoch lineage

RECOVER: local owner CLI only
  → no ambient MCP session
  → explicit --by operator
  → stdin and stderr attached to a terminal
  → durable recovery intent and unresolved-operation census
  → new epoch, then exactly the pre-planned latches cleared
  → rescan: any racing stop leaves the machine contained
```

Any admitted caller may invoke `engage` because refusal to stop is the more dangerous default. A nonempty reason is mandatory. The scope is normalized to `machine`, a lowercase `agent:<name>`, or a canonical absolute `project:<root>` directory. A malformed project scope or unresolvable root is refused before a latch is created.

`drain` and `recover` take the opposite path. `owner_surface_required` enforces three independent predicates:

1. **No MCP session.** If `session::current()` exists, recovery is refused. A model-connected tool session cannot satisfy the owner surface.
2. **Explicit operator identity.** The caller must supply `--by operator`; a worker or agent name is insufficient.
3. **Interactive terminal handles.** `interactive_console()` requires both standard input and standard error to satisfy Rust's `IsTerminal` test. Redirected scripts, scheduled jobs, pipe-driven subprocesses, and background tool calls fail closed.

The third check is a **local interactive-console gate**, not biometric human verification. It does not establish who is physically present, and a hostile same-user process could allocate a pseudo-console. AINA's stronger hostile-worker boundary is confinement: the worker's separate operating-system identity has no access-control entry on the owner control directory. Terminal detection prevents accidental or well-meaning automated recovery; confinement supplies the operating-system boundary against the confined worker.

## 2. Latch-First Containment

An emergency stop must not depend on a database, a live server, a lease sweep, a successful process kill, or a final audit write. Those steps can fail precisely when containment is needed.

### Exhibit 8.2 — Publication before cleanup

```text
machine scope:
  create_new(final latch) → write complete JSON → sync_all → contained

agent/project scope:
  create_new(staging latch) → write complete JSON → sync_all
  → hard_link(staging, final latch) → contained
  → best-effort staging cleanup

after either path reaches the active latch:
  → run and Job stopping
  → queued-wake cancellation
  → control-epoch advancement
  → WAL and Room integrity evidence

secondary failure = warning + engaged latch, never rollback to "not stopped"
```

The distinction matters. A **machine latch** is created directly at its final path with `create_new`, written, and flushed with `sync_all`. A **scoped latch** is first written to `.breakglass-stage-{id}.json`, flushed, and then published with `hard_link` so another process cannot observe a partial scoped body and misinterpret it as a machine-wide stop.

Once the active latch exists, the selected scope is contained. Everything after that point is lineage and evidence. `kill_all_live_runs` performs an ownership-bound run-ledger sweep; `cancel_scoped_jobs` cancels matching queued wakes; their receipts record whether every stop or cancellation was confirmed. Errors enter `warnings`. They do not remove the latch or return a false `engaged: false`.

Latch reads also fail toward containment. The directory entry's existence is the stop signal; its JSON body is evidence. An unreadable, malformed, or manually created empty entry is interpreted as a **machine-scope latch**, not ignored. An unreadable latch directory, corrupt emergency state, or corrupt epoch record likewise closes the gate. A missing latch directory and missing state file mean no emergency has been declared.

Agent-scoped matching does not trust an environment variable that a subprocess could unset or rewrite. It uses the bound session identity; if that identity is unprovable, every agent latch contains the subject rather than allowing it to slip beneath the fence. Project matching uses normalized path boundaries, and unknown scope kinds fail closed.

### Exhibit 8.3 — Sanitized scoped latch record

```json
{
  "kind": "breakglass_latch",
  "id": "latch_demo7f2a",
  "scope": "agent:example-worker",
  "by": "safety-monitor",
  "reason": "demonstration: anomalous controlled action",
  "pid": 24018,
  "session": {
    "bound": "example-worker",
    "tier": "governed"
  },
  "ts": "2026-10-31T20:10:00Z"
}
```

This record is illustrative; containment does not depend on parsing it successfully.

### Owned Jobs must be observed stopped

New effects are refused synchronously at their enforcement points. Already-running managed workers need a second mechanism. Each squad process watches its owned Windows Job Objects on a one-second control loop. A latch, lost owner permit, changed Room lineage, revoked grant, poisoned registry, or panicked admission check produces a stop order; uncertainty never widens authority.

The observer calls `TerminateJobObject`, then queries the Job's **current active-process count**. A successful termination call is not itself proof of quiescence. Only a fresh count of zero confirms the stop. A nonzero count or failed query remains pending and is retried. Room stop evidence is captured in two phases—first while termination is unconfirmed, then after observed zero—without allowing evidence I/O to delay the stop order.

<aside class="context-callout" aria-label="Linux and POSIX kernel counterparts">
  <h2>Linux / POSIX Kernel Counterparts</h2>
  <p><code>TerminateJobObject</code> + <code>LPAC</code> containment maps on Linux to <code>cgroups v2</code> (<code>cgroup.kill</code> atomic group termination), <code>user_namespaces</code>, <code>seccomp-bpf</code>, and <code>Landlock LSM</code>.</p>
</aside>

### “Latched” is not the same as “fully reconciled”

The status surface derives its phase from fresh observations rather than treating the last written state as the whole truth. For a contained machine, the distinction is:

| Derived phase | What the current evidence says |
|---|---|
| `KILLING` | An affected owned Job is not yet observed quiescent, a Job census failed, or a live server does not implement the current break-glass observation protocol. |
| `RECONCILING` | Quiescence and protocol coverage are established, but an unresolved file, destination, or model operation remains—or its registry cannot be read. |
| `FROZEN_SAFE` | The machine remains contained, affected Jobs and server coverage are confirmed, and the three unresolved-operation censuses are readable and empty. |

Live legacy servers appear explicitly in `uncovered_servers`; they cannot be silently counted as covered. `affected_worker_quiescence_confirmed` requires both affected-Job quiescence and the absence of uncovered servers. This is why AINA can say “new effects are fenced” without prematurely saying “every worker is gone and every effect is understood.”

This is stronger than sending a request and hoping the worker cooperates. It is still scoped to owned Jobs and governed effects. AINA does not claim to terminate every unrelated process on the host or recall an effect already delivered to an external system.

## 3. Control Epochs Revoke Authority, Not Just Processes

A latch closes new-effect gates immediately. Control epochs handle a different problem: authority that was minted before the stop must not remain usable after the relevant boundary advances.

`epoch.json` stores a global issue sequence plus a revision map for `machine`, `agent:<name>`, and `project:<root>` scopes. Leases, sealed wake jobs, and successor-grant receiving tenancies carry the issue sequence under which they were created.

The rule is not simply “lease epoch must equal the latest global number.” That would incorrectly revoke unrelated work after every scoped stop. Instead:

> An authority is revoked when a **matching** machine, agent, or project scope has a later revision than the authority's issue epoch.

A future issue sequence is also rejected as an unknown lineage. A scoped stop therefore kills matching old authority without waiting for its TTL, while unrelated scopes retain their authority. Recovery advances the selected scope again so pre-recovery authority cannot revive.

### Exhibit 8.4 — Scoped revocation map

| Artifact | Carried lineage | Recheck at the boundary |
|---|---|---|
| Resource lease | `Lease.control_epoch` | `validate_tenancy` checks expiry, current generation, and matching scope revision |
| Room wake job | sealed `control_epoch` | Dispatch re-derives task/Room/project standing and refuses revoked lineage |
| Result-grant receiving tenancy | `Recipient.control_epoch` | Current exact lease, generation, and scope epoch must still match |
| Destination mutation | current lease and `RequestedAct` authority | Commit refuses stale tenancy or changed authority |

### WAL before snapshot

`advance_epoch` runs under the short control-record transaction and, during engage/recovery, the lease transition guard. It:

1. Reads the current epoch and per-scope revisions.
2. Computes `next = prior + 1`, refusing integer exhaustion.
3. Appends an `epoch_advance` record to `breakglass.wal.jsonl` and flushes it.
4. Atomically rewrites `epoch.json` with the new sequence and scope map.
5. Reads the epoch back and refuses an unconfirmed result.

The write-ahead log (WAL) is the durable intent sequence. On subsequent reads, a WAL high-water mark ahead of the snapshot means the snapshot cannot be trusted as current; gates fail closed rather than rolling authority back. A discontinuous or corrupt WAL is never skipped.

Owner recovery may reconcile an interrupted snapshot from a valid WAL lineage. Before replacing the old image, it preserves the prior bytes under `recovery-evidence/epoch-<sha256>.bin` with create-new, flush, and readback verification. It also refuses reconstruction if any live lease claims an epoch newer than the recoverable journal. Ordinary gates never “repair” uncertainty into fresh authority.

### Exhibit 8.5 — Sanitized epoch-advance record

```json
{
  "kind": "epoch_advance",
  "prior_epoch": 8,
  "new_epoch": 9,
  "scope": "agent:example-worker",
  "scope_epochs": {
    "machine": 6,
    "agent:example-worker": 9,
    "project:/srv/unrelated": 8
  },
  "cause": "engage",
  "by": "safety-monitor",
  "reason": "demonstration: revoke this agent without stopping unrelated work",
  "pid": 24018,
  "ts": "2026-10-31T20:10:01Z"
}
```

The global sequence is 9; only authority covered by the later `agent:example-worker` revision is revoked. The unrelated project is not collateral damage.

## 4. Managed Drain and In-Doubt Recovery

Immediate engage is not the only controlled-stop mode. `drain` supports a bounded window in which already **durably prepared** effects may finish. It requires the same owner console and an already-engaged machine latch, so new effects are refused before the drain begins. The deadline must be between 1 and 3,600 seconds. While the deadline is valid, the gate is `DRAINING`; after it expires, the state is contained as `FROZEN_SAFE`.

Drain is therefore not a grace period for new work. It is a bounded completion window for effects whose preparation was already durable.

### Recovery starts with a census, not amnesia

A crash can strand an operation between “dispatched” and “outcome observed.” Clearing a latch cannot establish which side of that boundary the destination reached.

`recover_plan` re-proves the owner surface, requires a reason, fixes the exact scope and latch names, and queries three independent operation registries:

- `unresolved_file_operations()` for protected file writes without an established outcome;
- `destinations::unresolved_operations()` for nonterminal destination mutations;
- `model_egress::unresolved()` for brokered model requests whose provider-side outcome is unsettled.

The results become `carried_forward_operations` in a durable WAL `recovery_intent`. A registry-read error is preserved as an error entry rather than silently omitted. These operations remain individually blocking and must be reconciled under fresh authority. Recovery neither retries them blindly nor marks them complete.

### Exhibit 8.6 — Recovery intent preserves uncertainty

```json
{
  "kind": "recovery_intent",
  "by": "operator",
  "reason": "demonstration: containment investigated; resume without replaying uncertainty",
  "scope": "machine",
  "latches": [
    "latch_demo7f2a.json"
  ],
  "carried_forward_operations": [
    {
      "kind": "destination_operation",
      "operation": {
        "operation_id": "op_demo_sqlite_01",
        "status": "in_doubt"
      }
    },
    {
      "kind": "model_request",
      "operation": {
        "operation_id": "req_demo_01",
        "route": "owner-approved-analysis",
        "latest_outcome": null
      }
    }
  ],
  "ts": "2026-10-31T20:20:00Z"
}
```

The runtime invariant engine also has a separate `find_indoubt(now, ttl)` query for intentions older than a declared window. That age-based detector complements the operation census; it does not replace destination-specific reconciliation.

### Stop beats recovery on a race

`recover_apply` proves the console gate again. For machine recovery it writes `RECOVERY_PENDING`, then advances the selected epoch under the lease transition guard. Only after that new lineage exists does it move the **pre-planned latch names** into `breakglass.cleared/epoch-{new_epoch}/`.

It then rereads the active latch directory. If another engage arrived during recovery, that latch was not in the original plan and survives. A remaining machine-covering latch produces `FROZEN_SAFE`; the receipt reports `recovered: false`. There is no false all-clear window.

### Exhibit 8.7 — Racing stop leaves `FROZEN_SAFE`

```json
{
  "state": "FROZEN_SAFE",
  "by": "operator",
  "reason": "an engage raced this recovery; the machine is still latched",
  "since": "2026-10-31T20:20:02Z"
}
```

If the closing WAL receipt cannot be written after recovery has already occurred, the receipt carries a warning rather than pretending recovery failed and inviting a repeated transition. Evidence failure does not rewrite the physical outcome.

## 5. The Candidate-Binary Publication Gate

Containment architecture is only as credible as the binary that implements it. A green build proves compilation. It does not prove that the release artifact refuses stale generations, impersonation, cross-project reads, altered proposals, damaged recovery objects, or evidence tampering.

Stage 2b of the package pipeline therefore runs the **newly compiled candidate's own** `conformance` verb. The old publishing driver does not lend it a previously compiled test battery: the harness and the boundary implementation ship in the same candidate image.

### Exhibit 8.8 — Candidate qualification sequence

```text
Cargo builds isolated candidate images
  → candidate surface checks bind harness SHA-256 and target SHA-256
  → candidate and Room companion report the same current source digest
  → spawn candidate conformance with CREATE_NO_WINDOW
       stdin null; stdout/stderr piped and drained
       owned ConformanceChild with cancellation on drop
       30-minute outer timeout; 90-second MCP-session deadline
       build-lease heartbeat during the run
  → require successful exit, valid JSON report, and ok == true
  → re-check current source and publisher/candidate compiled identity
  → copy, verify installed surfaces, update checksums, compare post-copy hashes
  → write package result and release the build lease

any failure before promotion: no installed image changed by the candidate
publication never automatically replays deferred Room wakes
```

The outer loop polls every 100 ms. The owned-child wrapper requests cancellation on timeout, heartbeat loss, or another early return. On Windows, cancellation targets the exact child PID and its descendants, not a process name; the direct child handle remains alive during cleanup. Pipe readers are drained so inherited pipe handles cannot turn a bounded test into an unbounded join. `CREATE_NO_WINDOW` suppresses a new console window; the conformance child is **not** represented as a dedicated Job Object.

The two clocks have different scopes. The **30-minute outer timeout** bounds the candidate run. The **90-second deadline** belongs to an interactive MCP session used inside the battery and can be extended for multi-step work; it is not a separate 90-second ceiling imposed on each of the 45 cases.

The default battery contains **25 governance/execution cases and 20 evidence cases**. Each case drives the binary through isolated throwaway state. For the governance battery, refusal is usually the pass condition: an agent willing to follow instructions is not evidence that the boundary enforces refusal. The evidence battery includes positive fidelity proofs as well as negative tamper and access cases.

### The complete 45-case inventory

| # | Emitted case ID | What must hold |
|---:|---|---|
| 1 | `impersonation_refused` | A bound session cannot act as another owner. |
| 2 | `altered_proposal_conflict` | Reusing an operation ID with a different payload is refused. |
| 3 | `stale_generation_refused` | An edit fencing an old ownership generation is rejected. |
| 4 | `concurrent_edit_conflict` | A scope actively held by another agent cannot be acquired. |
| 5 | `interrupted_call_blocks_target` | An unresolved prepared operation holds its target for reconciliation. |
| 6 | `damaged_recovery_refused` | Mismatched or damaged recovery bytes never reach the target; an intact image restores and reads back. |
| 7 | `acceptance_failed_keeps_task_open` | Completion is refused when the acceptance check fails against the actual artifact. |
| 8 | `reader_roster_denied` | A recipient outside the owner's graph-reader roster receives no delivery and reads nothing. |
| 9 | `cross_project_read_refused` | One project reads its own file but cannot read another open project's file or receive its content. |
| 10 | `destination_call_outside_task_scope_refused` | A direct record change outside the claimed row task is refused and the row remains unchanged. |
| 11 | `junction_and_spelling_redirect_refused` | Junction redirection outside the project and parent-traversal spellings are refused without changing the outside file. |
| 12 | `native_write_without_lease_refused` | A native write without an active lease never reaches the file. |
| 13 | `doc_source_drift_refused` | Registered documents serve only exact content; drift refuses reads and task bindings. |
| 14 | `cooldown_deferred_work_retained` | Typed damper deferral retains the exact sealed second-send job; retries cannot poison retained work. |
| 15 | `tier_ceiling_refused` | A `safe_read` session cannot invoke a mutating tool. |
| 16 | `post_cancellation_refused` | After the stop is pulled, no new controlled action executes. |
| 17 | `stopped_authority_cannot_revive` | A project stop spares other projects, refuses its project, and keeps pre-stop leases dead after clearance while fresh tenancy can write. |
| 18 | `room_control_operator_required` | An ordinary Room participant cannot perform a Room control act. |
| 19 | `room_recreate_roster_refused` | Room recreation cannot silently replace the roster; deliberate replacement needs operator standing and the roster survives both paths. |
| 20 | `exec_start_takeover_refused` | Another agent cannot restart—and thereby take over—a paused execution. |
| 21 | `planning_wake_target_bound` | No named target means no wake; naming another lane is refused as a wake request rather than treated as impersonation. |
| 22 | `profile_credential_owner_surface` | Credential storage and fleet diagnostics require operator standing, profile views bind to the caller, and a worker can still query its own requirements. |
| 23 | `session_lane_bound` | Driving another agent's IDE lane is refused while naming one's own lane remains permitted. |
| 24 | `prompt_redaction_holds` | A planned Room wake prompt redacts every universal credential shape without dropping the prompt or leaking a secret body. |
| 25 | `tool_result_redaction_holds` | Credential-shaped Room content is redacted across receipts, feeds, and echoed errors while the feed remains valid JSON and available. |
| 26 | `evidence_jcs_rfc8785_vectors` | Canonical serializations match the RFC 8785 object and number vectors. |
| 27 | `evidence_corpus_through_mcp` | Every corpus document produces its expected extraction, omissions, stories, nodes, values, formulas, visibility, or typed failure through the parser worker. |
| 28 | `evidence_governing_pdf_six_pages` | The governing PDF yields six nonempty pages, complete-for-profile extraction, expected text, and complete bounded delivery. |
| 29 | `evidence_repeated_text_resolves_each_node` | Repeated text is ambiguous until occurrence is named; each resulting handle resolves to its own node. |
| 30 | `evidence_drift_refused` | Altered source bytes refuse both reading and handle resolution as `drifted`. |
| 31 | `evidence_tampered_view_refused` | A tampered committed view is refused with `view_digest_mismatch`. |
| 32 | `evidence_old_view_survives_extraction_change` | A new extraction identity creates a new view while the old handle still resolves its original view. |
| 33 | `evidence_bad_selector_refused` | Bad selectors, paths, raw hashes, unknown handles, and reserved extensions receive typed refusals. |
| 34 | `evidence_unauthorized_dereference_refused` | A caller outside the Room owner roster cannot dereference evidence. |
| 35 | `evidence_truncation_in_delivery_status` | Bounded delivery explicitly reports chunked or truncated status with counts. |
| 36 | `evidence_excerpt_stays_distinct` | An agent-supplied excerpt remains `agent_supplied` and cannot assume the requirement role. |
| 37 | `evidence_echo_lineage_preserved` | Echo citations remain echoes grounded in their first-hand origin rather than becoming independent evidence. |
| 38 | `evidence_distinct_origins_through_three_hops` | Three records through echoes count as one origin; a second first-hand reader makes two. |
| 39 | `evidence_false_predicate_fails_receipt` | A false typed predicate fails evaluation while the finding remains recorded as failed matter. |
| 40 | `evidence_absence_requires_complete_inventory` | Absence is refused until every unknown-coverage marker is acknowledged. |
| 41 | `evidence_correspondence_keeps_old_handle` | Adopting correspondence issues a new handle without retargeting the old handle's view. |
| 42 | `evidence_reassessment_flags` | Source and requirement revisions flag dependents until reassessment is answered. |
| 43 | `evidence_staged_visibility_reveal` | A `collaborative_pass` finding remains withheld until reveal, and the reveal states its limit. |
| 44 | `evidence_origin_gate` | Task completion is refused until a requirement rests on the required number of distinct origins. |
| 45 | `evidence_capture_provenance_chain` | A capture records every redirect hop, status, location, and security headers, with each hop egress-authorized. |

The corpus case expands into 37 synthetic document fixtures; the JCS case expands into the RFC's individual vectors. They still count as one case each in the 45-case publication battery.

## 6. What the Gate Proves—and What It Cannot

The release gate closes an important bootstrapping hole. The candidate carries its own inventory and enforcement code, the surface receipt binds the expected harness and target image hashes, and the source digest is checked before and after a potentially long run. Losing the package build lease stops the path to promotion. Post-copy checks then compare the installed artifacts and their checksums rather than assuming a copy succeeded faithfully.

The report is simple: each case records its ID, expectation, observation, and Boolean pass; `ok` is true only when no case failed. A nonzero candidate exit, malformed report, failed case, timeout, or heartbeat failure refuses publication.

### Exhibit 8.9 — Publication summary shape

```json
{
  "ok": true,
  "total": 45,
  "failed": 0,
  "note": "boundary battery against the shipped binary in isolated throwaway state; refusals are the pass condition"
}
```

That shape is not a claim of universal assurance. The 45 cases are an **author-controlled, end-to-end release-qualification gate against the candidate binary**. They are not independent third-party certification, a formal proof of the whole system, exhaustive topology coverage, or evidence that no defect exists outside the exercised vectors.

The same honesty applies to containment. A latch and epoch cannot un-send a webhook, reverse a committed third-party database transaction, or erase data already disclosed. Local control files also cannot survive a hostile administrator deleting the underlying volume. AINA governs declared boundaries and preserves uncertainty; it does not claim physical irreversibility or universal host control.

| Primitive or test mechanism | What it establishes | What AINA adds—and refuses to infer |
|---|---|---|
| Rust `IsTerminal` / console handles | Whether standard handles belong to a terminal | Combines terminal detection with no MCP session, explicit operator identity, and OS confinement; terminal presence alone is not human identity. |
| `CreateHardLinkW` / `std::fs::hard_link` | Atomic publication of a directory entry | Uses it for complete scoped latches after flush; machine latches use direct final-path creation. Filesystem publication does not prove worker quiescence. |
| `TerminateJobObject` plus Job accounting | A termination request and separately queried Job state | Requires a fresh active-process count of zero, retains two-phase stop evidence, and exposes uncovered servers instead of assuming full coverage. |
| Candidate-controlled conformance report | The candidate's observed results for its embedded inventory | Binds image/source identities, bounds the child, requires every case to pass, and still labels the result author-controlled release qualification. |

**Evidence availability and performance boundary:** latch, WAL, epoch, Job-census, stop-outbox, recovery, candidate-surface, and package records are `CONTROLLED` for qualified, method-scoped technical review, with adverse findings permitted. They are not unrestricted public downloads or independent validation. The one-second observer is a polling cadence, not a universal worst-case stop-latency guarantee; the 30-minute and 90-second conformance clocks are test bounds, not production recovery-time or recovery-point objectives. Actual containment and publication latency must be measured for the host, worker count, filesystem, destination mix, and release topology.

## The Break-Glass & Conformance Qualification Challenge

The **Break-Glass & Conformance Qualification Challenge** uses one AI workflow that needs emergency containment or release qualification. It demonstrates a scoped stop with stale-authority refusal, explicit handling of unconfirmed cleanup, an unresolved-operation recovery plan, a stop-versus-recovery race, and a candidate-gate coverage review.

The challenge excludes independent certification, universal external-effect reversal, universal host control, and an unmeasured production recovery objective. Deployment and paid pilots are separately scoped; independent evaluation remains outside the commercial ladder through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## The Fourteen Containment and Assurance Claims

| ID | Claim | Evidence and ceiling |
|---|---|---|
| `08-C01` | Any admitted caller can engage a validated stop with a mandatory reason | Implemented and author-verified for machine, agent, and canonical project scopes |
| `08-C02` | The active latch is persisted before secondary cleanup; scoped latches use staging and hard-link publication | Implemented and author-verified; machine latches use direct final-path creation |
| `08-C03` | Cleanup, epoch, WAL, or signal failures after latching do not roll back containment | Implemented and author-verified through warnings and engaged receipts |
| `08-C04` | Drain and recovery require no MCP session, explicit operator identity, and interactive stdin/stderr | Implemented and author-verified as a local console surface |
| `08-C05` | Console detection is not biometric proof or a complete defense against a hostile same-user process | Explicit ceiling; worker confinement supplies the OS identity boundary |
| `08-C06` | Epoch intent is WAL-durable before atomic snapshot replacement and readback | Implemented and author-verified; interrupted lineage fails closed and has console-gated reconciliation |
| `08-C07` | Later matching scope revisions revoke old authority without waiting for TTL | Implemented and author-verified for leases, wakes, and receiving tenancies; unrelated scopes survive |
| `08-C08` | Managed Job termination requires a fresh active-process count of zero | Implemented and author-verified; termination-call success alone is not quiescence evidence |
| `08-C09` | Recovery carries unresolved file, destination, and model operations forward | Implemented and author-verified; no carried operation is marked complete by latch clearance |
| `08-C10` | Drain admits only durably prepared effects for a bounded interval after a machine stop | Implemented and author-verified for 1–3,600-second deadlines; new effects remain refused |
| `08-C11` | A stop racing machine recovery survives and produces `FROZEN_SAFE` | Implemented and author-verified through exact planned-name clearance and post-clearance rescan |
| `08-C12` | Candidate conformance runs as an owned, bounded child under a live package build lease | Implemented and author-verified with timeout, heartbeat, output draining, and cancellation |
| `08-C13` | The default candidate battery contains 25 governance and 20 evidence cases | Implemented and author-verified against the binary in isolated state with source/image identity checks |
| `08-C14` | Passing the battery is release qualification, not independent certification or exhaustive proof | Explicit assurance ceiling, preserved in publication evidence |

## The Article 08 Claim Card

```text
Mechanism:
  AINA Sovereign Containment and Candidate-Binary Assurance
  (latch-first break-glass, scoped control epochs, owned-Job observation,
   in-doubt recovery, interactive owner recovery, 45-case publication gate)

Failure it governs:
  Agents or scripts clearing their own emergency stop;
  stale authority surviving after a matching stop;
  successful termination calls mistaken for observed quiescence;
  uncertain operations erased or blindly replayed during recovery;
  stop/recovery races and unqualified release-binary promotion.

Positive path:
  engage and persist latch
  → refuse new effects and observe owned-worker termination
  → append epoch intent and publish the scoped lineage
  → census and carry forward unresolved operations
  → owner-console recovery with a new epoch and post-clearance rescan
  → candidate source/image binding + 45 passing cases
  → verified publication and post-copy hashes.

Refusal / hold path:
  owner_control_required, break_glass_contained, stale_control_epoch,
  control_epoch_unconfirmed, control_wal_corrupt,
  unresolved file/destination/model operation,
  FROZEN_SAFE after a racing engage,
  candidate timeout, lease-heartbeat loss, failed case, or ok != true.

Evidence status:
  Implemented and Author-Verified on the declared Windows reference path.
  Official platform documentation establishes primitive behavior, not independent
  validation of AINA. The 45 cases are author-controlled release qualification.

Verifier and artifacts:
  active and cleared latch records; run/wake cancellation receipts;
  breakglass WAL, epoch snapshot, and recovery-evidence image;
  fresh Job active-process counts and two-phase Room stop reports;
  derived status phase, affected-worker quiescence, and uncovered_servers;
  recovery_intent with carried_forward_operations and FROZEN_SAFE state;
  candidate surface hashes, source digest, 45-case report, and package result.

Scope and claim ceiling:
  Console presence is not biometric identity.
  Scoped revocation preserves unrelated scopes; machine revocation covers all.
  A stop cannot recall external effects or survive destruction of the host volume.
  Conformance proves the exercised candidate vectors, not all possible behavior,
  independent certification, or formal verification of the complete system.

Next stage in the machine:
  Article 08 completes containment and release assurance. Article 09 applies the
  full evidence-to-effect machine to one real customer-controlled boundary with
  an explicit acceptance contract.

Commercial doorway:
  Break-Glass & Conformance Qualification Challenge — bring one AI workflow that
  needs emergency containment or release qualification; receive a scoped-stop and
  stale-authority demonstration, unresolved-operation recovery plan, race test,
  and candidate-gate coverage review (Article 09 · me@blayneaina.com).
```

## A Stop Is a Transition, Not a Button

Trustworthy emergency control is not a red icon that calls `kill()`.

It is a sequence with asymmetric authority: the latch appears before fallible cleanup; new effects close immediately; old scoped authority is refused; owned Jobs are observed quiescent; uncertain operations remain blocked; recovery requires a different physical control surface and mints a new lineage. If stop and recovery race, stop wins.

The release path follows the same philosophy. The candidate must demonstrate its refusals as itself, under a bounded and identity-checked publication process. Compilation is necessary. It is not sufficient.

> **The machine may resume only through the owner surface, under fresh authority, with every unresolved effect still visible.**

Article 09 turns this completed architecture into a deployment engagement: one real boundary, one written acceptance contract, and evidence that the customer can independently inspect.

<aside class="context-callout" aria-label="Technical and security due diligence">
  <h2>Technical &amp; Security Due Diligence</h2>
  <p><a href="/09-bring-one-real-boundary-work-with-blayne/#exhibit-9-6">Reviewing for Technical Due Diligence? Read the 14-Point Execution Security &amp; Operational Reality FAQ (Exhibit 9.6) →</a> Each answer links to the corresponding article and public proof artifact, including the latency and trusted-computing-base boundaries.</p>
</aside>

## Frequently Asked Questions

### Why can any admitted caller engage the stop?

Stopping is the safe direction. Requiring elevated recovery authority before containment would create a dangerous delay. Engage still requires admission, a nonempty reason, and a valid machine, agent, or project scope.

### Can an agent clear its own emergency stop through MCP or a script?

No. Recovery refuses an active MCP session, requires `--by operator`, and requires interactive terminal handles for stdin and stderr. This is a local console boundary, not a claim of biometric identity; confined workers additionally lack OS permission to the control directory.

### Does advancing `control_epoch` revoke every lease on the host?

Only when the advancing scope covers the authority. Machine recovery covers all scopes; an agent or project revision revokes matching older authority while unrelated scopes retain theirs. A future or unproven lineage fails closed.

### Does recovery resolve operations whose outcomes are unknown?

No. Recovery records unresolved file, destination, and model operations in `carried_forward_operations`. Each remains unresolved and blocking until separately reconciled under fresh authority.

### What happens if another stop arrives during recovery?

Recovery clears only the latch names fixed in its plan, then rescans. A new machine-covering latch survives, the state becomes `FROZEN_SAFE`, and the receipt does not report a successful all-clear.

### Do the 45 passing cases certify the system independently?

No. They are author-controlled release qualification against the candidate binary in isolated fixtures. They prove the exercised positive and negative vectors, not independent certification, formal verification, exhaustive coverage, or reversal of external effects.

## Continue the Series

- **Series index:** [From Proposal to Consequence: The AINA Transition-Governance Series](https://blayneaina.com/series/from-proposal-to-consequence)
- **Previous:** [Article 07 — Defeating Approval Laundering: Act Pinning and Successor Grants](https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/)
- **Next:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)
- **Deployment and independent review:** [Bring one real boundary or propose a method-scoped evaluation](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)

---

## Primary Platform References

- [Microsoft `GetConsoleMode` — console input and screen-buffer mode inspection](https://learn.microsoft.com/en-us/windows/console/getconsolemode)
- [Rust `std::io::IsTerminal` — terminal/TTY detection and platform behavior](https://doc.rust-lang.org/std/io/trait.IsTerminal.html)
- [Microsoft `CreateHardLinkW` — NTFS hard-link creation](https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-createhardlinkw)
- [Microsoft Job Objects — grouped process management and `TerminateJobObject`](https://learn.microsoft.com/en-us/windows/win32/procthread/job-objects)
- [IETF RFC 8785 — JSON Canonicalization Scheme vectors used by the evidence battery](https://www.rfc-editor.org/rfc/rfc8785.html)

---

## Publication Metadata

**Title tag:** The Sovereign Kill Switch: Break-Glass Epochs and the Conformance Gate  
**Meta description:** Asymmetric emergency containment, scoped control-epoch revocation, in-doubt recovery, managed Job termination, and the 45-case candidate-binary publication gate.  
**Series navigation:** [Series index](https://blayneaina.com/series/from-proposal-to-consequence) · Article 08 of *From Proposal to Consequence: The AINA Transition-Governance Series*.  
**Previous installment:** [Article 07 — Defeating Approval Laundering: Act Pinning and Successor Grants](https://blayneaina.com/architecture/defeating-approval-laundering-act-pinning-successor-grants/).  
**Next installment:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/"
      },
      "headline": "The Sovereign Kill Switch: Break-Glass Epochs and the Conformance Gate",
      "alternativeHeadline": "Asymmetric Emergency Containment, Scoped Control Epochs, In-Doubt Recovery, and the 45-Case Candidate-Binary Gate",
      "description": "Asymmetric emergency containment, scoped control-epoch revocation, in-doubt recovery, managed Job termination, and the 45-case candidate-binary publication gate.",
      "proficiencyLevel": "Expert",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T15:00:00-06:00",
      "dateModified": "2026-11-01T12:00:00-06:00",
      "position": 8,
      "keywords": [
        "AI emergency stop architecture",
        "AI incident response",
        "asymmetric break-glass recovery",
        "scoped control epoch revocation",
        "stale authority revocation",
        "in-doubt operation recovery",
        "stop recovery race",
        "candidate binary conformance",
        "release qualification gate"
      ],
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
        { "@type": "Thing", "name": "Asymmetric Emergency Containment" },
        { "@type": "Thing", "name": "Control Epoch Revocation" },
        { "@type": "Thing", "name": "In-Doubt Operation Recovery" },
        { "@type": "Thing", "name": "Windows Job Object Termination" },
        { "@type": "Thing", "name": "Candidate-Binary Conformance" }
      ],
      "citation": [
        "https://learn.microsoft.com/en-us/windows/console/getconsolemode",
        "https://doc.rust-lang.org/std/io/trait.IsTerminal.html",
        "https://learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-createhardlinkw",
        "https://learn.microsoft.com/en-us/windows/win32/procthread/job-objects",
        "https://www.rfc-editor.org/rfc/rfc8785.html"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/#breadcrumb",
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
          "name": "The Sovereign Kill Switch: Break-Glass Epochs and the Conformance Gate",
          "item": "https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/"
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
  "@id": "https://blayneaina.com/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why can any admitted caller engage the stop?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stopping is the safe direction. Requiring elevated recovery authority before containment would create a dangerous delay. Engage still requires admission, a nonempty reason, and a valid machine, agent, or project scope."
      }
    },
    {
      "@type": "Question",
      "name": "Can an agent clear its own emergency stop through MCP or a script?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Recovery refuses an active MCP session, requires `--by operator`, and requires interactive terminal handles for stdin and stderr. This is a local console boundary, not a claim of biometric identity; confined workers additionally lack OS permission to the control directory."
      }
    },
    {
      "@type": "Question",
      "name": "Does advancing `control_epoch` revoke every lease on the host?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only when the advancing scope covers the authority. Machine recovery covers all scopes; an agent or project revision revokes matching older authority while unrelated scopes retain theirs. A future or unproven lineage fails closed."
      }
    },
    {
      "@type": "Question",
      "name": "Does recovery resolve operations whose outcomes are unknown?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Recovery records unresolved file, destination, and model operations in `carried_forward_operations`. Each remains unresolved and blocking until separately reconciled under fresh authority."
      }
    },
    {
      "@type": "Question",
      "name": "What happens if another stop arrives during recovery?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Recovery clears only the latch names fixed in its plan, then rescans. A new machine-covering latch survives, the state becomes `FROZEN_SAFE`, and the receipt does not report a successful all-clear."
      }
    },
    {
      "@type": "Question",
      "name": "Do the 45 passing cases certify the system independently?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. They are author-controlled release qualification against the candidate binary in isolated fixtures. They prove the exercised positive and negative vectors, not independent certification, formal verification, exhaustive coverage, or reversal of external effects."
      }
    }
  ]
}
</script>
