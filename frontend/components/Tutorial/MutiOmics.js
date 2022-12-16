import React from "react";
import Image from "next/image";
import {Breadcrumb, Typography} from "antd";
import {contentStyle} from "../Help/SiderStaticMenu";
//import data from './spatialMultiomics_paired-tag.html'

export default function MutiOmics(){
    return(
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
                <Breadcrumb.Item>Expanded application</Breadcrumb.Item>
            </Breadcrumb>
            <style jsx>{`
              pre {
                font-size: 12px;
              }

              .result {
                font-size: 12px;
              }

              .warning {
                padding: 5px;
                background-color: rgba(248, 213, 213, 0.76);
              }
            `}</style>
            <a id={"MutiOmics"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h3>Expanded application: single-cell mutliomics data</h3>
                <h4>Overview</h4>
                <p>In this tutorial, we will showcase an expanded application of STellaris with respect to single-cell
                    multiomics data. It&apos;s based on an obvious assumption that when we map a single cell to its spatial
                    location based on transcriptome similarity, we also map other omics data for the same cell incidently.</p>
                <p>
                    Here, we use a single-cell multiomics data derived from adult mouse frontal cortex and hippocampus using
                    Paired-Tag technology (
                    <a target={"_blank"} href={"https://doi.org/10.1038/s41592-021-01060-3"} rel={"noreferrer"}>
                        https://doi.org/10.1038/s41592-021-01060-3
                    </a>), which is composed of transcriptome and H3K4me3 epigenomic data jointly profiled in single cells.
                </p>
                <p>
                    We first used STellaris to perform mapping of spatial locations of single cells based on the transcriptome
                    similarity between scRNA-seq and the best match ST section, and characterized the H3K4me3 histone
                    modification at a spatial context. Then, we compared the spatial signature of H3K4me3 histone modification
                    with that profiled by epigenomic MERFISH (
                    <a target={"_blank"} href={"https://doi.org/10.1016/j.cell.2022.09.035"} rel={"noreferrer"}>
                        https://doi.org/10.1016/j.cell.2022.09.035
                    </a>), a recent reported method that enables spatially resolved single-cell epginomic profiling in complex tissues.
                </p>
                <p>
                    We found that the distribution characteristics of H3K4me3 histone modification constructed using spatial
                    mapping strategy can nicely recapitulate that directly profiled by epigenomic MERFISH, which demonstrated
                    the feasibility of STellaris in single-cell multiomics data to charaterize gene regulatory mechanisim at
                    a spatial context.
                </p>
                <h4>Data</h4>
                <h5>Paired-Tag data</h5>
                <p>The raw data of joint profiling of transcriptome and H3K4me histone modification in single cells can be
                    downloaded here. We also provide raw data we used in this tutorial, please download it here.</p>
                <h5>Spatial mapping results</h5>
                <p>The spatial mapping result page of scRNA-seq from Paired-Tag data using STellaris can be found here, and
                    the registered scRNA-seq data in h5ad format can be downloaded here.</p>
                <h5>MERFISH data</h5>
                <p>
                    The genomic regions of active promoters for 127 genes marked by H3K4me3 histone modification examined in
                    epigenomic MERFISH can be downloaded here.
                </p>
                <h4>Spatial mapping based on scRNA-seq</h4>
                <pre>
                    import scanpy as sc<br/>
                    import snapatac2 as snap<br/>
                    import numpy as np<br/>
                    import pandas as pd<br/>
                    from scipy.spatial import ConvexHull<br/>
                    import matplotlib<br/>
                    import matplotlib.pyplot as plt<br/>
                    import re
                </pre>
                <p>Read registered scRNA-seq using STellaris, and change cell ids back to the initial. The screenshot of
                    STellaris result page looks like:</p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/mapping/mutiomics1.png"} width={600} height={350}
                           alt={"counts_matrix_example"}/>
                </div>
                <pre>adata_sc = sc.read_h5ad('./data/public/results/20221212/ac970aa0-79fd-11ed-968c-79eb53139108/sc_registered.h5ad')</pre>
                <pre>adata_sc.obs.index = [ re.sub('\\.',':',re.sub('X','',id)) for id in adata_sc.obs.index] </pre>
                <pre>adata_sc</pre>
                <div className={"result"}>
                    AnnData object with n_obs × n_vars = 2600 × 52781<br/>
                    &emsp;obs: 'orig.ident', 'nCount_RNA', 'nFeature_RNA', 'cell_type', 'percent.mt', 'id', 'id_new', 'id_st',
                    'dist', 'x', 'y', 'x_noise', 'y_noise'<br/>
                    &emsp;var: 'name'<br/>
                    &emsp;obsm: 'spatial'
                </div>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/mapping/mutiomics2.png"} width={580} height={250}
                           alt={"counts_matrix_example"}/>
                </div>
                <h4>Basic single-cell H3K4me3 epigenomics analysis using SnapATAC2</h4>
                <h5>Prepare single-cell H3K4me3 epigenomic data</h5>
                <p>Read H3K4me3 epigenomic data from Paired-Tag multiomics data</p>
                <pre>
                    adata_h3k4me3 = sc.read_10x_mtx('./data/h3k4me3_03_filtered_matrix/')
                </pre>
                <p>Subset cells surviving mapping in scRNA-seq</p>
                <pre>
                    adata_h3k4me3 = adata_h3k4me3[adata_h3k4me3.obs.index.isin(adata_sc.obs.index)].copy()
                </pre>
                <h5>Prepare SnapATAC2 input data</h5>
                <p>SnapATAC2 requires input in bed format, so we will convert count matrix to bed and re-read it.</p>
                <pre>
                    counts = pd.DataFrame(adata_h3k4me3.X.toarray(),index=adata_h3k4me3.obs_names,columns=adata_h3k4me3.var_names)<br/>
                    counts= counts.astype('int32')
                </pre>
                <pre>
                    %%time<br/>
                    counts.reset_index(names='cells',inplace=True)<br/>
                    counts1 = counts.melt(id_vars='cells',var_name='intervals',value_name='counts')
                </pre>
                <div className={"result"}>
                    CPU times: user 1min 10s, sys: 1min 8s, total: 2min 19s<br/>
                    Wall time: 2min 19s
                </div>
                <pre>counts2 = counts1.loc[counts1.counts != 0,:]</pre>
                <pre>
                    {`%%time
    counts3 = pd.DataFrame({
              'chr':counts2['intervals'].str.split(':').str[0],
              'spos':counts2['intervals'].str.split(':').str[1].str.split('-').str[0],
              'epos':counts2['intervals'].str.split(':').str[1].str.split('-').str[1],
              'cells':counts2['cells'],
              'counts':counts2['counts']
    })`}
                </pre>
                <div className={"result"}>
                    CPU times: user 15.4 s, sys: 760 ms, total: 16.1 s<br/>
                    Wall time: 16.1 s
                </div>
                <pre>
                    # Sort by genomic loci<br/>
                    counts3.sort_values('cells',inplace=True)
                </pre>
                <pre>
                    counts3.to_csv('paired-tag_h3k4me3.filtered.bed',sep='\t',header=False,index=False)
                </pre>
                <p>Re-read h3k4me3 epigenomics data from bed</p>
                <pre>{
    `adata_h3k4me3 = snap.pp.import_data(
        'paired-tag_h3k4me3.filtered.bed',
        genome=snap.genome.mm10,
        file="paired-tag_h3k4me3.filtered.h5ad",
        sorted_by_barcode=True,
    )`
                    }</pre>
                    <pre>adata_h3k4me3</pre>
                    <div className={"result"}>
                        AnnData object with n_obs x n_vars = 2468 x 0 backed at 'paired-tag_h3k4me3.filtered.h5ad'<br/>
                        &emsp;obs: 'tsse', 'n_fragment', 'frac_dup', 'frac_mito'<br/>
                        &emsp;uns: 'reference_sequences'<br/>
                        &emsp;obsm: 'insertion'
                    </div>
                <h5>SnapATAC2 analysis</h5>
                <p>Perform basic preprocessing using SnapATAC2</p>
                <pre>{
     `# Basic preprocessing
    snap.pl.tsse(adata_h3k4me3, interactive=False)
    snap.pp.filter_cells(adata_h3k4me3, min_counts=4, min_tsse=2, max_counts=3000)
    snap.pp.add_tile_matrix(adata_h3k4me3)
    snap.pp.select_features(adata_h3k4me3)
    snap.pp.scrublet(adata_h3k4me3)
    snap.pp.call_doublets(adata_h3k4me3)
    snap.pl.scrublet(adata_h3k4me3, interactive=False)
    adata_h3k4me3.subset(~adata_h3k4me3.obs["is_doublet"])
    `
                    }</pre>
                <div className={"result warning"}>
                    2022-12-16 18:57:56 - INFO - Simulating doublets...<br/>
                    2022-12-16 18:57:57 - INFO - Spectral embedding ...<br/>
                    2022-12-16 18:58:00 - INFO - Calculating doublet scores...
                </div>
                <pre>adata_h3k4me3</pre>
                <div className={"result"}>
                    AnnData object with n_obs x n_vars = 2384 x 5451055 backed at 'paired-tag_h3k4me3.filtered.h5ad'<br/>
                    &emsp;obs: 'tsse', 'n_fragment', 'frac_dup', 'frac_mito', 'doublet_score', 'is_doublet'<br/>
                    &emsp;var: 'selected'<br/>
                    &emsp;uns: 'scrublet_threshold', 'scrublet_sim_doublet_score', 'reference_sequences'<br/>
                    &emsp;obsm: 'insertion'
                </div>
                <h4>Build spatial map of H3K4me3 for active promoters examined in epigenomic MERFISH</h4>
                <h5>Spatial annotation of single-cell H3K4me3 epigenomic data</h5>
                <pre>{
                    `# Add spatial coordinate to single-cell H3K4me3 data
    adata_h3k4me3.obs['x_noise'] = adata_sc.obs.loc[adata_h3k4me3.obs_names,'x_noise']
    adata_h3k4me3.obs['y_noise'] = adata_sc.obs.loc[adata_h3k4me3.obs_names,'y_noise']
    adata_h3k4me3.obsm['spatial'] = adata_sc.obsm['spatial'][[list(adata_sc.obs_names).index(i) for i in adata_h3k4me3.obs_names], :]
    # Add cell type to single-cell H3K4me3 data
    adata_h3k4me3.obs['cell_type'] = adata_sc.obs.loc[adata_h3k4me3.obs_names,'cell_type']`
                }</pre>
                <pre>adata_h3k4me3</pre>
                <div className={"result"}>
                    AnnData object with n_obs x n_vars = 2384 x 5451055 backed at 'paired-tag_h3k4me3.filtered.h5ad'<br/>
                    &emsp;obs: 'tsse', 'n_fragment', 'frac_dup', 'frac_mito', 'doublet_score', 'is_doublet', 'x_noise', 'y_noise', 'cell_type'<br/>
                    &emsp;var: 'selected'<br/>
                    &emsp;uns: 'scrublet_threshold', 'scrublet_sim_doublet_score', 'reference_sequences'<br/>
                    &emsp;obsm: 'insertion', 'spatial'
                </div>
                <h5>Create cell-by-promoter matrix</h5>
                <p>Read 127 genomic regions of active promoter in epigenomic MERFISH</p>
                <pre>
                    h3k4me3_df = pd.read_table('./data/merfish_h3k4me3.bed',names=['chr','spos','epos','gene'])
                </pre>
                <pre>h3k4me3_df</pre>
                <Image src={"/images/tutorial/mapping/table1.png"} width={300} height={350}
                       alt={"table1"}/>
                <pre>peak_list = [i+':'+str(j)+'-'+str(z) for i,j,z in zip(h3k4me3_df['chr'],h3k4me3_df['spos'],h3k4me3_df['epos'])]</pre>
                <pre>peak_list</pre>
                <div className={"result"}>
                ['chr1:4495897-4497608',
                'chr1:19102291-19111666',
                'chr1:56967534-56974652',
                'chr1:69104151-69108917',
                'chr1:75276812-75278734',
                'chr1:89927107-89933098', ...]
                </div>
                <p>Create cell-by-promoter count matrix</p>
                <pre>adata_h3k4me3_merfish = snap.pp.make_peak_matrix(adata_h3k4me3,use_rep=peak_list, file="paired-tag_h3k4me3.merfish_peak.h5ad")</pre>
                <pre># Assign lost cell ids<br/>
                    adata_h3k4me3_merfish.obs_names = adata_h3k4me3.obs_names<br/>
                    # Assign gene names<br/>
                    adata_h3k4me3_merfish.var['peaks'] = adata_h3k4me3_merfish.var_names<br/>
                    adata_h3k4me3_merfish.var_names = h3k4me3_df['gene']<br/>
                    # Assign lost spatial cooridinate<br/>
                    adata_h3k4me3_merfish.obsm['spatial'] = adata_h3k4me3.obsm['spatial']
                </pre>
                <pre>adata_h3k4me3_merfish</pre>
                <div className={"result"}>
                    AnnData object with n_obs x n_vars = 2384 x 127 backed at 'paired-tag_h3k4me3.merfish_peak.h5ad'<br/>
                    &emsp;obs: 'tsse', 'n_fragment', 'frac_dup', 'frac_mito', 'doublet_score', 'is_doublet', 'x_noise', 'y_noise', 'cell_type'<br/>
                    &emsp;var: 'peaks'<br/>
                    &emsp;obsm: 'spatial'
                </div>
                <p>Save and re-read using scanpy for better manipulation</p>
                <pre>
                    adata_h3k4me3_merfish.write('./paired-tag_h3k4me3.merfish_peak.scanpy.h5ad')<br/>
                    adata_h3k4me3_merfish = sc.read_h5ad('paired-tag_h3k4me3.merfish_peak.scanpy.h5ad')<br/>
                </pre>
                <pre>
                    adata_h3k4me3_merfish
                </pre>
                <div className={"result"}>
                    AnnData object with n_obs × n_vars = 2384 × 127<br/>
                    &emsp;obs: 'tsse', 'n_fragment', 'frac_dup', 'frac_mito', 'doublet_score', 'is_doublet', 'x_noise', 'y_noise', 'cell_type'<br/>
                    &emsp;var: 'peaks'<br/>
                    &emsp;obsm: 'spatial'
                </div>
                <p>Perform normalization</p>
                <pre>
                    # Normalize <br/>
                    sc.pp.normalize_total(adata_h3k4me3_merfish)<br/>
                    sc.pp.log1p(adata_h3k4me3_merfish)
                </pre>
                <div className={"result warning"}>
                    /home/user/BGM/uplee/anaconda3/envs/spatialWeb/lib/python3.10/site-packages/scanpy/preprocessing/_normalization.py:197: UserWarning:<br/>
                    Some cells have zero counts
                </div>
                <pre>adata_h3k4me3_merfish</pre>
                <div className={"result"}>
                    AnnData object with n_obs × n_vars = 2384 × 127<br/>
                    &emsp;obs: 'tsse', 'n_fragment', 'frac_dup', 'frac_mito', 'doublet_score', 'is_doublet', 'x_noise', 'y_noise', 'cell_type'<br/>
                    &emsp;var: 'peaks'<br/>
                    &emsp;uns: 'log1p'<br/>
                    &emsp;obsm: 'spatial'
                </div>
                <h4>Comparison between H3K4me3 signals and spatial patterns of their corresponding gene expression</h4>
                <p>Here we compare the spatial distribution of H3K4me3 signals in active promoters with spatial patterns of
                    their corresponding gene expression. We found that although the H3K4me3 signals are sparse, their layer
                    enrichment patterns are largely similar with that in scRNA-seq.</p>
                <pre>
                    # Bcl11b promoter - h3k4me3 signal<br/>
                    sc.pl.spatial(adata_h3k4me3_merfish,color=['Bcl11b','Foxp2','Rorb'],spot_size=50,ncols=3)<br/>
                    # Bcl11b - single-cell gene expression<br/>
                    sc.pl.spatial(adata_sc,color=['Bcl11b','Foxp2','Rorb'],spot_size=50,ncols=3)
                </pre>
                <Image src={"/images/tutorial/mapping/mutiomics3.png"} width={800} height={200}
                       alt={"mutiomics3"}/>
                <Image src={"/images/tutorial/mapping/mutiomics4.png"} width={800} height={200}
                       alt={"mutiomics4"}/>
                <h4>Compare the spatial pattern of H3K4me3 with epigenomic MERFISH</h4>
                <p>We compared the spatial map of H3K4me3 signals constructed using STellaris with epigenomic MERFISH, which
                    directly profiles H3K4me3 pattern in situ.</p>
                <p>Here we focused on cortical region and found that layer enrichment measured by our results are largely
                    consistent with epigenomic MERFISH, which demonstrated the feasibility of STellaris in single-cell multiomics
                    data to charaterize gene regulatory mechanisim at a spatial context.</p>
                <h5>Extract cerebral cortex region</h5>
                <p>First, extract cortex using polynomial regression</p>
                <pre>
                    spots = adata_h3k4me3_merfish.obsm['spatial']<br/>
                    hull = ConvexHull(spots)<br/>
                    hull_x = spots[hull.vertices,0]<br/>
                    hull_y = spots[hull.vertices,1]<br/>
                    hull_x_cortex = spots[list(hull.vertices[13:]),0]<br/>
                    hull_y_cortex = spots[list(hull.vertices[13:]),1]<br/>
                    fig, ax = plt.subplots(figsize=(7,7))<br/>
                    ax.scatter(hull_x, hull_y)<br/>
                    ax.scatter(hull_x_cortex, hull_y_cortex)<br/>
                    fig.show()
                </pre>
                <Image src={"/images/tutorial/mapping/mutiomics5.png"} width={300} height={300}
                       alt={"mutiomics5"}/>
                <pre>
                    # fit polynomial<br/>
                    z = np.polyfit(hull_x_cortex, hull_y_cortex, 2)<br/>
                    p1 = np.poly1d(z)
                </pre>
                <pre>
                    # visualization<br/>
                    plt.plot(spots[:,0], spots[:,1], 'o')<br/>
                    p2 = p1-900<br/>
                    y_pred1 = p1(list(range(1000,4000,100)))<br/>
                    y_pred2 = p2(list(range(1000,4000,100)))<br/>
                    plot1 = plt.plot(list(range(1000,4000,100)), y_pred1, label='upper layer',color='orange')<br/>
                    plot2 = plt.plot(list(range(1000,4000,100)), y_pred2, label='deep layer',color='red')<br/>
                    plt.title('')<br/>
                    plt.xlabel('')<br/>
                    plt.ylabel('')<br/>
                    plt.legend(loc=3,borderaxespad=0,bbox_to_anchor=(0,0))<br/>
                    plt.show()
                </pre>
                <Image src={"/images/tutorial/mapping/mutiomics6.png"} width={400} height={250}
                       alt={"mutiomics6"}/>
                <pre>{
    `# Extract cells belonging to cortex
    x_all = spots[:,0]
    y_all = spots[:,1]
    cells_all = adata_h3k4me3_merfish.obs_names
    x_keep = []
    y_keep = []
    cells_keep = []
    for i,j,z in zip(x_all,y_all,cells_all):
        if p2(i)&lt;j:
                    x_keep.append(i)
            y_keep.append(j)
            cells_keep.append(z)
        else:
            continue
    plt.plot(x_keep, y_keep, 'o')
    plot1 = plt.plot(list(range(1000,4000,100)), y_pred1, label='upper layer',color='orange')
    plot2 = plt.plot(list(range(1000,4000,100)), y_pred2, label='deep layer',color='red')
    plt.title('')
    plt.xlabel('')
    plt.ylabel('')
    plt.legend(loc=3,borderaxespad=0,bbox_to_anchor=(0,0))
    plt.axis('scaled')
    plt.show()`
                }</pre>
                <Image src={"/images/tutorial/mapping/mutiomics7.png"} width={400} height={230}
                       alt={"mutiomics7"}/>
                <pre>
                    adata_h3k4me3_merfish = adata_h3k4me3_merfish[adata_h3k4me3_merfish.obs_names.isin(cells_keep)].copy()
                </pre>
                <pre>
                    adata_sc = adata_sc[adata_sc.obs_names.isin(cells_keep)].copy()
                </pre>
                <h5>Distribution of H3K4me3 signals along radial axis of cortex</h5>
                <p>Here we will assess the spatial distributions of layer-enriched active promoters interrogated in
                    epigenomic MERFISH paper.</p>
                <p>For each layer-specific promoters in MERFISH, We summarise the spatial distribution of H3K4me3 histone
                    modification as the minimum distance of H3K4me3 centroid to the surface of cortex. It is expected that
                    upper layer H3K4me3 loci have lower distance values.</p>
                <p>The layer distriubiton of 38 H3K4me3 loci from epigenomic MERFISH paper
                    (<a target={"_blank"} href={"https://doi.org/10.1016/j.cell.2022.09.035"} rel={"noreferrer"}>
                        https://doi.org/10.1016/j.cell.2022.09.035
                    </a>) is shown below:</p>
                <Image src={"/images/tutorial/mapping/mutiomics8.png"} width={400} height={500}
                       alt={"mutiomics8"}/>
                <pre>{
                    `def max_min_norm(gene_exp):
        max_l = max(gene_exp)
        min_l = min(gene_exp)
        gene_exp_norm = [((i-min_l)/(max_l-min_l))*2 for i in gene_exp]
        return gene_exp_norm`
                }</pre>
                <pre>{
                    `## Find centroid
    def get_centroid(adata, gene_name, x_keep, y_keep, if_plot=True, if_norm=True):
        if if_norm:
            adata_norm = adata.copy()
            sc.pp.normalize_total(adata_norm)
            sc.pp.log1p(adata_norm)
        else:
            adata_norm = adata.copy()
        gene_exp = adata_norm[:,gene_name].X.toarray()[:,0]
        #gene_exp = max_min_norm(gene_exp)
        x_tmp = []
        for n in range(len(x_keep)):
            x_tmp.append(x_keep[n]*gene_exp[n])
        x_mean = np.sum(x_tmp)/np.sum(gene_exp)
        y_tmp = []
        for n in range(len(y_keep)):
            y_tmp.append(y_keep[n]*gene_exp[n])
        y_mean = np.sum(y_tmp)/np.sum(gene_exp)
        if if_plot:
            sc.pl.spatial(adata_norm,color=gene_name,spot_size=50)
            plt.plot(x_keep, y_keep, 'o')
            plt.scatter(x_mean,y_mean,c='r')
            pylab.title('')
            pylab.xlabel('')
            pylab.ylabel('')
            pylab.legend(loc=3, borderaxespad=0., bbox_to_anchor=(0, 0))
            pylab.show()
        else:
            pass
        return [x_mean,y_mean]`
                }</pre>
                <pre>{
                    `## Calculate the distance of centroid to the surface of cortex
    def get_dis(curve, point):
        xList = np.linspace(1000,4000,300001)
        xList = xList.tolist()
        yList = []
        for xp in xList:
            yp = curve(xp)
            yList.append(yp)
        dis_list = []
        for n in range(len(xList)):
            dis = np.sqrt((np.square(point[0]-xList[n])+np.square(point[1]-yList[n])))
            dis_list.append(dis)
        dis_min = np.min(dis_list)
        return dis_min`
                }</pre>
                <pre>{
                    `marker_genes = ['Npas1','Slc17a7','Penk','Sst','Gad2','Calb2','Chat','Cdca7','Ccdc80','Nxph4'
                    ,'Pdgfra','Reln','Cux2','Lamp5','Pou3f1','Rorb','Lhx6','Satb2','Unc5d'
                    ,'Slc17a6','Kcnj8','Car3','Slc30a3','Calb1','Osr1','Nxph1','Slc32a1','Grin3a',
                   'Fezf2','Aqp4','Vipr2','Gad1','Bcl11b','Syt6','Foxp2','Oprk1','Pdlim5','Sox10']
    dis_dic = {}
    for gene in marker_genes:
        try:
            centroid = get_centroid(adata_h3k4me3_merfish, gene_name=gene,x_keep=x_keep,y_keep=y_keep,if_plot=False)
        except:
            print('no '+gene)
            continue
        dis_dic[gene] = get_dis(curve=p1, point=centroid)
        #print(gene+': '+str(dis_dic[gene]))`
                }</pre>
                <pre>dis_dic</pre>
                <div className={"result"}>{
                    `{'Npas1': 371.8435139249171,
                     'Slc17a7': 667.9104329325937,
                     'Penk': 411.87730582356,
                     'Sst': 256.8483202012105,
                     'Gad2': 546.0870590195717,
                     'Calb2': 528.7913315333836,
                     'Chat': 522.9278973139577,
                     'Cdca7': 635.2219396220006,
                     'Ccdc80': 503.72132645051744,
                     'Nxph4': 913.8402138700891,...}`
                }</div>
                <pre>{
                    `# Candidate layer-enriched H3K4me3 loci according to epigenomic MERFISH paper
    cortex23 = []
    cortex23_list = ['Gad2','Calb2','Chat']
    for g in cortex23_list:
        cortex23.append(dis_dic[g])
    cortex4 = []
    cortex4_list = ['Pou3f1','Rorb','Lhx6','Satb2','Unc5d'
                    ,'Slc17a6','Kcnj8','Car3','Slc30a3']
    for g in cortex4_list:
        cortex4.append(dis_dic[g])
    cortex56 = []
    cortex56_list = ['Nxph1','Slc32a1',
                   'Fezf2','Bcl11b','Syt6','Foxp2','Pdlim5','Sox10']
    for g in cortex56_list:
        cortex56.append(dis_dic[g])`
                }</pre>
                <p>Now plot the distribution of the distance of centroid to cortex surface, the layer enrichment pattern
                    reported in epigenomic MERFISH is also manifested in the spatial mapping approach.</p>
                <pre>
                    plt.boxplot((cortex23,cortex4,cortex56),labels=('cortex23','cortex4','cortex56'))<br/>
                    plt.show()
                </pre>
                <h4>Modules and their versions used for this analysis</h4>
                <Image src={"/images/tutorial/mapping/mutiomics9.png"} width={400} height={260}
                       alt={"mutiomics9"}/>
                <pre>{
                    `import sys
    for module in sys.modules:
        try:
            print(module,sys.modules[module].__version__)
        except:
            try:
                if  type(modules[module].version) is str:
                    print(module,sys.modules[module].version)
                else:
                    print(module,sys.modules[module].version())
            except:
                try:
                    print(module,sys.modules[module].VERSION)
                except:
                    pass`
                }</pre>
                <pre style={{backgroundColor:"transparent",
                    borderColor:"transparent",
                    overflow:"scroll",
                height:600}}>{
                    `re 2.2.1
    ipykernel._version 6.9.1
    json 2.0.9
    jupyter_client._version 7.2.2
    traitlets._version 5.1.1
    traitlets 5.1.1
    logging 0.5.1.2
    platform 1.0.8
    _ctypes 1.1.0
    ctypes 1.1.0
    zmq.sugar.version 23.2.0
    zmq.sugar 23.2.0
    zmq 23.2.0
    argparse 1.1
    zlib 1.0
    _curses b'2.2'
    dateutil 2.8.2
    six 1.16.0
    _decimal 1.70
    decimal 1.70
    jupyter_core.version 4.10.0
    jupyter_core 4.10.0
    entrypoints 0.4
    jupyter_client 7.2.2
    ipykernel 6.9.1
    IPython.core.release 8.4.0
    executing.version 0.8.3
    executing 0.8.3
    pure_eval.version 0.2.2
    pure_eval 0.2.2
    stack_data.version 0.2.0
    stack_data 0.2.0
    pygments 2.11.2
    ptyprocess 0.7.0
    pexpect 4.8.0
    pickleshare 0.7.5
    backcall 0.2.0
    decorator 5.1.1
    wcwidth 0.2.5
    prompt_toolkit 3.0.20
    parso 0.8.3
    jedi 0.18.1
    urllib.request 3.10
    IPython 8.4.0
    distutils 3.10.4
    debugpy 1.5.1
    xmlrpc.client 3.10
    socketserver 0.4
    http.server 0.6
    pkg_resources._vendor.appdirs 1.4.3
    pkg_resources.extern.appdirs 1.4.3
    pkg_resources._vendor.packaging.__about__ 21.2
    pkg_resources._vendor.packaging 21.2
    pkg_resources.extern.packaging 21.2
    pkg_resources._vendor.pyparsing 2.2.1
    pkg_resources.extern.pyparsing 2.2.1
    _pydevd_frame_eval.vendored.bytecode 0.13.0.dev
    _pydev_bundle.fsnotify 0.1.5
    pydevd 2.6.0
    packaging.__about__ 21.3
    packaging 21.3
    _csv 1.0
    csv 1.0
    scanpy._metadata 1.9.1
    mkl 2.4.0
    numpy.version 1.23.1
    numpy.core._multiarray_umath 3.1
    numpy.core 1.23.1
    numpy.linalg._umath_linalg 0.1.5
    numpy.lib 1.23.1
    numpy 1.23.1
    scipy 1.9.1
    scipy.sparse.linalg._isolve._iterative 1.21.6
    scipy._lib.decorator 4.0.5
    scipy.linalg._fblas 1.21.6
    scipy.linalg._flapack 1.21.6
    scipy.linalg._flinalg 1.21.6
    scipy.sparse.linalg._eigen.arpack._arpack 1.21.6
    anndata._metadata 0.8.0
    h5py 3.7.0
    natsort 8.2.0
    pytz 2022.1
    pyarrow._generated_version 10.0.0
    cloudpickle 2.2.0
    pyarrow 10.0.0
    pandas 1.5.0
    numcodecs.version 0.10.2
    numcodecs.blosc 1.21.0
    numcodecs.zstd 1.4.8
    numcodecs.lz4 1.9.3
    msgpack 1.0.4
    numcodecs 0.10.2
    fasteners 0.18
    zarr.version 2.13.2
    zarr 2.13.2
    yaml 6.0
    toolz 0.12.0
    tlz 0.12.0
    markupsafe 2.1.1
    jinja2 3.0.3
    dask 2022.10.0
    isal 1.1.0
    fsspec 2022.8.2
    scipy._lib._uarray 0.8.8.dev0+aa94c5a4.scipy
    scipy.special._specfun 1.21.6
    anndata 0.8.0
    llvmlite 0.39.1
    numba.cloudpickle 1.6.0
    numba.misc.appdirs 1.4.1
    numba 0.56.2
    joblib.externals.cloudpickle 2.2.0
    joblib.externals.loky 3.3.0
    joblib 1.2.0
    sklearn.utils._joblib 1.2.0
    scipy.optimize._minpack2 1.21.6
    scipy.optimize._lbfgsb 1.21.6
    scipy.optimize._cobyla 1.21.6
    scipy.optimize._slsqp 1.21.6
    scipy.optimize.__nnls 1.21.6
    scipy.linalg._interpolative 1.21.6
    scipy.integrate._vode 1.21.6
    scipy.integrate._dop 1.21.6
    scipy.integrate._lsoda 1.21.6
    scipy.interpolate.dfitpack 1.21.6
    scipy.stats._statlib 1.21.6
    scipy.stats._mvn 1.21.6
    threadpoolctl 3.1.0
    sklearn.base 1.1.2
    sklearn.utils._show_versions 1.1.2
    sklearn 1.1.2
    matplotlib._version 3.6.0
    PIL._version 9.2.0
    PIL 9.2.0
    defusedxml 0.7.1
    xml.etree.ElementTree 1.3.0
    PIL._deprecate 9.2.0
    cffi 1.15.1
    PIL.Image 9.2.0
    pyparsing 3.0.4
    cycler 0.10.0
    kiwisolver._cext 1.4.4
    kiwisolver 1.4.4
    matplotlib 3.6.0
    plotly 5.11.0
    texttable 1.6.4
    igraph.version 0.10.1
    igraph 0.10.1
    leidenalg.version 0.9.0
    scanpy 1.9.1
    snapatac2._version 2.2.0
    urllib3.packages.six 1.16.0
    urllib3._version 1.26.11
    _cffi_backend 1.15.1
    ipaddress 1.0
    urllib3.util.ssl_match_hostname 3.5.0.1
    urllib3.connection 1.26.11
    urllib3 1.26.11
    charset_normalizer.version 2.0.4
    charset_normalizer 2.0.4
    requests.packages.urllib3.packages.six 1.16.0
    requests.packages.urllib3._version 1.26.11
    requests.packages.urllib3.util.ssl_match_hostname 3.5.0.1
    requests.packages.urllib3.connection 1.26.11
    requests.packages.urllib3 1.26.11
    idna.package_data 3.3
    idna.idnadata 14.0.0
    idna 3.3
    requests.packages.idna.package_data 3.3
    requests.packages.idna.idnadata 14.0.0
    requests.packages.idna 3.3
    certifi 2022.09.24
    requests.__version__ 2.28.1
    requests.utils 2.28.1
    socks 1.7.1
    requests 2.28.1
    appdirs 1.4.4
    tqdm._dist_ver 4.64.1
    tqdm.version 4.64.1
    tqdm.cli 4.64.1
    tqdm 4.64.1
    pooch v1.6.0
    rustworkx.rustworkx 0.12.1
    rustworkx 0.12.1
    snapatac2 2.2.0
    polars 0.15.5
    kaleido._version 0.2.1
    kaleido 0.2.1
    plotly.version 5.11.0`
                }</pre>
            </Typography>
        </div>
    )
}