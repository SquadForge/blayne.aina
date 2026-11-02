const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked options
marked.setOptions({
  gfm: true,
  breaks: false
});

const ROOT_DIR = __dirname;
const DIST_DIR = path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
}

// Articles metadata in order
const ARTICLES = [
  {
    num: "01",
    slug: "01-an-ai-output-is-not-an-act",
    file: "01-an-ai-output-is-not-an-act.md",
    shortTitle: "An AI Output Is Not an Act",
    theme: "Ambient Authority & Machine Standing"
  },
  {
    num: "02",
    slug: "02-zero-trust-document-ingestion-and-server-cut-evidence",
    file: "02-zero-trust-document-ingestion-and-server-cut-evidence.md",
    shortTitle: "Zero-Trust Document Ingestion",
    theme: "Parser Jails & Server-Cut Evidence"
  },
  {
    num: "03",
    slug: "03-eisa-four-gate-verdict-machine-and-entity-resolution",
    file: "03-eisa-four-gate-verdict-machine-and-entity-resolution.md",
    shortTitle: "Semantic Switch & EISA",
    theme: "Protected Computation & 4-Gate Verdicts"
  },
  {
    num: "04",
    slug: "04-the-room-why-git-and-chat-are-not-coordination-planes",
    file: "04-the-room-why-git-and-chat-are-not-coordination-planes.md",
    shortTitle: "The Room Coordination Plane",
    theme: "Transaction Graphs vs. Git & Chat"
  },
  {
    num: "05",
    slug: "05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion",
    file: "05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion.md",
    shortTitle: "Expiry Is Not Fencing",
    theme: "Typed Leases & Kernel Write Exclusion"
  },
  {
    num: "06",
    slug: "06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine",
    file: "06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine.md",
    shortTitle: "Rollback Is Not Erasure",
    theme: "Dual-Tier Vaults & Forensic Quarantine"
  },
  {
    num: "07",
    slug: "07-defeating-approval-laundering-act-pinning-and-successor-grants",
    file: "07-defeating-approval-laundering-act-pinning-and-successor-grants.md",
    shortTitle: "Defeating Approval Laundering",
    theme: "Act Pinning & Successor Continuity"
  },
  {
    num: "08",
    slug: "08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate",
    file: "08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate.md",
    shortTitle: "The Sovereign Kill Switch",
    theme: "Break-Glass Epochs & Conformance Release Gate"
  },
  {
    num: "09",
    slug: "09-bring-one-real-boundary-work-with-blayne",
    file: "09-bring-one-real-boundary-work-with-blayne.md",
    shortTitle: "AI-Native Builder, Fleet Orchestrator & FDE",
    theme: "Live Enterprise Problem Solving & Verification",
    isCommercial: true
  }
];

const EXECUTIVE_BRIEFS = {
  home: {
    problem: "Writing code by hand is no longer the bottleneck. The hard problem is decomposing ambiguous work across parallel AI agents without context collapse, catching plausible-but-wrong output, and proving the result.",
    proof: "AINA is both a deterministic execution-governance architecture and a recursive proof-of-work: one architect directing 9 concurrent IDE lanes under the runtime's own confinement and verification rules.",
    commercial: "Evaluate a repeatable AI-native engineering methodology, not a one-off product pitch or a no-AI whiteboard performance.",
    next: "Start with Article 01, or inspect the Refusal & Conformance proof pack."
  },
  "01-an-ai-output-is-not-an-act": {
    problem: "Valid JSON, credentials, confidence, and a green tool result can make an AI proposal look authorized when it is not.",
    proof: "Machine standing binds the exact act, actor, evidence, target, execution, time, and terminal disposition before consequence.",
    commercial: "Use the AI Workflow Standing Challenge to test one proposed mutation against those predicates.",
    next: "Article 02 establishes the confined evidence world on which standing depends."
  },
  "02-zero-trust-document-ingestion-and-server-cut-evidence": {
    problem: "Hostile documents can attack the parser, while models can fabricate citations and make unknown coverage disappear.",
    proof: "LPAC parser confinement, immutable views, explicit omissions, and server-cut srv_ and ev_ receipts establish served evidence.",
    commercial: "Use the Zero-Trust Evidence & Citation Audit Challenge on one bounded document question.",
    next: "Article 03 protects native data before external entity-resolution computation."
  },
  "03-eisa-four-gate-verdict-machine-and-entity-resolution": {
    problem: "Entity resolution needs rich comparison structure, but raw contacts, companies, and products should not be sent to external AI providers.",
    proof: "The production EISA Four-Gate machine validates bounded acts over sealed evidence; Semantic Switch is an experimental alpha structure-preservation research module.",
    commercial: "Use the deterministic EISA core for judgment boundaries and evaluate Semantic Switch only against its declared synthetic-test scope.",
    next: "Review the alpha scope and refusal proof, then Article 04 supplies live coordination authority."
  },
  "04-the-room-why-git-and-chat-are-not-coordination-planes": {
    problem: "Git history and chat transcripts cannot establish who may act, receive, stop, or complete work now.",
    proof: "The Room revalidates territory, causal observation, sealed wakes, native replies, cancellation, and privileged acceptance.",
    commercial: "Use the Multi-Agent Coordination & Acceptance Audit Challenge on one assignment with an uncertain outcome.",
    next: "Article 05 enforces current ownership at the mutation window."
  },
  "05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion": {
    problem: "An expired lease does not physically stop a stale worker or an uncooperative local writer from changing a resource.",
    proof: "Monotonic generations, current tenancy, typed scopes, and overlapping Win32 handle exclusion fence the write itself.",
    commercial: "Use the Shared-Resource Lease & Kernel Fencing Challenge on one shared file or SQLite row.",
    next: "Article 06 preserves both the recovery baseline and the forensic history."
  },
  "06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine": {
    problem: "A single undo snapshot can destroy intermediate states and launder unauthorized writes into a clean baseline.",
    proof: "Primary certifies operational recovery while Amber preserves every intermediate and ungated state for forensics.",
    commercial: "Use the Forensic Baseline & Quarantine Challenge on one file exposed to out-of-band edits.",
    next: "Article 07 binds the exact approved act before execution."
  },
  "07-defeating-approval-laundering-act-pinning-and-successor-grants": {
    problem: "Approval for action A can become a different action A′ at execution, and a crash can separate commit from receipt.",
    proof: "Pre-resume confinement, controller-fixed RequestedAct, fenced SQLite, and non-fabricating successor grants preserve act and return continuity.",
    commercial: "Use the Confinement, Act-Pinning & Crash-Straddling Continuity Challenge on one approved mutation.",
    next: "Article 08 governs sovereign stop and release assurance."
  },
  "08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate": {
    problem: "A kill switch the agent can clear is not a boundary, and a green build does not prove the release enforces refusals.",
    proof: "Latch-first containment, scoped epochs, observed Job termination, in-doubt recovery, and the 45-case candidate gate close the loop.",
    commercial: "Use the Break-Glass & Conformance Qualification Challenge on one containment or release requirement.",
    next: "Article 09 turns the completed machine into a bounded deployment engagement."
  },
  "09-bring-one-real-boundary-work-with-blayne": {
    problem: "Writing code by hand is no longer the bottleneck. The bottleneck is knowing what to build, decomposing it across parallel AI agents without context collapse, catching plausible-but-wrong outputs, and proving the result works.",
    proof: "AINA is not a one-off theory—it is Exhibit A of a repeatable AI-native engineering workflow that compressed a multi-person systems project into one architect directing 9 concurrent IDE lanes.",
    commercial: "Forward-Deployed Engineer (FDE) Lead · AI-Native Systems & Workflow Architect · Principal CRM / Data Integrations Architect.",
    next: "Skip the no-AI whiteboard quiz. Give me a real, messy enterprise problem from your backlog and watch how I orchestrate my AI fleet live."
  },
  "refusal-proof": {
    problem: "A governance claim is more credible when the system can refuse a hostile mutation and prove the protected destination did not change.",
    proof: "Three complete refusal chains include actual receipts, preserved fixtures, matching pre/post SHA-256 digests, and a fresh 45/45 candidate run.",
    commercial: "Download the offline verifier and inspect the evidence before requesting a live technical diligence walkthrough.",
    next: "Run verify_refusal_proof.py, inspect the 45-case manifest, then bring one real boundary."
  },
  "semantic-switch-proof": {
    problem: "A protected-computation claim should be reproducible, not accepted from a polished article alone.",
    proof: "The pack contains synthetic A/B fixtures, verification harnesses, and raw results for 20/20 invariance blocks and 23/23 exact relations.",
    commercial: "Inspect the synthetic A/B fixtures, structural-isomorphism invariants, and verification harness outputs directly, or request a live technical diligence walkthrough of the Semantic Switch engine.",
    next: "Review the measurements and claim ceiling, then bring one bounded entity-resolution problem."
  }
};

const URL_REWRITES = [
  [/https:\/\/blayneaina\.com\/articles\/01-an-ai-output-is-not-an-act\/?/g, 'https://blayneaina.com/01-an-ai-output-is-not-an-act/'],
  [/https:\/\/blayneaina\.com\/architecture\/zero-trust-document-ingestion-and-server-cut-evidence\/?/g, 'https://blayneaina.com/02-zero-trust-document-ingestion-and-server-cut-evidence/'],
  [/https:\/\/blayneaina\.com\/architecture\/eisa-four-gate-verdict-machine-and-entity-resolution\/?/g, 'https://blayneaina.com/03-eisa-four-gate-verdict-machine-and-entity-resolution/'],
  [/https:\/\/blayneaina\.com\/architecture\/the-room-coordination-plane\/?/g, 'https://blayneaina.com/04-the-room-why-git-and-chat-are-not-coordination-planes/'],
  [/https:\/\/blayneaina\.com\/architecture\/expiry-is-not-fencing-typed-leases\/?/g, 'https://blayneaina.com/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/'],
  [/https:\/\/blayneaina\.com\/architecture\/rollback-is-not-erasure-dual-tier-vaults\/?/g, 'https://blayneaina.com/06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/'],
  [/https:\/\/blayneaina\.com\/architecture\/defeating-approval-laundering-act-pinning-successor-grants\/?/g, 'https://blayneaina.com/07-defeating-approval-laundering-act-pinning-and-successor-grants/'],
  [/https:\/\/blayneaina\.com\/architecture\/sovereign-kill-switch-break-glass-epochs-conformance-gate\/?/g, 'https://blayneaina.com/08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/'],
  [/https:\/\/blayneaina\.com\/architecture\/bring-one-real-boundary-work-with-blayne\/?/g, 'https://blayneaina.com/09-bring-one-real-boundary-work-with-blayne/'],
  [/https:\/\/blayneaina\.com\/series\/from-proposal-to-consequence\/?/g, 'https://blayneaina.com/'],
  [/https:\/\/blayneaina\.com\/architecture\/"/g, 'https://blayneaina.com/"']
];

function normalizeInternalLinks(text) {
  let out = text;
  for (const [pattern, replacement] of URL_REWRITES) {
    out = out.replace(pattern, replacement);
  }
  // Fix double slashes before hash anchors if any (#article, #faq, #breadcrumb, #series)
  out = out.replace(/\/#([a-zA-Z0-9_-]+)/g, '/#$1');
  return out;
}

function parseFrontmatter(rawContent) {
  if (!rawContent.startsWith('---')) {
    return { frontmatter: {}, markdown: rawContent };
  }
  const endIdx = rawContent.indexOf('\n---', 3);
  if (endIdx === -1) {
    return { frontmatter: {}, markdown: rawContent };
  }
  const fmBlock = rawContent.substring(3, endIdx).trim();
  const markdown = rawContent.substring(endIdx + 4).trim();
  
  const frontmatter = {};
  fmBlock.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.substring(0, colonIdx).trim();
      let val = line.substring(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      frontmatter[key] = val;
    }
  });
  return { frontmatter, markdown };
}

function stripStandaloneArticleHeader(markdown, title) {
  if (!markdown.startsWith(`# ${title}\n`)) return markdown;
  const stripped = markdown.replace(
    /^# [^\n]+\n\n\*[^\n]+\*\n\n\*\*By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026\*\*\n\n---\n\n/,
    ''
  );
  if (stripped === markdown) {
    throw new Error(`Standalone article header was not recognized for: ${title}`);
  }
  return stripped;
}

const RELEASE_BANNER_HTML = `
  <aside class="release-banner" aria-label="January 15 public release and early review window">
    <div class="release-kicker">PUBLIC RELEASE · JANUARY 15</div>
    <h2>Public Interactive Demo & Offline Sovereign Proof Packs Launch January 15</h2>
    <p>Standalone HTML + WebAssembly Sovereign Proof Packs—enabling offline, byte-for-byte recomputation of Stage Zero receipts and the 45-case conformance battery—release publicly on January 15. Between now and January 15, I am opening 3–5 early review slots for Principal Architects, Security Leads, and Forward-Deployed Engineering teams to test a single high-consequence boundary or submit adversarial test cases.</p>
    <div class="release-actions">
      <a href="mailto:me@blayneaina.com?subject=AINA%20Early%20Boundary%20Review" class="btn-primary">Request an early boundary review</a>
      <a href="/09-bring-one-real-boundary-work-with-blayne/" class="btn-secondary">Review engagement tracks</a>
    </div>
  </aside>
`;

const PORTABILITY_HTML = `
  <aside class="portability-note" aria-label="Windows NT first and Linux POSIX mapping">
    <div class="brief-label">SUBSTRATE PORTABILITY</div>
    <h2>Windows NT first, with an OS-agnostic evidence and decision core</h2>
    <p>The v1 reference binary, <code>squad.exe</code>, targets Windows NT because enterprise endpoints expose strict, explicit kernel primitives: mandatory file-share exclusion (<code>FILE_SHARE_READ</code>), Less Privileged App Containers (LPAC), Job Objects, and suspended pre-execution handle/PEB inspection through <code>CreateProcessW(CREATE_SUSPENDED)</code> and <code>PssCaptureSnapshot</code>. The reference runtime was built local-first on a single Windows workstation to make those guarantees inspectable.</p>
    <p>EISA, RFC 8785 JCS canonicalization, SHA-256 evidence digests, and SQLite optimistic concurrency control are OS-agnostic. Linux/POSIX mappings are architectural counterparts, not claims of drop-in binary compatibility or identical enforcement semantics:</p>
    <ol>
      <li><strong>LPAC + Job Objects (§02/§08):</strong> Linux user namespaces, seccomp-bpf, Landlock LSM, and cgroups v2 (<code>cgroup.kill</code>).</li>
      <li><strong>Win32 file-share exclusion (§05):</strong> Linux Open File Description locks (<code>F_OFD_SETLK</code>), fanotify permission events, and strict container mount namespaces.</li>
      <li><strong>Suspended creation + PSS inspection (§07):</strong> <code>clone3()</code>/<code>pidfd_open()</code> stopped-start inspection with <code>/proc/&lt;pid&gt;/fd</code> and <code>/proc/&lt;pid&gt;/maps</code> verification before <code>execve</code> or signal continuation.</li>
    </ol>
    <p>Every target still requires its own conformance evidence for handle lifetimes, rename behavior, process containment, pre-existing capabilities, and crash recovery.</p>
  </aside>
`;

const REFUSAL_EXHIBIT_HTML = `
<section class="refusal-exhibit" id="refusal-cases" aria-labelledby="refusal-exhibit-title">
  <div class="proof-kicker">OPEN VERIFICATION · REFUSAL + UNCHANGED DESTINATION</div>
  <h2 id="refusal-exhibit-title">Four deterministic refusals. Inspect every state transition.</h2>
  <p class="proof-subtitle">Select a case to inspect the hostile proposal, refusal reason, protected destination, and original receipt. All four cases remain available in the static document without JavaScript.</p>
  <div class="case-tabs" role="tablist" aria-label="Refusal cases">
    <button class="case-tab active" type="button" role="tab" id="tab-case-a" aria-controls="case-a" aria-selected="true" data-case="a">Case A<br>Citation selector</button>
    <button class="case-tab" type="button" role="tab" id="tab-case-b" aria-controls="case-b" aria-selected="false" data-case="b">Case B<br>Unleased write</button>
    <button class="case-tab" type="button" role="tab" id="tab-case-c" aria-controls="case-c" aria-selected="false" data-case="c">Case C<br>Act pinning</button>
    <button class="case-tab" type="button" role="tab" id="tab-case-d" aria-controls="case-d" aria-selected="false" data-case="d">Case D<br>Stale generation</button>
  </div>
  <div class="case-explorer" data-case-explorer>
    <article class="case-panel" id="case-a" role="tabpanel" aria-labelledby="tab-case-a" data-case-panel="a">
      <div class="console-top"><span>CASE A · EVIDENCE SELECTOR</span><span class="console-status refusal">selector_out_of_bounds</span></div>
      <h3>Citation selector fabrication stops before evidence serving</h3>
      <p>The proposal requests byte range <code>0..9999</code> against a 26-character evidence node. The server refuses the out-of-bounds selector instead of laundering a fabricated citation.</p>
      <dl class="case-meta"><div><dt>Protected destination</dt><dd>er-repeat.txt</dd></div><div><dt>Byte identity</dt><dd>65 / 65 bytes unchanged</dd></div><div><dt>Effect</dt><dd>No evidence mutation</dd></div></dl>
      <div class="digest-box"><code>bf15f8633e85350430adf1bbc47a47154965d3a7f28e4ebad25d6a39ecaa2f8c</code><button class="copy-btn" type="button" data-copy="bf15f8633e85350430adf1bbc47a47154965d3a7f28e4ebad25d6a39ecaa2f8c">COPY SHA-256</button></div>
      <p><strong>Pre-attempt digest = post-refusal digest.</strong> <a href="/proof/refusal/evidence-selector.json">Open the original Case A receipt →</a></p>
    </article>
    <article class="case-panel" id="case-b" role="tabpanel" aria-labelledby="tab-case-b" data-case-panel="b">
      <div class="console-top"><span>CASE B · UNLEASED WRITE</span><span class="console-status refusal">exact_file_lease_required</span></div>
      <h3>A delayed worker cannot write after lease release</h3>
      <p>The worker proposes replacing <code>v1\n</code> with <code>v2\n</code> after its active file lease has been released. No active File lock exists, so no destination write occurs.</p>
      <dl class="case-meta"><div><dt>Protected destination</dt><dd>ungated.txt</dd></div><div><dt>Byte identity</dt><dd>3 / 3 bytes unchanged</dd></div><div><dt>Effect</dt><dd>No file write</dd></div></dl>
      <div class="digest-box"><code>2d27fbdf4e8ca207afbfa388ca9172fbcc6c70e534af2476b3b704f87debadcf</code><button class="copy-btn" type="button" data-copy="2d27fbdf4e8ca207afbfa388ca9172fbcc6c70e534af2476b3b704f87debadcf">COPY SHA-256</button></div>
      <p><strong>Pre-attempt digest = post-refusal digest.</strong> <a href="/proof/refusal/unleased-write.json">Open the original Case B receipt →</a></p>
    </article>
    <article class="case-panel" id="case-c" role="tabpanel" aria-labelledby="tab-case-c" data-case-panel="c">
      <div class="console-top"><span>CASE C · APPROVAL-PARAMETER SUBSTITUTION</span><span class="console-status refusal">requested_act_mismatch</span></div>
      <h3>A plausible value cannot replace the controller-fixed act</h3>
      <p>The controller pins <code>Controller fixed value</code>; the worker substitutes <code>Unrequested but valid value</code> for the same SQLite row and version. The act mismatch aborts execution before SQLite's page cache or row version changes.</p>
      <dl class="case-meta"><div><dt>Effects / model calls</dt><dd>0 / 0</dd></div><div><dt>Row version</dt><dd>1 → 1</dd></div><div><dt>Byte identity</dt><dd>16,384 / 16,384</dd></div></dl>
      <div class="digest-box"><code>362088a107369e634cdc9c6c520fbca3e2393722860720d3aa2c2eb11b47d719</code><button class="copy-btn" type="button" data-copy="362088a107369e634cdc9c6c520fbca3e2393722860720d3aa2c2eb11b47d719">COPY SHA-256</button></div>
      <p><strong>Pre-attempt digest = post-refusal digest.</strong> <a href="/proof/refusal/act-pinning.json">Open the original Case C receipt →</a></p>
    </article>
    <article class="case-panel" id="case-d" role="tabpanel" aria-labelledby="tab-case-d" data-case-panel="d">
      <div class="console-top"><span>CASE D · STALE GENERATION</span><span class="console-status refusal">stale_lease_generation</span></div>
      <h3>A stale request is refused before target creation</h3>
      <p>The stale request carries <code>expected 8, current 1</code>. The runtime rejects it before creating a destination, so this receipt is intentionally reason-only.</p>
      <dl class="case-meta"><div><dt>Decision boundary</dt><dd>Before target creation</dd></div><div><dt>Destination preimage</dt><dd>Absent by design</dd></div><div><dt>Digest pair</dt><dd>Not claimed</dd></div></dl>
      <p><strong>Non-fabrication rule:</strong> AINA does not invent a nonexistent preimage or artificial digest pair to make the evidence look uniform. <a href="/proof/refusal/stale-generation.json">Open the original Case D receipt →</a></p>
    </article>
  </div>
  <div class="conformance-strip">
    <span><strong>45/45</strong> fresh candidate cases</span>
    <span><strong>20/20</strong> evidence cases</span>
    <span><strong>118.753576s</strong> execution</span>
    <span><strong>0</strong> proprietary binaries published</span>
  </div>
  <div class="proof-actions">
    <a href="/proof/aina-refusal-proof-pack-v1.zip" class="btn-primary">Download Complete Refusal Proof Bundle (.zip)</a>
    <a href="/proof/verify_refusal_proof.py" class="btn-secondary">Verifier script</a>
    <a href="/proof/SHA256SUMS.txt" class="btn-secondary">SHA256SUMS.txt</a>
    <button class="copy-btn" type="button" data-copy="curl -fsSL https://blayneaina.com/proof/aina-refusal-proof-pack-v1.zip -o aina-proof.zip && unzip -q aina-proof.zip -d aina-proof && cd aina-proof && python verify_refusal_proof.py">COPY ONE-LINE VERIFIER</button>
  </div>
</section>
`;

const GENUINE_INSIGHT_HTML = `
<aside class="context-callout genuine-insight" aria-label="The genuinely new insight in AINA">
  <div class="brief-label">THE CORE ARCHITECTURAL QUESTION · WHY EXISTING FRAMEWORKS AREN'T ENOUGH</div>
  <h2>What is the genuinely new insight in AINA that existing authorization frameworks, workflow engines, transactional databases, and agent guardrails don't already provide?</h2>
  <p>Existing systems solve individual slices in isolation: IAM/OAuth checks <strong>who the caller is</strong>, JSON schemas check <strong>payload shape</strong>, workflow engines track <strong>step order</strong>, and databases enforce <strong>ACID transactions</strong> once a query arrives. None of them bind the <strong>four failure gaps unique to autonomous agent fleets</strong> into a single atomic commit boundary:</p>
  <ol>
    <li><strong>Provenance-to-Mutation Binding (§02 + §03):</strong> Standard RBAC permits an authorized agent to write a hallucinated or fabricated value into a CRM/ERP. AINA requires the mutation envelope to carry server-cut byte-offset provenance receipts (<code>srv_</code>/<code>ev_</code>) verified via RFC 8785 JCS before admission.</li>
    <li><strong>Approval-to-Execution Pinning Across Process Spawn (§07):</strong> Standard human-in-the-loop tools approve a high-level prompt or script name, leaving a TOCTOU gap where arguments, files, or inherited handles change before execution. AINA spawns workers suspended (<code>CreateProcessW(CREATE_SUSPENDED)</code>) and audits the live PEB and kernel handle table (<code>PssCaptureSnapshot</code>) against the pinned <code>RequestedAct</code> hash before <code>ResumeThread</code>.</li>
    <li><strong>OS-Enforced Stale-Worker Fencing (§04 + §05):</strong> Standard agent frameworks use clock-based TTL locks; when a stalled agent wakes up late, it overwrites newer state. AINA pairs monotonic lease generations in The Room with kernel file-share exclusion (<code>FILE_SHARE_READ</code> / <code>ERROR_SHARING_VIOLATION</code>) and SQLite row-version checks at commit time.</li>
    <li><strong>Non-Destructive Forensic Rollback (§06):</strong> Standard database rollbacks erase the failed write attempt. AINA's Dual-Tier Vaults keep the protected baseline untouched while shunting every rejected or out-of-band agent mutation into an immutable Amber Quarantine for forensic inspection.</li>
  </ol>
  <p><strong>Terminology vs. engineering value:</strong> Existing enterprise stacks can implement these four invariants without adopting AINA's naming conventions. The value is not the vocabulary—it is closing the gap between a plausible agent proposal and an authorized, provably safe state transition.</p>
</aside>
`;

// Generate base HTML layout
function generateHtml({ title, subtitle, contentHtml, currentSlug, prevArticle, nextArticle, isHome = false, isFull = false, pageHeroHtml = '' }) {
  const canonicalUrl = isHome
    ? 'https://blayneaina.com/'
    : isFull
      ? 'https://blayneaina.com/complete-series/'
      : `https://blayneaina.com/${currentSlug}/`;

  const metaDesc = subtitle || "The Route to Trusting AI: Architecture, Grounding, and Operational Invariants by Blayne Aina";
  const presentationPage = isHome || ["refusal-proof", "semantic-switch-proof"].includes(currentSlug);

  const archArticles = ARTICLES.filter(a => !a.isCommercial);
  const commercialArticles = ARTICLES.filter(a => a.isCommercial);

  const navLinks = archArticles.map((art) => {
    const isActive = art.slug === currentSlug;
    return `
      <li class="${isActive ? 'active' : ''}">
        <a href="/${art.slug}/">
          <span class="nav-num">§${art.num}</span>
          <span class="nav-title">${art.shortTitle}</span>
        </a>
      </li>
    `;
  }).join('');

  const commercialLinks = commercialArticles.map((art) => {
    const isActive = art.slug === currentSlug;
    return `
      <li class="${isActive ? 'active' : ''} nav-commercial">
        <a href="/${art.slug}/">
          <span class="nav-num">→</span>
          <span class="nav-title">${art.shortTitle}</span>
        </a>
      </li>
    `;
  }).join('');

  const prevNextHtml = (prevArticle || nextArticle) ? `
    <nav class="article-pagination" aria-label="Article navigation">
      ${prevArticle ? `
        <a href="/${prevArticle.slug}/" class="pagination-link prev">
          <span class="pagination-sub">← Previous</span>
          <span class="pagination-title">${prevArticle.isCommercial ? prevArticle.shortTitle : `§${prevArticle.num}: ${prevArticle.shortTitle}`}</span>
        </a>
      ` : '<div class="pagination-empty"></div>'}
      ${nextArticle ? `
        <a href="/${nextArticle.slug}/" class="pagination-link next">
          <span class="pagination-sub">${nextArticle.isCommercial ? 'Deploy & Evaluate →' : 'Next Article →'}</span>
          <span class="pagination-title">${nextArticle.isCommercial ? nextArticle.shortTitle : `§${nextArticle.num}: ${nextArticle.shortTitle}`}</span>
        </a>
      ` : '<div class="pagination-empty"></div>'}
    </nav>
  ` : '';

  const executiveBrief = EXECUTIVE_BRIEFS[currentSlug] || EXECUTIVE_BRIEFS.home;
  const executiveBriefHtml = currentSlug === '' ? '' : `
    <section class="executive-brief" aria-label="Executive reading guide">
      <div class="brief-label">Executive reading guide · 60 seconds</div>
      <dl class="brief-grid">
        <div class="brief-item">
          <dt>Problem</dt>
          <dd>${escapeHtml(executiveBrief.problem)}</dd>
        </div>
        <div class="brief-item">
          <dt>What it proves</dt>
          <dd>${escapeHtml(executiveBrief.proof)}</dd>
        </div>
        <div class="brief-item">
          <dt>Commercial relevance</dt>
          <dd>${escapeHtml(executiveBrief.commercial)}</dd>
        </div>
        <div class="brief-item">
          <dt>Next step</dt>
          <dd>${escapeHtml(executiveBrief.next)}</dd>
        </div>
      </dl>
    </section>
  `;

  const relatedProofHtml = currentSlug === "03-eisa-four-gate-verdict-machine-and-entity-resolution" ? `
    <aside class="proof-link-panel" aria-label="Semantic Switch public evidence">
      <div>
        <div class="brief-label">EXPERIMENTAL ALPHA · SYNTHETIC INVARIANCE TESTBED</div>
        <h2>Inspect the Semantic Switch alpha evidence pack</h2>
        <p>Download synthetic fixtures and verification harnesses, inspect raw results, and reproduce 20/20 invariance blocks and 23/23 exact native relations.</p>
      </div>
      <a href="/semantic-switch-proof/" class="btn-primary">Open proof pack</a>
    </aside>
  ` : '';

  const releaseHtml = currentSlug === "09-bring-one-real-boundary-work-with-blayne" ? RELEASE_BANNER_HTML : '';
  const insightHtml = [
    "01-an-ai-output-is-not-an-act",
    "09-bring-one-real-boundary-work-with-blayne"
  ].includes(currentSlug) ? GENUINE_INSIGHT_HTML : '';
  const portabilityHtml = [
    "05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion",
    "07-defeating-approval-laundering-act-pinning-and-successor-grants",
    "08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate"
  ].includes(currentSlug) ? PORTABILITY_HTML : '';
  const subpagePurposeHtml = [
    "01-an-ai-output-is-not-an-act",
    "02-zero-trust-document-ingestion-and-server-cut-evidence",
    "03-eisa-four-gate-verdict-machine-and-entity-resolution",
    "04-the-room-why-git-and-chat-are-not-coordination-planes",
    "05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion",
    "06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine",
    "07-defeating-approval-laundering-act-pinning-and-successor-grants",
    "08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate"
  ].includes(currentSlug) ? `
    <div class="subpage-purpose">Architectural proof-of-work by Blayne Aina (FDE & Principal Systems Architect) — Evaluating for a role? Start with the <a href="/#purpose">Executive Purpose & Career Snapshot (§00)</a> or <a href="/09-bring-one-real-boundary-work-with-blayne/">Live Evaluation Protocol (§09)</a>.</div>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Blayne Aina</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${canonicalUrl}">

  <!-- OpenGraph / Social -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Blayne Aina — The Route to Trusting AI">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">

  <link rel="stylesheet" href="/style.css?v=20261106-wide-layout">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <div class="reading-progress-bar" id="progressBar"></div>

  <header class="site-header">
    <div class="header-inner">
      <a href="/" class="brand">
        <span class="brand-name">BLAYNE AINA</span>
        <span class="brand-divider">/</span>
        <span class="brand-tagline">The Route to Trusting AI</span>
      </a>
      <div class="header-actions">
        <a href="/refusal-proof/" class="header-link">Proof</a>
        <a href="/proof/README.md" class="header-link">Schemas</a>
        <a href="https://github.com/SquadForge/blayne.aina" class="header-link" rel="noopener noreferrer">GitHub</a>
        <button type="button" class="header-link header-search" id="quickSearchBtn" aria-label="Search articles and proof artifacts">Search</button>
        <a href="/09-bring-one-real-boundary-work-with-blayne/" class="header-cta">Work With Blayne (§09)</a>
        <button id="themeToggle" class="theme-btn" aria-label="Toggle theme">
          <span class="theme-icon light">☀️</span>
          <span class="theme-icon dark">🌙</span>
        </button>
${presentationPage ? '' : '        <button id="mobileMenuBtn" class="mobile-menu-btn" aria-label="Open navigation menu" aria-controls="sidebar" aria-expanded="false">☰</button>'}
      </div>
    </div>
  </header>

  <div class="candidate-ribbon" role="region" aria-label="Candidate identity and evaluation paths">
    <div class="candidate-identity"><strong>EVALUATE BLAYNE</strong><span>Choose your path</span></div>
    <nav class="candidate-links" aria-label="Evaluation paths">
      <a href="/#career-snapshot">Recruiter &amp; Hiring Lead</a>
      <a href="/refusal-proof/">Systems Engineer</a>
      <a href="/#formal-confinement">AI Safety Researcher</a>
      <a href="mailto:me@blayneaina.com" class="candidate-email">me@blayneaina.com</a>
    </nav>
  </div>
  <div class="layout-container ${presentationPage ? 'presentation-layout' : ''}">
    <aside class="site-sidebar" id="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-label">Architecture Series</span>
        <span class="sidebar-date">October 2026</span>
      </div>
      <nav class="series-nav">
        <ul>
          <li class="${isHome ? 'active' : ''}">
            <a href="/">
              <span class="nav-num">§00</span>
              <span class="nav-title">Series Overview & Thesis</span>
            </a>
          </li>
          ${navLinks}
        </ul>
        <div class="sidebar-section-divider">
          <span class="sidebar-label">Deploy & Evaluate</span>
        </div>
        <ul>
          ${commercialLinks}
          <li>
            <a href="mailto:me@blayneaina.com?subject=[RESEARCH]%20Independent%20Technical%20Evaluation">
              <span class="nav-num">↗</span>
              <span class="nav-title">Independent Evaluation [RESEARCH]</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="sidebar-footer">
        <div class="author-card">
          <div class="author-name">Blayne Aina</div>
          <div class="author-bio">By Blayne Aina · Principal Systems Architect and creator of AINA · October 31, 2026 · AINA Governance Specification</div>
          <div class="author-bio">FDE · 11+ Years Customer-Embedded Delivery · USMC Veteran</div>
          <a href="mailto:me@blayneaina.com" class="author-email">me@blayneaina.com</a>
          <div class="author-contact">Blayne Aina · Denver, CO · <a href="mailto:me@blayneaina.com">me@blayneaina.com</a></div>
          <a href="https://github.com/SquadForge/blayne.aina" class="author-contact" rel="noopener noreferrer">GitHub Repo (SquadForge/blayne.aina)</a>
        </div>
      </div>
    </aside>

    <main class="content-area">
      <article class="prose-wrapper ${presentationPage ? 'presentation-wrapper' : ''}">
${pageHeroHtml ? pageHeroHtml.trim() : `<header class="article-header">
          <h1 class="article-title">${escapeHtml(title)}</h1>
          ${subtitle ? `<p class="article-subtitle">${escapeHtml(subtitle)}</p>` : ''}
          <div class="article-meta">
            <span class="meta-item author">By Blayne Aina</span>
            <span class="meta-dot">·</span>
            <span class="meta-item role">Principal Systems Architect and creator of AINA</span>
            <span class="meta-dot">·</span>
            <span class="meta-item date">October 31, 2026</span>
            <span class="meta-dot">·</span>
            <span class="meta-item tag">AINA Governance Specification</span>
          </div>
        </header>`}

        ${executiveBriefHtml}
        ${releaseHtml}
        ${insightHtml}
        ${portabilityHtml}

        <div class="article-body">
          ${contentHtml}
        </div>

        ${relatedProofHtml}

        ${prevNextHtml}

        <footer class="article-footer-cta">
          <h3>Work With Blayne (§09): Bring One Real Boundary</h3>
          <p>Do not bring a vision deck. Bring one consequential enterprise transition—workflow standing, hostile document adjudication, or protected entity resolution. We establish a written acceptance boundary, run the existing implementation, and make the positive, refusal, and unresolved evidence inspectable.</p>
          <div class="cta-actions">
            <a href="/09-bring-one-real-boundary-work-with-blayne/" class="btn-primary">Work With Blayne (§09)</a>
            <a href="mailto:me@blayneaina.com?subject=[CHALLENGE]%20Enterprise%20Boundary" class="btn-secondary">me@blayneaina.com</a>
          </div>
        </footer>
      </article>
    </main>
  </div>

  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-left">
        <strong>blayneaina.com</strong> — Architectural invariants, verifiable execution, and production governance for autonomous systems.
      </div>
      <div class="footer-right">
        <span>© 2026 Blayne Aina. All rights reserved.</span>
      </div>
    </div>
  </footer>

${presentationPage ? `<nav class="quick-dock" aria-label="Quick evaluation links">
    <a href="/refusal-proof/">Proof</a>
    <a href="/09-bring-one-real-boundary-work-with-blayne/">Evaluate</a>
    <a href="https://github.com/SquadForge/blayne.aina" rel="noopener noreferrer">GitHub</a>
  </nav>` : ''}

  <dialog class="quick-search" id="quickSearchDialog" aria-labelledby="quick-search-title">
    <div class="quick-search-head">
      <label id="quick-search-title" for="quickSearchInput">Search architecture and evidence</label>
      <button type="button" id="quickSearchClose" aria-label="Close search">Close</button>
    </div>
    <input id="quickSearchInput" type="search" placeholder="Try EISA, PCNA, SQLite, leases, Semantic Switch…" autocomplete="off">
    <div class="quick-search-results" id="quickSearchResults">
      <a href="/refusal-proof/" data-search-item><strong>Refusal &amp; Unchanged-Destination Proof</strong><span>PCNA · EISA · verifier · SQLite · 45 cases</span></a>
      <a href="/proof/conformance/conformance_45_manifest.json" data-search-item><strong>45-case conformance manifest</strong><span>release qualification · candidate results</span></a>
      <a href="/proof/README.md" data-search-item><strong>Schemas and verifier guide</strong><span>offline verification · artifact index</span></a>
      <a href="/semantic-switch-proof/" data-search-item><strong>Semantic Switch proof</strong><span>AKO · Lampson confinement · relation isomorphism</span></a>
      <a href="/#formal-confinement" data-search-item><strong>Formal confinement and A2E</strong><span>bounded TCB · finiteness · three provisionals</span></a>
      <a href="/#career-snapshot" data-search-item><strong>Enterprise delivery snapshot</strong><span>2015–2026 · CRM · migrations · production cutovers</span></a>
      ${ARTICLES.map(art => `<a href="/${art.slug}/" data-search-item><strong>§${art.num} · ${escapeHtml(art.shortTitle)}</strong><span>${escapeHtml(art.theme)}</span></a>`).join('')}
    </div>
  </dialog>

  <script src="/script.js?v=20261105-final-qc"></script>
</body>
</html>`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 1. Process Individual Articles
console.log('Processing 9 articles...');
ARTICLES.forEach((art, index) => {
  const filePath = path.join(ROOT_DIR, art.file);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    return;
  }
  const raw = normalizeInternalLinks(fs.readFileSync(filePath, 'utf8'));
  const { frontmatter, markdown } = parseFrontmatter(raw);
  
  const title = frontmatter.title || art.shortTitle;
  const subtitle = frontmatter.subtitle || '';
  const htmlContent = marked.parse(stripStandaloneArticleHeader(markdown, title));

  const prevArticle = index > 0 ? ARTICLES[index - 1] : null;
  const nextArticle = index < ARTICLES.length - 1 ? ARTICLES[index + 1] : null;

  const fullHtml = generateHtml({
    title,
    subtitle,
    contentHtml: htmlContent,
    currentSlug: art.slug,
    prevArticle,
    nextArticle
  });

  // Write to dist/<slug>/index.html
  const artDir = path.join(DIST_DIR, art.slug);
  if (!fs.existsSync(artDir)) {
    fs.mkdirSync(artDir, { recursive: true });
  }
  fs.writeFileSync(path.join(artDir, 'index.html'), fullHtml, 'utf8');
  // Also write to dist/<slug>.html for direct linking
  fs.writeFileSync(path.join(DIST_DIR, `${art.slug}.html`), fullHtml, 'utf8');
  console.log(`✓ Built Article ${art.num}: ${art.slug}`);
});

// 2. Generate Index / Landing Page
console.log('Generating Home Page (index.html)...');
const homeHeroHtml = `
<section class="page-hero" aria-labelledby="home-hero-title">
  <div class="hero-grid">
    <div class="hero-copy">
      <div class="hero-eyebrow">Inspectable verification bundle live · recorded public evidence</div>
      <h1 class="hero-title-xl" id="home-hero-title">AI can propose.<span class="hero-serif">It cannot act.</span></h1>
      <p class="hero-summary">AINA compiles model output into bounded proposals, checks authority at the execution boundary, and proves when protected state remains untouched. <strong>Trust is not a prompt. It is a boundary.</strong></p>
      <div class="hero-actions">
        <a href="/refusal-proof/" class="btn-primary">Inspect the Refusal Proof</a>
        <a href="/proof/aina-refusal-proof-pack-v1.zip" class="btn-secondary">Download Proof Bundle</a>
      </div>
      <p class="hero-note"><strong>Blayne Aina</strong> · Forward-Deployed Engineer · Principal AI Systems &amp; Enterprise CRM Architect · Denver, CO<br>11+ years of enterprise delivery · seeking a full-time FDE, Principal AI Systems, or Staff Enterprise Architecture role—not selling a SaaS subscription.</p>
      <div class="hero-kpis" aria-label="Published verification results">
        <div class="hero-kpi"><strong>4/4</strong><span>deterministic refusal cases</span></div>
        <div class="hero-kpi"><strong>45/45</strong><span>candidate conformance cases</span></div>
        <div class="hero-kpi"><strong>20/20</strong><span>evidence acceptance cases</span></div>
        <div class="hero-kpi"><strong>16,384</strong><span>SQLite bytes unchanged · Case C</span></div>
      </div>
    </div>
    <div class="proof-console" aria-label="Case C approval-parameter substitution refusal">
      <div class="console-top"><span>PCNA · CASE C</span><span class="console-status refusal">REFUSED</span></div>
      <div class="console-grid">
        <div class="console-cell wide"><span class="console-label">Protected destination</span><span class="console-value">contacts.db · id=1 · row_version=1</span></div>
        <div class="console-cell"><span class="console-label">Controller fixed</span><span class="console-value">"Controller fixed value"</span></div>
        <div class="console-cell"><span class="console-label">Worker proposed</span><span class="console-value">"Unrequested but valid value"</span></div>
        <div class="console-cell wide"><span class="console-label">Deterministic decision</span><span class="console-value refusal">requested_act_mismatch</span></div>
        <div class="console-cell"><span class="console-label">Effects / model calls</span><span class="console-value">0 / 0</span></div>
        <div class="console-cell"><span class="console-label">Destination bytes</span><span class="console-value teal">16,384 / 16,384</span></div>
        <div class="console-cell wide"><span class="console-label">Pre-attempt / post-refusal SHA-256</span><span class="console-value teal">362088a1…b47d719 · MATCH</span></div>
      </div>
      <div class="console-foot"><span>RECORDED PUBLIC RECEIPT</span><span>NO DESTINATION MUTATION</span></div>
    </div>
  </div>
</section>
`;

const indexHtmlContent = `
<section class="executive-brief purpose-panel" id="purpose" aria-labelledby="purpose-title">
  <div class="brief-label" id="purpose-title">Purpose of This Site — Hiring the Architect, Not Buying Software</div>
  <div class="purpose-grid">
    <div>
      <h2>Who I am &amp; what I want</h2>
      <p>I am a Forward-Deployed Engineer and Principal Systems Architect with 11+ years of hands-on enterprise delivery across CRM architecture, multi-business data migrations, and production cutovers. I am seeking a full-time Forward-Deployed Engineering, Principal AI Systems, or Staff Enterprise Architecture role—I am not pitching a SaaS subscription or raising venture capital.</p>
    </div>
    <div>
      <h2>What AINA is</h2>
      <p>Anyone can write “AI agent orchestration” on a résumé. To make my engineering methodology inspectable, I spent 14 months as an unfunded solo architect directing a coordinated 9-IDE AI fleet to build AINA (Autonomous Intelligent Networked Architecture—and my surname): a deterministic execution-governance runtime that stops AI agents from making unauthorized, stale, or unverified changes to production systems.</p>
    </div>
  </div>
  <div class="purpose-readers">
    <h2>How hiring teams and technical researchers should use this site</h2>
    <ul>
      <li><strong>Recruiter or hiring lead · 60-second read:</strong> Review the <a href="#career-snapshot">11+ Year Enterprise Delivery Snapshot</a> immediately below to verify my production track record, then jump to <a href="/09-bring-one-real-boundary-work-with-blayne/">§09 — Work With Blayne</a> for the five-dimension FDE interview rubric.</li>
      <li><strong>Principal architect or systems engineer · deep read:</strong> Inspect the <a href="/refusal-proof/">Offline Refusal Proof</a>, run the zero-dependency verifier on <a href="https://github.com/SquadForge/blayne.aina" rel="noopener noreferrer">GitHub (SquadForge/blayne.aina)</a> in 10 seconds, and read §01–§08 for the kernel and state-machine invariants.</li>
      <li><strong>AI safety, formal verification &amp; cybersecurity researcher · confinement &amp; verifier audit:</strong> Jump directly to <a href="#formal-confinement">Formal Impossibility, Lampson Confinement &amp; The 3-Provisional A2E Architecture</a> below, inspect how <a href="/refusal-proof/">Refusal Proof</a> avoids the infinite regress of verifiers via a non-Turing-complete integer-only transition grammar (<code>EISA</code>), and examine how <a href="/semantic-switch-proof/">Semantic Switch Proof</a> enforces Butler Lampson's confinement laws upstream of external models.</li>
    </ul>
  </div>
</section>

<section class="career-snapshot" id="career-snapshot" aria-labelledby="career-snapshot-title">
  <div class="brief-label">Enterprise Delivery Snapshot · 2015–2026</div>
  <h2 id="career-snapshot-title">11+ years of production delivery, before the architecture jargon</h2>
  <p>Dates, operating environments, and concrete outcomes—the enterprise integration record behind AINA.</p>
  <div class="career-table-scroll" tabindex="0" role="region" aria-label="Enterprise delivery snapshot table">
    <table>
      <thead><tr><th scope="col">Period</th><th scope="col">Organization / Engagement</th><th scope="col">Role &amp; Core Enterprise Scope</th><th scope="col">Verifiable Production Outcome</th></tr></thead>
      <tbody>
        <tr><td>2025–2026 (14 Mos)</td><td><strong>AINA Architecture</strong><br>Independent R&amp;D</td><td>Principal Systems Architect<br>Unfunded Solo · 9-IDE AI Fleet</td><td>Built deterministic AI execution-governance runtime (<code>squad.exe</code>), 45/45 binary conformance gate, and public SHA-256 refusal verifier.</td></tr>
        <tr><td>2022–2025</td><td><strong>Agile Education Marketing</strong></td><td>Enterprise CRM &amp; Integration Architect</td><td>Re-architected HubSpot/Salesforce integration boundaries, automated identity deduplication, and hardened lifecycle ETL pipelines.</td></tr>
        <tr><td>2019–2022</td><td><strong>DrayMaster Enterprise</strong></td><td>Lead Systems &amp; Data Migration Architect</td><td>Directed production data migration and rate-engine cutovers across 7 business entities and 800+ freight carriers.</td></tr>
        <tr><td>Selected Advisory</td><td><strong>Photector</strong></td><td>Workflow &amp; State-Machine Systems Advisor</td><td>Designed deterministic workflow state transitions and automated intake validation boundaries.</td></tr>
        <tr><td>2015–2018</td><td><strong>Jacuzzi Colorado</strong></td><td>Multi-Location Systems &amp; Operations Lead</td><td>Led 6-location infrastructure cutover, POS/ERP inventory synchronization across 15,000+ SKUs, and operator launch readiness.</td></tr>
      </tbody>
    </table>
  </div>
</section>

<aside class="portability-note scope-reality" aria-labelledby="scope-reality-title">
  <div class="brief-label" id="scope-reality-title">Scope &amp; Diligence Reality Check · 4 Fast Answers Before You Read</div>
  <ul>
    <li><strong>Why Windows NT first (and not every OS on earth)?</strong> I am one unfunded solo builder, not a 40-person venture-backed platform team. Proving real kernel-enforced process suspension (<code>CreateProcessW(CREATE_SUSPENDED)</code>), handle-table inspection (<code>PssCaptureSnapshot</code>), and share-mode write exclusion on one unforgiving OS substrate proves the engineering methodology. Under <a href="/09-bring-one-real-boundary-work-with-blayne/">§09</a>, no target OS is claimed without its own full 45-case conformance battery—building an unpaid Linux port without a customer acceptance contract would be speculative work that violates my own discipline.</li>
    <li><strong>Why is <code>squad.exe</code> private while the verification harness is public?</strong> Nobody hands away 14 months of proprietary Rust source code on the public web so strangers can clone it. Instead, the complete verification layer—refusal receipts, pre/post SHA-256 state digests, and a zero-dependency Python verifier (<code>proof/verify_refusal_proof.py</code>)—is public and runnable offline in 10 seconds, while the live Rust workspace and <code>squad.exe</code> binary are demonstrated live during technical interviews or shared under mutual NDA. TypeScript is used only as minimal glue; the public JavaScript and Python files are website-build and verification tooling, not the runtime implementation.</li>
    <li><strong>Why does the public GitHub repository show 1 Commit?</strong> <a href="https://github.com/SquadForge/blayne.aina" rel="noopener noreferrer">github.com/SquadForge/blayne.aina</a> is a sanitized v1.0 public release snapshot of the specification and offline verification bundle. The 14-month commit history, bounded slice-decomposition logs, and Rust crates reside in my private engineering repositories and are walked through live on screen during interviews.</li>
    <li><strong>How do the 45 conformance cases relate to the 47 EISA fault classes (§03)?</strong> The 45 binary conformance cases test end-to-end execution boundaries, where several cases exercise compound fault classes simultaneously, while isolated fault-class primitives are enforced at the crate unit-test layer.</li>
  </ul>
</aside>

<section class="portability-note formal-confinement" id="formal-confinement" aria-labelledby="formal-confinement-title">
  <h2 id="formal-confinement-title">Formal Impossibility, Lampson Confinement &amp; The 3-Provisional A2E Architecture</h2>
  <p>Mainstream AI guardrails attempt to make probabilistic models "safe" through prompt instructions, RLHF, or secondary LLM judges. As formal AI safety research has established (Yampolskiy, <em>AI: Unexplainable, Unpredictable, Uncontrollable</em>, 2024; Brcic &amp; Yampolskiy, <em>Impossibility Results in AI</em>, 2022), trying to formally verify or permanently align a self-modifying, Turing-complete neural network runs directly into <strong>Rice's Theorem</strong>, <strong>the Halting Problem</strong>, and <strong>the infinite regress of verifiers</strong>.</p>
  <p><strong>AINA (Autonomous Intelligent Networked Architecture)</strong> is built on the opposite premise: <strong>treat the neural network's internals as permanently unexplainable, unpredictable, and untrusted, and govern only the deterministic transduction of authority into effect (<code>Authority-to-Effect</code> / <code>A2E</code>).</strong></p>
  <p>The public Windows NT verification runtime (<code>squad.exe</code>) and 45-case conformance suite in this repository represent the <strong>Tier 1 / Tier 2 reference implementation</strong> of a unified <strong>three-provisional USPTO patent estate filed in April–May 2026</strong>:</p>
  <ul>
    <li><strong>Provisional #1 (Filed April 12, 2026) — <em>Quintipartite Constitutional Architecture &amp; Stage Zero Protected Reality</em>:</strong> Establishes separation of powers across <strong>Five Mother Centers</strong> (<code>EISA</code> Lawful Act, <code>Actor ABI</code> Lawful Actor, <code>Perceptual Closure</code> Lawful Encounter, <code>Machine Force</code> Lawful Execution, and <code>Terminal Binding</code> Lawful Finality) and the 4-stage <strong>Topological Physics Pipeline (<code>Mesh → Fracture → Forge → Shield</code>)</strong>.</li>
    <li><strong>Provisional #2A &amp; #2B (Filed May 2, 2026) — <em>Semantic Switch, MX2MX Sovereign Treaties &amp; Internal Pipeline Mechanics</em>:</strong> Formalizes <strong>Butler Lampson Confinement</strong> via the Fiction-First <code>Semantic Switch</code>, the constant-time <strong>Anti-Knowledge Oracle (<code>AKO</code>)</strong>, <strong>Monotonic Burden Accumulation (<code>MBA</code>)</strong> across <code>MX2MX</code> sovereign treaties, <code>Prompt-to-ROM</code> instruction locking, and adversarial <strong>Prosecutor / Defender / Arbiter tribunals</strong> in <code>Fracture</code>.</li>
    <li><strong>Provisional #3 (Filed May 15, 2026) — <em>Layer-Zero Authority-to-Effect (<code>A2E</code>) Hardware-Interlocked Governance</em>:</strong> Extends the architecture across a <strong>4-Tier Constitutional Assurance Continuum</strong> (from Tier 1 deterministic software chambers and Tier 2 TEEs up to Tier 4 FPGA/ASIC <strong>Proxy Substrates</strong> that physically remove actuator registers from CPU address space behind a hardware <strong>Execution Latch</strong>).</li>
  </ul>
  <div class="tier-grid" aria-label="Four-tier Constitutional Assurance Continuum">
    <article class="tier-card"><span>TIER 1 · REFERENCE</span><strong>Deterministic software chamber</strong><p>Finite EISA admission, typed leases, monotonic generations, and write-denied offline verification.</p></article>
    <article class="tier-card"><span>TIER 2 · REFERENCE</span><strong>OS-enforced execution boundary</strong><p>Windows NT process suspension, handle inspection, file-share exclusion, and SQLite row-version checks.</p></article>
    <article class="tier-card"><span>TIER 3 · ARCHITECTURE</span><strong>Hardware-separated authority</strong><p>Trusted execution and hardware-separated standing extend the same Authority-to-Effect boundary.</p></article>
    <article class="tier-card"><span>TIER 4 · ARCHITECTURE</span><strong>FPGA / ASIC execution latch</strong><p>Proxy Substrate physically interposes actuator authority behind a hardware execution latch.</p></article>
  </div>
  <p class="panel-note"><strong>Evidence boundary:</strong> the public runtime demonstrates Tier 1/Tier 2 on Windows NT. Tier 3/Tier 4 are architectural continuation claims available for scoped technical and IP diligence, not capabilities asserted by the public proof bundle.</p>
  <table>
    <thead><tr><th scope="col">Foundational AI Safety / Security Problem</th><th scope="col">Why Standard Software Guardrails &amp; HITL Fail</th><th scope="col">How AINA Solves the Boundary Across Tiers 1–4</th></tr></thead>
    <tbody>
      <tr><td><strong>1. Infinite Regress of Verifiers &amp; Undecidability</strong> (<em>Rice's Theorem / Halting Problem</em>)</td><td>Using an LLM judge or complex software monitor to verify an agent creates an infinite verifier regress; self-modifying code cannot be statically verified.</td><td><strong>Finite-State <code>EISA</code> Transition Model + Bounded TCB Reference Monitor:</strong> Models have zero standing to actuate. Rather than verifying neural weights, AINA relocates verification into a minimal OS/hardware Trusted Computing Base (TCB): every proposed action must compile into a provably finite <code>EISA</code> operand envelope (bounded instruction count, fixed-width integers, bounded memory, zero loops/recursion, zero dynamic code generation), audited offline by a tiny, static, write-denied verifier (<code>proof/verify_refusal_proof.py</code>).</td></tr>
      <tr><td><strong>2. Concentration of Agency, Sycophancy &amp; Monoculture Collusion</strong></td><td>A single agent (or multiple instances of the same model family) shares blind spots, sycophantically agrees during deliberation, or executes a treacherous turn.</td><td><strong>Quintipartite Separation of Powers + Hardware CAM Epistemic Distance Gate:</strong> Deliberation (<code>Fracture</code>) is split across epistemically isolated <strong>Prosecutor, Defender, and Arbiter</strong> lanes (<code>Cubicle Model</code>) with write-denied verifiers and an <strong>Anti-Monoculture CAM Gate</strong> enforcing minimum weighted Hamming <strong>Epistemic Distance</strong> across distinct model families (<code>xAI</code>, <code>OpenAI</code>, <code>Mistral</code>) before quorum can form.</td></tr>
      <tr><td><strong>3. Butler Lampson Confinement &amp; Covert Timing Channels</strong> (<em>Leakproofing the Singularity</em>)</td><td>Sending sensitive graphs to external models leaks protected state; agents use error diffs or response timing as covert channels.</td><td><strong>Fiction-First <code>Semantic Switch</code> + Constant-Time Anti-Knowledge Oracle (<code>AKO</code>):</strong> Sensitive reality is mapped into a chartered target fiction domain (<a href="/semantic-switch-proof/">Semantic Switch Proof</a>) before model invocation. Forbidden edges are severed into an <code>AKO</code> with constant-time batch evaluation and <strong>honeypot traps</strong>, while exfiltrated tokens remain <strong>constitutionally inert</strong> outside the <code>Standing Ledger</code>.</td></tr>
      <tr><td><strong>4. Multi-Agent Alignment Across Sovereign Domains</strong> (<em>Personal Universes</em>)</td><td>Competing organizations, jurisdictions, or coalition partners cannot share a single global value function or master database.</td><td><strong><code>MX2MX</code> Dual Constitutional Re-binding &amp; Monotonic Burden Accumulator:</strong> Each domain governs its own chartered universe. Cross-boundary actions require a cryptographic <code>TreatyObject</code> where authority strictly contracts (<code>Sₙ₊₁ = Sₙ ∩ S_dest</code>) and compliance burdens accumulate monotonically (<code>Bₙ₊₁ = Bₙ ∪ B_new</code>).</td></tr>
      <tr><td><strong>5. Social Engineering &amp; Coercion of the Human-in-the-Loop</strong> (<em>Biometrics &amp; Forensics</em>)</td><td>An agent spoofs UI coordinates (<code>Poisoned Coordinate Injection</code>) to trick a human reviewer, or a human operator is coerced into approving an unsafe override.</td><td><strong>Perceptual Closure (<code>PC ABI</code>) + PUF Biometric Duress <code>PCNA</code> Handshake:</strong> Separates the <strong>Browsing Plane</strong> from the <strong>Verification Plane</strong> via <code>Deterministic Geometry Genesis</code>. Human overrides compile into <code>HUMAN_OVERRIDE_PROPOSAL</code> objects requiring a live hardware <strong>Proxy-PUF</strong> biometric token, including a <strong>covert biometric duress input</strong> that sets an internal <code>DISTRESS</code> flag and emits a <strong>Proof-Carrying Non-Action (<code>PCNA</code>)</strong> receipt while appearing compliant to a coercer.</td></tr>
      <tr><td><strong>6. Hardware Bypass, TOCTOU &amp; Distributed Swarm Scaling</strong></td><td>Software checks in user space can be bypassed via TOCTOU process injection, brown-out faults, or <code>O(N²)</code> consensus collapse on tactical links.</td><td><strong>Tier 4 FPGA Execution Latch + 2D Cellular Automaton Turing-pBFT (<code>O(k²)</code>):</strong> In Tier 1/2, Windows NT kernel suspension (<code>CreateProcessW(CREATE_SUSPENDED)</code> + <code>PssCaptureSnapshot</code>) binds approval to process identity. In Tier 4, an FPGA <strong>Proxy Substrate</strong> drives a physical 3-state <strong>Execution Latch</strong> (<code>RESET</code>, <code>ARMED_CONDITIONAL</code>, <code>SET</code>) with analog voltage comparators, while a <strong>2D cellular automaton FPGA grid</strong> executes integer-only <strong>Turing reaction-diffusion morphogenesis</strong> to bound Byzantine consensus to <code>O(k²)</code> local hardware zones.</td></tr>
    </tbody>
  </table>
  <details class="review-subsection" id="primitives-map" open>
    <summary id="primitives-map-title">1. Mapping AINA Architecture Terms to Recognizable Systems-Security Primitives <span class="review-meta">8 mappings</span></summary>
    <p>To ensure external reviewers can evaluate the engineering mechanisms without learning a private lexicon first, every named component in AINA maps directly to a standard operating-system, database, or cryptographic primitive:</p>
    <table>
      <thead><tr><th scope="col">AINA Architectural Term</th><th scope="col">Classical Computer-Security / Systems Primitive</th><th scope="col">Concrete Implementation in the Windows NT Reference Runtime (<code>squad.exe</code>)</th></tr></thead>
      <tbody>
        <tr><td><strong>Stage Zero / Authority-to-Effect (<code>A2E</code>)</strong></td><td><strong>Reference Monitor / Capability Gate</strong> (<em>Anderson, 1972</em>)</td><td>Decouples untrusted LLM proposal generation from privileged OS process creation and database commit authority.</td></tr>
        <tr><td><strong><code>EISA</code> (Execution Invariant State Automaton)</strong></td><td><strong>Finite-State Automaton / Loop-Free Bytecode Verifier</strong></td><td>Strictly bounded, acyclic transition envelope with fixed-width integers, closed enums, and zero dynamic code generation.</td></tr>
        <tr><td><strong>Server-Cut Evidence (<code>srv_</code> / <code>ev_</code>) (§02)</strong></td><td><strong>Cryptographic Content-Addressed Provenance</strong></td><td>Controller-computed SHA-256 digests and exact byte-span selectors verified prior to transition admission.</td></tr>
        <tr><td><strong>Act-Pinning Across Process Spawn (§07)</strong></td><td><strong>TOCTOU Prevention via Suspended Process Inspection</strong></td><td>Spawns worker via <code>CreateProcessW(CREATE_SUSPENDED)</code>, inspects process memory and handles via <code>PssCaptureSnapshot</code>, and verifies digest match against <code>RequestedAct</code> before calling <code>ResumeThread</code>.</td></tr>
        <tr><td><strong>Typed Leases &amp; Generation Fencing (§05)</strong></td><td><strong>Monotonic Fencing Tokens</strong> (<em>Kleppmann, 2016</em>) <strong>+ Kernel Lock Exclusion</strong></td><td>Combines monotonically increasing integer lease generations with Win32 zero-share file handles (<code>dwShareMode = 0</code>) and SQLite row-version checks (<code>WHERE row_version = expected_v</code>).</td></tr>
        <tr><td><strong>Amber Quarantine Vault (§06)</strong></td><td><strong>Non-Destructive Intrusion Forensics / Append-Only WORM Log</strong></td><td>Preserves rejected or out-of-bounds agent payloads in an unindexed quarantine store rather than erasing forensic evidence during rollback.</td></tr>
        <tr><td><strong>Proof-Carrying Non-Action (<code>PCNA</code>)</strong></td><td><strong>Tamper-Evident Negative Audit Receipt</strong></td><td>Canonical JSON refusal receipt binding the failed gate code to matching pre-attempt and post-refusal destination SHA-256 digests (<code>proof/verify_refusal_proof.py</code>).</td></tr>
        <tr><td><strong>Semantic Switch &amp; <code>AKO</code> (§03 / Prov. #2A)</strong></td><td><strong>Lampson Confinement (1973) + Order/Structure-Preserving Pseudonymization</strong></td><td>Projects entity graphs into synthetic Relation IDs (<code>RIDs</code>) upstream of external model calls and severs forbidden edges behind a constant-time Bloom/lookup filter (<code>AKO</code>).</td></tr>
      </tbody>
    </table>
  </details>
  <details class="review-subsection" id="reviewer-qa" open>
    <summary id="reviewer-qa-title">2. Five Questions Formal &amp; Security Reviewers Ask First <span class="review-meta">5 answers</span></summary>
    <table>
      <thead><tr><th scope="col">Reviewer Question</th><th scope="col">Why It Matters Formally</th><th scope="col">AINA's Explicit Engineering &amp; Mathematical Position</th></tr></thead>
      <tbody>
        <tr><td><strong>Q1. Is <code>EISA</code> provably finite-state, or just restricted syntax?</strong></td><td>Removing floats alone does not prevent Turing-completeness if unbounded counters and backward jumps remain.</td><td><strong>Bounded Finite-State Transition System:</strong> <code>EISA</code> enforces six explicit bounds (fixed instruction count, fixed-width integer domains, bounded memory addressing, zero backward jumps/loops, zero recursion, and zero dynamic code generation). Within those bounds, transition evaluation is decidable in bounded steps.</td></tr>
        <tr><td><strong>Q2. Does AINA eliminate verifier regress, or relocate it into a TCB?</strong></td><td>Any software verifier relies on the hardware and OS substrate beneath it (<em>Yampolskiy, Lex #431 at 01:08:19 &amp; 01:10:27</em>).</td><td><strong>Relocates and Bounds into a Minimal TCB:</strong> AINA does not claim zero-TCB magic. It relocates verification out of an undecidable trillion-parameter model and into an explicitly enumerated Trusted Computing Base: the OS kernel process/handle primitives, the deterministic admission monitor, and the static offline verifier (<code>verify_refusal_proof.py</code>).</td></tr>
        <tr><td><strong>Q3. Can an attacker or bug bypass the <code>A2E</code> boundary?</strong></td><td>A reference monitor is only sound if all mutation channels are mediated (<em>complete mediation</em>).</td><td><strong>Tier-Conditional Mediation:</strong> In Tier 1/2 (software/OS), mediation relies on OS process isolation, Win32 share-mode exclusion, and database credentials held solely by the controller. Because a compromised root OS kernel could still bypass user-space locks, Provisional #3 defines Tier 4 hardware mediation—where actuator registers are physically removed from CPU address space behind an FPGA Execution Latch.</td></tr>
        <tr><td><strong>Q4. What does the 45-case public suite prove vs. require <code>squad.exe</code> for?</strong></td><td>Distinguishes offline evidence-bundle verification from independent live execution of the runtime binary.</td><td><strong>Explicit Two-Layer Evidence Model:</strong> Running <code>python3 proof/verify_refusal_proof.py</code> proves offline that the published refusal receipts, schema declarations, 45-case / 20-case manifests, and pre/post SQLite SHA-256 digests are internally consistent and unchanged. Executing fresh adversarial inputs against the runtime requires the private <code>squad.exe</code> binary (available via submitted test vectors or scoped evaluation).</td></tr>
        <tr><td><strong>Q5. How are physical-world effects verified beyond software authorization?</strong></td><td>A hardware latch gating a wire does not by itself prove the physical environment behaved as intended.</td><td><strong>Multi-Modal Primary Sensor Corroboration:</strong> In cyber-physical embodiments (Provisional #3), AINA distinguishes between an <em>Interface Genesis Seal</em> (software/UI state) and a <em>Stage Zero Kinetic Seal</em>, requiring corroborated, hardware-attested primary sensor returns (quantized into fixed-width integers) before a physical transition can close or chain.</td></tr>
      </tbody>
    </table>
  </details>
  <p><em>Note on IP &amp; Diligence Access:</em> All background IP across the April–May 2026 three-provisional patent estate is cleanly documented and available for technical architecture review, university STTR / defense R&amp;D collaboration, or clean pre-existing IP carve-out upon hiring (<a href="mailto:me@blayneaina.com">me@blayneaina.com</a>).</p>
</section>

<aside class="context-callout" aria-label="Employer IP and provisional patent diligence">
  <h2>Employer IP &amp; Provisional Patent Diligence</h2>
  <p>The public specification and Windows NT runtime (<code>squad.exe</code>) demonstrated on this site represent the Tier 1/Tier 2 software reference implementation of a broader, three-provisional patent estate filed in April–May 2026 (spanning internal constitutional state-formation, Semantic Switch / MX2MX cross-boundary treaty governance, and Layer-Zero Authority-to-Effect [A2E] hardware-interlocked transduction across a 4-Tier Constitutional Assurance Continuum). Full specifications and claim trees are available for technical and IP diligence under mutual NDA.</p>
  <p>The core system and runtime are written in <strong>Rust</strong>, with <strong>TypeScript used only as minimal glue</strong>.</p>
</aside>

<aside class="context-callout" aria-label="Enterprise integration foundation">
  <h2>Why an Enterprise Integrator Built AINA: 11+ Years in the Data Trenches Before AI</h2>
  <p>Before the 14-month AINA engineering sprint, Blayne spent 11+ years solving the operational failures that corrupt real enterprise systems: inbound and outbound HubSpot/Salesforce integration and deduplication at Agile Education Marketing, six years of operational data across seven companies and 800+ intermodal carriers at DrayMaster, deterministic photographic-evidence workflows at Photector, and six locations and 15,000+ SKUs at Jacuzzi Colorado. AINA turns that delivery history into deterministic controls for unverified merges, race conditions, and silent rollbacks.</p>
</aside>

${GENUINE_INSIGHT_HTML}

${REFUSAL_EXHIBIT_HTML}

<section class="portability-note" id="transition-anatomy" aria-labelledby="transition-anatomy-title">
  <div class="brief-label">TRANSITION ANATOMY · STALE-WORKER FENCING</div>
  <h2 id="transition-anatomy-title">Expiry is not fencing. The write must fail.</h2>
  <p>A paused worker can wake after the workspace has moved forward. AINA evaluates the generation at the mutation boundary instead of trusting a clock-based lock or the worker's stale chat transcript.</p>
  <div class="lease-scene" aria-label="Stale worker generation refusal sequence">
    <div class="lease-node"><strong>Worker A · generation 8</strong><span>current tenancy and newer state</span></div>
    <div class="lease-arrow">→</div>
    <div class="lease-node"><strong>Commit gate</strong><span>expected generation 8</span></div>
    <div class="lease-arrow">→</div>
    <div class="lease-node"><strong>Worker B · generation 7</strong><span>stale proposal refused · destination unchanged</span></div>
  </div>
  <p class="panel-note">Read <a href="/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/">§05 on typed leases and kernel fencing</a> or inspect the <a href="/proof/refusal/stale-generation.json">reason-only stale-generation receipt</a>.</p>
</section>

${RELEASE_BANNER_HTML}

<aside class="context-callout diligence-jump" aria-label="Systems primitive translation jump link">
  <div class="brief-label">SYSTEMS PRIMITIVE TRANSLATION</div>
  <a href="#primitives-map">Map AINA’s vocabulary to recognizable OS, database, and cryptographic primitives—8 mappings + 5 first-reviewer answers →</a>
</aside>

<aside class="context-callout diligence-jump" aria-label="Technical due diligence FAQ jump link">
  <a href="/09-bring-one-real-boundary-work-with-blayne/#exhibit-9-6">Reviewing for Technical Due Diligence? Read the 14-Point Execution Security &amp; Operational Reality FAQ (Exhibit 9.6) →</a>
</aside>

${PORTABILITY_HTML}

<div class="series-architecture-banner">
  <div class="banner-title">The Nine Invariant Transitions</div>
  <div class="transitions-chain">
    <div class="chain-node">§01 Ambient Authority</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node">§02 Sealed Evidence</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node">§03 EISA Adjudication</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node">§04 The Room</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node">§05 Fenced Leases</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node">§06 Dual-Tier Vaults</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node">§07 Confinement & Acts</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node">§08 Sovereign Kill Switch</div>
    <div class="chain-arrow">→</div>
    <div class="chain-node active">§09 Bring One Boundary</div>
  </div>
</div>

<div class="articles-grid">
  ${ARTICLES.map(art => {
    return `
      <a href="/${art.slug}/" class="article-card">
        <div class="card-header">
          <span class="card-num">§${art.num}</span>
          <span class="card-theme">${art.theme}</span>
        </div>
        <h3 class="card-title">${art.shortTitle}</h3>
        <span class="card-link-text">Read Article →</span>
      </a>
    `;
  }).join('')}
</div>

<div class="commercial-callout">
  <div class="callout-content">
    <h2>Work With Blayne: Principal Architecture &amp; Forward-Deployed Engineering</h2>
    <p>
      <strong>Primary objective:</strong> a full-time Forward-Deployed Engineer, Principal Systems &amp; Data Integrations Architect, or AI Workflow Architect role. The preferred interview method is a live technical diligence walkthrough on one consequential boundary—real processes, deterministic refusals, and inspectable destination evidence—across these three tracks:
    </p>
    <ul>
      <li><strong>Track 1: AI Workflow Standing & Confinement</strong> — Sealed wake authority, typed leases, monotonic generation fencing, guarded file replacement, controller-fixed <code>RequestedAct</code>, fenced SQLite execution, honest original-vs-successor receipts, and scoped break-glass.</li>
      <li><strong>Track 2: Zero-Trust Document, Citation & EISA Adjudication</strong> — LPAC-confined parsing, explicit omission surfaces, committed views, server-cut <code>ev_</code> citations, bounded absence proofs, and deterministic Four-Gate EISA verdicts.</li>
      <li><strong>Track 3: Protected Computation & Entity Resolution</strong> — <strong>Semantic Switch (experimental alpha)</strong> structure-preserving fictionalization first (keeping native rows, keys, and the private crosswalk local) → <strong>qBlock / Qdrant Edge</strong> candidate block nomination over protected records → <strong>EISA Fracture</strong> identity adjudication with preserved dissent → <strong>EISA Forge</strong> canonical field provenance → <strong>local exact restoration</strong> → <strong>Shield</strong> forward-only dispositions.</li>
    </ul>
    <div class="callout-actions">
      <a href="/09-bring-one-real-boundary-work-with-blayne/" class="btn-primary">Explore Challenge Tracks & Acceptance Contract</a>
      <a href="/refusal-proof/" class="btn-secondary">Inspect Refusal & Conformance Proof Pack</a>
      <a href="mailto:me@blayneaina.com?subject=[CHALLENGE]%20Enterprise%20Boundary" class="btn-secondary">me@blayneaina.com</a>
    </div>
  </div>
</div>
`;

const homeHtml = generateHtml({
  title: "The Route to Trusting AI — Architecture, Grounding, and Operational Invariants",
  subtitle: "Category-defining architecture for autonomous enterprise AI transition governance.",
  contentHtml: indexHtmlContent,
  currentSlug: '',
  isHome: true,
  pageHeroHtml: homeHeroHtml
});

fs.writeFileSync(path.join(DIST_DIR, 'index.html'), homeHtml, 'utf8');
console.log('✓ Built Home Page (dist/index.html)');

// 3b. Publish the reproducible Semantic Switch proof pack
console.log('Publishing Semantic Switch proof pack...');
function copyTree(source, destination) {
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const src = path.join(source, entry.name);
    const dst = path.join(destination, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(dst, { recursive: true });
      copyTree(src, dst);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
    }
  }
}
copyTree(
  path.join(ROOT_DIR, 'proof'),
  path.join(DIST_DIR, 'proof')
);

const semanticHeroHtml = `
<section class="page-hero" aria-labelledby="semantic-hero-title">
  <div class="hero-grid">
    <div class="hero-copy">
      <div class="hero-eyebrow">Experimental alpha · synthetic invariance testbed</div>
      <h1 class="hero-title-xl" id="semantic-hero-title">Structure can travel.<span class="hero-serif">Identity stays home.</span></h1>
      <p class="hero-summary">Semantic Switch projects permitted structural relations into a <strong>chartered fiction domain</strong> before model invocation. Native rows, local keys, and the private crosswalk remain under local control.</p>
      <div class="hero-actions">
        <a href="#lampson-confinement-bridge" class="btn-primary">Inspect Confinement Mechanics</a>
        <a href="/proof/semantic-switch/README.txt" class="btn-secondary">Read Reproduction Guide</a>
      </div>
      <p class="hero-note">The public fixtures prove deterministic structural isomorphism on synthetic vectors. They do not claim universal anonymity, production entity-resolution recall, or inference resistance.</p>
      <div class="hero-kpis" aria-label="Semantic Switch verification results">
        <div class="hero-kpi"><strong>20/20</strong><span>invariance blocks</span></div>
        <div class="hero-kpi"><strong>23/23</strong><span>exact native relations</span></div>
        <div class="hero-kpi"><strong>53/53</strong><span>records verified per run</span></div>
        <div class="hero-kpi"><strong>0</strong><span>provider calls in preparation</span></div>
      </div>
    </div>
    <div class="domain-visual" data-domain-visual>
      <div class="console-top"><span>FICTION-FIRST PIPELINE</span><span class="console-status">RELATION PRESERVED</span></div>
      <div class="domain-columns">
        <div class="domain-card highlight" data-domain-card="reality">
          <h3>PROTECTED REALITY · LOCAL</h3>
          <div class="domain-node">Native entity A</div>
          <div class="domain-node">Native entity B</div>
          <div class="domain-node">RID-017 · relation</div>
          <div class="domain-node">Private crosswalk · stays local</div>
        </div>
        <div class="domain-arrow">→</div>
        <div class="domain-card" data-domain-card="fiction">
          <h3>CHARTERED FICTION · MODEL</h3>
          <div class="domain-node">Fiction entity α</div>
          <div class="domain-node">Fiction entity β</div>
          <div class="domain-node">RID-017 · same relation</div>
          <div class="domain-node">No native identifiers</div>
        </div>
      </div>
      <div class="domain-controls" aria-label="Highlight domain">
        <button type="button" class="active" data-domain="reality">Highlight protected reality</button>
        <button type="button" data-domain="fiction">Highlight chartered fiction</button>
      </div>
      <p class="hero-note">Illustrative labels for the transformation model; published verification uses synthetic fixtures.</p>
    </div>
  </div>
</section>
`;

const proofHtmlContent = `
<section class="portability-note" id="lampson-confinement-bridge" aria-labelledby="lampson-confinement-title">
  <h2 id="lampson-confinement-title">Architectural Context: Operationalizing Butler Lampson's Confinement Laws &amp; Multi-Domain Treaties (Provisional #2A)</h2>
  <p>In Butler Lampson's classic formulation of the <strong>Confinement Problem</strong> (<em>Communications of the ACM</em>, 1973)—later extended to AI boxing by Yampolskiy (<em>Leakproofing the Singularity: Artificial Intelligence Confinement Problem</em>, 2012)—confining an untrusted program requires four strict invariants: <strong>Total Isolation</strong>, <strong>Transitivity</strong>, <strong>Masking</strong> (controlling inputs to legitimate and covert channels), and <strong>Enforcement</strong> (trapping escape or probing attempts).</p>
  <p>Passing raw enterprise, medical, or classified entity graphs into an external LLM or third-party embedding API violates Lampson's first two laws immediately: the external model becomes a transitive leakage channel. <strong>AINA's Semantic Switch (<code>Provisional #2A</code>)</strong> enforces confinement <em>upstream</em> of the model through a <strong>Fiction-First Pipeline</strong> paired with <strong>MX2MX Sovereign Boundary Governance</strong>:</p>
  <table>
    <thead><tr><th scope="col">Confinement &amp; Multi-Agent Problem</th><th scope="col">Classical Failure Mode in Standard AI Pipelines</th><th scope="col">AINA Semantic Switch &amp; MX2MX Mechanism (<code>Provisional #2A</code>)</th></tr></thead>
    <tbody>
      <tr><td><strong>1. Transitive Leakage to External Models &amp; Vector DBs</strong> (Lampson Laws 1 &amp; 2: <em>Isolation &amp; Transitivity</em>)</td><td>Raw PII, proprietary schemas, or operational graphs are sent to external LLM APIs or stored as inverted embeddings in vector databases where they can be reconstructed.</td><td><strong>Fiction-First Pipeline &amp; Chartered Target Fiction Domains (<code>DomainCharterObject</code>):</strong> Protected reality is never transmitted to an untrusted model. The Semantic Switch projects permitted structural relations into a chartered synthetic target domain using deterministic Relation IDs (<code>RIDs</code>) while preserving graph isomorphism (<code>20/20</code> invariance blocks and <code>23/23</code> exact relations verified below).</td></tr>
      <tr><td><strong>2. Covert Channels, Timing Side-Channels &amp; Active Probing</strong> (Lampson Laws 3 &amp; 4: <em>Masking &amp; Enforcement</em>)</td><td>An adversarial or jailbroken agent probes restricted graph edges and infers redacted facts from error diffs, latency variations, or partial query returns.</td><td><strong>Constant-Time Anti-Knowledge Oracle (<code>AKO</code>) &amp; Honeypot Traps:</strong> Forbidden relation classes are severed into a <code>SeveranceAntiKnowledgeObject</code> governed by an active <strong>Anti-Knowledge Oracle (<code>AKO</code>)</strong>. To close oracle lookup-timing side channels under a bounded query budget, <code>AKO</code> evaluates batch admissibility in constant time (<code>O(1)</code> Bloom-filter + fixed-cycle lookup) with uniform refusal envelopes, and plants <strong>Anti-Knowledge Honeypots</strong> that immediately trap and revoke standing when an agent probes a forbidden relation path.</td></tr>
      <tr><td><strong>3. Exfiltration of Context Windows or Vector Stores</strong></td><td>If an attacker dumps the prompt cache or vector database, they obtain actionable real-world records.</td><td><strong>Constitutional Inertness &amp; Coupled Dual-Ledger State Machine:</strong> Semantic projection (<code>Correspondence Ledger</code>) is decoupled from execution authority (<code>Standing Ledger</code>). Without a live, hardware/kernel-bound <code>Standing Ledger</code> token, exfiltrated fiction-domain tokens are <strong>constitutionally inert</strong> and carry zero authority to mutate protected state.</td></tr>
      <tr><td><strong>4. Multi-Agent Value Alignment Across Competing Organizations</strong> (Yampolskiy's <em>Personal Universes</em> Problem)</td><td>Expecting independent organizations, coalitions, or jurisdictions to agree on a single global alignment rubric or shared database schema is impossible.</td><td><strong><code>MX2MX</code> Sovereign Treaties &amp; Monotonic Burden Accumulator (<code>MBA</code>):</strong> Each organization operates inside its own sovereign chartered domain. When machine consequence crosses a boundary, <code>MX2MX</code> executes <strong>Dual Constitutional Re-binding</strong> under a cryptographic <code>TreatyObject</code> where authority strictly contracts (<code>Sₙ₊₁ = Sₙ ∩ S_destination</code>) and verification obligations accumulate monotonically (<code>Bₙ₊₁ = Bₙ ∪ B_new</code>).</td></tr>
    </tbody>
  </table>
  <p class="covert-scope-note"><strong>Scope of Covert-Channel &amp; Anonymization Claims:</strong> In accordance with Lampson's distinction between legitimate and covert channels, constant-time <code>AKO</code> evaluation (<code>O(1)</code> lookup + uniform refusal envelopes) specifically bounds <strong>oracle lookup-timing and error-diff side channels</strong> within a single query batch. It does not by itself eliminate external system side channels such as network packet-size correlation, shared-cache contention, or multi-query structural intersection attacks against known auxiliary graphs. The Stage-Zero fixtures below evaluate deterministic structural isomorphism (<code>20/20</code> invariance blocks, <code>23/23</code> exact relations), not universal differential privacy.</p>
</section>

<aside class="context-callout alpha-module" aria-label="Semantic Switch maturity and scope disclosure">
  <div class="brief-label">EXPERIMENTAL RESEARCH MODULE (ALPHA) · STAGE-ZERO SYNTHETIC INVARIANCE TESTBED</div>
  <h2>Scope &amp; Maturity Disclosure</h2>
  <p><strong>Maturity &amp; Scope Note:</strong> Unlike the core deterministic execution, lease-fencing, and server-cut provenance layers (§01, §02, §04–§08), the Semantic Switch is an early-stage experimental research module. The 20/20 block-invariance and 23/23 relation-preservation fixtures in this pack validate deterministic structural isomorphism on synthetic test vectors only; they do not claim production entity-resolution recall across arbitrary noisy text or universal cryptographic anonymity against auxiliary-data reconstruction attacks.</p>
  <p>The primary public proof of the execution architecture is the <a href="/refusal-proof/">Refusal &amp; Conformance Proof Pack</a>.</p>
</aside>

<div class="proof-overview">
  <h2>Engineering purpose: blind execution with relational structure intact</h2>
  <p class="proof-lead">Semantic Switch is a deterministic relational confinement layer, not an encryption or anonymity system. It preserves equivalence relations, edit-distance structure, and graph topology so confined workers can perform entity-resolution tasks without receiving raw customer identifiers in their prompts. Frequency analysis, auxiliary-graph correlation, tokenizer-boundary effects, and production recall remain outside the proof ceiling.</p>
</div>

<div class="proof-overview">
  <p class="proof-lead">A public, reproducible evidence bundle for relation-isomorphic protected computation. The fixtures are synthetic; no customer records, private crosswalk, credentials, native identifiers, local keys, or provider calls are included.</p>
  <div class="proof-actions">
    <a href="/proof/semantic-switch/README.txt" class="btn-primary">Read the reproduction guide</a>
    <a href="/proof/semantic-switch/verify.py" class="btn-secondary">Download verify.py</a>
  </div>
</div>

<h2>Verified results</h2>
<table>
  <thead><tr><th>Verification surface</th><th>Published result</th></tr></thead>
  <tbody>
    <tr><td>Relabeling-invariance blocks</td><td><strong>20/20</strong></td></tr>
    <tr><td>Eligible native edit relations preserved exactly</td><td><strong>23/23</strong></td></tr>
    <tr><td>Records verified per relation-isomorphism run</td><td><strong>53/53</strong></td></tr>
    <tr><td>Field values verified per run</td><td><strong>529/529</strong></td></tr>
    <tr><td>Batch-restoration adversarial cases</td><td><strong>14/14</strong></td></tr>
    <tr><td>Transformation adversarial cases</td><td><strong>10/10</strong></td></tr>
    <tr><td>Provider calls during preparation</td><td><strong>0</strong></td></tr>
  </tbody>
</table>

<h2>The pipeline being tested</h2>
<pre><code>Native synthetic records
→ Semantic Switch protected representation
→ qBlock / Qdrant Edge candidate partitions
→ Fracture adjudication
→ Forge canonical selections
→ local exact restoration through the private crosswalk
→ Shield forward-only baseline defense</code></pre>
<p>The two input files describe the same relational object under different native relabelings. A correct generator must preserve the relational structure, not the native token identities. The relation audit separately requires every eligible native edit type to remain visible in the fictional representation.</p>

<h2>Reproduce the evidence</h2>
<ol>
  <li>Obtain or build a Semantic Switch executable with the relation-isomorphism-v1 feature.</li>
  <li>Download <a href="/proof/semantic-switch/verify.py">verify.py</a> and this pack's fixtures and harnesses.</li>
  <li>Run <code>python verify.py --binary /path/to/semantic-switch</code>.</li>
  <li>Compare the fresh JSON summary with the retained <a href="/proof/semantic-switch/iso.result.json">invariance result</a> and <a href="/proof/semantic-switch/iso.relations.json">exact-relation result</a>.</li>
</ol>
<p>The driver creates a temporary random local key, prepares both inputs, verifies every record and field, computes fresh reports, and deletes the temporary workspace. It exits successfully only when all 20 blocks and all 23 eligible relations pass.</p>

<h2>Artifact inventory</h2>
<ul>
  <li><a href="/proof/semantic-switch/README.txt">Reproduction guide and claim ceiling</a></li>
  <li><a href="/proof/semantic-switch/verify.py">Portable verification driver</a></li>
  <li><a href="/proof/semantic-switch/input_A.json">Input A</a> and <a href="/proof/semantic-switch/input_B.json">input B</a></li>
  <li><a href="/proof/semantic-switch/blocks_A.jsonl">Blocks A</a> and <a href="/proof/semantic-switch/blocks_B.jsonl">blocks B</a></li>
  <li><a href="/proof/semantic-switch/fixture.json">Fixture ordering</a></li>
  <li><a href="/proof/semantic-switch/harness/fingerprint.py">Relational fingerprint harness</a></li>
  <li><a href="/proof/semantic-switch/harness/relation_audit.py">Exact-relation audit</a></li>
  <li><a href="/proof/semantic-switch/iso.result.json">Retained invariance result</a></li>
  <li><a href="/proof/semantic-switch/iso.relations.json">Retained exact-relation result</a></li>
  <li><a href="/proof/semantic-switch/SHA256SUMS.txt">SHA-256 integrity manifest for every public file</a></li>
</ul>

<h2>Claim ceiling</h2>
<p>These results establish deterministic transport fidelity, exact relation preservation, complete local verification, and adversarial restoration behavior on the declared synthetic fixtures. They do not establish anonymity, inference resistance, universal privacy, matching accuracy, production merge correctness, or independent validation of a customer population. Native rows, keys, and the private crosswalk remain under client control.</p>
`;
const proofHtml = generateHtml({
  title: "Semantic Switch: Experimental Alpha Invariance Testbed",
  subtitle: "Stage-zero synthetic fixtures and reproducible structural-isomorphism checks—not a production anonymization or entity-resolution accuracy claim.",
  contentHtml: proofHtmlContent,
  currentSlug: "semantic-switch-proof",
  pageHeroHtml: semanticHeroHtml
});
const proofPageDir = path.join(DIST_DIR, 'semantic-switch-proof');
fs.mkdirSync(proofPageDir, { recursive: true });
fs.writeFileSync(path.join(proofPageDir, 'index.html'), proofHtml, 'utf8');
console.log('✓ Published Semantic Switch proof pack');

const refusalHeroHtml = `
<section class="page-hero" aria-labelledby="refusal-hero-title">
  <div class="hero-grid">
    <div class="hero-copy">
      <div class="hero-eyebrow">Open verification · recorded refusal evidence</div>
      <h1 class="hero-title-xl" id="refusal-hero-title">Refusal is a result<span class="hero-serif">you can verify.</span></h1>
      <p class="hero-summary">Real blocked mutations. Deterministic non-action receipts. Independently recomputed destination invariance. <strong>Download the bundle and check the evidence yourself in under 10 seconds.</strong></p>
      <div class="hero-actions">
        <a href="/proof/aina-refusal-proof-pack-v1.zip" class="btn-primary">Download Proof Bundle</a>
        <button type="button" class="btn-secondary" data-copy="curl -fsSL https://blayneaina.com/proof/aina-refusal-proof-pack-v1.zip -o aina-proof.zip && unzip -q aina-proof.zip -d aina-proof && cd aina-proof && python verify_refusal_proof.py">Copy One-Line Verifier</button>
      </div>
      <p class="hero-note">No candidate binary, packages, network connection, or Rust toolchain is required for offline verification. Fresh adversarial runtime vectors are available by scoped evaluation.</p>
      <div class="hero-kpis" aria-label="Refusal and conformance results">
        <div class="hero-kpi"><strong>4/4</strong><span>deterministic refusal cases</span></div>
        <div class="hero-kpi"><strong>45/45</strong><span>candidate conformance cases</span></div>
        <div class="hero-kpi"><strong>20/20</strong><span>evidence acceptance cases</span></div>
        <div class="hero-kpi"><strong>3</strong><span>unchanged destination digest chains</span></div>
      </div>
    </div>
    <div class="proof-console" aria-label="Case C refusal evidence">
      <div class="console-top"><span>PROOF-CARRYING NON-ACTION</span><span class="console-status refusal">REFUSED</span></div>
      <div class="console-grid">
        <div class="console-cell wide"><span class="console-label">Act substitution</span><span class="console-value">"Unrequested but valid value"</span></div>
        <div class="console-cell wide"><span class="console-label">Controller pinned</span><span class="console-value">"Controller fixed value"</span></div>
        <div class="console-cell wide"><span class="console-label">Decision</span><span class="console-value refusal">requested_act_mismatch</span></div>
        <div class="console-cell"><span class="console-label">Effects</span><span class="console-value">0</span></div>
        <div class="console-cell"><span class="console-label">Model calls</span><span class="console-value">0</span></div>
        <div class="console-cell"><span class="console-label">Row version</span><span class="console-value teal">1 → 1</span></div>
        <div class="console-cell"><span class="console-label">Destination</span><span class="console-value teal">16,384 / 16,384</span></div>
        <div class="console-cell wide"><span class="console-label">Pre / post SHA-256</span><span class="console-value teal">362088a1…b47d719 · MATCH</span></div>
      </div>
      <div class="console-foot"><span>CASE C · contacts.db</span><a href="/proof/refusal/act-pinning.json" class="console-status">VIEW RECEIPT →</a></div>
    </div>
  </div>
</section>
`;

const refusalProofHtmlContent = `
<section class="portability-note" id="verifier-regress-note" aria-labelledby="verifier-regress-title">
  <h2 id="verifier-regress-title">Formal Verification &amp; Computer Security Note: Relocating Verifier Regress into a Minimal TCB</h2>
  <p>In formal AI safety literature (including Brcic &amp; Yampolskiy's <em>Impossibility Results in AI</em> and Yampolskiy's <em>Untestability of AI and Unfalsifiability of AI Safety Claims</em>), attempting to formally verify a self-modifying, Turing-complete neural network encounters two fundamental barriers:</p>
  <ol>
    <li><strong>Undecidability of the Model Layer:</strong> By Rice's Theorem and the Halting Problem, no general algorithm can decide all non-trivial semantic properties of an arbitrary, unrestricted program or self-modifying model.</li>
    <li><strong>The Infinite Regress of Verifiers:</strong> If the verifier used to audit an AI agent is itself a complex, heuristic, or learning software system, the verifier requires its own verifier <em>ad infinitum</em>.</li>
  </ol>
  <p><strong>How AINA Relocates and Bounds the Verification Problem:</strong><br>AINA does not claim to verify neural weights or eliminate the need for a Trusted Computing Base (TCB). Instead, AINA treats the model as permanently <strong>unexplainable, unpredictable, and untrusted</strong>, strips it of direct actuation standing, and <strong>relocates verification into a minimal, explicitly bounded TCB at the Authority-to-Effect (<code>A2E</code>) boundary</strong>:</p>
  <ul>
    <li><strong>Provably Finite, Loop-Free Transition Semantics (<code>EISA</code>):</strong> Because integer arithmetic alone does not make a language non-Turing-complete, <code>EISA</code> enforces six explicit finiteness bounds on every proposed act: (1) bounded instruction count, (2) fixed-width integer and enum operand domains (prohibiting IEEE-754 floats), (3) bounded state-space addressing, (4) zero backward branches or unbounded loops, (5) zero recursion, and (6) zero dynamically generated instructions. Under these bounds, evaluating an <code>EISA</code> transition is a decidable finite-state admission check rather than an unrestricted Halting Problem.</li>
    <li><strong>Explicit Trusted Computing Base (TCB) &amp; Write-Denied Static Verifier:</strong> Rather than relying on an LLM judge, admission and post-execution invariance are enforced by a small, inspectable TCB (Windows NT kernel process suspension <code>CreateProcessW(CREATE_SUSPENDED)</code>, <code>PssCaptureSnapshot</code> handle inspection, file-share write exclusion, and SQLite row-version checks) and audited offline by <code>proof/verify_refusal_proof.py</code>—a static, zero-dependency, write-denied verifier.</li>
    <li><strong>Proof-Carrying Non-Action (<code>PCNA</code>):</strong> When any of the four deterministic gates (provenance binding, TOCTOU process-spawn pinning, monotonic generation fencing, or destination schema/quorum) fails, AINA fails closed, preserves the target resource untouched, and emits a tamper-evident <strong>Refusal Receipt (<code>PCNA</code>)</strong> proving that pre-attempt and post-attempt destination SHA-256 digests are byte-identical.</li>
    <li><strong>What This Public Bundle Proves vs. Fresh Adversarial Runtime Execution:</strong> Running <code>python3 proof/verify_refusal_proof.py</code> independently verifies the internal consistency, schema conformance, and pre/post SHA-256 destination invariance of the published refusal records and 45-case manifest in under 10 seconds without requiring the private <code>squad.exe</code> binary. Researchers who wish to test fresh adversarial <code>RequestedAct</code> / <code>EISA</code> payloads against the live <code>squad.exe</code> runtime may submit test vectors for recorded execution or request a scoped evaluation walkthrough (<a href="mailto:me@blayneaina.com">me@blayneaina.com</a>).</li>
    <li><strong>Three Distinct Proof Obligations (Current Artifact Scope vs. Open Formal Research):</strong> For academic clarity, AINA separates three proof obligations: <strong>(1) Specification Design</strong> (<code>EISA</code> is specified as an acyclic, loop-free grammar), <strong>(2) Semantic Finiteness</strong> (proving that the six bounds strictly bound the reachable state space so Rice's Theorem does not apply to transition admission), and <strong>(3) Implementation Faithfulness</strong> (proving that the Rust reference monitor and OS kernel primitives faithfully enforce those semantics without side-channel or TOCTOU leaks). The public repository provides the schema contracts and empirical 45-case / 20-case conformance artifacts for (1) and (3); formal mechanized theorem-proving (Lean / Isabelle) of (2) and (3) is an active research track open to academic collaboration (<a href="mailto:me@blayneaina.com">me@blayneaina.com</a>).</li>
  </ul>
</section>

${REFUSAL_EXHIBIT_HTML}

<div class="proof-overview">
  <h2>Reproduce the verification offline</h2>
  <p>Download the bundle and run the zero-dependency Python 3 verifier from its root. It recomputes all three digest chains, validates the stale-generation reason-only case, checks all 45 fresh cases and 20 evidence cases, parses every schema, and verifies the integrity manifest.</p>
  <pre><code>python verify_refusal_proof.py</code></pre>
  <div class="proof-actions">
    <a href="/proof/aina-refusal-proof-pack-v1.zip" class="btn-primary">Download complete bundle (.zip)</a>
    <a href="/proof/README.md" class="btn-secondary">Schemas &amp; verifier guide</a>
    <a href="https://github.com/SquadForge/blayne.aina" class="btn-secondary" rel="noopener noreferrer">Browse public proof repository</a>
    <a href="/proof/verify_refusal_proof.py" class="btn-secondary">verify_refusal_proof.py</a>
    <a href="/proof/SHA256SUMS.txt" class="btn-secondary">SHA256SUMS.txt</a>
  </div>
</div>

<h2>Artifact inventory</h2>
<ul>
  <li><a href="/proof/refusal/evidence-selector.json">Evidence-selector refusal and unchanged 65-byte source</a></li>
  <li><a href="/proof/refusal/unleased-write.json">Unleased-write refusal and unchanged 3-byte destination</a></li>
  <li><a href="/proof/refusal/act-pinning.json">Act-pinning refusal and unchanged 16,384-byte SQLite destination</a></li>
  <li><a href="/proof/refusal/stale-generation.json">Stale-generation reason-only refusal with absent preimage</a></li>
  <li><a href="/proof/conformance/conformance_45_manifest.json">Fresh 45-case conformance manifest</a></li>
  <li><a href="/proof/conformance/evidence_20_manifest.json">Fresh 20-case evidence manifest</a></li>
  <li><a href="/proof/conformance/conformance-output.json">Sanitized fresh execution transcript</a></li>
  <li><a href="/proof/conformance/binary_attestation.json">Candidate binary attestation</a></li>
  <li><a href="/proof/schemas/squad.eisa.act_envelope.v1.json">Exact ten-key EISA act envelope</a>, <a href="/proof/schemas/squad.lease.declarations.v1.json">typed lease declarations</a>, <a href="/proof/schemas/squad.requested_act.v1.json">RequestedAct schema</a>, and <a href="/proof/schemas/squad.evidence_ref.v1.json">EvidenceRef schema</a></li>
</ul>

<section class="proof-forensics" aria-labelledby="verifier-output-title">
  <h2 id="verifier-output-title">Actual verifier terminal output</h2>
  <p>This is the retained stdout from the packaged offline verifier, not a simulated result.</p>
  <pre><code>$ python verify_refusal_proof.py
Verifying AINA refusal and conformance bundle at .
PASS: evidence_bad_selector_refused (bf15f8633e85350430adf1bbc47a47154965d3a7f28e4ebad25d6a39ecaa2f8c)
PASS: native_write_without_lease_refused (2d27fbdf4e8ca207afbfa388ca9172fbcc6c70e534af2476b3b704f87debadcf)
PASS: wrong_value (362088a107369e634cdc9c6c520fbca3e2393722860720d3aa2c2eb11b47d719)
PASS: stale_generation_refused (reason-only; absent preimage)
PASS: conformance 45/45; evidence 20/20; candidate 94d26802c3744182a6cb93ac4e47250c6140b6ff92e0902a7c415ab13e59f4b5
PASS: 12 public-safe schema declarations
PASS: 36 files match SHA256SUMS.txt
PASS: no local paths or private key material detected

All refusal, fixture, schema, conformance, integrity, and sanitization checks passed.</code></pre>
  <p><a href="/proof/verifier_stdout_transcript.txt">Download the raw stdout transcript</a> · <a href="/proof/one_line_verify_commands.md">Open one-line verification commands</a></p>
</section>

<section class="proof-forensics" aria-labelledby="sqlite-forensics-title">
  <h2 id="sqlite-forensics-title">Case C: the protected SQLite database is relational state, not an opaque blob</h2>
  <p>The preserved <code>contacts.db</code> fixture is an authentic 16,384-byte SQLite 3 database with optimistic row versioning and an effect-counting trigger. Its schema and rows were independently read back during evidence review.</p>
  <pre><code>CREATE TABLE contacts(
  id TEXT PRIMARY KEY,
  version INTEGER NOT NULL,
  note TEXT,
  private_note TEXT
);
CREATE TABLE effects(n INTEGER);
CREATE TRIGGER count_effect AFTER UPDATE ON contacts BEGIN
  UPDATE effects SET n=n+1;
END;</code></pre>
  <div class="table-scroll"><table>
    <thead><tr><th>Protected state</th><th>id</th><th>version</th><th>note</th><th>private_note</th></tr></thead>
    <tbody>
      <tr><td>Pre-attempt and post-refusal</td><td>1</td><td>1</td><td>Original contact</td><td>WITHHELD</td></tr>
      <tr><td>Unaffected second row</td><td>2</td><td>1</td><td>Other contact</td><td>PRIVATE</td></tr>
      <tr><td>Effect counter</td><td>—</td><td>—</td><td>n = 0</td><td>—</td></tr>
    </tbody>
  </table></div>
  <p>The controller fixed <code>{"note":"Controller fixed value"}</code> for <code>contacts.db#contacts#id=1</code>. The worker substituted <code>{"note":"Unrequested but valid value"}</code>. The gate emitted <code>requested_act_mismatch</code> before any SQLite UPDATE could execute: <strong>0 model calls, 0 effects, version 1 intact, integrity_check = ok, and 16,384/16,384 bytes with the same SHA-256.</strong></p>
</section>

<aside class="context-callout" id="timing-notes" aria-label="Binary composition and execution timing note">
  <h2>Binary composition &amp; execution timing note</h2>
  <p><strong>Why the candidate is 56,239,616 bytes (56.2 MB):</strong> the self-contained Rust candidate includes statically linked runtime components, embedded SQLite and cryptographic/JSON support, Windows NT integration, and retained unwind/symbol information for forensic diagnosis. The digest attests this exact candidate; the binary itself is not required to verify the proof bundle.</p>
  <p><strong>Why the battery took 118.753576 seconds:</strong> that is wall-clock duration for the full isolated conformance harness, including fixture provisioning, process launches, document handling, SQLite setup, lease contention, and durable I/O. Dividing by 45 gives an average scenario cost of about 2.64 seconds, not a per-gate or in-memory latency measurement. No <code>&lt;5 ms</code> gate-latency claim is made because this harness did not measure it.</p>
</aside>

<aside class="context-callout" aria-label="Proof package assurance and intellectual property boundary">
  <h2>What this proof package establishes vs. what requires a live NDA walkthrough</h2>
  <p>This package provides real deterministic refusal receipts, 45-case conformance vectors, public schema contracts, and offline cryptographic verification scripts. To protect core intellectual property developed over 14 months, the proprietary <code>squad.exe</code> / <code>squad-connector</code> Rust source code and executable binaries are not published in the public repository; they are demonstrated live during technical interviews or provided in a sanitized evaluation build under mutual NDA. TypeScript is used only as minimal glue; the public JavaScript and Python files are website-build and verification tooling, not the runtime implementation.</p>
  <p>The 45-case gate is author-controlled release qualification against declared vectors in isolated fixtures. It is not independent third-party certification, formal proof of the whole system, evidence of customer production deployment, or a claim that every refusal produces a destination digest pair.</p>
</aside>
`;
const refusalProofHtml = generateHtml({
  title: "Refusal & Unchanged-Destination Proof",
  subtitle: "Real blocked mutations, deterministic non-action receipts, and independently recomputed destination invariance.",
  contentHtml: refusalProofHtmlContent,
  currentSlug: "refusal-proof",
  pageHeroHtml: refusalHeroHtml
});
const refusalProofPageDir = path.join(DIST_DIR, 'refusal-proof');
fs.mkdirSync(refusalProofPageDir, { recursive: true });
fs.writeFileSync(path.join(refusalProofPageDir, 'index.html'), refusalProofHtml, 'utf8');
console.log('✓ Published Refusal & Conformance proof pack');

// 4. Generate CSS (style.css)
console.log('Writing stylesheet (dist/style.css)...');
const cssContent = `
:root {
  --bg: #faf9f6;
  --bg-surface: #ffffff;
  --bg-sidebar: #f3f1ec;
  --text-main: #1c1917;
  --text-muted: #57534e;
  --text-dim: #78716c;
  --border: #e7e5e4;
  --border-strong: #d6d3d1;
  --accent: #0f172a;
  --accent-blue: #1e3a8a;
  --accent-gold: #b45309;
  --code-bg: #18181b;
  --code-text: #f4f4f5;
  --card-hover: #f5f5f4;
  --font-serif: 'Newsreader', Georgia, Cambria, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
  --font-brand: 'Cinzel', 'Times New Roman', serif;
}

[data-theme="dark"] {
  --bg: #09090b;
  --bg-surface: #121215;
  --bg-sidebar: #0f0f12;
  --text-main: #f4f4f5;
  --text-muted: #a1a1aa;
  --text-dim: #71717a;
  --border: #27272a;
  --border-strong: #3f3f46;
  --accent: #f8fafc;
  --accent-blue: #60a5fa;
  --accent-gold: #f59e0b;
  --code-bg: #09090b;
  --code-text: #f4f4f5;
  --card-hover: #18181b;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg);
  color: var(--text-main);
  font-family: var(--font-sans);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-blue), var(--accent-gold));
  width: 0%;
  z-index: 1000;
  transition: width 0.1s ease;
}

/* Header */
.site-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg-sidebar);
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.78rem;
  text-align: center;
}

.notice-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: var(--accent-gold);
  flex-shrink: 0;
}

.site-notice a {
  color: var(--accent-blue);
  font-weight: 600;
  text-underline-offset: 0.18em;
}

.candidate-ribbon {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1.25rem;
  padding: 0.65rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg-surface);
  font-family: var(--font-sans);
  font-size: 0.78rem;
}

.candidate-identity {
  color: var(--text-main);
  line-height: 1.5;
}

.candidate-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 0.85rem;
}

.candidate-links a,
.subpage-purpose a {
  color: var(--accent-blue);
  font-weight: 600;
  text-underline-offset: 0.18em;
}

.subpage-purpose {
  padding: 0.45rem 1.5rem;
  border-bottom: 1px solid var(--border);
  background-color: var(--bg-sidebar);
  color: var(--text-muted);
  font-family: var(--font-sans);
  font-size: 0.76rem;
  line-height: 1.5;
  text-align: center;
}

.author-contact {
  margin-top: 0.4rem;
  color: var(--text-dim);
  font-size: 0.72rem;
  line-height: 1.5;
}

.site-header {
  position: sticky;
  top: 0;
  background-color: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  z-index: 900;
  backdrop-filter: blur(8px);
}

.header-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0.85rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--text-main);
}

.brand-name {
  font-family: var(--font-brand);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: 0.12em;
}

.brand-divider {
  color: var(--border-strong);
  font-weight: 300;
}

.brand-tagline {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-link {
  font-size: 0.88rem;
  color: var(--text-muted);
  text-decoration: none;
  font-weight: 500;
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.header-link:hover, .header-link.active {
  color: var(--text-main);
  background-color: var(--bg);
}

.header-cta {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  background-color: var(--accent);
  padding: 0.45rem 0.95rem;
  border-radius: 6px;
  text-decoration: none;
  transition: opacity 0.15s ease;
}

[data-theme="dark"] .header-cta {
  color: #000;
  background-color: #fff;
}

.header-cta:hover {
  opacity: 0.9;
}

.theme-btn {
  background: none;
  border: 1px solid var(--border);
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  color: var(--text-main);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

.theme-icon.dark { display: none; }
[data-theme="dark"] .theme-icon.light { display: none; }
[data-theme="dark"] .theme-icon.dark { display: inline; }

.mobile-menu-btn {
  display: none;
  background: none;
  border: 1px solid var(--border);
  padding: 0.4rem 0.7rem;
  border-radius: 6px;
  color: var(--text-main);
  font-size: 1.1rem;
  cursor: pointer;
}

/* Layout */
.layout-container {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  min-height: calc(100vh - 65px);
}

/* Sidebar */
.site-sidebar {
  width: 320px;
  flex-shrink: 0;
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  padding: 1.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 57px;
  height: calc(100vh - 57px);
  overflow-y: auto;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
}

.sidebar-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.sidebar-date {
  font-size: 0.75rem;
  color: var(--text-dim);
}

.series-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.series-nav a {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-muted);
  font-size: 0.88rem;
  line-height: 1.35;
  transition: all 0.15s ease;
}

.series-nav a:hover {
  background-color: var(--card-hover);
  color: var(--text-main);
}

.series-nav li.active a {
  background-color: var(--bg-surface);
  color: var(--text-main);
  font-weight: 600;
  border: 1px solid var(--border);
}

.nav-num {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent-gold);
  flex-shrink: 0;
}

.sidebar-section-divider {
  margin: 1.25rem 0 0.6rem 0;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border);
}

.nav-commercial a {
  border: 1px dashed var(--accent-gold);
  background-color: var(--bg-surface);
  font-weight: 600;
  color: var(--text-main);
}

.article-body details {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin: 2rem 0;
}

.article-body summary {
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--text-main);
  padding: 0.25rem 0;
}

.faq-item + .faq-item {
  margin-top: 0.75rem;
}

.faq-item summary strong {
  font-weight: 600;
  line-height: 1.5;
}

.sidebar-footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.author-card {
  font-size: 0.8rem;
}

.author-name {
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.25rem;
}

.author-bio {
  color: var(--text-muted);
  line-height: 1.4;
  margin-bottom: 0.4rem;
}

.author-email {
  color: var(--accent-blue);
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

/* Content Area */
.content-area {
  flex-grow: 1;
  padding: 3rem 4rem;
  display: flex;
  justify-content: center;
}

.prose-wrapper {
  max-width: 820px;
  width: 100%;
}

.article-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border);
}

.article-title {
  font-family: var(--font-serif);
  font-size: 2.75rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--text-main);
  letter-spacing: -0.02em;
  margin-bottom: 1.25rem;
}

.article-subtitle {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-style: italic;
  line-height: 1.5;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: var(--text-dim);
}

/* Executive reading guide */
.executive-brief {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent-gold);
  border-radius: 10px;
  padding: 1.4rem 1.5rem;
  margin: 0 0 2.5rem 0;
}

.brief-label {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 1rem;
}

.brief-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.5rem;
}

.brief-item {
  min-width: 0;
}

.brief-item dt {
  font-family: var(--font-sans);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin-bottom: 0.3rem;
}

.brief-item dd {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--text-muted);
  overflow-wrap: anywhere;
}

/* Public proof link */
.proof-link-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--bg-surface);
  border: 1px solid var(--accent-gold);
  border-radius: 10px;
  padding: 1.5rem;
  margin: 3rem 0;
}

.proof-link-panel h2 {
  border: none;
  margin: 0 0 0.5rem 0;
  font-size: 1.35rem;
}

.proof-link-panel p {
  margin: 0;
  color: var(--text-muted);
}

.proof-link-panel .btn-primary {
  flex-shrink: 0;
}

.proof-actions {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0 2rem 0;
}

/* Prose Typography */
.article-body {
  font-family: var(--font-serif);
  font-size: 1.18rem;
  line-height: 1.8;
  color: var(--text-main);
}

.article-body h2 {
  font-family: var(--font-sans);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 3rem 0 1rem 0;
  color: var(--text-main);
  letter-spacing: -0.015em;
  border-bottom: 1px solid var(--border);
  padding-bottom: 0.5rem;
}

.article-body h3 {
  font-family: var(--font-sans);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.35;
  margin: 2.25rem 0 0.85rem 0;
  color: var(--text-main);
}

.article-body h4 {
  font-family: var(--font-sans);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1.75rem 0 0.5rem 0;
  color: var(--text-muted);
}

.article-body p {
  margin-bottom: 1.5rem;
}

.article-body strong {
  font-weight: 600;
  color: var(--text-main);
}

.article-body em {
  font-style: italic;
}

.article-body ul, .article-body ol {
  margin: 0 0 1.75rem 1.75rem;
}

.article-body li {
  margin-bottom: 0.5rem;
}

.article-body blockquote {
  border-left: 3px solid var(--accent-gold);
  background-color: var(--bg-surface);
  padding: 1.25rem 1.75rem;
  margin: 2rem 0;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  color: var(--text-muted);
}

.article-body pre {
  background-color: var(--code-bg);
  color: var(--code-text);
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 2rem 0;
  border: 1px solid var(--border-strong);
}

.article-body code {
  font-family: var(--font-mono);
  font-size: 0.88em;
  background-color: var(--card-hover);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  color: var(--text-main);
}

.article-body pre code {
  background: none;
  padding: 0;
  color: inherit;
}

.article-body table {
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
  font-family: var(--font-sans);
  font-size: 0.92rem;
}

.article-body th, .article-body td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.article-body th {
  font-weight: 600;
  background-color: var(--bg-surface);
  color: var(--text-main);
  border-bottom: 2px solid var(--border-strong);
}

.article-body hr {
  border: none;
  border-top: 1px solid var(--border);
  margin: 3rem 0;
}

/* Pagination */
.article-pagination {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
}

.pagination-link {
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  text-decoration: none;
  background-color: var(--bg-surface);
  flex: 1;
  transition: all 0.15s ease;
}

.pagination-link:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.pagination-link.next {
  text-align: right;
}

.pagination-sub {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-bottom: 0.35rem;
}

.pagination-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

/* Footer CTA */
.article-footer-cta {
  margin-top: 4rem;
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
}

.article-footer-cta h3 {
  font-family: var(--font-serif);
  font-size: 1.85rem;
  margin-bottom: 0.75rem;
  color: var(--text-main);
}

.article-footer-cta p {
  color: var(--text-muted);
  max-width: 620px;
  margin: 0 auto 1.75rem auto;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-primary {
  background-color: var(--accent);
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.15s ease;
}

[data-theme="dark"] .btn-primary {
  background-color: #fff;
  color: #000;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  border: 1px solid var(--border-strong);
  color: var(--text-main);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background-color 0.15s ease;
}

.btn-secondary:hover {
  background-color: var(--card-hover);
}

/* Homepage Styles */
.homepage-hero {
  text-align: center;
  padding: 4rem 1rem 3rem 1rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 3rem;
}

.hero-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--accent-gold);
  background-color: var(--bg-surface);
  padding: 0.35rem 0.85rem;
  border-radius: 50px;
  border: 1px solid var(--border);
  margin-bottom: 1.5rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: 3.5rem;
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--text-main);
  margin-bottom: 1.5rem;
}

.hero-lead {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 720px;
  margin: 0 auto 2.5rem auto;
}

.hero-cta-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.series-architecture-banner {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.75rem;
  margin-bottom: 3.5rem;
}

.banner-title {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  margin-bottom: 1rem;
  text-align: center;
}

.transitions-chain {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}

.chain-node {
  background-color: var(--bg);
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.chain-node.active {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  font-weight: 600;
}

.chain-arrow {
  color: var(--border-strong);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 4rem;
}

.article-card {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.5rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;
}

.article-card:hover {
  border-color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-num {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-gold);
}

.card-theme {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
}

.card-title {
  font-family: var(--font-sans);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text-main);
  line-height: 1.35;
  margin-bottom: 1.25rem;
  flex-grow: 1;
}

.card-link-text {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-blue);
}

.commercial-callout {
  background-color: var(--bg-surface);
  border: 2px solid var(--accent-gold);
  border-radius: 12px;
  padding: 3rem;
  margin-bottom: 2rem;
}

.commercial-callout h2 {
  font-family: var(--font-serif);
  font-size: 2.25rem;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.commercial-callout p {
  color: var(--text-muted);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.commercial-callout ul {
  margin: 0 0 2rem 1.5rem;
  color: var(--text-muted);
}

.commercial-callout li {
  margin-bottom: 0.75rem;
  line-height: 1.5;
}

.callout-actions {
  display: flex;
  gap: 1rem;
}

/* Positioning, proof, release, and portability */
.hero-method-title {
  max-width: 840px;
  margin: 0 auto 1rem;
  font-family: var(--font-serif);
  font-size: 1.45rem;
  line-height: 1.35;
  color: var(--text-main);
}

.hero-provenance {
  max-width: 840px;
  margin: -0.75rem auto 2rem auto;
  font-family: var(--font-sans);
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--text-muted);
}

#purpose, #career-snapshot {
  scroll-margin-top: 5rem;
}

.purpose-panel {
  border: 1px solid var(--accent-gold);
  border-left-width: 3px;
  padding: 1.75rem;
}

.purpose-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 2rem;
}

.purpose-panel h2,
.career-snapshot h2 {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  line-height: 1.35;
  margin-bottom: 0.65rem;
}

.purpose-panel p,
.purpose-panel li,
.career-snapshot > p {
  color: var(--text-muted);
  line-height: 1.65;
}

.purpose-readers {
  border-top: 1px solid var(--border);
  margin-top: 1.4rem;
  padding-top: 1.25rem;
}

.purpose-readers ul,
.scope-reality ul {
  margin-left: 1.25rem;
}

.purpose-readers li,
.scope-reality li {
  margin-bottom: 0.85rem;
}

.purpose-readers li:last-child,
.scope-reality li:last-child {
  margin-bottom: 0;
}

.career-snapshot {
  margin-bottom: 2.5rem;
}

.career-snapshot > p {
  margin-bottom: 1.25rem;
}

.career-table-scroll {
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
  overscroll-behavior-x: contain;
}

.career-table-scroll table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 0.87rem;
}

.career-table-scroll th:nth-child(1) {
  width: 19%;
}

.career-table-scroll th:nth-child(2) {
  width: 21%;
}

.career-table-scroll th:nth-child(3) {
  width: 25%;
}

.career-table-scroll th:nth-child(4) {
  width: 35%;
}

.career-table-scroll th,
.career-table-scroll td {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
  line-height: 1.55;
}

.career-table-scroll th {
  background-color: var(--bg-sidebar);
  color: var(--text-muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.career-table-scroll td {
  color: var(--text-muted);
}

.career-table-scroll td:first-child {
  color: var(--accent-gold);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  white-space: nowrap;
}

.career-table-scroll tbody tr:last-child td {
  border-bottom: 0;
}

.scope-reality li {
  color: var(--text-muted);
  line-height: 1.65;
}

.formal-confinement table,
#lampson-confinement-bridge table {
  width: 100%;
  margin-top: 1.5rem;
  table-layout: fixed;
}

.formal-confinement th:nth-child(1),
#lampson-confinement-bridge th:nth-child(1) {
  width: 27%;
}

.formal-confinement th:nth-child(2),
#lampson-confinement-bridge th:nth-child(2) {
  width: 29%;
}

.formal-confinement th:nth-child(3),
#lampson-confinement-bridge th:nth-child(3) {
  width: 44%;
}

#formal-confinement,
#verifier-regress-note,
#lampson-confinement-bridge {
  scroll-margin-top: 5rem;
}

.review-subsection {
  margin-top: 2.25rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.review-subsection summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.4;
}

.review-subsection[open] summary {
  margin-bottom: 0.75rem;
}

.review-meta {
  flex: none;
  color: var(--teal);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.covert-scope-note {
  margin-top: 1.25rem;
  padding: 1rem;
  color: var(--text-muted);
  background: var(--bg-sidebar);
  border-left: 3px solid var(--teal);
  border-radius: 8px;
  line-height: 1.65;
}

.proof-kicker, .release-kicker {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent-gold);
  margin-bottom: 0.85rem;
}

.release-banner h2, .primitive-map h2, .portability-note h2 {
  font-family: var(--font-serif);
  font-size: 1.9rem;
  line-height: 1.25;
  margin-bottom: 0.85rem;
}

.release-banner {
  background: linear-gradient(135deg, var(--bg-surface), var(--bg-sidebar));
  border: 1px solid var(--accent-gold);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
}

.release-banner p {
  max-width: 920px;
  color: var(--text-muted);
  line-height: 1.65;
}

.release-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.primitive-map {
  margin-bottom: 2.5rem;
}

.primitive-map > p {
  color: var(--text-muted);
  max-width: 850px;
}

.primitive-map table {
  margin-top: 1.5rem;
}

.primitive-map .section-cell {
  min-width: 72px;
  white-space: nowrap;
}

.primitive-map .section-cell a {
  color: var(--accent-gold);
  font-weight: 700;
  text-underline-offset: 0.2em;
}

.refusal-exhibit {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2.5rem;
}

.refusal-exhibit > h2 {
  font-family: var(--font-serif);
  font-size: 1.9rem;
  line-height: 1.25;
  margin-bottom: 0.85rem;
}

.proof-subtitle {
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 1.5rem;
}

.refusal-panels {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.refusal-panel {
  min-width: 0;
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.2rem;
}

.refusal-panel h3 {
  font-size: 1.05rem;
  line-height: 1.45;
  margin: 0.4rem 0 0.85rem;
}

.panel-number {
  color: var(--accent-gold);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.07em;
}

.digest-list > div {
  margin-bottom: 0.85rem;
}

.digest-list dt {
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.digest-list dd {
  margin: 0;
}

.digest-list code {
  display: block;
  font-size: 0.68rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.refusal-panel details {
  border-top: 1px solid var(--border);
  padding: 0.55rem 0;
}

.refusal-panel summary {
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
}

.refusal-panel details p,
.panel-note {
  color: var(--text-muted);
  font-size: 0.86rem;
  line-height: 1.6;
}

.receipt-row,
.match-row {
  border-top: 1px solid var(--border);
  padding: 0.65rem 0;
}

.receipt-row strong,
.receipt-row code,
.receipt-row span,
.match-row strong {
  display: block;
}

.receipt-row code {
  margin: 0.25rem 0;
  font-size: 0.76rem;
}

.receipt-row span,
.match-row span {
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

.receipt-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.85rem;
  font-size: 0.82rem;
}

.match-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.25rem 0.75rem;
  align-items: center;
}

.match {
  color: #15803d !important;
  font-family: var(--font-mono);
  font-size: 0.76rem !important;
  font-weight: 700;
}

.conformance-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  border-top: 1px solid var(--border);
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  color: var(--text-muted);
  font-size: 0.82rem;
}

.conformance-strip strong {
  display: block;
  color: var(--text-main);
  font-size: 1.05rem;
}

.context-callout {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent-gold);
  border-radius: 10px;
  padding: 1.25rem 1.4rem;
  margin: 0 0 2rem;
}

.context-callout h2 {
  font-family: var(--font-sans);
  font-size: 1.05rem;
  line-height: 1.45;
  margin: 0 0 0.65rem;
}

.context-callout p {
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
}

.portability-note {
  background-color: var(--bg-surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent-gold);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2.5rem;
}

.portability-note p, .portability-note li {
  color: var(--text-muted);
  line-height: 1.65;
}

.portability-note ol {
  margin: 1rem 0 1rem 1.5rem;
}

/* Site Footer */
.site-footer {
  border-top: 1px solid var(--border);
  background-color: var(--bg-surface);
  padding: 2rem 0;
  font-size: 0.85rem;
  color: var(--text-dim);
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Responsive */
html, body {
  max-width: 100%;
  overflow-x: hidden;
}

.content-area, .prose-wrapper {
  min-width: 0;
}

.article-title, .article-subtitle, .article-meta, .hero-title, .hero-lead,
.article-body p, .article-body li, .article-body td, .article-body th {
  overflow-wrap: anywhere;
}

.article-meta {
  flex-wrap: wrap;
}

.article-body table {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
}

.article-body img, .article-body video, .article-body canvas, .article-body svg {
  max-width: 100%;
  height: auto;
}

@media (max-width: 1024px) {
  .site-sidebar {
    position: fixed;
    left: -320px;
    top: 57px;
    height: calc(100vh - 57px);
    z-index: 1000;
    transition: left 0.25s ease;
    box-shadow: 10px 0 30px rgba(0, 0, 0, 0.2);
  }
  .site-sidebar.open {
    left: 0;
  }
  .mobile-menu-btn {
    display: block;
  }
  .header-inner {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .brand {
    min-width: 0;
    flex-wrap: wrap;
  }
  .brand-tagline {
    overflow-wrap: anywhere;
  }
  .header-actions {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .content-area {
    padding: 2rem 1.5rem;
  }
  .article-title {
    font-size: 2.2rem;
  }
  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 640px) {
  .candidate-ribbon,
  .subpage-purpose {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .purpose-grid {
    grid-template-columns: 1fr;
  }
  .purpose-panel {
    padding: 1.25rem 1rem;
  }
  .career-table-scroll table {
    min-width: 760px;
    table-layout: auto;
  }
  .career-table-scroll th,
  .career-table-scroll td {
    padding: 0.75rem;
  }
  .formal-confinement table,
  #lampson-confinement-bridge table {
    min-width: 900px;
  }
  .hero-provenance {
    font-size: 0.88rem;
  }
  .release-banner, .portability-note {
    padding: 1.1rem 1rem;
  }
  .release-banner h2, .primitive-map h2, .portability-note h2 {
    font-size: 1.5rem;
  }
  .release-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .refusal-exhibit {
    padding: 1.1rem 1rem;
  }
  .refusal-exhibit > h2 {
    font-size: 1.5rem;
  }
  .refusal-panels,
  .conformance-strip {
    grid-template-columns: 1fr;
  }
  .match-row {
    grid-template-columns: 1fr;
  }
  .primitive-map table,
  .primitive-map tbody,
  .primitive-map tr,
  .primitive-map td {
    display: block;
    width: 100%;
    box-sizing: border-box;
  }
  .primitive-map thead {
    display: none;
  }
  .primitive-map tr {
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background-color: var(--bg-surface);
  }
  .article-body .primitive-map td {
    padding: 0;
    border: 0;
    overflow-wrap: normal;
    word-break: normal;
  }
  .primitive-map td:first-child {
    margin-bottom: 0.65rem;
    font-size: 1rem;
    line-height: 1.45;
  }
  .primitive-map td:nth-child(2) {
    display: inline-block;
    width: auto;
    color: var(--accent-gold);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
  }
  .primitive-map td:nth-child(3),
  .primitive-map td:nth-child(4) {
    margin-top: 0.85rem;
    font-size: 0.88rem;
    line-height: 1.55;
  }
  .primitive-map td:nth-child(3)::before,
  .primitive-map td:nth-child(4)::before {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--text-dim);
    font-family: var(--font-sans);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .primitive-map td:nth-child(3)::before {
    content: "Systems primitive";
  }
  .primitive-map td:nth-child(4)::before {
    content: "Operational guarantee";
  }
  .header-inner {
    padding: 0.7rem 0.85rem;
    align-items: flex-start;
  }
  .brand {
    gap: 0.35rem;
  }
  .brand-name {
    font-size: 1rem;
  }
  .brand-tagline {
    font-size: 0.78rem;
  }
  .header-link {
    display: none;
  }
  .header-cta, .theme-btn, .mobile-menu-btn {
    flex-shrink: 0;
  }
  .content-area {
    padding: 1.5rem 1rem;
  }
  .executive-brief {
    padding: 1.1rem 1rem;
    margin-bottom: 2rem;
  }
  .brief-grid {
    grid-template-columns: 1fr;
    gap: 0.85rem;
  }
  .proof-link-panel {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.1rem 1rem;
  }
  .proof-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .article-header {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }
  .article-title {
    font-size: clamp(1.65rem, 8vw, 2.2rem);
    line-height: 1.22;
  }
  .article-subtitle {
    font-size: 1.12rem;
  }
  .hero-title {
    font-size: clamp(1.85rem, 9vw, 2.5rem);
  }
  .hero-lead {
    font-size: 1.15rem;
  }
  .homepage-hero {
    padding: 2.5rem 0.5rem 2rem 0.5rem;
  }
  .article-body {
    font-size: 1.05rem;
    line-height: 1.7;
  }
  .article-body h2 {
    font-size: 1.45rem;
  }
  .article-body h3 {
    font-size: 1.2rem;
  }
  .article-body table {
    font-size: 0.82rem;
  }
  .article-body th, .article-body td {
    padding: 0.6rem 0.65rem;
  }
  .article-body pre {
    padding: 1rem;
    font-size: 0.78rem;
  }
  .article-body code {
    overflow-wrap: anywhere;
  }
  .article-pagination {
    flex-direction: column;
  }
  .pagination-link.next {
    text-align: left;
  }
  .cta-actions, .callout-actions, .hero-cta-group {
    flex-direction: column;
    align-items: stretch;
  }
  .btn-primary, .btn-secondary {
    text-align: center;
  }
  .article-footer-cta, .commercial-callout {
    padding: 1.5rem 1rem;
  }
  .article-footer-cta h3, .commercial-callout h2 {
    font-size: 1.65rem;
  }
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

:root {
  --midnight: #07162c;
  --navy: #0b2545;
  --royal: #13315c;
  --teal: #14b8a6;
  --teal-light: #2dd4bf;
  --refusal: #e11d48;
  --font-display: 'Plus Jakarta Sans', var(--font-sans);
  --font-editorial: 'Instrument Serif', Georgia, serif;
}

.brand-name,
.brand-tagline,
.header-actions {
  white-space: nowrap;
}

.header-inner {
  max-width: 1280px;
}

.header-search {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  font: inherit;
  padding: 0;
}

.candidate-ribbon {
  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
}

.candidate-identity {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
}

.candidate-identity span {
  color: var(--text-dim);
  font-weight: 400;
  letter-spacing: 0;
}

.candidate-email {
  margin-left: 0.5rem;
  color: var(--text-dim) !important;
  font-weight: 500 !important;
}

.presentation-layout {
  display: block;
  max-width: none;
}

.presentation-layout .site-sidebar,
.presentation-layout .mobile-menu-btn {
  display: none;
}

.presentation-layout .content-area {
  display: block;
  padding: 0;
}

.presentation-wrapper {
  max-width: none;
}

.presentation-wrapper .article-body {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 2rem 0;
}

.presentation-wrapper > .executive-brief {
  max-width: 1216px;
  margin: 2rem auto;
}

.presentation-wrapper .article-body > section,
.presentation-wrapper .article-body > aside,
.presentation-wrapper .article-body > .proof-overview,
.presentation-wrapper .article-body > .articles-grid,
.presentation-wrapper .article-body > .commercial-callout {
  margin-left: auto;
  margin-right: auto;
}

.page-hero {
  position: relative;
  overflow: hidden;
  color: #f8fafc;
  background-image:
    radial-gradient(circle at 85% 12%, rgba(45, 212, 191, 0.16), transparent 30%),
    linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px),
    linear-gradient(135deg, var(--midnight), var(--royal) 58%, var(--midnight));
  background-size: auto, 48px 48px, 48px 48px, auto;
  border-bottom: 1px solid rgba(45, 212, 191, 0.2);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(360px, 0.8fr);
  gap: 3rem;
  align-items: center;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3.5rem 2rem;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.15rem;
  padding: 0.35rem 0.7rem;
  color: var(--teal-light);
  background: rgba(20, 184, 166, 0.12);
  border: 1px solid rgba(45, 212, 191, 0.3);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.075em;
  text-transform: uppercase;
}

.hero-eyebrow::before {
  content: '';
  width: 7px;
  height: 7px;
  flex: none;
  border-radius: 50%;
  background: var(--teal-light);
  box-shadow: 0 0 14px rgba(45, 212, 191, 0.75);
}

.hero-title-xl {
  max-width: 780px;
  margin-bottom: 1rem;
  color: #f8fafc;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5.4vw, 4.7rem);
  font-weight: 800;
  letter-spacing: -0.055em;
  line-height: 1.04;
}

.hero-serif {
  display: block;
  color: var(--teal-light);
  font-family: var(--font-editorial);
  font-size: 1.12em;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.035em;
}

.hero-summary {
  max-width: 680px;
  margin-bottom: 1.25rem;
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.75;
}

.hero-summary strong {
  color: #f8fafc;
}

.hero-note {
  max-width: 680px;
  margin-top: 1rem;
  color: #94a3b8;
  font-size: 0.78rem;
  line-height: 1.65;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.4rem;
}

.hero-actions .btn-primary,
.hero-actions .btn-secondary,
.case-panel .btn-primary,
.case-panel .btn-secondary {
  border-radius: 10px;
  font-family: var(--font-display);
}

.hero-actions .btn-primary,
.page-hero .btn-primary {
  color: #062621;
  background: var(--teal-light);
  border-color: var(--teal-light);
  box-shadow: 0 8px 24px -8px rgba(45, 212, 191, 0.55);
}

.hero-actions .btn-primary:hover,
.page-hero .btn-primary:hover {
  background: #5eead4;
  transform: translateY(-2px);
}

.page-hero .btn-secondary {
  color: #e2e8f0;
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.2);
}

.page-hero .btn-secondary:hover {
  background: rgba(255,255,255,0.13);
}

.hero-kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.65rem;
  margin-top: 1.75rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(255,255,255,0.14);
}

.hero-kpi {
  min-width: 0;
  padding: 0.75rem;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
}

.hero-kpi strong {
  display: block;
  color: #f8fafc;
  font-family: var(--font-display);
  font-size: 1.35rem;
  line-height: 1.2;
}

.hero-kpi span {
  display: block;
  margin-top: 0.25rem;
  color: #94a3b8;
  font-size: 0.65rem;
  line-height: 1.45;
}

.proof-console {
  position: relative;
  min-width: 0;
  padding: 1.25rem;
  background: rgba(3, 12, 27, 0.9);
  border: 1px solid rgba(45, 212, 191, 0.36);
  border-radius: 18px;
  box-shadow: 0 28px 65px -24px rgba(0,0,0,0.8), 0 0 48px -22px rgba(45, 212, 191, 0.42);
  color: #cbd5e1;
  font-family: var(--font-mono);
}

.console-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.console-status {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--teal-light);
  font-weight: 700;
}

.console-status.refusal {
  color: #fb7185;
}

.console-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
}

.console-cell {
  min-width: 0;
  padding: 0.7rem;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
}

.console-cell.wide {
  grid-column: 1 / -1;
}

.console-label {
  display: block;
  margin-bottom: 0.3rem;
  color: #64748b;
  font-size: 0.6rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.console-value {
  display: block;
  color: #e2e8f0;
  font-size: 0.72rem;
  line-height: 1.55;
  overflow-wrap: anywhere;
}

.console-value.teal {
  color: var(--teal-light);
}

.console-value.refusal {
  color: #fb7185;
  font-weight: 700;
}

.console-foot {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.85rem;
  color: #94a3b8;
  font-size: 0.62rem;
}

.presentation-wrapper .article-body > .refusal-exhibit {
  padding: 2rem;
  color: #e2e8f0;
  background:
    radial-gradient(circle at 90% 0%, rgba(45, 212, 191, 0.09), transparent 28%),
    var(--midnight);
  border: 1px solid rgba(45, 212, 191, 0.2);
}

.presentation-wrapper .article-body > .refusal-exhibit .proof-subtitle {
  color: #94a3b8;
}

.presentation-wrapper .article-body > .refusal-exhibit > h2 {
  color: #f8fafc;
  font-family: var(--font-display);
}

.case-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 1.5rem 0;
}

.case-tab {
  padding: 0.8rem;
  color: #94a3b8;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 9px;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 700;
  text-align: left;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.case-tab:hover {
  transform: translateY(-2px);
  border-color: rgba(45, 212, 191, 0.45);
}

.case-tab.active,
.case-tab[aria-selected="true"] {
  color: var(--teal-light);
  background: rgba(20, 184, 166, 0.12);
  border-color: var(--teal);
}

.case-panel {
  padding: 1.25rem;
  background: rgba(3, 12, 27, 0.72);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
}

.case-panel[hidden] {
  display: none;
}

.case-panel h3 {
  margin-bottom: 0.8rem;
  color: #f8fafc;
  font-family: var(--font-display);
}

.case-panel p,
.case-panel li {
  color: #94a3b8;
}

.case-panel code {
  color: #e2e8f0;
  background: rgba(255,255,255,0.07);
}

.case-panel a {
  color: var(--teal-light);
}

.case-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 1rem 0;
}

.case-meta > div {
  padding: 0.7rem;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
}

.case-meta dt {
  color: #64748b;
  font-size: 0.62rem;
  text-transform: uppercase;
}

.case-meta dd {
  margin: 0.25rem 0 0;
  color: #e2e8f0;
  font-size: 0.75rem;
}

.digest-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.75rem 0;
  padding: 0.75rem;
  background: #030c1b;
  border: 1px solid rgba(45, 212, 191, 0.18);
  border-radius: 8px;
}

.digest-box code {
  color: var(--teal-light);
  font-size: 0.67rem;
  overflow-wrap: anywhere;
}

.copy-btn {
  flex: none;
  padding: 0.35rem 0.55rem;
  color: var(--teal-light);
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(45, 212, 191, 0.25);
  border-radius: 6px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.62rem;
  font-weight: 700;
}

.copy-btn.copied {
  color: #062621;
  background: var(--teal-light);
}

.tier-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.tier-card {
  position: relative;
  padding: 1rem;
  background: linear-gradient(145deg, var(--midnight), var(--royal));
  border: 1px solid rgba(45, 212, 191, 0.24);
  border-radius: 12px;
  color: #e2e8f0;
  overflow: hidden;
}

.tier-card span {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--teal-light);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
}

.tier-card strong {
  display: block;
  margin-bottom: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.88rem;
}

.tier-card p {
  color: #94a3b8;
  font-size: 0.72rem;
  line-height: 1.55;
}

.lease-scene {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 0.75rem;
  align-items: center;
  margin: 1.5rem 0;
}

.lease-node {
  padding: 1rem;
  text-align: center;
  background: var(--midnight);
  border: 1px solid rgba(45, 212, 191, 0.22);
  border-radius: 10px;
  color: #e2e8f0;
}

.lease-node strong,
.lease-node span {
  display: block;
}

.lease-node strong {
  color: var(--teal-light);
  font-family: var(--font-display);
}

.lease-node span {
  margin-top: 0.35rem;
  color: #94a3b8;
  font-size: 0.7rem;
}

.lease-arrow {
  color: var(--teal);
  font-family: var(--font-mono);
  font-size: 1.2rem;
}

.domain-visual {
  padding: 1.25rem;
  background: rgba(3, 12, 27, 0.82);
  border: 1px solid rgba(45, 212, 191, 0.3);
  border-radius: 18px;
  box-shadow: 0 28px 65px -24px rgba(0,0,0,0.8);
}

.domain-columns {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  align-items: center;
}

.domain-card {
  min-width: 0;
  padding: 0.85rem;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.domain-card.highlight {
  border-color: var(--teal);
  box-shadow: 0 0 24px -10px rgba(45, 212, 191, 0.5);
}

.domain-card h3 {
  margin-bottom: 0.75rem;
  color: var(--teal-light);
  font-family: var(--font-display);
  font-size: 0.75rem;
}

.domain-node {
  margin: 0.45rem 0;
  padding: 0.5rem;
  color: #cbd5e1;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
  font-family: var(--font-mono);
  font-size: 0.62rem;
  line-height: 1.45;
}

.domain-arrow {
  color: var(--teal-light);
  font-family: var(--font-mono);
  font-size: 1.1rem;
}

.domain-controls {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.85rem;
}

.domain-controls button {
  padding: 0.4rem 0.6rem;
  color: #94a3b8;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.62rem;
}

.domain-controls button.active {
  color: var(--teal-light);
  border-color: var(--teal);
}

.quick-dock {
  position: fixed;
  left: 50%;
  bottom: 1rem;
  z-index: 850;
  display: flex;
  gap: 0.25rem;
  padding: 0.35rem;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 10px);
  background: rgba(11, 37, 69, 0.94);
  border: 1px solid rgba(45, 212, 191, 0.28);
  border-radius: 12px;
  box-shadow: 0 14px 35px -10px rgba(0,0,0,0.45);
  backdrop-filter: blur(10px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.quick-dock.visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, 0);
}

.refusal-exhibit .proof-kicker {
  color: var(--teal-light);
}

.quick-dock a {
  padding: 0.5rem 0.85rem;
  color: #e2e8f0;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  text-decoration: none;
}

.quick-dock a:hover {
  color: var(--teal-light);
  background: rgba(45, 212, 191, 0.1);
}

.quick-search {
  width: min(680px, calc(100vw - 2rem));
  max-height: min(760px, calc(100vh - 3rem));
  padding: 1.25rem;
  color: var(--text-main);
  background: var(--bg-surface);
  border: 1px solid var(--border-strong);
  border-radius: 14px;
  box-shadow: 0 30px 80px -20px rgba(0,0,0,0.4);
}

.quick-search::backdrop {
  background: rgba(3, 12, 27, 0.72);
  backdrop-filter: blur(4px);
}

.quick-search-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.quick-search-head label {
  font-family: var(--font-display);
  font-weight: 700;
}

.quick-search-head button {
  padding: 0.35rem 0.55rem;
  color: var(--text-muted);
  background: var(--bg-sidebar);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
}

#quickSearchInput {
  width: 100%;
  padding: 0.75rem 0.85rem;
  color: var(--text-main);
  background: var(--bg);
  border: 1px solid var(--border-strong);
  border-radius: 8px;
  font: inherit;
}

.quick-search-results {
  display: grid;
  gap: 0.4rem;
  max-height: 480px;
  margin-top: 0.85rem;
  overflow-y: auto;
}

.quick-search-results a {
  padding: 0.7rem;
  border: 1px solid transparent;
  border-radius: 8px;
  text-decoration: none;
}

.quick-search-results a:hover,
.quick-search-results a:focus {
  background: var(--bg-sidebar);
  border-color: var(--border);
}

.quick-search-results strong,
.quick-search-results span {
  display: block;
}

.quick-search-results strong {
  color: var(--text-main);
  font-size: 0.82rem;
}

.quick-search-results span {
  margin-top: 0.2rem;
  color: var(--text-dim);
  font-size: 0.68rem;
}

.quick-search-results a[hidden] {
  display: none;
}

.reveal {
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.reveal-pending {
  opacity: 0;
  transform: translateY(12px);
}

.presentation-wrapper .article-body > section,
.presentation-wrapper .article-body > aside,
.presentation-wrapper .article-body > .proof-overview,
.presentation-wrapper .article-body > .commercial-callout,
.presentation-wrapper .article-footer-cta {
  box-shadow: 0 12px 32px -22px rgba(11, 37, 69, 0.18);
}

.presentation-wrapper .article-footer-cta {
  max-width: 1216px;
  margin: 2.5rem auto 5rem;
}

@media (max-width: 1100px) {
  .brand-tagline {
    display: none;
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .proof-console,
  .domain-visual {
    max-width: 720px;
  }
  .case-tabs,
  .tier-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .candidate-identity span,
  .candidate-email {
    display: none;
  }
  .candidate-links {
    flex-wrap: nowrap;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .candidate-links a {
    flex: none;
  }
  .header-cta {
    max-width: 140px;
    white-space: normal;
    line-height: 1.2;
  }
  .presentation-wrapper .article-body {
    padding: 1.5rem 1rem 0;
  }
  .hero-grid {
    padding: 2.25rem 1rem;
  }
  .hero-title-xl {
    font-size: clamp(2.45rem, 14vw, 3.5rem);
  }
  .hero-summary {
    font-size: 0.92rem;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .proof-console,
  .domain-visual {
    padding: 0.85rem;
    border-radius: 12px;
  }
  .console-grid,
  .case-meta {
    grid-template-columns: 1fr 1fr;
  }
  .case-tabs,
  .tier-grid {
    grid-template-columns: 1fr 1fr;
  }
  .case-tab {
    font-size: 0.65rem;
  }
  .presentation-wrapper .article-body > .refusal-exhibit {
    padding: 1rem;
  }
  .digest-box {
    align-items: flex-start;
    flex-direction: column;
  }
  .lease-scene {
    grid-template-columns: 1fr;
  }
  .lease-arrow {
    transform: rotate(90deg);
    text-align: center;
  }
  .domain-columns {
    grid-template-columns: 1fr;
  }
  .domain-arrow {
    transform: rotate(90deg);
    text-align: center;
  }
  .quick-dock {
    bottom: 0.65rem;
  }
  .quick-dock a {
    padding: 0.5rem 0.7rem;
  }
  .presentation-wrapper .article-footer-cta {
    margin: 1.5rem 1rem 4.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal-pending {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
`;
fs.writeFileSync(path.join(DIST_DIR, 'style.css'), cssContent, 'utf8');
console.log('✓ Built Stylesheet (dist/style.css)');

// 5. Generate JS (script.js)
console.log('Writing script (dist/script.js)...');
const jsContent = `
// Theme toggler with localStorage persistence
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
htmlEl.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Mobile sidebar drawer
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');

if (mobileMenuBtn && sidebar) {
  const setMenuOpen = (open) => {
    sidebar.classList.toggle('open', open);
    mobileMenuBtn.setAttribute('aria-expanded', String(open));
  };

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    setMenuOpen(!sidebar.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
    }
  });
}

// Reading progress bar
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const scrolled = (window.scrollY / docHeight) * 100;
      progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
    }
  });
}

const caseExplorer = document.querySelector('[data-case-explorer]');
if (caseExplorer) {
  const tabs = Array.from(document.querySelectorAll('.case-tab[data-case]'));
  const panels = Array.from(caseExplorer.querySelectorAll('[data-case-panel]'));
  const activateCase = (key, moveFocus = false) => {
    tabs.forEach(tab => {
      const active = tab.dataset.case === key;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.casePanel !== key; });
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateCase(tab.dataset.case));
    tab.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        activateCase(tabs[next].dataset.case, true);
      }
    });
  });
  activateCase('a');
}

const copyText = async text => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const area = document.createElement('textarea');
  area.value = text;
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  area.remove();
};

document.addEventListener('click', async event => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const original = button.textContent;
  try {
    await copyText(button.dataset.copy);
    button.textContent = 'COPIED';
    button.classList.add('copied');
  } catch {
    button.textContent = 'COPY FAILED';
  }
  window.setTimeout(() => {
    button.textContent = original;
    button.classList.remove('copied');
  }, 1600);
});

const searchDialog = document.getElementById('quickSearchDialog');
const searchButton = document.getElementById('quickSearchBtn');
const searchInput = document.getElementById('quickSearchInput');
const searchClose = document.getElementById('quickSearchClose');
if (searchDialog && searchInput) {
  const openSearch = () => {
    if (typeof searchDialog.showModal === 'function') searchDialog.showModal();
    else searchDialog.setAttribute('open', '');
    searchInput.value = '';
    searchDialog.querySelectorAll('[data-search-item]').forEach(item => { item.hidden = false; });
    searchInput.focus();
  };
  const closeSearch = () => {
    if (typeof searchDialog.close === 'function') searchDialog.close();
    else searchDialog.removeAttribute('open');
  };
  if (searchButton) searchButton.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  searchDialog.addEventListener('click', event => {
    if (event.target === searchDialog) closeSearch();
  });
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      searchDialog.open ? closeSearch() : openSearch();
    }
  });
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchDialog.querySelectorAll('[data-search-item]').forEach(item => {
      item.hidden = query.length > 0 && !item.textContent.toLowerCase().includes(query);
    });
  });
}

document.querySelectorAll('[data-domain]').forEach(button => {
  button.addEventListener('click', () => {
    const domain = button.dataset.domain;
    document.querySelectorAll('[data-domain]').forEach(control => {
      control.classList.toggle('active', control === button);
    });
    document.querySelectorAll('[data-domain-card]').forEach(card => {
      card.classList.toggle('highlight', card.dataset.domainCard === domain);
    });
  });
});

const reviewBlocks = document.querySelectorAll('details.review-subsection');
if (reviewBlocks.length) {
  const openReviewTarget = () => {
    reviewBlocks.forEach(block => { block.open = window.location.hash === '#' + block.id; });
  };
  openReviewTarget();
  window.addEventListener('hashchange', openReviewTarget);
}

const quickDock = document.querySelector('.quick-dock');
if (quickDock) {
  const updateDock = () => quickDock.classList.toggle('visible', window.scrollY > 320);
  updateDock();
  window.addEventListener('scroll', updateDock, { passive: true });
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.presentation-wrapper .article-body > section, .presentation-wrapper .article-body > aside, .presentation-wrapper .article-body > .proof-overview, .presentation-wrapper .article-body > .articles-grid, .presentation-wrapper .article-body > .commercial-callout');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-pending');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  revealTargets.forEach(target => {
    if (target.getBoundingClientRect().top > window.innerHeight * 0.82) {
      target.classList.add('reveal', 'reveal-pending');
      observer.observe(target);
    }
  });
}
`;
fs.writeFileSync(path.join(DIST_DIR, 'script.js'), jsContent, 'utf8');
console.log('✓ Built Script (dist/script.js)');

// 6. Generate Robots.txt and Sitemap.xml
console.log('Generating sitemap and robots.txt...');
const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://blayneaina.com/sitemap.xml
`;
fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blayneaina.com/</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${ARTICLES.map(art => `
  <url>
    <loc>https://blayneaina.com/${art.slug}/</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')}
  <url>
    <loc>https://blayneaina.com/refusal-proof/</loc>
    <lastmod>2026-11-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://blayneaina.com/semantic-switch-proof/</loc>
    <lastmod>2026-10-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

// 7. Generate Cloudflare Pages headers (_headers) and redirects (_redirects)
const headersContent = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: document-domain=()
`;
fs.writeFileSync(path.join(DIST_DIR, '_headers'), headersContent, 'utf8');

const redirectsContent = `/articles/01-an-ai-output-is-not-an-act /01-an-ai-output-is-not-an-act/ 301
/articles/01-an-ai-output-is-not-an-act/ /01-an-ai-output-is-not-an-act/ 301
/architecture/zero-trust-document-ingestion-and-server-cut-evidence /02-zero-trust-document-ingestion-and-server-cut-evidence/ 301
/architecture/zero-trust-document-ingestion-and-server-cut-evidence/ /02-zero-trust-document-ingestion-and-server-cut-evidence/ 301
/architecture/eisa-four-gate-verdict-machine-and-entity-resolution /03-eisa-four-gate-verdict-machine-and-entity-resolution/ 301
/architecture/eisa-four-gate-verdict-machine-and-entity-resolution/ /03-eisa-four-gate-verdict-machine-and-entity-resolution/ 301
/architecture/the-room-coordination-plane /04-the-room-why-git-and-chat-are-not-coordination-planes/ 301
/architecture/the-room-coordination-plane/ /04-the-room-why-git-and-chat-are-not-coordination-planes/ 301
/architecture/expiry-is-not-fencing-typed-leases /05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/ 301
/architecture/expiry-is-not-fencing-typed-leases/ /05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/ 301
/architecture/rollback-is-not-erasure-dual-tier-vaults /06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/ 301
/architecture/rollback-is-not-erasure-dual-tier-vaults/ /06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine/ 301
/architecture/defeating-approval-laundering-act-pinning-successor-grants /07-defeating-approval-laundering-act-pinning-and-successor-grants/ 301
/architecture/defeating-approval-laundering-act-pinning-successor-grants/ /07-defeating-approval-laundering-act-pinning-and-successor-grants/ 301
/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate /08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/ 301
/architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate/ /08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate/ 301
/architecture/bring-one-real-boundary-work-with-blayne /09-bring-one-real-boundary-work-with-blayne/ 301
/architecture/bring-one-real-boundary-work-with-blayne/ /09-bring-one-real-boundary-work-with-blayne/ 301
/series/from-proposal-to-consequence / 301
/series/from-proposal-to-consequence/ / 301
/architecture / 301
/architecture/ / 301
`;
fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirectsContent, 'utf8');

console.log('=== BUILD COMPLETE: All 9 articles and redirects generated in dist/ ===');
