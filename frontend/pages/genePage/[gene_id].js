import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import {Anchor, Col, Divider, Layout, Row} from 'antd';
import React from "react";
import Error from "next/error";
import {SiderMenu} from "../../components/GenePage/SiderMenu.js";
import Link from "next/link.js";
import {LinkOutlined} from "@ant-design/icons";


export async function getServerSideProps(context) {
    const res = await fetch((process.env.NODE_ENV==="production"?
            "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/gene/"+ context.params.gene_id
    )
    const data = await res.json()
    const resTrans = await fetch((process.env.NODE_ENV==="production"?
            "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/gene/transcript/"+ context.params.gene_id
    )
    const dataTrans = await resTrans.json()
    if (Object.keys(context.params).length === 0) {
        return {
            notFound: true,
        }
    }

    // Pass post data to the page via props
    return {
        props: {
            // return first record
            data:data[0],
            trans:dataTrans
        }
    }
}

export default function genePage(props) {
    let HGNC = ""
    props.data.dbXrefs.split('|').forEach((item)=>{
        if(item.split(":")[0]==="HGNC") HGNC = item.split(":")[2]
    })
    return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Gene Browser | '+ props.data.ensembl_id}</title>
            </Head>
            <Layout hasSider style={{backgroundColor:"transparent"}}>
                <SiderMenu/>
                <div style={{minWidth:"1200px",marginLeft:"200px",padding:"15vh 50px",textAlign:"left"}}>
                    <div id={"gene_name"}>
                        <span style={{fontSize:"22px",fontWeight:"bold"}}>{props.data.symbol}</span>
                        <span style={{fontWeight:"bold",color:"gray"}}> {props.data.ensembl_id}</span>
                        <p style={{color:"gray"}}>Entrez id:
                            <a href={`https://www.ncbi.nlm.nih.gov/gene/${props.data.entrez_id}`} target={"_blank"}>{` ${props.data.entrez_id}`}<LinkOutlined /></a>
                        </p>
                    </div>
                    <div id={"Summary"}>
                        <Divider orientation="left" orientationMargin="0"><b>Summary</b></Divider>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Symbol</span></Col>
                            <Col span={19}>
                                <a target={"_blank"} href={`https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:${HGNC}`}>
                                    {props.data.symbol}<LinkOutlined /></a>
                                <span style={{color:"gray"}}>{` (${props.data.name_source})`}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Description</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>{props.data.descriptive_name}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Gene Type</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>
                                    {props.data.biotype}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Organism</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>
                                    {props.data.organism}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Gene Synonyms</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>
                                    {props.data.name_synonyms.split('|').join(', ')}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Other Designations</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>
                                    {props.data.other_designations.split('|').join('; ')}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Identifiers in Other DB</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>
                                    {props.data.dbXrefs.split('|').map((item)=>{
                                        if(item.split(":")[0]==="HGNC")
                                            return <span id={item.split(":")[0]}><a target={"_blank"}
                                                            href={`https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:${item.split(":")[2]}`}>
                                                {item.split(":")[0]}:{item.split(":")[1]}:{item.split(":")[2]}<LinkOutlined /></a>, </span>
                                        if(item.split(":")[0]==="MGI")
                                            return <span id={item.split(":")[0]}><a target={"_blank"}
                                                            href={`http://www.informatics.jax.org/marker/${item.split(":")[1]}:${item.split(":")[2]}`}>
                                                {item.split(":")[0]}:{item.split(":")[1]}:{item.split(":")[2]}<LinkOutlined /></a>, </span>
                                        if(item.split(":")[0]==="Ensembl")
                                            return <span id={item.split(":")[0]}><a target={"_blank"}
                                                            href={`http://www.ensembl.org/id/${item.split(":")[1]}`}>
                                                {item.split(":")[0]}:{item.split(":")[1]}<LinkOutlined /></a>, </span>
                                        if(item.split(":")[0]==="MIM")
                                            return <span id={item.split(":")[0]}><a target={"_blank"}
                                                            href={`https://omim.org/entry/${item.split(":")[1]}`}>
                                                {item.split(":")[0]}:{item.split(":")[1]}<LinkOutlined /></a>, </span>
                                        if(item.split(":")[0]==="AllianceGenome")
                                            return <span id={item.split(":")[0]}><a target={"_blank"}
                                                            href={`https://www.alliancegenome.org/gene/${item.split(":")[1]}:${item.split(":")[2]}`}>
                                                {item.split(":")[0]}:{item.split(":")[1]}:{item.split(":")[2]}<LinkOutlined /></a>, </span>
                                    })}
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Gene Version</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>
                                    {props.data.version} (provided by Ensembl)
                                </span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Gene Source</span></Col>
                            <Col span={19}>
                                <span style={{color:"gray"}}>
                                    {props.data.gene_source}
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div id={"Features"}>
                        <Divider orientation="left" orientationMargin="0"><b>Features</b></Divider>
                        <div id={"Genomic Context"} style={{marginLeft:"20px"}}>
                            <Divider orientation="left" orientationMargin="0" dashed><b>Genomic Context</b></Divider>
                            <Row>
                                <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Location</span></Col>
                                <Col span={19}>
                                <span style={{color:"gray"}}>
                                    <a target={"_blank"} href={`http://www.ensembl.org/Homo_sapiens/Location/View?g=${props.data.ensembl_id}`}>Chromosome  {`${props.data.chrom_scaf}: ${props.data.start}-${props.data.end}`}
                                        {props.data.strand==="1"?" forward strand.":" reverse strand."}<LinkOutlined /></a>
                                </span>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={5}><span style={{fontWeight:"bold",color:"dimgray"}}>Chromosomal Location</span></Col>
                                <Col span={19}>
                                    <span style={{color:"gray"}}>{props.data.map_location}</span>
                                </Col>
                            </Row>
                        </div>
                        <div id={"Transcript"} style={{marginLeft:"20px"}}>
                            <Divider orientation="left" orientationMargin="0" dashed><b>Transcript</b></Divider>

                        </div>
                    </div>
                </div>
            </Layout>
        </LayoutCustom>
    )
}