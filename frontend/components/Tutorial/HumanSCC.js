import React from "react";
import {Breadcrumb, Space, Typography, Image} from "antd";
import {contentStyle} from "../Help/SiderStaticMenu";
import {downloadFile} from "../util";
import Link from "next/link";

export default function HumanSCC(){

    const handleClick = () => {
        downloadFile(`/api/submitted-files/counts/b3ae1730-90b3-11ed-9695-b54d6690f34b`)
        downloadFile(`/api/submitted-files/labels/b3ae1730-90b3-11ed-9695-b54d6690f34b`)
    }

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
                <Breadcrumb.Item>Result interpretation</Breadcrumb.Item>
                <Breadcrumb.Item>Human squamous cell carcinoma</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"Result interpretation"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Result interpretation - Human squamous cell carcinoma</h2>
                <p>
                    The tumor microenvironment (TME) is a complex ecosystem involving various interactions between cancer
                    cells and their microenvironment, ultimately contributing to tumor progression, metastasis and drug
                    resistance. Understanding the cell interplay that occurs within the TME can facilitate the development
                    of new therapeutic strategies.
                </p>
                <p>
                    Here, we used the
                    <a onClick={handleClick}>
                        <b> scRNA-seq data </b>
                    </a>derived from the diseased skin tissue of a patient with cutaneous squamous cell carcinoma (cSCC) (
                    <Link href={"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSM4284326"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>GSM4284326</b>
                        </a>
                    </Link>) and mapped the single cells to the ST section that ranked first in the section blast results.
                </p>
                <p>
                    The result page of this case study (Human squamous cell carcinoma) is available at
                    <Link href={"/mapping/resultPage/b3ae1730-90b3-11ed-9695-b54d6690f34b"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> b3ae1730-90b3-11ed-9695-b54d6690f34b </b>
                        </a>
                    </Link>. You can also access it from the
                    <Link href={"/"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> home page</b>
                        </a>
                    </Link>.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/hSCC/spatial_cellular_map.png"} width={800} height={550}
                           alt={"spatial_cellular_map"} />
                </div>
                <p>
                    To ensure a more comprehensive spatial mapping, we set the &quot;redundancy&quot; parameter to 10,
                    given that the cell number is insufficient (2,366 cells). Additionally, we set the &quot;KNN Number&quot;
                    to 0 to skip filtering cells in the latent space, as these two modalities were collected from the same
                    dataset.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/hSCC/advanced_paramters.png"} width={600} height={310}
                           alt={"advanced_paramters"}  />
                </div>
                <p>
                    It has been reported that the tumor-specific keratinocyte (TSK) population is enriched in the leading
                    edges of cSCC and functions as a hub for intercellular communications within a fibrovascular niche.
                    Consistently, we observed a significant enrichment of TSKs in the tumor leading edges, where they
                    colocalize with distinct TME cell types, such as fibroblasts and endothelial cells. This was further
                    validated by the spatial distances between cell type pairs (heatmap), where TSK-fibroblasts was
                    determined to be in the &quot;near&quot; group and TSK-endothelial cells was determined to be in the
                    &quot;medium&quot; group (boxplot).
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/hSCC/colocalization.png"} width={800} height={410}
                           alt={"colocalization"}  />
                </div>
                <p>
                    Next, we investigated the LRIs within the TSK-fibrovascular TME. We observed that TSKs are engaged in
                    extensive interactions with distinct stromal cell types in the TME.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/hSCC/cell_cell_interations.png"} width={700} height={450}
                           alt={"cell_cell_interations"}  />
                </div>
                <p>
                    For example, TSKs may modulate cancer-associated fibroblasts (CAFs) through several ligand-receptor
                    pairs in the leading edges, including MDK-LRP1, CCL5-ACKR4 and VEGFA-NRP2. Moreover, we observed that
                    TGFB1, a known CAF activator gene that is mainly expressed in TSKs in the leading edges, may
                    participate in the induction of CAFs. These results are consistent with previous findings.
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/hSCC/chord1.png"} width={390} height={360}
                               alt={"chord1"}  />
                        <Image src={"/images/tutorial/hSCC/chord2.png"} width={370} height={360}
                               alt={"chord2"}/>
                    </Space>
                </div>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/hSCC/chord3.png"} width={410} height={360}
                               alt={"chord3"}  />
                        <Image src={"/images/tutorial/hSCC/chord4.png"} width={380} height={360}
                               alt={"chord4"}/>
                    </Space>
                </div>
            </Typography>
        </div>
    )
}