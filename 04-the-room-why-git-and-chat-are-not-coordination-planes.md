---
title: "The Room: Why Git and Chat Are Not Coordination Planes"
subtitle: "Source history records what changed. Chat records what was said. The Room decides who may read, act, receive, stop, and close work now—and makes every transition prove it."
author: "Blayne Aina"
datePublished: "2026-10-31T11:00:00-06:00"
dateModified: "2026-10-31T11:50:00-06:00"
canonicalUrl: "https://blayneaina.com/architecture/the-room-coordination-plane/"
series: "From Proposal to Consequence: The AINA Transition-Governance Series"
position: 4
description: "Why Git worktrees and chat transcripts cannot govern live agents: inside The Room's territory pins, causal sync gate, sealed wake permits, native-session proof, cancellation, and privileged acceptance."
keywords:
  - multi-agent coordination plane
  - causal consistency pre-action work gate
  - sealed wake permits
  - sealed wake authority
  - multi-agent runtime governance
  - causal observation gate
  - native AI session routing
  - native session delivery proof
  - privileged task acceptance
  - runtime state machine invariants
  - Win32 FileIdInfo project pinning
  - Room Sync Engine
isAccessibleForFree: true
inLanguage: en-US
---

# The Room: Why Git and Chat Are Not Coordination Planes

*Source history records what changed. Chat records what was said. The Room decides who may read, act, receive, stop, and close work now—and makes every transition prove it.*

**By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026**

---

A commit proves what source history recorded. A chat message proves what someone said.

Neither proves who may mutate a live resource now, whether the intended native session received the assignment, whether the worker saw every causal parent before acting, whether a queued instruction still has authority, or whether the resulting work passed acceptance.

That is the coordination problem. It does not disappear because agents have worktrees, checkpoints, tool schemas, and an execution log.

Article 03 produced recognized constitutional acts and committed them as `eisa_<32hex>`. Article 04 is the machine that gives those acts a live authority domain: **The Room**.

> **The Room is not a chat channel. It is a coordination plane that binds territory, identity, observation, delivery, execution, cancellation, and completion into one revalidated authority chain.**

<aside class="context-callout" aria-label="Production dogfooding with nine concurrent AI IDEs">
  <h2>Production Dogfooding Note: 9 Concurrent AI IDEs in The Room</h2>
  <p>In daily operation, The Room coordinates 9 concurrent AI IDE worker lanes running on a single Windows workstation against one shared repository. Rather than relying on Git branches or chat logs—which only record collisions after they happen—each of the 9 IDE lanes must acquire a live territory lease and causal wake token from The Room before mutating any file or SQLite row.</p>
  <ol>
    <li><strong>Human architect owns invariants and slice boundaries:</strong> No single model holds the entire multi-module architecture in context. Blayne holds the global state-machine contract and decomposes work into bounded, single-responsibility slices—for example, an RFC 8785 JCS serializer, a Win32 <code>FILE_SHARE_READ</code> wrapper, or an adversarial conformance-vector generator.</li>
    <li><strong>Vendor-agnostic model assignment:</strong> Different IDE lanes use different models and assistants suited to each slice: high-reasoning models for state-machine logic and edge-case auditing, and fast local/flash models for codebase tracing, log extraction, and fixture generation.</li>
    <li><strong>Plausible-but-wrong output is rejected through conformance:</strong> No lane is accepted because its code compiles or its explanation sounds coherent. Every slice must pass strict schema validation (<code>StrictVisitor</code>), pre/post SHA-256 fixture checks, and the 45-case conformance gate before entering the Primary Vault.</li>
  </ol>
</aside>

## The Whole Machine, Not a Wake Queue

The Room includes eleven cooperating mechanism families grouped into six architectural domains. Nine receive numbered subsystem sections below; worker staging and controller-side brokerage are developed within native execution and cancellation rather than numbered separately. Treating the Room as a messaging API leaves most of its assurance on the table.

```text
[1. TERRITORY & PRINCIPAL PINNING]
  state-tree identity + 192-bit combined Win32 project object IDs
  CSPRNG enrollment + thread-local SessionGuard + native conversation binding
  EffectiveTier clamp + multiplexer verb probing + stdio/pre-model egress isolation
          │
          ▼
[2. PER-ROOM GRAPH SHARDS & VISIBILITY]
  immutable scope binding + content-addressed artifacts
  monotonic parent-withholding closure + multi-Room composition
  reparse-safe snapshot recovery
          │
          ▼
[3. ROOM SYNC ENGINE & PRE-ACTION WORK GATE]
  per-Room SQLite WAL sync index + handle-pinned journal reconciliation
  conversation/view checkpoints + recursive causal-parent verification
  atomic turn commit + Fold Rule + post-read revalidation
          │
          ▼
[4. CONTRIBUTION GRAMMAR & SEALED WAKE PERMITS]
  note / reply / say / send / handoff / done with different authority effects
  18-field room-wake-job-v3 + dispatch and split-lock revalidation
  per-recipient evidence delivery + complete governing-source coverage
          │
          ▼
[5. NATIVE SESSIONS, CONFINED WORKERS & ACTIVE CANCELLATION]
  Session Factory v1 + five delivery/reply proof states
  row/column staging + controller-side MCP broker
  held in-flight operations + 1 Hz Job observer + two-phase stop outbox
          │
          ▼
[6. TASK LINEAGE, PRIVILEGED ACCEPTANCE & RUNTIME INVARIANTS]
  16-level delegation ancestry + 14-key completion revalidation
  7 engine-evaluated acceptance kinds
  exactly_once + well_formed + exclusive + causal + resolution
```

The result is a continuous authority path:

```text
EISA-recognized act
→ live actor, credential, native conversation, project, and Room scope
→ confirmed observation of the live causal frontier
→ task-bound contribution and sealed wake permit
→ dispatch-time and worker-claim authority revalidation
→ confined execution and native reply proof
→ destination and artifact acceptance
→ terminal evidence or explicit in-doubt state
```

## One Assignment Through the Machine

Consider a coordinator assigning renewal-evidence review to `reviewer-beta`. The path is not “write a prompt and hope the right agent answers”:

1. **Territory and principal.** The coordinator's credential, native conversation, project object, and Room scope are re-derived. The recipient's registration is current.
2. **Recognized work.** An EISA submission supplies the constitutional act and its evidence handles. The task binds that work to an exact project and acceptance contract.
3. **Observed readiness.** Before the coordinator can send, the Work Gate proves the conversation checkpoint covers the live frontier and every required causal parent is confirmed.
4. **Sealed assignment.** `send` writes the message and obligations, then seals an 18-field wake permit with the recipient, task, evidence, registration, Room authority, control epoch, and original deadline.
5. **Dispatch revalidation.** The Room rechecks the permit, roster, registration, task ancestry, governing source, project, admission, epoch, and remaining time. Evidence is admitted specifically for `reviewer-beta` and delivered with a fresh `wake_delivery` receipt.
6. **Split-lock worker claim.** The worker first validates context outside the transition lock, then rereads the job inside it and requires the unchanged binding digest before claiming.
7. **Native delivery.** The bound native session receives the prompt. Dispatch, body delivery, body visibility, wrong-body refusal, and reply remain separate facts.
8. **Reply and production.** The worker returns a correlated reply and produces the required artifact. Process exit alone would leave the obligation unresolved.
9. **Privileged acceptance.** The engine measures the artifact digest, distinct evidence origins, destination effect, and original worker receipt against the declared acceptance checks.
10. **Terminal closure.** Completion revalidates all 14 task-authority keys, releases the scope through the structured path, and records `task_done`.

If registration changes before dispatch, the old wake stops with `wake_recipient_registration_changed`. If cancellation arrives after launch, new effects stop, the owned Job is terminated, and only `ActiveProcesses == 0` confirms quiescence. Any destination operation whose outcome is uncertain remains `held_until_reconciled`; it is not relabeled “cancelled and safe.”

## 1. Git and Chat Are Necessary—and Insufficient

Git is an excellent source-history plane. Chat is an excellent human and model communication surface. The Room does not replace either. It prevents their artifacts from impersonating live authority.

| Existing primitive | Native value | Additional question the Room answers |
|---|---|---|
| Tool-call schema | The proposal has a valid shape | Is this exact act recognized, currently standing, and inside the caller's verb and tier authority? |
| Graph/workflow checkpoint | A prior plan can resume | Is that plan valid for the current target, conversation, task lineage, registration, generation, and control epoch? |
| Git worktree | Source histories and working directories are separated | Who owns the live resource and may produce this effect now? |
| Model reviewer or vote | More cognition and critique | Which deterministic predicate admits or refuses the act? |
| Execution log | A tool reported an outcome | Did the destination and receipt chain verify it, and did the responsible native session return it? |
| Idempotency key | A retry can be deduplicated | Was the effect committed, and was the original obligation actually answered? |

Clean merges do not prove semantic non-interference. Two agents can edit different lines and violate a shared invariant. They can modify separate files whose combination is unsafe, call the same external API twice, or make locally valid decisions against the same stale pre-state.

Mature coordination systems—consensus services, compare-and-swap stores, MVCC databases, lease and fencing protocols, durable workflow engines—absolutely can answer these questions. The claim is not that AINA invented coordination. The claim is that **source history and conversation are the wrong artifacts to carry its full burden**. A conventional stack that enforces the same canonical transition through the same current predicates earns the same functional credit.

## 2. Subsystem 1: Territory and Principal Identity

Authority starts by proving which state tree and which physical project object the act concerns.

### Split-brain state-tree refusal

Before the engine opens its state tree, `validate_state_dir` requires the state-directory identity marker. The marker carries an `id` and `canonical_path`; the machine bootstrap supplies the canonical instance and root. A missing marker, an unreadable bootstrap, a different instance ID, a noncanonical path, or a mismatched `SQUAD_ROOT` fails closed.

This prevents two `.squad` trees from independently accumulating tasks, leases, credentials, and Room history while believing they are one machine. It is not a path prettification step. It is a split-brain admission gate.

### Project grants pin path and kernel object identity

An owner-opened `ProjectGrant` binds:

- a unique project ID and bounded name;
- the requested and canonical root paths;
- `root_object_id`, a 192-bit combined identity: a 64-bit volume serial number plus the 128-bit NTFS/ReFS file ID;
- opening actor and time;
- an optional governing-source grant and its reading policy.

The directory is opened with backup semantics and queried through `GetFileInformationByHandleEx(FileIdInfo)`. Every live authorization rechecks both canonical path and object identity. A junction, symlink, replacement, or redirected root produces `project_root_redirected`.

Project opening refuses non-directories, filesystem roots, broad owner containers, control and recovery storage, worker roots, and overlapping project territories. Roster membership does not widen this boundary.

`ReadAuthority` applies the same provenance discipline to shared briefcases, contexts, artifacts, braindumps, and proposals: project-scoped records go to admitted project readers, coordination records to the appropriate Room roster, and legacy unscoped records only to their original author.

### CSPRNG enrollment without persistent plaintext secrets

Agent enrollment generates a 32-byte secret with Windows `BCryptGenRandom`. The controller stores only `secret_sha256`, issuance, revocation, and target metadata. Host configuration receives the actual token for connection authentication; enrollment receipts do not return it. Multi-agent enrollment restores exact preimages if any step fails.

Every call revalidates the current credential digest, so rotation and revocation affect live connections without a restart.

### Thread-local sessions and native conversation identity

`SessionGuard` binds one authenticated session to one synchronous dispatch. Its `PhantomData<Rc<()>>` prevents the authority guard from moving across threads, and `Drop` removes the active frame during normal return or unwind.

`IS_HTTP_WORKER` closes the privilege-fallback path: an HTTP worker thread without an active request session never inherits the process launch principal.

For supported Codex hosts, `bind_tool_request_context` reads `params._meta.threadId` outside model-authored arguments, requires a non-nil canonical UUID, and binds `codex:<UUID>` as the native conversation. The authenticated host is the metadata trust boundary. This is not cryptographic attestation against every process that might possess its credential, and Article 04 does not claim otherwise.

Self-identifying argument fields must match the bound principal. Mismatches produce `actor_mismatch` and an integrity signal rather than letting a model nominate a more privileged author.

### Tier clamping includes the route, not just the tool name

The effective tier is the minimum of:

```text
session-declared tier
owner per-agent max_tier
fleet-wide control ceiling
```

Owner policy and the fleet ceiling are re-read on every invocation. The multiplexer guard then derives verb routes from the MCP schema build table using `VERB_PROBE`. A denial of `room_note` therefore also blocks `squad_room` with `{"action":"note"}`. Blocking the friendly tool name while leaving the generic route open is not policy enforcement.

### Stdio and pre-model egress are separate boundaries

The MCP transport duplicates its original input/output as private handles and clears inheritance flags. Process standard input is detached, and standard output is redirected to diagnostics so a child cannot corrupt the JSON-RPC wire or retain the parent's pipe accidentally.

Before a result or error reaches model context, every string passes `redact_checked`. If the redaction policy cannot be established, the response becomes `tool_result_withheld`. The tool may already have run; the uninspected result still does not escape.

## 3. Subsystem 2: The Room Graph Is a Visibility and Recovery Boundary

Each Room owns a physically isolated graph shard derived from the workspace instance and Room name:

```text
room_graphs/<graph_id>/
  manifest.json
  binding.json
  nodes.jsonl
  artifacts.jsonl
  errors.jsonl
  blobs/<sha256>.<json|txt>
  sync_index.db
```

`binding.json` permanently fixes `Scope::Coordination` or `Scope::Project { id }`. Historical artifacts cannot be rebound to another project or scope class; `graph_project_rebind_refused` requires a new Room identity. Policy mutation uses `expected_sha256` optimistic concurrency, atomic preimage retention, and `prepared`/`applied` journal stages.

Payloads over 8 KiB spill into content-addressed blobs. MCP call text over 24 KiB compacts to a blob with a 4 KiB preview. Sensitive credential arguments are omitted from audit projections rather than preserved for convenience. Legacy imports require quiescence: a live pre-shard writer triggers `room_graph_legacy_writer_detected` instead of racing the new graph. Hash-chained artifacts make alteration detectable; they do not prove non-deletion or independent validation.

### Withholding closes over descendants

`ProjectVisibility` first filters by project and evidence visibility, including collaborative-pass staging. It then computes a monotonic parent-withholding closure: if any parent is withheld, every child evaluation, citation, or derived record is withheld too. Legacy unscoped MCP calls degrade to `project_metadata_only`, removing arguments, responses, read/write sets, and artifact references.

A hidden parent cannot leak through a visible child.

### Composition is intersection, not union, of authority

`squad.room_composition.v1` composes a bounded set of Rooms under an owner grant. Every constituent must remain admitted. The effective reader scope is the intersection of the composition grant, each Room grant, current membership, and active project. A failed constituent yields `incomplete_source_set`, not a partial composition that silently drops its restrictions.

Pagination binds `request_sha256` to the composition, reader, filter, limit, and source snapshots. If a source changes between pages, `graph_page_snapshot_changed` prevents a mixed-generation export. Composition confers no execution authority.

### Recovery refuses reparse shortcuts and preserves causal order

Snapshot recovery uses `squad.room_snapshot.v1`. Copying refuses symlinks and NTFS reparse points. A verified staged tree is fingerprinted, the previous live tree is preserved, and promotion occurs only after current-state and staged-state checks. Interrupted recovery remains pending and blocks ordinary graph access until the exact operation resumes.

## 4. Subsystem 3: The Room Sync Engine and the Pre-Action Work Gate

A coordination plane cannot rely on an agent remembering what it has read. It must measure the observation.

### A durable per-Room sync index

Each Room has `sync_index.db` under `squad.room_sync_index.v1`. Every connection enforces and verifies:

- `journal_mode = WAL`;
- `synchronous = FULL` (`2`);
- `foreign_keys = ON`;
- `busy_timeout = 5000 ms`.

Nine relational tables hold the rebuildable event projection, context head, graph links, receipts, checkpoints, snapshots, causal edges, confirmed events, and local event embeddings. The event index is rebuildable from the authoritative journals; receipts and checkpoints survive index repair.

### Handle-pinned reconciliation

Reconciliation opens `EVENTS.jsonl`, verifies its Win32 file identity, and retains a trailing anchor of up to 4,096 bytes with its SHA-256. Journal replacement or incompatible rotation is `room_sync_journal_rotated`, not an invisible reset.

The reader advances in 1 MiB batches with an 8 MiB per-record ceiling, verifies the `prev_hash → hash` chain and monotonic Hybrid Logical Clock, and computes local embeddings outside the SQLite write transaction. Expensive semantic work never holds the database lock.

### Checkpoints bind actor, conversation, credentials, Room, and view

A delivery checkpoint is not just `agent_x read_offset = N`. It binds a `conversation_key` derived from workspace instance, bound actor, registration digest, native conversation UUID, and Room, plus a `view_gen` derived from evidence-read admission, reset state, project, participants, and readers.

Changing IDE thread, rotating registration, resetting the Room, or changing the visible project invalidates the checkpoint and requires fresh synchronization.

Pages are limited to 24 KiB including the MCP envelope. Oversized events split into 1,024-byte UTF-8-safe `item_chunk` fragments. Only the final `item_complete` fragment advances the journal offset, so an interrupted read re-serves the item rather than pretending it was consumed.

Redaction runs again at confirmation. If policy changed the delivered representation, confirmation fails with `room_sync_delivery_policy_changed`. A receipt tip that is not an ancestor of the current journal fails with `room_sync_receipt_forked`.

### The Work Gate requires frontier and causal readiness

Nine participant verbs—`note`, `say`, `reply`, `send`, `done`, `blocked`, `decline`, `handoff`, and `circle`—must pass the pre-action Work Gate.

Two conditions must hold:

1. The conversation checkpoint is ready and `confirmed_offset` covers the live coordination frontier.
2. `verify_causal_parents_confirmed` proves that the explicit parents and every ancestor returned by a recursive SQLite CTE over `causal_edges` are confirmed for that conversation and view. A matching confirmed event or a confirmed receipt covering the parent's offset can establish coverage; the bound identity's own events are handled explicitly.

Failure returns `room_sync_required` with the next authorized page. The agent must read and confirm the missing context before acting.

At commit, the writer lock revalidates the frontier and conversation, assigns HLC and hash lineage, and appends the staged events atomically. A foreign arrival triggers `room_sync_concurrent_arrival` rather than letting a stale turn slip through.

The **Fold Rule (D1)** advances the author's confirmed offset only when no foreign coordination event exists between the old checkpoint and the newly written event. The author folds its own work, never someone else's unread work.

Named system writers have separate authority and cannot emit participant message kinds. Finally, `RoomEventView::revalidate()` rechecks actor, project visibility, Room authority, and task-source digest after a read, catching authority changes that occurred while the view was being assembled.

## 5. Subsystem 4: Contribution Verbs Have Different Authority Effects

The Room is not freeform chat with locks added later. Its verbs deliberately separate status, answer, assignment, transfer, and completion.

| Verb | Wake and task rule | Constitutional effect |
|---|---|---|
| `note` | Never wakes; visible `@mentions` refused | Status or identity telemetry without mentions, obligations, or dispatch |
| `reply` | Never wakes; explicit `reply_to` required | Resolves an addressed mention or obligation after validating that it belongs to the caller |
| `say` | Coordination-only wake behavior; rejects `--task`; project wake delivery requires `send` | Conversational turn with strict targeting and ambiguity handling |
| `send` | Task required in project Rooms; creates sealed wake jobs | Two-phase message/obligation commit and authorized worker delivery |
| `handoff` | Bounded invitation; project no-wake inbox or coordination delivery | Transfers task ownership without transferring a lease |
| `done` | Task required | Runs privileged acceptance and resolves only proven addressed items or verified successors |

An untargeted `say` reply cannot resolve a mixed set of pending obligations. If open items trace to more than one source event, the Room refuses with `say_reply_target_ambiguous` before writing anything.

`send` prevalidates the task and every evidence handle before its first event. A citation belonging to another Room produces `cross_room_evidence_refused`. Flush 1 commits the `room_message`; Flush 2 commits the mention and obligation records. A cooldown-deferred wake is still a sealed permit, and the 2,000 ms damper clock starts at dispatch completion rather than at initial gate passage.

`handoff` records `lease_transferred: false` and `fresh_claim_required: true`. Ownership can move; the old kernel and lease authority cannot be inherited as a side effect. `done` can resolve items from a superseded task only when `verified_successor` proves a non-weaker replacement: same owner, source, project, requirements, and non-empty acceptance, with no wider scope.

## 6. Subsystem 5: A Wake Is a Sealed Authority Transition

A queued prompt is not execution authority. It is a proposal to deliver work later, under conditions that may have changed.

### The 18-field `room-wake-job-v3` binding

`binding_sha256` covers these exact queue fields:

```text
schema, room, agent, from, source_event, path, prompt,
task (explicit null when untasked), evidence_refs (when present),
mention_ids, obligation_ids, pulse_message, deadline_ms,
created_at, not_after, control_epoch, room_authority,
registration_sha256
```

The explicit `task: null` matters: adding or stripping a task binding changes the digest. `not_after` is computed from the original creation time and deadline—60 seconds for untasked delivery and 20 minutes for task-bound work—so queue wait consumes the same budget as execution. Registration and Room authority are sealed for comparison, not treated as evergreen.

Prompt and pulse text pass the egress redactor before the job is stored. The queue path itself must resolve to the canonical regular, non-reparse object.

`binding_sha256` is an **integrity comparison, not a digital signature or standalone authentication mechanism**. Authenticity comes from the controller-governed queue object and write protocol plus the live revalidation below. A party that rewrites both the job and its digest still does not inherit the sealed recipient, registration, Room authority, task, project, or control epoch; those must independently match now. This is not a claim to contain a privileged host administrator outside the governed boundary.

### Five live dispatch checks

`authority::validate` re-derives five independent authority centers before launch:

1. **Sealed integrity and replay eligibility.** Schema, binding digest, canonical queue object, and `retry_allowed` must hold. Tampering records `wake_job_binding_changed` as an integrity signal.
2. **Current Room and recipient authority.** The Room must be open and uncancelled; recipient and sender rosters, owner grant, reset/session state, graph-reader admission, and registration digest must match the sealed values. Replacement authority produces `wake_room_authority_changed` or `wake_recipient_registration_changed`.
3. **Active task and governing-source authority.** The task must be open or claimed, have valid ancestry, remain owned by the sealed sender or an eligible operator/delegator, and pass `pin_task_source`. Project Rooms require a task from the exact project; project tasks cannot hide in coordination Rooms.
4. **Current admission and control epoch.** Project closure, control admission, break-glass subject, and sealed `control_epoch` must still permit a new effect.
5. **Original deadline and running-process binding.** `not_after` must still have budget. Once claimed, `RequestPermit` binds the canonical path, digest, `running` status, and worker PID; later effects revalidate that exact claim.

### Single flight, capacity, and split-lock claim

Dispatch enforces one active worker per recipient with `recipient_busy` and defers excess model-route load through `worker_route_capacity`, preserving the obligation instead of dropping it. The launcher uses the verified installed engine, strips caller credentials and tier overrides, and isolates standard handles.

The worker claim uses a split-lock protocol:

```text
validated_context outside with_transition
→ file, ancestry, task, and source checks without starving sender lease locks
→ enter with_transition
→ re-read job and require unchanged binding_sha256
→ require remaining deadline
→ mark running with worker_pid and attempts + 1
```

A change between those phases becomes `wake_job_changed_during_validation`, not a replay.

### Evidence is delivered to the recipient, not inherited from the sender

`attach_evidence` rechecks every `ev_` handle for the specific recipient at wake time. Admitted passages ride inline in the wake prompt, while served and withheld dispositions are recorded. Each delivery receives a fresh `squad.evidence.receipt/1` with `tool: "wake_delivery"` and an `srv_<32hex>` identifier.

For governing-source tasks, `require_source_reading_between` proves that the native actor/session's receipts cover the continuous `[0, length)` interval across every primary story and detached element of one complete current parser view, inside the `[not_before, not_after]` connection/checkpoint window. Registration, summaries, or a few impressive chunks do not satisfy `complete_text_v1`.

### Exhibit 1 — A sealed wake binding excerpt

Synthetic values show the current binding shape. The digest covers all 18 fields, not only this display excerpt.

```json
{
  "schema": "room-wake-job-v3",
  "room": "architecture-demo",
  "agent": "reviewer-beta",
  "from": "coordinator-alpha",
  "source_event": "evt_0123456789abcdef_a1b2c3d4",
  "path": "room_wake_jobs/architecture-demo/reviewer-beta/evt_0123456789abcdef_a1b2c3d4.json",
  "prompt": "Review the sealed renewal evidence and answer the assigned obligation.",
  "task": "TSK-2026-ROOM-004",
  "evidence_refs": ["ev_8f31c09a4b2e11d08a7c65e41902b3a1"],
  "mention_ids": ["mention_synthetic_01"],
  "obligation_ids": ["obligation_synthetic_01"],
  "pulse_message": "Review the sealed renewal evidence.",
  "deadline_ms": 1200000,
  "created_at": "2026-10-31T16:00:00Z",
  "not_after": "2026-10-31T16:20:00Z",
  "control_epoch": 7,
  "room_authority": {
    "owner_grant": "synthetic-owner-grant",
    "revision": 12,
    "reset_at": null,
    "session": "room-session-synthetic"
  },
  "registration_sha256": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
  "binding_sha256": "e01928374655647382910abcdef1234567890abcdef1234567890abcdef12345"
}
```

### Exhibit 2 — Registration changed after sealing

```json
"wake_recipient_registration_changed"
```

The old prompt may still be intact. Its recipient authority is not.

### Exhibit 3 — Deadline consumed before dispatch

```json
"wake_job_expired: queue time counts against the original deadline"
```

A prompt that became stale in the queue cannot acquire fresh execution time merely because a worker became available.

## 7. Subsystem 6: Native Session Delivery and Reply Are Different Proofs

A tool transport can deliver a request to a process. It cannot prove that the intended native conversation received it or that the resulting obligation was answered.

### Session Factory v1

`session_factory_v1` gives each native session a global ID of the form `sf_<ide>_<native>`, with lane, native session ID, working directory, transport, model profile, proof cursor, parent, lease, tags, and per-adapter operation coverage. The current contract covers 15 IDE/CLI adapter families and eleven operations: `list`, `create`, `bind`, `resume`, `focus`, `send`, `prove`, `summarize`, `fork`, `archive`, and `restore`.

For stateful IDE wakes, `spawn_policy: "never"` requires delivery into the bound native session rather than launching an untracked sibling. Adapter capability remains explicit; a shared session schema does not invent identical native features everywhere. Each adapter's `operation_coverage` determines which lifecycle operations and proof states it can actually supply. `dispatched` may be available where body-visible or correlated-reply evidence is not; an unsupported proof is reported as unsupported, never inferred from transport success.

### The five delivery/reply proof states

| State | What is proven | Obligation status |
|---|---|---|
| `dispatched` | A delivery attempt exists, not body delivery | `delivery_unproven`; unresolved |
| `delivered_to_body` / `ide_delivered` | The prompt reached the native session body | `pending_reply`; unresolved |
| `body_visible_pending_reply` | The target thread UI or store shows the prompt | `pending_reply`; unresolved |
| `wrong_body_rejected` | A nonmatching open thread was refused | Unresolved; no cross-thread credit |
| `replied` | A correlated native reply exists | Resolved mentions and obligations |

These are not fungible green statuses. Body delivery does not prove a reply. A reply does not prove destination acceptance. A wrong-body result never counts as delivery.

For ACP/CLI execution, `exited_ok` without a correlated Room reply produces `proof_kind: "process_exit_only"` and leaves the job in `pending_reply`. Exit code zero is not an answered obligation.

`WakeObligationFold` promotes obligations that remain unproven beyond the declared age threshold to `dead_obligation`, and cycle detection walks up to 20 links to surface circular waits. Unfinished work remains visible instead of disappearing behind a process status.

## 8. Subsystem 7: Active Cancellation and Worker Authority

Room control is authenticated and physically enforced. It does not rely on a worker noticing a cancellation message eventually.

### Authenticated control and held in-flight operations

Lifecycle actions require `control_actor` standing through an authenticated operator or local owner console. A caller-supplied `by = operator` string does not create control authority.

`run_cancel` stops the Room compiler, dead-letters queued/deferred/unclaimed jobs with `retry_allowed: false`, leaves addressed obligations unresolved, and advances Room authority so running wake lineage no longer matches.

It then inventories unresolved file operations, destination operations, and brokered model requests tied to the Room or project as `held_until_reconciled: true`. Work a destination may already have accepted is not rewritten into “cancelled and safe.” It remains held for governed reconciliation.

### The 1 Hz owned-Job observer and durable stop outbox

Every confined worker belongs to a named Win32 Job Object. The `squad-owned-job-control` observer runs at 1 Hz, watches admission, break-glass, Room authority revision, cancellation, and worker authority, and calls `TerminateJobObject(handle, 1)` when authority trips.

A successful terminate call is not proof of quiescence. The observer queries `JobObjectBasicAccountingInformation` and confirms termination only when `ActiveProcesses == 0`.

The `squad.room-owned-stop.v1` outbox preserves that sequence before any ledger or graph commit:

```text
phase-1.json
  termination_confirmed: false
  pending: bounded reason

phase-2.json
  termination_confirmed: true
  pending: null
  predecessor: exact phase-1 event_id + envelope_sha256
```

Replay commits those captured envelopes in causal order and writes separate `phase-1.committed.json` and `phase-2.committed.json` markers. A crash cannot manufacture a Phase 2 commit without its Phase 1 predecessor, and a stop request cannot impersonate a zero-process observation.

### Worker staging minimizes data before confinement

Staging admits 1–256 exact source selections with SHA-256 verification and a 64 MiB aggregate ceiling. JSON, JSONL, and SQLite sources can be projected to explicit rows and columns. SQLite projection copies the pinned bytes to a temporary file first; the live database is never opened by the projection builder. The projected copy requires the row key and integer version, records withheld rows and fields, and prepares changes only as governed proposals.

When changes are requested, the controller prepares the `RequestedAct`. The worker does not choose its own mutation.

The bridge binary is staged by content digest as `squad-worker-bridge.exe` and read back through a pinned handle. Reparse points and hardlinked files are refused. Empty-work-root ACL normalization emits a receipt bound to the pinned root. `internetClient` is refused as nonconforming; model access travels only through owner-approved brokered routes.

### The controller-side MCP broker revalidates the worker and the call

For LPAC workers, an `AF_UNIX` endpoint with a per-launch ACL admits the package. The controller verifies the held worker's Job membership with `IsProcessInJob`, its token and capabilities with `verify_worker_token`, and a 32-byte launch nonce. It does not pretend that an unavailable AF_UNIX peer-PID ioctl supplied a kernel identity for the bridge peer.

For brokered-host Named Pipes, first-instance creation and `PIPE_REJECT_REMOTE_CLIENTS` prevent squatting and remote clients. The broker additionally uses `QueryFullProcessImageNameW` to require the exact staged bridge image.

Every request and response is bounded and rechecked. Revocation before response transport produces a typed refusal; revocation after part of the response escaped records `severed_mid_response` rather than appending a second contradictory frame. The check and following write are not falsely described as one atomic primitive.

## 9. Subsystem 8: Task Lineage and Privileged Acceptance

A Room reply says the worker answered. Acceptance asks whether the actual artifacts satisfy the task.

### Delegation cannot outlive or widen its ancestry

Task scopes exclude controller state, recovery storage, shipped binaries, skill mirrors, and authoritative Room ledgers. `validate_ancestry` walks at most 16 parent links and rejects cycles.

Every ancestor must remain open or claimed, preserve owner and recipient eligibility, match authority epoch and any revision, retain the same governing source, and keep the child's scope within the parent. `coordination_only` cannot widen into mutation. A parent whose authority changes invalidates the descendant chain.

### Seven acceptance kinds, evaluated by the engine

`done_task` evaluates the task's declared checks rather than trusting completion prose.

| Kind | What the privileged evaluator actually measures |
|---|---|
| `sha256` | Reads the in-scope file and compares its live SHA-256 with the expected digest |
| `file_exists` | Uses `Path::try_exists()`; an OS or permission error is `unconfirmed`, not success |
| `file_absent` | Uses the same observation law: an error fails closed instead of becoming absence |
| `command` | Executes an absolute, owner-allowlisted binary with no shell or PATH lookup, optional exact argument tail, bounded timeout, and expected exit code—outside `with_transition` |
| `evidence_origins` | Requires 1–16 distinct, lineage-collapsed first-hand origins behind the named requirement, plus any owner-wide minimum |
| `destination` | Checks folded ledger status and a fresh read-only `effect_present` observation for one operation or every task operation |
| `worker_receipt` | Validates Basic, StrictReturn, or SuccessorReturn evidence from immutable submissions, not a worker-authored receipt path |

The three receipt profiles are intentionally different:

- **Basic** requires at least `min` task submissions with one terminal outcome and no pending, recording-pending, or worker-unread results.
- **StrictReturn** requires one applied submission with the exact worker, target, expected fields, and version delta `+1`, then proves that the original worker received the result and returned a correlated Room reply. `proposal_id` is optional; `outcome` and `min` are forbidden.
- **SuccessorReturn** requires all eight pins: `proposals: "successor"`, worker, proposal ID and digest, whole-record digest, whole-outcome digest, and outcome. It proves fresh acknowledgment of a historical result while explicitly keeping `satisfies_original_return: false` and `resolves_original_obligation: false`.

A successor acknowledgment never fabricates the original session's return.

### Completion revalidates authority and live evidence

Long-running command checks run before the short transition. Inside `with_transition`, completion then:

1. re-reads the task and requires it to remain claimed;
2. compares all 14 authority keys: `owner`, `scope`, `active_scope_pin`, `file_scope_pin`, `project_id`, `project_root_pin`, `authority_epoch`, `authority_revision`, `source`, `delegation`, `lock`, `acceptance`, `requirements`, and `evidence_manifest`;
3. rechecks dependencies, ancestry, project scope, and settled worker contributions;
4. re-evaluates every non-command check against current files, evidence, and destinations;
5. refuses completion on changed acceptance or `content_mismatch` quarantine;
6. releases the scope lock through the structured release path and appends `task_done`.

Requirement- or source-bound tasks cannot close with an empty acceptance array unless a trusted operator records an explicit override and reason. Acceptance is configured evidence, not a ceremonial green check.

### Exhibit 4 — Successful artifact acceptance

This synthetic result combines file, evidence, destination, and receipt measurements. Every predicate is independently true; none borrows the others' assurance.

```json
{
  "task": "TSK-2026-ROOM-004",
  "acceptance_pass": true,
  "acceptance_results": [
    {
      "kind": "sha256",
      "pass": true,
      "detail": {
        "path": "project:/artifacts/renewal-result.json",
        "expected": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
        "actual": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567"
      }
    },
    {
      "kind": "evidence_origins",
      "pass": true,
      "detail": { "req": "R1", "min": 2, "distinct_origins": 2, "basis": "task_acceptance" }
    },
    {
      "kind": "destination",
      "pass": true,
      "detail": { "operation_id": "op_synthetic_004", "status": "resolved", "effect_present": true }
    },
    {
      "kind": "worker_receipt",
      "pass": true,
      "detail": { "profile": "strict", "proposals": "task", "worker": "reviewer-beta", "proof": "original-session-return-verified" }
    }
  ]
}
```

### Exhibit 5 — `file_absent` cannot turn an observation error into absence

```json
{
  "kind": "file_absent",
  "pass": false,
  "detail": {
    "path": "project:/protected/unreadable-result.json",
    "error": "Access is denied.",
    "error_kind": "PermissionDenied",
    "observation": "unconfirmed"
  }
}
```

`!path.exists()` would be the wrong proof here. `try_exists()` preserves the difference between absent and unknowable.

## 10. Subsystem 9: Five Runtime Invariants Constrain Event Law

Pre-action gates decide whether an act may proceed. The runtime invariant engine continuously checks the event stream for structural violations and records dedicated `invariant_violation` nodes through the journal and Room graph.

| Invariant | State carrier and rule | Severity and boundary |
|---|---|---|
| `exactly_once` | A bounded 10,000-entry FIFO `IdempotencyRegistry` rejects a repeated confirmed idempotency key | `Reject`; deduplicates registered events, not every external effect |
| `well_formed` | A lifecycle tracker per `(agent_id, parent_id)` enforces valid `Begin → Effect → Resolve` transitions | `Reject`; an effect or resolution cannot invent its own lifecycle |
| `exclusive` | A lease set over `TypedScope(namespace, resource_id)` rejects conflicting live holders | `Reject`; file scopes conflict hierarchically, non-file scopes by exact identity |
| `causal` | A resolved-ID set checks whether each `parent_id` is already resolved | `Flag`; unresolved causal matter is surfaced, not silently accepted as complete |
| `resolution` | An unresolved-intention map detects begins that exceed the caller's TTL before resolution | `IndoubtEffect`; the effect remains uncertain rather than being declared success or failure |

Reject violations are recorded without committing the triggering envelope. Flag violations are buffered in the same checked append path. The graph therefore preserves both rejected operations and suspicious causal conditions without laundering them into valid effects.

The 10,000-entry FIFO also defines a **bounded replay-detection window**. An evicted key no longer receives the registry's duplicate protection; eviction does not create a fresh execution grant or a permanent replay-proof history. Deployment acceptance must state the registry's retention and reconstruction horizon rather than treating it as unlimited.

**Exactly-once event resolution is not exactly-once external effect.** A destination can accept an effect while its ordinary receipt fails, an external service can perform a non-idempotent side effect, and a process can crash between mutation and observation. Articles 06–08 carry that burden through recovery records, readback, held completion, and break-glass reconciliation.

### Exhibit 6 — An in-doubt TTL record

```json
{
  "event_id": "evt_0123456789abcdef_deadbeef",
  "agent_id": "reviewer-beta",
  "began_at": "",
  "elapsed_secs": 317
}
```

This is not a failure receipt and not a success receipt. It is a bounded indication that an intention remained unresolved beyond the declared TTL and requires reconciliation.

## 11. The 2026 Coordination Evidence Landscape

The 2026 literature and protocol specifications reinforce the same architectural distinction: state management, native session identity, revalidation, and measured completion are separate control surfaces. Each source has a bounded claim.

| 2026 primary source | What it actually establishes | How the Room composes with it |
|---|---|---|
| Liu et al., [*Multi-agent Collaboration with State Management (STORM)*](https://arxiv.org/abs/2605.20563), May 2026 preprint | Worktree isolation defers conflicts to post-hoc merge; STORM mediates shared-workspace state at write time and outperforms the baseline by 18.7 points on Commit0-Lite and 1.4 on PaperBench, with comparable or better cost efficiency. | Strong evidence for live state mediation. Git remains the source-history plane; the Room handles current observation, admission, and ownership. |
| Sarkar, [*Before the Pull Request: Mining Multi-Agent Coordination*](https://arxiv.org/abs/2606.19616), June 2026 preprint | A shared coordination substrate reduced redundant work from 78% to 0% while useful throughput more than tripled, converged without silently dropped writes, and exposed lock starvation, rediscovery, and race-to-close hidden from PR history. | Coordination artifacts must preserve claims and collisions before the PR. The Room additionally gates their authority and acceptance rather than merely mining them afterward. |
| Nechepurenko and Shuvalov, [*Coordination as an Architectural Layer for LLM-Based Multi-Agent Systems*](https://arxiv.org/abs/2605.03310), May 2026 preprint | An information-controlled prediction-market study reports distinguishable coordination signatures and a cost-quality Pareto frontier. The authors call it a methodology-validating first instantiation, not a general cross-model claim; pairwise tests do not survive correction. | Coordination belongs in architecture, not only prompts. The Room does not borrow a universal failure-rate claim from this bounded study. |
| [Model Context Protocol `2026-07-28`](https://modelcontextprotocol.io/specification/2026-07-28) | Defines stateless, self-contained requests and per-request capability negotiation, with optional tasks and context features. | Stateless transport does not supply native conversational standing. The Room binds actor, registration, native conversation, and current view explicitly. |
| [Agent Client Protocol documentation](https://agentclientprotocol.com), 2026 | Standardizes editor–agent communication and native session lifecycle across local JSON-RPC/stdio and remote transports. | Native sessions are the delivery boundary. The Room's Session Factory and proof ladder distinguish dispatch, body visibility, wrong body, reply, and process exit. |
| Wang, Wang, and Wu, [*The Unreliable Progress Bar*](https://arxiv.org/abs/2609.08589), September 2026 preprint | Reporting reliability varies by task stage: most tested models lose accuracy mid-task and recover at completion, while newer models become conservative at the finish line. The authors advise against controlling flow from state reports alone. | `done` requires privileged artifact and destination acceptance, not a model's progress bar. |
| Lyu et al., [*From Version Conflicts to Decision Conflicts*](https://arxiv.org/abs/2609.08015), September 2026 preprint | ATR rechecks only decision-affecting conditions, matched every specified outcome across 210,000 controlled executions, evaluated 0.6 versus 6.0 conditions per change, and reports a large latency reduction. The authors limit this to controlled feasibility. | The Room rechecks current authority at turn entry, dispatch, worker claim, completion, and destination—not merely whether bytes changed. |
| Khan, [*S-Bus: Automatic Read-Set Reconstruction for Multi-Agent LLM State Coordination*](https://arxiv.org/abs/2605.17076), May 2026 preprint, revised v2 | Observable-Read Isolation reconstructs read sets from observed GET traffic, with formal checks and zero Type-I corruptions across 884,110 commit attempts. It also documents topology-dependent limits and agent over-reporting. | The Room measures confirmed read coverage and causal ancestry rather than assuming an agent observed the state it cites. |
| [SQLite WAL documentation](https://www.sqlite.org/wal.html) and [Microsoft Win32 documentation](https://learn.microsoft.com/en-us/windows/win32/api/), current 2026 references | WAL durability modes govern when transactions reach stable storage; `GetFileInformationByHandleEx`, Job Object termination, and accounting provide kernel object identity and process-count observations. | These are implementation primitives, not complete coordination semantics. The Room composes them into object pinning, journal reconciliation, and durable stop proof. |

A final concession matters: a conventional deployment can implement the same invariants with different names. The Room's claim is not exclusive ownership of coordination theory. Its claim is a concrete, inspectable composition of the required predicates in one continuous machine.

**Evidence availability and performance boundary:** the implementation and acceptance artifacts are `CONTROLLED` for qualified, method-scoped technical review, with adverse findings permitted. They are not unrestricted public downloads or independent validation. The architecture does not claim a universal latency or throughput envelope: recursive causal queries, journal folds, live revalidation, recipient evidence checks, native-session proof, and stop confirmation must be measured against the actual Room topology, adapters, and workload.

## Bring One Assignment With an Uncertain Outcome

The **Multi-Agent Coordination & Acceptance Audit Challenge** evaluates one assignment whose delivery, ownership, or completion is currently hard to prove. The demonstration maps causal readiness, replays sealed-wake acceptance and refusal, and measures the resulting artifact and destination rather than trusting completion prose.

The challenge excludes universal adapter or native-session attestation, production write authority, and exactly-once external effects. Deployment and paid pilots are separately scoped; independent evaluation remains outside the commercial ladder through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## The Twelve Coordination Claims

| ID | Bounded claim | Evidence and ceiling |
|---|---|---|
| `04-C01` | Split-brain state trees are refused, and project grants revalidate canonical path plus 192-bit combined kernel object identity | Implemented and author-verified on local NTFS/ReFS territory; not a remote-share or host-admin guarantee |
| `04-C02` | Enrollment, thread-local sessions, native conversation binding, tier clamping, and multiplexer verb probing bind every connector call to a principal and route | Implemented and author-verified on declared MCP/CLI paths and host contracts |
| `04-C03` | Room shards carry immutable scope bindings and parent-withholding closure | Implemented and author-verified for graph queries, compositions, and exports; hash artifacts do not prove non-deletion |
| `04-C04` | The sync index reconciles handle-pinned journals across hash/HLC chains and binds checkpoints to conversation and view | Implemented and author-verified for rotation, fork, and delivery-policy refusal paths |
| `04-C05` | The Work Gate requires live frontier and recursive causal-parent confirmation before all nine participant verbs | Implemented and author-verified; blind writes receive a sync page, not authority |
| `04-C06` | Contribution verbs separate status, response, assignment, ownership transfer, and completion | Implemented and author-verified for ambiguity, cross-Room evidence, successor, and no-wake paths |
| `04-C07` | Every wake is an 18-field permit revalidated at dispatch and worker claim | Implemented and author-verified for binding, roster, registration, task, epoch, path, PID, and original-deadline changes |
| `04-C08` | Wake-time evidence is recipient-specific and governing-source coverage is continuous over `[0, length)` | Implemented and author-verified through `wake_delivery` receipts and bounded time windows |
| `04-C09` | Native delivery and reply are distinct proof states; process exit alone never resolves an obligation | Implemented and author-verified for declared adapters; not a universal UI or remote-session attestation |
| `04-C10` | Cancellation holds in-flight work and confirms owned-Job termination only at zero active processes | Implemented and author-verified through the two-phase durable stop outbox; accepted destination effects remain for reconciliation |
| `04-C11` | Delegation and completion use 16-level ancestry, 7 acceptance kinds, and 14-key final authority revalidation | Implemented and author-verified; acceptance is bounded by configured predicates and protected observation paths |
| `04-C12` | Five runtime invariants constrain event law and emit dedicated violation evidence | Implemented and author-verified; exactly-once event handling does not prove exactly-once external effect |

## The Article 04 Claim Card

```text
Mechanism:
  The AINA Room Coordination Plane
  (state identity, project grants, connection/session authority, tool policy,
   graph shards, visibility, sync, contribution verbs, wake permits,
   Session Factory, worker confinement, cancellation, acceptance, invariants)

Failure it governs:
  Source history and chat impersonating live authority;
  split-brain state and redirected territories;
  stale context, causal-parent blindness, and ambiguous obligations;
  stale queued wakes and wrong-session delivery;
  process exits and agent prose impersonating completion;
  unobserved cancellation and unverified task closure.

Positive path:
  EISA-recognized act
  → current principal, native conversation, project, Room scope
  → confirmed causal frontier
  → task-bound contribution and 18-field sealed wake
  → dispatch and split-lock worker-claim revalidation
  → confined execution and native reply proof
  → 7-kind artifact/destination acceptance
  → terminal evidence or explicit in-doubt reconciliation.

Refusal / hold path:
  project_root_redirected, actor_mismatch, graph_project_rebind_refused
  room_sync_required, room_sync_receipt_forked
  say_reply_target_ambiguous, cross_room_evidence_refused
  wake_room_authority_changed, wake_recipient_registration_changed
  wake_job_changed_during_validation, wake_job_expired
  wrong_body_rejected, process_exit_only
  held_until_reconciled, task_acceptance_changed_before_completion
  file_absent observation unconfirmed, IndoubtEffect.

Evidence status:
  Implemented and Author-Verified across the declared Windows reference
  embodiment and native adapter contracts.
  External 2026 research is primary-source context, not endorsement.
  Not Independently Validated and not a universal external exactly-once claim.

Verifier and artifacts:
  state_dir_id.json, ProjectGrant.root_object_id,
  secret_sha256, SessionGuard, EffectiveTier and VERB_PROBE,
  binding.json, content-addressed blobs, sync_index.db,
  conversation_key/view_gen checkpoints, causal CTE results,
  room-wake-job-v3/binding_sha256/RequestPermit,
  srv_ wake_delivery receipts, sf_ native sessions,
  room-stop-reports phase-1/phase-2 and committed markers,
  acceptance_results, task_done, invariant_violation nodes.

Scope and claim ceiling:
  Kernel object identity and process containment are Windows reference mechanisms.
  Native host metadata is trusted only within each adapter's declared contract.
  Composition is read authority, never execution authority.
  Delivery is not reply; reply is not acceptance; acceptance is configured evidence.
  Exactly-once event resolution is not exactly-once external effect.
  No privileged host-admin bypass or universal adapter claim is made.

Next stage in the machine:
  Article 04 establishes live coordination and verified assignment.
  Article 05 enforces typed leases, monotonic generations, and kernel write
  exclusion at the actual mutation window. Expiry alone is not fencing.

Commercial doorway:
  Multi-Agent Coordination & Acceptance Audit Challenge — bring one
  assignment with uncertain delivery, ownership, or completion; receive
  a causal-readiness map, sealed-wake validation replay, and artifact-based
  acceptance demonstration (Article 09 · me@blayneaina.com).
```

## The Room Is Where Authority Becomes Current

A recognized act can be mathematically sound and still be operationally stale. The evidence may be valid, the partition correct, the destination plausible—and the worker may be reading an old frontier, holding a replaced registration, answering a superseded task, or exiting before it ever replied.

The Room closes that gap by making every stage re-establish its own predicates.

Territory is re-queried. Credentials are re-read. Conversation checkpoints are recomputed. Causal parents are walked. Wake permits are revalidated at launch and claim. Evidence is served to the recipient. Native replies are correlated. Cancellation is observed at the kernel. Acceptance is measured against live artifacts. Invariant violations remain visible.

That is why the Room is a coordination plane rather than a transcript.

> **Git tells you what history recorded. Chat tells you what was said. The Room tells you what may happen now—and what still has not been proven.**

Article 05 narrows the final coordination question into the mutation window itself: who holds the typed lease and current generation, and how does the operating system prevent a stale writer from crossing the write syscall?

## Frequently Asked Questions

### Why aren't Git worktrees enough for multi-agent coordination?

Worktrees separate source histories and defer conflict resolution to a later merge. They do not establish current resource ownership, causal observation, wake validity, native delivery, or artifact acceptance. Git remains valuable for source history; those additional properties need a live coordination plane.

### Why isn't a workflow checkpoint enough?

A checkpoint can resume a plan. It does not prove that the plan remains valid for the current actor, native conversation, registration, project, task ancestry, authority revision, or control epoch. The Room revalidates those conditions instead of treating resumability as standing.

### What makes a Room wake different from a prompt queue?

A wake is an 18-field permit bound to the recipient, task, evidence, Room authority, registration, control epoch, and original deadline. It is revalidated at dispatch and again inside the worker's split-lock claim. A queued prompt by itself carries none of that proof.

### Is delivery to an IDE session proof of completion?

No. Dispatch, body delivery, body visibility, wrong-body refusal, and reply are separate states. Process exit without a correlated reply is `process_exit_only` and leaves the obligation unresolved. Completion additionally requires privileged acceptance over actual artifacts and destination state.

### Why does `file_absent` use `try_exists()`?

Because an unreadable or inaccessible path is not proven absent. `try_exists()` returns an observation error, and the acceptance check fails closed with `observation: "unconfirmed"` rather than converting missing permission into a passing absence claim.

### Do the five invariants prove exactly-once external effects?

No. They constrain idempotency, lifecycle, exclusivity, causality, and resolution in the event system. A destination can still mutate before a receipt fails or crash occurs. That uncertainty must be observed and reconciled through the destination and recovery paths.

## Continue the Series

- **Series index:** [From Proposal to Consequence: The AINA Transition-Governance Series](https://blayneaina.com/series/from-proposal-to-consequence)
- **Previous:** [Article 03 — Semantic Switch and EISA: Protected Computation and Entity Resolution](https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/)
- **Next:** [Article 05 — Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion](https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/)
- **Deployment and independent review:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)

---

## Primary 2026 Sources

- [Liu et al. — *Multi-agent Collaboration with State Management (STORM)*, `arXiv:2605.20563`](https://arxiv.org/abs/2605.20563)
- [Sarkar — *Before the Pull Request: Mining Multi-Agent Coordination*, `arXiv:2606.19616`](https://arxiv.org/abs/2606.19616)
- [Nechepurenko and Shuvalov — *Coordination as an Architectural Layer for LLM-Based Multi-Agent Systems*, `arXiv:2605.03310`](https://arxiv.org/abs/2605.03310)
- [Model Context Protocol Specification `2026-07-28`](https://modelcontextprotocol.io/specification/2026-07-28)
- [Agent Client Protocol Documentation](https://agentclientprotocol.com)
- [Wang, Wang, and Wu — *The Unreliable Progress Bar*, `arXiv:2609.08589`](https://arxiv.org/abs/2609.08589)
- [Lyu et al. — *From Version Conflicts to Decision Conflicts: Selective Revalidation for Long-Running AI Agents*, `arXiv:2609.08015`](https://arxiv.org/abs/2609.08015)
- [Khan — *S-Bus: Automatic Read-Set Reconstruction for Multi-Agent LLM State Coordination*, `arXiv:2605.17076`](https://arxiv.org/abs/2605.17076)
- [SQLite Write-Ahead Logging Documentation](https://www.sqlite.org/wal.html)
- [Microsoft Win32 API Documentation](https://learn.microsoft.com/en-us/windows/win32/api/)

---

## Publication Metadata

**Title tag:** The Room: Why Git and Chat Are Not Coordination Planes  
**Meta description:** Why Git worktrees and chat transcripts cannot govern live agents: inside The Room's territory pins, causal sync gate, sealed wake permits, native-session proof, cancellation, and privileged acceptance.  
**Series navigation:** [Series index](https://blayneaina.com/series/from-proposal-to-consequence) · Article 04 of *From Proposal to Consequence: The AINA Transition-Governance Series*.  
**Previous installment:** [Article 03 — Semantic Switch and EISA: Protected Computation and Entity Resolution](https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/).  
**Next installment:** [Article 05 — Expiry Is Not Fencing: Typed Leases and Kernel Write Exclusion](https://blayneaina.com/architecture/expiry-is-not-fencing-typed-leases/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/architecture/the-room-coordination-plane/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/architecture/the-room-coordination-plane/"
      },
      "headline": "The Room: Why Git and Chat Are Not Coordination Planes",
      "alternativeHeadline": "How Causal Sync Gates, Sealed Wake Permits, Native-Session Proof, and Privileged Acceptance Govern Multi-Agent Authority",
      "description": "Why Git worktrees and chat transcripts cannot govern live agents: inside The Room's territory pins, causal sync gate, sealed wake permits, native-session proof, cancellation, and privileged acceptance.",
      "proficiencyLevel": "Expert",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T11:00:00-06:00",
      "dateModified": "2026-10-31T11:50:00-06:00",
      "position": 4,
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
        { "@type": "Thing", "name": "Multi-Agent Coordination Planes" },
        { "@type": "Thing", "name": "Causal Consistency and Pre-Action Work Gates" },
        { "@type": "Thing", "name": "Cryptographically Sealed Wake Permits" },
        { "@type": "Thing", "name": "Native IDE Session Routing" },
        { "@type": "Thing", "name": "Privileged Task Acceptance Verification" },
        { "@type": "Thing", "name": "Runtime State-Machine Invariants" }
      ],
      "citation": [
        "https://arxiv.org/abs/2605.20563",
        "https://arxiv.org/abs/2606.19616",
        "https://arxiv.org/abs/2605.03310",
        "https://modelcontextprotocol.io/specification/2026-07-28",
        "https://agentclientprotocol.com",
        "https://arxiv.org/abs/2609.08589",
        "https://arxiv.org/abs/2609.08015",
        "https://arxiv.org/abs/2605.17076",
        "https://www.sqlite.org/wal.html",
        "https://learn.microsoft.com/en-us/windows/win32/api/"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/architecture/the-room-coordination-plane/#breadcrumb",
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
          "name": "The Room: Why Git and Chat Are Not Coordination Planes",
          "item": "https://blayneaina.com/architecture/the-room-coordination-plane/"
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
  "@id": "https://blayneaina.com/architecture/the-room-coordination-plane/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why aren't Git worktrees enough for multi-agent coordination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Worktrees separate source histories and defer conflict resolution to a later merge. They do not establish current resource ownership, causal observation, wake validity, native delivery, or artifact acceptance. Git remains valuable for source history; those additional properties need a live coordination plane."
      }
    },
    {
      "@type": "Question",
      "name": "Why isn't a workflow checkpoint enough?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A checkpoint can resume a plan. It does not prove that the plan remains valid for the current actor, native conversation, registration, project, task ancestry, authority revision, or control epoch. The Room revalidates those conditions instead of treating resumability as standing."
      }
    },
    {
      "@type": "Question",
      "name": "What makes a Room wake different from a prompt queue?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A wake is an 18-field permit bound to the recipient, task, evidence, Room authority, registration, control epoch, and original deadline. It is revalidated at dispatch and again inside the worker's split-lock claim. A queued prompt by itself carries none of that proof."
      }
    },
    {
      "@type": "Question",
      "name": "Is delivery to an IDE session proof of completion?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Dispatch, body delivery, body visibility, wrong-body refusal, and reply are separate states. Process exit without a correlated reply is `process_exit_only` and leaves the obligation unresolved. Completion additionally requires privileged acceptance over actual artifacts and destination state."
      }
    },
    {
      "@type": "Question",
      "name": "Why does `file_absent` use `try_exists()`?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because an unreadable or inaccessible path is not proven absent. `try_exists()` returns an observation error, and the acceptance check fails closed with `observation: \"unconfirmed\"` rather than converting missing permission into a passing absence claim."
      }
    },
    {
      "@type": "Question",
      "name": "Do the five invariants prove exactly-once external effects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. They constrain idempotency, lifecycle, exclusivity, causality, and resolution in the event system. A destination can still mutate before a receipt fails or crash occurs. That uncertainty must be observed and reconciled through the destination and recovery paths."
      }
    }
  ]
}
</script>
