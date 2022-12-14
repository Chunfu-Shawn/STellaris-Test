import {Breadcrumb, Col, Row, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";
import Image from "next/image";
import {downloadFile} from "../../util";
import Link from "next/link.js";


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
                <h2>1. Preprocessing</h2>
                <a id={"preprocessing"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    Prior to mapping single cells to spatial location in tissue section of ST, low-quality cells (gene
                    detected &lt;200 or mitochondrial counts &gt; 20%) was excluded. Then, we use CPM normalization for both
                    scRNA-seq and ST data, respectively.
                </p>
                <h2>2. Coembedding filtering</h2>
                <a id={"filtering"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    The integration between scRNA-seq and ST data was performed via Seurat in accordance with Celltrek.
                    Please refer to Celltrek publication here for more detailed descriptions.
                </p>
                <p>
                    To attenuate the confounding effect caused by the incompatibility between the two modalities, we
                    implement a filtering method termed &quot;Coembedding filtering&quot; by filtering cells that are not well
                    mixed with ST spots in UMAP space. Specifically, the average euclidean distance between each spot
                    and its 50 nearest neighbors was calculated, and the mean of average distances of all spots was
                    determined as a cutoff value that measures the proximity of cells to ST spots in shared UMAP space.
                    Cells that were not within the scope of any ST spots determined by the cutoff were filtered.
                </p>
                <h2>3. Spatial cellular map</h2>
                <a id={"spatial"} style={{position: 'relative', top: "-150px"}}></a>
                <p>To construct spatial cellular map in single-cell resolution, we mainly referred to an algorithm tailed
                    for spatial reconstruction of scRNA-seq, Celltrek, which was adapted to achieve higher reliability
                    and faster speed. Please refer to Celltrek publication here for more detailed descriptions. </p>
                <p>
                    The main adaptations are as follows:
                </p>
                <ul>
                    <li>We take advantage of R-side parallel processing to speed up execution.</li>
                    <li>We use 50 PCs when training random forest model.</li>
                    <li>To ensure the mapping accuracy centered on single cells and avoid confusion in result interpretation,
                        redundancy is not considered which means one cell will should be only assigned to one unique spatial
                        coordinate. </li>
                    <li>Point repulsion was not performed to keep the spatial coordinate of single cells loyal to the
                        original mapping results and not heavily affected by neighboring cells.</li>
                </ul>
                <h2>4. Cell type colocalization</h2>
                <a id={"colocalization"} style={{position: 'relative', top: "-150px"}}></a>
                <p>After obtaining the predicted spatial coordinates, we can estimate the spatial distance and recapitulate
                    the colocalization of different cell types by this module.</p>
                <a id={"format_uploaded_files"} style={{position: 'relative', top: "-150px"}}></a>
                <p>After obtaining the predicted spatial coordinates, we can estimate the spatial distance and
                    recapitulate the colocalization of different cell types by this module. </p>
                <h4>Methods:</h4>
                <p>
                    <b>(1)</b> Firstly, we calculate a <b>2D grid kernel density</b> for each cell type by KernelDensity function
                    from <b>sklearn.neighbor</b> Python package with gaussian kernel and user-defined parameter
                    <b><i> bandwidth </i></b>associated with ST spots density and kernel smoothness. Then we calculate predicted
                    <b> appearance probability</b> for each cell type over a 2d grid of points evenly with 100 points in each direction.
                    <br/>
                    <b>(2)</b> Secondly, we calculate the <b>divergence between appearance probabilities of two cell types </b>
                    over these 10000 points to estimate their spatial proximity. The method to calculate divergence is
                    <b> Jensen-Shannon divergence (JS Divergence)</b>, which is based on the <b>Kullback–Leibler divergence (KL Divergence)</b>
                        , with some notable differences, including that it is symmetric.
                    <br/>It is defined by
                </p>
                <Image src={"/images/help/mapping/jsd.png"} height={50} width={400}/>
                <br/><span>where</span><br/>
                <Image src={"/images/help/mapping/kld.png"} height={50} width={230}/>
                <Image src={"/images/help/mapping/m.png"} height={50} width={120}/>
                <p>
                    <b>(3)</b> Thirdly, based on the <b>negative log2 JS divergence </b>matrix of different cell type,
                    we construct a <b>maximum spanning tree (MST)</b> to present the simplified cell types colocalization
                    by <b>networkx</b> Python package with edge
                    <br/><b>(4)</b> To estimate the complete cell types colocalization, the above calculation steps are
                    performed repetitively on <b>bootstrapping samples</b> (default 80 percentage samples and  20 iterations)
                    to generate an <b>average negative log2 JS divergence matrix</b> (visualized as heatmap graph 4.1)
                    and an <b>average MST consensus matrix</b> visualized into network graph (visualized as network graph 4.2).
                    <br/><b>(5)</b> Finally, we retain the some the most proximal cell type pairs referring to
                    user-defined parameter <b><i>cutoff</i></b> equal to percentage of top retained colocalization relation
                    of cell type pairs according to MST consensus matrix, and then extract microenvirionments for each cell
                    type assigning a name <b>“Microenv_[central cell type]”</b>  whose [central cell type] means
                    the cell type closing to all other cell types in this microenvirionment. Therefore some cell types
                    will occur repetitively in some microenvirionment but with different biological functioning.
                </p>
                <h4>Graph:</h4>
                <p>
                    In JS divergence matrix graph , darker the box, the greater the value on behalf of mean -log2 JSD
                    from 20 times bootstrapping samples indicating global closeness. In MST graph, nodes represent cell
                    types, which are darker and larger with more colocalization relationship, and edges represent
                    colocalization of two cell types, which are darker and wider with higher proximity.
                </p>
                <Row justify={"center"} style={{textAlign:"center",color:"gray"}}>
                    <Col span={12}>
                        <Image src={"/images/help/mapping/JSDM.png"} height={400} width={400}/>
                        <p>graph 4.1</p>
                    </Col>
                    <Col span={12}>
                        <Image src={"/images/help/mapping/MST.png"} height={400} width={400}/>
                        <p>graph 4.2</p>
                    </Col>
                </Row>
                <h4>Advanced parameters</h4>
                <a id={"advanced_parameters"} style={{position: 'relative', top: "-150px"}}></a>
                <ol>
                    <li>
                        <b>bindwidth</b>: a parameter associated with ST spots density and kernel smothness (see
                        <Link href={"https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KernelDensity.html"}>
                            <a target={"_blank"} rel={"noreferrer"}>&nbsp;KernelDensity</a>
                        </Link>); if users
                        want to distinguish cell types distribution better, turning down the bindwidth will be benificial.
                    </li>
                    <li>
                        <b>divergence cutoff</b>: a parameter equal to percentage of top retained colocalization relation
                        of cell type pairs according to MST consensus matrix; if users want to investigate less number of
                        more significant microenvironments of cell types colocalization, turning down the cutoff will be benificial.
                    </li>
                </ol>
                <h2>(5) Cell-cell ligand-receptor Interactions </h2>
                <a id={"interaction"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                    To understand cellular behavior or response to neighbouring cells, we predict the most probable
                    ligand-receptor interactions by CellPhoneDB v4 (
                    <Link href={"https://github.com/ventolab/CellphoneDB"}>
                        <a target={"_blank"} rel={"noreferrer"}>&nbsp;https://github.com/ventolab/CellphoneDB</a>
                    </Link>) confined to the spatial microenvironment identified before.
                </p>
                <h4>Methods</h4>
                <ol>
                    <li>
                        Firstly, we normalize the user’s scRNA-seq count data and transform ortholog gene from mouse to
                        human if scRNA-seq comes from mouse.
                    </li>
                    <li>
                        To improve the speed and efficiency of prediction, we subsampling cells (default 30%) maintaining
                        the transcriptomic hererogeneity.
                    </li>
                    <li>
                        We predict enriched receptor-ligand interactions between two cell types based on expression of
                        receptors and ligands by statistical inference limited in spatial microenvironments.
                    </li>
                    <li>
                        After filtering receptor-ligand interactions by P value ≤ 0.01, we count total number of all
                        receptor-ligand interactions for each cell type pair and plot heatmap (graph 5.1).
                    </li>
                    <li>
                        Finally we visualize statistically significant interactions for each microenvironment (dot graph 5.2)
                        and each cell type pair (chord graph 5.3)
                    </li>
                </ol>
                <h4>Graph</h4>
                <ol>
                    <li>
                        In interactions count heatmap (5.1), darker the box, more interactions of cell type pairs.
                    </li>
                    <li>
                        In receptor-ligand interactions dot graph (5.2), rows are interacting molecule pairs and columns
                        are interacting cell type pairs. And means of the log2 average expression value of the corresponding
                        interacting molecule pairs are indicated by color.
                    </li>
                    <li>
                        In receptor-ligand interactions chord graph (5.3), node represents an interacting partner whose
                        identifier is gene name, UniProt identifier (prefix &quot;simple:&quot;) or complex identifier
                        (prefix &quot;complex:&quot;), which is classified as ligand, receptor or both. Edge represents
                        an interaction of two partner, which is darker with higher mean expression.
                    </li>
                </ol>
                <Row justify={"center"} style={{textAlign:"center",color:"gray"}}>
                    <Col span={8}>
                        <Image src={"/images/help/mapping/number.png"} height={450} width={400}/>
                        <p>graph 5.1</p>
                    </Col>
                    <Col span={8}>
                        <Image src={"/images/help/mapping/dotplot.png"} height={700} width={400}/>
                        <p>graph 5.2</p>
                    </Col>
                    <Col span={8}>
                        <Image src={"/images/help/mapping/chord.png"} height={450} width={400}/>
                        <p>graph 5.3</p>
                    </Col>
                </Row>
                <h2>6. Description of results </h2>
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
                        We offer <b>a compressed table files package</b> including all table results including:
                        <p>a. single cell coordinate table (sc_coordinate.csv) including some columns:
                            <ul>
                                <li>“cell_type”: name of the cell type in scRNA-seq.</li>
                                <li>“id_new”: new cell id in scRNA-seq.</li>
                                <li>“id_st”: id of closest cell in reference ST data.</li>
                                <li>“dist”: distance between this cell of scRNA-seq and closest cell of reference ST data.</li>
                                <li>“x”: x coordinate of corresponding cell in reference ST data.</li>
                                <li>“y”: y coordinate of corresponding cell in reference ST data.</li>
                                <li>“x_noise”: predicted x coordinate of cell in scRNA-seq data with noise.</li>
                                <li>“y_noise”: predicted y coordinate of cell in scRNA-seq data with noise.</li>
                            </ul>
                        </p>
                        <p>
                            b. JSD matrix and MST consensus matrix after bootstrapping (cell_types_JSD.csv, cell_types_mst_network.csv);
                        </p>
                        <p>
                            c. microenvironment table (microenvironment.csv) including two columns:
                            <ul>
                                <li>&quot;cell_type&quot;: the name of the cell type</li>
                                <li>&quot;microenvironment&quot;: the name of the microenvironment assigned;</li>
                            </ul>
                        </p>
                        <p>
                            d. CellPhoneDB output files (means.txt, pvalues.txt, significant_means.txt, deconvoluted.txt);
                            <ul>
                                <li>details of these files: https://github.com/ventolab/CellphoneDB/blob/master/Docs/RESULTS-DOCUMENTATION.md</li>
                            </ul>
                        </p>
                        <p>
                            e. filtered CellPhoneDB output files (significant_means_lt001.csv): contains mean values for
                            each ligand-receptor interaction (rows) for each cell-cell interacting pair (columns) filtered
                            by P value &le; 0.01,  and details meaning of some columns are same to CellPhoneDB output files.
                        </p>
                    </li>
                    <li>
                        We offer <b>a compressed pdf graph files package</b> including all pdf graph results, which are more
                        optimized than web graphs, including:
                        <p>
                            a. JSD matrix heatmap and MST consensus matrix network graph after bootstrapping (cell_types_JSD.pdf,
                            cell_types_mst_network.pdf) similar to web graphs ;
                        </p>
                        <p>
                            b. dot graph for total and each microenvironment (dot_plot.pdf, dot_plot_Microenv_[central cell
                            type].pdf) similar to web graphs, where means of the average expression level of two interacting
                            molecular are indicated by color;
                        </p>
                        <p>
                            c. heatmap showing the total number of interactions between cell types (inter_count_heatmap.pdf)
                            similar to web graphs
                        </p>
                    </li>
                </ol>
                <a id={"download"} style={{position: 'relative', top: "-150px"}}></a>
            </Typography>
        </div>
    )
}