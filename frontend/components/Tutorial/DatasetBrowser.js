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
                    This tutorial aims to show you how to navigate our dataset browser, which is the data basis for spatial
                    mapping tools.
                </p>
                <p>
                    We included 100 datasets comprising 774 sections across organs, developmental stage and pathological states
                    in human and mouse. All curated ST datasets were processed by a centralized workflow. We provide this
                    interface for you to navigate through this catalog. Choose the ST data of your concern and explore the
                    spatially resolved expression profile of genes of interest.
                </p>
                <p>
                    Here we will use a ST data derived from postnatal mouse brain (P8) using 10X Visium technique as an example.
                </p>
                <p>
                    1. Click &quot;Datasets&quot; tab in navigator bar on the top. The bar plots summarize the number of ST datasets or
                    sections in human and mouse compiled by our development team.
                </p>
                <p>
                    2. Click &quot;Mouse Archive&quot; to browser ST data of mouse.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/dataset.png"} width={800} height={450}
                           alt={"dataset"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    3. Choose the ST technology, organ and pathological state of your interest to screen the ST data. Here we
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
                    4. Check the meta information of this ST dataset, such as the details of the sample and section information
                    belonging to this dataset.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/dataset1.png"} width={800} height={450}
                           alt={"dataset1"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    5. Skip to &quot;View&quot; tab to explore the spatial resolved expression profile of genes of interest.
                    Enter gene symbol in &quot;Genes/Features&quot; box (e.g., Kr8, Slc17a7 and Mbp).
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
                    6. We have clustered spots into subgroups using traditional clustering (leiden algorithm) and spatial
                    clustering method (STAGATE) with multiple resolutions. Select an item in &quot;Cell Metadata&quot; drop-down box
                    for clustering result (e.g., leiden0.5, leiden0.5_STAGATE).
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
                    7. Select a set of marker genes in &quot;Sets&quot; drop-down box to view the gallery of maker gene
                    expression for a certain cluster. Click on one of the gallery charts to make it the primary view.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/set2.png"} width={800} height={500}
                           alt={"set2"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>
                    8. The source of this ST dataset is provided, and the processed ST data in h5ad (compatible with anndata
                    python package) format, which was used to generate file for visualization shown above, is ready to download.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/dataset/download.png"} width={800} height={350}
                           alt={"download"} style={{borderStyle:"dashed"}}/>
                </div>
            </Typography>
        </div>
    )
}