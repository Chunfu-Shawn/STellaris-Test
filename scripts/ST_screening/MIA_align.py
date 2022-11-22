import os
import sys
import argparse
import pickle
import logging
import json
import scanpy as sc
import numpy as np
import pandas as pd
from multiprocessing import Pool, Manager
from scipy.stats import hypergeom
from MIA_utils import p_adjust_bh, hypergeom_enrichment_score
import matplotlib as mpl
import matplotlib.pyplot as plt
mpl.rcParams['xtick.labelsize'] = 4
import warnings
warnings.filterwarnings("ignore")

logger = logging.getLogger("MIA_align")
logger.setLevel(logging.INFO)
handler=logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter("%(asctime)s - %(name)s:%(step)s - %(levelname)s - %(message)s"))
logger.addHandler(handler)

def read_st_marker(st_marker_path):
    f = open(st_marker_path, 'rb')
    maker_gene_dict = pickle.load(f)
    return maker_gene_dict

def MIA(MIA_dict,section_id,st_marker,sc_marker,cluster_key='leiden1'):
    logger.info("Perform MIA for {}...".format(section_id),extra={'step':'MIA'})

    #### Prepare hypergeometric test
    sc_gene = sc_marker.pop('all_genes')
    sc_cluster = list(sc_marker.keys())

    st_gene = st_marker.pop('all_genes')
    st_marker = st_marker.pop(cluster_key)
    st_cluster = list(st_marker.keys())

    gene_universe = list(set(sc_gene).intersection(set(st_gene)))

    #### Initialize MIA matrix (cell x spot type)
    M = len(sc_cluster)
    N = len(st_cluster)
    MIA_result = pd.DataFrame(np.random.randn(M,N),index=sc_cluster,columns=st_cluster)
    MIA_result_idx = MIA_result.copy()

    #### Perform MIA
    '''
    m: Number of all genes
    n: Number of ST marker genes
    p: Number of SC marker genes
    q: Number of ST marker genes in SC marker genes (observed success)
    Then, q follows the hypergeometric distribution q ~ Hypergeometric(m,n,p)
    '''
    m = len(gene_universe)
    for i in sc_cluster:
        for j in st_cluster:
            gene_st = set(st_marker[j]).intersection(gene_universe)
            gene_sc = set(sc_marker[i]).intersection(gene_universe)
            n = len(gene_st)
            p = len(gene_sc)
            q = len(set(gene_sc).intersection(set(gene_st)))

            pval_enr = hypergeom.sf(q-1, m, p, n)
            pval_dep = hypergeom.cdf(q, m, p, n)

            pval = np.min([pval_enr,pval_dep])
            pval_idx = np.argmin([pval_enr,pval_dep])

            MIA_result.loc[i, j] = pval
            MIA_result_idx.loc[i,j] = pval_idx

    #### pval correction
    # Flatten MIA_result
    MIA_pval_list = []
    MIA_pval_idx_list = []
    for i in range(len(MIA_result.values)):
        MIA_pval_list = MIA_pval_list + MIA_result.values[i].tolist()
        MIA_pval_idx_list = MIA_pval_idx_list + MIA_result_idx.values[i].tolist()
    ## Correction
    MIA_qval_list = p_adjust_bh(MIA_pval_list)

    #### Calculate enrichment score (-log10 qvalue, enrichment- and depletion-aware)
    MIA_enrichment_score_list = hypergeom_enrichment_score(MIA_qval_list,MIA_pval_idx_list)
    # list to df
    col_num = len(MIA_result.columns)
    MIA_enrichment_score = pd.DataFrame(list(zip(*(iter(MIA_enrichment_score_list),)*col_num)))
    MIA_enrichment_score.columns = MIA_result.columns
    MIA_enrichment_score.index = MIA_result.index

    #### Summarized enrichment score
    MIA_dict[section_id] = np.mean(MIA_enrichment_score.max(axis=1))
    logger.info("MIA Finished for {}...".format(section_id), extra={'step': 'MIA'})

def MIA_multiprocess(st_marker_dict,sc_marker,cluster_key='leiden1',n_threads=30):
    MIA_dict = Manager().dict()

    pool = Pool(processes=n_threads)
    for key in st_marker_dict.keys():
        pool.apply_async(MIA,args=(MIA_dict,key,st_marker_dict[key],sc_marker,cluster_key))
    pool.close()
    pool.join()

    return MIA_dict

def main(argsv):
    parser = argparse.ArgumentParser(description="Prepare a dataset for cirrocumulus server.")
    parser.add_argument("--dataset", help="A list of ST datasets for MIA (allowed to be duplicated if one dataset containing mulitple sections)",nargs="+")
    parser.add_argument("--section", help="A list of sections corresponding to ST datasets",nargs="+")
    parser.add_argument("--cluster_key", help="The key of ST clusters for identifying marker genes",default="leiden1",choices=["leiden0.5","leiden1","leiden1.5","leiden2"])
    parser.add_argument("--st_dir", help="The directory to access ST marker genes. Default: current work directory",default="./")
    parser.add_argument("--sc_path", help="The path to scRNA-seq marker genes in json format")
    parser.add_argument("--n_threads", type=int, help="Number of threads",default=30)
    parser.add_argument("--outDir",type=str,help="Path to output directory",default="./")

    args = parser.parse_args()

    #### Read data
    logger.info("Reading data...",extra={'step':'Main'})

    print("Reading st marker genes...")
    st_marker_paths = dict(map(lambda x: ('|'.join([x[0],x[1]]), os.path.join(args.st_dir,x[0],x[1],'.'.join([x[1],'maker_gene.pkl']))),zip(args.dataset,args.section)))
    st_marker_dict = {}
    for section,path in st_marker_paths.items():
        st_marker_dict[section] = read_st_marker(path)

    print("Reading sc marker genes...")
    with open(args.sc_path,'r') as f:
        sc_marker = json.load(f)

    #### Perform MIA
    logger.info("Performing MIA...",extra={'step':'Main'})
    MIA_dict = MIA_multiprocess(st_marker_dict=st_marker_dict,
                     sc_marker=sc_marker,
                     cluster_key=args.cluster_key,
                     n_threads=30)

    #### Save results
    logger.info("Save MIA results...",extra={'step':'Main'})
    # dict to dataframe
    MIA_df = pd.DataFrame.from_dict(MIA_dict,orient='index',columns=['enrichment_score'])
    MIA_df.sort_values(by=['enrichment_score'],inplace=True,ascending=False)

    # plot
    fig = plt.figure(figsize=(15, 5))
    plt.bar(MIA_df.index, MIA_df['enrichment_score'], width=0.4)
    plt.xticks(rotation=30, ha='right')
    plt.savefig(os.path.join(args.outDir,"MIA.pdf"), format="pdf", bbox_inches="tight")

    # save json
    MIA_json = {
        'section_id':list(MIA_df.index),
        'enrichment_score':list(MIA_df['enrichment_score'])
    }

    with open(os.path.join(args.outDir,'MIA.json'),'w') as out:
        json.dump(MIA_json,out)

    logger.info("All Finished!", extra={'step': 'Main'})

if __name__ == "__main__":
    import sys

    main(sys.argv)