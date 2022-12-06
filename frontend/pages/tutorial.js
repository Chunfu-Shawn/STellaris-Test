import React,{useRef} from 'react';
import Head from "next/head";
import {Affix, Button, Col, Row, Space, Typography} from "antd";
import LayoutCustom from "../components/LayoutCustom";
import TutorialSiderMenu from "../components/Tutorial/TutorialSiderMenu";
import Link from "next/link.js";
import {throttle} from "../components/util";
import Image from "next/image";

export default function Help() {
    const divContent = useRef(null); //标识nav导航栏渲染内容

    return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Tutorial'}</title>
            </Head>
            <div
                className={"modal-body-stw with-sider"}
            >
                <Row style={{width:"100%"}}>
                    <Col span={5}>
                        <Affix offsetTop={120}>
                            <TutorialSiderMenu divContent={divContent}/>
                        </Affix>
                    </Col>
                    <Col span={19}>
                        <Typography style={{fontSize:16}}>
                            <div ref={divContent}>
                                <h1>Tutorial</h1>
                                <div name={"Information"}>
                                    <a id={"Information"} style={{position: 'relative', top: "-150px"}}></a>
                                    <h2>General Information</h2>
                                    <p>This tutorial is about Spatial Mapping module, and contains guidance information
                                        and some examples where needed and brief descriptions of inputs and results to
                                        help you understand this module.</p>
                                    <p style={{marginBottom:0}}>We have <b>three finished example jobs</b>:</p>
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
                                    <p style={{marginBottom:0}}>and <b>three example jobs to run from scratch</b> for users:</p>
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
                                    <p>You can run or view them from <b>home page or mapping module page</b>:</p>
                                    <Space>
                                        <Image src={"/images/tutorial/example1.png"} width={500} height={300}
                                               alt={"example1"} style={{borderStyle:"dashed"}}/>
                                        <Image src={"/images/tutorial/example2.png"} width={500} height={300}
                                               alt={"example2"} style={{borderStyle:"dashed"}}/>
                                    </Space>
                                    <br/><br/>
                                </div>
                                <div name={"Guide"}>
                                    <a id={"Guide"} style={{position: 'relative', top: "-150px"}}></a>
                                    <h2>Guide</h2>
                                    <p>Spatial Mapping Module can help users to carry out accurate spatial reconstruction
                                        of scRNA-seq. Here we guide users to properly use this function module from
                                        scratch step by step and account for inputs and results to help you understand this module.
                                    </p>
                                    <h3>1. Input basic information</h3>
                                    <p>Name your submitted job a title briefly, which is requested and can not be longer
                                        than 80 characters. We recommend you providing an email address to monitor the
                                        project progress but that is optional.
                                    </p>
                                    <h3>2. Select matched species, organ and tissue</h3>
                                    <p>Please select species, organ and tissue in turn that match your scRNA-seq data
                                        ready to upload. This step is very important that may affect the accuracy of
                                        following spatial mapping because the corresponding reference ST section will be
                                        selected from datasets meet these conditions. Here we select species:
                                        &quot;Mus musculus&quot;, organ: &quot;Brain&quot; and tissue: &quot;Brain&quot;.
                                    </p>
                                </div>
                            </div>
                        </Typography>
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}