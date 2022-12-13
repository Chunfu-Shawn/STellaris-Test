import {Button, Space} from "antd";
import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Overview(){
    return(
        <div name={"Overview"}>
            <a id={"Overview"} style={{position: 'relative', top: "-150px"}}></a>
            <h2>Overview</h2>
            <p>
                The original intent of STellaris was to provide a platform for rapid spatial reconstruction of ever-going single-cell transcriptome (scRNA-seq) data based on the emerging spatial transcriptome (ST) methodology, thus helping researchers make full use of the increasing volume of single-cell genomic data at spatial context. We provides tutorials on the three major tools implemented in STellaris, including Spatial Mapping, Dataset Browser and Gene Search.
            </p>
            <p>
                Spatial Mapping is the key function of STellaris. We will guide users to get started using STellaris to map their own annotated scRNA-seq data to spatial position in tissue sections curated in our local database. We also include a tutorial on how to systematically interpret the spatial mapping results and downstream intercellular communication results. To demonstrate the usefulness of STellaris in real-world data, we provide tutorials on the application of deciphering tumor microenvironment of human pancreatic ductal adenocarcinomas (PCDA) and spatial-resolved single-cell multiomics from mouse brain for further study. In addition, we also offer tutorials on how to browser and search our curated ST datasets and retrieve expression signatures of candidate genes across tissues from the spatial perspective.
            </p>
            <p style={{marginBottom:0}}>Note that we include three example jobs of Spatial Mapping that have already been completed:</p>
            <Button type={"link"}>
                <Link href={"/mapping/resultPage/c71959a0-6a62-11ed-a471-a39e452631de"}>
                    <span>
                        Mouse fetal brain <b><i>(FINISHED)</i></b>
                    </span>
                </Link>
            </Button>
            <Button type={"link"}>
                <Link href={"/mapping/resultPage/1fdb50c0-726a-11ed-a8ae-05b48e1b9d52"}>
                    <span>
                        Mouse organogenesis <b><i>(FINISHED)</i></b>
                    </span>
                </Link>
            </Button>
            <Button type={"link"}>
                <Link href={"/mapping/resultPage/be5c2ed0-73c4-11ed-b6c1-d3f15153eaa4"}>
                    <span>
                        Tumor microenvironment in PDAC <b><i>(FINISHED)</i></b>
                    </span>
                </Link>
            </Button>
            <p style={{marginBottom:0}}>and three corresponding examples to be executed leading to these results:</p>
            <Button type={"link"}>
                <Link href={"/"}>
                    <span>
                        Mouse fetal brain <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Link>
            </Button>
            <Button type={"link"}>
                <Link href={"/"}>
                    <span>
                        Mouse organogenesis <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Link>
            </Button>
            <Button type={"link"}>
                <Link href={"/"}>
                    <span>
                        Tumor microenvironment in PDAC <b><i>(FROM SCRATCH)</i></b>
                    </span>
                </Link>
            </Button>
            <p>You can get started using these demo cases from <b>Home page</b> or <b>Mapping page</b> in the navigation bar.</p>
            <Space>
                <Image src={"/images/tutorial/example1.png"} width={500} height={300}
                       alt={"example1"} style={{borderStyle:"dashed"}}/>
                <Image src={"/images/tutorial/example2.png"} width={500} height={300}
                       alt={"example2"} style={{borderStyle:"dashed"}}/>
            </Space>
            <br/><br/>
        </div>
    )
}