## Script: run_tangram_mapping.py
## Description: Perform tangram mapping
## Author: Kevin Lee
## Date: 2021.12.29

import argparse
import scanpy as sc
import tangram as tg
import sys,os
import pandas as pd
import numpy as np

def warn(message):
    sys.stderr.write(message + "\n")

def runFromArgs(args):

    ## Read in ad_sc & ad_sp
    warn("Read in ad_sc and ad_sp")
    ad_sc = sc.read(args.ad_sc)
    ad_sp = sc.read(args.ad_sp)

    if args.use_raw_sc:
        ad_sc = ad_sc.raw.to_adata().copy()
    if args.use_raw_sp:
        ad_sp = ad_sp.raw.to_adata().copy()

    ## Get marker
    warn("Get marker")
    if args.marker is not None:
        marker = pd.read_csv(args.marker,header=None)
        marker = list(marker[0])
    else:
        marker = pd.DataFrame(ad_sc.uns[args.key_deg]['names']).head(args.top_n_marker)
        marker = np.array(marker).flatten().tolist()

    ## Run pp_adatas
    warn("Run pp_adatas")
    tg.pp_adatas(adata_sc=ad_sc,adata_sp=ad_sp,genes=marker)
    if not ad_sc.uns['training_genes'] == ad_sp.uns['training_genes']:
        print("Training genes in ad_sc and ad_sp are not identical!")
        sys.exit(1)

    warn("Run tangram mapping")
    ## Mapping
    if args.mode == 'cells':
        ad_map = tg.map_cells_to_space(
            adata_sc=ad_sc,
            adata_sp=ad_sp,
            device=args.device,
            mode=args.mode
        )
    else:
        ad_map = tg.map_cells_to_space(
            adata_sc=ad_sc,
            adata_sp=ad_sp,
            device=args.device,
            mode=args.mode,
            cluster_label =args.cluster_label
        )

    ## Save
    warn("Save mapping result")
    ad_map.write(args.out)

if __name__ == "__main__":
    descrition='Perform tangram mapping.'
    epilog='--key_deg and --top_n_marker only work when --marker is not set.'
    parser = argparse.ArgumentParser(description=descrition, epilog=epilog)
    parser.add_argument('--ad_sc', metavar='<ANNDATA>', default=None, help='scRNA-seq annData')
    parser.add_argument('--use_raw_sc',action='store_true',help='use .raw for ad_sc')
    parser.add_argument('--ad_sp', metavar='<ANNDATA>', default=None, help='spatial annData')
    parser.add_argument('--use_raw_sp',action='store_true',help='use .raw for ad_sp')
    parser.add_argument('--marker', metavar='<TXT>',default=None,help='marker gene in txt of single column')
    parser.add_argument('--key_deg', metavar='<STRING>', default='rank_genes_groups', help='key in uns used as DEG')
    parser.add_argument('--top_n_marker',metavar='<INT>',default=20,type= np.int32,help='top n marker gene')
    parser.add_argument('--device',metavar='<STRING>',default='cpu',help='device used for mapping')
    parser.add_argument('--mode',metavar='<STRING>',default='cells',help='tangram mapping mode')
    parser.add_argument('--out',metavar='<H5AD>',default='./ad_map.h5ad',help='file path to store ad_map')
    parser.add_argument('--cluster_label',metavar='<STRING>',default='leiden',help='cluster label for mapping in cluster mode')
    parser.set_defaults(entry_point=runFromArgs)

    if len(sys.argv) == 1:
        parser.print_help(sys.stderr)
        sys.exit(1)
    args = parser.parse_args()
    sys.exit(args.entry_point(args))
