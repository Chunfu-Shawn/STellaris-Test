import React from "react";
import {Breadcrumb, Space, Typography, Image} from "antd";
import {contentStyle} from "../Help/SiderStaticMenu";
import {downloadFile} from "../util";
import Link from "next/link";


export default function MultiOmics(){

    const handleClick = () => {
        downloadFile(`/api/submitted-files/counts/75afdf70-c300-11ed-8a89-3fb9e5c5307c`)
        downloadFile(`/api/submitted-files/labels/75afdf70-c300-11ed-8a89-3fb9e5c5307c`)
        downloadFile(`/api/submitted-files/fragments/75afdf70-c300-11ed-8a89-3fb9e5c5307c`)
        downloadFile(`/api/submitted-files/peak/75afdf70-c300-11ed-8a89-3fb9e5c5307c`)
    }

    return(
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
                <Breadcrumb.Item>Expanded application</Breadcrumb.Item>
                <Breadcrumb.Item>H3K4me3 modification in mouse brain</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"MutiOmics"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Result interpretation - H3K4me3 modification in mouse brain</h2>
                <p>
                    Understanding the epigenomic landscape in the tissue of origin is crucial for deciphering the spatial
                    regulation of gene expression. In this tutorial, we will showcase the application of STellaris in
                    the analysis of single-cell multiomics data. STellaris transfers the spatial locations generated from
                    the spatial mapping results to the corresponding cells in other omics data for spatial construction.
                </p>
                <p>
                    Here, we use
                    <a onClick={handleClick}>
                        <b> single-cell multiomics data </b>
                    </a> from the mouse frontal cortex and hippocampus generated by
                    Paired-Tag technology (
                    <Link href={"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE152020"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>GSE152020</b>
                        </a>
                    </Link>), which consists of both transcriptomic and H3K4me3 epigenomic data that were jointly profiled
                    in single cells. Notably, in addition to the regular scRNA-seq data, we also uploaded the epigenomic
                    profiling of H3K4me3 modification, a
                    <Link href={"https://support.10xgenomics.com/single-cell-atac/software/pipelines/latest/output/fragments"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> fragment file </b>
                        </a>
                    </Link> containing read counts detected in genomic regions. To compare the spatial signature of H3K4me3
                    modification generated using STellaris with that profiled by epigenomic MERFISH, a recently reported
                    method that enables spatially resolved single-cell epigenomic profiling in complex tissues (
                    <Link href={"https://doi.org/10.1016/j.cell.2022.09.035"}>
                        <a href={"https://doi.org/10.1016/j.cell.2022.09.035"} target={"_blank"} rel={"noreferrer"}>
                            https://doi.org/10.1016/j.cell.2022.09.035
                        </a>
                    </Link>),
                    we also upload a peak file containing genomic positions of active promoters of 127 genes that were
                    inspected in the epigenomic MERFISH paper. Note that the H3K4me3 signals in 127 active promoters
                    will be aggregated from the H3K4me3 fragment file and ultimately reported in the result page. The
                    result page of this case study (H3K4me3 modification in mouse brain) is available at
                    <Link href={"/mapping/resultPage/75afdf70-c300-11ed-8a89-3fb9e5c5307c"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> 75afdf70-c300-11ed-8a89-3fb9e5c5307c </b>
                        </a>
                    </Link>. You can also access it from the
                    <Link href={"/"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> home page</b>
                        </a>
                    </Link>.
                </p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/multiomics/multiomics_tab.png"} width={800} height={440}
                           alt={"multiomics_tab"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    Based on the section blast results and quality of ST sections, we select the third-ranked ST section
                    (ST8059048) from the mouse brain at P56, which was profiled using 10x Visium technology (
                    <Link href={"/datasets/dataPage/STW-M-Brain-Visium-3"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> STW-M-Brain-Visium-3, ST8059048 </b>
                        </a>
                    </Link>).
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/multiomics/screening_table.png"} width={800} height={440}
                           alt={"screening_table"}/>
                </div>
                <p>
                    We then perform spatial mapping with the &quot;redundancy&quot; parameter set to 3.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/multiomics/advacned_parameters.png"} width={650} height={330}
                           alt={"advacned_parameters"}/>
                </div>
                <p>
                    This returns a tissue-wide transcriptomic map, along with a spatial atlas of H3K4me3 modification in
                    the active promoters of 127 genes.
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/multiomics/ref_scRNA.png"} width={550} height={360}
                               alt={"ref_scRNA"}/>
                        <Image src={"/images/tutorial/multiomics/ref_scH3K4me3.png"} width={550} height={360}
                               alt={"ref_scH3K4me3"}/>
                    </Space>
                </div>
                <p>
                    Next, to validate the accuracy of the epigenomic map generated using STellaris, we extracted the cortex
                    region using polynomial regression and assessed the spatial distributions of layer-enriched active
                    promoters interrogated in the epigenomic MERFISH paper. For each promoter, we calculated the distance
                    of the centroid of H3K4me3 signals to the superficial layer of the cortex.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/multiomics/polynomial_regression.png"} width={330} height={360}
                           alt={"ref_scRNA"}/>
                </div>
                <p>
                    We observed that the distribution patterns of H3K4me3 signals in the layer-enriched promoters in our
                    epigenomic map (right) nicely recapitulate those directly profiled using epigenomic MERFISH paper (left).
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/multiomics/comparison.png"} width={500} height={660}
                               alt={"comparison"}/>
                        <Image src={"/images/tutorial/multiomics/enrich.png"} width={400} height={330}
                               alt={"enrich"}/>
                    </Space>
                </div>
                <p>
                    Based on the accurate spatial patterning of H3K4me3 modification, we then investigated whether the
                    H3K4me3 signals of promoter loci exhibited consistent layer enrichment with the expression of their
                    corresponding genes. For example, the spatial pattern of gene expression of Bcl11b, a marker of
                    early-born deep-layer neurons, are in good agreement with the H3K4me3 epigenomic signals in its
                    promoter, suggesting the potential regulation of gene expression at the tissue scale.
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/multiomics/scRNA.png"} width={500} height={670}
                               alt={"scRNA"}/>
                        <Image src={"/images/tutorial/multiomics/scH3K4me3.png"} width={500} height={670}
                               alt={"scH3K4me3"}/>
                    </Space>
                </div>
                <p>
                    Taken together, these results demonstrate the feasibility of using STellaris to characterize gene
                    regulatory mechanisms for single-cell multiomics data in the spatial context.
                </p>
            </Typography>
        </div>
    )
}