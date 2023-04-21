import {Breadcrumb, Button, Space, Typography, Image} from "antd";
import Link from "next/link";
import React from "react";
import {contentStyle} from "../Help/SiderStaticMenu";

export default function Overview(){
    return(
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Overview</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"Overview"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Overview</h2>
                <p>
                    STellaris is a platform designed for rapid spatial mapping for single-cell RNA sequencing (scRNA-seq)
                    data based on emerging spatial transcriptomics (ST) data. Our goal is to help users make full use of
                    the increasing volume of single-cell omics data in the spatial context. We provide walk-through tutorials
                    on the three major tools implemented in STellaris, including<b> spatial mapping</b>, <b>dataset browser</b>
                    and <b>gene search</b> tools.
                </p>
                <p>
                    We offer guidance to users on how to get started to map their annotated scRNA-seq data to spatial
                    positions in tissue sections curated in our local database (see
                    <Link href={"/tutorial/mapping/getStarted"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> Get started</b>
                        </a>
                    </Link>
                    ). We also provide a tutorial on how to systematically interpret the spatial mapping results and
                    downstream intercellular communication results. (see
                    <Link href={"/tutorial/mapping/mouseBrain"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> Result interpretation</b>
                        </a>
                    </Link>
                    ). To demonstrate the usefulness of STellaris in real-world data, we provide tutorials on the case
                    studies: (i) dissecting the spatial organization of the developing mouse cerebral cortex (see
                    <Link href={"/tutorial/mapping/mouseBrain"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> Mouse fetal brain</b>
                        </a>
                    </Link>
                    ), (ii) mapping intercellular crosstalk at tumor leading edges of human squamous cell carcinoma (see
                    <Link href={"/tutorial/mapping/humanSCC"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> Human squamous cell carcinoma</b>
                        </a>
                    </Link>
                    ), and (iii) deciphering the spatial patterning of H3K4me3 modification in the mouse brain (see
                    <Link href={"/tutorial/mapping/multiomics"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> H3K4me3 modification in mouse brain</b>
                        </a>
                    </Link>
                    ). In addition, we offer tutorials on how to view our curated ST datasets (
                    <Link href={"/tutorial/datasets"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>Dataset browser</b>
                        </a>
                    </Link>
                    ) and retrieve tissue-wide expression signatures of genes (
                    <Link href={"/tutorial/gene"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>Gene search</b>
                        </a>
                    </Link>
                    ) from a spatial perspective.
                </p>
                <p style={{marginBottom:0}}>
                    Please note that we provide three case studies that have already been completed:
                </p>
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/52fa0100-909b-11ed-9249-979b422f6c75"}>
                        <span>
                            Mouse fetal brain <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/b3ae1730-90b3-11ed-9695-b54d6690f34b"}>
                        <span>
                            Human squamous cell carcinoma <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
                <Button type={"link"}>
                    <a href={"/mapping/resultPage/75afdf70-c300-11ed-8a89-3fb9e5c5307c"}>
                        <span>
                            H3K4me3 modification in mouse brain <b><i>(FINISHED)</i></b>
                        </span>
                    </a>
                </Button>
                <p style={{marginBottom:0}}>
                    Additionally, we offer three corresponding job request that can be executed to repeat these results:
                </p>
                <Button type={"link"}>
                    <a href={"/mapping"}>
                        <span>
                            Mouse fetal brain <b><i>(FROM SCRATCH)</i></b>
                        </span>
                    </a>
                </Button>
                <Button type={"link"}>
                    <a href={"/mapping"}>
                        <span>
                            Human squamous cell carcinoma <b><i>(FROM SCRATCH)</i></b>
                        </span>
                    </a>
                </Button>
                <Button type={"link"}>
                    <a href={"/mapping"}>
                        <span>
                            H3K4me3 modification in mouse brain <b><i>(FROM SCRATCH)</i></b>
                        </span>
                    </a>
                </Button>
                <p>
                    To explore these demo cases, simply visit the <b>Home page</b> or <b>Mapping page</b> in the navigation bar.
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/example1.png"} width={500} height={300}
                           alt={"example1"} style={{borderStyle:"dashed"}}/>
                        <Image src={"/images/tutorial/example2.png"} width={500} height={300}
                           alt={"example2"} style={{borderStyle:"dashed"}}/>
                    </Space>
                </div>
                <div style={{textAlign:"center",marginTop:10}} >
                    <Image src={"/images/tutorial/example3.png"} width={500} height={300}
                           alt={"example3"}/>
                </div>
                <br/><br/>
            </Typography>
        </div>
    )
}