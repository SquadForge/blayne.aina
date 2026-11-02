"""Relation-preservation audit: is a native token relation visible in the fiction?

The isomorphism test asks whether relabeling changes the output. This asks the
complementary question: of the relations that actually exist between native
tokens, which ones the emitted fiction lets a reader see at all.

A relation is REPRESENTED when the two fictional components share a family
(their trailing word), or are identical. A relation is DROPPED when the two
fictional components are unrelated strings, so a reader of the fiction cannot
tell the two native tokens were near-variants.

Kalani's premise is about relations, not about specific words: the same relation
at length 4 must be represented the same way as at length 7. Length is a property
of the native token, not of the relation between two of them.

Reads the local crosswalk and the local native input. Reads no labels and makes
no identity decision.
"""
import json, sys
from pathlib import Path

def edit_ops(a, b):
    """Classify a,b as 'equal', 'sub1', 'del1', 'transpose', 'prefix', or 'other'."""
    if a == b:
        return "equal"
    if len(a) == len(b):
        diffs = [i for i, (x, y) in enumerate(zip(a, b)) if x != y]
        if len(diffs) == 1:
            return "sub1"
        if len(diffs) == 2 and diffs[1] == diffs[0] + 1 \
           and a[diffs[0]] == b[diffs[1]] and a[diffs[1]] == b[diffs[0]]:
            return "transpose"
    if abs(len(a) - len(b)) == 1:
        long, short = (a, b) if len(a) > len(b) else (b, a)
        for i in range(len(long)):
            if long[:i] + long[i + 1:] == short:
                return "del1"
    if a.startswith(b) or b.startswith(a):
        return "prefix"
    return "other"

def family(component):
    parts = component.split()
    return parts[-1] if len(parts) > 1 else component

def head(component):
    parts = component.split()
    return " ".join(parts[:-1]) if len(parts) > 1 else component

def audit(run_dir, input_path, order):
    run_dir = Path(run_dir)
    records = {r["Personnel_UID"]: r for r in json.loads(Path(input_path).read_text(encoding="utf-8"))}
    crosswalk = json.loads((run_dir / "private" / "crosswalk.json").read_text(encoding="utf-8"))
    by_source = {b["source_block_id"]: (ref, b) for ref, b in crosswalk["blocks"].items()}
    NS = {"First_Name": "person", "Last_Name": "person"}
    rows = []
    for block_id in order:
        ref, meta = by_source[block_id]
        payload = json.loads((run_dir / "public" / f"{ref}.json").read_text(encoding="utf-8"))
        native_of = {r: v["native_id"] for r, v in meta["records"].items()}
        # native token -> emitted component, per namespace, within this block
        mapping, seen = {}, {}
        for row in payload["records"]:
            nid = native_of[row["record_ref"]]
            for field, data in row["fields"].items():
                value = records[nid].get(field)
                if not isinstance(value, str) or not value:
                    continue
                ns = NS.get(field, field)
                toks = value.lower().split()
                if len(toks) != len(data["components"]):
                    continue                      # street aliasing etc.; skip
                for tok, comp in zip(toks, data["components"]):
                    mapping[(ns, tok)] = comp
                    seen.setdefault(ns, set()).add(tok)
        for ns, toks in seen.items():
            toks = sorted(toks)
            for i, a in enumerate(toks):
                for b in toks[i + 1:]:
                    rel = edit_ops(a, b)
                    if rel == "other":
                        continue
                    ca, cb = mapping[(ns, a)], mapping[(ns, b)]
                    # A family edge is only meaningful between alphabetic tokens of
                    # at least three characters. Numeric tokens are house numbers and
                    # similar: 640 and 641 are different addresses, not variants, so
                    # NOT relating them is correct behaviour, not a dropped relation.
                    eligible = (a.isalpha() and b.isalpha()
                                and min(len(a), len(b)) >= 3)
                    rows.append({
                        "block_id": block_id, "namespace": ns,
                        "native": [a, b], "relation": rel,
                        "lengths": [len(a), len(b)], "min_length": min(len(a), len(b)),
                        "fiction": [ca, cb],
                        "eligible": eligible,
                        "represented": ca == cb or family(ca) == family(cb),
                        # what a reader of the fiction alone would call the relation
                        "fiction_relation": ("equal" if ca == cb
                                             else edit_ops(head(ca), head(cb))
                                             if family(ca) == family(cb) else "unrelated"),
                    })
    return rows

def main():
    run_dir, input_path, order_file, out_path = sys.argv[1:5]
    order = [b["block_id"] for b in
             json.loads(Path(order_file).read_text(encoding="utf-8"))["blocks"]]
    rows = audit(run_dir, input_path, order)
    by_rel = {}
    for r in rows:
        if not r["eligible"]:
            continue
        k = r["relation"]
        d = by_rel.setdefault(k, {"total": 0, "represented": 0, "relation_preserved": 0,
                                  "dropped_min_lengths": [], "fiction_relations": {}})
        d["total"] += 1
        d["fiction_relations"][r["fiction_relation"]] = \
            d["fiction_relations"].get(r["fiction_relation"], 0) + 1
        if r["represented"]:
            d["represented"] += 1
        else:
            d["dropped_min_lengths"].append(r["min_length"])
        if r["fiction_relation"] == r["relation"]:
            d["relation_preserved"] += 1
    out = {"schema": "RELATION_PRESERVATION_AUDIT_V1",
           "native_relations_found": len(rows),
           "eligible_relations": sum(1 for r in rows if r["eligible"]),
           "excluded_non_alphabetic_or_short": sum(1 for r in rows if not r["eligible"]),
           "by_relation": by_rel,
           "detail": rows,
           "relation_preserved_total": sum(1 for r in rows
                                           if r["eligible"] and r["fiction_relation"] == r["relation"]),
           "meaning": ("represented=true means a reader of the fiction alone can see the two "
                       "native tokens are related, because the components are identical or "
                       "share a family. dropped means the relation is invisible in the fiction. "
                       "Length is a property of a token, not of the relation between two of them. "
                       "relation_preserved counts the pairs where a reader of the fiction alone "
                       "would name the SAME relation the native tokens actually have.")}
    Path(out_path).write_text(json.dumps(out, indent=1), encoding="utf-8")
    print(json.dumps({k: v for k, v in out.items() if k != "detail"}, indent=1))
    print("\n  native     min_len  represented  fiction says   tokens")
    for r in sorted(rows, key=lambda r: (r["relation"], r["min_length"])):
        if r["relation"] in ("sub1", "del1", "transpose", "prefix"):
            mark = "==" if r["fiction_relation"] == r["relation"] else "!="
            print(f"   {r['relation']:9s} {r['min_length']:5d}    "
                  f"{'yes' if r['represented'] else 'NO ':10s} {mark} {r['fiction_relation']:10s} {r['native']}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
