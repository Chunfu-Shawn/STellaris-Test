import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";


export default function ManualMapping() {
    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h1>Spatial Mapping</h1>
                <p>
                    This section discusses the algorithmic details of spatial mapping module implemented in STellaris,
                    which was designed for mapping user’s annotated scRNA-seq data to spatial position in best match
                    tissue section curated in our local database.
                </p>
                <h2>1. Preprocessing</h2>
                <a id={"preprocessing"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    Prior to mapping single cells to spatial location in tissue section of ST, low-quality cells (gene
                    detected &lt;200 or mitochondrial proportion &gt; 20%) were excluded. CPM normalization was performed
                    followed by log1p transformation. Marker genes were calculated using the t test method for cell type
                    annotation submitted by users.
                </p>
                <h2>2. Section blast</h2>
                <a id={"section_blast"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    To help users find the properly matched ST section, we introduced a screening method called section
                    blast by assessing the similarity between user-uploaded scRNA-seq and the ST datasets in our local
                    database, as inspired by the multimodal intersection analysis (MIA) methods approach described in (
                    <a target={"_blank"} href={"https://doi.org/10.1038/s41587-019-0392-8"} rel={"noreferrer"}>
                        https://doi.org/10.1038/s41587-019-0392-8
                    </a>)
                </p>
                <p>
                    In this case, we used a hypergeometric test to measure the overlap level of marker genes (log-transformed
                    fold change &gt;1 and q value &lt;0.05) between all scRNA-seq cell types and all clusters (Leiden
                    clustering; resolution: 1) in the ST data, with the number of intersections of all detected genes in
                    the two modalities as the background for determining the p value. The Benjamini-ochberg method was
                    used for multiple testing correction. To better interpret these p value results, the following
                    calculations were applied: If the p value was less than or equal to 0.5, we performed -np.log10(p)
                    transformation; otherwise, we performed np.log10(1-p). Finally, the average of the highest value in
                    each ST cluster was deemed the metric we called MIA score to measure the similarity between the
                    scRNA-seq and the examined ST data.
                </p>
                <h2>3. Coembedding filtering</h2>
                <a id={"filtering"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    The integration of the scRNA-seq and ST data was performed using
                    Seurat <a target={"_blank"} href={"https://doi.org/10.1093/nar/gkac781"} rel={"noreferrer"}>
                        (https://doi.org/10.1093/nar/gkac781)
                    </a> by projecting these two modalities into shared latent space. To attenuate the confounding effect
                    caused by the incompatibility between the two modalities, we introduced a filtering method, coembedding
                    filtering, by filtering cells that are not well mixed with ST spots in shared UMAP space. Specifically,
                    for all ST spots, the average Euclidean distance between each spot and the default 50 nearest neighbours
                    was calculated, and the mean of average distances of all spots was determined as a cutoff value that
                    measures the proximity of cells to ST spots in shared UMAP space. Cells that were not within the scope
                    of any ST spots were filtered.
                </p>
                <h2>4. Spatial cellular map</h2>
                <a id={"spatial"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    To construct a transcriptome-wide map of spatial patterning, we adopted a metric learning approach
                    using a multivariate random forest (RF) model, which was previously described in
                    CellTrek <a target={"_blank"} href={"https://doi.org/10.1038/s41587-022-01233-1"} rel={"noreferrer"}>
                        (https://doi.org/10.1038/s41587-022-01233-1)
                    </a>. Briefly, this method trains a multivariate RF model on ST data in the shared latent space and
                    then applies the model to the coembedding data of the scRNA-seq and ST data, thereby enabling the
                    prediction of spatial coordinates of single cells by assigning them to the reciprocal nearest ST
                    spots where the similarity is measured by the RF distance metric.
                </p>
                <p>
                    We made some adaptations for thorough evaluation, higher reliability and faster speed, which are as follows:
                </p>
                <ul>
                    <li>We included advanced options to control the degree of redundancy and added an additional option
                        to set the maximum allowed redundancy to suit different scRNA-seq data;</li>
                    <li>We replaced point repulsion with the addition of uniform noise to ensure that the spatial
                        coordinates of cells will not be heavily affected by the neighbouring cells;</li>
                    <li>We took advantage of R-side parallel processing to speed up execution;</li>
                    <li>The summary of spatial mapping and the distribution of the RF distance metric were provided to
                        assess the mapping reliability.</li>
                </ul>
                <h2>5. Advanced parameters</h2>
                <a id={"advanced_parameters"} style={{position: 'relative', top: "-150px"}}></a>
                <p>We provide advanced parameters setting for users before starting spatial mapping:</p>
                <ol>
                    <li>
                        <b>KNN number</b>: Number of nearest neighboring cells to determine coembedding filtering cutoff,
                        0 means skipping coembedding filtering [default: 50].
                    </li>
                    <li>
                        <b>Number of spots</b>: Number of top-ranked nearest spots for each cell to keep in sparse graph
                        for spatial mapping, the higher the value, the more spatial locations the cell may be assigned
                        to [default: 10].
                    </li>
                    <li>
                        <b>Number of cells</b>: Number of top-ranked nearest cells for each spot to keep in sparse graph
                        for spatial mapping, the higher the value, the more cells may succeed in mapping to spatial
                        locations [default: 10].
                    </li>
                    <li>
                        <b>Redundancy</b>: The tolerance of redundancy, which means the maximum number of spots to which
                        a cell is allowed to map. This value must be lower than the smaller value of n_spots and n_cells
                        [default: 1].
                    </li>
                </ol>
                <h2>6. Cell type colocalization</h2>
                <a id={"colocalization"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    Based on the spatial coordinates generated by spatial mapping, we measured the spatial distance between
                    any two cell types using Euclidean distance. We then performed k-means clustering (k=3) on the spatial
                    distance of all pairs of cell types, thereby dividing cell type pairs into three distance groups:
                    &quot;near,&quot; &quot;medium&quot; and &quot;far.&quot;
                </p>
                <h2>7. Cell-cell ligand-receptor Interactions </h2>
                <a id={"interaction"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    We identified LRIs using CellPhoneDB v4 (
                    <a target={"_blank"} rel={"noreferrer"} href={"https://github.com/ventolab/CellphoneDB"}>
                        https://github.com/ventolab/CellphoneDB
                    </a>) for each cell type pair in different distance groups that were previously defined. We added
                    support for mouse species by converting gene symbols to their corresponding orthologs in human.
                    The LRIs with p values ≤ 0.01 were retained as significant interactions.
                </p>
                <h2>8. Description of downloaded files </h2>
                <a id={"download"} style={{position: 'relative', top: "-150px"}}></a>
                <ol>
                    <li>
                        We offer <b>reference ST data in h5ad </b>readable with the &quot;anndata&quot; Python package.
                    </li>
                    <li>
                        We offer <b>mapped scRNA-seq data in h5ad</b> with predicted spatial coordinates, which is readable with
                        the &quot;anndata&quot; Python package
                    </li>
                    <li>
                        <div>
                            We offer <b>a compressed table files package</b> including all table results including:
                            <div>a. single cell coordinate table (sc_coordinate.csv) including some columns:
                                <ul>
                                    <li>“cell_type”: name of the cell type in scRNA-seq.</li>
                                    <li>“id_new”: new cell id in scRNA-seq.</li>
                                    <li>“id_st”: id of closest cell in reference ST data.</li>
                                    <li>“dist”: distance between this cell of scRNA-seq and closest cell/spot of reference ST data.</li>
                                    <li>“x”: x coordinate of corresponding cell/spot in reference ST data.</li>
                                    <li>“y”: y coordinate of corresponding cell/spot in reference ST data.</li>
                                    <li>“x_noise”: predicted x coordinate of this cell in scRNA-seq data with noise.</li>
                                    <li>“y_noise”: predicted y coordinate of this cell in scRNA-seq data with noise.</li>
                                </ul>
                            </div>
                            <p>
                                b. Euclidean distance matrix between any two cell types and euclidean distance table with
                                group name (cell_types_eucDist.csv, cell_types_eucDist_group.csv);
                            </p>
                            <div>
                                c. CellPhoneDB output files (means.txt, pvalues.txt, significant_means.txt, deconvoluted.txt);
                                <ul>
                                    <li>details of these files: https://github.com/ventolab/CellphoneDB/blob/master/Docs/RESULTS-DOCUMENTATION.md</li>
                                </ul>
                            </div>
                            <div>
                                e. Filtered CellPhoneDB output files (significant_means_lt001.csv): contains mean values for
                                each ligand-receptor interaction (rows) for each cell-cell interacting pair (columns) filtered
                                by P value &le; 0.01, and the description of columns are same to CellPhoneDB output files.
                            </div>
                        </div>
                    </li>
                    <li>
                        <div>
                            We offer <b>a compressed pdf figure files package</b> including all pdf figure results, which are more
                            optimized than web graphs, including:
                            <p>
                                a. Euclidean distance matrix heatmap and boxplot of cell types pairs by groups (cell_types_eucDist.heatmap.pdf,
                                cell_types_eucDist.boxplot.pdf) similar to the web graphs;
                            </p>
                            <p>
                                b. Dot figures for total or each cell type in a group showing the molecular interactions
                                between cell types (dot_plot.pdf, dot_plot_[group]|[cell type].pdf) similar to web graphs,
                                where means of the average expression level of two interacting molecular are indicated by color;
                            </p>
                            <p>
                                c. Heatmap showing the total number of interactions between cell types (inter_count_heatmap.pdf)
                                similar to the web graph;
                            </p>
                        </div>
                    </li>
                </ol>
                <a id={"download"} style={{position: 'relative', top: "-150px"}}></a>
            </Typography>
        </div>
    )
}