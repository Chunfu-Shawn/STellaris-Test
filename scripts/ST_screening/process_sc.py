import os
import sys
import argparse
import logging
import json
import pandas as pd
import scanpy as sc
import warnings
warnings.filterwarnings("ignore")

logger = logging.getLogger("process_sc")
logger.setLevel(logging.INFO)
handler=logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s:%(step)s - %(levelname)s - %(message)s"))
logger.addHandler(handler)

def read_sc(count,label,key_celltype='cell_type'):

    adata = sc.read_csv(count)
    label = pd.read_csv(label,index_col=0,header=0)
    if not all(adata.obs.index == label.index):
        raise ValueError('The cell ids of count matrix and annotation are not consistent!')

    if not key_celltype in label.columns:
        raise  ValueError(key_celltype + ' is not found in annotation column names, pleas specify the column of cell type.')

    adata.obs = label

    return adata

def preprocess(adata,min_genes=200,min_mt_pct=20):
    adata.var_names_make_unique()
    adata.var["mt"] = adata.var_names.str.startswith("MT-")
    adata.var["mt"] = adata.var_names.str.startswith("mt-")
    sc.pp.calculate_qc_metrics(adata, qc_vars=["mt"], inplace=True)
    sc.pp.filter_cells(adata, min_genes=min_genes)
    adata = adata[adata.obs.pct_counts_mt < min_mt_pct,:].copy()

    sc.pp.normalize_total(adata, target_sum=10000, inplace=True)
    sc.pp.log1p(adata)

    return adata

def calculate_markers(adata,key_celltype):
    key_added = 'rank_genes_groups' + '_' + key_celltype
    sc.tl.rank_genes_groups(adata, groupby=key_celltype, method='t-test', key_added=key_added, use_raw=False)
    return adata

def extract_markers(adata,de_key='rank_genes_groups_cell_type',logfoldchange=1,pval_adj=0.01):
    marker = {}
    marker['all_genes'] = list(adata.var.index)
    groups = adata.uns[de_key]['names'].dtype.names
    for group in groups:
        de_df = sc.get.rank_genes_groups_df(adata, key=de_key,group=group)
        marker[group] = list(de_df[(de_df['logfoldchanges'] >= logfoldchange) & (de_df['pvals_adj'] >= pval_adj)]['names'])
    return marker

def main(argsv):
    parser = argparse.ArgumentParser(description="Calculate marker genes for scRNA-seq grouped by annotated cell type.")
    parser.add_argument("--count", help="Count matrix of scRNA-seq")
    parser.add_argument("--label", help="Metadata including cell type of scRNA-seq")
    parser.add_argument("--key_celltype", help="Column name of cell type",default="cell_type")
    parser.add_argument("--min_genes",type=int, help="Minimum number of genes expressed required for a cell to pass filtering",default=200)
    parser.add_argument("--max_mt_pct", type=int, help="Maximum percent of mitochondrial UMIs for a cell to pass filtering",default=20)
    parser.add_argument("--outDir",type=str,help="Path to output directory",default="./")

    args = parser.parse_args()

    #### Read data
    logger.info("Reading data...", extra={'step': 'Main'})
    adata = read_sc(args.count,args.label,key_celltype=args.key_celltype)

    #### Preprocessing
    logger.info("Preprocessing...", extra={'step': 'Main'})
    adata = preprocess(adata)

    #### Calculate marker genes
    logger.info("Calculate marker genes...", extra={'step': 'Main'})
    adata = calculate_markers(adata,key_celltype=args.key_celltype)

    #### Save results
    # h5ad
    adata.write_h5ad(os.path.join(args.outDir,'sc.h5ad'))
    # marker gene
    de_key = 'rank_genes_groups' + '_' + args.key_celltype
    markers = extract_markers(adata,de_key=de_key)
    with open(os.path.join(args.outDir,'sc_markers.json'),'w') as f:
        json.dump(markers,f)

    logger.info("All Finished!", extra={'step': 'Main'})

if __name__ == "__main__":
    import sys

    main(sys.argv)