import numpy as np

def p_adjust_bh(p):
    """Benjamini-Hochberg p-value correction for multiple hypothesis testing."""
    p = np.asfarray(p)
    by_descend = p.argsort()[::-1]
    by_orig = by_descend.argsort()
    steps = float(len(p)) / np.arange(len(p), 0, -1)
    q = np.minimum(1, np.minimum.accumulate(steps * p[by_descend]))
    return q[by_orig]

def hypergeom_enrichment_score(pval_list,pval_idx):
    enrichment_score = [-np.log10(i[0]) if i[1] == 0 else np.log10(i[0]) for i in zip(pval_list,pval_idx)]

    # Replace infinite with max/min if exists
    enr_max = np.max([i for i in enrichment_score if np.isfinite(i)])
    enr_min = np.max([i for i in enrichment_score if np.isfinite(i)])
    enrichment_score = [i if np.isfinite(i) else enr_max if i > 0 else enr_min for i in enrichment_score]

    return enrichment_score

def hypergeom_enrichment_score_deprecated(pval_list):
    enrichment_score = []
    for i in range(len(pval_list)):
        enr = -np.log10(pval_list[i])
        dep = -np.log10(1-pval_list[i])
        if enr<dep :
            enrichment_score.append(-dep)
        else:
            enrichment_score.append(enr)
        return enrichment_score
