## Script: data_preprocessing.py
## Description: Perform scRNA-seq preprocessing
## Author: Chunfu Shawn
## Date: 2022.9.26

import scanpy as sc
import matplotlib.pyplot as plt


def preprocessing(rid, raw_path):
    # 用于存储分析结果文件的路径
    results_file = rid + '.h5ad'
    # 载入文件
    # 文件下面要有3个初始文件包括：
    # barcodes,genes,matrix
    adata = sc.read_10x_mtx(
        raw_path,  # mtx 文件目录
        var_names='gene_symbols',  # 使用 gene_symbols 作为变量名
        cache=True)  # 写入缓存，可以更快的读取文件
    adata.var_names_make_unique()
    n_cells = adata.obs.shape  # 细胞数
    n_genes = adata.var.shape  # 基因数
    sc.pp.filter_cells(adata, min_genes=200)  # 每一个细胞至少表达200个基因
    sc.pp.filter_genes(adata, min_cells=3)  # 每一个基因至少在3个细胞中表达
    # 抽取带有MT的字符串
    adata.var['mt'] = adata.var_names.str.startswith('MT-')
    # 数据过滤
    sc.pp.calculate_qc_metrics(adata, qc_vars=['mt'], percent_top=None, log1p=False, inplace=True)
    # 过滤后可视化，并保存到工作目录下
    sc.pl.violin(adata, ['n_genes_by_counts'], jitter=0.4, save='n_genes_by_counts_violin.svg')
    sc.pl.violin(adata, ['total_counts'], jitter=0.4, save='total_counts_violin.svg')
    sc.pl.violin(adata, ['pct_counts_mt'], jitter=0.4, save='pct_counts_mt_violin.svg')

    # NormalizeData
    sc.pp.normalize_total(adata, target_sum=1e4)  # 不要和log顺序搞反了 ，这个是去文库的
    sc.pp.log1p(adata)
    sc.pp.highly_variable_genes(adata, min_mean=0.0125, max_mean=3, min_disp=0.5)

    # 保存一下原始数据
    adata.raw = adata
    # 提取高变基因
    adata = adata[:, adata.var.highly_variable]
    # 过滤掉没用的东西
    sc.pp.regress_out(adata, ['total_counts', 'pct_counts_mt'])
    # 中心化
    sc.pp.scale(adata, max_value=10)
    # pca
    sc.tl.pca(adata, svd_solver='arpack')
    # 构建图
    sc.pp.neighbors(adata, n_neighbors=10, n_pcs=40)
    # umap
    sc.tl.umap(adata)
    # leiden 聚类
    sc.tl.leiden(adata)
    # 绘图
    sc.pl.pca(adata, color=['leiden'], save='pca.svg')
    sc.pl.umap(adata, color=['leiden'], save='umap.svg')
    # 输出结果
    adata.write(results_file)
    return adata
