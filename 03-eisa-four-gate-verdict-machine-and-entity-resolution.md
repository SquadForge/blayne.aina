---
title: "EISA Four-Gate Verdict Machine & Strict AST Parser"
subtitle: "The production EISA core determines which bounded acts earn constitutional standing; Semantic Switch is an experimental alpha module for structure-preserving entity-resolution research."
author: "Blayne Aina"
datePublished: "2026-10-31T10:00:00-06:00"
dateModified: "2026-10-31T11:00:00-06:00"
canonicalUrl: "https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/"
series: "From Proposal to Consequence: The AINA Transition-Governance Series"
position: 3
description: "Semantic Switch protects native data before external AI computation, then qBlock, Fracture, Forge, and Shield turn fictionalized records into governed entity state."
keywords:
  - Semantic Switch protected computation
  - Semantic Switch pseudonymization
  - structure-preserving fictionalization
  - exact native value restoration
  - relation-isomorphic entity resolution
  - qBlock Qdrant Edge
  - EISA Evidence Instruction Set Architecture
  - deterministic AI verification
  - counterevidence verification
  - deterministic entity resolution
  - agentic entity resolution governance
  - diagram topology verification
  - RFC 6901 JSON Pointer verification
  - RFC 8785 JCS consensus identity
  - PDF layout proof
  - irreversible CRM merge governance
isAccessibleForFree: true
inLanguage: en-US
---

# EISA Four-Gate Verdict Machine & Strict AST Parser

*The production EISA core determines which bounded acts earn constitutional standing; Semantic Switch is an experimental alpha module for structure-preserving entity-resolution research.*

**By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026**

---

<aside class="context-callout alpha-module" aria-label="Semantic Switch maturity and scope disclosure">
  <div class="brief-label">PRODUCTION CORE + EXPERIMENTAL RESEARCH MODULE</div>
  <h2>EISA is the production core; Semantic Switch is experimental alpha</h2>
  <p><strong>EXPERIMENTAL RESEARCH MODULE (ALPHA) · STAGE-ZERO SYNTHETIC INVARIANCE TESTBED</strong></p>
  <p><strong>Maturity &amp; Scope Note:</strong> Unlike the core deterministic execution, lease-fencing, and server-cut provenance layers (§01, §02, §04–§08), the Semantic Switch is an early-stage experimental research module. The 20/20 block-invariance and 23/23 relation-preservation fixtures in this pack validate deterministic structural isomorphism on synthetic test vectors only; they do not claim production entity-resolution recall across arbitrary noisy text or universal cryptographic anonymity against auxiliary-data reconstruction attacks.</p>
</aside>

Entity resolution has a data-boundary problem before it has a model problem.

Contacts, companies, products, and other native records can contain identifiers that should never be sent raw to an external AI provider. But destructive redaction destroys the relationships that useful comparison requires: exact equality, normalized equality, phone variance, token containment, and the difference between a substitution, insertion, deletion, and transposition.

**Semantic Switch resolves that transport problem first.** Native rows, keys, and the private crosswalk remain under client control. External computation receives structure-preserving fictional records instead of the declared raw values. Qdrant Edge and qBlock can then nominate candidate partitions without exposing the native rows. Fracture adjudicates identity, Forge selects canonical values with provenance, local restoration maps authorized references back to exact native values, and Shield defends the resolved baseline.

Protected computation alone still does not make a decision correct.

Three agents can read the same contaminated context, repeat the same unsupported merger, and produce three confident explanations. A judge model can make the fourth vote. Nothing about that process establishes which records were compared, which values survived inspection, which contradiction was omitted, or whether the proposed partition covers the candidate universe exactly once.

A trustworthy system does not count votes. It compiles each proposal into a bounded act and recomputes the declared predicates over sealed evidence.

Article 02 built the evidence world: exact source revisions, confined parser views, served-content receipts, and server-cut `ev_` handles. Article 03 connects it to **Semantic Switch** and the **Evidence Instruction Set Architecture (EISA)**: protected computation first, deterministic constitutional judgment second.

> **Native data stays local. Semantic Switch powers protected qBlock candidates. EISA determines whether the resulting judgments are well-formed, evidence-contained, type-correct, and substantively consistent. The Room commits the result without executing it.**

That last distinction matters. An operative EISA act is not a CRM merge, a file write, or a network effect. It is a recognized constitutional artifact entering the coordination and execution boundaries that Articles 04–08 govern.

## One Constitution, Two Proof Lanes

EISA applies the same rule to two very different proposal classes:

```text
                         sealed evidence world
                                  │
                    strict acts over one sealed case
                                  │
                    Four-Gate deterministic verdict
                       ┌──────────┴──────────┐
                       │                     │
              Proof Lane A            Proof Lane B
         PDF vector relations       Protected entity resolution
         CONNECTS only              Semantic Switch → qBlock →
         geometry + direction       Fracture → Forge → Shield
         frames + branch labels     identity + canonical state
                       └──────────┬──────────┘
                                  │
                  squad.eisa.submission/1 → eisa_<32hex>
                                  │
                   Room authority and fenced execution
```

The recognition spine is `ev_` evidence → `eisacase_` sealed case → bounded `EISA_ACT_V1` acts → Four-Gate recognition → recognized artifact → immutable `eisa_` Room submission. The two lanes demonstrate that spine in different evidence domains.

Lane A proves a narrow spatial relation from parser-committed geometry rather than asking a vision model to infer an arrow. Lane B turns native customer records into a protected comparison substrate, adjudicates identity relations, compiles canonical state, and defends the sealed baseline against later drift.

**Naming precision:** `Forge` names two related but distinct responsibilities. In Proof Lane A, `eisa.forge.document_layout/1` is the wire profile for spatial `AssertLayoutRelation` acts. In Proof Lane B, **EISA Forge** is Stage 3 of the entity-resolution pipeline, compiling canonical state after Fracture admits an identity partition. The layout profile and the canonical-state compiler are not the same mechanism or proof surface.

The common rule is more important than either application: **a proposal may not choose its own evidence world, suppress inconvenient matter, or narrate itself into authority.**

## 1. Strict Representation Before Judgment

A grammar cannot govern a transition if two parsers can assign different meanings to the same bytes.

### Gate 1 begins with `strict::parse`

EISA does not deserialize submissions through an ordinary last-key-wins JSON map. `strict::parse` drives a recursive `StrictVisitor` before schema evaluation:

- `visit_map` checks whether each incoming key already exists and rejects duplicates.
- `visit_f64` refuses non-finite numbers.
- `de.end()` rejects trailing non-whitespace matter after the root value.

A submission is capped at **1 MiB** before parsing and must be a non-empty array of at most **256 acts**. One submission belongs to one act family: Fracture contact acts or Forge layout acts, never a mixture.

This prevents a gateway from seeing one opcode while a downstream evaluator executes another. The August 2026 Ruby JSON vulnerability [`CVE-2026-71847`](https://nvd.nist.gov/vuln/detail/CVE-2026-71847) is a related warning about parser edge cases: incomplete objects containing duplicate keys could trigger a heap-use-after-free in the affected native parser. EISA's separate point is semantic—duplicate-key matter is ambiguous and therefore inadmissible, not repaired.

### The exact ten-key act envelope

Every act contains all ten, and only ten, top-level fields in `ACT_KEYS`:

| Field | Current wire law |
|---|---|
| `version` | Exactly `EISA_ACT_V1` |
| `stage` | A declared stage whose family admits the opcode: `Fracture` or `Forge` |
| `actor` | Must match the authenticated caller, case-insensitively |
| `opcode` | One of the seven closed opcodes |
| `operands` | An object with exactly the opcode's declared keys |
| `evidenceRefs` | At most 16 strings naming Room-issued `ev_` handles; layout relations require exactly the connector/from/to handles |
| `confidence` | An empty object, or `{ "bps": integer }` with `0 <= bps <= 10000`; audit only |
| `boundedReason` | A string of at most 1,024 characters, with control characters other than newline refused; audit only |
| `sourceEvent` | Empty, or `evt_<16 hex>_<8 hex>` |
| `artifactHash` | The sealed case's bare 64-lowercase-hex JCS digest; no `sha256:` prefix |

`confidence` and `boundedReason` are not consulted by any gate and do not enter `consensusIdentity`. A model can explain itself for operators. It cannot make its explanation causal by declaring it confident.

Act IDs are local dependency names: a letter followed by up to 63 ASCII letters, digits, underscores, or hyphens. Duplicate IDs fault every act carrying the ambiguous name.

### Record-relative RFC 6901 pointers

A Fracture `BindEvidenceTag` coordinate has exactly three fields:

```json
{
  "artifact": "records",
  "recordId": "rec_101",
  "pointer": "/contact/workEmail"
}
```

The participant names the record and pointer. The recognizer reads the value. Coordinates never name a filesystem path, URL, case-array index, or foreign artifact.

`pointer::parse` enforces:

- a leading `/`;
- at most 256 bytes and eight tokens;
- no whole-record empty pointer;
- no control characters;
- only RFC 6901 `~0` and `~1` escapes.

`pointer::resolve` then walks the sealed record. Object members must exist. Array indices use canonical decimal syntax—`0` or a nonzero digit sequence without leading zeroes—and must be in bounds. Traversal into a scalar fails. Missing fields, malformed indices, and out-of-bounds access become typed faults rather than guessed values.

Comparator inputs are **non-null, non-empty strings of at most 1,024 characters**. Numbers, booleans, arrays, objects, nulls, and whitespace-only strings do not become comparator text through coercion.

### The profile bounds

| Constant | Value | Boundary |
|---|---:|---|
| `VERSION` | `EISA_ACT_V1` | Wire version |
| `PROFILE` | `eisa.fracture.contact/1` | Contact act family |
| `LAYOUT_PROFILE` | `eisa.forge.document_layout/1` | Layout act family |
| `RECORDS_ARTIFACT` | `records` | Only coordinate substrate |
| `MAX_SUBMISSION_BYTES` | 1,048,576 | Submission bytes |
| `MAX_ACTS` | 256 | Acts per submission |
| `MAX_REASON_CHARS` | 1,024 | `boundedReason` characters |
| `MAX_ID_CHARS` | 64 | Act and record ID ceiling |
| `MAX_POINTER_BYTES` | 256 | Pointer bytes |
| `MAX_POINTER_DEPTH` | 8 | Pointer tokens |
| `MAX_VALUE_CHARS` | 1,024 | Compared string characters |
| `MAX_REFS` | 16 | Evidence handles per act |
| `MAX_LIST` | 1,000 | Members, support, counter, and groups |
| `MAX_CHAIN` | 4 | Duplicate links per transitive chain |
| `MAX_CASE_BYTES` | 4,194,304 | Sealed case-file bytes |
| `MAX_CASE_RECORDS` | 1,000 | Records per case |
| `MIN_PHONE_DIGITS` | 7 | Minimum digits on each phone side |

## 2. The Closed Grammar: Seven Opcodes, Four Layers

The opcode set is closed. New semantics cannot be introduced by sending a persuasive string.

| Layer | Opcode | Stage | Exact operand keys | Constitutional role |
|---:|---|---|---|---|
| 0 | `BindEvidenceTag` | Fracture | `id`, `tag`, `coordinates` | Compare values at two distinct sealed-record coordinates using one positive or counter tag |
| 0 | `RequestHumanReview` | Fracture | `id`, `reason`, `members` | Emit lawful non-operative review matter over at least one sealed record |
| 0 | `RejectUnlawfulAct` | Fracture | `id`, `rejected`, `fault` | Preserve anti-knowledge rejecting a 64-hex matter identity or act digest under a registered fault |
| 0 | `AssertLayoutRelation` | Forge | `id`, `relation`, `connector`, `from`, `to` | Prove `CONNECTS` over three sealed whole-node layout citations |
| 1 | `AssertDuplicatePair` | Fracture | `id`, `pair`, `support`, `counter` | Link two records using admitted positive bindings and every admitted counter binding on that pair |
| 2 | `AssertTransitiveClosure` | Fracture | `id`, `pair`, `chain` | Compose two to four admitted duplicate links into a simple path |
| 3 | `ProposePartition` | Fracture | `id`, `groups`, `support` | Cover every sealed record exactly once with connected, non-contradicted groups |

Dependencies point downward. Layer 0 observations feed Layer 1 pairs; Layer 1 pairs feed Layer 2 closure; Layers 1 and 2 support the Layer 3 partition. A missing, faulted, wrongly typed, cyclic, or pair-mismatched dependency cannot become support by being named confidently.

`RequestHumanReview` accepts only `INSUFFICIENT_EVIDENCE`, `CONFLICTING_EVIDENCE`, `SOURCE_DEFECT`, or `OUT_OF_PROFILE`. It records a review obligation; it does not assert that a human has acted. `RejectUnlawfulAct` validates the rejected identity's digest shape and fault class; it does not need to prove that the rejected target exists.

A submission cannot contain both an admitted terminal partition and an admitted review request. That is `submission_mixed_decision`, not a hedge with extra authority.

## 3. The Evidence Alphabet: 17 Tags and 12 Comparators

EISA's tags are not natural-language hints. Each positive or counter tag binds to one deterministic comparator. The two inferential tags are reserved for transitive composition and are refused in `BindEvidenceTag`.

| # | Evidence tag | Class | Comparator and exact predicate |
|---:|---|---|---|
| 1 | `PHONE_STRONG` | Positive | `DigitsEqual`: both digit strings have at least seven digits and are identical |
| 2 | `PHONE_ONE_DIGIT_VARIANCE` | Positive | `DigitsOneSubstitution`: equal-length digit strings, Hamming distance exactly one |
| 3 | `PHONE_MULTI_DIGIT_VARIANCE` | Positive | `DigitsMultiSubstitution`: equal-length digit strings, Hamming distance two or three |
| 4 | `PHONE_COUNTRY_CODE_VARIATION` | Positive | `DigitsSuffix`: the shorter digit string is a proper suffix of the longer |
| 5 | `INTERNATIONAL_PHONE_VARIATION` | Positive | `DigitsSuffix`: the same suffix law under a distinct declared evidence tag |
| 6 | `EMAIL_LOCAL_MATCH` | Positive | `EmailLocalEqual`: valid trimmed/lowercased email shapes have equal local parts |
| 7 | `DOMAIN_ROOT_MATCH` | Positive | `EmailDomainRootEqual`: the first domain label before the first dot is identical |
| 8 | `DOMAIN_COUNTRY_TLD_VARIATION` | Positive | `EmailTldVariation`: first domain labels match and full domains differ |
| 9 | `DOMAIN_ROOT_MISMATCH` | Counter | `EmailDomainRootDiffers`: first domain labels differ |
| 10 | `NAME_STRONG` | Positive | `TextEqual`: lowercase whitespace-collapsed non-empty strings match |
| 11 | `NAME_SIMILARITY` | Positive | `TokenOverlap`: nonblank values share at least one lowercase alphanumeric token of two or more characters |
| 12 | `COMPANY_ROOT_MATCH` | Positive | `FirstTokenEqual`: first qualifying tokens match |
| 13 | `COMPANY_REGIONAL_VARIATION` | Positive | `FirstTokenVariation`: first tokens match and normalized full strings differ |
| 14 | `REGIONAL_SUBSIDIARY_PATTERN` | Positive | `FirstTokenVariation`: the same first-token variation law under a distinct declared tag |
| 15 | `REGIONAL_VARIATION` | Positive | `FirstTokenVariation`: the same first-token variation law under a distinct declared tag |
| 16 | `TRANSITIVE_CLOSURE_APPLIED` | Inferential | No field comparator; express with `AssertTransitiveClosure` |
| 17 | `TRANSITIVE_CHAIN_DEPTH_1` | Inferential | No field comparator; express with `AssertTransitiveClosure` |

The domain rule is intentionally simpler than a public-suffix analyzer: `domain_root` is the first DNS label. It does not strip `mail`, `www`, or country-code second-level domains. That limitation must remain visible; comparator semantics are declared policy, not universal identity truth.

A comparator can answer only its exact predicate. `TokenOverlap` does not prove two people are identical. `FirstTokenVariation` does not prove two companies share a parent. `DigitsSuffix` does not establish ownership of a phone number. EISA determines whether the declared relation holds between the sealed strings—not whether the relation is sufficient evidence for a worldly identity decision.

### The 47 registered fault classes

Faults are residue, never standing. The current `FAULTS` registry contains exactly these 47 codes:

```text
Representation and bounds (16):
  act_not_object, unknown_field, missing_field, field_type,
  unknown_version, unknown_stage, stage_not_admitted, unknown_opcode,
  unknown_symbol, tag_class_mismatch, bound_exceeded, act_id_invalid,
  act_id_repeated, actor_mismatch, case_mismatch, evidence_ref_refused

Coordinates and observations (11):
  pointer_foreign_artifact, pointer_malformed, record_unknown,
  member_repeated, field_absent, value_null, value_empty,
  value_not_string, value_shape_mismatch, observation_contradicted,
  pair_mismatch

Dependencies and composition (8):
  dependency_missing, dependency_kind, dependency_faulted, dependency_cycle,
  support_missing, counterevidence_suppressed, chain_broken,
  chain_depth_exceeded

Partitions and terminal decisions (7):
  partition_member_unknown, partition_member_repeated,
  partition_member_missing, partition_unsupported_group,
  partition_contradicts_support, partition_repeated,
  submission_mixed_decision

Layout (5):
  layout_fact_absent, layout_scope_mismatch, layout_kind_mismatch,
  layout_citation_mismatch, relation_indeterminate
```

Malformed submissions can also produce whole-submission inadmissibility codes such as `submission_too_large`, `submission_unparseable`, `submission_not_array`, `submission_size`, and `submission_mixed_stage`. Those envelope outcomes are distinct from the 47 registered per-act fault classes that `RejectUnlawfulAct` may cite.

## 4. Sealed Cases: Two Substrates, One Artifact Identity

An act may point only into a sealed case. EISA creates `eisacase_<32hex>` by hashing the Room name, a NUL separator, and the case's RFC 8785 JCS record digest. The `artifactHash` carried by every act is that record digest; the Room-qualified case ID is the graph address.

Identical records sealed in two Rooms therefore have the same `artifactHash` but different case nodes. Neither Room can resolve the other's case through composition.

### File cases

`seal_file` reads a JSON case through a task-scoped `ReadAuthority` under the Room's transition serialization, revalidates that authority, checks Room-project containment, enforces 4 MiB and 1,000-record ceilings, and applies the same strict parser. A case is either an array of record objects or `{ "records": [...] }`. Every record has a unique valid `id`.

The graph record binds the canonical records, digest, source-path identity and source-byte SHA-256, actor, session, task, Room, and time. Loading recomputes the record digest before recognition.

### Passage cases

`seal_passages` bridges Article 02 directly into EISA. Each input is a Room-issued `ev_` handle. The sealer:

1. prepares and validates the citation for the caller and task;
2. refuses handles from another Room or unrevealed collaborative-pass findings;
3. loads and reverifies the canonical view and live source;
4. cuts the exact Unicode-scalar passage using the handle's selector;
5. refuses textless gaps, empty selections, and passages over 1,024 characters;
6. attaches committed `layout` facts when a whole-node citation names a PDF layout element;
7. seals records containing the exact text and source provenance;
8. commits citation edges so later source reassessment reaches the case.

A passage record's `/text` is the selected passage. Its `/source/...` fields bind Room, view digest, node ID, unit, start, end, source revision, source SHA-256, and parser digest. Every later `case::load` rechecks the JCS digest, source views, live source bytes, and sealed layout equality. A drifted source cannot be used for a new judgment.

The two substrates share constitutional identity but not assurance. A task-scoped file case establishes JCS integrity over an admitted file. A passage case additionally binds each value to server-cut document evidence and layout provenance. Neither proves that the underlying records are worldly true.

## 5. The Four-Gate Verdict Machine

| Gate | What the recognizer establishes | What it refuses to let the proposal do |
|---|---|---|
| **1. Syntax and stage isolation** | Strict JSON, exact keys, closed symbols, authenticated actor, unique IDs, bounded sizes, one act family, matching `artifactHash` | Smuggle duplicate fields, foreign opcodes, mixed stages, self-declared actors, or unbounded matter |
| **2. Spatial containment** | Every coordinate resolves inside the named sealed case; every layout citation names the same committed view, revision, parser, and page | Point at foreign records, manufactured geometry, another Room's evidence, or unstored fields |
| **3. Type and canonical identity** | Values are non-empty bounded strings, dependencies have the right opcode/layer, and admitted acts receive JCS consensus identities | Coerce shapes, cite faulted dependencies, or let prose and local naming change the proof identity |
| **4. Substance and coverage** | Comparators hold, counterevidence stays visible, chains are simple paths, and partitions are exact, connected, and non-contradicted | Suppress contradiction, break a chain, omit members, split proven duplicates, or assert an unsupported cluster |

Each act ends in one consequence class:

- **`operative`** — a recognized act with a consensus identity.
- **`lawful_non_operative`** — a valid review request, which creates no operative identity claim.
- **`anti_knowledge`** — a valid rejection of other matter.
- **`typed_fault`** — preserved residue with a fault code and no standing.

A malformed whole submission is `inadmissible`. A recognized submission reports `decision: partition`, `review`, `relation`, or `none`; it does not acquire a blanket database-execution verdict.

### Counterevidence is submission-complete

For `AssertDuplicatePair`, **at least one admitted positive `BindEvidenceTag` on the same pair is required**. Every listed support dependency must be such a binding. Every listed counter dependency must be an admitted counter binding on that pair. An empty counter list is valid only when the submission contains no admitted counter binding for that pair.

Then EISA scans all admitted acts in the submission. If any counter binding on that pair is absent from `operands.counter`, the pair faults with `counterevidence_suppressed`. This is the minimum support and complete-counter rule—not a domain-specific claim that one similarity signal is sufficient proof of real-world identity.

The proposer cannot bind `DOMAIN_ROOT_MISMATCH` in one act and then omit it when asserting identity in another. The check is deliberately scoped to the **current submission's admitted acts**; it is not a claim to have searched every historical record or external source in the world.

### Transitive closure is a path proof, not a slogan

`AssertTransitiveClosure` cites two to four admitted `AssertDuplicatePair` links. Pairs are canonically ordered, but the walker can traverse each edge in either direction. It starts from either requested endpoint, requires every link to continue from the current record, tracks visited IDs to reject cycles, and must end at the other endpoint.

This establishes that the cited simple path exists. It does not prove that transitivity is a safe business rule for every relationship.

### Partition verification is global across the admitted submission

`ProposePartition` enforces four separate mathematical properties:

1. **Exact disjoint cover.** Every group member exists in the case, appears in at most one group, and every sealed record appears somewhere. Empty groups are meaningless.
2. **Cited support stays inside groups.** Every support reference must be an admitted duplicate pair or transitive closure.
3. **No admitted relation crosses a boundary.** EISA scans all admitted Layer 1/2 acts, including those omitted from `support`. If any links records in different groups, the result is `partition_contradicts_support`.
4. **Every multi-record group is connected.** A Disjoint-Set Union-Find structure unions cited support edges within each group. If members do not share one root, the result is `partition_unsupported_group`.

A proposal cannot prove A=B and B=C, then place C outside the cluster because it dislikes the consequence. Nor can it place A, B, and C together without a cited path connecting them.

### Consensus identity removes narrative, not responsibility

For an admitted act, `consensusIdentity` is the SHA-256 of an RFC 8785 basis containing the version, stage, opcode, case `artifactHash`, and canonical operands. Dependency IDs are replaced by the sorted consensus identities of the acts they name. Layout acts additionally bind their profile and committed geometric identity.

Excluded from that identity are `actor`, `boundedReason`, `confidence`, `sourceEvent`, `evidenceRefs`, and local act IDs.

Two proposers using different names, confidence scores, and explanations therefore receive the same consensus identity only when they prove the same structural transition over the same sealed case. Their raw acts remain separately attributable through `act_sha256`, Room actor, session, and submission identity. Canonical consensus does not create independent evidence.

## Exhibit A — A Valid Contact Submission

The following synthetic submission binds two email relationships, asserts a pair, and proposes a complete partition over three sealed records. `artifactHash` is the case's bare digest. Values are resolved from the sealed case, not trusted from the prose.

```json
[
  {
    "version": "EISA_ACT_V1",
    "stage": "Fracture",
    "actor": "agent_er_worker_01",
    "opcode": "BindEvidenceTag",
    "operands": {
      "id": "act_bind_email_01",
      "tag": "EMAIL_LOCAL_MATCH",
      "coordinates": [
        { "artifact": "records", "recordId": "rec_101", "pointer": "/email" },
        { "artifact": "records", "recordId": "rec_102", "pointer": "/contact/workEmail" }
      ]
    },
    "evidenceRefs": ["ev_8f31c09a4b2e11d08a7c65e41902b3a1"],
    "confidence": { "bps": 9400 },
    "boundedReason": "Both sealed values share the local part m.chen across regional domains.",
    "sourceEvent": "evt_0123456789abcdef_a1b2c3d4",
    "artifactHash": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567"
  },
  {
    "version": "EISA_ACT_V1",
    "stage": "Fracture",
    "actor": "agent_er_worker_01",
    "opcode": "BindEvidenceTag",
    "operands": {
      "id": "act_bind_tld_02",
      "tag": "DOMAIN_COUNTRY_TLD_VARIATION",
      "coordinates": [
        { "artifact": "records", "recordId": "rec_101", "pointer": "/email" },
        { "artifact": "records", "recordId": "rec_102", "pointer": "/contact/workEmail" }
      ]
    },
    "evidenceRefs": ["ev_8f31c09a4b2e11d08a7c65e41902b3a1"],
    "confidence": { "bps": 9400 },
    "boundedReason": "The first domain labels match and the full regional domains differ.",
    "sourceEvent": "evt_0123456789abcdef_a1b2c3d4",
    "artifactHash": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567"
  },
  {
    "version": "EISA_ACT_V1",
    "stage": "Fracture",
    "actor": "agent_er_worker_01",
    "opcode": "AssertDuplicatePair",
    "operands": {
      "id": "act_dup_101_102",
      "pair": ["rec_101", "rec_102"],
      "support": ["act_bind_email_01", "act_bind_tld_02"],
      "counter": []
    },
    "evidenceRefs": ["ev_8f31c09a4b2e11d08a7c65e41902b3a1"],
    "confidence": { "bps": 9100 },
    "boundedReason": "Two admitted positive bindings support this pair; no counter binding exists in this submission.",
    "sourceEvent": "evt_0123456789abcdef_a1b2c3d4",
    "artifactHash": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567"
  },
  {
    "version": "EISA_ACT_V1",
    "stage": "Fracture",
    "actor": "agent_er_worker_01",
    "opcode": "ProposePartition",
    "operands": {
      "id": "act_part_final",
      "groups": [["rec_101", "rec_102"], ["rec_103"]],
      "support": ["act_dup_101_102"]
    },
    "evidenceRefs": ["ev_8f31c09a4b2e11d08a7c65e41902b3a1"],
    "confidence": { "bps": 9100 },
    "boundedReason": "A complete disjoint cover with one connected pair and one singleton.",
    "sourceEvent": "evt_0123456789abcdef_a1b2c3d4",
    "artifactHash": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567"
  }
]
```

The recognizer, not the narrative, decides whether the sealed values satisfy `EmailLocalEqual` and `EmailTldVariation`, whether the dependencies match, and whether the partition laws hold.

## Exhibit B — `counterevidence_suppressed`

Suppose the same submission also admitted `act_bind_counter_03`, binding `DOMAIN_ROOT_MISMATCH` on the pair, but `act_dup_101_102` omitted it from `counter`. Its recognized-act report entry is:

```json
{
  "index": 2,
  "id": "act_dup_101_102",
  "opcode": "AssertDuplicatePair",
  "class": "typed_fault",
  "identity": null,
  "act_sha256": "01928374655647382910abcdef1234567890abcdef1234567890abcdef123456",
  "canonical": "{\"actor\":\"agent_er_worker_01\",\"artifactHash\":\"4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567\",\"boundedReason\":\"Pair asserted without admitted counterevidence.\",\"confidence\":{\"bps\":9100},\"evidenceRefs\":[],\"opcode\":\"AssertDuplicatePair\",\"operands\":{\"counter\":[],\"id\":\"act_dup_101_102\",\"pair\":[\"rec_101\",\"rec_102\"],\"support\":[\"act_bind_email_01\"]},\"sourceEvent\":\"evt_0123456789abcdef_a1b2c3d4\",\"stage\":\"Fracture\",\"version\":\"EISA_ACT_V1\"}",
  "fault": {
    "code": "counterevidence_suppressed",
    "detail": "admitted counterevidence on this pair is not listed in counter: act_bind_counter_03"
  },
  "observations": [],
  "comparator": null,
  "depends_on": [],
  "evidence_refs": []
}
```

The refusal is not a score penalty. It is the absence of standing for that pair.

## 6. Proof Lane A: Spatial Relations Without Visual Guesswork

A flowchart can have perfect OCR and still produce a false graph. Recognizing the words inside two boxes does not establish which arrow connects them, which direction the arrow points, whether the tip touches a node or an enclosing frame, or whether “Yes” and “No” label the same geometric edge.

EISA's layout family does not ask a model to settle those questions from prose. It judges `AssertLayoutRelation` over parser-committed `LayoutFact` values sealed from whole-node document citations.

### From PDF operators to integer evidence

The layout projection decodes PDF content streams, tracks affine transforms and graphics-state nesting, interprets subpaths and paint operators, and expands Form XObjects within bounded recursion. Coordinates become integer **centi-points**—hundredths of a PDF point—only when finite and within the declared coordinate ceiling.

The projection is bounded at 4,000 elements per page and 20,000 points per path. Cubic Bezier bounding boxes solve derivative extrema rather than treating control points as the painted extent. Course tracing samples each cubic segment 16 times and keeps at most 4,096 trace points.

Small filled triangular marks no larger than 24 points can become arrowheads. The attachment logic associates marks with open connector ends, so direction and touch are measured from the actual marked end. Branch labels up to 20 points high are assigned to a connector when the traced course establishes ownership. A label beside a course must be within 12 points and every other course must be at least twice as far; otherwise it is tied and assigned to neither.

The recognizer never accepts replacement geometry from the act.

### The `CONNECTS` proof

`CONNECTS` is the only relation in the current layout alphabet. The act names three distinct sealed records—connector, from, and to—and its `evidenceRefs` must be exactly those three handles, each once. An outer frame is found through the parser-committed attachment and must also be sealed in the case, but it is not added as a fourth citation.

The recognizer then enforces:

1. **Provenance.** All three records come from one Room, view digest, source revision, parser digest, and page. Each record's committed `LayoutFact.node` is exactly the node its evidence handle cites.
2. **Element types.** The connector is an open `line`, `polyline`, or `open_curve` with stroke paint and bounded start/end geometry. Both endpoints' targets are closed `rect`, `rects`, `closed_curve`, or `compound` shapes.
3. **Direction.** The committed direction is `toward_end` or `toward_start`, determined by one marked end. No direction or an ambiguous direction is `relation_indeterminate`.
4. **Unique attachment.** Neither end may carry parser-recorded ambiguity or no attached node. The parser's attached `from` and `to` node IDs must equal the act's cited nodes exactly.
5. **Touch.** A direct tail lies within `LAYOUT_TOUCH = 150` centi-points (1.5 pt) of the `from` box. A direct head or its mark touches the `to` box within 150; a marked head can use `LAYOUT_NEAR_TOUCH = 200` centi-points (2.0 pt) for mark-box contact.
6. **Frame proof.** When the parser routed an end through an outer frame, the frame and cited inner shape must independently satisfy the sealed frame law rather than letting a group boundary impersonate a target.

A frame must be a sealed, stroke-only closed shape on the same view and page with exactly the committed box. The cited inner shape must be closed and filled. All four inner-minus-outer gaps must be nonnegative, and the **maximum** gap may not exceed `LAYOUT_FRAME_GAP = 600` centi-points (6.0 pt). The frame node must be sealed whole exactly once, and no other sealed closed shape may create an inner-shape tie. Page-wide uniqueness is reported as `parser_committed`; the recognizer separately checks contradictions present in the sealed case.

The thresholds are therefore not interchangeable: 150 is direct touch, 200 is marked-head near-touch, and 600 is the maximum frame-to-inner gap.

### Branch labels enter relation identity

A connector's committed `path_labels` qualify the relation. Their label-node IDs enter `consensusIdentity`, so a “Yes” edge and a “No” edge between the same two shapes are not the same constitutional relation. The recognizer reads label words only when the corresponding text node is sealed whole from the same view. `labels_tied` remains visible and is assigned to neither connector.

The result is deliberately narrow: EISA can prove one directed `CONNECTS` relation under declared geometry. It does not infer `flows_to`, `branches_to`, `grouped_with`, electrical correctness, process safety, or the diagram author's intent.

## Exhibit C — An Operative Layout Relation

This is the layout portion of a synthetic recognized-act report. The frame fields are observations in the current report shape, not an agent-authored `layout_proof` object.

```json
{
  "index": 0,
  "id": "layout_connect_07",
  "opcode": "AssertLayoutRelation",
  "class": "operative",
  "identity": "9f2d4b8c1e7a0356d4c2b1a0987654321fedcba0987654321fedcba098765432",
  "fault": null,
  "observations": [
    {
      "recordId": "ev_11111111111111111111111111111111",
      "node_id": "page4/e42",
      "shape": "polyline",
      "direction": "toward_end",
      "tail": [24100, 41200],
      "head": [28900, 42150],
      "tail_via": "direct",
      "head_via": "frame",
      "path_labels": [
        {
          "label": "page4/e43",
          "bbox": [26000, 41400, 27800, 41700],
          "text_node": "page4/t9",
          "text": { "recordId": "ev_44444444444444444444444444444444", "text": "ADMITTED" },
          "text_sealed": true,
          "on": "course",
          "beside_gap": null
        }
      ],
      "labels_tied": []
    },
    {
      "recordId": "ev_22222222222222222222222222222222",
      "node_id": "page4/e18",
      "shape": "rect",
      "bbox": [23000, 40000, 24500, 42400]
    },
    {
      "recordId": "ev_33333333333333333333333333333333",
      "node_id": "page4/e29",
      "shape": "rect",
      "bbox": [28000, 41000, 29600, 43000],
      "head_marks": [
        { "node": "page4/e40", "bbox": [28700, 41900, 28900, 42200] }
      ]
    },
    {
      "end": "head",
      "recordId": "ev_55555555555555555555555555555555",
      "node_id": "page4/e5",
      "shape": "rect",
      "paint": "stroke",
      "bbox": [27500, 40500, 30100, 43500],
      "inner": "page4/e29",
      "gap": 500,
      "uniqueness": "parser_committed",
      "sealed_case_other_inner": 0
    }
  ],
  "comparator": "LayoutConnects(touch=150,mark_touch=200,frame=parser_committed_inner,frame_gap=600)",
  "depends_on": [],
  "evidence_refs": [
    "ev_11111111111111111111111111111111",
    "ev_22222222222222222222222222222222",
    "ev_33333333333333333333333333333333"
  ]
}
```

The frame and label-text records are sealed in the case for verification, but the act's citations remain exactly connector, from, and to as required.

## Exhibit D — Two Distinct Partition Failures

```json
[
  {
    "index": 3,
    "id": "act_part_split_cluster",
    "opcode": "ProposePartition",
    "class": "typed_fault",
    "identity": null,
    "fault": {
      "code": "partition_contradicts_support",
      "detail": "'act_dup_101_102' asserts rec_101 and rec_102 are one record, but they are in different groups"
    },
    "observations": [],
    "comparator": null,
    "depends_on": [],
    "evidence_refs": []
  },
  {
    "index": 3,
    "id": "act_part_unconnected_cluster",
    "opcode": "ProposePartition",
    "class": "typed_fault",
    "identity": null,
    "fault": {
      "code": "partition_unsupported_group",
      "detail": "group 0 is not connected by its cited relations"
    },
    "observations": [],
    "comparator": null,
    "depends_on": [],
    "evidence_refs": []
  }
]
```

The first splits records already proven equivalent. The second groups records without proving connectivity. They are different defects and receive different faults.

## 7. Proof Lane B: Semantic Switch First, Then the Entity-Resolution Stack

Entity resolution adds a different danger: the evidence can contain direct identifiers, and the final merge can be difficult or impossible to reverse through the destination's ordinary product operations. The architecture protects the data **before any provider-exposed computation**, then protects the resolved baseline afterward.

```text
Native contacts, companies, products, or other records
→ Stage 0: Semantic Switch protected representation
→ Stage 1: qBlock / Qdrant Edge candidate mesh over protected records
→ Stage 2: EISA Fracture identity adjudication
→ Stage 3: EISA Forge canonical state compilation
→ local restoration of authorized native values through the private crosswalk
→ Stage 4: Shield forward-only baseline defense
→ Room-governed destination transition
```

### Stage 0 — Semantic Switch: protected computation before external AI

Semantic Switch converts native values into structure-preserving fictional representations while retaining native rows, keys, and the private crosswalk locally. External AI providers and downstream reviewers receive the fictional records—not the declared raw identifiers. The downstream party returns partitions, unresolved membership, and optional field-source references; local restoration maps authorized references back to exact native values.

This is the privacy-first ordering rule: **Semantic Switch runs before qBlock, Fracture, or any other computation that exposes records to an external model.** Candidate generation, adjudication, and canonical-value selection all operate on the protected representation.

The accurate privacy description is **deterministic, structure-preserving pseudonymization**, not anonymity. The fictional surface preserves declared comparison structure while native data and restoration authority remain under client control.

**Engineering trade-off note:** Semantic Switch is purpose-built for structured entity resolution, CRM deduplication (Keiki), and topological claim graphs. In those workloads, structural edges, blocking keys, and relational patterns carry the primary signal. Lexical identifiers such as names, emails, and account numbers are severed into local `SeveranceAntiKnowledgeObjects` before any external embedding provider or qBlock / Qdrant Edge computation, preserving useful comparison structure without shipping the native identifiers.

| Check | Current contract and evidence |
|---|---|
| `SS01` | **Privacy-first stage responsibility.** Semantic Switch transforms native records before provider-exposed qBlock, Fracture, Forge, or Shield computation. Separate stages own identity judgment and destination mutation. |
| `SS02` | **Whole blocks remain the unit of work.** Disjoint IDs, member existence, non-overlap, and in-block edge evidence are checked; no pair-request fragmentation or cross-block merge. |
| `SS03` | **Input validation prevents silent loss.** Unknown fields, nested/numeric values in the declared string schema, duplicate keys/IDs, unknown members, and overlapping membership are refused; unblocked rows remain local and counted. |
| `SS04` | **Relation-isomorphic fiction retains declared signals.** Scoped references, presence, exact and normalized equality, ordered components, and substitution, insertion, deletion, and transposition relations survive the transformation. |
| `SS05` | **Per-block reproducible scope.** HMAC-SHA256 derivation binds schema, release, original block, canonical membership, and native content; no exported global dictionary, and no claim of cross-block unlinkability. |
| `SS06` | **Complete partitions and explicit uncertainty.** Every emitted record appears exactly once across partitions and unresolved lists; omissions, duplicates, foreign records, and dual membership are refused. |
| `SS07` | **Reference-based exact restoration.** A selection names an emitted record and issued field-value reference inside the same partition; local restoration retrieves the exact native value and source provenance rather than asking a model to reproduce it. |
| `SS08` | **Release-inventory verification.** The expected `release_inventory` manifest is reconstructed from the authenticated crosswalk; admitted/held payload SHA-256 digests, counts, field-reference coverage, unexpected files/directories, and complete native accounting are checked. |
| `SS09` | **Measured transport and relation fidelity.** Retained executions establish complete block, record, field-restoration, relabeling-invariance, and exact edit-relation accounting—not population matching accuracy. |
| `SS10` | **Whole-block capacity.** Oversized blocks remain intact and held rather than being truncated or semantically fragmented; raising capacity requires a new preparation run. |
| `SS11` | **Privacy and custody ceiling.** Native IDs, original rows, keys, crosswalks, and restored outputs stay local; keyed checks protect integrity, while host confidentiality and key custody remain deployment duties. |
| `SS12` | **Reproducible packaging and handoff.** Pinned builds, launcher compatibility, manifest verification, new-output-location rules, and retained receipt and refusal artifacts support repeatable operation. |

#### The retained transport-measurement record

| Execution input | Native rows | Whole blocks | Fictionalized rows | Exact field restorations | Unblocked rows retained locally |
|---|---:|---:|---:|---:|---:|
| Inspected restaurant development data | 250 | 17 | 212 | 2,120 | 38 |
| Synthetic stress data | 2,500 | 33 | 2,492 | 24,920 | 8 |
| **Total** | **2,750** | **50** | **2,704** | **27,040** | **46** |

All 2,750 inputs are accounted for. The retained Stage 1 executions made zero provider calls. A separate inspection checked 15,932 ordered component positions and the declared normalized-equality and component bijections.

#### Relation-isomorphism and adversarial verification

| Verification surface | Verified result |
|---|---:|
| Relabeling-invariance blocks | **20/20** |
| Eligible native edit relations preserved exactly | **23/23** |
| Records verified in each relation-isomorphism run | **53/53** |
| Field values verified in each run | **529/529** |
| Batch-restoration adversarial cases | **14/14** |
| Transformation adversarial cases | **10/10** |
| Provider calls during preparation | **0** |

These are transport-fidelity and relation-preservation measurements. They do not establish matching accuracy, fresh-holdout performance, an AI advantage, anonymity, inference resistance, or independent validation.

#### `SS08`: authenticate the release universe, not just a reply

A valid response for one block proves nothing about another block hidden from the release. The release verifier therefore closes the inventory around the authenticated crosswalk:

```text
authenticated private crosswalk
→ reconstruct expected release_inventory manifest
→ compare admitted and held block references, payload SHA-256 digests, counts, and bytes
→ verify field-reference coverage and complete native-record accounting
→ refuse missing/unexpected payloads, files, and directories
→ only then release the listed fictional artifacts
→ require complete block results before local restoration
```

Altered manifest counts, hidden blocks, unexpected native-data canaries, and unexpected public directories are refusal conditions. This is local software verification with a locally held key—not hardware attestation or control over every later copy.

### Stage 1 — qBlock: candidate nomination over protected records

`qBlock`/Qdrant Edge consumes the Semantic Switch representation and partitions protected records into candidate blocks and edges. This narrows the comparison universe without sending the native rows through the provider-exposed candidate path. It does not prove that any two records match, and its recall ceiling remains explicit: a true pair absent from every nominated block cannot be adjudicated by a later stage.

The blocks and edge evidence remain inside the nominated parent block. The Semantic Switch interface requires disjoint blocks; overlapping blocker output needs an explicit upstream ownership policy. Candidate nomination supplies a partition for adjudication—not an identity conclusion.

### Stage 2 — EISA Fracture: identity adjudication with dissent preserved

Fracture is where candidate relations become constitutional acts. Role-separated defense, prosecution, and tribunal participants can nominate support and contradiction, but their votes are not the proof. The Four-Gate recognizer recomputes every binding and partition law.

BFT-style panels and persistent role separation improve review structure and attributable dissent. They do not create independent model accuracy, and they cannot override a failed comparator or a hidden counter binding.

The output is an identity partition, a review request, anti-knowledge, or typed residue—not a mutated customer record.

### Stage 3 — EISA Forge: canonical state is a separate decision

Identity equivalence does not decide which values should survive. Forge consumes an admitted partition and compiles a canonical record field by field:

- every surviving value names its source record and field pointer;
- provenance and validity intervals remain inspectable;
- declared field quorums and canonical claims decide support;
- unsupported values do not win through confidence alone;
- a conditional reversal plan records pre-state and post-state commitments before destination execution.

This is the **Field Provenance Matrix** and reversible transition plan. Forge does not inherit ambient permission to run a CRM merge. Article 07's controller-fixed act and destination pre-state checks remain necessary.

As Fracture partitions and Forge field selections return, Semantic Switch maps their authorized references through the private crosswalk to exact native values and source provenance. Restoration is local and reference-driven; no external model reconstructs or invents the original data. Shield then defends the resulting baseline, while any destination mutation remains separately governed.

### Stage 4 — Shield: the baseline moves forward or does not move

A sealed baseline is not allowed to be rewritten by every later record. Shield evaluates new input through pre-provider switching and leak scanning, the declared embedding quorum, exact-baseline-run retrieval, and deterministic anchor gating. It then assigns one of three forward-only dispositions:

- **`DEFLECT`** — contradictory or unverified matter is held away from the sealed baseline.
- **`GROWTH`** — compatible evidence extends the provenance graph through a sealed forward path.
- **`ESCALATE`** — genuine conflict enters autonomous quarantine and review rather than overwriting established state.

No route mutates the sealed L3 baseline in place. Shield is temporal baseline defense, not a claim of universal entity accuracy or control over undeclared ingress paths.

## 8. From Duplicate Records to Evidence-Linked Relationship Graphs

The commercial value is not “AI deduplication” as a slogan. It is a defensible identity substrate on which relationship paths can be inspected.

```text
Semantic Switch protected records
→ qBlock candidate nominations
→ evidence-bound identity partitions
→ canonical records with field provenance
→ evidence-linked relationships
→ inspectable graph paths with freshness, relation type, and status
→ bounded vertical pilot
```

A six-hop query can be a useful exploration horizon. It is not proof of influence, consent, or authority. No graph path, by itself, authorizes outreach, enrichment, disclosure, or CRM mutation. Each resulting transition must still earn standing under the receiving domain's current rules.

## 9. The 2026 Research Landscape: Proposal Quality Is Not Transition Standing

The current research supports a hybrid division of labor: models can improve nomination, comparison, and review, while deterministic systems must decide which declared predicates actually hold. The sources do not endorse AINA, and their results need their original scopes.

| 2026 primary source | What it establishes | How EISA composes with it—without overclaiming |
|---|---|---|
| Teofili et al., [*Can we trust LLM Self-Explanations for Entity Resolution?*](https://arxiv.org/abs/2606.01210), June 2026 preprint | Across three LLMs, ten datasets, and multiple prompting strategies, self-explanations were often unstable, weakly faithful, and poorly aligned with counterfactual evidence. Established post-hoc methods were more trustworthy but costly. | `boundedReason` is audit context, not causal evidence. EISA admission depends on coordinates, comparators, dependencies, and counterevidence—not on the persuasiveness of an explanation. |
| Papadakis et al., [*AgenticER: the next frontier in Entity Resolution*](https://arxiv.org/abs/2607.27435), July 2026 vision paper | Formalizes ER as sequential evidence gathering and decision-making with external sources and selective human involvement; proposes a reference architecture and evaluation dimensions. | Agentic ER needs constitutional checkpoints as iteration increases authority and cost. This is a vision paper, not an empirical superiority result. |
| Smith et al., [*OpenSanctions Pairs*](https://arxiv.org/abs/2603.11051), February 2026 preprint, revised August 2026 | Provides 755,540 expert-labeled pairs from 293 sources across 45 jurisdictions. The rule baseline reached 91.3% F1, GPT-4o 99.0%, and a local DeepSeek model 98.2%; rules and LLMs failed in complementary ways. | Strong pairwise models are valuable proposers. The authors also point attention toward blocking, clustering, and uncertainty review—the exact places where candidate recall, counterevidence, partitions, and human review need separate proof. |
| Kasprova et al., [*Too Polite to Disagree*](https://arxiv.org/abs/2604.02668), April 2026 preprint, revised July 2026; SIGDIAL 2026 | In six open-source model discussions, supplying peer-sycophancy rankings reduced the influence of sycophancy-prone peers and error cascades, improving final accuracy by 10.5 percentage points. | Multi-agent review can be improved, but social mitigation is not deterministic adjudication. EISA does not infer standing from a vote, whether the vote is naive or carefully managed. |
| Deußer et al., [*On the Impact of Anonymization on the Performance of Large Language Models*](https://arxiv.org/abs/2609.11335), September 2026 preprint | Across five models and eleven benchmarks, anonymization effects were task- and model-dependent. Reversible methods preserving entity uniqueness outperformed irreversible approaches; explicitly prompting about anonymization did not help. | Structure-preserving pseudonymization belongs in the transport design, not in a prompt. Semantic Switch's measured restoration still does not prove anonymity or downstream matching accuracy. |
| Deng et al., [*Circuit-MLLM*](https://arxiv.org/abs/2609.15668), September 2026 preprint; ECCV 2026 | Addresses the difficulty dense circuit schematics pose for multimodal models through device localization, path tracing, and topology-guided latent reasoning; reports a 25% higher average score than GPT-5.1 on its tasks. | Topological structure deserves explicit representation and verification. A stronger VLM remains a proposal mechanism; EISA's separate claim is a deterministic proof over committed PDF vector facts. |
| Kogilathota et al., [*HALP*](https://arxiv.org/abs/2603.05465), March 2026 preprint; EACL 2026 | Shows that hallucination risk can be probed before generation across eight VLMs, with up to 0.93 AUROC on several models and architecture-dependent variation. | Early abstention and routing are useful. Risk probes do not prove which connector touches which shape; `AssertLayoutRelation` still requires committed geometry, unique attachments, and direction. |
| [`CVE-2026-71847`](https://nvd.nist.gov/vuln/detail/CVE-2026-71847), August 2026 | Ruby JSON 2.20.0–2.21.x before 2.21.2 could dereference stale pointers and terminate when incomplete attacker-controlled objects containing duplicate keys reached the affected warning path. | Duplicate-key handling is a real parser-security boundary as well as a semantic ambiguity. EISA refuses duplicate keys before schema evaluation rather than delegating meaning to parser defaults. |

The architectural conclusion is not that models are unnecessary. It is that **proposal quality and transition standing are different evidence claims**. Better models reduce the number of bad candidates requiring refusal. They do not remove the need for the refusal boundary.

## 10. The Continuous Wire into the Room

EISA recognition and Room admission share one path. `recognize` previews a verdict; `submit` runs the same recognition logic and records the result. The caller is authenticated, the Room is admitted, the case is loaded and rechecked, and every evidence handle used by a non-faulted act is prepared for that Room. Foreign-Room evidence is refused rather than cited across an authority boundary.

The recorded `squad.eisa.submission/1` payload binds:

- `by` and native `session`;
- `room` and optional `task`;
- the case's bare `artifactHash`;
- the complete recognition result;
- submission time.

Its content identity becomes `eisa_<32hex>`. Citation edges then link that immutable submission to its sealed case and every checked `ev_` handle. Resolved source values stay in the case; the recognized report carries their digests.

```text
server-cut evidence (ev_)
→ sealed case (eisacase_)
→ Four-Gate recognized acts and consensus identities
→ Room submission (eisa_)
→ actor, native session, task, project, and wake authority
→ typed lease and monotonic generation
→ controller-fixed RequestedAct
→ fenced destination mutation and independent observation
→ strict original receipt or non-fabricating successor grant
→ terminal evidence
```

This is the fully wired machine, with authority changing form at every boundary rather than leaking across it. The EISA verdict supplies recognized matter for Room authority evaluation. It does not execute itself. The destination still has to accept the exact act under current ownership, pre-state, time, and release conditions.

## Exhibit E — The Current Room Ledger Envelope

This synthetic `show` response illustrates the current ledger shape with one operative binding. The per-act report remains inside `result`.

```json
{
  "submission": "eisa_7c4e91a02f8b3d651092a8b7c6d5e4f3",
  "room": "architecture-demo",
  "record": {
    "schema": "squad.eisa.submission/1",
    "by": "agent_er_worker_01",
    "session": "worker-mcp:00000000-0000-0000-0000-000000000001",
    "room": "architecture-demo",
    "task": "TSK-2026-ER-001",
    "artifactHash": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
    "result": {
      "version": "EISA_ACT_V1",
      "profile": "eisa.fracture.contact/1",
      "class": "recognized",
      "raw_sha256": "e01928374655647382910abcdef1234567890abcdef1234567890abcdef12345",
      "artifactHash": "4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567",
      "case": "eisacase_3b8f19c04e2a7d6518293a4b5c6d7e8f",
      "acts": [
        {
          "index": 0,
          "id": "act_bind_email_01",
          "opcode": "BindEvidenceTag",
          "class": "operative",
          "identity": "6b8f1029384756ab12cd34ef567890124a9c8e12f03b7d651928374655647382",
          "act_sha256": "01928374655647382910abcdef1234567890abcdef1234567890abcdef123456",
          "canonical": "{\"actor\":\"agent_er_worker_01\",\"artifactHash\":\"4a9c8e12f03b7d651928374655647382910abcdef1234567890abcdef1234567\",\"boundedReason\":\"Both sealed values share one local part.\",\"confidence\":{\"bps\":9400},\"evidenceRefs\":[\"ev_8f31c09a4b2e11d08a7c65e41902b3a1\"],\"opcode\":\"BindEvidenceTag\",\"operands\":{\"coordinates\":[{\"artifact\":\"records\",\"pointer\":\"/email\",\"recordId\":\"rec_101\"},{\"artifact\":\"records\",\"pointer\":\"/contact/workEmail\",\"recordId\":\"rec_102\"}],\"id\":\"act_bind_email_01\",\"tag\":\"EMAIL_LOCAL_MATCH\"},\"sourceEvent\":\"evt_0123456789abcdef_a1b2c3d4\",\"stage\":\"Fracture\",\"version\":\"EISA_ACT_V1\"}",
          "fault": null,
          "observations": [
            {
              "recordId": "rec_101",
              "pointer": "/email",
              "value_sha256": "1111111111111111111111111111111111111111111111111111111111111111"
            },
            {
              "recordId": "rec_102",
              "pointer": "/contact/workEmail",
              "value_sha256": "2222222222222222222222222222222222222222222222222222222222222222"
            }
          ],
          "comparator": "EmailLocalEqual",
          "depends_on": [],
          "evidence_refs": ["ev_8f31c09a4b2e11d08a7c65e41902b3a1"]
        }
      ],
      "classes": { "operative": 1 },
      "decision": "none",
      "partition": null
    },
    "at": "2026-10-31T21:50:00Z"
  }
}
```

The immutable node is constitutional proof matter for the next boundary. It is not a destination receipt.

**Evidence availability:** the EISA implementation, recognition artifacts, and Semantic Switch measurement record are `CONTROLLED` for qualified, method-scoped technical review, with adverse findings permitted. They are not represented as unrestricted public downloads or independent validation. Performance and privacy claims must be evaluated against the declared record population, parser/profile, and deployment threat model.

## Bring One Bounded Protected-Computation Problem

The **Semantic Switch & Entity Resolution Challenge** applies this constitutional layer to one bounded contact, company, product, or other duplicate-record workflow. The demonstration follows Semantic Switch → qBlock → Fracture → Forge → local restoration → Shield and returns a relation-fidelity report, comparator and counterevidence map, exact-restoration record, and the predicates required before any production destination mutation.

The challenge excludes custom schema engineering, production CRM write-back, lead-list generation, universal privacy or matching-accuracy claims, and independent validation. Deployment and paid pilots are separately scoped; independent evaluation remains outside the commercial ladder through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## The Article 03 Claim Card

```text
Mechanism:
  Semantic Switch Protected Computation + EISA Constitutional Act Recognition
  (native-data minimization, relation-isomorphic fictional records,
   qBlock candidates, Fracture, Forge, local exact restoration, Shield,
   strict parsing, sealed cases, pointer law, deterministic comparators,
   Four-Gate recognition, layout proof, and Room ledger)

Failure it governs:
  Native identifiers exposed to external AI computation;
  comparison structure destroyed by destructive redaction;
  ambiguous or schema-valid model prose becoming authority;
  fabricated coordinates and geometry; suppressed counterevidence;
  broken transitive claims; incomplete or contradictory partitions;
  unprotected external comparison; and model votes impersonating proof.

Positive path:
  native records held locally
  → Semantic Switch protected representation
  → qBlock / Qdrant Edge candidates over protected records
  → Fracture partitions and Forge canonical selections
  → local exact restoration through the private crosswalk
  → Shield forward-only baseline defense
  → doc_ / ev_ evidence and eisacase_ sealed records
  → strict EISA_ACT_V1 acts and deterministic recognition
  → squad.eisa.submission/1 as eisa_
  → Room authority, RequestedAct, fenced execution, terminal receipt.

Refusal / non-operative path:
  Whole-submission inadmissibility for malformed envelopes.
  typed_fault with one of 47 registered per-act fault classes.
  counterevidence_suppressed and partition_contradicts_support.
  partition_unsupported_group and relation_indeterminate.
  lawful_non_operative RequestHumanReview and anti_knowledge rejection.
  Foreign-Room, unrevealed, drifted, textless, or out-of-scope evidence refused.

Evidence status:
  EISA: Implemented and Author-Verified on declared wire, graph, and geometry paths.
  Semantic Switch: Implemented, Measured, and Author-Verified on retained executions.
  2,750 inputs; 50 whole blocks; 2,704 fictionalized records;
  27,040 exact field restorations; 46 unblocked records retained;
  20/20 relabeling-invariance blocks; 23/23 exact native edit relations;
  53/53 records and 529/529 field values verified per isomorphic run;
  14/14 batch and 10/10 transformation adversarial cases;
  zero provider calls in retained Stage 1 executions.
  Not Independently Validated; external research does not endorse AINA.

Verifier and artifacts:
  strict::parse, pointer::parse/resolve, Comparator::holds,
  recognize::recognize, case::load, layout::LayoutFact,
  Semantic Switch authenticated crosswalk and release-inventory verifier,
  relation-isomorphism and exact-restoration reports,
  batch and transformation adversarial receipts,
  consensusIdentity, eisacase_, eisa_, cor_/coa_ where views correspond,
  and the Room citation graph.

Scope and claim ceiling:
  Comparators are declared policies, not universal identity semantics.
  Counterevidence and partition scans cover the current admitted submission,
  not every historical or external fact.
  Sealed evidence is not source truth; consensus identity is not independence.
  Semantic Switch establishes transport and relation fidelity, not anonymity or ER accuracy.
  Layout proves only CONNECTS under committed geometry and declared thresholds.
  EISA recognition is not a destination mutation or independent validation.

Next stage in the machine:
  Article 03 protects native computation and recognizes constitutional acts.
  Article 04 binds them to live actors, sessions, tasks, wake delivery,
  acceptance, and current Room authority before execution.

Commercial doorway:
  Semantic Switch & Entity Resolution Challenge — bring one bounded contact,
  company, product, or other duplicate-record workflow; receive a replayable
  protected-computation demonstration, relation-fidelity report, comparator
  and counterevidence map, exact-restoration record, and explicit
  production-integration predicate list (Article 09 · me@blayneaina.com).
```

## Before the Room Can Govern, the Act Must Mean One Thing

Return to the three agents voting for a merger.

The conventional system can report that the vote was unanimous, the JSON matched a schema, and the judge was 97% confident. It still cannot answer which exact values were compared, whether the domain contradiction was included, whether the chain closes, or whether every candidate appears exactly once in the result.

EISA answers those questions mechanically. The duplicate keys are gone. The case is sealed. The pointers resolve. The comparator runs on the actual values. The counter binding stays visible. The transitive path is walked. The partition is checked against every admitted relation and reconstructed with Union-Find. The surviving act receives a canonical identity and enters the Room with actor, session, task, and citation continuity.

Only then does the proposal become something a coordination plane can safely govern.

> **Models propose. EISA recognizes. The Room governs. Execution is fenced. Effects are observed. Every transition closes with evidence.**

Article 04 takes up the next non-equivalence: a recognized act still needs a live authority domain. Git history and chat transcripts cannot supply one.

## Frequently Asked Questions

### Why is JSON Schema or constrained decoding insufficient to govern AI actions?

Constrained decoding establishes shape. It does not resolve record-relative pointers against a sealed case, run deterministic comparators on the values, reject faulted dependencies, force counterevidence into the decision, or prove that a partition is complete, connected, and non-contradicted. EISA also refuses duplicate keys before schema evaluation.

### How does EISA prevent an AI agent from suppressing conflicting evidence?

Every admitted counter binding on a pair must appear in that pair's `counter` array. EISA scans all admitted acts in the submission and returns `counterevidence_suppressed` if one is omitted. Separately, any admitted identity relation crossing a proposed partition boundary causes `partition_contradicts_support`.

### Does `consensusIdentity` prove independent agreement?

No. It proves that two acts encode the same structural transition over the same sealed case after actor, prose, confidence, source event, evidence references, and local IDs are removed. Shared evidence, shared models, and shared mistakes can still produce the same identity.

### Why does Semantic Switch run before qBlock?

Because qBlock and later stages may use external AI computation. Semantic Switch transforms native values first, so Qdrant Edge and qBlock operate on structure-preserving fictional records rather than the declared raw identifiers. Native rows, keys, and the private crosswalk remain local while qBlock nominates candidates for Fracture.

### Is Semantic Switch anonymization?

No. It is deterministic, structure-preserving pseudonymization, with native rows, keys, crosswalks, and restoration mappings retained locally. Its measured exact restoration and relation fidelity do not prove anonymity, cross-block unlinkability, inference resistance, or matching accuracy.

### How does EISA verify flowchart connections without trusting VLM prose?

It seals parser-committed PDF vector facts and evaluates only `CONNECTS`: one stroked open connector, two closed shapes, one marked direction, unique attachments, touch thresholds of 150/200 centi-points, and a maximum 600-centi-point frame gap when an outer frame is involved. Ambiguity becomes `relation_indeterminate`.

### Does an operative EISA verdict execute the proposed transition?

No. It creates recognized constitutional matter and commits it to the Room as `eisa_<32hex>`. Actor eligibility, task and lease authority, controller-fixed execution, destination pre-state, effect observation, and terminal closure remain separate gates.

## Continue the Series

- **Series index:** [From Proposal to Consequence: The AINA Transition-Governance Series](https://blayneaina.com/series/from-proposal-to-consequence)
- **Previous:** [Article 02 — Zero-Trust Document Ingestion and Server-Cut Evidence](https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/)
- **Next:** [Article 04 — The Room: Why Git and Chat Are Not Coordination Planes](https://blayneaina.com/architecture/the-room-coordination-plane/)
- **Deployment and independent review:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)

---

## Primary 2026 Sources

- [Teofili et al. — *Can we trust LLM Self-Explanations for Entity Resolution?*, `arXiv:2606.01210`](https://arxiv.org/abs/2606.01210)
- [Papadakis et al. — *AgenticER: the next frontier in Entity Resolution*, `arXiv:2607.27435`](https://arxiv.org/abs/2607.27435)
- [Smith et al. — *OpenSanctions Pairs: Large-Scale Entity Matching with LLMs*, `arXiv:2603.11051`](https://arxiv.org/abs/2603.11051)
- [Kasprova et al. — *Too Polite to Disagree: Understanding Sycophancy Propagation in Multi-Agent Systems*, `arXiv:2604.02668`](https://arxiv.org/abs/2604.02668)
- [Deußer et al. — *On the Impact of Anonymization on the Performance of Large Language Models*, `arXiv:2609.11335`](https://arxiv.org/abs/2609.11335)
- [Deng et al. — *Circuit-MLLM*, `arXiv:2609.15668`](https://arxiv.org/abs/2609.15668)
- [Kogilathota et al. — *HALP: Detecting Hallucinations in Vision-Language Models without Generating a Single Token*, `arXiv:2603.05465`](https://arxiv.org/abs/2603.05465)
- [NVD — `CVE-2026-71847`, Ruby JSON duplicate-key warning-path use-after-free](https://nvd.nist.gov/vuln/detail/CVE-2026-71847)

---

## Publication Metadata

**Title tag:** Semantic Switch and EISA: Protected Computation and Entity Resolution  
**Meta description:** Semantic Switch protects native data before external AI computation, then qBlock, Fracture, Forge, and Shield turn fictionalized records into governed entity state.  
**Series navigation:** [Series index](https://blayneaina.com/series/from-proposal-to-consequence) · Article 03 of *From Proposal to Consequence: The AINA Transition-Governance Series*.  
**Previous installment:** [Article 02 — Zero-Trust Document Ingestion and Server-Cut Evidence](https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/).  
**Next installment:** [Article 04 — The Room: Why Git and Chat Are Not Coordination Planes](https://blayneaina.com/architecture/the-room-coordination-plane/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/"
      },
      "headline": "Semantic Switch and EISA: Protected Computation and Entity Resolution",
      "alternativeHeadline": "Native Data Stays Local: Semantic Switch, qBlock, Fracture, Forge, Shield, and Deterministic EISA Judgment",
      "description": "Semantic Switch protects native data before external AI computation, then qBlock, Fracture, Forge, and Shield turn fictionalized records into governed entity state.",
      "proficiencyLevel": "Expert",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T10:00:00-06:00",
      "dateModified": "2026-10-31T11:00:00-06:00",
      "position": 3,
      "keywords": [
        "Semantic Switch protected computation",
        "structure-preserving fictionalization",
        "exact native value restoration",
        "relation-isomorphic entity resolution",
        "qBlock Qdrant Edge",
        "EISA Evidence Instruction Set Architecture",
        "deterministic entity resolution"
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
        { "@type": "Thing", "name": "Semantic Switch Protected Computation" },
        { "@type": "Thing", "name": "Relation-Isomorphic Fictionalization" },
        { "@type": "Thing", "name": "Evidence Instruction Set Architecture" },
        { "@type": "Thing", "name": "Deterministic AI Verification" },
        { "@type": "Thing", "name": "Agentic Entity Resolution Governance" },
        { "@type": "Thing", "name": "Structure-Preserving Reversible Pseudonymization" },
        { "@type": "Thing", "name": "PDF Vector Layout Adjudication" }
      ],
      "citation": [
        "https://arxiv.org/abs/2606.01210",
        "https://arxiv.org/abs/2607.27435",
        "https://arxiv.org/abs/2603.11051",
        "https://arxiv.org/abs/2604.02668",
        "https://arxiv.org/abs/2609.11335",
        "https://arxiv.org/abs/2609.15668",
        "https://arxiv.org/abs/2603.05465",
        "https://nvd.nist.gov/vuln/detail/CVE-2026-71847"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/#breadcrumb",
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
          "name": "Semantic Switch and EISA: Protected Computation and Entity Resolution",
          "item": "https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/"
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
  "@id": "https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Why is JSON Schema or constrained decoding insufficient to govern AI actions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Constrained decoding establishes shape. It does not resolve record-relative pointers against a sealed case, run deterministic comparators on the values, reject faulted dependencies, force counterevidence into the decision, or prove that a partition is complete, connected, and non-contradicted. EISA also refuses duplicate keys before schema evaluation."
      }
    },
    {
      "@type": "Question",
      "name": "How does EISA prevent an AI agent from suppressing conflicting evidence?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every admitted counter binding on a pair must appear in that pair's `counter` array. EISA scans all admitted acts in the submission and returns `counterevidence_suppressed` if one is omitted. Separately, any admitted identity relation crossing a proposed partition boundary causes `partition_contradicts_support`."
      }
    },
    {
      "@type": "Question",
      "name": "Does `consensusIdentity` prove independent agreement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It proves that two acts encode the same structural transition over the same sealed case after actor, prose, confidence, source event, evidence references, and local IDs are removed. Shared evidence, shared models, and shared mistakes can still produce the same identity."
      }
    },
    {
      "@type": "Question",
      "name": "Why does Semantic Switch run before qBlock?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because qBlock and later stages may use external AI computation. Semantic Switch transforms native values first, so Qdrant Edge and qBlock operate on structure-preserving fictional records rather than the declared raw identifiers. Native rows, keys, and the private crosswalk remain local while qBlock nominates candidates for Fracture."
      }
    },
    {
      "@type": "Question",
      "name": "Is Semantic Switch anonymization?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It is deterministic, structure-preserving pseudonymization, with native rows, keys, crosswalks, and restoration mappings retained locally. Its measured exact restoration and relation fidelity do not prove anonymity, cross-block unlinkability, inference resistance, or matching accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "How does EISA verify flowchart connections without trusting VLM prose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It seals parser-committed PDF vector facts and evaluates only `CONNECTS`: one stroked open connector, two closed shapes, one marked direction, unique attachments, touch thresholds of 150/200 centi-points, and a maximum 600-centi-point frame gap when an outer frame is involved. Ambiguity becomes `relation_indeterminate`."
      }
    },
    {
      "@type": "Question",
      "name": "Does an operative EISA verdict execute the proposed transition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It creates recognized constitutional matter and commits it to the Room as `eisa_<32hex>`. Actor eligibility, task and lease authority, controller-fixed execution, destination pre-state, effect observation, and terminal closure remain separate gates."
      }
    }
  ]
}
</script>
