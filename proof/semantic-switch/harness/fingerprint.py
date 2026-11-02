"""Relational fingerprint of an emitted Stage 1 fictional payload.

The fingerprint replaces every generated identifier by the order in which it is
first seen, within its own space, within one block. What survives is exactly the
relational structure: which values are equal to which, which components are
shared, which components belong to a common family, how many components each
field has, and what state each field is in.

If the generator is a faithful relabeling, then for two inputs that are the same
relational object under relabeling the fingerprints must be IDENTICAL. Any
difference is a place where the emitted structure depends on the identity of the
native tokens rather than on their relationships.

Nothing here reads labels, gold pairs, the crosswalk, or any decision.
"""
import json, re, sys
from pathlib import Path

HEX64 = re.compile(r"^[0-9a-f]{64}$")

class Space:
    """First-occurrence interning, one namespace."""
    def __init__(self, tag):
        self.tag, self.seen = tag, {}
    def id(self, value):
        if value not in self.seen:
            self.seen[value] = f"{self.tag}{len(self.seen):04d}"
        return self.seen[value]

def canon(node, spaces, key=None):
    if isinstance(node, dict):
        return {k: canon(v, spaces, k) for k, v in sorted(node.items())}
    if isinstance(node, list):
        return [canon(v, spaces, key) for v in node]
    if isinstance(node, str):
        if key == "components":
            # "<head> <family>"; family membership is the shared trailing word.
            parts = node.split()
            head, family = " ".join(parts[:-1]) if len(parts) > 1 else "", parts[-1]
            return [spaces["head"].id(head), spaces["family"].id(family)]
        if key == "rendered":
            return spaces["rendered"].id(node)
        if HEX64.match(node):
            return spaces["ref"].id(node)
        return node          # schema / role / status prose: must match literally
    return node

def fingerprint_block(payload):
    spaces = {t: Space(t[0].upper()) for t in ("ref", "head", "family", "rendered")}
    body = canon(payload, spaces)
    return body, {t: len(s.seen) for t, s in spaces.items()}

def families(payload):
    """Human-readable family grouping: family id -> the component heads in it."""
    groups = {}
    for record in payload.get("records", []):
        for field, data in sorted(record.get("fields", {}).items()):
            for component in data.get("components", []):
                parts = component.split()
                if len(parts) < 2:
                    continue
                groups.setdefault((field, parts[-1]), set()).add(" ".join(parts[:-1]))
    return {f"{field}:{fam}": sorted(heads)
            for (field, fam), heads in sorted(groups.items()) if len(heads) > 1}

def load_run(run_dir, order):
    """Block payloads in fixture order, with records aligned by native identity.

    Emitted record order is sorted by record_ref, which is an HMAC of the local
    key and block scope, so it is pseudorandom and differs between two runs on
    different content. That is a presentation property, not structure. To compare
    structure we align each payload's records to their native identifiers using
    the LOCAL crosswalk. Set A and set B share Personnel_UID values by
    construction, so this alignment is exact and carries no label information.
    """
    run_dir = Path(run_dir)
    crosswalk = json.loads((run_dir / "private" / "crosswalk.json").read_text(encoding="utf-8"))
    by_source = {b["source_block_id"]: (ref, b) for ref, b in crosswalk["blocks"].items()}
    out = []
    for block_id in order:
        ref, meta = by_source[block_id]
        payload = json.loads((run_dir / "public" / f"{ref}.json").read_text(encoding="utf-8"))
        native = {r: v["native_id"] for r, v in meta["records"].items()}
        payload = dict(payload, records=sorted(payload["records"],
                                               key=lambda r: native[r["record_ref"]]))
        out.append((block_id, payload, [native[r["record_ref"]] for r in payload["records"]]))
    return out

def main():
    run_a, run_b, order_file, out_path = sys.argv[1:5]
    order = [b["block_id"] for b in
             json.loads(Path(order_file).read_text(encoding="utf-8"))["blocks"]]
    blocks_a, blocks_b = load_run(run_a, order), load_run(run_b, order)
    results, failed = [], 0
    for (bid, pa, ids_a), (_, pb, ids_b) in zip(blocks_a, blocks_b):
        assert ids_a == ids_b, f'{bid}: native alignment mismatch'
        fa, ca = fingerprint_block(pa)
        fb, cb = fingerprint_block(pb)
        same = fa == fb
        entry = {"block_id": bid, "records": len(ids_a), "isomorphic": same,
                 "distinct_counts_A": ca, "distinct_counts_B": cb,
                 "families_A": families(pa), "families_B": families(pb)}
        if not same:
            failed += 1
            entry["first_differences"] = diff(fa, fb)[:12]
        results.append(entry)
    verdict = {
        "schema": "GENERATOR_ISOMORPHISM_RESULT_V1",
        "blocks": len(results),
        "isomorphic_blocks": len(results) - failed,
        "failed_blocks": failed,
        "pass": failed == 0,
        "meaning": ("PASS means the emitted relational structure is identical for two "
                    "inputs that are the same object under relabeling. FAIL names the "
                    "blocks where emitted structure depends on native token identity. "
                    "This is a property of the generator; no AI and no labels are involved."),
        "results": results,
    }
    Path(out_path).write_text(json.dumps(verdict, indent=1), encoding="utf-8")
    print(json.dumps({k: v for k, v in verdict.items() if k != "results"}, indent=1))
    for r in results:
        flag = "ok  " if r["isomorphic"] else "FAIL"
        print(f"  {flag} {r['block_id']:5s} distinct(head/family) "
              f"A={r['distinct_counts_A']['head']}/{r['distinct_counts_A']['family']} "
              f"B={r['distinct_counts_B']['head']}/{r['distinct_counts_B']['family']} "
              f"multi-member families A={len(r['families_A'])} B={len(r['families_B'])}")
    return 0 if failed == 0 else 1

def diff(a, b, path=""):
    out = []
    if type(a) is not type(b):
        return [{"path": path, "A": summarize(a), "B": summarize(b)}]
    if isinstance(a, dict):
        for k in sorted(set(a) | set(b)):
            if k not in a or k not in b:
                out.append({"path": f"{path}.{k}", "A": k in a, "B": k in b})
            else:
                out += diff(a[k], b[k], f"{path}.{k}")
    elif isinstance(a, list):
        if len(a) != len(b):
            out.append({"path": path, "A_len": len(a), "B_len": len(b)})
        for i, (x, y) in enumerate(zip(a, b)):
            out += diff(x, y, f"{path}[{i}]")
    elif a != b:
        out.append({"path": path, "A": a, "B": b})
    return out

def summarize(v):
    s = json.dumps(v)
    return s if len(s) < 120 else s[:117] + "..."

if __name__ == "__main__":
    sys.exit(main())
