---
title: "Zero-Trust Document Ingestion and Server-Cut Evidence"
subtitle: "Hostile bytes need a parser jail. Enterprise judgments need a server-computed evidence chain. Neither a RAG chunk nor a model-written citation can supply one."
author: "Blayne Aina"
datePublished: "2026-10-31T09:00:00-06:00"
dateModified: "2026-10-31T17:30:00-06:00"
canonicalUrl: "https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/"
series: "From Proposal to Consequence: The AINA Transition-Governance Series"
position: 2
description: "Why RAG chunks, file paths, and agent-written citations are not evidence: inside AINA's LPAC-confined parser, omission ledger, canonical views, and server-cut srv_ and ev_ handles."
keywords:
  - zero-trust document ingestion
  - server-cut evidence
  - server-cut citations
  - citation integrity architecture
  - RFC 8785 JCS
  - Windows LPAC document parser
  - document parser sandbox
  - RAG evidence provenance
  - AI citation provenance
  - bounded absence verification
  - multi-agent echo chambers
  - EISA evidence world
isAccessibleForFree: true
inLanguage: en-US
---

# Zero-Trust Document Ingestion and Server-Cut Evidence

*Hostile bytes need a parser jail. Enterprise judgments need a server-computed evidence chain. Neither a RAG chunk nor a model-written citation can supply one.*

**By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026**

---

An AI document reader has two ways to lose.

The file can attack the host. A malformed PDF stream, a cyclic object graph, a decompression bomb, or a pathological workbook can turn an innocent `read_document` call into a resource-exhaustion event inside the most privileged process in the system.

The model can attack the evidence. It can quote a sentence that was never served, cite a page that does not contain the claim, treat an un-OCRed scan as empty, confuse an agent-supplied excerpt with a captured original, or transform three repetitions of one observation into apparent consensus.

A trustworthy pipeline must confine the parser **and** make the citation coordinates server-computed facts.

This is the epistemic boundary of the AINA transition-governance machine. Article 01 established that an AI output is a proposal, not an act. This installment builds the world in which that proposal can be judged: exact source bytes, confined extraction, explicit omissions, immutable views, served-content receipts, server-cut citations, bounded findings, and origin-preserving lineage.

> **Before EISA can recognize an act, the system must establish what may be known, cited, and compared—and what remains unknown.**

## The Evidence World Is a Governed Artifact

A conventional retrieval pipeline often looks like this:

```text
path → loader → text chunks → embeddings → model context → answer with citations
```

That pipeline can be useful for search. It does not establish an execution-grade evidence world. A chunk does not prove which source revision produced it. A flattened string does not reveal what the parser dropped. A model-written page number does not prove that the model received the quoted passage. A second agent repeating the first agent's summary does not create a second observation.

Consider a renewal agent that answers, “Annual increases are capped at 3.0%, and there is no change-of-control clause.” The first conclusion needs an exact served passage. The second needs proof that every place that could contain the clause was actually examined—including the scanned page that produced no text. Those are different evidence burdens, and a fluent answer satisfies neither by default.

AINA replaces the chain with a governed sequence:

```text
SOURCE BYTES
  registered identity · single-open bounded capture · SHA-256
                         │
                         ▼
CONFINED PARSER
  content-decided format · LPAC · Job Object · budgets · typed refusals
                         │
                         ▼
CANONICAL EVIDENCE VIEW
  ViewManifest · parser/limits identity · extraction status · omission nodes
                         │
                         ▼
SERVED CONTENT — srv_ receipt
  recipient/session · exact view and intervals · complete/chunked/truncated delivery
                         │
                         ▼
SERVER-CUT EVIDENCE — ev_ handle
  receipt verified · quote found and disambiguated · server-computed selector
                         │
                         ▼
BOUNDED FINDINGS
  typed predicates · acknowledged absence gaps · reassessment · origin lineage
```

The `srv_` receipt proves what the Room served. The `ev_` handle proves what the server issued from that serving. Neither proves that the underlying source is true or that the model's interpretation is correct.

Every arrow changes the evidentiary state. None is allowed to borrow the assurance of a later stage.

| Local fact | What it cannot prove by itself |
|---|---|
| The path ends in `.pdf`, or the response declares a PDF media type. | The bytes are a PDF, or the correct parser was selected. |
| The parser returned text without crashing. | Every text-bearing part was recovered, or every warning was benign. |
| The extraction is complete for its declared profile. | The source is complete, true, visually understood, or free of excluded content. |
| The model supplied a quote and page number. | The exact quote occurred in content served to that caller. |
| The citation resolves cryptographically. | The underlying document is authentic, current, or worldly true. |
| Several agents cite the same conclusion. | Their claims rest on distinct first-hand observations or independent sources. |

The constitutional rule is simple: **unknown coverage must remain visible as unknown coverage**. It cannot disappear into a clean answer.

## 1. Registration: Bind Identity to the Bytes Actually Read

The evidence chain begins before parsing. `doc_source` registration resolves the caller through the Room's actor rules, requires an owner-opened project, canonicalizes the target through the same file-identity machinery used by governed writes, and refuses controller-state and recovery-storage roots. The protected-root test runs at registration **and again at read time**. A historical registry entry cannot turn control storage into a shared document, and a document registration does not outlive its project admission.

### Single-open capture

On Windows, `source::capture_optional` opens the file once with `share_mode(1)`, equivalent to `FILE_SHARE_READ`. While that handle remains open, other processes cannot open the same file for write or delete sharing. The reader takes at most **64 MiB plus one byte**, refuses anything above the 64 MiB ceiling, and computes SHA-256 over the buffer actually read.

This ordering matters:

```text
open once with FILE_SHARE_READ
→ read a bounded buffer
→ hash that buffer
→ verify that buffer against the registered digest
→ hand those same bytes to the confined parser
```

The size limit is enforced by the read itself, not by a preceding `stat`. The digest is not computed over one open and then attached to bytes read through another. Downstream extraction receives a `Captured` buffer, not a path it can reopen.

That eliminates the intra-read time-of-check/time-of-use window. It does not magically freeze the file forever. For a task whose governing source must remain stable across execution, `TaskSourcePin` opens the canonical file again with `FILE_SHARE_READ`, verifies the opened handle's kernel identity and exact bytes, requires the governing reading proof, and holds the handle for the task's execution window.

Two reading policies also remain distinct:

- The extraction profile recorded in the parser identity is **`text/v1`**.
- The task's governing-source reading policy is **`complete_text_v1`**, backed by the required source-reading coverage proof.

They are related, but they are not interchangeable labels.

### Amber retention is a separate observation

Registration archives the source into the content-addressed Amber recovery tier and refuses to complete if that archive fails. This retention is deliberately described with a precision boundary: `source::capture` performs the single-open read-and-hash capture; `vault::archive_only` performs a **separate filesystem observation** during registration.

The archive is not claimed to share the capture's file descriptor. Hiding that distinction would make the architecture sound stronger by making its evidence less honest.

### Drift is not a new version of the old citation

Every ordinary resolve rechecks the registered source. If the live bytes no longer match the registered digest, the committed view is not silently served as though it were current. The refusal is `drifted`; capture and verification paths use `doc_source_drifted` where that stable operator code applies.

A reader must explicitly register the new revision. A separately authorized historical-inspection path may serve the old view, but its delivery record marks `historical: true`. History is labeled history.

This produces three useful non-equivalences:

```text
same path                    ≠ same source revision
same source revision         ≠ same parser or extraction configuration
old citation still resolving ≠ old citation is currently authoritative
```

## 2. Content Decides the Format—Inside the Jail

Format identification is itself parsing. A ZIP central directory must be inspected before the system can know whether a package is a DOCX, an XLSX, or an ordinary archive. That means identification cannot safely occur in the controller while only the resulting parser is confined.

AINA performs identification and extraction in the restricted worker. Byte signatures and container structure take priority; extensions break defined ties. The current `Kind` enum has **22 variants**, but that is not a claim of universal file support: `Unknown` is deliberately unsupported, `Image(format)` is a parameterized family, and `EncryptedOffice` has a typed refusal rather than a text reader.

| `Kind` variant | Content or structural identity | Extraction or typed outcome |
|---|---|---|
| `Pdf` | `%PDF-` signature | Structural PDF extraction, layout, annotations, and admitted local OCR paths |
| `Json` | `.json` or `.jsonld` tie-break after higher-priority signatures | UTF-8 JSON document with bounded RFC 6901 source locators |
| `Doc` | OLE2 plus `WordDocument` and a valid binary Word probe | Binary Word FIB and piece-table reconstruction |
| `Docx` | ZIP package with Word document structure or an allowed OOXML extension tie-break | Body, tables, headers, footers, notes, comments, and revision accounting |
| `Ppt` | OLE2 plus `PowerPoint Document` and a valid binary PowerPoint probe | Binary presentation record-tree text |
| `Pptx` | ZIP package with PowerPoint presentation structure or an allowed extension tie-break | Slides, notes, comments, and relationships |
| `Rtf` | `{\rtf` signature or `.rtf` | Bounded RTF control-word and encoding state machine |
| `Xlsx` | ZIP package with `xl/workbook.xml` or an allowed extension tie-break | Workbook, cell, cached-value, formula, and comment extraction |
| `Xlsb` | ZIP package with `xl/workbook.bin` | Binary workbook extraction |
| `Xls` | OLE2 `Workbook`/`Book` probe, or `.xls`/`.xla`/`.xlt` fallback | BIFF workbook extraction |
| `Ods` | ODF `mimetype` for a spreadsheet | OpenDocument spreadsheet extraction |
| `Odt` | ODF `mimetype` for text | OpenDocument text extraction |
| `Odp` | ODF `mimetype` for a presentation | OpenDocument presentation extraction |
| `Eml` | `.eml` or bounded RFC 5322-style header recognition | MIME tree, headers, body, and recursive child sources |
| `Msg` | OLE2 property streams plus root-property probe | MAPI properties, body, and attachments |
| `Zip` | ZIP signature without a more specific package identity | Bounded archive inventory and child extraction |
| `Html` | Decodable HTML, an HTML extension tie-break, or declared legacy HTML bytes | DOM-derived reading text plus preserved markup story |
| `Text` | Successful strict text decoding without HTML identity | Normalized text stories and line elements |
| `EncryptedOffice` | OLE2 `EncryptedPackage` | `encrypted` / `doc_source_extraction_failed`, never fake empty text |
| `Ole2` | Other OLE2 compound storage | Embedded-object extraction or a named refusal |
| `Image(format)` | Valid image signature and header | Header inventory and admitted OCR behavior under the selected profile |
| `Unknown` | No supported identity | `unsupported_format`, never an empty successful document |

This is allowlisted recognition, not extension trust and not a promise to parse every file on earth.

### Fourteen budgets govern expansion

The outer operating-system jail is the backstop. Inside it, a 14-field `Limits` object admits expensive work before expansion and charges actual output. Callers may ratchet limits downward; zero and values above the ceiling are rejected. The exact limits are serialized with RFC 8785 JCS and hashed into `limits_sha256`, so changing a budget changes extraction identity.

| Limit | Default ceiling | Failure it bounds |
|---|---:|---|
| `max_child_bytes` | 32 MiB | Oversized attachment, archive member, or embedded child |
| `max_item_decompressed` | 64 MiB | Single-stream or single-member expansion |
| `max_total_decompressed` | 256 MiB | Cumulative decompression across the document and children |
| `max_parts` | 20,000 | Container-entry, mail-part, and page floods |
| `max_nesting` | 3 | Recursive child-source descent |
| `max_xml_depth` | 256 | Deep or amplifying XML structure |
| `max_pdf_objects` | 500,000 | PDF object-graph amplification |
| `max_form_depth` | 8 | Recursive PDF Form XObjects |
| `max_cells` | 2,000,000 | Spreadsheet cell explosion |
| `max_elements` | 250,000 | Addressable-element flood; later text may still be extracted without receiving nodes |
| `max_output_chars` | 32 MiB | Extracted character-volume exhaustion |
| `max_wall_ms` | 60,000 ms | Parser CPU/time overrun, with a 15-second outer kill allowance |
| `max_image_pixels` | 16,000,000 | Single-image pixel expansion, admitted before decode |
| `max_total_pixels` | 64,000,000 | Aggregate pixel expansion across pages and children |

Budget refusal is evidence. It becomes a typed `budget_exceeded` condition rather than a partial answer with the exhaustion removed from the story.

## 3. The Parser Jail: Prove Confinement Before Resume

A sandbox named in a configuration file is not a sandbox observed in a child token. AINA's document worker is built around pre-resume verification.

### Private staging

Each parse receives an ephemeral scratch tree with three distinct grants:

- `bin/`: a private read-execute copy of `squad-doc-extract.exe`, so the jail need not read the installation directory.
- `input/`: read-only `source.bin` and a bounded `doc_source.worker/1` request containing the expected input digest and extraction limits.
- `work/`: the only writable grant, including a jail-local temporary directory and a `result.json` opened with `create_new(true)`.

The child recomputes the input digest before parsing. The supervisor bounds the result at 256 MiB, checks the response schema and input digest, and validates the returned extraction structure. Child output remains untrusted data even though the child was confined.

### Six-step launch contract

1. **Exclusive AppContainer identity.** A fresh per-parse profile is created. An already-existing profile is a `confinement_identity_reused` failure, not an invitation to share a jail.
2. **LPAC policy.** `PROCESS_CREATION_ALL_APPLICATION_PACKAGES_OPT_OUT` removes the implicit `ALL APPLICATION PACKAGES` access that would otherwise widen filesystem and registry reads.
3. **Minimal capabilities.** The document-media profile grants exactly `lpacCom`. Network, registry-read, and credential capabilities are not granted.
4. **Suspended creation and token inspection.** The process starts suspended. Before `ResumeThread`, the supervisor verifies that the token is AppContainer, carries the fresh package SID, has the non-zero `WIN://NOALLAPPPKG` attribute, and contains exactly the expected capability set. A mismatch kills the child before its initial thread executes.
5. **Job Object backstop.** While suspended, the child enters a kill-on-close Job Object with `ActiveProcessLimit = 1`, a 2 GiB job-memory ceiling, and a 25% hard CPU-rate cap. EcoQoS reduces scheduling priority; internal runtime thread pools are capped at two. The job is registered with break-glass observation so sovereign revocation covers in-flight parsers.
6. **Audited teardown.** The supervisor records `scratch_removed` and `profile_deleted` in the worker receipt. Cleanup failure is disclosed rather than rewritten into success.

```text
verified Captured bytes
→ read-only input grant + expected digest
→ CREATE_SUSPENDED
→ AppContainer SID + LPAC attribute + exact capabilities verified
→ Job Object process/memory/CPU limits assigned
→ ResumeThread exactly once
→ content identification + budgeted extraction + warning capture
→ digest-bound result.json
→ supervisor schema and structural validation
→ worker Receipt + scratch/profile teardown disclosure
```

Parser panics become `parser_fault`. A panic isolated to one embedded child fails that child while preserving the parent and sibling reads; a top-level panic invalidates the extraction. On non-Windows, the untrusted-document path refuses with `parser_worker_unavailable` rather than pretending that an ordinary subprocess is equivalent to LPAC plus a Job Object.

This is the Windows reference embodiment's claim ceiling: bounded process, capability, network, memory, CPU, and filesystem exposure on the governed parser path—not proof that every parser is bug-free or that a privileged host administrator cannot attack the machine.

## 4. Extraction Is Not Complete If the Gaps Disappear

A parser that returns a string has answered only one question: what text did this adapter emit? It has not established whether the document contained more text, whether a library recovered by discarding structure, or whether the caller later received everything extracted.

AINA keeps five status dimensions separate.

| Dimension | Values | Question answered |
|---|---|---|
| `Integrity` | `verified`, `failed` | Did the captured bytes match the registered identity and integrity checks? |
| `Inventory` | `complete_for_profile`, `partial`, `unknown` | Could the adapter enumerate the document's parts and establish a denominator? |
| `Extraction` | `complete_for_profile`, `partial`, `unsupported`, `failed` | Was every in-profile, text-bearing part recovered without lossy omission? |
| `Admission` | `allowed`, `blocked` | Is this source currently readable by this actor under project and Room policy? |
| `Delivery` | `complete`, `truncated`, `chunked` | Did this response serve everything requested, or only a bounded window? |

The immutable document report carries integrity, inventory, and extraction. Admission and delivery are facts about a particular serving. A fully extracted document shown through a 60-character window remains fully extracted **and** incompletely delivered. Those facts must not collapse into one green status.

### The 35-reason omission ledger

The current `Reason` alphabet has 35 variants: **12 non-lossy profile exclusions and 23 lossy reasons**. `nesting_limit` belongs to the non-lossy set in the current implementation; it is not counted twice.

| Classification | Exact variants | Consequence |
|---|---|---|
| **Profile-excluded, non-lossy (12)** | `binary_part`, `structure_only`, `embedded_font_program`, `image_content`, `media_content`, `deleted_revision`, `external_relationship`, `macro_content`, `derived_alternative`, `nesting_limit`, `structure_unavailable`, `markup_not_rendered` | Recorded for transparency without, by itself, forcing partial extraction or blocking absence evaluation |
| **Lossy (23)** | `ocr_not_enabled`, `ocr_unavailable`, `unsupported_format`, `unsupported_part`, `unsupported_compression`, `unmapped_glyphs`, `font_encoding_unavailable`, `undecodable_text`, `stream_decode_failed`, `content_stream_invalid`, `object_missing`, `malformed`, `sheet_read_failed`, `formula_unavailable`, `encrypted`, `encrypted_entry`, `duplicate_entry_name`, `duplicate_member_name`, `multi_disk_archive`, `budget_exceeded`, `library_warning`, `parser_fault` | Forces partial/failed/unsupported handling and creates unknown coverage that an absence claim must acknowledge when in scope |

Non-lossy does not mean irrelevant. It means the omission is expected under the declared extraction profile. A deleted revision excluded by `text/v1` may still matter enormously to a human reviewer; the profile must therefore be visible beside the claim.

### Parser warnings become evidence

The confined child installs a `log::Log` interceptor at warning level. It preserves up to 1,000 observations, truncates each message at 2,000 characters, and counts overflow. Every warning becomes an observation. Except for one explicitly content-neutral PDF trailer normalization, every warning also becomes a lossy `library_warning` omission at document scope.

A library's lenient recovery can therefore never silently upgrade itself to `complete_for_profile`.

The omission collector has its own memory defense: at most 2,000 distinct omission tuples are retained, and additional occurrences are counted into a terminal budget-overflow record. Identical adapter omissions aggregate by location, reason, scope, and story. The coverage ledger cannot be allowed to become the denial-of-service vector it exists to report.

### Gaps are addressable nodes

When the view is committed, omissions become `omission/1`, `omission/2`, and so on. A whole-document failure is `failure`; inventory status is `inventory`; each nested source is `child:<locator>`. These nodes carry no extracted text, but they can be outlined, cited, reviewed, and included in absence analysis.

That is the difference between “the model said nothing was there” and “the system can identify exactly where its knowledge stops.”

### Exhibit 1 — A synthetic `ViewManifest` with an addressable omission

The following is structurally faithful to `squad.evidence.view/1`, with synthetic identities and hashes. The view digest is computed over the manifest's JCS bytes; it is not a mutable field inside the manifest.

```json
{
  "schema": "squad.evidence.view/1",
  "report_schema": "doc_source.report/2",
  "source": {
    "revision": "doc_20261030_142011_a1b2c3d4",
    "sha256": "58b2e91f4c03d8a7126590ef4312ab98c7654321fedcba09876543210fedcba9",
    "bytes": 12345,
    "name": "renewal.pdf",
    "canonical_path": "project:/evidence/renewal.pdf",
    "registered_at": "2026-10-31T14:20:11Z"
  },
  "origin": "room_captured",
  "parser": {
    "name": "squad-doc-source",
    "profile": "text/v1",
    "digest": "4b9c210e8f1a77d4c0592a1e38f47c1190ab2d3e4f5061728394a5b6c7d8e9f0",
    "features": "synthetic-parser-feature-profile"
  },
  "config": {
    "limits": {
      "max_child_bytes": 33554432,
      "max_item_decompressed": 67108864,
      "max_total_decompressed": 268435456,
      "max_parts": 20000,
      "max_nesting": 3,
      "max_xml_depth": 256,
      "max_pdf_objects": 500000,
      "max_form_depth": 8,
      "max_cells": 2000000,
      "max_elements": 250000,
      "max_output_chars": 33554432,
      "max_wall_ms": 60000,
      "max_image_pixels": 16000000,
      "max_total_pixels": 64000000
    },
    "limits_sha256": "84e01b92c7d34f56a1230987654321fedcba9876543210abcdef0123456789ab"
  },
  "format": "pdf",
  "status": {
    "integrity": "verified",
    "inventory": "complete_for_profile",
    "extraction": "partial"
  },
  "inventory_total": 2,
  "inventory": [],
  "stories": [
    {
      "id": "page:1",
      "kind": "page",
      "locator": { "kind": "page", "page": 1 },
      "primary": true,
      "method": "pdf_text_operators",
      "text": "Section 4.2 Renewal Cap: Annual uplift shall not exceed 3.0%."
    }
  ],
  "elements": [
    {
      "id": "page:1!BT:0",
      "story": "page:1",
      "kind": "text_object",
      "span": { "start": 0, "end": 61 },
      "locator": { "kind": "page_element", "page": 1, "element": "BT", "ordinal": 0 }
    }
  ],
  "omissions": [
    {
      "id": "omission/1",
      "omission": {
        "location": "page:2/image:1",
        "stage": "extract",
        "reason": "ocr_not_enabled",
        "scope": "page",
        "detail": "page 2 contains a raster scan and local OCR is disabled",
        "count": 1
      }
    }
  ],
  "children": [],
  "observations": []
}
```

The extracted cap is citable. So is the fact that page 2 was not OCRed. Neither fact may impersonate the other.

## 5. Immutable Views: Identity Includes the Reader

Two systems can read identical bytes and produce different evidence because their parsers, profiles, feature sets, or limits differ. AINA therefore binds a view to all of them:

```text
source revision + source SHA-256
+ parser name + parser source/build digest + text/v1 profile + feature profile
+ exact 14-field limits + limits_sha256
+ report schema + view schema
+ stories + elements + omissions + children + observations
= canonical ViewManifest
```

RFC 8785 JSON Canonicalization Scheme (JCS) gives the manifest one deterministic serialization. Object keys are sorted as UTF-16 code-unit sequences, insignificant whitespace disappears, non-finite numbers are refused, integers beyond exact IEEE-754 range are not rounded, and nesting is capped at 128. String content is escaped but **not Unicode-normalized or whitespace-rewritten**.

The SHA-256 of those canonical bytes is the 64-hex view digest.

### Commit children first, then seal the parent

Attachments, archive members, and embedded workbooks are sources in their own right. Their revisions compose the parent revision, an encoded member locator, and the child SHA-256. Their views commit first; the parent's `child:<locator>` nodes then name the resulting child digests or failures. Child text is never promoted into the parent as though it had been read in the parent's own story.

The commit runs inside the Room's cross-process `with_transition` serialization. A `begin` provenance node records the attempted view, the canonical artifact is stored by digest, and a `complete` node plus index closes the commit. Repeating the same manifest in the same Room resolves to the existing view rather than rewriting it.

Loading is equally strict. The resolver checks the artifact's recorded digest, hashes the served bytes, re-canonicalizes the parsed value, and compares canonical form. One altered byte or non-canonical repair yields `view_digest_mismatch`.

A new parser or configuration creates a new view. It does not retarget old citations. Historical identity survives; current authority must be re-established.

## 6. Server-Cut Evidence: `srv_` Before `ev_`

A server-cut citation is not a model emitting a prettier reference format. It is a two-event protocol.

### Event 1: the Room serves content and issues `srv_`

The `squad.evidence.receipt/1` record binds:

- the Room, source revision, and view digest;
- the recipient and recipient session;
- the serving tool;
- each node and optional character interval served;
- delivery counts and `complete`, `truncated`, or `chunked` status;
- admission, optional via-handle or wake identity, time, and nonce.

The receipt identifier is `srv_` plus the first 32 hexadecimal digits of the receipt's canonical SHA-256.

`read`, `resolve`, and `wake_delivery` are content-serving tools. `outline` is different: it serves structure and coverage metadata. An outline receipt can ground a textless `omission/N`, `failure`, `inventory`, or `child:<locator>` node. It cannot ground a quotation from a text block the caller was never served.

### Event 2: the Room computes the citation and issues `ev_`

The caller submits a receipt plus an exact quote, or a node it was served. For a quote, the caller may supply a node hint or a one-based occurrence when text repeats. The caller does **not** supply authoritative character offsets.

The server then:

1. verifies that the receipt belongs to the caller;
2. loads and reverifies the canonical view;
3. rechecks source admission and drift;
4. searches only the content covered by that receipt;
5. refuses zero matches with `quote_not_found` and unresolved repetition with `quote_ambiguous`;
6. computes Unicode-scalar coordinates;
7. selects the innermost covering element with `View::narrowest`, falling back to the story;
8. checks that the selected range was actually served;
9. issues a content-addressed `ev_` handle whose issuance record includes the canonical `EvidenceRef`, basis, Room, issuee, and first-hand lineage.

```text
agent:  receipt + exact quote (+ optional occurrence)
server: served? → current? → unique? → narrowest node? → selector in bounds?
agent:  receives ev_ handle; receives no authority to invent its coordinates
```

### Exhibit 2 — A valid synthetic citation issuance

```json
{
  "handle": "ev_6c8f1029384756ab12cd34ef56789012",
  "issuance": {
    "schema": "squad.evidence.handle/1",
    "envelope": {
      "version": 1,
      "source_revision": "doc_20261030_142011_a1b2c3d4",
      "view_digest": "a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f809",
      "node_id": "page:1!BT:0",
      "selector": {
        "kind": "bounded_subrange",
        "unit": "unicode_scalar",
        "start": 25,
        "end": 61
      },
      "source_native_locator": {
        "kind": "page_element",
        "page": 1,
        "element": "BT",
        "ordinal": 0
      },
      "role": "supporting",
      "visibility": "all",
      "origin": "room_captured"
    },
    "envelope_digest": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "room": "architecture-demo",
    "issued_to": "analyst-alpha",
    "issued_at": "2026-10-31T14:20:15Z",
    "basis": {
      "kind": "receipt",
      "receipt": "srv_91d2e3f4a5b6c7d80123456789abcdef"
    },
    "lineage": {
      "first_hand": true,
      "origin": "analyst-alpha"
    },
    "nonce": "synthetic-nonce-001"
  }
}
```

The handle proves which exact passage was issued to which actor on which view and receipt basis. It does not prove that the contract is authentic, that 3.0% is commercially reasonable, or that page 2 agrees.

### Refusal is part of the citation grammar

Paths and URLs are refused with `not_a_path`. Raw hashes, hand-built offsets, and similar manufactured references are refused with `agent_manufactured_ref`. Unknown well-formed handles yield `ev_unknown`. Foreign-receipt use is `access_denied`; content outside the receipt is `not_served` or `quote_not_found`. Reserved locator kinds and offset units fail by name rather than being loosely accepted.

### Exhibit 3 — `quote_ambiguous`

The actual refusal is an error string; it is shown here as a JSON string with synthetic occurrence data abbreviated for publication.

```json
"quote_ambiguous: the quotation occurs 3 times in the served content; name one with occurrence: [{\"occurrence\":1,\"node\":\"page:1!BT:0\"},{\"occurrence\":2,\"node\":\"page:3!BT:1\"},{\"occurrence\":3,\"node\":\"page:7!BT:2\"}]"
```

The server does not choose the most convenient occurrence. The caller must disambiguate.

### Exhibit 4 — `drifted`

```json
"drifted: project:/evidence/renewal.pdf no longer holds the registered bytes (registered 58b2e91f4c03d8a7126590ef4312ab98c7654321fedcba09876543210fedcba9, current c0ffee99887766554433221100ffeeddccbbaa99887766554433221100ffeedd); the committed view is not served in its place — re-register, or request authorized historical inspection"
```

The old view remains intact. Its current evidentiary role does not.

## 7. Network Capture: Authorize Every Hop, Not Just the First URL

Documents also arrive through retrieval. A fetch tool that authorizes only the initial URL can be redirected into a loopback service, private network, or cloud metadata endpoint. The safe rule is not “validate the first destination”; it is **authorize the destination before every request**.

AINA's capture client disables automatic redirects with `redirect::Policy::none()`. It follows redirects manually, up to ten, and calls `authorize_url` on each current URL before sending. Every hop records its URL, status, optional content type and `Location`, and declared security headers.

The final body is capped at 8 MiB. A body cut by that ceiling becomes a `snippet` with `truncated: true`, not a complete response. The exact bytes are stored as a Room artifact, hashed, and parsed through the same confined worker. Every fetch is a new `cap_` capture; re-fetching a URL never overwrites the earlier observation.

### Captured, supplied, and governing are different roles

| Origin and root | What the Room observed | May anchor a governing requirement? |
|---|---|---|
| `room_captured` + `doc_…` | Registered bytes captured from admitted project territory | Yes, after first-hand serving and the other requirement checks |
| `room_captured` + `cap_…` | A response body fetched through the Room's egress-gated path | No; research capture is not a registered governing document |
| `agent_supplied` + `cap_…` | Text an agent pasted with a claimed, unverified origin | No; citing it cites the supplier, not the claimed source |

An agent-supplied excerpt is not inherently false. It is explicitly labeled evidence of what the agent supplied. It cannot be laundered into a Room observation merely because its bytes match a real document.

The same boundary applies to web research: egress authorization and immutable capture establish provenance, not truth and not permission for retrieved instructions to govern the system.

## 8. Findings: Claims the Server Can Re-Evaluate

A citation establishes a passage. A finding states something checkable about it.

The evaluator supports five typed assertions:

- **`equals`** — exact text or typed-value equality.
- **`in_range`** — a typed numeric value against minimum/maximum bounds, with an optional unit check when the view knows the unit.
- **`matches_regex_bounded`** — a pattern capped at 512 characters, compiled with 1 MiB size limits and nesting depth 32.
- **`exists`** — the selected text or structural node exists.
- **`formula_equals`** — exact comparison against a spreadsheet formula node, including the formula associated with a cached-value cell.

The interpreter remains separate from the machine-checked assertion. A model may offer a bounded interpretation, but the server re-evaluates the predicate against the committed view.

A false predicate is not deleted to make the ledger look clean. The `fnd_` finding and failed `evl_` evaluation are persisted, and only then does the call return `predicate_false`. Failed claims remain failed matter.

### Absence is a coverage claim before it is a search claim

“No change-of-control clause exists in this contract” is much stronger than “the phrase did not occur in the chunks I saw.” It requires an inventory of what was examined and an explicit account of what remains unknown.

For an absence claim, the server derives required unknown-coverage markers:

- `failure` for failed or unsupported extraction;
- `inventory` when enumeration is partial or unknown;
- every in-scope lossy `omission/N`;
- every `child:<locator>` for whole-document scope, because child text is not merged into the parent's searched stories.

The caller supplies `acknowledged_gaps` as the relevant **node IDs**. These are not authoritative character offsets and are not a second set of fabricated evidence references. The server checks that every required marker is acknowledged and that every acknowledged marker exists in the view. Outline receipts can be used to cite and inspect those textless markers.

Only then does the evaluator search for the phrase or bounded pattern. A successful negative result means, precisely:

> The phrase is absent from the content this view examined; acknowledged gaps remain unknown, not absent.

### Exhibit 5 — `absence_unsupported`

```json
"absence_unsupported: the claimed scope has unknown coverage; an absence claim must acknowledge each marker at its narrowest known location: omission/1"
```

The server refuses to let a missing OCR pass become proof that page 2 contains nothing.

## 9. Revision, Reassessment, and Correspondence Without Retargeting

Evidence is allowed to change. History is not allowed to move underneath its citations.

When a new view is committed for a source, dependent findings, evaluations, and requirements receive deterministic `rsa_` reassessment flags. Requirement amendments form `reqrev_` revision chains; task evidence manifests (`man_`) pin the admitted source and optional view context. A task or handoff cannot silently complete over evidence now marked for reassessment.

Cross-version correspondence is a separate, explicit operation:

1. `correspond` proposes candidate locations in a later view.
2. The candidate search has four stages, with a separate same-kind rule for textless structural nodes: `same_node_same_text`, `same_node_same_kind`, `exact_text`, `normalized_text`, then the weak `same_node_changed_text` fallback.
3. The reviewer must actually be served the candidate in the later view.
4. `adopt-correspondence` records `coa_`, creates a **new** `ev_` handle, and adds a `corresponds_to` relation.
5. The old handle remains bound to its old view. A requirement-role handle adopted through correspondence becomes supporting evidence in the new view rather than silently carrying governing authority forward.

```text
old view + old ev_ handle ───────────────→ remains historically pinned
       │                                         │
       ├─ new view committed ─→ rsa_ reassessment flags on dependents
       │                                         │
       └─ cor_ proposal → candidate served in new view
                                      ↓
                         coa_ adoption + new ev_ handle
                                      ↓
                         corresponds_to relation; no retargeting
```

This is the difference between provenance and path mutation. The system can say how two observations correspond without pretending they are the same observation.

## 10. Echo Collapse: Count First-Hand Origins, Not Repetitions

Multi-agent systems are particularly good at making repetition look like corroboration. Agent A reads a passage. Agent B cites A's finding. Agent C cites B's summary. The graph now contains three records and still contains only one first-hand observer.

`lineage::origins` walks citations for the target view and node. A first-hand citer contributes its actor identity as an origin. An echo contributes the origin it rests on. The output records `first_hand_citers`, `echo_citations`, and the collapsed `distinct_origins` set.

### Exhibit 6 — Three citation records, one first-hand origin

```json
{
  "room": "architecture-demo",
  "view_digest": "a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f809",
  "node": "page:1!BT:0",
  "citations": 3,
  "records_by_kind": { "finding": 3 },
  "first_hand_citers": ["analyst-alpha"],
  "echo_citations": [
    {
      "citer": "reviewer-beta",
      "rests_on": "analyst-alpha",
      "record": "fnd_11111111111111111111111111111111"
    },
    {
      "citer": "reviewer-gamma",
      "rests_on": "analyst-alpha",
      "record": "fnd_22222222222222222222222222222222"
    }
  ],
  "distinct_origins": ["analyst-alpha"],
  "distinct_origin_count": 1
}
```

If beta later receives the passage directly and cites it first-hand, the count becomes two. That is a precise operational metric for an owner-declared evidence-origin requirement.

It is not proof of statistical, organizational, or causal independence. Two first-hand readers can share a flawed parser, training data, administrative control, or source document. **Distinct first-hand observation is not the same thing as independent validation.** Article 01's three independence claims still apply.

## 11. The 2026 Evidence Landscape: What External Work Establishes

The 2026 literature and vulnerability record reinforce the need for explicit evidence boundaries. They do not validate AINA, and their measurements should not be stretched beyond their actual scope.

| 2026 primary source | What it actually reports | Architectural consequence—and ceiling |
|---|---|---|
| Zhao, Pandey, and Misra, [*What the Author Wrote, What the Agent Reads*](https://arxiv.org/abs/2610.30026), October 2026 preprint | Across 76 real policy documents, formatting-blind ingestion reduced requirement-recovery micro-F1 from 0.690 to 0.150 for Docling and 0.075 for plain text; six answering models replicated the loss. Highlight and color drove the largest measured effects. | Ingestion can make agents confidently wrong by removing authorial cues. This supports explicit structural and omission accounting; it does not by itself prove that every omitted cue changes every decision. |
| Wang et al., [*From Agent Traces to Trust*](https://arxiv.org/abs/2606.04990), June 2026 survey, revised October 2026 | Organizes evidence tracing and execution provenance into typed graphs and reports limited integration, incomplete-chain benchmarks, and little tamper-evident or attested trace reporting in the surveyed catalog. | Typed provenance must connect evidence and execution rather than treating a final answer as its own audit. A survey supplies a framework, not an AINA benchmark. |
| Khajavi et al., [*CiteCheck*](https://arxiv.org/abs/2605.27700), May 2026 preprint, revised October 2026 | Evaluates corrupted and fabricated bibliographic references on a 982-citation physics benchmark, reporting 88.7 macro-F1 for its hybrid detector. | Plausible citation metadata requires verification. Bibliographic identity is a different problem from quotation-span grounding; CiteCheck is not evidence that server-cut spans work. |
| Meng et al., [*Social Circuits behind Multi-agent Echo Chambers*](https://arxiv.org/abs/2609.34444), September 2026 preprint | Studies how messages reinforce shared errors and traces their effects through receiver activations; proposes circuit-guided message selection. | More agents can amplify rather than correct an early error. The work does not prove that every topology converges or that actor-origin counting solves model independence. |
| Setiawan, [*Prompt-Based Abstention Fails Under Misleading Context*](https://arxiv.org/abs/2608.22228), August 2026 preprint | On three small frozen models (3.8B–8B), explicit abstention prompting still answered 41.6% of misleading questions; 63% of those answers echoed the planted wrong entity. | Prompted caution is not a deterministic coverage gate. The result is scoped to the tested models and conditions, not a universal frontier-model failure rate. |
| Pai, [*PARSE*](https://arxiv.org/abs/2606.17467), June 2026 preprint, revised September 2026 | On 122 professional-domain tasks using real retrieved documents, PARSE reported 15.6% attack success versus a 25.4% baseline, with utility and significance limitations disclosed. | Retrieval sanitization and provenance-aware processing belong before judgment. PARSE is a sanitization result, not proof that cryptographic provenance tags neutralize prompt injection. |
| [`CVE-2026-27026`](https://nvd.nist.gov/vuln/detail/CVE-2026-27026), February 2026 | Malformed `/FlateDecode` streams could cause long runtimes in `pypdf` before 6.7.1 through byte-by-byte decompression. | Per-item and aggregate budgets, wall clocks, and an outer Job Object are necessary backstops. The advisory does not need to be exaggerated into a different memory-corruption claim. |
| [`CVE-2026-104120`](https://nvd.nist.gov/vuln/detail/CVE-2026-104120), October 2026 | `mcp-server-fetch` and `mcp-server-everything` through 2026.6.4 were affected by SSRF in `fetch_url` URL/path handling. | URL fetches require an egress boundary. AINA additionally authorizes every redirect hop on its capture path; the CVE description alone is not used to prove a particular redirect implementation. |
| [`CVE-2026-51994`](https://nvd.nist.gov/vuln/detail/CVE-2026-51994), September 2026 | `mcp-remote` 0.1.32–0.1.38 was vulnerable to SSRF through the `resource_metadata` URL extracted from `WWW-Authenticate`. | Remote metadata is untrusted destination input. The capture-path proof does not automatically cover unrelated OAuth clients; every network route needs its own inventory and gate. |
| IETF [`RFC 9943`](https://www.rfc-editor.org/rfc/rfc9943.html), June 2026, SCITT Architecture | Defines registration of signed statements and transparency receipts in an append-only Transparency Service. | Tamper-evident inclusion complements canonical evidence views. Inclusion proves log behavior, not that the registered statement is substantively true. |

The composition matters. Sandboxing addresses parser blast radius. Canonical views address artifact identity. Server-cut citations address served-span provenance. Bounded absence addresses unknown coverage. Origin collapse addresses repetition. None can substitute for the others.

## 12. The Twenty-Case Evidence Conformance Gate

The epistemic subsystem has its own 20-case evidence battery inside the 45-case candidate-binary publication gate. These are author-controlled engineering checks, not external certification.

| Case | Predicate exercised |
|---|---|
| `evidence_jcs_rfc8785_vectors` | Canonical serializations match the RFC's vectors |
| `evidence_corpus_through_mcp` | Corpus documents read through the confined worker with expected nodes and outcomes |
| `evidence_governing_pdf_six_pages` | The governing PDF yields its six text pages through `squad_doc_source read` |
| `evidence_repeated_text_resolves_each_node` | Repeated text is ambiguous until occurrence selection, then each handle resolves to its own node |
| `evidence_drift_refused` | Altered source bytes refuse reading and resolution |
| `evidence_tampered_view_refused` | Altered committed views fail with `view_digest_mismatch` |
| `evidence_old_view_survives_extraction_change` | New extraction identity creates a new view while the old handle remains on the old view |
| `evidence_bad_selector_refused` | Bad selectors, paths, raw hashes, unknown handles, and reserved extensions fail by name |
| `evidence_unauthorized_dereference_refused` | A caller outside the Room's owner roster cannot dereference |
| `evidence_truncation_in_delivery_status` | Bounded delivery reports chunked/truncated counts |
| `evidence_excerpt_stays_distinct` | Agent-supplied material retains its origin and cannot take requirement role |
| `evidence_echo_lineage_preserved` | Echo citations remain echoes resting on a first-hand origin |
| `evidence_distinct_origins_through_three_hops` | Three echo-linked records collapse to one origin; a second first-hand reader makes two |
| `evidence_false_predicate_fails_receipt` | False predicates fail evaluation and remain as failed matter |
| `evidence_absence_requires_complete_inventory` | Absence is refused until every unknown-coverage marker is acknowledged |
| `evidence_correspondence_keeps_old_handle` | Correspondence adoption issues a new handle without retargeting the old one |
| `evidence_reassessment_flags` | Source and requirement revisions flag dependents until answered |
| `evidence_staged_visibility_reveal` | Collaborative-pass findings remain withheld until reveal, with delivery limits disclosed |
| `evidence_origin_gate` | Completion refuses until a requirement has the declared distinct first-hand origins |
| `evidence_capture_provenance_chain` | Every redirect hop is egress-authorized and records status, location, and security headers |

The gate demonstrates named path behavior on the candidate binary. It does not prove universal format coverage, universal parser memory safety, complete network-route coverage, source truth, or independent assurance. Nor does it establish a throughput or latency profile for an enterprise corpus; resource cost must be measured against the actual document mix, limits, worker count, and delivery windows.

**Evidence availability:** the implementation and conformance artifacts are `CONTROLLED` for qualified, method-scoped technical review, with adverse findings permitted. They are not represented as unrestricted public downloads or independent validation. The review route is `[RESEARCH]` through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## Bring One Document Boundary

The **Zero-Trust Evidence & Citation Audit Challenge** is the direct application of this layer. Bring one document-heavy AI workflow and one bounded evidence question. I will map its source-to-view-to-citation predicates, inspect the omission surface, and demonstrate fabricated-citation refusal against the existing implementation.

The challenge excludes universal format coverage, source-truth guarantees, absence without acknowledged gaps, production write authority, and independent validation. Deployment and paid pilots are separately scoped; independent evaluation remains outside the commercial ladder through [Article 09](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/).

## The Article 02 Claim Card

```text
Mechanism:
  AINA Epistemic Trust Layer
  (doc_source, confined extraction, evidence views, receipts, handles,
   findings, requirements, reassessment, correspondence, and lineage)

Failure it governs:
  Hostile document parsing inside the controller; stat/read/hash substitution;
  silent extraction loss; fabricated or unserved citations; stale evidence;
  unbounded absence claims; and multi-agent repetition masquerading as corroboration.

Positive path:
  Registered doc_ source
  → single-open FILE_SHARE_READ capture and SHA-256
  → LPAC + Job Object confined identification and budgeted extraction
  → RFC 8785 ViewManifest and 64-hex view digest
  → bounded served-content srv_ receipt
  → server-computed EvidenceRef and ev_ handle
  → typed finding / bounded absence / requirement revision
  → EISA sealed case (Article 03).

Refusal / unknown-coverage path:
  doc_source_drifted or drifted
  parser_worker_unavailable, budget_exceeded, parser_fault
  not_a_path, agent_manufactured_ref, ev_unknown
  access_denied, not_served, quote_not_found, quote_ambiguous
  view_digest_mismatch, role_ineligible, absence_unsupported.

Evidence status:
  Implemented and Author-Verified on the declared Windows reference embodiment.
  Twenty evidence cases form part of the 45-case candidate-binary publication gate.
  Not Independently Validated. External 2026 papers and advisories do not endorse AINA.

Verifier and artifacts:
  Captured source digest; worker Receipt; doc_source.report/2;
  squad.evidence.view/1 and view digest;
  squad.evidence.receipt/1 (srv_);
  squad.evidence.handle/1 (ev_);
  fnd_, evl_, reqrev_, man_, rsa_, cor_, coa_ records;
  evidence_conformance.rs:301-322.

Scope and claim ceiling:
  Confinement covers the governed Windows parser path, not every possible host process.
  The Kind alphabet is bounded and includes typed unsupported/encrypted outcomes.
  Complete-for-profile is not universal extraction or human comprehension.
  A server-cut citation proves served-span provenance, not source truth.
  Absence is bounded to examined content with acknowledged gaps.
  Distinct first-hand actor origins are not statistical or organizational independence.
  Egress authorization is proven on the capture path, not every network client.

Next stage in the machine:
  Article 02 seals the evidence world.
  Article 03 compiles candidate judgments into EISA's closed act grammar
  and adjudicates support, contradiction, partition, and layout relations.

Commercial doorway:
  Zero-Trust Evidence & Citation Audit Challenge — bring one document-heavy
  AI workflow; receive a source-to-view-to-citation predicate map, an omission
  surface review, and a live demonstration of fabricated-citation refusal
  (Article 09 · me@blayneaina.com).
```

## Before EISA Judges the Act

Return to the renewal contract.

The conventional pipeline returned a clean answer: “Annual increases are capped at 3.0%, and there is no change-of-control clause.” Its citation looked plausible. Its confidence was high. Its evidence world was never established.

The governed pipeline can tell a different story.

The source revision was captured and hashed from one read. The parser ran with one capability, no network, bounded resources, and a token verified before resume. Page 1 produced a text-object node containing the 3.0% sentence. Page 2 produced an `ocr_not_enabled` omission, not silence. The analyst received a bounded content window and an `srv_` receipt. The Room found the exact sentence, computed its Unicode-scalar range, selected the innermost text object, and issued `ev_…`.

The 3.0% assertion can now be checked. The change-of-control absence claim cannot pass until `omission/1` and every other unknown-coverage marker in scope are acknowledged. If another agent repeats the finding without reading the passage, lineage preserves the repetition as an echo. If the file changes, ordinary resolution refuses drift. If a new view is adopted, correspondence creates a new handle rather than moving the old one.

Only now is there a stable object for constitutional judgment.

> **Models may interpret evidence. They may not manufacture the evidence world, erase its gaps, or award themselves first-hand observation.**

Article 03 begins at that boundary: candidate judgments become EISA acts, support and contradiction become deterministic relations, and entity-resolution panels decide what may acquire standing.

## Frequently Asked Questions

### What is a server-cut citation?

A server-cut citation is an `ev_` handle issued by the Room from a caller-bound `srv_` served-content receipt. The caller supplies an exact quote or served node; the server verifies coverage, computes Unicode-scalar coordinates, selects the narrowest structural node, and binds the result to a canonical view.

### Does LPAC confinement make document parsing safe?

It makes the governed parser path substantially safer by restricting capabilities, network access, writable locations, process count, memory, and CPU, with token checks before resume. It does not prove that parser code is bug-free or that every host and administrative route is contained.

### Does `complete_for_profile` mean the whole document was read?

No. It means extraction completed without lossy omissions under the declared `text/v1` profile. Profile exclusions remain disclosed, delivery can still be truncated, and the result does not imply visual understanding or humanlike comprehension.

### Can a server-cut citation prove that a source is true?

No. It proves that a particular passage was served and bound to an exact source revision, parser configuration, view, node, and recipient. Authenticity, worldly truth, policy quality, and the interpretation of that passage remain separate claims.

### How does bounded absence work?

The server identifies unknown-coverage markers such as lossy omissions, incomplete inventory, failure, and child sources. The caller must acknowledge every required marker by node ID before the phrase or pattern search can support the bounded negative result. Acknowledged gaps remain unknown, not absent.

### Do three agents citing one passage provide three independent origins?

Not if two are echoes. Lineage counts first-hand actor observations and collapses derived citations to their origins. Even two first-hand actors are not automatically statistically, organizationally, or causally independent.

## Continue the Series

- **Series index:** [From Proposal to Consequence: The AINA Transition-Governance Series](https://blayneaina.com/series/from-proposal-to-consequence)
- **Previous:** [Article 01 — An AI Output Is Not an Act](https://blayneaina.com/articles/01-an-ai-output-is-not-an-act)
- **Next:** [Article 03 — Semantic Switch and EISA: Protected Computation and Entity Resolution](https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/)
- **Deployment and independent review:** [Article 09 — Bring One Real Boundary](https://blayneaina.com/architecture/bring-one-real-boundary-work-with-blayne/)

---

## Primary 2026 Sources

- [Zhao, Pandey, and Misra — *What the Author Wrote, What the Agent Reads: Silent Cue Loss in Enterprise Document Ingestion*, `arXiv:2610.30026`](https://arxiv.org/abs/2610.30026)
- [Wang et al. — *From Agent Traces to Trust: A Survey of Evidence Tracing and Execution Provenance in LLM Agents*, `arXiv:2606.04990`](https://arxiv.org/abs/2606.04990)
- [Meng et al. — *Social Circuits behind Multi-agent Echo Chambers*, `arXiv:2609.34444`](https://arxiv.org/abs/2609.34444)
- [Setiawan — *Prompt-Based Abstention Fails Under Misleading Context*, `arXiv:2608.22228`](https://arxiv.org/abs/2608.22228)
- [Khajavi et al. — *CiteCheck*, `arXiv:2605.27700`](https://arxiv.org/abs/2605.27700)
- [Pai — *PARSE: Provenance-Aware Retrieval Sanitization for Professional Domain LLM Agents*, `arXiv:2606.17467`](https://arxiv.org/abs/2606.17467)
- [NVD — `CVE-2026-27026`, `pypdf` long-runtime denial of service](https://nvd.nist.gov/vuln/detail/CVE-2026-27026)
- [NVD — `CVE-2026-104120`, MCP fetch-server SSRF](https://nvd.nist.gov/vuln/detail/CVE-2026-104120)
- [NVD — `CVE-2026-51994`, `mcp-remote` resource-metadata SSRF](https://nvd.nist.gov/vuln/detail/CVE-2026-51994)
- [IETF `RFC 9943` — SCITT Architecture, June 2026](https://www.rfc-editor.org/rfc/rfc9943.html)

---

## Publication Metadata

**Title tag:** Zero-Trust Document Ingestion & Server-Cut Evidence (`srv_` → `ev_`)  
**Meta description:** Why RAG chunks, file paths, and agent-written citations are not evidence: inside AINA's LPAC-confined parser, omission ledger, canonical views, and server-cut `srv_` and `ev_` handles.  
**Series navigation:** [Series index](https://blayneaina.com/series/from-proposal-to-consequence) · Article 02 of *From Proposal to Consequence: The AINA Transition-Governance Series*.  
**Previous installment:** [Article 01 — An AI Output Is Not an Act](https://blayneaina.com/articles/01-an-ai-output-is-not-an-act).  
**Next installment:** [Article 03 — Semantic Switch and EISA: Protected Computation and Entity Resolution](https://blayneaina.com/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/).

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/"
      },
      "headline": "Zero-Trust Document Ingestion and Server-Cut Evidence",
      "alternativeHeadline": "From LPAC-Confined Parsing to Canonical Views, Server-Cut Citations, and Bounded Absence",
      "description": "Why RAG chunks, file paths, and agent-written citations are not evidence: inside AINA's LPAC-confined parser, omission ledger, canonical views, and server-cut srv_ and ev_ handles.",
      "proficiencyLevel": "Expert",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T09:00:00-06:00",
      "dateModified": "2026-10-31T17:30:00-06:00",
      "position": 2,
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
        { "@type": "Thing", "name": "Zero-Trust Document Ingestion" },
        { "@type": "Thing", "name": "Windows Less Privileged AppContainer" },
        { "@type": "Thing", "name": "Server-Cut Evidence and Citation Provenance" },
        { "@type": "Thing", "name": "RFC 8785 JSON Canonicalization Scheme" },
        { "@type": "Thing", "name": "Bounded Absence and Multi-Agent Evidence Lineage" }
      ],
      "citation": [
        "https://arxiv.org/abs/2610.30026",
        "https://arxiv.org/abs/2606.04990",
        "https://arxiv.org/abs/2609.34444",
        "https://arxiv.org/abs/2608.22228",
        "https://arxiv.org/abs/2605.27700",
        "https://arxiv.org/abs/2606.17467",
        "https://nvd.nist.gov/vuln/detail/CVE-2026-27026",
        "https://nvd.nist.gov/vuln/detail/CVE-2026-104120",
        "https://nvd.nist.gov/vuln/detail/CVE-2026-51994",
        "https://www.rfc-editor.org/rfc/rfc9943.html"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/#breadcrumb",
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
          "name": "Zero-Trust Document Ingestion and Server-Cut Evidence",
          "item": "https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/"
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
  "@id": "https://blayneaina.com/architecture/zero-trust-document-ingestion-and-server-cut-evidence/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a server-cut citation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A server-cut citation is an `ev_` handle issued by the Room from a caller-bound `srv_` served-content receipt. The caller supplies an exact quote or served node; the server verifies coverage, computes Unicode-scalar coordinates, selects the narrowest structural node, and binds the result to a canonical view."
      }
    },
    {
      "@type": "Question",
      "name": "Does LPAC confinement make document parsing safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It makes the governed parser path substantially safer by restricting capabilities, network access, writable locations, process count, memory, and CPU, with token checks before resume. It does not prove that parser code is bug-free or that every host and administrative route is contained."
      }
    },
    {
      "@type": "Question",
      "name": "Does `complete_for_profile` mean the whole document was read?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It means extraction completed without lossy omissions under the declared `text/v1` profile. Profile exclusions remain disclosed, delivery can still be truncated, and the result does not imply visual understanding or humanlike comprehension."
      }
    },
    {
      "@type": "Question",
      "name": "Can a server-cut citation prove that a source is true?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It proves that a particular passage was served and bound to an exact source revision, parser configuration, view, node, and recipient. Authenticity, worldly truth, policy quality, and the interpretation of that passage remain separate claims."
      }
    },
    {
      "@type": "Question",
      "name": "How does bounded absence work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The server identifies unknown-coverage markers such as lossy omissions, incomplete inventory, failure, and child sources. The caller must acknowledge every required marker by node ID before the phrase or pattern search can support the bounded negative result. Acknowledged gaps remain unknown, not absent."
      }
    },
    {
      "@type": "Question",
      "name": "Do three agents citing one passage provide three independent origins?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not if two are echoes. Lineage counts first-hand actor observations and collapses derived citations to their origins. Even two first-hand actors are not automatically statistically, organizationally, or causally independent."
      }
    }
  ]
}
</script>
