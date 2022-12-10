import React,{useRef} from 'react';
import Head from "next/head";
import {Affix, Button, Col, Row, Space, Typography} from "antd";
import LayoutCustom from "../components/LayoutCustom";
import TutorialSiderMenu from "../components/Tutorial/TutorialSiderMenu";
import Link from "next/link.js";
import Image from "next/image";

export default function Help() {
    const divContent = useRef(null); //标识nav导航栏渲染内容

    return (
        <LayoutCustom>
            <Head>
                <title>{'STellaris | Tutorial'}</title>
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
                                    <h2>Guide for spatial mapping</h2>
                                    <p>Spatial Mapping Module can help users to carry out accurate spatial reconstruction
                                        of scRNA-seq. Here we guide users to properly use this function module from
                                        scratch step by step and account for inputs and results to help you understand this module.
                                    </p>
                                    <p>
                                        <b> In this guide we use example &quot;Mouse fetal brain&quot; to run from scratch.</b>
                                    </p>
                                    <h3>1. Input basic information</h3>
                                    <p>Name your submitted job a title briefly, which is requested and can not be longer
                                        than 80 characters. We recommend you providing an email address to monitor the
                                        project progress but that is optional.
                                    </p>
                                    <div style={{textAlign:"center"}}>
                                        <Image src={"/images/tutorial/step1.png"} width={800} height={450}
                                               alt={"step1"} style={{borderStyle:"dashed"}}/>
                                    </div>
                                    <h3>2. Select matched species, organ and tissue</h3>
                                    <p>Please select species, organ and tissue in turn that match your scRNA-seq data
                                        ready to upload. This step is very important that may affect the accuracy of
                                        following spatial mapping because the corresponding reference ST section will be
                                        selected from datasets meet these conditions. Here we select species:
                                        &quot;Mus musculus&quot;, organ: &quot;Brain&quot; and tissue: &quot;Brain&quot;.
                                    </p>
                                    <div style={{textAlign:"center"}}>
                                        <Image src={"/images/tutorial/step2.png"} width={800} height={450}
                                               alt={"step1"} style={{borderStyle:"dashed"}}/>
                                    </div>
                                    <h3>3. Select scRNA-seq Data</h3>
                                    <p>
                                        Then select your scRNA-seq Data including count matrix file and label file with
                                        cell type annotation. These two files must meet some format requirements, and
                                        formats accepted are .csv, .tsv and .txt in .gz/zip compression. More information
                                        and examples will show when your mouse hovering on &quot;?&quot;, and click on it to view
                                        details in <Link href={"/help/manual/mapping#format_uploaded_files"}>
                                        <a>&quot;Manual/Mapping/Format&quot;</a></Link> page
                                    </p>
                                    <p>Here we select count matrix file and label file of E14.5 mouse cerebral cortex scRNA-seq data.</p>
                                    <div style={{textAlign:"center"}}>
                                        <Image src={"/images/tutorial/step3.png"} width={800} height={450}
                                               alt={"step3"} style={{borderStyle:"dashed"}}/>
                                    </div>
                                    <h3>4. Upload and Wait</h3>
                                    <p>
                                        Click on the &quot;Upload&quot; button and upload your scRNA-seq data. when upload is
                                        complete website will show a &quot;upload successfully&quot; at the top of the page and
                                        redirect you to a running page. Please wait!
                                    </p>
                                    <div style={{textAlign:"center"}}>
                                        <Image src={"/images/tutorial/step4.png"} width={800} height={450}
                                               alt={"step4"} style={{borderStyle:"dashed"}}/>
                                    </div>
                                    <h3>5. Section Blast Running</h3>
                                    <p>
                                        After uploading your scRNA-seq data, we first carry out &quot;Section Blast&quot; to search
                                        for the best match reference spatial transcriptome data from our curated ST datasets
                                        which is from species, organ and tissue selected before. (see details in
                                        <Link href={"/help/manual/mapping#section_blast"}>
                                            <a>&quot;Manual/Mapping/Section Blast&quot;</a></Link>)
                                    </p>
                                    <p>This procedure will cost about 2 min. Users can download two files submitted before
                                        at first bar of steps navigation bar. Left bottom box shows the program log and
                                        right table shows some basic job information such as Title, Job id, Email, Start
                                        time, Run time and so on.</p>
                                    <div style={{textAlign:"center"}}>
                                        <Image src={"/images/tutorial/.png"} width={800} height={450}
                                               alt={"step4"} style={{borderStyle:"dashed"}}/>
                                    </div>
                                    <h3>6. Select a section</h3>
                                    <p>
                                        After section blast is complete, the page will present the result where there is
                                        some basic information same to before at the top, and following bar graph shows
                                        the enrichment score of different reference ST sections ordered from highest to
                                        lowest (the top horizontal bar help users to zoom in the bar graph).
                                    </p>
                                    <p>Then following table presents some attributes of all sections (104 section in this
                                        example) such as ST ID, Section ID, Method, Note, Pathological, Score and so on
                                        (see details in “Manual/Datasets/Attributes”) which is ordered by enrichment score
                                        in descend. You can also order these sections or filter off some sections by the
                                        top filter menu in columns.</p>
                                    <p>Every row has a “select” buttom in last which users click on to select this section
                                        as reference ST data in following core spatial mapping procedure. Then there is
                                        a “Confirm Dialogs” showing where confirm your selected section to start mapping
                                        and set advanced mapping parameters to adjust your mapping program (see details in
                                        “Manual/Spatial Mapping/Advanced Mapping Parameters”). Last click on “OK” buttom
                                        to start spatial mapping and watch a running page!</p>
                                    <div style={{textAlign:"center"}}>
                                        <Image src={"/images/tutorial/.png"} width={800} height={450}
                                               alt={"step4"} style={{borderStyle:"dashed"}}/>
                                    </div>
                                    <h3>7. Spatial Mapping Running</h3>
                                    <p>
                                        The Spatial Mapping will perform mapping program to predict spatial locations of
                                        single cells, evaluate the colocalization of different cell types and predict
                                        the most probable ligand-receptor interactions (see details in “Manual/Mapping/ Mapping”).
                                        So this core procedure will cost about 30 min.
                                    </p>
                                    <p>Running page shows reference ST section in left top, and the left bottom box shows
                                        the program log and the right table shows some basic job information.</p>
                                    <div style={{textAlign:"center"}}>
                                        <Image src={"/images/tutorial/.png"} width={800} height={450}
                                               alt={"step4"} style={{borderStyle:"dashed"}}/>
                                    </div>
                                </div>
                            </div>
                        </Typography>
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}