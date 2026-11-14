# AINA (Autonomous Intelligent Networked Architecture) — Deterministic Execution Governance for AI Agents

**By Blayne Aina · Principal Systems Architect & Creator of AINA**

**[1-Page AI Master Brief (`/ai-brief/`)](https://blayneaina.com/ai-brief/)** · **[Plain-Text 1-Call Brief (`/ai-brief.txt`)](https://blayneaina.com/ai-brief.txt)** · [Live architecture and nine-part series](https://blayneaina.com/) · **[Complete 9-Article & 43-Chunk Directory (`/articles/`)](https://blayneaina.com/articles/)** · **[AINA Research & Assurance Landing Page (`/research-assurance/`)](https://blayneaina.com/research-assurance/)** · [Refusal proof pack (`/refusal-proof/`)](https://blayneaina.com/refusal-proof/) · [Semantic Switch proof (`/semantic-switch-proof/`)](https://blayneaina.com/semantic-switch-proof/) · [AI Orientation (`llms.txt`)](https://blayneaina.com/llms.txt) · [HTML Sitemap (`/sitemap/`)](https://blayneaina.com/sitemap/) · **Contact:** [me@blayneaina.com](mailto:me@blayneaina.com)

## Purpose of this site — independent peer review, technical verification & research due diligence

**Who I am and why this specification is public:** I am a Principal Systems & Data Integrations Architect with 11+ years of hands-on enterprise delivery across CRM architecture, multi-business data migrations, and production cutovers, and a U.S. Marine Corps Veteran. Over a 14-month independent R&D sprint (August 2025 – October 2026), I architected **AINA (Autonomous Intelligent Networked Architecture—and my surname)** on a single Windows workstation—directing a coordinated 9-IDE AI fleet to build a deterministic execution-governance runtime (`squad.exe`) that stops AI agents from making unauthorized, stale, or unverified changes to external state. **This site and repository exist so systems engineers, security and formal-verification researchers, and research / R&D funding evaluators can independently peer-review the architecture, run the zero-dependency offline verifier, inspect the closed JSON schemas, and evaluate the full body of work.**

**Canonical Architecture Definition:**
> **AINA is a deterministic authority-enforcement architecture that treats probabilistic AI outputs as untrusted proposals. It independently validates evidence, authorization, execution identity, and permitted state transitions at the boundary where external effects are committed, producing independently verifiable evidence when an attempted operation is refused.**

**How researchers, funding evaluators, and systems engineers should use this site:**

- **Research & R&D funding evaluator · dedicated assurance binder:** Open the **[AINA Research & Assurance Landing Page (`https://blayneaina.com/research-assurance/`)](https://blayneaina.com/research-assurance/)** for a single-page breakdown of (1) the specific security problem, (2) the `A2E` architecture and three enforcement layers, (3) existing baseline vs. proposed capabilities, (4) publicly reproducible evidence and claim ceilings, (5) the independent research programme (`PRJ-TW-01`, `PRJ-LC-01`, `PRJ-CG-02`, `PRJ-TAIF-01`, `PRJ-NAVY-01`), (6) open-source deliverables, and (7) background-IP vs. licensing boundaries; or review [§09 — Bring One Real Boundary: Peer Review & R&D Evaluation (`https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/`)](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/).
- **Principal architect or systems engineer · deep read:** Inspect the [Offline Refusal Proof (`https://blayneaina.com/refusal-proof/`)](https://blayneaina.com/refusal-proof/), run this repository's zero-dependency verifier in 10 seconds (`python3 proof/verify_refusal_proof.py`), and read §01–§08 for the kernel and state-machine invariants.
- **AI safety, formal verification & cybersecurity researcher · schema & confinement audit:** Jump directly to [Three-Layer Enforcement, Seven Closed Opcodes & The 3-Provisional A2E Architecture](#formal-confinement) below, inspect [`proof/schemas/squad.eisa.act_envelope.v1.json`](proof/schemas/squad.eisa.act_envelope.v1.json) and [`proof/verify_refusal_proof.py`](proof/verify_refusal_proof.py), and examine how [Semantic Switch Proof (`https://blayneaina.com/semantic-switch-proof/`)](https://blayneaina.com/semantic-switch-proof/) preserves relational structure on synthetic test vectors upstream of external models.

### Complete Nine-Article Specification, Structured Briefs & Modular Parts

Every installment (`§01`–`§09`) is published as both a **Full Monograph Page** and exact `H2` section-boundary parts (`part-1`..`part-N`, **43 modular segments total**), alongside compact technical briefs and plain-text mirrors:

- **Single-Request Technical Briefs & Plain-Text Formats:**
  - **1-Page Complete Series Master Brief (§01–§09 + Proofs + TCB + Patents + `PRJ-*`):** [https://blayneaina.com/ai-brief/](https://blayneaina.com/ai-brief/) · Plain-Text Brief (`<=48` lines): [https://blayneaina.com/ai-brief.txt](https://blayneaina.com/ai-brief.txt)
  - **1-Call Per-Article Technical Briefs (`<=44` lines each):** [`/01/brief/`](https://blayneaina.com/01/brief/) through [`/09/brief/`](https://blayneaina.com/09/brief/) (Plain-text `.txt`: `/01/brief.txt`..`/09/brief.txt`)
  - **Raw Verbatim Markdown (`text/plain; charset=utf-8`):** [`/01.md`](https://blayneaina.com/01.md) through [`/09.md`](https://blayneaina.com/09.md)
- **Fast 3-Step Full-Series Technical Digests (Read All 9 Articles' Claims, Tables & Section Summaries in 3 Calls):**
  1. **Digest 1 (`§01–§03` — Stage Zero, Server-Cut Evidence & `EISA` Verdict Machine):** [https://blayneaina.com/articles/digest-1/](https://blayneaina.com/articles/digest-1/)
  2. **Digest 2 (`§04–§06` — The Room, Typed Leases / Write Exclusion & Dual-Tier Vaults):** [https://blayneaina.com/articles/digest-2/](https://blayneaina.com/articles/digest-2/)
  3. **Digest 3 (`§07–§09` — Act-Pinning, Sovereign Kill-Switch / 45-Case Gate & Peer Review Scope):** [https://blayneaina.com/articles/digest-3/](https://blayneaina.com/articles/digest-3/)
- **Master Directories & Plain-Text Indexes:**
  - **Complete 9-Article & 43-Chunk HTML Directory:** [https://blayneaina.com/articles/](https://blayneaina.com/articles/)
  - **Plain-Text AI Orientation & Chunk Index (`text/plain`):** [https://blayneaina.com/llms.txt](https://blayneaina.com/llms.txt)
  - **Complete 9-Article Plain-Text Corpus (`text/plain`):** [https://blayneaina.com/llms-full.txt](https://blayneaina.com/llms-full.txt)
  - **HTML & Plain-Text Sitemaps:** [https://blayneaina.com/sitemap/](https://blayneaina.com/sitemap/) · [https://blayneaina.com/sitemap.txt](https://blayneaina.com/sitemap.txt) · [https://blayneaina.com/sitemap.xml](https://blayneaina.com/sitemap.xml)

| § | Article Title | Canonical Full Monograph URL | Lossless Multi-Part Chunks (`part-1` .. `part-N` — 100% Zero-Loss Split) |
| :--- | :--- | :--- | :--- |
| **§01** | **An AI Output Is Not an Act: Why Enterprise Governance Fails Before Stage Zero** | [https://blayneaina.com/01-an-ai-output-is-not-an-act/](https://blayneaina.com/01-an-ai-output-is-not-an-act/) | **6 Parts:** [Part 1](https://blayneaina.com/01-an-ai-output-is-not-an-act/part-1/) · [Part 2](https://blayneaina.com/01-an-ai-output-is-not-an-act/part-2/) · [Part 3](https://blayneaina.com/01-an-ai-output-is-not-an-act/part-3/) · [Part 4](https://blayneaina.com/01-an-ai-output-is-not-an-act/part-4/) · [Part 5](https://blayneaina.com/01-an-ai-output-is-not-an-act/part-5/) · [Part 6](https://blayneaina.com/01-an-ai-output-is-not-an-act/part-6/) |
| **§02** | **Zero-Trust Document Ingestion: Server-Cut Evidence vs. Model Citations** | [https://blayneaina.com/02-zero-trust-document-ingestion-and-server-cut-evidence/](https://blayneaina.com/02-zero-trust-document-ingestion-and-server-cut-evidence/) | **4 Parts:** [Part 1](https://blayneaina.com/02-zero-trust-document-ingestion-and-server-cut-evidence/part-1/) · [Part 2](https://blayneaina.com/02-zero-trust-document-ingestion-and-server-cut-evidence/part-2/) · [Part 3](https://blayneaina.com/02-zero-trust-document-ingestion-and-server-cut-evidence/part-3/) · [Part 4](https://blayneaina.com/02-zero-trust-document-ingestion-and-server-cut-evidence/part-4/) |
| **§03** | **EISA: A Four-Gate Verdict Machine for High-Consequence Entity Resolution** | [https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/](https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/) | **6 Parts:** [Part 1](https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/part-1/) · [Part 2](https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/part-2/) · [Part 3](https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/part-3/) · [Part 4](https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/part-4/) · [Part 5](https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/part-5/) · [Part 6](https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/part-6/) |
| **§04** | **The Room: Why Git and Chat Are Not Coordination Planes** | [https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/](https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/) | **5 Parts:** [Part 1](https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/part-1/) · [Part 2](https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/part-2/) · [Part 3](https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/part-3/) · [Part 4](https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/part-4/) · [Part 5](https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/part-5/) |
| **§05** | **Expiry Is Not Fencing: Typed Leases and Kernel-Enforced Write Exclusion** | [https://blayneaina.com/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/](https://blayneaina.com/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/) | **4 Parts:** [Part 1](https://blayneaina.com/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/part-1/) · [Part 2](https://blayneaina.com/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/part-2/) · [Part 3](https://blayneaina.com/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/part-3/) · [Part 4](https://blayneaina.com/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/part-4/) |
| **§06** | **Rollback Is Not Erasure: Dual-Tier Vaults and Ungated Quarantine** | [https://blayneaina.com/06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/](https://blayneaina.com/06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/) | **3 Parts:** [Part 1](https://blayneaina.com/06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/part-1/) · [Part 2](https://blayneaina.com/06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/part-2/) · [Part 3](https://blayneaina.com/06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/part-3/) |
| **§07** | **Defeating Approval Laundering: Act-Pinning Across Process Spawn and Successor Grants** | [https://blayneaina.com/07-defeating-approval-laundering-act-pinning-and-successor-grants/](https://blayneaina.com/07-defeating-approval-laundering-act-pinning-and-successor-grants/) | **3 Parts:** [Part 1](https://blayneaina.com/07-defeating-approval-laundering-act-pinning-and-successor-grants/part-1/) · [Part 2](https://blayneaina.com/07-defeating-approval-laundering-act-pinning-and-successor-grants/part-2/) · [Part 3](https://blayneaina.com/07-defeating-approval-laundering-act-pinning-and-successor-grants/part-3/) |
| **§08** | **The Sovereign Kill-Switch: Break-Glass Epochs and the 45-Case Conformance Gate** | [https://blayneaina.com/08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/](https://blayneaina.com/08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/) | **4 Parts:** [Part 1](https://blayneaina.com/08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/part-1/) · [Part 2](https://blayneaina.com/08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/part-2/) · [Part 3](https://blayneaina.com/08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/part-3/) · [Part 4](https://blayneaina.com/08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/part-4/) |
| **§09** | **Bring One Real Boundary: Peer Review, Independent Verification & R&D Collaboration** | [https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/) | **8 Parts:** [Part 1](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-1/) · [Part 2](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-2/) · [Part 3](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-3/) · [Part 4](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-4/) · [Part 5](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-5/) · [Part 6](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-6/) · [Part 7](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-7/) · [Part 8](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/part-8/) |

### Principal Investigator & Enterprise Systems Engineering Track Record · 2015–2026

| Period | Organization / Engagement | Role & Core Enterprise Scope | Verifiable Production Outcome |
| :--- | :--- | :--- | :--- |
| 2025–2026 (14 Mos) | **AINA Architecture** — Independent R&D | Principal Systems Architect — Unfunded Solo · 9-IDE AI Fleet | Built deterministic AI execution-governance runtime (`squad.exe`), 45/45 binary conformance gate, and public SHA-256 refusal verifier. |
| 2022–2025 | **Agile Education Marketing** | Enterprise CRM & Integration Architect | Re-architected HubSpot/Salesforce integration boundaries, automated identity deduplication, and hardened lifecycle ETL pipelines. |
| 2019–2022 | **DrayMaster Enterprise** | Lead Systems & Data Migration Architect | Directed production data migration and rate-engine cutovers across 7 business entities and 800+ freight carriers. |
| Selected Advisory | **Photector** | Workflow & State-Machine Systems Advisor | Designed deterministic workflow state transitions and automated intake validation boundaries. |
| 2015–2018 | **Jacuzzi Colorado** | Multi-Location Systems & Operations Lead | Led 6-location infrastructure cutover, POS/ERP inventory synchronization across 15,000+ SKUs, and operator launch readiness. |

### Scope & diligence reality check

- **Why Windows NT first (and not every OS on earth)?** I am an independent solo systems architect, not a 40-person venture-backed platform team. Proving real kernel-enforced process suspension (`CreateProcessW(CREATE_SUSPENDED)`), handle-table inspection (`PssCaptureSnapshot`), and share-mode write exclusion on one unforgiving OS substrate proves the engineering methodology. Under §09, no target OS is claimed without its own full 45-case conformance battery—porting the reference monitor and automated OS debloating/hardening workflow to Linux (`PRJ-NAVY-01`, where `clone3`/`pidfd_open` is paired with a pre-execution synchronization barrier and `/proc/<pid>/fd`, `/proc/<pid>/maps`, and `F_SEAL_WRITE`-sealed `memfd` executable verification prior to `Landlock` LSM, `seccomp-bpf`, and `fexecve`) is a scoped foreground engineering track rather than an unverified portability claim.
- **Why is `squad.exe` private while the verification harness is public?** To protect 14 months of core R&D and three filed USPTO provisional patent applications, the proprietary Rust source code and `squad.exe` binary are held in a private engineering repository. The complete verification layer—refusal receipts, pre/post SHA-256 state digests, 12 closed JSON schemas, and a zero-dependency Python verifier (`proof/verify_refusal_proof.py`)—is public and runnable offline in 10 seconds, while the live Rust workspace and `squad.exe` binary are demonstrated live during technical peer review and R&D due diligence or shared under mutual NDA. TypeScript is used only as minimal glue; the public JavaScript and Python files are website-build and verification tooling, not the runtime implementation.
- **Why does the public GitHub repository show 1 Commit?** `github.com/SquadForge/blayne.aina` is a sanitized v1.0 public release snapshot of the specification and offline verification bundle. The 14-month commit history, bounded slice-decomposition logs, and Rust crates reside in private engineering repositories and are walked through live during technical peer review and grant/R&D due diligence.
- **How do the 45 conformance cases relate to the 47 EISA fault classes (§03)?** The 45 binary conformance cases test end-to-end execution boundaries, where several cases exercise compound fault classes simultaneously, while isolated fault-class primitives are enforced at the crate unit-test layer.

<a id="formal-confinement"></a>
### Three-Layer Enforcement, Seven Closed Opcodes & The 3-Provisional A2E Architecture

AINA deliberately does not rely on proving the general internal safety or alignment of an opaque neural network. Instead, it restricts which externally observable operations can be authorized and independently checks the admissibility conditions for those operations inside a minimal, deterministic Trusted Computing Base (TCB).

#### 1. The Seven Closed `EISA` Opcodes (§03.2 & `squad.eisa.act_envelope.v1.json`)

Every proposed transition in `EISA` must use one of **seven closed opcodes** across four acyclic layers, with each opcode bound to its admitted stage (`Fracture` or `Forge`) and its closed operand schema in [`proof/schemas/squad.eisa.act_envelope.v1.json`](proof/schemas/squad.eisa.act_envelope.v1.json):

| Layer | Opcode | Admitted Stage | Exact Required Operand Keys | Constitutional Role (§03.2) |
| ---: | :--- | :--- | :--- | :--- |
| `0` | **`BindEvidenceTag`** | `Fracture` | `id`, `tag`, `coordinates` | Compare values at two distinct sealed-record RFC 6901 coordinates using one of the 15 non-inferential tags (`PHONE_STRONG` .. `REGIONAL_VARIATION`). |
| `0` | **`RequestHumanReview`** | `Fracture` | `id`, `reason`, `members` | Emit lawful non-operative review matter (`INSUFFICIENT_EVIDENCE`, `CONFLICTING_EVIDENCE`, `SOURCE_DEFECT`, or `OUT_OF_PROFILE`) over `1..1000` sealed records. |
| `0` | **`RejectUnlawfulAct`** | `Fracture` | `id`, `rejected`, `fault` | Preserve anti-knowledge rejecting a 64-hex digest under one of the 47 registered fault codes (`act_not_object` .. `relation_indeterminate`). |
| `0` | **`AssertLayoutRelation`** | `Forge` | `id`, `relation`, `connector`, `from`, `to` | Prove `CONNECTS` over three sealed whole-node `ev_` layout citations. |
| `1` | **`AssertDuplicatePair`** | `Fracture` | `id`, `pair`, `support`, `counter` | Link two records using admitted positive bindings and every admitted counter binding on that pair (`counterevidence_suppressed` if omitted). |
| `2` | **`AssertTransitiveClosure`** | `Fracture` | `id`, `pair`, `chain` | Compose `2..4` (`MAX_CHAIN = 4`) admitted duplicate links into a cycle-free simple path. |
| `3` | **`ProposePartition`** | `Fracture` | `id`, `groups`, `support` | Cover every sealed record exactly once with connected, non-contradicted groups verified via Disjoint-Set Union-Find. |

#### 2. Three Explicit Enforcement Layers for Serialization, Schema & Transition Bounds

Because custom JSON Schema annotations (`x_profile_bounds` and `x_serialization_bounds`) document system limits that a standard Draft-07 schema validator does not enforce by itself, AINA separates bound enforcement into **three distinct, testable layers**:

| Enforcement Layer | Where Enforced | Specific Bounds & Invariants Enforced | Verification in Public Proof Pack (`proof/verify_refusal_proof.py`) |
| :--- | :--- | :--- | :--- |
| **Layer 1: Pre-Parse & Deserializer Boundary** | Stream reader & custom `serde_json` visitor (§03.1) prior to AST allocation; replicated in `verify_refusal_proof.py` (`strict_json_loads` & `enforce_eisa_submission_preparse`). | • `MAX_SUBMISSION_BYTES = 1,048,576` (1 MiB)<br>• `MAX_REQUESTED_ACT_BYTES = 65,536`<br>• `MAX_EVIDENCE_REF_BYTES = 4,096`<br>• `MAX_ACTS = 256` (`1..256` acts per submission)<br>• Single-stage homogeneity (`Fracture` vs. `Forge`, never mixed)<br>• Duplicate JSON key rejection (`visit_map`), non-finite number rejection (`visit_f64`), and trailing matter rejection (`de.end()`). | Exercised via explicit negative pre-parse tests in `verify_refusal_proof.py` (rejecting duplicate JSON keys, oversized byte payloads, empty arrays, and mixed `Fracture`/`Forge` submissions). |
| **Layer 2: Draft-07 JSON Schema & Structural Envelope Validation** | [`proof/schemas/*.json`](proof/schemas/) (all 12 schemas) & recursive Draft-07 validator in `verify_refusal_proof.py` (`validate_draft07`). | • Closed 10-key `EISA` envelope (`additionalProperties: false` recursively across all 12 schemas)<br>• Closed 7-opcode `enum` + `allOf` opcode-to-stage-to-operands binding<br>• Integer-only `confidence` basis points (`0 <= bps <= 10000` in `{"bps": int}`, `{}`, or `null` — zero floats)<br>• `MAX_POINTER_DEPTH = 8` & `MAX_POINTER_BYTES = 256` enforced directly via RFC 6901 regex `^(?:/(?:[^/~\u0000-\u001f]\|~[01])*){1,8}$` (`minLength: 2`, `maxLength: 256`)<br>• `MAX_REASON_CHARS = 1,024`, `MAX_ID_CHARS = 64`, `MAX_REFS = 16`, `MAX_LIST = 1,000`, `MAX_CHAIN = 4`<br>• 15-tag `DirectEvidenceTag` enum & 47-code `RegisteredFaultCode` enum. | Exercised via `18/18` positive and `22/22` negative Draft-07 schema tests across all 12 schemas and all 7 opcodes in `verify_refusal_proof.py`. |
| **Layer 3: Runtime Four-Gate Verdict Machine & OS Kernel Confinement** | Stateful `EISA` recognizer (§03.4–03.5) and Windows NT supervisor (`squad.exe`). | • `MAX_CASE_BYTES = 4,194,304` (4 MiB) & `MAX_CASE_RECORDS = 1,000` (`seal_file`)<br>• `MAX_VALUE_CHARS = 1,024` & `MIN_PHONE_DIGITS = 7` (12 comparators)<br>• `pointer::resolve` against sealed `eisacase_<32hex>` records<br>• Acyclic Layer `0 -> 3` DAG dependency check, `counterevidence_suppressed` scan, simple-path walk, and Disjoint-Set Union-Find partition cover<br>• `CreateProcessW(CREATE_SUSPENDED)` + `PssCaptureSnapshot` (`act-pin`), `FILE_SHARE_READ` write exclusion, and SQLite row-version checks. | Attested across the `45/45` conformance battery (`conformance_45_manifest.json`), `20/20` evidence battery (`evidence_20_manifest.json`), and `4` `PCNA` refusal records (`proof/refusal/`). |

#### 3. Complete Verbatim USPTO 3-Provisional Patent Estate (Filed April–May 2026)

The public Windows NT reference runtime (`squad.exe`) and 45-case conformance suite represent the **Tier 1 / Tier 2 reference implementation** of three solo-authored U.S. Provisional Patent Applications filed in April–May 2026 by Blayne Manuia Aina (**6–7 months prior to the initial November 2026 public web specification and repository release**, preserving full U.S. and international PCT priority under 35 U.S.C. § 119(e)):

1. **U.S. Provisional #1 (USPTO Serial No. `63/996,553` — Filed April 12, 2026; 12-Month Non-Provisional / PCT Deadline: April 12, 2027):** *Autonomous Intelligent Network Architecture Protocol; Systems, Methods, and Computing Architectures for Constitutionally Governed Machine Action, Machine Participation, Machine Encounter, Machine Execution, and Machine Finality Across Multi-Stage Verifiable State-Formation, State-Extraction, and Temporal Defense*.
2. **U.S. Provisional #2 (USPTO Serial No. `64/004,193` — Single Omnibus Application, Parts 2A & 2B — Filed May 2, 2026; 12-Month Non-Provisional / PCT Deadline: May 3, 2027):**
   - **Part 2A:** *AINA Semantic Switch and MX2MX; Systems, Methods, and Computing Architectures for Constitutionally Created Machine Domains, Typed Correspondence Governance, Protected Cross-Boundary Admissibility, Consequence-Bearing Re-Binding, and Monotonic Burden Accumulation Under an Effective Constitutional Envelope*.
   - **Part 2B:** *AINA Topological Physics Pipeline; Systems, Methods, and Machine Architectures for Candidate-Universe Sealing, Asymmetrical Topology Adjudication, Claim-Graph Canonical Extraction, Reversible Patch-Plan Materialization, Baseline-State Defense, and Instruction-Bundle Constraints Under Stage-Local Constitutional Governance*.
3. **U.S. Provisional #3 (USPTO Serial No. `64/027,093` — Filed May 15, 2026; 12-Month Non-Provisional / PCT Deadline: May 17, 2027):** *AINA Authority-to-Effect (A2E) Governance: Layer-Zero Constitutional Transduction of Machine-Computed Authority into Consequence-Bearing Actuation Under an Effective Constitutional Envelope*.

<a id="primitives-map"></a>
#### 4. Mapping AINA Architecture Terms to Recognizable Systems-Security Primitives

| AINA Architectural Term | Classical Computer-Security / Systems Primitive | Concrete Implementation in the Windows NT Reference Runtime (`squad.exe`) |
| :--- | :--- | :--- |
| **Stage Zero / Authority-to-Effect (`A2E`)** | **Reference Monitor / Capability Gate** (*Anderson, 1972*) | Decouples untrusted LLM proposal generation from privileged OS process creation and database commit authority. |
| **`EISA` (Evidence Instruction Set Architecture)** | **Finite-State Automaton / Loop-Free Transition Recognizer** | Strictly bounded, acyclic 10-key transition envelope (`squad.eisa.act_envelope.v1.json`) with 7 closed opcodes, integer basis-point confidence (`0..10000`), and zero dynamic code generation. |
| **Server-Cut Evidence (`srv_` / `ev_`) (§02)** | **Cryptographic Content-Addressed Provenance** | Controller-computed SHA-256 digests and exact byte-span selectors (`squad.evidence_ref.v1.json`) verified prior to transition admission. |
| **Act-Pinning Across Process Spawn (§07)** | **TOCTOU Prevention via Suspended Process Inspection** | Spawns worker via `CreateProcessW(CREATE_SUSPENDED)`, inspects process memory and handles via `PssCaptureSnapshot`, and verifies digest match against `RequestedAct` before calling `ResumeThread`. |
| **Typed Leases & Generation Fencing (§05)** | **Monotonic Fencing Tokens** (*Kleppmann, 2016*) **+ Kernel Lock Exclusion** | Combines monotonically increasing integer lease generations with Win32 file-share exclusion (`FILE_SHARE_READ`) and SQLite row-version checks (`WHERE version = expected_v`). |
| **Amber Quarantine Vault (§06)** | **Non-Destructive Intrusion Forensics / Append-Only Quarantine** | Preserves rejected or out-of-bounds agent payloads in an unindexed quarantine store rather than erasing forensic evidence during rollback. |
| **Proof-Carrying Non-Action (`PCNA`)** | **Tamper-Evident Negative Audit Receipt** | Canonical JSON refusal receipt binding the failed gate code to matching pre-attempt and post-refusal destination SHA-256 digests (`proof/verify_refusal_proof.py`). |
| **Semantic Switch & `AKO` (§03 / Prov. #2A)** | **Lampson Confinement (`1973`) + Structure-Preserving Pseudonymization** | Projects synthetic entity graphs into Relation IDs (`RIDs`) upstream of external model calls while preserving equivalence and edit-distance relations (`20/20` blocks, `23/23` relations). |

<a id="research-programme"></a>
#### 5. Independent Research & Assurance Programme (`PRJ-*` Non-Overlapping Work Packages)

The table below separates **completed, self-funded baseline R&D (completed prior to November 2026)** from **five non-overlapping foreground research and engineering tracks** detailed on the [AINA Research & Assurance Landing Page](https://blayneaina.com/research-assurance/):

| Work Package Code | Focus Area | Completed Baseline (Built & Inspectable Today) | Proposed Foreground Research & Engineering Scope |
| :--- | :--- | :--- | :--- |
| **`PRJ-TW-01`**<br>Assurance Initiative | **Institutional Launch & Cross-Framework `A2E` Standard** | Solo-architected Windows NT reference monitor (`squad.exe`), 9-part specification, and public verification bundle. | Establish the independent public-benefit **AINA Assurance Initiative**, hire dedicated kernel/security and AI-control engineers (`2.5 FTE`), commission two external lab audits, and publish cross-framework `A2E` adapters. |
| **`PRJ-LC-01`**<br>Open Verifier & Audit | **Open-Source `eisa-core` / `pcna-verifier`, `Authenticated PCNA v2` & Audit** | Zero-dependency offline bundle verifier (`proof/verify_refusal_proof.py`), 12 closed JSON schemas, and 4 `PCNA` refusal records. | Package standalone open-source `eisa-core` and `pcna-verifier` libraries, implement **Authenticated `PCNA` v2** (Ed25519 / TPM 2.0 asymmetric receipt signing), and commission an unedited third-party security assessment. |
| **`PRJ-CG-02`**<br>Empirical AI Control | **250-Case Multi-Model AI-Control Benchmark** | 45-case conformance & 20-case server-cut evidence suite in isolated Windows NT fixtures. | Execute a controlled **250-case multi-model empirical benchmark** across 4 frontier model families comparing (1) OS permissions, (2) LLM-as-judge monitors, and (3) deterministic `A2E` enforcement (`consensusIdentity`, `srv_`/`ev_`, `act-pin`). |
| **`PRJ-TAIF-01`**<br>Formal Semantics | **Lean 4 `EISA` Mechanization & Crash-Recovery Benchmark** | Closed 7-opcode `EISA` JSON schema, 6 finiteness bounds, 47 registered fault codes, and `result_read_only` successor-grant spec (§07). | Mechanize the 7-opcode `EISA` operational semantics in **Lean 4 (`eisa-lean4`)** to machine-check bounded-step termination and verdict uniqueness, plus a 10,000-trial mid-commit crash-injection benchmark for `result_read_only` successor grants. |
| **`PRJ-NAVY-01`**<br>Linux OS Hardening | **Automated Linux Debloating, Hardening & Pre-Execution Barrier (`AINA-LinuxHardener`)** | Windows NT `CreateProcessW(CREATE_SUSPENDED)` + `PssCaptureSnapshot` pre-resume confinement and `EISA`/`PCNA` gating. | Build and demonstrate **`AINA-LinuxHardener`** on **Rocky Linux 9 / RHEL 9 + containerized ROS 2 Humble**: automated RPM/ELF/module inventory & debloating, `Landlock`/`seccomp-bpf` synthesis, **Linux Pre-Execution Authorization Barrier** (`clone3`/`pidfd_open` + synchronization barrier + `/proc/<pid>/fd`, `/proc/<pid>/maps`, and `F_SEAL_WRITE`-sealed `memfd` verification prior to `fexecve`), deterministic ROS 2 regression testing, and scoped `PCNA` receipts. |

*Note on IP, Open Standards & R&D Collaboration:* All background IP across the April–May 2026 three-provisional patent estate is 100% solo-authored and owned by Blayne Aina with zero third-party encumbrances. Public-interest foreground research outputs—including the `EISA`, `RequestedAct`, and `PCNA` JSON schemas, `eisa-core`/`pcna-verifier`, `eisa-lean4` proofs, and empirical benchmark datasets—are structured for open-source release (Apache 2.0 / MIT) ([me@blayneaina.com](mailto:me@blayneaina.com)).

This repository publishes the public verification layer: real refusal receipts, unchanged-destination fixtures, declaration-only schemas, a fresh 45-case conformance manifest, and a zero-dependency offline verifier. It does not publish the proprietary `squad.exe` binary or `squad-connector` engine source.

## Quick-start offline verification

Clone the repository and run the verifier with Python 3:

```bash
git clone https://github.com/SquadForge/blayne.aina.git
cd blayne.aina
python3 proof/verify_refusal_proof.py
```

On Windows, use `python` if `python3` is not available. No packages, network connection, candidate binary, or `squad.exe` installation is required.

Expected output includes:

```text
PASS: evidence_bad_selector_refused (bf15f8633e85350430adf1bbc47a47154965d3a7f28e4ebad25d6a39ecaa2f8c)
PASS: native_write_without_lease_refused (2d27fbdf4e8ca207afbfa388ca9172fbcc6c70e534af2476b3b704f87debadcf)
PASS: wrong_value (362088a107369e634cdc9c6c520fbca3e2393722860720d3aa2c2eb11b47d719)
PASS: stale_generation_refused (reason-only; absent preimage)
PASS: conformance 45/45; evidence 20/20; candidate 94d26802c3744182a6cb93ac4e47250c6140b6ff92e0902a7c415ab13e59f4b5
PASS: 12 public-safe schema declarations (recursive additionalProperties closure verified; 18/18 positive & 26/26 negative Draft-07 + pre-parse bound tests passed)
PASS: 39 files match SHA256SUMS.txt
PASS: no local paths or private key material detected
```

**Exact Scope of Verification Output:**
- **Checksum Manifest Integrity (`39/39` files):** Verifies that all 39 published files in `proof/` match their recorded SHA-256 digests in `proof/SHA256SUMS.txt`.
- **Refusal Fixture Invariance (`4/4` refusal records):** Recomputes the SHA-256 digests and exact byte lengths of the 3 static fixtures (`er-repeat.txt`, `ungated.txt`, `contacts.db`) to verify `pre_attempt.sha256 == post_refusal.sha256 == actual_fixture_sha256`, and checks the absent-preimage `stale-generation.json` receipt.
- **Draft-07 Schema & Pre-Parse Bound Validation Suite (`12/12` schemas; `18/18` positive & `26/26` negative tests):** Recursively verifies that every object declaration across all 12 schemas has an explicit `additionalProperties` policy, validates the published 45-case and 20-case manifests against `squad.conformance.manifest.v1.json`, and executes 18 valid and 26 invalid test vectors exercising all 12 schemas, all 7 `EISA` opcodes, RFC 6901 pointer depth (`MAX_POINTER_DEPTH = 8`), integer basis-point bounds, duplicate JSON key rejection, and pre-parse byte ceilings.
- **What Requires Live Runtime Evaluation or `Authenticated PCNA v2`:** This script is an offline evidence-bundle and schema verifier; it does not execute the private `squad.exe` binary or verify hardware-rooted asymmetric signatures on receipts (`Authenticated PCNA v2`, scoped under `PRJ-LC-01`).

For a one-command download instead, see [one_line_verify_commands.md](proof/one_line_verify_commands.md) or download [aina-refusal-proof-pack-v1.zip](proof/aina-refusal-proof-pack-v1.zip).

## The recursive proof-of-work

AINA is both a deterministic execution-governance architecture and a demonstration of the AI-native engineering method used to build it. Over 14 months, Blayne directed a vendor-agnostic fleet of **9 concurrent AI IDE lanes** under the runtime's own confinement and verification rules:

1. The human architect holds problem selection, system invariants, and bounded slice boundaries.
2. Model and IDE choice varies by slice: high-reasoning lanes for state machines and edge cases; fast lanes for tracing, extraction, and fixtures.
3. Compilation and plausible prose are never acceptance criteria. Slices must pass strict schema validation, pre/post SHA-256 fixture checks, and the 45-case candidate gate.

This is a repeatable way to turn ambiguous systems problems into verified software, not a claim that one person can out-type a fleet.

## What is genuinely new in AINA?

Existing systems solve separate slices: IAM checks caller identity, schemas check payload shape, workflow engines track step order, and databases enforce transactions. AINA binds four autonomous-agent failure gaps into one commit boundary:

1. **Provenance-to-mutation:** server-cut `srv_`/`ev_` evidence is verified before a mutation is admitted.
2. **Approval-to-execution:** a controller-fixed `RequestedAct` is checked against a suspended worker's pre-resume process and handle state before `ResumeThread`.
3. **Stale-worker fencing:** monotonic generations, Win32 file-share exclusion, and SQLite row versions stop late writes at commit.
4. **Non-destructive forensics:** rejected and out-of-band bytes are preserved in Amber quarantine instead of being erased during rollback.

Other stacks can implement these invariants without AINA's vocabulary. The value is closing the gap between a plausible agent proposal and an authorized, provably safe state transition.

## Public verification vs. private implementation

**Public:** refusal receipts, fixtures, declaration-only schemas, conformance vectors, binary attestation, integrity manifests, and the offline verifier.

**Private:** the proprietary `squad.exe` executable and core Rust implementation. These are demonstrated live during technical peer review and R&D due diligence or made available in a sanitized evaluation build under mutual NDA. The candidate binary is attested by digest, not redistributed.

The 45-case gate is author-controlled release qualification in isolated fixtures, not independent third-party certification or proof of customer production deployment.

## Live technical peer review & scoped architecture evaluation

For researchers, security auditors, and R&D funding evaluators examining how the architecture operates beyond static proof artifacts, you can propose a bounded adversarial test case or bring one sanitized transition boundary (an inconsistent CRM/ERP migration, brittle API integration, unverified document pipeline, or unreliable agent workflow). The five-step engineering and verification methodology is:

1. **Operational discovery:** inspect schemas, stakeholders, constraints, and failure modes.
2. **Bounded decomposition:** split the problem into independent, strictly typed slices that fit model context limits.
3. **Dependency and lease coordination:** sequence shared state and prevent one lane from breaking another.
4. **Adversarial review:** force plausible-but-wrong output through edge cases and refusal paths.
5. **Deterministic verification:** require reproducible receipts, before/after state hashes, and automated conformance gates.

A 15–45 minute live `squad.exe` evaluation session ([me@blayneaina.com](mailto:me@blayneaina.com)) can demonstrate a permitted transition, `requested_act_mismatch`, and `stale_lease_generation`, with an open discussion of formal tradeoffs and what remains unbuilt.

## Artifact index

- [Dedicated Research & Assurance Landing Page](https://blayneaina.com/research-assurance/)
- [Proof reproduction guide](proof/README.md)
- [Refusal and conformance exhibit](https://blayneaina.com/refusal-proof/)
- [Four refusal records](proof/refusal/)
- [45-case manifest](proof/conformance/conformance_45_manifest.json)
- [20-case evidence manifest](proof/conformance/evidence_20_manifest.json)
- [Candidate attestation](proof/conformance/binary_attestation.json)
- [Schema declarations](proof/schemas/)
- [Integrity manifest](proof/SHA256SUMS.txt)
- [14-question Technical & Security Due Diligence FAQ](https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/#exhibit-9-6)
