import React from "react";
import {Breadcrumb, Space, Typography, Image} from "antd";
import {contentStyle} from "../Help/SiderStaticMenu";

export default function ResultInterpretation(){
    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
                <Breadcrumb.Item>Result interpretation</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"Result interpretation"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Result interpretation</h2>
                <p>
                    Before interpreting the spatial mapping results, we will take some time to explain the computational method
                    used for spatial reconstruction. The spatial mapping module mainly relies on an algorithm tailed for spatial
                    location for scRNA-seq, Celltrek (
                    <a target={"_blank"} href={"https://doi.org/10.1038/s41587-022-01233-1"} rel={"noreferrer"}>
                        https://doi.org/10.1038/s41587-022-01233-1
                    </a>), which was adapted to achieve higher reliability and faster speed.
                    Generally, this method trains a multivariate random forest (RF) model on ST data based on the coembedding
                    latent space of both scRNA-seq and ST data, thereby enabling the prediction of spatial coordinates of
                    single cells by assigning them to the reciprocal nearest ST spots where the similarity between single
                    cells and ST spots is measured by RF distance metric. We introduce several crucial steps of quality
                    control throughout this process to ensure the accuracy of spatial mapping, such as coembedding filtering,
                    which will be discussed later.
                </p>
                <p>
                    A result page will be available after the job is finished. This page gives users a systematical summary
                    of mapping results regarding filtering, evaluation of mapping quality and consequent landscape of intercellular
                    communications in spatial microenvironments. It consists of 5 parts including preprocessing, coembedding
                    filtering, spatial cellular map,  cell type colocalization and cell-cell ligand-receptor Interactions. Now,
                    we will go through this page for result interpretation.
                </p>
                <h3>1. Preprocessing</h3>
                <p>
                    This part displays the elapsed time of spatial mapping execution on the left and the basic information of
                    query scRNA-seq and target reference ST section on the right. Prior to mapping single cells back to spatial
                    coordinates in tissue slide, low-quality cells (gene detected &lt; 200 or mitochondrial counts &gt; 20%) was
                    excluded. The stacked bar plot visualizes the number of cells that are filtered and retained, and the
                    summary of the retained cells and genes was shown on the top.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/result/preprocessing.png"} width={800} height={350}
                           alt={"preprocessing"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>2. Coembedding filtering</h3>
                <p>
                    As mentioned earlier, the scRNA-seq and ST data was first projected into a joint latent space. Intuitively,
                    a cell is more safely to be assigned to a ST spot and thereby acquire a coordinate if they are close to
                    each other in the latent space and vice versa. Howerver, based on the assumption that the query scRNA-seq
                    and target ST section are properly matched, Celltrek can greedily assign cells to ST spots even if they are
                    derived from completely different tissues. In our tests, over 80% of cells from mouse liver scRNA-seq can
                    be successfully mapped to ST section of mouse brain that we are currently using, in which case they are not
                    well integrated. This could happen when scRNA-seq and ST data are not perfectly matched, such that they are
                    in different tissue homeostasis or disease conditions. We introduce a compromised approach by filtering cells
                    that are not well mixed with ST spots in shared latent space, thus attenuating the confounding effect caused
                    by the incompatibility between these two modalities.
                </p>
                <p>
                    The coembedding of single cells and ST spots can be visualized by Uniform Manifold Approximation and Projection
                    (UMAP) plots, the initial on the upper left, and the filtered on the upper right. In this case, the scRNA-seq
                    and ST data are properly aligned such that the scRNA-seq was derived from E14.5 mouse cerebral cortex while
                    the ST data was derived from the coronal plane of brain at exactly the same stage. So it’s reasonably that
                    only a few cells are filtered in this step (e.g., LayerI [17-E] and Endothelial [18-E]) (bottom), only the
                    retained cells will be considered in the subsequent mapping analysis.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/result/coembedding.png"} width={800} height={350}
                           alt={"coembedding"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>3. Spatial cellular map</h3>
                <p>
                    This is the key result of spatial mapping tool. The spatial transcriptomic map of the reference ST section
                    is displayed on the top left panel, and the cellular map constructed by registered single cells is shown
                    on the top right. This interactive panel allows you to click  to view the spatial distribution of your
                    desired cell type in the navigator bar. You can also search for the spatial expression landscape of genes
                    that you are interested in.
                </p>
                <p>
                    The bar plot on the left bottom summarizes the mapping results for each cell type, where you can see the
                    majority of cells survive the spatial mapping step. The histogram on the right bottom gives you an intuitive
                    assessment of mapping quality where a summit of RF distance around 0.5 or even lower indicates an acceptable result.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/result/spatial_cellular_map.png"} width={800} height={350}
                           alt={"spatial_cellular_map"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    As for this example, ganglionic eminence cells, the progenitor cells of the ventral telencephalon, locate
                    precisely where they originate from. The inhibitory neurons are exactly located in the ventral part as
                    they have not yet migrated to cerebral cortex at this point. Radial glial cells line the ventricles.
                    Thalamic cells are also positioned in the right place although they are rarely captured in the scRNA-seq.
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/result/map1.png"} width={500} height={330}
                               alt={"map1"} style={{borderStyle:"dashed"}}/>
                        <Image src={"/images/tutorial/result/map2.png"} width={500} height={330}
                               alt={"map2"}/>
                    </Space>
                </div>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/result/map3.png"} width={500} height={330}
                               alt={"map3"} style={{borderStyle:"dashed"}}/>
                        <Image src={"/images/tutorial/result/map4.png"} width={500} height={330}
                               alt={"map4"}/>
                    </Space>
                </div><br/>
                <p>
                    In addition to precise patterning of diverse cell types, the expression profiles of genes also successfully
                    recapitulate that in the initial ST section (e.g. Hes1, Dlx2 and Neurod6).
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/result/cell1.png"} width={500} height={330}
                               alt={"cell1"} style={{borderStyle:"dashed"}}/>
                        <Image src={"/images/tutorial/result/cell2.png"} width={500} height={330}
                               alt={"cell2"}/>
                    </Space>
                </div>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/result/cell3.png"} width={500} height={330}
                           alt={"cell3"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>4. Cell type colocalization</h3>
                <p>
                    Once we got the spatial cellular map where single cells were registered with spatial coordinates, we can
                    assess the spatial proximity of cell type pairs which is visualized by cell-cell contact map (left). The
                    closeness of a pair of cell types is measured by Jensen-Shannon divergence (JSD) which compares the
                    similarity of spatial distribution between each other. Note that the JSD heatmap has been clustered using
                    hierarchical clustering. Alternatively, this relatedness can be visualized by network plot (right) constructed
                    by maximum spanning tree (MST). In this case, the colocalized cell type clusters reveal the anatomy of
                    developing brain.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/result/colocalization.png"} width={800} height={250}
                           alt={"colocalization"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>5. Cell-cell ligand-receptor Interactions</h3>
                <p>
                    With the spatial proximity between diverse cell types, we define microenvironment by iterating each cell
                    type and retrieving the adjacent cell types centered on it, enabling dissecting cell-cell ligand-receptor
                    interactions at spatial context given that intercellular communications are more likely to occur in cells
                    that are adjacent to each other.
                </p>
                <p>
                    The top-left heatmap visualizes the number of ligand-receptor interactions detected between any two cell
                    types. The dotplot on the right displays the interaction intensity of ligand-receptor pairs among the pairwise
                    cell types within a certain microenvironment. You can specify the microenvironment of interest via the
                    drop-down box on the top. For a detailed presentation of ligand-receptor interactions between two cell
                    types, we provide a chord graph on the left bottom where the dot colors distinguish gene types and lines
                    colors refer to the degree of interactions. Similarly, You can retrieve the cell type pairs from the upper
                    drop-down box.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/result/interactions.png"} width={800} height={370}
                           alt={"interactions"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    As for this example where mouse corticogenesis is undergoing a progenitor driven phase, we focused on
                    the migration process of neuroprogenitors, which is crucial to the expansion of cerebral cortex. After
                    the onset of neurogenesis, in the ventricular zone (VZ), apical progenitors mainly composed of radial
                    glias (RGs) generate basal progenitors, the secondary class of neuroprogenitors, and the newborn basal
                    progenitors migrate to the subventricular zone (SVZ) where they produce most of cortical neurons. In the
                    scRNA-seq here we use, RG1 [8-E] represents the major cell type of RGs that lines the VZ, SVZ1 (migrating)
                    [14-E] represents the major basal progenitors located in SVZ which were generated and migrated from VZ.
                    Focus on the microenvironment of RG1 or SVZ1, we found that Ptn-Ptprs, the top-ranked pair of ligand and
                    receptor with Ptn as ligand in RG1 and Ptprs as receptor in SVZ1 , stands out along with this migration
                    event. These results may reinforce previous findings suggesting that Ptn acts as a ligand that can bind
                    with CSPGs at the neuron surface, thereby leading to releasing of PTPRS, which is required for the radial
                    migration of neurons and lamination of developing cerebral cortex.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/result/dotplot.png"} width={600} height={650}
                           alt={"dotplot"} style={{borderStyle:"dashed"}}/>
                </div>
            </Typography>
        </div>
    )
}