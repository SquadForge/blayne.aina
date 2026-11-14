SEMANTIC SWITCH PUBLIC PROOF PACK
================================

Purpose
-------
This pack lets a technical reviewer independently reproduce the relation-isomorphism evidence published on blayneaina.com. It uses synthetic records only. No customer records, private crosswalk, local key, credentials, native identifiers, local filesystem paths, or provider calls are included.

Verified result
---------------
- 20/20 relabeling-invariance blocks pass.
- 23/23 eligible native edit relations are preserved exactly: substitution, deletion/insertion, and adjacent transposition.
- 53/53 records and 529/529 field values verify in each relation-isomorphism run.
- 14/14 batch-restoration adversarial cases pass.
- 10/10 transformation adversarial cases pass.
- 0 provider calls during preparation.

Contents
--------
- input_A.json and input_B.json: the same synthetic relational object under two different native relabelings.
- blocks_A.jsonl and blocks_B.jsonl: the 20 candidate blocks per input.
- fixture.json: block ordering for comparison.
- harness/fingerprint.py: canonical relational fingerprint comparison.
- harness/relation_audit.py: exact native-to-fiction relation audit.
- iso.result.json: retained invariance result used for comparison with a fresh reproduction.
- iso.relations.json: retained exact-relation result used for comparison.
- verify.py: portable fresh-run driver using only the Python standard library.
- SHA256SUMS.txt: integrity digests for every public pack file.

Reproduce
---------
Requirements: a Semantic Switch executable and Python 3. No provider account, network route, Python packages, or key file is required.

Run:

  python verify.py --binary /path/to/semantic-switch

On Windows, an executable built with the relation-isomorphism-v1 feature is appropriate:

  python verify.py --binary "C:\path\to\semantic-switch.exe"

The driver creates a temporary random 32-byte local key, prepares both inputs, verifies each run, computes fresh invariance and relation reports, prints a JSON summary, and deletes the temporary workspace. It exits 0 only when all 20 blocks and all 23 eligible relations pass.

Compare the fresh summary with iso.result.json and iso.relations.json. The retained reports contain no private crosswalk or local key.

Claim ceiling
-------------
These results establish deterministic transport fidelity, exact relation preservation, complete local verification, and adversarial restoration behavior on the declared synthetic fixtures. They do not establish anonymity, inference resistance, universal privacy, matching accuracy, production merge correctness, or independent validation of a customer population. External AI providers receive structure-preserving fictional records; native rows, keys, and the private crosswalk remain under client control.
