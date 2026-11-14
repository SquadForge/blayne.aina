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
    shortTitle: "Bring One Real Boundary: Peer Review & R&D Evaluation",
    theme: "Technical Peer Review, Challenge Tracks & R&D Diligence",
    isCommercial: true
  }
];

const EXECUTIVE_BRIEFS = {
  home: {
    problem: "Writing code by hand is no longer the bottleneck. The hard problem is decomposing ambiguous work across parallel AI agents without context collapse, catching plausible-but-wrong output, and proving the result.",
    proof: "AINA is both a deterministic execution-governance architecture and a recursive proof-of-work: one architect directing 9 concurrent IDE lanes under the runtime's own confinement and verification rules.",
    commercial: "Published for independent technical peer review, security and formal-verification critique, and R&D / research grant due diligence.",
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
    problem: "Writing code by hand is no longer the bottleneck. The bottleneck is formalizing the trust boundary, decomposing work across parallel AI agents without context collapse, catching plausible-but-wrong outputs, and proving that invalid transitions fail closed.",
    proof: "AINA is both a deterministic execution-governance runtime (squad.exe) and Exhibit A of a repeatable 9-IDE multi-agent engineering methodology grounded in 11+ years of production systems delivery.",
    commercial: "Independent Technical Peer Review · Research & Funding Due Diligence · Bounded Boundary Challenges.",
    next: "Run the offline cryptographic verifier, submit an adversarial transition vector, or schedule a live 15–45 minute runtime evaluation session."
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
  [/https:\/\/www\.blayneaina\.com\//g, 'https://blayneaina.com/'],
  [/https:\/\/www\.blayneaina\.com/g, 'https://blayneaina.com/'],
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
  [/https:\/\/blayneaina\.com\/architecture\/"/g, 'https://blayneaina.com/"'],
  [/"url":\s*"https:\/\/blayneaina\.com"/g, '"url": "https://blayneaina.com/"']
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
    <p>Standalone HTML + WebAssembly Sovereign Proof Packs—enabling offline, byte-for-byte recomputation of Stage Zero receipts and the 45-case conformance battery—release publicly on January 15. Between now and January 15, I am opening 3–5 early review slots for Principal Architects, Security Researchers, and R&amp;D / Grant Evaluation Teams to test a single high-consequence boundary or submit adversarial test cases.</p>
    <div class="release-actions">
      <a href="mailto:me@blayneaina.com?subject=AINA%20Early%20Boundary%20Review" class="btn-primary">Request an early boundary review</a>
      <a href="/09-bring-one-real-boundary-work-with-blayne/" class="btn-secondary">Review evaluation tracks</a>
    </div>
  </aside>
`;

const PORTABILITY_HTML = `
  <aside class="portability-note" aria-label="Windows NT first and Linux POSIX mapping">
    <div class="brief-label">SUBSTRATE PORTABILITY</div>
    <h2>Windows NT first, with an OS-agnostic evidence and decision core</h2>
    <p>The v1 reference binary, <code>squad.exe</code>, targets Windows NT because enterprise endpoints expose strict, explicit kernel primitives: mandatory file-share exclusion (<code>FILE_SHARE_READ</code>), Less Privileged App Containers (LPAC), Job Objects, and suspended pre-execution handle/PEB inspection through <code>CreateProcessW(CREATE_SUSPENDED)</code> and <code>PssCaptureSnapshot</code>. The reference runtime was built local-first on a single Windows workstation to make those guarantees inspectable.</p>
    <p>EISA, RFC 8785 JCS canonicalization, SHA-256 evidence digests, and SQLite optimistic concurrency control are OS-agnostic. Linux/POSIX mappings are architectural counterparts—not claims of drop-in binary compatibility, identical kernel semantics, or an already-completed Linux port:</p>
    <ol>
      <li><strong>LPAC + Job Objects (§02/§08):</strong> Linux user namespaces, seccomp-bpf, Landlock LSM, and cgroups v2 (<code>cgroup.kill</code>).</li>
      <li><strong>Win32 file-share exclusion (§05):</strong> Linux Open File Description locks (<code>F_OFD_SETLK</code>), fanotify permission events, and strict container mount namespaces.</li>
      <li><strong>Pre-execution barrier &amp; handle/image inspection (§07):</strong> Unlike Windows <code>CreateProcessW(CREATE_SUSPENDED)</code>, Linux <code>clone3()</code>/<code>pidfd_open()</code> alone provides a race-free process reference rather than a suspended pre-instruction gate. A faithful Linux counterpart requires a dedicated pre-execution synchronization barrier (a minimal trampoline stub or <code>seccomp_unotify</code> gate holding the child before workload entry while the supervisor verifies <code>/proc/&lt;pid&gt;/fd</code>, <code>/proc/&lt;pid&gt;/maps</code>, and an <code>F_SEAL_WRITE</code>-sealed <code>memfd</code> image digest against <code>RequestedAct</code> prior to <code>fexecve</code>).</li>
    </ol>
    <p>Every target OS requires its own conformance evidence for handle lifetimes, rename behavior, pre-execution barriers, pre-existing capabilities, and crash recovery.</p>
  </aside>
`;

const REFUSAL_EXHIBIT_HTML = `
<section class="refusal-exhibit" id="refusal-cases" aria-labelledby="refusal-exhibit-title">
  <div class="proof-kicker">OPEN VERIFICATION · REFUSAL + UNCHANGED DESTINATION — Four deterministic refusals (<code>verify_refusal_proof.py</code>)</div>
  <h2 id="refusal-exhibit-title">Four deterministic refusals. Inspect every state transition.</h2>
  <p class="case-tabs" role="tablist" aria-label="Refusal cases"><button class="case-tab active" type="button" role="tab" id="tab-case-a" aria-controls="case-a" aria-selected="true" data-case="a">Case A: Citation selector</button> <button class="case-tab" type="button" role="tab" id="tab-case-b" aria-controls="case-b" aria-selected="false" data-case="b">Case B: Unleased write</button> <button class="case-tab" type="button" role="tab" id="tab-case-c" aria-controls="case-c" aria-selected="false" data-case="c">Case C: Act pinning</button> <button class="case-tab" type="button" role="tab" id="tab-case-d" aria-controls="case-d" aria-selected="false" data-case="d">Case D: Stale generation</button></p>
  <div class="case-explorer" data-case-explorer>
    <p class="case-panel" id="case-a" role="tabpanel" aria-labelledby="tab-case-a" data-case-panel="a"><span class="console-top"><span>CASE A · EVIDENCE SELECTOR</span><span class="console-status refusal">selector_out_of_bounds</span></span> <strong>Citation selector fabrication stops before evidence serving:</strong> Requests byte range <code>0..9999</code> on 26-char node; refused before serving. <strong>Protected:</strong> <code>er-repeat.txt</code> (<code>65/65</code> bytes unchanged · No evidence mutation) · SHA-256: <code>bf15f8633e85350430adf1bbc47a47154965d3a7f28e4ebad25d6a39ecaa2f8c</code> <button class="copy-btn" type="button" data-copy="bf15f8633e85350430adf1bbc47a47154965d3a7f28e4ebad25d6a39ecaa2f8c">COPY SHA-256</button> · <a href="/proof/refusal/evidence-selector.json">Case A receipt →</a></p>
    <p class="case-panel" id="case-b" role="tabpanel" aria-labelledby="tab-case-b" data-case-panel="b"><span class="console-top"><span>CASE B · UNLEASED WRITE</span><span class="console-status refusal">exact_file_lease_required</span></span> <strong>A delayed worker cannot write after lease release:</strong> Proposes replacing <code>v1\\n</code> with <code>v2\\n</code> without an active File lease. <strong>Protected:</strong> <code>ungated.txt</code> (<code>3/3</code> bytes unchanged · No file write) · SHA-256: <code>2d27fbdf4e8ca207afbfa388ca9172fbcc6c70e534af2476b3b704f87debadcf</code> <button class="copy-btn" type="button" data-copy="2d27fbdf4e8ca207afbfa388ca9172fbcc6c70e534af2476b3b704f87debadcf">COPY SHA-256</button> · <a href="/proof/refusal/unleased-write.json">Case B receipt →</a></p>
    <p class="case-panel" id="case-c" role="tabpanel" aria-labelledby="tab-case-c" data-case-panel="c"><span class="console-top"><span>CASE C · APPROVAL-PARAMETER SUBSTITUTION</span><span class="console-status refusal">requested_act_mismatch</span></span> <strong>A plausible value cannot replace the controller-fixed act:</strong> Controller pins <code>Controller fixed value</code>; worker substitutes <code>Unrequested but valid value</code> on SQLite row. Aborted pre-cache. <strong>Effects/Calls:</strong> <code>0/0</code> · <strong>Row version:</strong> <code>1 → 1</code> · <strong>Bytes:</strong> <code>16,384/16,384</code> · SHA-256: <code>362088a107369e634cdc9c6c520fbca3e2393722860720d3aa2c2eb11b47d719</code> <button class="copy-btn" type="button" data-copy="362088a107369e634cdc9c6c520fbca3e2393722860720d3aa2c2eb11b47d719">COPY SHA-256</button> · <a href="/proof/refusal/act-pinning.json">Case C receipt →</a></p>
    <p class="case-panel" id="case-d" role="tabpanel" aria-labelledby="tab-case-d" data-case-panel="d"><span class="console-top"><span>CASE D · STALE GENERATION</span><span class="console-status refusal">stale_lease_generation</span></span> <strong>A stale request is refused before target creation:</strong> Request carries <code>expected 8, current 1</code>; rejected prior to destination creation, so receipt is intentionally reason-only (absent preimage, no fabricated digest). · <a href="/proof/refusal/stale-generation.json">Case D receipt →</a></p>
  </div>
  <p class="conformance-strip"><span><strong>45/45</strong> fresh candidate cases</span> · <span><strong>20/20</strong> evidence cases</span> · <span><strong>118.753576s</strong> execution</span> · <span><strong>0</strong> proprietary binaries published</span> — <a href="/proof/aina-refusal-proof-pack-v1.zip" class="btn-primary">Download Refusal Bundle (.zip)</a> · <a href="/proof/verify_refusal_proof.py" class="btn-secondary">Verifier script</a> · <a href="/proof/SHA256SUMS.txt" class="btn-secondary">SHA256SUMS.txt</a> · <button class="copy-btn" type="button" data-copy="curl -fsSL https://blayneaina.com/proof/aina-refusal-proof-pack-v1.zip -o aina-proof.zip && unzip -q aina-proof.zip -d aina-proof && cd aina-proof && python verify_refusal_proof.py">COPY ONE-LINE VERIFIER</button></p>
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
function generateHtml({ title, subtitle, contentHtml, currentSlug, prevArticle, nextArticle, isHome = false, isFull = false, isPartPage = false, compactChrome = false, canonicalOverride = '', pageHeroHtml = '', jsonLdHtml = '' }) {
  const canonicalUrl = canonicalOverride
    ? canonicalOverride
    : isHome
      ? 'https://blayneaina.com/'
      : isFull
        ? 'https://blayneaina.com/complete-series/'
        : `https://blayneaina.com/${currentSlug}/`;

  const metaDesc = subtitle || "The Route to Trusting AI: Architecture, Grounding, and Operational Invariants by Blayne Aina";
  const presentationPage = compactChrome || isHome || ["refusal-proof", "semantic-switch-proof", "articles", "sitemap"].includes(currentSlug);

  const archArticles = ARTICLES.filter(a => !a.isCommercial);
  const commercialArticles = ARTICLES.filter(a => a.isCommercial);

  const navLinks = archArticles.map((art) => {
    const isActive = art.slug === currentSlug;
    return `
      <li class="${isActive ? 'active' : ''}">
        <a href="/${art.slug}/">
          <span class="nav-num">§${art.num}</span>
          <span class="nav-title">${art.shortTitle} (https://blayneaina.com/${art.slug}/)</span>
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
          <span class="nav-title">${art.shortTitle} (https://blayneaina.com/${art.slug}/)</span>
        </a>
      </li>
    `;
  }).join('');

  const prevNextHtml = (!compactChrome && (prevArticle || nextArticle)) ? `
    <nav class="article-pagination" aria-label="Article navigation">
      ${prevArticle ? `
        <a href="/${prevArticle.slug}/" class="pagination-link prev">
          <span class="pagination-sub">← Previous (https://blayneaina.com/${prevArticle.slug}/)</span>
          <span class="pagination-title">${prevArticle.isCommercial ? prevArticle.shortTitle : `§${prevArticle.num}: ${prevArticle.shortTitle}`}</span>
        </a>
      ` : '<div class="pagination-empty"></div>'}
      ${nextArticle ? `
        <a href="/${nextArticle.slug}/" class="pagination-link next">
          <span class="pagination-sub">${nextArticle.isCommercial ? 'Deploy & Evaluate →' : 'Next Article →'} (https://blayneaina.com/${nextArticle.slug}/)</span>
          <span class="pagination-title">${nextArticle.isCommercial ? nextArticle.shortTitle : `§${nextArticle.num}: ${nextArticle.shortTitle}`}</span>
        </a>
      ` : '<div class="pagination-empty"></div>'}
    </nav>
  ` : '';

  const executiveBrief = EXECUTIVE_BRIEFS[currentSlug] || EXECUTIVE_BRIEFS.home;
  const executiveBriefHtml = (compactChrome || currentSlug === '' || isPartPage || ["articles", "sitemap"].includes(currentSlug)) ? '' : `
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
          <dt>Peer review &amp; diligence scope</dt>
          <dd>${escapeHtml(executiveBrief.commercial)}</dd>
        </div>
        <div class="brief-item">
          <dt>Next step</dt>
          <dd>${escapeHtml(executiveBrief.next)}</dd>
        </div>
      </dl>
    </section>
  `;

  const relatedProofHtml = (!compactChrome && !isPartPage && currentSlug === "03-eisa-four-gate-verdict-machine-and-entity-resolution") ? `
    <aside class="proof-link-panel" aria-label="Semantic Switch public evidence">
      <div>
        <div class="brief-label">EXPERIMENTAL ALPHA · SYNTHETIC INVARIANCE TESTBED</div>
        <h2>Inspect the Semantic Switch alpha evidence pack</h2>
        <p>Download synthetic fixtures and verification harnesses, inspect raw results, and reproduce 20/20 invariance blocks and 23/23 exact native relations.</p>
      </div>
      <a href="/semantic-switch-proof/" class="btn-primary">Open proof pack (https://blayneaina.com/semantic-switch-proof/)</a>
    </aside>
  ` : '';

  const releaseHtml = (!compactChrome && !isPartPage && currentSlug === "09-bring-one-real-boundary-work-with-blayne") ? RELEASE_BANNER_HTML : '';
  const insightHtml = (!compactChrome && !isPartPage && [
    "01-an-ai-output-is-not-an-act",
    "09-bring-one-real-boundary-work-with-blayne"
  ].includes(currentSlug)) ? GENUINE_INSIGHT_HTML : '';
  const portabilityHtml = (!compactChrome && !isPartPage && [
    "05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion",
    "07-defeating-approval-laundering-act-pinning-and-successor-grants",
    "08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate"
  ].includes(currentSlug)) ? PORTABILITY_HTML : '';
  const subpagePurposeHtml = (!compactChrome && !isPartPage && [
    "01-an-ai-output-is-not-an-act",
    "02-zero-trust-document-ingestion-and-server-cut-evidence",
    "03-eisa-four-gate-verdict-machine-and-entity-resolution",
    "04-the-room-why-git-and-chat-are-not-coordination-planes",
    "05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion",
    "06-rollback-is-not-erasure-dual-tier-vaults-and-ungated-quarantine",
    "07-defeating-approval-laundering-act-pinning-and-successor-grants",
    "08-sovereign-kill-switch-break-glass-epochs-and-conformance-gate"
  ].includes(currentSlug)) ? `
    <div class="subpage-purpose">Direct Reading Formats: <a href="/${currentSlug.slice(0, 2)}/brief/">1-Call Complete §${currentSlug.slice(0, 2)} Brief (https://blayneaina.com/${currentSlug.slice(0, 2)}/brief/)</a> · <a href="/ai-brief/">All §01–§09 Master Brief (https://blayneaina.com/ai-brief/)</a> · <a href="/${currentSlug.slice(0, 2)}.md">Raw Markdown (https://blayneaina.com/${currentSlug.slice(0, 2)}.md)</a> · <a href="/articles/">All 9 Articles Index (https://blayneaina.com/articles/)</a></div>
  ` : '';

  const headerChromeHtml = compactChrome
    ? `<header class="site-header compact-ai-header"><div class="header-inner compact-ai-nav"><a href="/" class="brand"><strong>BLAYNE AINA</strong></a> | <a href="/ai-brief/">1-Page Master Brief (§01–§09)</a> | <a href="/articles/">All 9 Articles &amp; Briefs</a> | <a href="/research-assurance/">Assurance</a> | <a href="/refusal-proof/">Proof</a> | <a href="/llms.txt">llms.txt</a> | <a href="mailto:me@blayneaina.com">me@blayneaina.com</a></div></header>`
    : `<header class="site-header"><div class="header-inner"><a href="/" class="brand"><span class="brand-name">BLAYNE AINA</span> <span class="brand-divider">/</span> <span class="brand-tagline">The Route to Trusting AI</span></a> <nav class="header-actions" aria-label="Primary site navigation"><a href="/ai-brief/" class="header-link">AI Brief (§01–§09)</a> <a href="/articles/" class="header-link">All 9 Articles</a> <a href="/research-assurance/" class="header-link">Assurance</a> <a href="/refusal-proof/" class="header-link">Proof</a> <a href="/sitemap/" class="header-link">Sitemap</a> <a href="https://github.com/SquadForge/blayne.aina" class="header-link" rel="noopener noreferrer">GitHub</a> <button type="button" class="header-link header-search" id="quickSearchBtn" aria-label="Search articles and proof artifacts">Search</button> <a href="/09-bring-one-real-boundary-work-with-blayne/" class="header-cta">Peer Review (§09)</a> <button id="themeToggle" class="theme-btn" aria-label="Toggle theme"><span class="theme-icon light">☀️</span><span class="theme-icon dark">🌙</span></button>${presentationPage ? '' : '<button id="mobileMenuBtn" class="mobile-menu-btn" aria-label="Open navigation menu" aria-controls="sidebar" aria-expanded="false">☰</button>'}</nav></div></header>
  <div class="candidate-ribbon" role="region" aria-label="Peer review and structured brief navigation"><span class="candidate-identity"><strong>TECHNICAL REVIEW &amp; BRIEF INDEX:</strong></span> <nav class="candidate-links" aria-label="Evaluation paths"><a href="/ai-brief/">Master Brief https://blayneaina.com/ai-brief/</a> · <a href="/ai-brief.txt">Plain Text https://blayneaina.com/ai-brief.txt</a> · <a href="/articles/">Articles &amp; Briefs https://blayneaina.com/articles/</a> · <a href="/research-assurance/">Assurance https://blayneaina.com/research-assurance/</a> · <a href="mailto:me@blayneaina.com" class="candidate-email">me@blayneaina.com</a></nav></div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} | Blayne Aina</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <meta name="author" content="Blayne Aina">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonicalUrl}">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">

  <!-- OpenGraph / Social -->
  <meta property="og:type" content="${isHome ? 'website' : 'article'}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:site_name" content="Blayne Aina — The Route to Trusting AI">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  ${jsonLdHtml ? jsonLdHtml.trim() + '\n' : ''}
  <link rel="stylesheet" href="/style.css?v=20261109-s-tier">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
</head>
<body>
  <div class="reading-progress-bar" id="progressBar"></div>

  ${headerChromeHtml}
  <div class="layout-container ${presentationPage ? 'presentation-layout' : ''}">
    <main class="content-area">
      <article class="prose-wrapper ${presentationPage ? 'presentation-wrapper' : ''}">
${pageHeroHtml ? pageHeroHtml.trim() : (compactChrome
  ? `<header class="article-header compact-article-header"><h1 class="article-title">${escapeHtml(title)}</h1>${subtitle ? `<p class="article-subtitle">${escapeHtml(subtitle)}</p>` : ''}</header>`
  : `<header class="article-header"><h1 class="article-title">${escapeHtml(title)}</h1>${subtitle ? `<p class="article-subtitle">${escapeHtml(subtitle)}</p>` : ''}<p class="article-meta"><span class="meta-item author">By Blayne Aina</span> · <span class="meta-item role">Principal Systems Architect and creator of AINA</span> · <span class="meta-item date">October 31, 2026</span> · <span class="meta-item tag">AINA Governance Specification</span></p></header>`)}

        ${subpagePurposeHtml}
        ${executiveBriefHtml}

        <div class="article-body">
          ${contentHtml}
        </div>

        ${releaseHtml}
        ${insightHtml}
        ${portabilityHtml}
        ${relatedProofHtml}

        ${prevNextHtml}

        ${(compactChrome || isHome) ? '' : `<footer class="article-footer-cta">
          <h3>Technical Peer Review &amp; Scoped Evaluation (§09): Bring One Real Boundary</h3>
          <p>Do not rely on a vision deck. Bring one consequential transition—workflow standing, hostile document adjudication, or protected entity resolution—or propose an independent research evaluation. We establish a written acceptance boundary, run the existing implementation, and make the positive, refusal, and unresolved evidence inspectable.</p>
          <div class="cta-actions">
            <a href="/09-bring-one-real-boundary-work-with-blayne/" class="btn-primary">Peer Review &amp; Evaluation (§09)</a>
            <a href="/articles/" class="btn-secondary">Complete 9-Article &amp; Chunk Index</a>
            <a href="mailto:me@blayneaina.com?subject=[RESEARCH]%20Technical%20Peer%20Review%20%2F%20R%26D%20Evaluation" class="btn-secondary">me@blayneaina.com</a>
          </div>
        </footer>`}
      </article>
    </main>
${presentationPage ? '' : `    <aside class="site-sidebar" id="sidebar">
      <div class="sidebar-header">
        <span class="sidebar-label">Architecture Series</span>
        <span class="sidebar-date">October 2026</span>
      </div>
      <nav class="series-nav">
        <ul>
          <li class="${isHome ? 'active' : ''}">
            <a href="/">
              <span class="nav-num">§00</span>
              <span class="nav-title">Series Overview &amp; Thesis (https://blayneaina.com/)</span>
            </a>
          </li>
          <li>
            <a href="/ai-brief/">
              <span class="nav-num">AI</span>
              <span class="nav-title">1-Page Master Brief (§01–§09) (https://blayneaina.com/ai-brief/)</span>
            </a>
          </li>
          <li>
            <a href="/articles/">
              <span class="nav-num">ALL</span>
              <span class="nav-title">All 9 Articles, Briefs &amp; Chunks (https://blayneaina.com/articles/)</span>
            </a>
          </li>
          ${navLinks}
        </ul>
        <div class="sidebar-section-divider">
          <span class="sidebar-label">Peer Review &amp; Evaluate</span>
        </div>
        <ul>
          ${commercialLinks}
          <li>
            <a href="/research-assurance/">
              <span class="nav-num">↗</span>
              <span class="nav-title">Research &amp; Assurance Binder (https://blayneaina.com/research-assurance/)</span>
            </a>
          </li>
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
          <div class="author-bio">Principal Systems Architect · 11+ Years Enterprise Systems Delivery · USMC Veteran</div>
          <a href="mailto:me@blayneaina.com" class="author-email">me@blayneaina.com</a>
          <div class="author-contact">Blayne Aina · Denver, CO · <a href="mailto:me@blayneaina.com">me@blayneaina.com</a></div>
          <a href="https://github.com/SquadForge/blayne.aina" class="author-contact" rel="noopener noreferrer">GitHub Repo (https://github.com/SquadForge/blayne.aina)</a>
        </div>
      </div>
    </aside>`}
  </div>

  ${compactChrome
    ? `<footer class="site-footer compact-ai-footer"><p><strong>blayneaina.com</strong> — <a href="https://blayneaina.com/ai-brief/">Master Brief (https://blayneaina.com/ai-brief/)</a> · <a href="https://blayneaina.com/ai-brief.txt">Plain-Text Brief (https://blayneaina.com/ai-brief.txt)</a> · <a href="https://blayneaina.com/articles/">All 9 Articles &amp; Briefs (https://blayneaina.com/articles/)</a> · <a href="https://blayneaina.com/llms.txt">llms.txt</a> · <a href="mailto:me@blayneaina.com">me@blayneaina.com</a></p></footer>`
    : `<footer class="site-footer"><p class="footer-inner"><span class="footer-left"><strong>blayneaina.com</strong> — Architectural invariants, verifiable execution, and production governance for autonomous systems. © 2026 Blayne Aina.</span> <span class="footer-series-nav" role="navigation" aria-label="Complete architecture series and verification index"><a href="/">Overview</a> · <a href="/ai-brief/">Master Brief (§01–§09)</a> · <a href="/ai-brief.txt">ai-brief.txt</a> · <a href="/articles/">All 9 Articles &amp; Chunks</a> · <a href="/articles/digest-1/">Digest 1</a> · <a href="/articles/digest-2/">Digest 2</a> · <a href="/articles/digest-3/">Digest 3</a> · <a href="/research-assurance/">Research &amp; Assurance</a> · <a href="/refusal-proof/">Refusal Proof</a> · <a href="/semantic-switch-proof/">Semantic Switch</a> · <a href="/sitemap/">Sitemap</a> · <a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a> · <a href="mailto:me@blayneaina.com">me@blayneaina.com</a></span></p></footer>`}

${(presentationPage && !compactChrome && !isHome) ? `<nav class="quick-dock" aria-label="Quick evaluation links"><a href="/ai-brief/">AI Brief</a> <a href="/articles/">Articles</a> <a href="/refusal-proof/">Proof</a> <a href="/09-bring-one-real-boundary-work-with-blayne/">Evaluate</a></nav>` : ''}

${(isPartPage || compactChrome) ? '' : `  <dialog class="quick-search" id="quickSearchDialog" aria-labelledby="quick-search-title"><div class="quick-search-head"><label id="quick-search-title" for="quickSearchInput">Search architecture and evidence</label><button type="button" id="quickSearchClose" aria-label="Close search">Close</button></div><input id="quickSearchInput" type="search" placeholder="Try EISA, PCNA, SQLite, leases, Semantic Switch…" autocomplete="off"><div class="quick-search-results" id="quickSearchResults"></div></dialog><script type="application/json" id="quickSearchData">${JSON.stringify([
    { href: '/ai-brief/', title: '1-Page Complete Master Brief (§01–§09)', sub: 'Single-page architecture compendium · zero truncation' },
    { href: '/articles/', title: 'All 9 Articles, Briefs & Multi-Part Chunks Index', sub: 'Complete directory · 1-call briefs · zero-loss parts' },
    { href: '/research-assurance/', title: 'Research & Assurance Due-Diligence Binder', sub: 'A2E · 3 provisionals · 5 PRJ work packages' },
    { href: '/refusal-proof/', title: 'Refusal & Unchanged-Destination Proof', sub: 'PCNA · EISA · verifier · SQLite · 45 cases' },
    { href: '/proof/conformance/conformance_45_manifest.json', title: '45-case conformance manifest', sub: 'release qualification · candidate results' },
    { href: '/semantic-switch-proof/', title: 'Semantic Switch proof', sub: 'AKO · Lampson confinement · relation isomorphism' },
    { href: '/#formal-confinement', title: 'Formal confinement and A2E', sub: 'bounded TCB · finiteness · three provisionals' },
    { href: '/#career-snapshot', title: 'Enterprise delivery snapshot', sub: '2015–2026 · CRM · migrations · production cutovers' },
    ...ARTICLES.map(art => ({ href: `/${art.slug}/`, title: `§${art.num} · ${art.shortTitle}`, sub: art.theme }))
  ])}</script>`}

  <script src="/script.js?v=20261109-s-tier"></script>
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

function splitMarkdownIntoLosslessParts(visibleMd, targetChars = 14500) {
  const regex = /^## /gm;
  const indices = [];
  let match;
  while ((match = regex.exec(visibleMd)) !== null) {
    indices.push(match.index);
  }
  if (indices.length === 0) {
    return [{ sections: ['Full Article'], markdown: visibleMd }];
  }
  const blocks = [];
  if (indices[0] > 0) {
    blocks.push({ title: 'Introduction & Overview', chunk: visibleMd.substring(0, indices[0]) });
  }
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i];
    const end = i + 1 < indices.length ? indices[i + 1] : visibleMd.length;
    const chunk = visibleMd.substring(start, end);
    const firstLine = chunk.split('\n')[0].replace(/^##\s+/, '').trim();
    blocks.push({ title: firstLine, chunk });
  }

  const parts = [];
  let curTitles = [];
  let curChunks = [];
  let curLen = 0;

  for (const { title, chunk } of blocks) {
    if (curChunks.length > 0 && (curLen + chunk.length > targetChars)) {
      parts.push({ sections: curTitles, markdown: curChunks.join('') });
      curTitles = [title];
      curChunks = [chunk];
      curLen = chunk.length;
    } else {
      curTitles.push(title);
      curChunks.push(chunk);
      curLen += chunk.length;
    }
  }
  if (curChunks.length > 0) {
    if (parts.length > 0 && curLen < 5500 && (parts[parts.length - 1].markdown.length + curLen <= 19500)) {
      parts[parts.length - 1].sections.push(...curTitles);
      parts[parts.length - 1].markdown += curChunks.join('');
    } else {
      parts.push({ sections: curTitles, markdown: curChunks.join('') });
    }
  }

  const reconstructed = parts.map(p => p.markdown).join('');
  if (reconstructed !== visibleMd) {
    throw new Error(`Lossless split verification failed: reconstructed ${reconstructed.length} chars vs original ${visibleMd.length} chars`);
  }
  return parts;
}

const LEGACY_ARCH_SLUGS = {
  "01": "articles/01-an-ai-output-is-not-an-act",
  "02": "architecture/zero-trust-document-ingestion-and-server-cut-evidence",
  "03": "architecture/eisa-four-gate-verdict-machine-and-entity-resolution",
  "04": "architecture/the-room-coordination-plane",
  "05": "architecture/expiry-is-not-fencing-typed-leases",
  "06": "architecture/rollback-is-not-erasure-dual-tier-vaults",
  "07": "architecture/defeating-approval-laundering-act-pinning-successor-grants",
  "08": "architecture/sovereign-kill-switch-break-glass-epochs-conformance-gate",
  "09": "architecture/bring-one-real-boundary-work-with-blayne"
};

function stripMdFormatting(text) {
  return String(text || '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/[`*~]/g, '')
    .replace(/(^|\s)_([^_\s][^_]*?)_(?=\s|$|[.,;:!?])/g, '$1$2')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseMdTableRowCells(line) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map(c => c.trim());
}

function flattenTableRowsToSummary(tableLines, plain = false) {
  if (!tableLines || tableLines.length < 2) return [];
  const cleanCell = c => (plain ? stripMdFormatting(c) : c.replace(/\s+/g, ' ').trim());
  const headers = parseMdTableRowCells(tableLines[0]).map(cleanCell);
  const rows = [];
  for (let r = 1; r < tableLines.length; r++) {
    const raw = tableLines[r].trim();
    if (/^\|?[\s:-]+(?:\|[\s:-]+)+\|?$/.test(raw)) continue;
    const cells = parseMdTableRowCells(raw).map(cleanCell);
    if (cells.length === 0 || cells.every(c => !c)) continue;
    if (cells.length === 2 && headers.length >= 2) {
      rows.push(plain ? `${cells[0]}: ${cells[1]}` : `**${cells[0]}**: ${cells[1]}`);
    } else {
      const pairs = cells.map((cell, idx) => {
        if (!cell) return '';
        if (idx === 0) return plain ? `${cell}` : `**${cell}**`;
        const h = headers[idx] || `Col${idx + 1}`;
        return `${h}: ${cell}`;
      }).filter(Boolean);
      if (pairs.length > 0) rows.push(pairs.join('; '));
    }
  }
  return rows;
}

function truncateAtWordBoundary(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  const cut = str.slice(0, maxLen);
  const lastPeriod = cut.lastIndexOf('. ');
  if (lastPeriod > maxLen * 0.55) return cut.slice(0, lastPeriod + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > maxLen * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…';
}

function extractSinglePageArticleBrief(art, prevArticle, nextArticle) {
  const brief = EXECUTIVE_BRIEFS[art.slug] || {};
  const lines = art.visibleMd.split('\n');
  const h2Blocks = [];
  let cur = { title: 'Introduction & Thesis', rawLines: [] };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (cur.rawLines.some(l => l.trim())) {
        h2Blocks.push(cur);
      }
      cur = { title: line.replace(/^##\s+/, '').trim(), rawLines: [] };
    } else {
      cur.rawLines.push(line);
    }
  }
  if (cur.rawLines.some(l => l.trim())) {
    h2Blocks.push(cur);
  }

  const findPartNum = (h2Title) => {
    const found = (art.parts || []).find(pt =>
      pt.sections.some(s => s === h2Title || h2Title.includes(s) || s.includes(h2Title))
    );
    return found ? found.partNum : 1;
  };

  const sectionBulletsHtml = [];
  const sectionLinesTxt = [];

  for (const blk of h2Blocks) {
    const partNum = findPartNum(blk.title);
    const subheadings = [];
    const proseSentences = [];
    const bulletFacts = [];
    const flatTables = [];
    let tableBuf = [];
    let inCode = false;

    const flushTable = () => {
      if (tableBuf.length >= 2) {
        const rows = flattenTableRowsToSummary(tableBuf, false);
        if (rows.length > 0) flatTables.push(rows.join(' | '));
      }
      tableBuf = [];
    };

    const isClaim = /Claim Card/i.test(blk.title);

    for (const rawLine of blk.rawLines) {
      const trimmed = rawLine.trim();
      if (trimmed.startsWith('```')) {
        flushTable();
        inCode = !inCode;
        continue;
      }
      if (!trimmed || trimmed.startsWith('<script')) {
        if (!trimmed) flushTable();
        continue;
      }
      if (inCode) {
        if (isClaim) bulletFacts.push(trimmed);
        continue;
      }
      if (trimmed.startsWith('|')) {
        tableBuf.push(trimmed);
        continue;
      }
      flushTable();
      if (trimmed.startsWith('### ')) {
        subheadings.push(trimmed.replace(/^###\s+/, '').trim());
      } else if (/^[-*+]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
        bulletFacts.push(trimmed.replace(/^([-*+]|\d+\.)\s+/, ''));
      } else if (!trimmed.startsWith('---')) {
        proseSentences.push(trimmed);
      }
    }
    flushTable();

    const pieces = [];
    if (subheadings.length > 0) {
      pieces.push(`*Subtopics:* ${subheadings.join('; ')}`);
    }
    if (proseSentences.length > 0) {
      const proseClean = truncateAtWordBoundary(proseSentences.join(' ').replace(/\s+/g, ' '), isClaim ? 420 : 280);
      pieces.push(proseClean);
    }
    if (flatTables.length > 0) {
      const tableText = truncateAtWordBoundary(flatTables.join(' | '), isClaim ? 780 : 420);
      pieces.push(`*Spec/Table:* ${tableText}`);
    }
    if (bulletFacts.length > 0) {
      const factText = truncateAtWordBoundary(bulletFacts.join(' | '), isClaim ? 680 : 320);
      pieces.push(`*Key Rules/Claims:* ${factText}`);
    }

    const bodyMd = pieces.length > 0 ? pieces.join(' — ') : 'Full technical specification in linked Part.';
    const partLabel = `[Part ${partNum}/${art.parts.length}]`;
    sectionBulletsHtml.push(`- **${blk.title} ${partLabel}:** ${bodyMd}`);
    sectionLinesTxt.push(`- ${blk.title} ${partLabel}: ${stripMdFormatting(bodyMd)}`);
  }

  while (sectionBulletsHtml.length > 24) {
    const tailHtml = sectionBulletsHtml.pop().replace(/^- /, '');
    sectionBulletsHtml[sectionBulletsHtml.length - 1] += ` || ${tailHtml}`;
    const tailTxt = sectionLinesTxt.pop().replace(/^- /, '');
    sectionLinesTxt[sectionLinesTxt.length - 1] += ` || ${tailTxt}`;
  }

  const partLinksMd = (art.parts || []).map(pt =>
    `[Part ${pt.partNum}/${pt.totalParts}](${pt.relUrl}) ([.txt](/${art.num}/part-${pt.partNum}.txt))`
  ).join(' · ');
  const partLinksTxt = (art.parts || []).map(pt =>
    `Part ${pt.partNum}: https://blayneaina.com${pt.relUrl} (raw: https://blayneaina.com/${art.num}/part-${pt.partNum}.txt)`
  ).join(' | ');
  const prevNextMd = [
    prevArticle ? `[← §${prevArticle.num} Brief](/${prevArticle.num}/brief/)` : '',
    nextArticle ? `[§${nextArticle.num} Brief →](/${nextArticle.num}/brief/)` : '',
    `[All §01–§09 Master Brief](/ai-brief/)`,
    `[All Articles](/articles/)`,
    `[Raw Markdown](/${art.num}.md)`
  ].filter(Boolean).join(' · ');

  const briefMd = [
    `**Canonical URLs:** [Full §${art.num}](https://blayneaina.com/${art.slug}/) · [Raw Markdown](https://blayneaina.com/${art.num}.md) · [Plain-Text Brief](https://blayneaina.com/${art.num}/brief.txt) · ${prevNextMd}`,
    `**Executive Synthesis:** **Problem:** ${brief.problem || ''} — **Proves:** ${brief.proof || ''} — **Evaluation Scope:** ${brief.commercial || ''}`,
    `**Lossless Parts (${art.parts.length} total, 100% unabridged):** ${partLinksMd}`,
    ...sectionBulletsHtml
  ].join('\n');

  const briefTxt = [
    `# AINA §${art.num} ONE-CALL TECHNICAL BRIEF — ${art.title}`,
    `Canonical: https://blayneaina.com/${art.num}/brief/ | Full Article: https://blayneaina.com/${art.slug}/ | Raw Markdown: https://blayneaina.com/${art.num}.md | All §01–§09 Master Brief: https://blayneaina.com/ai-brief.txt`,
    `Nav: ${prevArticle ? `PrevBrief=https://blayneaina.com/${prevArticle.num}/brief.txt | ` : ''}${nextArticle ? `NextBrief=https://blayneaina.com/${nextArticle.num}/brief.txt | ` : ''}Site=https://blayneaina.com/ | Repo=https://github.com/SquadForge/blayne.aina | Contact=me@blayneaina.com`,
    `Executive Summary: Problem: ${brief.problem || ''} | Proves: ${brief.proof || ''} | Scope: ${brief.commercial || ''}`,
    `Parts (${art.parts.length}): ${partLinksTxt}`,
    ...sectionLinesTxt
  ].join('\n');

  return { briefMd, briefTxt };
}

// 1. Process Articles
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
  const strippedMd = stripStandaloneArticleHeader(markdown, title);

  const scriptIdx = strippedMd.indexOf('<script type="application/ld+json">');
  const visibleMd = scriptIdx !== -1 ? strippedMd.substring(0, scriptIdx).trimEnd() : strippedMd;
  const articleJsonLdHtml = scriptIdx !== -1 ? strippedMd.substring(scriptIdx).trim() : '';

  art.title = title;
  art.subtitle = subtitle;
  art.visibleMd = visibleMd;

  const rawParts = splitMarkdownIntoLosslessParts(visibleMd, 14500);
  art.parts = rawParts.map((p, idx) => {
    const partNum = idx + 1;
    return {
      partNum,
      totalParts: rawParts.length,
      sections: p.sections,
      markdown: p.markdown,
      chars: p.markdown.length,
      lines: p.markdown.split('\n').length,
      url: `https://blayneaina.com/${art.slug}/part-${partNum}/`,
      relUrl: `/${art.slug}/part-${partNum}/`,
      shortUrl: `https://blayneaina.com/${art.num}/part-${partNum}/`,
      txtUrl: `https://blayneaina.com/${art.num}/part-${partNum}.txt`
    };
  });

  const prevArticle = index > 0 ? ARTICLES[index - 1] : null;
  const nextArticle = index < ARTICLES.length - 1 ? ARTICLES[index + 1] : null;

  const partDirectoryHtml = `
    <section class="portability-note part-directory" aria-label="AI brief and multi-part chunk directory">
      <div class="brief-label">FAST AI BRIEF &amp; LOSSLESS MULTI-PART READING (${art.parts.length} PARTS)</div>
      <p><strong>1-Call Brief (Recommended for AI Readers):</strong> <a href="/${art.num}/brief/"><code>https://blayneaina.com/${art.num}/brief/</code></a> · <a href="/${art.num}/brief.txt">Plain Text <code>/${art.num}/brief.txt</code></a> · <a href="/${art.num}.md">Raw Markdown <code>/${art.num}.md</code></a> · <a href="/ai-brief/">All §01–§09 Master Brief</a></p>
      <ul>
        ${art.parts.map(pt => `<li><a href="${pt.relUrl}"><strong>Part ${pt.partNum}/${pt.totalParts}:</strong> <code>${pt.url}</code></a> · <a href="/${art.num}/part-${pt.partNum}.txt"><code>.txt</code></a> (${pt.chars.toLocaleString()} chars) — ${pt.sections.map(s => escapeHtml(s)).join(' · ')}</li>`).join('\n        ')}
      </ul>
      <p class="panel-note"><strong>Series Navigation:</strong> <a href="/articles/">All 9 Articles (<code>/articles/</code>)</a> · <a href="/articles/digest-1/">Digest 1 (§01–§03)</a> · <a href="/articles/digest-2/">Digest 2 (§04–§06)</a> · <a href="/articles/digest-3/">Digest 3 (§07–§09)</a>${prevArticle ? ` · Prev: <a href="/${prevArticle.slug}/">§${prevArticle.num}</a>` : ''}${nextArticle ? ` · Next: <a href="/${nextArticle.slug}/">§${nextArticle.num}</a>` : ''}.</p>
    </section>
  `;

  const htmlContent = partDirectoryHtml + '\n' + marked.parse(visibleMd);

  const fullHtml = generateHtml({
    title,
    subtitle,
    contentHtml: htmlContent,
    currentSlug: art.slug,
    prevArticle,
    nextArticle,
    jsonLdHtml: articleJsonLdHtml
  });

  // Write full articles and raw markdown
  const artDir = path.join(DIST_DIR, art.slug);
  fs.mkdirSync(artDir, { recursive: true });
  fs.writeFileSync(path.join(artDir, 'index.html'), fullHtml, 'utf8');

  const shortDir = path.join(DIST_DIR, art.num);
  fs.mkdirSync(shortDir, { recursive: true });
  fs.writeFileSync(path.join(shortDir, 'index.html'), fullHtml, 'utf8');

  const rawMdHeader = `# §${art.num}: ${title}\n> Canonical: https://blayneaina.com/${art.slug}/ | 1-Call Brief: https://blayneaina.com/${art.num}/brief/ | Parts: ${art.parts.length}\n\n`;
  fs.writeFileSync(path.join(DIST_DIR, `${art.num}.md`), rawMdHeader + visibleMd + '\n', 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, `${art.slug}.md`), rawMdHeader + visibleMd + '\n', 'utf8');

  const legacyPath = LEGACY_ARCH_SLUGS[art.num];
  if (legacyPath) {
    const legacyDir = path.join(DIST_DIR, legacyPath);
    fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(path.join(legacyDir, 'index.html'), fullHtml, 'utf8');
  }

  // Write technical briefs
  const { briefMd, briefTxt } = extractSinglePageArticleBrief(art, prevArticle, nextArticle);
  art.briefMd = briefMd;
  art.briefTxt = briefTxt;

  const briefHtml = generateHtml({
    title: `§${art.num} One-Call Technical Brief: ${art.shortTitle}`,
    subtitle: `${art.parts.length} lossless parts summarized from 01–09 source markdown · For full prose see /${art.num}.md`,
    contentHtml: marked.parse(briefMd),
    currentSlug: art.slug,
    isPartPage: true,
    compactChrome: true,
    canonicalOverride: `https://blayneaina.com/${art.num}/brief/`
  });

  for (const baseDir of [shortDir, artDir]) {
    const briefDir = path.join(baseDir, 'brief');
    fs.mkdirSync(briefDir, { recursive: true });
    fs.writeFileSync(path.join(briefDir, 'index.html'), briefHtml, 'utf8');
    fs.writeFileSync(path.join(baseDir, 'brief.txt'), briefTxt + '\n', 'utf8');
  }

  // Write section parts
  art.parts.forEach((pt, idx) => {
    const prevPart = idx > 0 ? art.parts[idx - 1] : null;
    const nextPart = idx + 1 < art.parts.length ? art.parts[idx + 1] : null;

    const partNavTopHtml = `
      <p class="part-compact-nav"><strong>§${art.num} PART ${pt.partNum}/${pt.totalParts}</strong> (${pt.chars.toLocaleString()} chars · Sections: ${pt.sections.map(s => escapeHtml(s)).join('; ')}) — ${prevPart ? `<a href="${prevPart.relUrl}">← Part ${prevPart.partNum}</a> · ` : ''}${nextPart ? `<a href="${nextPart.relUrl}">Part ${nextPart.partNum} →</a> · ` : (nextArticle ? `<a href="/${nextArticle.slug}/part-1/">§${nextArticle.num} Part 1 →</a> · ` : '')}<a href="/${art.num}/brief/">1-Call Brief</a> · <a href="/${art.slug}/">Full §${art.num}</a> · <a href="/${art.num}/part-${pt.partNum}.txt">Raw .txt</a> · All: ${art.parts.map(p => `<a href="${p.relUrl}">P${p.partNum}</a>`).join(' ')}</p>
    `;

    const partNavBottomHtml = `
      <p class="part-compact-nav"><strong>END OF §${art.num} PART ${pt.partNum}/${pt.totalParts}</strong> — ${nextPart ? `Next: <a href="${nextPart.relUrl}"><code>${nextPart.url}</code></a>` : (nextArticle ? `Next Article: <a href="/${nextArticle.slug}/part-1/"><code>https://blayneaina.com/${nextArticle.slug}/part-1/</code></a>` : `<a href="/ai-brief/">Master Brief</a> · <a href="/articles/">All 9 Articles</a>`)} · <a href="/${art.num}/brief/">§${art.num} 1-Call Brief</a> · <a href="/${art.num}.md">Raw .md</a></p>
    `;

    const partHtml = generateHtml({
      title: `§${art.num} Part ${pt.partNum}/${pt.totalParts}: ${art.shortTitle} (${pt.sections[0]})`,
      subtitle: `Sections: ${pt.sections.join(', ')}`,
      contentHtml: partNavTopHtml + '\n' + marked.parse(pt.markdown) + '\n' + partNavBottomHtml,
      currentSlug: art.slug,
      prevArticle,
      nextArticle,
      isPartPage: true,
      compactChrome: true,
      canonicalOverride: pt.url
    });

    const partDir = path.join(artDir, `part-${pt.partNum}`);
    fs.mkdirSync(partDir, { recursive: true });
    fs.writeFileSync(path.join(partDir, 'index.html'), partHtml, 'utf8');

    const shortPartDir = path.join(shortDir, `part-${pt.partNum}`);
    fs.mkdirSync(shortPartDir, { recursive: true });
    fs.writeFileSync(path.join(shortPartDir, 'index.html'), partHtml, 'utf8');

    const partTxtHeader = `# §${art.num} Part ${pt.partNum}/${pt.totalParts} — ${art.shortTitle}\nCanonical: ${pt.url} | Raw Article: https://blayneaina.com/${art.num}.md${nextPart ? ` | Next Part: https://blayneaina.com/${art.num}/part-${nextPart.partNum}.txt` : (nextArticle ? ` | Next Article Brief: https://blayneaina.com/${nextArticle.num}/brief.txt` : '')}\n\n`;
    fs.writeFileSync(path.join(artDir, `part-${pt.partNum}.txt`), partTxtHeader + pt.markdown + '\n', 'utf8');
    fs.writeFileSync(path.join(shortDir, `part-${pt.partNum}.txt`), partTxtHeader + pt.markdown + '\n', 'utf8');
  });

  const legacyFlatHtml = path.join(DIST_DIR, `${art.slug}.html`);
  if (fs.existsSync(legacyFlatHtml)) {
    fs.unlinkSync(legacyFlatHtml);
  }
  console.log(`✓ Built Article ${art.num}: ${art.slug} (${art.parts.length} parts, 1-call brief, raw .md/.txt)`);
});

function getArticleClaimSummaryFromMd(art) {
  const lines = art.visibleMd.split('\n');
  const h2Titles = lines.filter(l => l.startsWith('## ')).map(l => l.replace(/^##\s+/, '').trim());
  const claimIdx = lines.findIndex(l => /^##\s+.*Claim Card/i.test(l));
  let claimSnippet = '';
  if (claimIdx !== -1) {
    const slice = [];
    for (let i = claimIdx + 1; i < lines.length && !lines[i].startsWith('## '); i++) {
      const t = lines[i].trim();
      if (t && !t.startsWith('```') && !t.startsWith('---') && !t.startsWith('<script')) slice.push(t);
    }
    const tableLines = slice.filter(l => l.startsWith('|'));
    const nonTable = slice.filter(l => !l.startsWith('|') && !/^\s*$/.test(l)).map(l => l.replace(/^[-*+]\s+/, ''));
    const rows = tableLines.length >= 2 ? flattenTableRowsToSummary(tableLines, true) : [];
    const joined = [...nonTable, ...rows].join(' | ');
    claimSnippet = truncateAtWordBoundary(stripMdFormatting(joined), 320);
  }
  return {
    sectionsSummary: truncateAtWordBoundary(h2Titles.join(' · '), 240),
    claimSnippet
  };
}

// 2. Generate Index / Landing Page
console.log('Generating Home Page (index.html)...');
const homeHeroHtml = `
<section class="page-hero" aria-labelledby="home-hero-title">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="hero-eyebrow">Inspectable verification bundle live · recorded public evidence — Author: Blayne Aina (Denver, CO), USMC Veteran, Principal Systems Architect &amp; Creator of AINA</p>
      <h1 class="hero-title-xl" id="home-hero-title">AI can propose. <span class="hero-serif">It cannot act.</span></h1>
      <p class="hero-summary"><strong>AINA (Autonomous Intelligent Networked Architecture)</strong> compiles probabilistic AI output into bounded proposals, checks authority, provenance, and leases at the commit boundary (core runtime in <strong>Rust</strong>, TypeScript minimal glue), and proves when protected state remains untouched. <strong>Trust is not a prompt. It is a boundary.</strong> Published solely for independent technical peer review, security/formal-verification critique, and AI-safety / federal R&amp;D due diligence (not job-seeking).</p>
      <p class="hero-actions"><a href="/refusal-proof/" class="btn-primary">Inspect the Refusal Proof</a> <a href="/proof/aina-refusal-proof-pack-v1.zip" class="btn-secondary">Download Proof Bundle</a> <a href="/ai-brief/" class="btn-secondary">1-Page Master Brief (§01–§09)</a> <a href="/ai-brief.txt" class="btn-secondary">/ai-brief.txt</a></p>
      <p class="hero-kpis" aria-label="Published verification results"><span class="hero-kpi"><strong>4/4</strong><span>deterministic refusal cases</span></span> <span class="hero-kpi"><strong>45/45</strong><span>candidate conformance cases</span></span> <span class="hero-kpi"><strong>20/20</strong><span>evidence acceptance cases</span></span> <span class="hero-kpi"><strong>16,384</strong><span>SQLite bytes unchanged · Case C</span></span> <span class="hero-kpi"><strong>39/39</strong><span>SHA256SUMS files verified</span></span></p>
    </div>
    <p class="proof-console" aria-label="Case C approval-parameter substitution refusal"><span class="console-top"><span>PCNA · CASE C (LIVE EXHIBIT)</span><span class="console-status refusal">REFUSED</span></span> <span class="console-grid"><span class="console-cell wide"><span class="console-label">Protected destination: </span><span class="console-value">contacts.db · id=1 · row_version=1</span></span> <span class="console-cell"><span class="console-label">Controller fixed: </span><span class="console-value">"Controller fixed value"</span></span> <span class="console-cell"><span class="console-label">Worker proposed: </span><span class="console-value">"Unrequested but valid value"</span></span> <span class="console-cell wide"><span class="console-label">Deterministic decision: </span><span class="console-value refusal">requested_act_mismatch</span></span> <span class="console-cell"><span class="console-label">Effects / model calls: </span><span class="console-value">0 / 0</span></span> <span class="console-cell"><span class="console-label">Destination bytes: </span><span class="console-value teal">16,384 / 16,384</span></span> <span class="console-cell wide"><span class="console-label">Pre/post SHA-256: </span><span class="console-value teal">362088a1…b47d719 · MATCH</span></span></span> <span class="console-foot"><span>RECORDED PUBLIC RECEIPT</span><span>NO DESTINATION MUTATION</span></span></p>
  </div>
</section>
`;

const MASTER_SERIES_DIRECTORY_HTML = `
<section class="portability-note master-series-directory" id="complete-series-directory" aria-labelledby="master-directory-title">
  <div class="brief-label" id="master-directory-title">COMPLETE 9-ARTICLE SERIES, 1-CALL BRIEFS, MULTI-PART CHUNKS &amp; VERIFICATION URL DIRECTORY</div>
  <h2>Every Article, 1-Call Brief, Lossless Part Chunk &amp; Verification Surface on blayneaina.com</h2>
  <p><strong>Multi-Format Series Publication:</strong> All 9 installments of <em>From Proposal to Consequence: The AINA Transition-Governance Series</em> are published as single-request briefs (<code>/01/brief/</code>..<code>/09/brief/</code>), complete single-page specifications (<code>/01-.../</code>..<code>/09-.../</code>), raw verbatim markdown (<code>/01.md</code>..<code>/09.md</code>), and <strong>${ARTICLES.reduce((acc, a) => acc + (a.parts ? a.parts.length : 0), 0)} modular ~14 KB section parts (<code>/part-1/</code>..<code>/part-N/</code>)</strong>.</p>
  <p><strong>Fast Evaluation &amp; Proof Surfaces:</strong> <a href="/ai-brief/">1-Page Master Brief (<code>/ai-brief/</code>)</a> · <a href="/ai-brief.txt"><code>/ai-brief.txt</code></a> · <a href="/articles/"><code>/articles/</code></a> · <a href="/articles/digest-1/">Digest 1 (<code>/articles/digest-1/</code>)</a> · <a href="/articles/digest-2/">Digest 2 (<code>/articles/digest-2/</code>)</a> · <a href="/articles/digest-3/">Digest 3 (<code>/articles/digest-3/</code>)</a> · <a href="/research-assurance/"><code>/research-assurance/</code></a> · <a href="/refusal-proof/"><code>/refusal-proof/</code></a> · <a href="/semantic-switch-proof/"><code>/semantic-switch-proof/</code></a> · <a href="/llms.txt"><code>/llms.txt</code></a> · <a href="/llms-full.txt"><code>/llms-full.txt</code></a> · <a href="/sitemap/"><code>/sitemap/</code></a> · <a href="/sitemap.txt"><code>/sitemap.txt</code></a> · <a href="https://github.com/SquadForge/blayne.aina" rel="noopener noreferrer">GitHub</a></p>
  <ul class="compact-series-directory">
    ${ARTICLES.map(art => `<li><strong>§${art.num} — <a href="/${art.slug}/">${escapeHtml(art.shortTitle)}</a></strong> (${escapeHtml(art.theme)}): <a href="/${art.num}/brief/">1-Call Brief (<code>https://blayneaina.com/${art.num}/brief/</code>)</a> · <a href="/${art.num}/brief.txt"><code>.txt</code></a> · <a href="/${art.slug}/">Full (<code>https://blayneaina.com/${art.slug}/</code>)</a> · <a href="/${art.num}/"><code>/${art.num}/</code></a> · <a href="/${art.num}.md"><code>/${art.num}.md</code></a> · Lossless Parts: ${(art.parts || []).map(pt => `<a href="${pt.relUrl}">Part ${pt.partNum}/${pt.totalParts}</a> (<a href="/${art.num}/part-${pt.partNum}.txt">.txt</a>)`).join(' · ')}</li>`).join('\n    ')}
  </ul>
</section>
`;

const indexHtmlContent = `
<section class="executive-brief purpose-panel" id="purpose" aria-labelledby="purpose-title">
  <h2 id="purpose-title">1. Purpose, Canonical Definition &amp; Diligence Scope (Zero Job-Seeking · Rust Core / TS Glue)</h2>
  <p class="purpose-grid"><span class="purpose-col"><strong>Who I am &amp; why public:</strong> Blayne Aina — Principal Systems &amp; Data Integrations Architect (11+ yrs enterprise CRM/ETL migrations &amp; production cutovers, U.S. Marine Corps Veteran). Over 14 months of independent R&amp;D (Aug 2025–Oct 2026) directing a 9-IDE AI fleet, I built AINA (Autonomous Intelligent Networked Architecture: deterministic execution-governance runtime <code>squad.exe</code> + verification standard) so systems engineers, formal-verification/security researchers, and R&amp;D funding evaluators can audit the claims offline or in live walkthroughs.</span> <span class="purpose-col"><strong>4 Scope &amp; Diligence Answers:</strong> (1) <em>Windows NT first</em> (<code>CreateProcessW(CREATE_SUSPENDED)</code>, <code>PssCaptureSnapshot</code>, <code>FILE_SHARE_READ</code>, LPAC) proves real kernel confinement on one unforgiving substrate before scoping the Linux Rocky/RHEL 9 port under <code>PRJ-NAVY-01</code> (<code>clone3</code>/<code>pidfd_open</code> pre-exec sync barrier + <code>/proc/&lt;pid&gt;/fd</code>, <code>/proc/&lt;pid&gt;/maps</code> &amp; sealed <code>memfd</code> + <code>Landlock</code>/<code>seccomp-bpf</code>/<code>fexecve</code>); (2) <em>Private runtime vs. public verifier</em>: proprietary Rust source &amp; <code>squad.exe</code> stay private to protect 3 filed USPTO provisionals, while 12 closed schemas, 4 receipts &amp; <code>proof/verify_refusal_proof.py</code> run offline in 10s (live binary walked through under peer review/NDA; TypeScript is minimal glue); (3) <em>1-commit GitHub</em> (<code>github.com/SquadForge/blayne.aina</code>) is a v1.0 release snapshot backed by private 14-month logs; (4) <em>45 conformance vs. 47 faults (§03)</em>: 45 binary end-to-end cases test compound gates while all 47 EISA fault classes are enforced at crate unit level.</span></p>
  <p><strong>Direct Briefs &amp; Evaluation Paths:</strong> Complete 9-article compendium in 1 view at <a href="/ai-brief/"><code>/ai-brief/</code></a> or <a href="/ai-brief.txt"><code>/ai-brief.txt</code></a> · 3-Part Series Digests: <a href="/articles/digest-1/">Digest 1 (§01–§03)</a> · <a href="/articles/digest-2/">Digest 2 (§04–§06)</a> · <a href="/articles/digest-3/">Digest 3 (§07–§09)</a> · <a href="/articles/">Complete Articles &amp; Modular Parts (<code>/articles/</code>)</a> · <a href="/research-assurance/">Research &amp; Assurance Binder (<code>/research-assurance/</code>)</a> · <a href="/refusal-proof/">Offline Refusal Proof (<code>/refusal-proof/</code>)</a> · <a href="/semantic-switch-proof/">Semantic Switch Proof (<code>/semantic-switch-proof/</code>)</a> · <a href="/llms.txt"><code>/llms.txt</code></a> · <a href="/llms-full.txt"><code>/llms-full.txt</code></a> · <a href="/sitemap/"><code>/sitemap/</code></a> · <a href="mailto:me@blayneaina.com">me@blayneaina.com</a>.</p>
</section>

<section class="career-snapshot" id="career-snapshot" aria-labelledby="career-snapshot-title">
  <h2 id="career-snapshot-title">2. Enterprise Track Record (2015–2026) &amp; Four Core Failure Gaps Bound Atomically</h2>
  <p class="career-inline-grid" role="region" aria-label="Enterprise delivery snapshot"><span class="career-row"><strong>2025–2026 (14 Mos) · AINA Architecture (Unfunded Solo · 9-IDE AI Fleet):</strong> Principal Systems Architect — Rust deterministic execution-governance runtime (<code>squad.exe</code>), 45/45 binary conformance gate, public SHA-256 refusal verifier.</span> <span class="career-row"><strong>2022–2025 · Agile Education Marketing:</strong> Enterprise CRM &amp; Integration Architect — HubSpot/Salesforce integration boundaries, automated identity deduplication, hardened ETL pipelines.</span> <span class="career-row"><strong>2019–2022 · DrayMaster Enterprise:</strong> Lead Systems &amp; Data Migration Architect — production migration &amp; rate-engine cutovers across 7 business entities and 800+ freight carriers.</span> <span class="career-row"><strong>Selected Advisory · Photector:</strong> Workflow &amp; state-machine advisor — deterministic transitions &amp; automated photographic intake validation.</span> <span class="career-row"><strong>2015–2018 · Jacuzzi Colorado:</strong> Multi-location Systems &amp; Operations Lead — 6-location infrastructure cutover, 15,000+ SKU POS/ERP sync, operator readiness.</span></p>
  <p class="context-callout genuine-insight"><strong>Why Existing IAM, Workflows, ACID &amp; Guardrails Aren't Enough — 4 Failure Gaps Bound Atomically:</strong> (1) <em>Provenance-to-Mutation Binding (§02+§03)</em>: RBAC allows authorized hallucinated writes; AINA requires server-cut <code>srv_</code>/<code>ev_</code> byte-offset receipts verified via RFC 8785 JCS before admission. (2) <em>Approval-to-Execution Pinning (§07)</em>: HITL approvals suffer spawn TOCTOU; AINA spawns via <code>CreateProcessW(CREATE_SUSPENDED)</code> and audits live PEB &amp; handles (<code>PssCaptureSnapshot</code>) against pinned <code>RequestedAct</code> hash before <code>ResumeThread</code>. (3) <em>OS-Enforced Stale-Worker Fencing (§04+§05)</em>: TTL locks let stalled agents overwrite state; AINA pairs monotonic Room lease generations with kernel <code>FILE_SHARE_READ</code> (<code>ERROR_SHARING_VIOLATION</code>) and SQLite <code>row_version</code> checks at commit. (4) <em>Non-Destructive Forensic Rollback (§06)</em>: SQL rollback erases evidence; Dual-Tier Vaults keep protected baselines untouched while shunting rejected/out-of-band mutations into immutable Amber Quarantine.</p>
</section>

<section class="portability-note formal-confinement" id="formal-confinement" aria-labelledby="formal-confinement-title">
  <h2 id="formal-confinement-title">3. Three-Layer TCB Enforcement, Seven Closed Opcodes, Tiers 1–4, 8 Primitives, 5 Formal Q&amp;As &amp; 3 USPTO Provisionals</h2>
  <p><strong>Three Enforcement Layers &amp; TCB Bounds (§03):</strong> <strong>Layer 1 Pre-Parse (§03.1):</strong> <code>MAX_SUBMISSION_BYTES = 1,048,576</code> (1 MiB), <code>MAX_REQUESTED_ACT_BYTES = 65,536</code>, <code>MAX_EVIDENCE_REF_BYTES = 4,096</code>, <code>MAX_ACTS = 256</code> (<code>1..256</code>), single-stage homogeneity (<code>Fracture</code> vs. <code>Forge</code>), duplicate JSON key rejection (<code>visit_map</code>), non-finite float rejection (<code>visit_f64</code>), trailing matter rejection. <strong>Layer 2 Draft-07 Schema (all 12 schemas in <code>proof/schemas/</code>, recursive <code>additionalProperties: false</code>):</strong> <a href="/proof/schemas/squad.eisa.act_envelope.v1.json"><code>squad.eisa.act_envelope.v1.json</code></a> defines the <strong>7 closed opcodes</strong> (<code>BindEvidenceTag</code>, <code>RequestHumanReview</code>, <code>RejectUnlawfulAct</code>, <code>AssertLayoutRelation</code>, <code>AssertDuplicatePair</code>, <code>AssertTransitiveClosure</code>, <code>ProposePartition</code>) with <code>allOf</code> stage-to-operand closure; integer-only <code>confidence</code> (<code>0..10000</code> bps, zero floats); 15 non-inferential tags; 47 fault codes; RFC 6901 pointer <code>MAX_POINTER_DEPTH = 8</code> (regex <code>^(?:/(?:[^/~\\u0000-\\u001f]|~[01])*){1,8}$</code>) &amp; <code>MAX_POINTER_BYTES = 256</code>; <code>MAX_REASON_CHARS = 1,024</code>; <code>MAX_ID_CHARS = 64</code>; <code>MAX_REFS = 16</code>; <code>MAX_LIST = 1,000</code>; <code>MAX_CHAIN = 4</code> (<code>18/18</code> pos &amp; <code>26/26</code> neg schema/pre-parse tests). <strong>Layer 3 Runtime Four-Gate Machine &amp; NT Kernel Confinement (§03.4–03.5):</strong> <code>MAX_CASE_BYTES = 4,194,304</code> (4 MiB), <code>MAX_CASE_RECORDS = 1,000</code>, <code>MAX_VALUE_CHARS = 1,024</code>, <code>MIN_PHONE_DIGITS = 7</code>; downward Layer <code>0 → 3</code> acyclic DAG; submission-complete counterevidence check (<code>counterevidence_suppressed</code>); simple-path graph walk; Disjoint-Set Union-Find partition cover; <code>CreateProcessW(CREATE_SUSPENDED)</code> + <code>PssCaptureSnapshot</code> (<code>act-pin</code>), <code>FILE_SHARE_READ</code> exclusion, SQLite row-version checks (<code>45/45</code> conformance, <code>20/20</code> evidence, <code>4</code> PCNA receipts).</p>
  <p class="tier-grid" aria-label="Four-tier Constitutional Assurance Continuum"><span class="tier-card"><span class="tier-tag">TIER 1 · REFERENCE</span><strong>Deterministic software chamber</strong><span class="tier-desc">Finite EISA admission, typed leases, monotonic generations, write-denied offline verification.</span></span> <span class="tier-card"><span class="tier-tag">TIER 2 · REFERENCE</span><strong>OS-enforced execution boundary</strong><span class="tier-desc">Windows NT process suspension, handle inspection, file-share exclusion, SQLite row-version checks.</span></span> <span class="tier-card"><span class="tier-tag">TIER 3 · ARCHITECTURE</span><strong>Hardware-separated authority</strong><span class="tier-desc">Trusted execution &amp; hardware-separated standing extend Authority-to-Effect.</span></span> <span class="tier-card"><span class="tier-tag">TIER 4 · ARCHITECTURE</span><strong>FPGA / ASIC execution latch</strong><span class="tier-desc">Proxy Substrate physically interposes actuator authority (architectural continuation, not asserted by public bundle).</span></span></p>
  <p id="primitives-map"><strong>1. Eight Systems-Security Primitives Map:</strong> (1) <em>Stage Zero / A2E</em> = Reference Monitor / Capability Gate (<em>Anderson, 1972</em>); (2) <em>EISA</em> = Finite-State Loop-Free Transition Recognizer (10-key envelope, 7 opcodes, integer bps, zero dynamic codegen); (3) <em>Server-Cut Evidence (<code>srv_</code>/<code>ev_</code>, §02)</em> = Cryptographic Content-Addressed Provenance; (4) <em>Act-Pinning (§07)</em> = TOCTOU Prevention via <code>CREATE_SUSPENDED</code> + <code>PssCaptureSnapshot</code>; (5) <em>Typed Leases &amp; Generations (§05)</em> = Monotonic Fencing Tokens (<em>Kleppmann, 2016</em>) + <code>FILE_SHARE_READ</code> + SQLite <code>WHERE version = expected_v</code>; (6) <em>Amber Quarantine Vault (§06)</em> = Non-Destructive Append-Only Forensics; (7) <em>PCNA</em> = Tamper-Evident Negative Audit Receipt; (8) <em>Semantic Switch &amp; AKO (§03/Prov.#2A)</em> = Lampson Confinement (1973) + Relation-Preserving Pseudonymization via RIDs (<code>20/20</code> blocks, <code>23/23</code> exact native relations).</p>
  <p id="reviewer-qa"><strong>2. Five Formal &amp; Security Reviewer Q&amp;As + OS Portability:</strong> <strong>Q1 (Provably finite-state?):</strong> Yes — 6 explicit bounds (<code>MAX_ACTS=256</code>, fixed-width int/enum domains, <code>MAX_SUBMISSION_BYTES=1,048,576</code> &amp; <code>MAX_POINTER_DEPTH=8</code>, zero backward jumps/loops, zero recursion, zero dynamic codegen). <strong>Q2 (Avoids unconstrained model-judge?):</strong> Relocates verification into deterministic OS kernel primitives + Four-Gate monitor + <code>verify_refusal_proof.py</code> (never relies on neural alignment). <strong>Q3 (Complete mediation?):</strong> Tier 1/2 use OS isolation, Win32 share locks &amp; controller-only DB creds; Tier 4 interposes an FPGA Execution Latch against root-kernel compromise. <strong>Q4 (Offline vs. runtime proof scope?):</strong> <code>verify_refusal_proof.py</code> verifies <code>39/39</code> files against <code>SHA256SUMS.txt</code>, <code>4/4</code> refusal records (3 static fixture SHA-256 chains + 1 absent-preimage), <code>45/45</code>+<code>20/20</code> manifests, and <code>18/18</code> pos + <code>26/26</code> neg Draft-07/pre-parse schema tests across all 12 schemas; Ed25519/TPM 2.0 asymmetric signing (<code>Authenticated PCNA v2</code>) is scoped in <code>PRJ-LC-01</code>. <strong>Q5 (Kinetic corroboration?):</strong> <em>Interface Genesis Seal</em> vs. <em>Stage Zero Kinetic Seal</em> requires hardware-attested primary sensor returns quantized into fixed integers. <strong>OS Portability:</strong> Windows NT primitives (<code>FILE_SHARE_READ</code>, LPAC, Job Objects, <code>CREATE_SUSPENDED</code>+<code>PssCaptureSnapshot</code>) map architecturally to Linux (<code>PRJ-NAVY-01</code>) via userns/seccomp-bpf/Landlock/<code>cgroup.kill</code>, <code>F_OFD_SETLK</code>/fanotify, and a pre-exec sync barrier verifying <code>/proc/&lt;pid&gt;/fd</code>, <code>/proc/&lt;pid&gt;/maps</code> &amp; <code>F_SEAL_WRITE</code>-sealed <code>memfd</code> prior to <code>fexecve</code> — each OS requires its own 45-case conformance battery.</p>
  <p><strong>3. Three Solo-Authored USPTO Provisionals (April–May 2026) &amp; IP Demarcation:</strong> <strong>#1 (Apr 12, 2026):</strong> <em>Autonomous Intelligent Network Architecture Protocol; Systems, Methods, and Computing Architectures for Constitutionally Governed Machine Action, Machine Participation, Machine Encounter, Machine Execution, and Machine Finality Across Multi-Stage Verifiable State-Formation, State-Extraction, and Temporal Defense</em> — Five Mother Centers (<code>EISA</code> Lawful Act, <code>Actor ABI</code> Lawful Actor, <code>Perceptual Closure</code> Lawful Encounter, <code>Machine Force</code> Lawful Execution, <code>Terminal Binding</code> Lawful Finality) + 4-stage Topological Physics Pipeline (<code>Mesh → Fracture → Forge → Shield</code>). <strong>#2 (May 2, 2026 — Single Omnibus Application, Parts 2A &amp; 2B):</strong> <em>Part 2A: AINA Semantic Switch &amp; MX2MX</em> (constitutional domains, typed correspondence, consequence-bearing re-binding, monotonic burden) &amp; <em>Part 2B: AINA Topological Physics Pipeline</em> (candidate-universe sealing, asymmetrical topology adjudication, claim-graph canonical extraction, reversible patch-plan materialization, baseline-state defense, instruction-bundle constraints). <strong>#3 (May 15, 2026):</strong> <em>AINA Authority-to-Effect (A2E) Governance: Layer-Zero Constitutional Transduction</em> (4-Tier Continuum up to FPGA/ASIC Proxy Substrates). 100% solo-authored background IP with zero encumbrances; public research deliverables (<code>EISA</code>/<code>RequestedAct</code>/<code>PCNA</code> schemas, <code>eisa-core</code>, <code>pcna-verifier</code>, <code>eisa-lean4</code>, benchmark datasets) structured for Apache 2.0 / MIT (<a href="mailto:me@blayneaina.com">me@blayneaina.com</a>).</p>
</section>

${REFUSAL_EXHIBIT_HTML}

<p class="portability-note" id="transition-anatomy"><strong>Stale-Worker Fencing (§05), Semantic Switch Alpha (§03), Jan 15 Sovereign Proof Packs &amp; 14-Point FAQ:</strong> <em>Stale Worker:</em> Worker A holds generation 8; paused Worker B submits stale generation 7 → Commit Gate expects 8 and refuses destination mutation (<a href="/05-expiry-is-not-fencing-typed-leases-and-kernel-write-exclusion/">§05</a> · <a href="/proof/refusal/stale-generation.json">stale-generation.json</a>). <em>Semantic Switch Experimental Alpha (<a href="/semantic-switch-proof/">/semantic-switch-proof/</a>):</em> upstream structure-preserving fictionalization keeps native keys and private crosswalk local while reproducing <code>20/20</code> invariance blocks and <code>23/23</code> exact native relations with <code>0</code> external provider calls. <em>Public Release (Jan 15):</em> Standalone HTML + WebAssembly Sovereign Proof Packs launch Jan 15 (3–5 early boundary review slots open via <a href="mailto:me@blayneaina.com?subject=AINA%20Early%20Boundary%20Review">me@blayneaina.com</a>). <em>14-Point Execution Security FAQ:</em> <a href="/09-bring-one-real-boundary-work-with-blayne/#exhibit-9-6">Exhibit 9.6 (§09)</a>.</p>

<section class="commercial-callout" id="research-programme" aria-labelledby="research-programme-title">
  <h2 id="research-programme-title">4. Research &amp; Assurance Programme (5 PRJ Work Packages) &amp; §09 Technical Evaluation Tracks (<a href="/research-assurance/">Full Binder →</a>)</h2>
  <p><strong>Five Non-Overlapping Work Packages (Built Baseline → Proposed Foreground Scope):</strong> <strong><code>PRJ-TW-01</code> (Assurance Initiative):</strong> solo Windows NT <code>squad.exe</code> + 9-part spec + proof pack → launch public-benefit AINA Assurance Initiative, hire <code>2.5 FTE</code> kernel/security engineers, commission 2 external lab audits, publish cross-framework <code>A2E</code> adapters. <strong><code>PRJ-LC-01</code> (Open Verifier &amp; Audit):</strong> Python verifier + 12 closed schemas + 4 <code>PCNA</code> receipts → open-source <code>eisa-core</code>/<code>pcna-verifier</code>, add Ed25519/TPM 2.0 asymmetric signing (<code>Authenticated PCNA v2</code>), publish unedited third-party security audit. <strong><code>PRJ-CG-02</code> (Empirical AI Control):</strong> 45-case conformance + 20-case evidence NT suites → 250-case multi-model benchmark comparing standard OS permissions, frontier LLM-as-judge monitors &amp; deterministic <code>A2E</code> across collusion (<code>consensusIdentity</code>), tool manipulation &amp; TOCTOU. <strong><code>PRJ-TAIF-01</code> (Formal Semantics):</strong> 7-opcode <code>EISA</code> + 6 finiteness bounds + 47 fault codes + <code>result_read_only</code> spec (§07) → Lean 4 mechanization (<code>eisa-lean4</code>) + 10,000-trial mid-commit crash-injection benchmark. <strong><code>PRJ-NAVY-01</code> (Linux OS Hardening):</strong> NT <code>CREATE_SUSPENDED</code>+<code>PssCaptureSnapshot</code> confinement → <code>AINA-LinuxHardener</code> automated RPM/ELF/module inventory &amp; debloating, <code>Landlock</code>/<code>seccomp-bpf</code> synthesis, Linux Pre-Execution Authorization Barrier, deterministic ROS 2 Humble regression testing &amp; scoped <code>PCNA</code> receipts on Rocky Linux 9 / RHEL 9.</p>
  <p><strong>§09 Technical Peer Review &amp; R&amp;D Evaluation Tracks (<a href="/09-bring-one-real-boundary-work-with-blayne/">Explore §09</a> · <a href="/refusal-proof/">Inspect Proof Pack</a> · <a href="mailto:me@blayneaina.com?subject=[RESEARCH]%20Technical%20Peer%20Review%20%2F%20R%26D%20Evaluation">me@blayneaina.com</a>):</strong> <strong>Track 1 (AI Workflow Standing &amp; Confinement):</strong> sealed wake authority, typed leases, monotonic generation fencing, guarded replacement, controller-fixed <code>RequestedAct</code>, fenced SQLite execution, original-vs-successor receipts, scoped break-glass. <strong>Track 2 (Zero-Trust Document, Citation &amp; EISA Adjudication):</strong> LPAC-confined parsing, explicit omission surfaces, committed views, server-cut <code>ev_</code> citations, bounded absence proofs, deterministic Four-Gate verdicts. <strong>Track 3 (Protected Computation &amp; Entity Resolution):</strong> Semantic Switch fictionalization (keeping native rows/crosswalk local) → qBlock/Qdrant Edge block nomination → EISA Fracture (with preserved dissent) → EISA Forge canonical provenance → local exact restoration → Shield forward-only dispositions.</p>
</section>

<section id="series-index" aria-labelledby="series-index-title">
  <h2 id="series-index-title">5. Complete Nine-Article Series (§01–§09): Problems, Proofs, Sections, Claim Cards &amp; Lossless Chunks</h2>
  <ul class="articles-grid">
${ARTICLES.map(art => {
  const brief = EXECUTIVE_BRIEFS[art.slug] || {};
  const claimMeta = getArticleClaimSummaryFromMd(art);
  const parts = art.parts || [];
  const partLinks = parts.map(pt => `<a href="${pt.relUrl}">P${pt.partNum}</a>`).join(' ');
  return `    <li class="article-card"><span class="card-header"><span class="card-num">§${art.num}</span> <span class="card-theme">${escapeHtml(art.theme)}</span></span> <span class="card-title"><a href="/${art.slug}/"><strong>§${art.num} — ${escapeHtml(art.shortTitle)}</strong></a></span> <span class="card-brief"><strong>Problem:</strong> ${escapeHtml(brief.problem)} <strong>Proves:</strong> ${escapeHtml(brief.proof)}</span> <span class="card-sections"><strong>Key Sections:</strong> ${escapeHtml(claimMeta.sectionsSummary)}${claimMeta.claimSnippet ? ` · <strong>Claim Card:</strong> ${escapeHtml(claimMeta.claimSnippet)}` : ''}</span> <span class="card-links"><strong>Read:</strong> <a href="/${art.num}/brief/">Brief /${art.num}/brief/</a> (<a href="/${art.num}/brief.txt">.txt</a>) · <a href="/${art.slug}/">Full</a> · <a href="/${art.num}.md">/${art.num}.md</a> · Parts (${parts.length}): ${partLinks}</span></li>`;
}).join('\n')}
  </ul>
</section>
`;

const homeJsonLdHtml = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://blayneaina.com/#website",
      "url": "https://blayneaina.com/",
      "name": "Blayne Aina — The Route to Trusting AI",
      "description": "Category-defining architecture for autonomous enterprise AI transition governance, deterministic execution, and verifiable refusal receipts.",
      "inLanguage": "en-US",
      "publisher": {
        "@id": "https://blayneaina.com/#blayne-aina"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://blayneaina.com/#webpage",
      "url": "https://blayneaina.com/",
      "name": "The Route to Trusting AI — Architecture, Grounding, and Operational Invariants | Blayne Aina",
      "isPartOf": {
        "@id": "https://blayneaina.com/#website"
      },
      "about": {
        "@id": "https://blayneaina.com/#blayne-aina"
      },
      "mainEntity": {
        "@id": "https://blayneaina.com/#blayne-aina"
      }
    },
    {
      "@type": "Person",
      "@id": "https://blayneaina.com/#blayne-aina",
      "name": "Blayne Aina",
      "url": "https://blayneaina.com/",
      "email": "mailto:me@blayneaina.com",
      "jobTitle": "Principal Systems Architect & Creator of AINA",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Denver",
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://github.com/SquadForge/blayne.aina"
      ]
    },
    {
      "@type": "CreativeWorkSeries",
      "@id": "https://blayneaina.com/#series",
      "name": "From Proposal to Consequence: The AINA Transition-Governance Series",
      "url": "https://blayneaina.com/",
      "author": {
        "@id": "https://blayneaina.com/#blayne-aina"
      },
      "hasPart": [
        ${ARTICLES.map((art, i) => JSON.stringify({
          "@type": "TechArticle",
          "@id": `https://blayneaina.com/${art.slug}/#article`,
          "position": i + 1,
          "name": `§${art.num}: ${art.shortTitle}`,
          "url": `https://blayneaina.com/${art.slug}/`
        })).join(',\n        ')},
        {
          "@type": "TechArticle",
          "@id": "https://blayneaina.com/refusal-proof/#article",
          "name": "Refusal & Unchanged-Destination Proof",
          "url": "https://blayneaina.com/refusal-proof/"
        },
        {
          "@type": "TechArticle",
          "@id": "https://blayneaina.com/semantic-switch-proof/#article",
          "name": "Semantic Switch: Experimental Alpha Invariance Testbed",
          "url": "https://blayneaina.com/semantic-switch-proof/"
        }
      ]
    }
  ]
}
</script>`;

const homeHtml = generateHtml({
  title: "The Route to Trusting AI — Architecture, Grounding, and Operational Invariants",
  subtitle: "Category-defining architecture for autonomous enterprise AI transition governance.",
  contentHtml: indexHtmlContent,
  currentSlug: '',
  isHome: true,
  pageHeroHtml: homeHeroHtml,
  jsonLdHtml: homeJsonLdHtml
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
  <p>In Butler Lampson's classic formulation of the <strong>Confinement Problem</strong> (<em>Communications of the ACM</em>, 1973), confining an untrusted program requires four strict invariants: <strong>Total Isolation</strong>, <strong>Transitivity</strong>, <strong>Masking</strong> (controlling inputs to legitimate and covert channels), and <strong>Enforcement</strong> (trapping escape or probing attempts).</p>
  <p>Passing raw enterprise, medical, or classified entity graphs into an external LLM or third-party embedding API violates Lampson's first two laws immediately: the external model becomes a transitive leakage channel. <strong>AINA's Semantic Switch (<code>Provisional #2A</code>)</strong> enforces confinement <em>upstream</em> of the model through a <strong>Fiction-First Pipeline</strong> paired with <strong>MX2MX Sovereign Boundary Governance</strong>:</p>
  <table>
    <thead><tr><th scope="col">Confinement &amp; Multi-Agent Problem</th><th scope="col">Classical Failure Mode in Standard AI Pipelines</th><th scope="col">AINA Semantic Switch &amp; MX2MX Mechanism (<code>Provisional #2A</code>)</th></tr></thead>
    <tbody>
      <tr><td><strong>1. Transitive Leakage to External Models &amp; Vector DBs</strong> (Lampson Laws 1 &amp; 2: <em>Isolation &amp; Transitivity</em>)</td><td>Raw PII, proprietary schemas, or operational graphs are sent to external LLM APIs or stored as inverted embeddings in vector databases where they can be reconstructed.</td><td><strong>Fiction-First Pipeline &amp; Chartered Target Fiction Domains (<code>DomainCharterObject</code>):</strong> Protected reality is never transmitted to an untrusted model. The Semantic Switch projects permitted structural relations into a chartered synthetic target domain using deterministic Relation IDs (<code>RIDs</code>) while preserving graph isomorphism (<code>20/20</code> invariance blocks and <code>23/23</code> exact relations verified below).</td></tr>
      <tr><td><strong>2. Covert Channels, Timing Side-Channels &amp; Active Probing</strong> (Lampson Laws 3 &amp; 4: <em>Masking &amp; Enforcement</em>)</td><td>An adversarial or jailbroken agent probes restricted graph edges and infers redacted facts from error diffs, latency variations, or partial query returns.</td><td><strong>Constant-Time Anti-Knowledge Oracle (<code>AKO</code>) &amp; Honeypot Traps:</strong> Forbidden relation classes are severed into a <code>SeveranceAntiKnowledgeObject</code> governed by an active <strong>Anti-Knowledge Oracle (<code>AKO</code>)</strong>. To close oracle lookup-timing side channels under a bounded query budget, <code>AKO</code> evaluates batch admissibility in constant time (<code>O(1)</code> Bloom-filter + fixed-cycle lookup) with uniform refusal envelopes, and plants <strong>Anti-Knowledge Honeypots</strong> that immediately trap and revoke standing when an agent probes a forbidden relation path.</td></tr>
      <tr><td><strong>3. Exfiltration of Context Windows or Vector Stores</strong></td><td>If an attacker dumps the prompt cache or vector database, they obtain actionable real-world records.</td><td><strong>Constitutional Inertness &amp; Coupled Dual-Ledger State Machine:</strong> Semantic projection (<code>Correspondence Ledger</code>) is decoupled from execution authority (<code>Standing Ledger</code>). Without a live, hardware/kernel-bound <code>Standing Ledger</code> token, exfiltrated fiction-domain tokens are <strong>constitutionally inert</strong> and carry zero authority to mutate protected state.</td></tr>
      <tr><td><strong>4. Cross-Domain Admissibility Across Competing Organizations</strong></td><td>Independent organizations, coalitions, or jurisdictions cannot share a single global database schema or trust boundary.</td><td><strong><code>MX2MX</code> Sovereign Treaties &amp; Monotonic Burden Accumulator (<code>MBA</code>):</strong> Each organization operates inside its own sovereign chartered domain. When machine consequence crosses a boundary, <code>MX2MX</code> executes <strong>Dual Constitutional Re-binding</strong> under a cryptographic <code>TreatyObject</code> where authority strictly contracts (<code>Sₙ₊₁ = Sₙ ∩ S_destination</code>) and verification obligations accumulate monotonically (<code>Bₙ₊₁ = Bₙ ∪ B_new</code>).</td></tr>
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
const semanticSwitchJsonLdHtml = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/semantic-switch-proof/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/semantic-switch-proof/"
      },
      "headline": "Semantic Switch: Experimental Alpha Invariance Testbed",
      "description": "Stage-zero synthetic fixtures and reproducible structural-isomorphism checks for Butler Lampson confinement and protected entity-resolution computation.",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-10-31T08:00:00-06:00",
      "dateModified": "2026-11-09T09:00:00-07:00",
      "author": {
        "@type": "Person",
        "@id": "https://blayneaina.com/#blayne-aina",
        "name": "Blayne Aina",
        "url": "https://blayneaina.com/"
      },
      "publisher": {
        "@type": "Person",
        "@id": "https://blayneaina.com/#blayne-aina",
        "name": "Blayne Aina",
        "url": "https://blayneaina.com/"
      },
      "isPartOf": {
        "@type": "CreativeWorkSeries",
        "@id": "https://blayneaina.com/#series",
        "name": "From Proposal to Consequence: The AINA Transition-Governance Series",
        "url": "https://blayneaina.com/"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/semantic-switch-proof/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Architecture",
          "item": "https://blayneaina.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Semantic Switch: Experimental Alpha Invariance Testbed",
          "item": "https://blayneaina.com/semantic-switch-proof/"
        }
      ]
    }
  ]
}
</script>`;

const proofHtml = generateHtml({
  title: "Semantic Switch: Experimental Alpha Invariance Testbed",
  subtitle: "Stage-zero synthetic fixtures and reproducible structural-isomorphism checks—not a production anonymization or entity-resolution accuracy claim.",
  contentHtml: proofHtmlContent,
  currentSlug: "semantic-switch-proof",
  pageHeroHtml: semanticHeroHtml,
  jsonLdHtml: semanticSwitchJsonLdHtml
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
  <h2 id="verifier-regress-title">Three-Layer Enforcement &amp; Minimal TCB Verification Architecture</h2>
  <p>AINA deliberately does not rely on proving the general internal safety or alignment of an opaque neural network. Instead, it treats the model as an untrusted proposal generator, strips it of direct actuation standing, and <strong>relocates transition admission into a minimal, explicitly bounded Trusted Computing Base (TCB) at the Authority-to-Effect (<code>A2E</code>) boundary</strong> across three distinct enforcement layers:</p>
  <ul>
    <li><strong>Layer 1 — Pre-Parse Stream &amp; Deserializer Bounds (§03.1):</strong> Enforces byte-length ceilings before AST allocation (<code>MAX_SUBMISSION_BYTES = 1,048,576</code>, <code>MAX_REQUESTED_ACT_BYTES = 65,536</code>, <code>MAX_EVIDENCE_REF_BYTES = 4,096</code>), bounds submissions to <code>1..256</code> acts (<code>MAX_ACTS = 256</code>) of a single stage family (<code>Fracture</code> or <code>Forge</code>), and rejects duplicate JSON keys (<code>visit_map</code>), non-finite numbers (<code>visit_f64</code>), and trailing matter.</li>
    <li><strong>Layer 2 — Recursive Draft-07 JSON Schema &amp; Closed 7-Opcode Validation (<a href="/proof/schemas/squad.eisa.act_envelope.v1.json"><code>squad.eisa.act_envelope.v1.json</code></a>):</strong> Enforces recursive <code>additionalProperties: false</code> closure across all 12 schemas; binds each of the <strong>7 closed opcodes</strong> (<code>BindEvidenceTag</code>, <code>RequestHumanReview</code>, <code>RejectUnlawfulAct</code>, <code>AssertLayoutRelation</code>, <code>AssertDuplicatePair</code>, <code>AssertTransitiveClosure</code>, <code>ProposePartition</code>) to its admitted stage and closed operand schema; restricts audit-only <code>confidence</code> to integer basis points (<code>0..10000</code>, zero floats); enforces the 15 non-inferential evidence tags and 47 registered fault codes; and enforces RFC 6901 pointer depth <code>MAX_POINTER_DEPTH = 8</code> (regex <code>^(?:/(?:[^/~\\u0000-\\u001f]|~[01])*){1,8}$</code>) and <code>MAX_POINTER_BYTES = 256</code>.</li>
    <li><strong>Layer 3 — Runtime Four-Gate Verdict Machine &amp; OS Kernel Confinement (§03.4–03.5, §05, §07):</strong> Enforces <code>MAX_CASE_BYTES = 4,194,304</code>, <code>MAX_CASE_RECORDS = 1,000</code>, <code>MAX_VALUE_CHARS = 1,024</code>, and <code>MIN_PHONE_DIGITS = 7</code> over sealed <code>eisacase_&lt;32hex&gt;</code> substrates; executes downward acyclic DAG resolution, submission-complete counterevidence checks (<code>counterevidence_suppressed</code>), simple-path graph walks, and Disjoint-Set Union-Find partition verification; and binds approved transitions to Windows NT kernel process suspension (<code>CreateProcessW(CREATE_SUSPENDED)</code> + <code>PssCaptureSnapshot</code>), file-share write exclusion, and SQLite row-version checks.</li>
    <li><strong>Exact Scope of <code>verify_refusal_proof.py</code> vs. Next-Stage <code>Authenticated PCNA v2</code>:</strong> Running <code>python3 proof/verify_refusal_proof.py</code> verifies three offline properties: (1) <code>39/39</code> published files match <code>SHA256SUMS.txt</code>; (2) the <code>4/4</code> refusal records (<code>3</code> static fixture SHA-256 invariance chains + <code>1</code> absent-preimage stale-generation refusal) and the <code>45/45</code> conformance and <code>20/20</code> evidence manifests are internally consistent; and (3) all <code>12</code> public JSON schemas pass recursive <code>additionalProperties: false</code> closure plus <code>18/18</code> positive and <code>26/26</code> negative Draft-07 and pre-parse bound tests. It does not by itself execute the private <code>squad.exe</code> binary or verify a hardware-rooted cryptographic signature authenticating receipt origin—capabilities explicitly scoped under <strong>Authenticated <code>PCNA</code> v2</strong> (<code>PRJ-LC-01</code>) and live evaluation sessions (<a href="mailto:me@blayneaina.com">me@blayneaina.com</a>).</li>
  </ul>
</section>

${REFUSAL_EXHIBIT_HTML}

<div class="proof-overview">
  <h2>Reproduce the verification offline</h2>
  <p>Download the bundle and run the zero-dependency Python 3 verifier from its root. It recomputes all three digest chains, validates the stale-generation reason-only case, checks all 45 fresh cases and 20 evidence cases, runs the 18-positive / 26-negative Draft-07 and pre-parse bound test suite across all 12 schemas, and verifies the 39-file SHA-256 integrity manifest.</p>
  <pre><code>python verify_refusal_proof.py</code></pre>
  <div class="proof-actions">
    <a href="/proof/aina-refusal-proof-pack-v1.zip" class="btn-primary">Download complete bundle (.zip)</a>
    <a href="/proof/README.md" class="btn-secondary" rel="nofollow">Schemas &amp; verifier guide</a>
    <a href="https://github.com/SquadForge/blayne.aina" class="btn-secondary" rel="noopener noreferrer">Browse public proof repository</a>
    <a href="/proof/verify_refusal_proof.py" class="btn-secondary" rel="nofollow">verify_refusal_proof.py</a>
    <a href="/proof/SHA256SUMS.txt" class="btn-secondary" rel="nofollow">SHA256SUMS.txt</a>
  </div>
</div>

<h2 id="artifact-inventory">Artifact inventory</h2>
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
PASS: 12 public-safe schema declarations (recursive additionalProperties closure verified; 18/18 positive &amp; 26/26 negative Draft-07 + pre-parse bound tests passed)
PASS: 39 files match SHA256SUMS.txt
PASS: no local paths or private key material detected

All refusal, fixture, schema, conformance, integrity, and sanitization checks passed.</code></pre>
  <p><a href="/proof/verifier_stdout_transcript.txt" rel="nofollow">Download the raw stdout transcript</a> · <a href="/proof/one_line_verify_commands.md" rel="nofollow">Open one-line verification commands</a></p>
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
  <p>This package provides real deterministic refusal receipts, 45-case conformance vectors, public schema contracts, and offline cryptographic verification scripts. To protect core intellectual property developed over 14 months, the proprietary <code>squad.exe</code> / <code>squad-connector</code> Rust source code and executable binaries are not published in the public repository; they are demonstrated live during technical peer review and R&amp;D due diligence or provided in a sanitized evaluation build under mutual NDA. TypeScript is used only as minimal glue; the public JavaScript and Python files are website-build and verification tooling, not the runtime implementation.</p>
  <p>The 45-case gate is author-controlled release qualification against declared vectors in isolated fixtures. It is not independent third-party certification, formal proof of the whole system, evidence of customer production deployment, or a claim that every refusal produces a destination digest pair.</p>
</aside>
`;

const refusalProofJsonLdHtml = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      "@id": "https://blayneaina.com/refusal-proof/#article",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://blayneaina.com/refusal-proof/"
      },
      "headline": "Refusal & Unchanged-Destination Proof",
      "description": "Real blocked mutations, deterministic non-action receipts, and independently recomputed SHA-256 destination invariance across 45 candidate conformance cases.",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "datePublished": "2026-11-01T08:00:00-06:00",
      "dateModified": "2026-11-09T09:00:00-07:00",
      "author": {
        "@type": "Person",
        "@id": "https://blayneaina.com/#blayne-aina",
        "name": "Blayne Aina",
        "url": "https://blayneaina.com/"
      },
      "publisher": {
        "@type": "Person",
        "@id": "https://blayneaina.com/#blayne-aina",
        "name": "Blayne Aina",
        "url": "https://blayneaina.com/"
      },
      "isPartOf": {
        "@type": "CreativeWorkSeries",
        "@id": "https://blayneaina.com/#series",
        "name": "From Proposal to Consequence: The AINA Transition-Governance Series",
        "url": "https://blayneaina.com/"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://blayneaina.com/refusal-proof/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Architecture",
          "item": "https://blayneaina.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Refusal & Unchanged-Destination Proof",
          "item": "https://blayneaina.com/refusal-proof/"
        }
      ]
    }
  ]
}
</script>`;

const refusalProofHtml = generateHtml({
  title: "Refusal & Unchanged-Destination Proof",
  subtitle: "Real blocked mutations, deterministic non-action receipts, and independently recomputed destination invariance.",
  contentHtml: refusalProofHtmlContent,
  currentSlug: "refusal-proof",
  pageHeroHtml: refusalHeroHtml,
  jsonLdHtml: refusalProofJsonLdHtml
});
const refusalProofPageDir = path.join(DIST_DIR, 'refusal-proof');
fs.mkdirSync(refusalProofPageDir, { recursive: true });
fs.writeFileSync(path.join(refusalProofPageDir, 'index.html'), refusalProofHtml, 'utf8');
console.log('✓ Published Refusal & Conformance proof pack');

const researchAssuranceHeroHtml = `
<section class="series-hero" aria-labelledby="research-assurance-title">
  <div class="hero-kicker"><span class="kicker-dot"></span><span>AINA RESEARCH &amp; ASSURANCE INITIATIVE · INDEPENDENT DUE-DILIGENCE BINDER</span></div>
  <h1 class="series-title" id="research-assurance-title">AINA Research &amp; Assurance Programme</h1>
  <p class="series-subtitle"><strong>AINA is a deterministic authority-enforcement architecture that treats probabilistic AI outputs as untrusted proposals. It independently validates evidence, authorization, execution identity, and permitted state transitions at the boundary where external effects are committed, producing independently verifiable evidence when an attempted operation is refused.</strong></p>
  <div class="hero-actions">
    <a href="/refusal-proof/" class="btn-primary">Run Offline Refusal Verifier (<10s)</a>
    <a href="https://github.com/SquadForge/blayne.aina" class="btn-secondary" rel="noopener noreferrer">Public Proof Repository</a>
    <a href="mailto:me@blayneaina.com?subject=[RESEARCH]%20AINA%20Assurance%20Evaluation" class="btn-secondary">Contact PI: me@blayneaina.com</a>
  </div>
</section>
`;

const researchAssuranceHtmlContent = `
<section class="portability-note" id="security-problem">
  <h2>1. The Specific Security Problem: Why Probabilistic Guardrails Cannot Govern Consequence</h2>
  <p>As autonomous AI systems gain direct access to operating systems, databases, code execution, and cyber-physical actuators, four structural failure gaps emerge at the boundary between a model's output and an external state mutation:</p>
  <ol>
    <li><strong>Untrusted Proposals &amp; Model-Monitor Failure Modes:</strong> Prompt instructions, RLHF, and secondary LLM-as-judge monitors operate over probabilistic token sequences. AINA deliberately does not rely on proving the general internal safety or alignment of an opaque neural network; instead, it restricts which externally observable operations can be authorized and checks the admissibility conditions for those operations inside a minimal, deterministic Trusted Computing Base (TCB).</li>
    <li><strong>Multi-Agent Sycophancy &amp; Echo-Chamber Quorum Laundering:</strong> Multiple agent instances can converge on a hallucinated or adversarial action without independent primary-source evidence.</li>
    <li><strong>Approval-to-Execution (TOCTOU) Substitution:</strong> Between asynchronous human or policy approval and actual OS process execution, command-line arguments, environment blocks, target files, or inherited kernel handles can be substituted.</li>
    <li><strong>Stale-Worker Overwrites &amp; Unverifiable Rollbacks:</strong> Delayed workers holding expired clock-based TTL locks can overwrite newer state upon waking, and ordinary application logs rarely provide cryptographic proof that a refused attempt left the target resource untouched.</li>
  </ol>
</section>

<section class="portability-note" id="a2e-architecture">
  <h2>2. The Authority-to-Effect (<code>A2E</code>) Architecture &amp; Three Enforcement Layers</h2>
  <p>AINA interposes a deterministic reference monitor at the commit boundary across four composable mechanisms and three explicit enforcement layers:</p>
  <ul>
    <li><strong>Evidence Instruction Set Architecture (<code>EISA</code> — Seven Closed Opcodes):</strong> Every proposed action must compile into a closed 10-key envelope (<a href="/proof/schemas/squad.eisa.act_envelope.v1.json"><code>squad.eisa.act_envelope.v1.json</code></a>) restricted to <strong>seven closed opcodes</strong> across four acyclic layers: <code>BindEvidenceTag</code> (Layer 0, <code>Fracture</code>), <code>RequestHumanReview</code> (Layer 0, <code>Fracture</code>), <code>RejectUnlawfulAct</code> (Layer 0, <code>Fracture</code>), <code>AssertLayoutRelation</code> (Layer 0, <code>Forge</code>), <code>AssertDuplicatePair</code> (Layer 1, <code>Fracture</code>), <code>AssertTransitiveClosure</code> (Layer 2, <code>Fracture</code>), and <code>ProposePartition</code> (Layer 3, <code>Fracture</code>).</li>
    <li><strong>Three Explicit Enforcement Layers:</strong>
      <ol>
        <li><strong>Layer 1 (Pre-Parse &amp; Deserializer Boundary):</strong> Enforces byte caps (<code>MAX_SUBMISSION_BYTES = 1,048,576</code>, <code>MAX_REQUESTED_ACT_BYTES = 65,536</code>, <code>MAX_EVIDENCE_REF_BYTES = 4,096</code>), <code>MAX_ACTS = 256</code>, single-stage submission homogeneity, duplicate JSON key rejection (<code>visit_map</code>), and non-finite number rejection (<code>visit_f64</code>) before AST allocation.</li>
        <li><strong>Layer 2 (Recursive Draft-07 JSON Schema Validation):</strong> Enforces recursive <code>additionalProperties: false</code> closure across all 12 schemas, <code>allOf</code> opcode-to-stage-to-operands binding, integer-only <code>confidence</code> basis points (<code>0..10000</code>, zero floats), 15 non-inferential evidence tags, 47 registered fault codes, RFC 6901 pointer depth <code>MAX_POINTER_DEPTH = 8</code> (regex <code>^(?:/(?:[^/~\\u0000-\\u001f]|~[01])*){1,8}$</code>) and <code>MAX_POINTER_BYTES = 256</code>, <code>MAX_REASON_CHARS = 1,024</code>, <code>MAX_ID_CHARS = 64</code>, <code>MAX_REFS = 16</code>, <code>MAX_LIST = 1,000</code>, and <code>MAX_CHAIN = 4</code>.</li>
        <li><strong>Layer 3 (Runtime Four-Gate Verdict Machine &amp; OS Kernel Confinement):</strong> Enforces <code>MAX_CASE_BYTES = 4,194,304</code>, <code>MAX_CASE_RECORDS = 1,000</code>, <code>MAX_VALUE_CHARS = 1,024</code>, and <code>MIN_PHONE_DIGITS = 7</code> over sealed <code>eisacase_&lt;32hex&gt;</code> substrates; acyclic Layer <code>0 → 3</code> DAG resolution; <code>counterevidence_suppressed</code> scanning; Disjoint-Set Union-Find partition verification; and Windows NT kernel process/handle confinement.</li>
      </ol>
    </li>
    <li><strong>Server-Cut Provenance (<code>srv_</code>/<code>ev_</code>) &amp; Sycophancy Collapse (<code>consensusIdentity</code>):</strong> Requires controller-computed SHA-256 digests and exact 64-bit integer byte-offset spans (<a href="/proof/schemas/squad.evidence_ref.v1.json"><code>squad.evidence_ref.v1.json</code></a>) prior to admission, collapsing correlated agent claims lacking independent source spans.</li>
    <li><strong>Approval-to-Execution Act-Pinning (<code>act-pin</code>) &amp; Monotonic Lease Fencing:</strong> Binds a controller-fixed <a href="/proof/schemas/squad.requested_act.v1.json"><code>RequestedAct</code></a> digest to the OS worker process instance across spawn and enforces monotonic integer generation fencing at commit time.</li>
    <li><strong>Proof-Carrying Non-Action (<code>PCNA</code>):</strong> Emits canonical JSON refusal receipts binding the refusal fault code to pre-attempt and post-refusal SHA-256 digests of the measured target resource.</li>
  </ul>
</section>

<section class="portability-note" id="baseline-vs-proposed">
  <h2>3. Existing Baseline vs. Proposed Research &amp; Engineering Capabilities</h2>
  <table>
    <thead><tr><th scope="col">Capability Domain</th><th scope="col">Completed Baseline (Built &amp; Inspectable Today)</th><th scope="col">Proposed Funded R&amp;D (Foreground Work — Not Claimed as Built Today)</th></tr></thead>
    <tbody>
      <tr><td><strong>OS Reference Monitor &amp; Act-Pinning</strong></td><td><strong>Windows NT reference runtime (<code>squad.exe</code>):</strong> 56.2 MB Rust supervisor enforcing <code>CreateProcessW(CREATE_SUSPENDED)</code> + <code>PssCaptureSnapshot</code> pre-resume inspection, Win32 share-mode write exclusion, and SQLite row-version checks; passes <code>45/45</code> author-controlled isolated conformance cases and <code>20/20</code> server-cut evidence cases.</td><td><strong>Linux Pre-Execution Authorization Barrier &amp; Automated OS Hardening (<code>AINA-LinuxHardener</code> — <code>PRJ-NAVY-01</code>):</strong> Pairing <code>clone3(CLONE_PIDFD)</code> with a pre-execution synchronization barrier that verifies <code>/proc/&lt;pid&gt;/fd</code>, <code>/proc/&lt;pid&gt;/maps</code>, cgroup v2 membership, and an <code>F_SEAL_WRITE</code>-sealed <code>memfd</code> executable digest prior to applying <code>Landlock</code> LSM / <code>seccomp-bpf</code> and invoking <code>fexecve()</code>, demonstrated on <strong>Rocky Linux 9 / RHEL 9 + containerized ROS 2 Humble</strong>.</td></tr>
      <tr><td><strong>Refusal &amp; Schema Verification (<code>PCNA</code>)</strong></td><td><strong>Offline Refusal-Bundle &amp; Schema Verifier (<code>proof/verify_refusal_proof.py</code>):</strong> Zero-dependency Python 3 script verifying (1) <code>39/39</code> files against <code>SHA256SUMS.txt</code>, (2) <code>3</code> static fixture SHA-256 invariance chains (<code>pre_sha256 == post_sha256</code>) + <code>1</code> absent-preimage stale-generation refusal, and (3) recursive <code>additionalProperties: false</code> closure + <code>18/18</code> positive and <code>26/26</code> negative Draft-07 and pre-parse bound tests across all <code>12</code> schemas.</td><td><strong>Authenticated <code>PCNA</code> v2 &amp; External Security Assessment (<code>PRJ-LC-01</code>):</strong> Adding Ed25519 / hardware-backed TPM 2.0 asymmetric receipt signing, monotonic supervisor counter binding, and commissioning an independent third-party security audit of the runtime and verification package.</td></tr>
      <tr><td><strong>Formal Methods &amp; Crash Recovery</strong></td><td><strong>Closed <code>EISA</code> JSON Schema &amp; Runtime Recognizer:</strong> 6 structural finiteness bounds, 7 closed opcodes, and 47 fault codes enforced across pre-parse, Draft-07 schema, and Rust recognizer layers.</td><td><strong>Mechanized Lean 4 Semantics (<code>eisa-lean4</code>) &amp; Crash-Recovery Benchmark (<code>PRJ-TAIF-01</code>):</strong> Machine-checked Lean 4 termination and verdict-uniqueness proofs across all 7 opcodes and 47 fault classes + a 10,000-trial mid-commit crash-injection benchmark for <code>result_read_only</code> successor grants (<code>satisfies_original_return: false</code>).</td></tr>
      <tr><td><strong>Empirical AI-Control Benchmarking</strong></td><td><strong>45-case conformance &amp; 20-case evidence battery:</strong> Author-controlled release qualification in isolated Windows NT fixtures.</td><td><strong>250-Case Multi-Model AI-Control Comparison Study (<code>PRJ-CG-02</code>):</strong> Controlled empirical comparison of (1) standard OS permissions, (2) frontier LLM-as-judge monitors, and (3) deterministic <code>A2E</code> enforcement across multi-agent collusion, tool manipulation, and TOCTOU races.</td></tr>
      <tr><td><strong>Hardware Actuation Interlock</strong></td><td><strong>Tier 1/2 Software/OS Reference Implementation</strong> + USPTO Provisional #3 architectural specification.</td><td><strong>Tier 4 FPGA Proxy Substrate &amp; Execution Latch Benchtop Demonstrator:</strong> Physical RTL / FPGA hardware bus-gating prototype for edge actuators.</td></tr>
    </tbody>
  </table>
</section>

<section class="portability-note" id="reproducible-evidence">
  <h2>4. Publicly Reproducible Evidence &amp; Exact Claim Ceiling</h2>
  <p>Anyone can verify the public evidence bundle offline in under 10 seconds with Python 3 and zero external dependencies:</p>
  <pre><code>git clone https://github.com/SquadForge/blayne.aina.git
cd blayne.aina
python3 proof/verify_refusal_proof.py</code></pre>
  <p><strong>What <code>verify_refusal_proof.py</code> proves today (Three-Part Offline Verification):</strong> (1) <strong>Manifest Integrity:</strong> All <code>39</code> published files match their SHA-256 digests in <code>SHA256SUMS.txt</code>; (2) <strong>Fixture &amp; Conformance Consistency:</strong> The <code>3</code> fixture-backed refusal records (<code>evidence-selector.json</code>, <code>unleased-write.json</code>, <code>act-pinning.json</code>) match the exact SHA-256 digests and byte lengths of the preserved static fixtures in <code>proof/refusal/fixtures/</code>, <code>stale-generation.json</code> records an absent preimage, and the <code>45/45</code> conformance and <code>20/20</code> evidence manifests match candidate attestation; and (3) <strong>Recursive Schema &amp; Pre-Parse Bound Validation:</strong> All <code>12</code> public JSON schemas pass recursive <code>additionalProperties: false</code> closure plus <code>18/18</code> positive and <code>26/26</code> negative Draft-07 and pre-parse bound tests across all 7 <code>EISA</code> opcodes. <strong>What it does not claim by itself:</strong> It does not by itself prove independent third-party execution of the private <code>squad.exe</code> binary or verify an asymmetric hardware signature authenticating receipt origin—capabilities explicitly scoped under <strong>Authenticated <code>PCNA</code> v2</strong> and our independent external security audit milestone (<code>PRJ-LC-01</code>).</p>
</section>

<section class="portability-note" id="research-programme-tracks">
  <h2>5. The Independent Research &amp; Assurance Programme (Non-Overlapping Work Packages)</h2>
  <table>
    <thead><tr><th scope="col">Work Package Code</th><th scope="col">Research / Engineering Focus</th><th scope="col">Primary Measurable Question &amp; Deliverables</th></tr></thead>
    <tbody>
      <tr><td><strong><code>PRJ-TW-01</code></strong><br>Assurance Initiative</td><td><strong>Institutional Launch &amp; Cross-Framework <code>A2E</code> Assurance Standard</strong></td><td>Establish the independent public-benefit AINA Assurance Initiative, hire dedicated systems/kernel and AI-control engineers, commission two external lab audits, and publish cross-framework <code>A2E</code> enforcement adapters.</td></tr>
      <tr><td><strong><code>PRJ-LC-01</code></strong><br>Open Verifier &amp; Audit</td><td><strong><code>eisa-core</code> / <code>pcna-verifier</code> Release Packaging, Authenticated <code>PCNA</code> v2 &amp; External Security Assessment</strong></td><td>Package the standalone open-source admission validator and verifier, add Ed25519 / TPM 2.0 asymmetric receipt signing (<code>Authenticated PCNA v2</code>), and publish an unedited third-party security assessment.</td></tr>
      <tr><td><strong><code>PRJ-CG-02</code></strong><br>Empirical AI Control</td><td><strong>250-Case Multi-Model Comparison: Deterministic <code>A2E</code> vs. LLM-as-Judge Monitors</strong></td><td>Quantify unauthorized mutation rates, false-rejection rates, sycophantic false-consensus acceptance, and <code>p50</code>/<code>p95</code>/<code>p99</code> latency across 4 frontier model families comparing OS permissions, LLM judges, and <code>A2E</code>.</td></tr>
      <tr><td><strong><code>PRJ-TAIF-01</code></strong><br>Formal Semantics</td><td><strong>Lean 4 <code>EISA</code> Mechanization (<code>eisa-lean4</code>) &amp; Crash-Straddling Fault-Injection Benchmark</strong></td><td>Prove bounded-step termination and verdict uniqueness in Lean 4 across all 7 opcodes and 47 fault classes, and evaluate <code>result_read_only</code> successor-grant crash recovery across 10,000 injected mid-commit faults.</td></tr>
      <tr><td><strong><code>PRJ-NAVY-01</code></strong><br>Linux OS Hardening</td><td><strong>Automated Linux Debloating, Hardening &amp; Pre-Execution Barrier (<code>AINA-LinuxHardener</code>)</strong></td><td>Automate RPM/ELF/module dependency analysis, OS debloating, <code>Landlock</code>/<code>seccomp-bpf</code> synthesis, Linux Pre-Execution Authorization Barrier, and deterministic ROS 2 Humble functional regression testing on Rocky Linux 9 / RHEL 9.</td></tr>
    </tbody>
  </table>
</section>

<section class="portability-note" id="open-source-deliverables">
  <h2>6. Planned Open-Source Deliverables</h2>
  <ul>
    <li><strong><code>eisa-core</code> &amp; Closed JSON Schemas:</strong> Standalone deterministic validator and closed 7-opcode schema definitions (<a href="/proof/schemas/squad.eisa.act_envelope.v1.json"><code>squad.eisa.act_envelope.v1.json</code></a>).</li>
    <li><strong><code>pcna-verifier</code> &amp; <code>Authenticated PCNA v2</code> Tooling:</strong> Open-source offline bundle verifier and Ed25519 / TPM-attested receipt signature checker.</li>
    <li><strong><code>eisa-lean4</code> Formal Specification:</strong> Mechanized Lean 4 operational semantics and termination proofs for the 6-bound <code>EISA</code> grammar.</li>
    <li><strong>250-Case Multi-Agent AI-Control Benchmark Dataset:</strong> Reproducible adversarial test vectors and comparative evaluation harness for LLM-judge vs. deterministic reference-monitor benchmarking.</li>
  </ul>
</section>

<section class="portability-note" id="ip-and-licensing">
  <h2>7. Background IP, Verbatim USPTO Provisional Schedule &amp; Licensing Distinction</h2>
  <p>All background architecture developed prior to external grant funding is covered by <strong>three solo-authored U.S. Provisional Patent Applications filed in April–May 2026</strong> by Blayne Manuia Aina (100% solo owned, zero third-party encumbrances):</p>
  <ol>
    <li><strong>U.S. Provisional #1 (Filed April 12, 2026):</strong> <em>Autonomous Intelligent Network Architecture Protocol; Systems, Methods, and Computing Architectures for Constitutionally Governed Machine Action, Machine Participation, Machine Encounter, Machine Execution, and Machine Finality Across Multi-Stage Verifiable State-Formation, State-Extraction, and Temporal Defense</em>.</li>
    <li><strong>U.S. Provisional #2 (Single Omnibus Application, Parts 2A &amp; 2B — Filed May 2, 2026):</strong>
      <ul>
        <li><strong>Part 2A:</strong> <em>AINA Semantic Switch and MX2MX; Systems, Methods, and Computing Architectures for Constitutionally Created Machine Domains, Typed Correspondence Governance, Protected Cross-Boundary Admissibility, Consequence-Bearing Re-Binding, and Monotonic Burden Accumulation Under an Effective Constitutional Envelope</em>.</li>
        <li><strong>Part 2B:</strong> <em>AINA Topological Physics Pipeline; Systems, Methods, and Machine Architectures for Candidate-Universe Sealing, Asymmetrical Topology Adjudication, Claim-Graph Canonical Extraction, Reversible Patch-Plan Materialization, Baseline-State Defense, and Instruction-Bundle Constraints Under Stage-Local Constitutional Governance</em>.</li>
      </ul>
    </li>
    <li><strong>U.S. Provisional #3 (Filed May 15, 2026):</strong> <em>AINA Authority-to-Effect (A2E) Governance: Layer-Zero Constitutional Transduction of Machine-Computed Authority into Consequence-Bearing Actuation Under an Effective Constitutional Envelope</em>.</li>
  </ol>
  <p><strong>Clean Background vs. Foreground Separation:</strong> Pre-existing background IP and the private Windows NT <code>squad.exe</code> runtime remain protected background assets (available for live demonstration and scoped evaluation under mutual NDA, or under applicable federal SBIR Data Rights for defense contracts). All public-interest foreground research deliverables—including the public JSON schemas, standalone verification packages (<code>eisa-core</code>, <code>pcna-verifier</code>), mechanized Lean 4 proofs (<code>eisa-lean4</code>), empirical benchmark datasets, and third-party security audit reports—are structured for open publication (MIT / Apache-2.0) to support independent scientific reproduction (<a href="mailto:me@blayneaina.com">me@blayneaina.com</a>).</p>
</section>
`;

const researchAssuranceHtml = generateHtml({
  title: "AINA Research & Assurance Programme — Independent Due-Diligence Binder",
  subtitle: "Security problem, Authority-to-Effect (A2E) architecture, existing baseline vs. proposed capabilities, reproducible evidence, open-source deliverables, and background-IP boundaries.",
  contentHtml: researchAssuranceHtmlContent,
  currentSlug: "research-assurance",
  pageHeroHtml: researchAssuranceHeroHtml
});
const researchAssurancePageDir = path.join(DIST_DIR, 'research-assurance');
fs.mkdirSync(researchAssurancePageDir, { recursive: true });
fs.writeFileSync(path.join(researchAssurancePageDir, 'index.html'), researchAssuranceHtml, 'utf8');
console.log('✓ Published Research & Assurance landing page (dist/research-assurance/index.html)');

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
  order: -1;
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
  text-decoration: none;
  display: inline-block;
  transition: border-color 0.15s ease, color 0.15s ease;
}

.chain-node:hover {
  border-color: var(--border-strong);
  color: var(--text-main);
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
  flex-wrap: wrap;
  gap: 0.75rem;
}

.footer-series-nav {
  max-width: 1440px;
  margin: 1.25rem auto 0;
  padding: 1.25rem 2rem 0;
  border-top: 1px solid var(--border);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  font-size: 0.78rem;
}

.footer-series-nav a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.footer-series-nav a:hover {
  color: var(--text-main);
  text-decoration: underline;
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
  display: block;
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
  display: block;
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
  opacity: 1;
  transform: none;
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

/* Compact Layout Styles */
.compact-ai-header {
  padding: 0.55rem 1.25rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-surface);
  font-family: var(--font-sans);
  font-size: 0.82rem;
}

.compact-ai-nav {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.75rem;
}

.compact-ai-nav a {
  color: var(--accent-blue);
  text-decoration: none;
}

.compact-ai-nav a:hover {
  text-decoration: underline;
}

.compact-article-header {
  margin-bottom: 1.25rem;
  padding-bottom: 0.85rem;
}

.compact-ai-footer {
  padding: 1rem 1.25rem;
  font-size: 0.82rem;
  text-align: center;
}

.fast-path-panel {
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--accent-gold);
}

.fast-path-list,
.compact-series-directory {
  margin: 0.75rem 0 0 1.15rem;
  display: grid;
  gap: 0.45rem;
}

.fast-path-list li,
.compact-series-directory li {
  line-height: 1.5;
  font-size: 0.9rem;
}

.part-compact-nav {
  padding: 0.75rem 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.86rem;
  line-height: 1.5;
}

.purpose-col,
.card-title,
.card-brief,
.card-sections,
.card-links {
  display: block;
}

ul.articles-grid {
  list-style: none;
  padding: 0;
  margin-left: 0;
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
}

li.article-card {
  gap: 0.55rem;
}

li.article-card .card-title {
  margin-bottom: 0.25rem;
  flex-grow: 0;
}

li.article-card .card-title a {
  color: var(--text-main);
  text-decoration: none;
}

li.article-card .card-title a:hover {
  text-decoration: underline;
}

.card-brief,
.card-sections {
  font-size: 0.83rem;
  line-height: 1.48;
  color: var(--text-muted);
}

.card-links {
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--text-muted);
}

.career-inline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
  margin: 0.9rem 0 1.25rem;
}

.career-row {
  display: block;
  padding: 0.85rem 1rem;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 0.86rem;
  line-height: 1.5;
  color: var(--text-muted);
}

.tier-card .tier-tag {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--teal-light);
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.08em;
}

.tier-card .tier-desc {
  display: block;
  color: #cbd5e1;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  line-height: 1.45;
  letter-spacing: normal;
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.case-panel .console-top {
  display: flex;
  margin-bottom: 0.5rem;
}

footer.site-footer p.footer-inner {
  margin: 0 auto;
}

footer.site-footer .footer-series-nav {
  flex-basis: 100%;
  margin: 0.75rem 0 0;
  padding: 0.75rem 0 0;
}

#series-index h2,
#research-programme h2,
#formal-confinement h2,
#career-snapshot h2,
#purpose h2 {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  line-height: 1.35;
  margin-bottom: 0.75rem;
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
const searchResults = document.getElementById('quickSearchResults');
const searchDataEl = document.getElementById('quickSearchData');
if (searchDialog && searchInput) {
  const ensureSearchHydrated = () => {
    if (!searchResults || searchResults.children.length > 0 || !searchDataEl) return;
    try {
      const items = JSON.parse(searchDataEl.textContent || '[]');
      for (const it of items) {
        const a = document.createElement('a');
        a.href = it.href;
        a.setAttribute('data-search-item', '');
        const strong = document.createElement('strong');
        strong.textContent = it.title;
        const span = document.createElement('span');
        span.textContent = it.sub;
        a.append(strong, span);
        searchResults.appendChild(a);
      }
    } catch {}
  };
  const openSearch = () => {
    ensureSearchHydrated();
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
    if (!window.location.hash) return;
    reviewBlocks.forEach(block => {
      if (window.location.hash === '#' + block.id) block.open = true;
    });
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
`;
fs.writeFileSync(path.join(DIST_DIR, 'script.js'), jsContent, 'utf8');
console.log('✓ Built Script (dist/script.js)');

// 5b. Generate Favicon (dist/favicon.svg and dist/favicon.ico)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="12" fill="#090c15"/>
  <rect x="3" y="3" width="58" height="58" rx="10" fill="none" stroke="#c89d54" stroke-width="2" stroke-opacity="0.65"/>
  <path d="M32 14L17 50h6.8l3.2-8.2h10l3.2 8.2H47L32 14zm-2.8 22.4L32 28.8l2.8 7.6h-5.6z" fill="#f2ece1"/>
  <circle cx="48" cy="16" r="4" fill="#c89d54"/>
</svg>
`;
fs.writeFileSync(path.join(DIST_DIR, 'favicon.svg'), faviconSvg, 'utf8');

function generateFaviconIco() {
  const w = 32, h = 32;
  const xorSize = w * h * 4;
  const andRowBytes = Math.ceil(w / 32) * 4;
  const andSize = andRowBytes * h;
  const bmpSize = 40 + xorSize + andSize;
  const buf = Buffer.alloc(6 + 16 + bmpSize, 0);

  // ICONDIR header
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(1, 4);

  // ICONDIRENTRY
  buf.writeUInt8(w, 6);
  buf.writeUInt8(h, 7);
  buf.writeUInt8(0, 8);
  buf.writeUInt8(0, 9);
  buf.writeUInt16LE(1, 10);
  buf.writeUInt16LE(32, 12);
  buf.writeUInt32LE(bmpSize, 14);
  buf.writeUInt32LE(22, 18);

  // BITMAPINFOHEADER
  const dibOffset = 22;
  buf.writeUInt32LE(40, dibOffset);
  buf.writeInt32LE(w, dibOffset + 4);
  buf.writeInt32LE(h * 2, dibOffset + 8);
  buf.writeUInt16LE(1, dibOffset + 12);
  buf.writeUInt16LE(32, dibOffset + 14);
  buf.writeUInt32LE(0, dibOffset + 16);
  buf.writeUInt32LE(xorSize + andSize, dibOffset + 20);

  const pixelOffset = dibOffset + 40;
  for (let y = 0; y < h; y++) {
    const topY = h - 1 - y;
    for (let x = 0; x < w; x++) {
      const idx = pixelOffset + (y * w + x) * 4;
      const isBorder = (x === 1 || x === 30 || topY === 1 || topY === 30) && x >= 1 && x <= 30 && topY >= 1 && topY <= 30;
      const isGoldDot = Math.hypot(x - 24, topY - 8) <= 2.4;
      const centerDist = Math.abs(x - 15.5);
      const legProgress = (topY - 7) / 18;
      const onLeftOrRightLeg = topY >= 7 && topY <= 25 && Math.abs(centerDist - legProgress * 6.5) <= 1.45;
      const onCrossbar = topY >= 18 && topY <= 20 && centerDist <= 4.2;
      const isLetterA = onLeftOrRightLeg || onCrossbar;

      let r = 9, g = 12, b = 21, a = 255;
      if (x === 0 || x === 31 || topY === 0 || topY === 31) {
        r = 0; g = 0; b = 0; a = 0;
      } else if (isGoldDot || isBorder) {
        r = 200; g = 157; b = 84; a = 255;
      } else if (isLetterA) {
        r = 242; g = 236; b = 225; a = 255;
      }
      buf.writeUInt8(b, idx);
      buf.writeUInt8(g, idx + 1);
      buf.writeUInt8(r, idx + 2);
      buf.writeUInt8(a, idx + 3);
    }
  }
  return buf;
}
fs.writeFileSync(path.join(DIST_DIR, 'favicon.ico'), generateFaviconIco());
console.log('✓ Built Favicons (dist/favicon.svg, dist/favicon.ico)');

// 5b. Generate indexes, digests, briefs, and sitemaps
console.log('Generating article indexes, digests, and sitemaps...');

function extractArticleDigestMarkdown(art) {
  const brief = EXECUTIVE_BRIEFS[art.slug] || {};
  const lines = art.visibleMd.split('\n');
  const h2Blocks = [];
  let cur = null;

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (cur) h2Blocks.push(cur);
      cur = { title: line.replace(/^##\s+/, '').trim(), rawLines: [] };
    } else if (cur) {
      cur.rawLines.push(line);
    }
  }
  if (cur) h2Blocks.push(cur);

  const bulletLines = [];
  for (const blk of h2Blocks) {
    const subheads = [];
    const prose = [];
    const listItems = [];
    const tables = [];
    let tableBuf = [];
    let inCode = false;

    const flushTable = () => {
      if (tableBuf.length >= 2) {
        const rows = flattenTableRowsToSummary(tableBuf, false);
        if (rows.length > 0) tables.push(rows.join(' | '));
      }
      tableBuf = [];
    };

    const isClaimSection = /Claim Card/i.test(blk.title);
    for (const rawLine of blk.rawLines) {
      const t = rawLine.trim();
      if (t.startsWith('```')) { flushTable(); inCode = !inCode; continue; }
      if (!t || t.startsWith('<script')) { if (!t) flushTable(); continue; }
      if (inCode) { if (isClaimSection) listItems.push(t); continue; }
      if (t.startsWith('|')) { tableBuf.push(t); continue; }
      flushTable();
      if (t.startsWith('### ')) {
        subheads.push(t.replace(/^###\s+/, '').trim());
      } else if (/^[-*+]\s+/.test(t) || /^\d+\.\s+/.test(t)) {
        listItems.push(t.replace(/^([-*+]|\d+\.)\s+/, ''));
      } else if (!t.startsWith('---')) {
        prose.push(t);
      }
    }
    flushTable();

    const isClaimOrKey = /Claim Card|Four-Gate|Seven Opcodes|Three Technical Evaluation Tracks|Twelve|Fourteen/i.test(blk.title);
    const parts = [];
    if (subheads.length) parts.push(`Subtopics: ${subheads.join('; ')}`);
    if (prose.length) parts.push(truncateAtWordBoundary(prose.join(' ').replace(/\s+/g, ' '), isClaimOrKey ? 360 : 240));
    if (tables.length) parts.push(`Table Data: ${truncateAtWordBoundary(tables.join(' | '), isClaimOrKey ? 700 : 380)}`);
    if (listItems.length) parts.push(`Items: ${truncateAtWordBoundary(listItems.join(' | '), isClaimOrKey ? 520 : 280)}`);

    bulletLines.push(`- **${blk.title}:** ${parts.join(' — ') || 'See linked full part.'}`);
  }

  return `
## §${art.num} — ${art.title}
- **URLs:** [1-Call Brief (/${art.num}/brief/)](/${art.num}/brief/) · [Full (/${art.slug}/)](/${art.slug}/) · [Raw Markdown (/${art.num}.md)](/${art.num}.md) · **Parts (${art.parts.length}):** ${art.parts.map(pt => `[P${pt.partNum}](${pt.relUrl})`).join(' ')}
- **Thesis & Scope:** **Problem:** ${brief.problem || ''} — **Proves:** ${brief.proof || ''} — **Scope:** ${brief.commercial || ''}
${bulletLines.join('\n')}
`;
}

// Generate /articles/ Master Directory Page
const articlesIndexBodyHtml = `
${MASTER_SERIES_DIRECTORY_HTML}

<section class="portability-note" aria-label="Detailed article abstracts and links">
  <div class="brief-label">DETAILED INSTALLMENT ABSTRACTS, 1-CALL BRIEFS &amp; LOSSLESS PART LINKS (§01–§09)</div>
  <h2>Executive Summaries &amp; Direct Links for All Nine Articles</h2>
  <ul class="compact-series-directory">
    ${ARTICLES.map(art => {
      const brief = EXECUTIVE_BRIEFS[art.slug] || {};
      return `<li><strong>§${art.num} — <a href="/${art.slug}/">${escapeHtml(art.title)}</a></strong>: <strong>Problem:</strong> ${escapeHtml(brief.problem)} <strong>Proves:</strong> ${escapeHtml(brief.proof)} <strong>Routes:</strong> <a href="/${art.num}/brief/"><code>/${art.num}/brief/</code></a> · <a href="/${art.num}/brief.txt"><code>/${art.num}/brief.txt</code></a> · <a href="/${art.num}.md"><code>/${art.num}.md</code></a> · ${(art.parts || []).map(pt => `<a href="${pt.relUrl}">P${pt.partNum}</a>`).join(' ')}</li>`;
    }).join('\n    ')}
  </ul>
</section>
`;

const articlesDir = path.join(DIST_DIR, 'articles');
fs.mkdirSync(articlesDir, { recursive: true });
fs.writeFileSync(
  path.join(articlesDir, 'index.html'),
  generateHtml({
    title: "All 9 AINA Architecture Articles, 1-Call Briefs & Lossless Chunks",
    subtitle: "Complete directory of 1-call briefs, full articles, raw markdown, lossless Part chunks, and 3-step technical digests.",
    contentHtml: articlesIndexBodyHtml,
    currentSlug: 'articles',
    compactChrome: true,
    canonicalOverride: 'https://blayneaina.com/articles/'
  }),
  'utf8'
);

// Generate series digests
const DIGEST_GROUPS = [
  {
    num: 1,
    slug: 'digest-1',
    title: 'AINA Series Technical Digest 1 of 3: Articles §01, §02 & §03',
    subtitle: 'Sections, flattened tables, 7-opcode EISA grammar, Claim Cards, and direct part links for Articles §01–§03.',
    articles: ARTICLES.slice(0, 3)
  },
  {
    num: 2,
    slug: 'digest-2',
    title: 'AINA Series Technical Digest 2 of 3: Articles §04, §05 & §06',
    subtitle: 'Sections, flattened tables, Room coordination, typed leases, dual-tier vaults, and Claim Cards for Articles §04–§06.',
    articles: ARTICLES.slice(3, 6)
  },
  {
    num: 3,
    slug: 'digest-3',
    title: 'AINA Series Technical Digest 3 of 3: Articles §07, §08 & §09',
    subtitle: 'Sections, flattened tables, act-pinning, Break-Glass epochs, 45-case conformance gate, and Claim Cards for Articles §07–§09.',
    articles: ARTICLES.slice(6, 9)
  }
];

DIGEST_GROUPS.forEach(dg => {
  const digestNavP = `<p class="part-compact-nav"><strong>FAST 3-STEP SERIES DIGEST ${dg.num}/3</strong> — <a href="/articles/digest-1/">Digest 1 (§01–§03)</a> · <a href="/articles/digest-2/">Digest 2 (§04–§06)</a> · <a href="/articles/digest-3/">Digest 3 (§07–§09)</a> · <a href="/ai-brief/">1-Page Master Brief</a> · <a href="/articles/">All 9 Articles</a> · <a href="/research-assurance/">Assurance</a> · <a href="/refusal-proof/">Proof</a></p>`;
  const digestMd = dg.articles.map(a => extractArticleDigestMarkdown(a)).join('\n');
  const digestDir = path.join(articlesDir, dg.slug);
  fs.mkdirSync(digestDir, { recursive: true });
  fs.writeFileSync(
    path.join(digestDir, 'index.html'),
    generateHtml({
      title: dg.title,
      subtitle: dg.subtitle,
      contentHtml: digestNavP + '\n' + marked.parse(digestMd) + '\n' + digestNavP,
      currentSlug: 'articles',
      isPartPage: true,
      compactChrome: true,
      canonicalOverride: `https://blayneaina.com/articles/${dg.slug}/`
    }),
    'utf8'
  );
});

// Generate single-page series brief (/ai-brief/ and /ai-brief.txt)
const articleMetaSummaries = ARTICLES.map(art => ({
  art,
  brief: EXECUTIVE_BRIEFS[art.slug] || {},
  ...getArticleClaimSummaryFromMd(art)
}));

const aiBriefMd = [
  `**Quick Routes:** [Plain-Text Brief (/ai-brief.txt)](https://blayneaina.com/ai-brief.txt) · [All 9 Articles (/articles/)](https://blayneaina.com/articles/) · [Digest 1](/articles/digest-1/) · [Digest 2](/articles/digest-2/) · [Digest 3](/articles/digest-3/) · [Assurance](/research-assurance/) · [Refusal Proof](/refusal-proof/) · [Semantic Switch](/semantic-switch-proof/) · [GitHub](https://github.com/SquadForge/blayne.aina) · Author: Blayne Aina (<me@blayneaina.com>, Denver, CO)`,
  `- **Core Architecture & Three-Layer TCB Bounds (A2E + EISA):** AI models operate as untrusted proposal generators without direct execution standing. **Layer 1 (Pre-Parse §03.1):** \`MAX_SUBMISSION_BYTES=1,048,576\`, \`MAX_REQUESTED_ACT_BYTES=65,536\`, \`MAX_EVIDENCE_REF_BYTES=4,096\`, \`MAX_ACTS=256\`, \`Fracture\`/\`Forge\` stage homogeneity, \`visit_map\` duplicate-key rejection, \`visit_f64\` non-finite rejection. **Layer 2 (12 Closed Draft-07 Schemas):** recursive \`additionalProperties: false\`, **7 closed opcodes** (\`BindEvidenceTag\`, \`RequestHumanReview\`, \`RejectUnlawfulAct\`, \`AssertLayoutRelation\`, \`AssertDuplicatePair\`, \`AssertTransitiveClosure\`, \`ProposePartition\`), integer \`confidence\` (\`0..10000\`, zero floats), 15 non-inferential tags, 47 fault codes, RFC 6901 depth \`<= 8\` (\`<= 256B\`). **Layer 3 (Four-Gate Machine & Windows NT \`squad.exe\`):** \`MAX_CASE_BYTES=4,194,304\`, \`MAX_CASE_RECORDS=1,000\`, \`MAX_VALUE_CHARS=1,024\`, \`MIN_PHONE_DIGITS=7\`, \`CreateProcessW(CREATE_SUSPENDED)\` + \`PssCaptureSnapshot\` (\`act-pin\`), \`FILE_SHARE_READ\` exclusion, SQLite \`row_version\`.`,
  `- **Verified Public Evidence & IP/Research Scope:** **Offline Refusal & Conformance Bundle (\`python proof/verify_refusal_proof.py\`):** \`39/39\` \`SHA256SUMS.txt\` match, \`4/4\` deterministic refusal records (Cases A/B/C/D; Case C \`contacts.db\` \`16,384\` bytes SHA-256 \`362088a1...b47d719\` unchanged, \`0\` effects, \`0\` model calls, \`requested_act_mismatch\`), \`45/45\` conformance cases, \`20/20\` evidence cases, \`18/18\` positive + \`26/26\` negative schema/pre-parse tests across all 12 schemas. **Semantic Switch Alpha:** \`20/20\` invariance blocks, \`23/23\` exact native relations, \`0\` provider calls. **3 USPTO Provisionals (Apr–May 2026):** \`63/996,553\` (AINA Protocol, Apr 12, 2026), \`64/004,193\` (Omnibus Parts 2A & 2B: Semantic Switch/MX2MX & Topological Physics/EISA, May 2, 2026), \`64/027,093\` (A2E Governance, May 15, 2026). **5 Research Work Packages:** \`PRJ-TW-01\` (Assurance Initiative & cross-framework A2E), \`PRJ-LC-01\` (\`eisa-core\`/\`pcna-verifier\`, \`Authenticated PCNA v2\` + audit), \`PRJ-CG-02\` (250-case AI-control study), \`PRJ-TAIF-01\` (Lean 4 \`eisa-lean4\` + 10k crash-recovery benchmark), \`PRJ-NAVY-01\` (\`AINA-LinuxHardener\` + pre-execution barrier).`,
  ...articleMetaSummaries.map(({ art, brief, sectionsSummary, claimSnippet }) =>
    `- **§${art.num} — [${art.shortTitle}](/${art.num}/brief/)** ([Full](/${art.slug}/) · [.md](/${art.num}.md) · [brief.txt](/${art.num}/brief.txt) · ${art.parts.length} parts): **Problem:** ${brief.problem || ''} **Proves:** ${brief.proof || ''} **Sections:** ${sectionsSummary}.${claimSnippet ? ` **Claim Card:** ${claimSnippet}` : ''}`
  )
].join('\n');

const aiBriefDir = path.join(DIST_DIR, 'ai-brief');
fs.mkdirSync(aiBriefDir, { recursive: true });
fs.writeFileSync(
  path.join(aiBriefDir, 'index.html'),
  generateHtml({
    title: "AINA Master One-Page Technical Brief (§01–§09, Proofs, TCB & IP)",
    subtitle: "Complete architecture digest of all 9 installments, 3 enforcement layers, 7 opcodes, public proof metrics, 3 USPTO provisionals, and 5 PRJ packages.",
    contentHtml: marked.parse(aiBriefMd),
    currentSlug: 'ai-brief',
    isPartPage: true,
    compactChrome: true,
    canonicalOverride: 'https://blayneaina.com/ai-brief/'
  }),
  'utf8'
);

const aiBriefTxt = [
  '# AINA MASTER ONE-CALL TECHNICAL BRIEF — blayneaina.com (All 9 Articles §01–§09 + Proofs + TCB + IP)',
  'Author: Blayne Aina (Denver, CO; USMC Veteran) | Contact: me@blayneaina.com | Repo: https://github.com/SquadForge/blayne.aina | Web Brief: https://blayneaina.com/ai-brief/ | Full Corpus: https://blayneaina.com/llms-full.txt',
  'Fast Routes: Digests /articles/digest-1/ .. digest-3/ | Assurance /research-assurance/ | Refusal Proof /refusal-proof/ | Semantic Switch /semantic-switch-proof/ | 1-Call Article Briefs: /01/brief.txt .. /09/brief.txt | Raw Markdown: /01.md .. /09.md',
  'Layer 1 (Pre-Parse): MAX_SUBMISSION_BYTES=1,048,576; MAX_REQUESTED_ACT_BYTES=65,536; MAX_EVIDENCE_REF_BYTES=4,096; MAX_ACTS=256; Fracture/Forge stage homogeneity; visit_map dup-key reject; visit_f64 non-finite reject.',
  'Layer 2 (12 Draft-07 Schemas): recursive additionalProperties=false; 7 closed opcodes (BindEvidenceTag, RequestHumanReview, RejectUnlawfulAct, AssertLayoutRelation, AssertDuplicatePair, AssertTransitiveClosure, ProposePartition); integer confidence 0..10000 (0 floats); 15 tags; 47 fault codes; RFC 6901 depth<=8 (<=256B).',
  'Layer 3 (Four-Gate Machine & squad.exe NT): MAX_CASE_BYTES=4,194,304; MAX_CASE_RECORDS=1,000; MAX_VALUE_CHARS=1,024; MIN_PHONE_DIGITS=7; CreateProcessW(CREATE_SUSPENDED)+PssCaptureSnapshot (act-pin); FILE_SHARE_READ exclusion; SQLite row_version.',
  'Verified Public Evidence: python proof/verify_refusal_proof.py -> 39/39 SHA256SUMS.txt PASS; 4/4 refusal cases (Case C contacts.db 16,384B SHA-256 362088a1...b47d719 unchanged, 0 effects, 0 model calls, requested_act_mismatch); 45/45 conformance; 20/20 evidence; 18/18 pos + 26/26 neg tests across 12 schemas. Semantic Switch: 20/20 invariance blocks, 23/23 exact native relations, 0 provider calls.',
  'IP & Funded R&D Roadmap: 3 USPTO Provisionals (Apr-May 2026): 63/996,553 (AINA Protocol, Apr 12, 2026), 64/004,193 (Omnibus Parts 2A & 2B: Semantic Switch/MX2MX & Topological Physics/EISA, May 2, 2026), 64/027,093 (A2E Governance, May 15, 2026). 5 Work Packages: PRJ-TW-01 (Assurance Initiative & cross-framework A2E), PRJ-LC-01 (eisa-core/pcna-verifier, Authenticated PCNA v2 + audit), PRJ-CG-02 (250-case AI-control study), PRJ-TAIF-01 (Lean 4 eisa-lean4 + 10k crash-recovery), PRJ-NAVY-01 (AINA-LinuxHardener + pre-execution barrier).',
  ...articleMetaSummaries.flatMap(({ art, brief, sectionsSummary, claimSnippet }) => [
    `§${art.num} (${art.title}) [Brief: https://blayneaina.com/${art.num}/brief/ | Raw: https://blayneaina.com/${art.num}.md | Parts: ${art.parts.length}]: Problem: ${brief.problem || ''} | Proves: ${brief.proof || ''}`,
    `§${art.num} Specs & Claim Card: Sections: ${sectionsSummary}.${claimSnippet ? ` Claim Card: ${claimSnippet}` : ''}`
  ])
].join('\n');
fs.writeFileSync(path.join(DIST_DIR, 'ai-brief.txt'), aiBriefTxt + '\n', 'utf8');

// Generate /sitemap/ HTML page and /sitemap.txt plain-text sitemap
const allCanonicalUrls = [
  'https://blayneaina.com/',
  'https://blayneaina.com/ai-brief/',
  'https://blayneaina.com/ai-brief.txt',
  'https://blayneaina.com/articles/',
  'https://blayneaina.com/articles/digest-1/',
  'https://blayneaina.com/articles/digest-2/',
  'https://blayneaina.com/articles/digest-3/',
  'https://blayneaina.com/research-assurance/',
  'https://blayneaina.com/refusal-proof/',
  'https://blayneaina.com/semantic-switch-proof/',
  'https://blayneaina.com/sitemap/',
  'https://blayneaina.com/sitemap.txt',
  'https://blayneaina.com/llms.txt',
  'https://blayneaina.com/llms-full.txt',
  ...ARTICLES.flatMap(art => [
    `https://blayneaina.com/${art.num}/brief/`,
    `https://blayneaina.com/${art.num}/brief.txt`,
    `https://blayneaina.com/${art.num}.md`,
    `https://blayneaina.com/${art.slug}/`,
    ...art.parts.map(pt => pt.url)
  ])
];

fs.writeFileSync(path.join(DIST_DIR, 'sitemap.txt'), allCanonicalUrls.join('\n') + '\n', 'utf8');

const htmlSitemapDir = path.join(DIST_DIR, 'sitemap');
fs.mkdirSync(htmlSitemapDir, { recursive: true });
const htmlSitemapBody = `
${MASTER_SERIES_DIRECTORY_HTML}
<section class="portability-note" aria-label="Complete plain-text URL list">
  <div class="brief-label">COMPLETE PLAIN-TEXT URL LIST (${allCanonicalUrls.length} CANONICAL URLS)</div>
  <h2>Every Canonical Brief, Digest, Article &amp; Lossless Part Chunk on blayneaina.com</h2>
  <pre><code>${allCanonicalUrls.join('\n')}</code></pre>
</section>
`;
fs.writeFileSync(
  path.join(htmlSitemapDir, 'index.html'),
  generateHtml({
    title: "Complete HTML Sitemap & Multi-Part Article Index | Blayne Aina",
    subtitle: "Complete list of all 1-call briefs, raw markdown files, articles, lossless chunks, and verification bundles on blayneaina.com.",
    contentHtml: htmlSitemapBody,
    currentSlug: 'sitemap',
    compactChrome: true,
    canonicalOverride: 'https://blayneaina.com/sitemap/'
  }),
  'utf8'
);

// Generate llms.txt and llms-full.txt
const llmsTxtContent = `# Blayne Aina — AINA Transition-Governance Architecture & Verification Corpus (blayneaina.com)

> Canonical orientation, architectural summary, technical briefs, and complete URL directory for automated inspection, technical peer reviewers, and R&D grant evaluators.
> Contact: Blayne Aina (Principal Systems Architect & Creator of AINA, Denver, CO, USA; USMC Veteran) — me@blayneaina.com

## 1. Two-Sentence Architecture Summary
AINA is a deterministic authority-enforcement architecture that treats probabilistic AI outputs as untrusted proposals. It independently validates evidence, authorization, execution identity, and permitted state transitions at the boundary where external effects are committed, producing independently verifiable evidence when an attempted operation is refused.

## 2. Compact Briefs & Direct Raw Corpus Routes
1. **Single-Request Complete Master Brief Covering All 9 Articles (§01–§09) + Proofs + TCB + Provisionals + PRJ Packages:**
   - HTML: https://blayneaina.com/ai-brief/
   - Plain Text (<=48 lines): https://blayneaina.com/ai-brief.txt
2. **Per-Article Technical Briefs (Every Article <=44 Rendered Lines):**
   - Briefs: https://blayneaina.com/01/brief/ through https://blayneaina.com/09/brief/ (or .txt: /01/brief.txt .. /09/brief.txt)
   - Raw Verbatim Markdown: https://blayneaina.com/01.md through https://blayneaina.com/09.md
3. **3-Step Complete Series Digests:** Digest 1 (§01–§03): https://blayneaina.com/articles/digest-1/ | Digest 2 (§04–§06): https://blayneaina.com/articles/digest-2/ | Digest 3 (§07–§09): https://blayneaina.com/articles/digest-3/
4. **Master Directory, Assurance & Proof Packs:**
   - Articles Index: https://blayneaina.com/articles/
   - Research & Assurance Binder: https://blayneaina.com/research-assurance/
   - Offline Refusal Proof Pack: https://blayneaina.com/refusal-proof/
   - Semantic Switch Proof Pack: https://blayneaina.com/semantic-switch-proof/
   - GitHub Repo: https://github.com/SquadForge/blayne.aina

## 3. Complete 9-Article Series, 1-Call Briefs & Lossless Part URLs
${ARTICLES.map(art => `### §${art.num} — ${art.title}
- 1-Call Brief: https://blayneaina.com/${art.num}/brief/ (Plain Text: https://blayneaina.com/${art.num}/brief.txt)
- Full Single-Page URL: https://blayneaina.com/${art.slug}/ (Short: https://blayneaina.com/${art.num}/ | Raw MD: https://blayneaina.com/${art.num}.md)
- Problem: ${(EXECUTIVE_BRIEFS[art.slug] || {}).problem || ''}
- What It Proves: ${(EXECUTIVE_BRIEFS[art.slug] || {}).proof || ''}
- Lossless Part URLs (${art.parts.length} Parts): ${(art.parts || []).map(pt => `${pt.url} (.txt: ${pt.txtUrl})`).join(' | ')}`).join('\n\n')}
`;
fs.writeFileSync(path.join(DIST_DIR, 'llms.txt'), llmsTxtContent, 'utf8');

const llmsFullTxtContent = llmsTxtContent + '\n\n================================================================================\nCOMPLETE UNABRIDGED 9-ARTICLE TEXT CORPUS\n================================================================================\n\n' +
  ARTICLES.map(art => `# ARTICLE §${art.num}: ${art.title}\nCanonical URL: https://blayneaina.com/${art.slug}/\n\n${art.visibleMd}`).join('\n\n================================================================================\n\n');
fs.writeFileSync(path.join(DIST_DIR, 'llms-full.txt'), llmsFullTxtContent, 'utf8');

// 6. Generate Robots.txt and Sitemap.xml
console.log('Generating sitemap.xml and robots.txt...');
const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://blayneaina.com/sitemap.xml
`;
fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');

const xmlUrls = allCanonicalUrls.filter(u => !u.endsWith('.txt') && !u.endsWith('.md'));
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls.map(u => `  <url>
    <loc>${u}</loc>
    <lastmod>2026-11-13</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === 'https://blayneaina.com/' || u.endsWith('/ai-brief/') || u.endsWith('/articles/') || u.endsWith('/research-assurance/') || u.endsWith('/refusal-proof/') ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');

// 7. Generate Cloudflare Pages headers (_headers) and redirects (_redirects)
const headersContent = `/*
  Cache-Control: no-cache, no-store, must-revalidate
  CDN-Cache-Control: no-store
  Cloudflare-CDN-Cache-Control: no-store
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: document-domain=()

/*.md
  Content-Type: text/plain; charset=utf-8

/ai-brief.txt
  Content-Type: text/plain; charset=utf-8

/*/brief.txt
  Content-Type: text/plain; charset=utf-8

/*/*.txt
  Content-Type: text/plain; charset=utf-8

/sitemap.xml
  Content-Type: text/xml; charset=utf-8

/sitemap.txt
  Content-Type: text/plain; charset=utf-8

/llms.txt
  Content-Type: text/plain; charset=utf-8

/llms-full.txt
  Content-Type: text/plain; charset=utf-8

/proof/README.md
  Link: <https://blayneaina.com/refusal-proof/>; rel="canonical"
  X-Robots-Tag: noindex, follow

/proof/one_line_verify_commands.md
  Link: <https://blayneaina.com/refusal-proof/>; rel="canonical"
  X-Robots-Tag: noindex, follow

/proof/verifier_stdout_transcript.txt
  Link: <https://blayneaina.com/refusal-proof/>; rel="canonical"
  X-Robots-Tag: noindex, follow

/proof/semantic-switch/README.txt
  Link: <https://blayneaina.com/semantic-switch-proof/>; rel="canonical"
  X-Robots-Tag: noindex, follow

/proof/conformance/*
  X-Robots-Tag: noindex, noarchive

/proof/refusal/*
  X-Robots-Tag: noindex, noarchive

/proof/schemas/*
  X-Robots-Tag: noindex, noarchive

/proof/semantic-switch/harness/*
  X-Robots-Tag: noindex, noarchive

/proof/*.py
  X-Robots-Tag: noindex, noarchive

/proof/*.zip
  X-Robots-Tag: noindex, noarchive

/proof/SHA256SUMS.txt
  X-Robots-Tag: noindex, noarchive
`;
fs.writeFileSync(path.join(DIST_DIR, '_headers'), headersContent, 'utf8');

const redirectsContent = `/series/from-proposal-to-consequence /articles/ 301
/series/from-proposal-to-consequence/ /articles/ 301
/series/* /articles/ 301
/complete-series /articles/ 301
/complete-series/ /articles/ 301
/from-proposal-to-consequence /articles/ 301
/from-proposal-to-consequence/ /articles/ 301
/architecture /articles/ 301
/architecture/ /articles/ 301
`;
fs.writeFileSync(path.join(DIST_DIR, '_redirects'), redirectsContent, 'utf8');

// 8. Build Verification
function extractApproxRenderedLines(html) {
  const noHead = html.replace(/<head[\s\S]*?<\/head>/gi, '').replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
  const withBreaks = noHead
    .replace(/<(?:br|hr)\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|h[1-6]|li|tr|td|th|dt|dd|div|section|article|header|footer|aside|pre|blockquote|summary|nav|ul|ol)>/gi, '\n');
  const plain = withBreaks
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  return plain.split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
}

const TEXT_EXTS = new Set(['.html', '.txt', '.md', '.json', '.xml', '.css', '.js', '.svg', '.py', '']);
function verifyNoControlChars(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      verifyNoControlChars(full);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (!TEXT_EXTS.has(ext) && entry.name !== '_headers' && entry.name !== '_redirects' && entry.name !== 'SHA256SUMS') continue;
      const content = fs.readFileSync(full, 'utf8');
      for (let i = 0; i < content.length; i++) {
        const c = content.charCodeAt(i);
        if (c < 9 || (c >= 14 && c <= 31) || c === 65533) {
          throw new Error(`Invalid control character U+${c.toString(16).padStart(4, '0')} in ${full} at offset ${i}`);
        }
      }
    }
  }
}
verifyNoControlChars(DIST_DIR);

const gitAttrPath = path.join(ROOT_DIR, '.gitattributes');
if (!fs.existsSync(gitAttrPath)) throw new Error('Missing .gitattributes');
const gitAttrText = fs.readFileSync(gitAttrPath, 'utf8');
if (!gitAttrText.includes('proof/** -text') || !gitAttrText.includes('dist/proof/** -text')) {
  throw new Error('Missing proof -text rule in .gitattributes');
}
function verifyProofByteParity(relDir = '') {
  const srcBase = path.join(ROOT_DIR, 'proof', relDir);
  for (const entry of fs.readdirSync(srcBase, { withFileTypes: true })) {
    const subRel = relDir ? path.join(relDir, entry.name) : entry.name;
    if (entry.isDirectory()) {
      verifyProofByteParity(subRel);
    } else if (entry.isFile()) {
      const a = fs.readFileSync(path.join(ROOT_DIR, 'proof', subRel));
      const b = fs.readFileSync(path.join(DIST_DIR, 'proof', subRel));
      if (!a.equals(b)) throw new Error(`Byte mismatch between proof/${subRel} and dist/proof/${subRel}`);
    }
  }
}
verifyProofByteParity();

const homeHtmlLines = extractApproxRenderedLines(fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8')).length;
const aiBriefTxtLines = fs.readFileSync(path.join(DIST_DIR, 'ai-brief.txt'), 'utf8').trimEnd().split('\n').length;
const aiBriefHtmlLines = extractApproxRenderedLines(fs.readFileSync(path.join(DIST_DIR, 'ai-brief', 'index.html'), 'utf8')).length;
if (homeHtmlLines > 48) throw new Error(`index.html rendered lines exceeded: ${homeHtmlLines} > 48`);
if (aiBriefTxtLines > 48) throw new Error(`ai-brief.txt line budget exceeded: ${aiBriefTxtLines} > 48`);
if (aiBriefHtmlLines > 85) throw new Error(`ai-brief/index.html line budget exceeded: ${aiBriefHtmlLines} > 85`);

const briefReport = [];
for (const art of ARTICLES) {
  const bHtml = extractApproxRenderedLines(fs.readFileSync(path.join(DIST_DIR, art.num, 'brief', 'index.html'), 'utf8')).length;
  const bTxt = fs.readFileSync(path.join(DIST_DIR, art.num, 'brief.txt'), 'utf8').trimEnd().split('\n').length;
  briefReport.push(`§${art.num}:${bHtml}h/${bTxt}t`);
  if (bHtml > 44) throw new Error(`§${art.num}/brief/index.html rendered lines ${bHtml} > 44`);
  if (bTxt > 44) throw new Error(`§${art.num}/brief.txt lines ${bTxt} > 44`);
}

const digestReport = [];
for (const dg of DIGEST_GROUPS) {
  const dHtml = extractApproxRenderedLines(fs.readFileSync(path.join(DIST_DIR, 'articles', dg.slug, 'index.html'), 'utf8')).length;
  digestReport.push(`${dg.slug}:${dHtml}`);
  if (dHtml > 140) throw new Error(`${dg.slug} rendered lines ${dHtml} > 140`);
}

console.log(`✓ Verified 0 control chars across dist/`);
console.log(`✓ Home page line count: /=${homeHtmlLines} HTML lines`);
console.log(`✓ AI Brief line counts: /ai-brief.txt=${aiBriefTxtLines}, /ai-brief/=${aiBriefHtmlLines} HTML lines`);
console.log(`✓ Per-article brief line counts: ${briefReport.join(', ')}`);
console.log(`✓ Digest line counts: ${digestReport.join(', ')}`);
console.log('=== BUILD COMPLETE: All 9 articles, 1-call briefs, lossless parts, digests, and sitemaps verified ===');
