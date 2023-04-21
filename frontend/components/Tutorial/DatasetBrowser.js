import React from "react";
import {Breadcrumb, Space, Typography, Image} from "antd";
import Link from "next/link.js";
import {contentStyle} from "../Help/SiderStaticMenu";

export default function DatasetBrowser(){
    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Dataset Browser</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"Dataset Browser"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Dataset Browser</h2>
                <p>
                    This tutorial aims to show you how to retrieve and view our datasets, the data basis for the spatial
                    mapping tool, by dataset browser (
                    <Link href={"https://spatial.rhesusbase.com/datasets"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>https://spatial.rhesusbase.com/datasets</b>
                        </a>
                    </Link>).
                </p>
                <p>
                    We collected 100 spatial transcriptomics (ST) datasets comprising 774 sections across organs, developmental
                    stages and pathological states in humans and mice. All curated ST datasets were uniformly processed
                    using centralized pipelines. We have designed this interface to help you navigate through this catalog.
                    Select the ST data that you are interested in and explore the spatially resolved expression profiles
                    of candidate genes.
                </p>
                <p>
                    Here we will use a ST data derived from postnatal mouse brain (P8) using 10X Visium technique as an example.
                </p>
                <p>
                    1. Click &quot;Datasets&quot; tab in navigator bar on the top. The bar charts summarize the number of
                    ST datasets or sections in humans and mice compiled by our development team.
                </p>
                <p>
                    2. Click &quot;Mouse Archive&quot; to browser ST data of mouse.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/dataset.png"} width={700} height={700}
                           alt={"dataset"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    3. Choose the ST method, organ and pathological state of your interest to screen the ST datasets. Here we
                    select &quot;Visium&quot;, &quot;Brain&quot; and &quot;FALSE&quot; for these three attributes, respectively,
                    and then choose
                    <Link href={"/datasets/dataPage/STW-M-Brain-Visium-2"}>
                        <a target={"_blank"} rel="noreferrer"> &quot;STW-M-Brain-Visium-2&quot; </a>
                    </Link>to explore.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/mouse_archive.png"} width={800} height={450}
                           alt={"mouse_archive"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    4. View the meta information for this ST dataset, which includes details on the sample and section
                    information associated with this dataset.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/dataset1.png"} width={800} height={450}
                           alt={"dataset1"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    5. Click on <b>&quot;View&quot;</b> tab to explore the spatially resolved expression profiles of genes of interest.
                    Enter gene symbol in <b>&quot;Genes/Features&quot;</b> box (e.g., <i>Kr8</i>, <i>Slc17a7</i> and <i>Mbp</i>).
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/dataset/krt8.png"} width={500} height={320}
                               alt={"krt8"} style={{borderStyle:"dashed"}}/>
                        <Image src={"/images/tutorial/dataset/slc17a7.png"} width={500} height={320}
                               alt={"slc17a7"}/>
                    </Space>
                </div>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/mbp.png"} width={500} height={320}
                           alt={"mbp"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    6.We have clustered spots into subgroups using traditional clustering (Leiden algorithm) and spatial
                    clustering method (STAGATE) with multiple resolutions. Select an item in <b>&quot;Cell Metadata&quot;
                    </b> drop-down box for clustering result (e.g., leiden0.5, leiden0.5_STAGATE).
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/dataset/leiden0.5.png"} width={500} height={320}
                               alt={"leiden0.5"} style={{borderStyle:"dashed"}}/>
                        <Image src={"/images/tutorial/dataset/leiden0.5_stagate.png"} width={500} height={320}
                               alt={"leiden0.5_stagate"}/>
                    </Space>
                </div>
                <p>
                    7. Select a set of marker genes in <b>&quot;Sets&quot;</b> drop-down box to view the gallery of maker gene
                    expressions for a certain cluster. Click on one of the gallery charts to make it the primary view.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/set2.png"} width={800} height={500}
                           alt={"set2"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    8. We provide the source of this ST dataset, along with the processed ST data in h5ad format (compatible
                    with anndata python package) used to generate files for visualization shown above, which is ready to download.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/download.png"} width={800} height={350}
                           alt={"download"} style={{borderStyle:"dashed"}}/>
                </div>
            </Typography>
        </div>
    )
}