import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Anchor, Layout, Col, Row, Alert, Table,Tooltip} from 'antd';
import {FileTextFilled, DownloadOutlined, InfoOutlined} from '@ant-design/icons';
import React from "react";
import VitessceVisual from "../../../components/Datasets/DataPage/VitessceModule.js";
import {data} from '../../../components/Datasets/getData&Options.js';
import {useEffect, useState} from "react";
import Error from "next/error";
import FliesTree from "../../../components/Datasets/DataPage/FliesTree";

const { Sider } = Layout;
const { Link } = Anchor;

export async function getServerSideProps(context) {
    // params contains the post `st_id`.
    // If the route is like /datapages/1, then params.st_id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
        "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/datasets-JSON/"+context.params.st_id)
    const data = await res.json()
    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        }
    }
    const resConfig = await fetch((process.env.NODE_ENV==="production"?
            "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/vi-custom-config/"+context.params.st_id)
    const config = await resConfig.json()

    // Pass post data to the page via props
    return {
        props: {
            data:data,
            config:config
        }
    }
}

export default function DataPage(props) {
    const [targetOffset, setTargetOffset] = useState(undefined);
    const duplicateOption = props.data.Duplicate_ID.split(',')
    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            width:'40%'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            width:'60%',
            wrap:true
        },
    ];
    const dataSample =[
        {
            key:"Species",
            value:props.data.Species
        },
        props.data.Strain==='null'?{
            key:"Strain",
            value:"--"
        }:{
            key:"Strain",
            value:props.data.Strain
        },
        props.data.Developmental_stage==='null'?{
            key:"Developmental Stage",
            value:"--"
        }:{
            key:"Developmental Stage",
            value:props.data.Developmental_stage
        },
        {
            key:"Organ",
            value:props.data.Organ
        },
        {
            key:"Tissue",
            value:props.data.Tissue
        },
    ]
    const dataDuplicates =[
        {
            key:"Duplicate",
            value:props.data.Duplicate
        },
        props.data.Duplicate_ID==='null'?{
            key:"Duplicate_ID",
            value:"--"
        }:{
            key:"Duplicate ID",
            value:props.data.Duplicate_ID.split(',').join(", ")
        },
        {
            key:"Data format",
            value:props.data.Data_format
        },
        props.data.Detail==='null'?{
            key:"Detail",
            value:"--"
        }:{
            key:"Detail",
            value:props.data.Detail
        }
    ]

    useEffect(() => {
        setTargetOffset(window.innerHeight / 3);
    }, []);

    if(!props) return <Error statusCode={404}></Error>
    else return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Datasets | '+ props.data.ID}</title>
            </Head>
            <Layout>
                <Sider style={{backgroundColor:"transparent"}}>
                    <Anchor targetOffset={targetOffset} style={{paddingTop:"15vh",paddingLeft:"8vh",fontSize:18}}>
                        <Link href="#sum" title="Summary">
                            <Link href={"#sample"} title='Sample'/>
                            <Link href={"#duplicates"} title='Duplicates'/>
                        </Link>
                        <Link href="#provenance" title="Provenance" />
                        <Link href="#view" title="View" />
                        <Link href="#files" title="Files"/>
                    </Anchor>
                </Sider>
                <div className={"modal-body-stw"} style={{textAlign: "left",paddingLeft:'3%',paddingRight:'15%'}}>
                    <h3>Datasets</h3>
                    <h1 style={{fontFamily:"Tahoma, sans-serif"}}> {props.data.ID} </h1><br/>
                    <Row>
                        <Col span={8}><h2> Summary </h2></Col>
                        <Col span={8} offset={8}>
                            <a key={1} target={'_blank'} href={`/api/getDatasetsJSON/${props.data.ID}`}>
                                <Tooltip title="View JSON">
                                    <FileTextFilled style={{float:"right",fontSize:"25px",margin:'0 2%'}}/>
                                </Tooltip>
                            </a>
                            <a key={2} target={'_blank'} href={`/api/getDatasetsJSON/${props.data.ID}`} download>
                                <Tooltip title="Download JSON">
                                    <DownloadOutlined  style={{float:"right",fontSize:"25px",margin:'0 2%'}}/>
                                </Tooltip>
                            </a>
                            <a key={3} target={'_blank'} href={`/help`}>
                                <Tooltip title="View Help">
                                    <InfoOutlined style={{float:"right",fontSize:"25px",margin:'0 2%'}}/>
                                </Tooltip>
                            </a>
                        </Col>
                    </Row>
                    <div id="sum" className="site-card-wrapper" style={{padding:"2%"}}>
                        <Row gutter={30}>
                            <Col span={10}>
                                <h4>ST ID</h4>
                                <div className={"description"}>{props.data.ID}</div>
                            </Col>
                            <Col span={8}>
                                <h4>Date Published</h4>
                                <div className={"description"}>{props.data.Date_published}</div>
                            </Col>
                            <Col span={6}>
                                <h4>Method</h4>
                                <div className={"description"}>{props.data.Method}</div>
                            </Col>
                        </Row>
                    </div><br/>
                    <div style={{marginLeft:"5%"}}>
                        <Row>
                            <Col span={3} style={{minWidth:100}}>
                                <h3 id={'sample'}>Sample</h3>
                            </Col>
                            <Col span={5} style={{minWidth:200}}>
                                {props.data.Pathological==="TRUE"?
                                <Alert
                                    message={"Pathological Tissue"}
                                    type="warning"
                                    showIcon
                                />:
                                <Alert
                                    message={"Normal Tissue"}
                                    type="success"
                                    showIcon
                                />}
                            </Col>
                        </Row><br/>
                        <div className="site-card-wrapper">
                            <Table columns={columns} pagination={false} dataSource={dataSample} size="middle" />
                        </div><br/>
                        <h3 id={'duplicates'}>Duplicates</h3>
                        <div className="site-card-wrapper">
                            <Table columns={columns} pagination={false} dataSource={dataDuplicates} size="middle" />
                        </div>
                    </div>
                    <br/><br/>
                    <h2 id={'provenance'}>Provenance</h2>
                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                        <Row gutter={10}>
                            <Col span={9}>
                                <h4>Title</h4>
                                <p>{props.data.Title}</p>
                            </Col>
                            <Col span={4}>
                                <h4>Journal</h4>
                                <p>{props.data.Journal}</p>
                            </Col>
                            <Col span={3}>
                                <h4>PMID</h4>
                                <p>{props.data.PMID}</p>
                            </Col>
                            <Col span={8}>
                                <h4>URL</h4>
                                <a href={props.data.URL}>{props.data.URL}</a>
                            </Col>
                        </Row>
                    </div><br/><br/>
                    <h2 id={'view'}>View</h2>
                    <VitessceVisual st_id={props.data.ID} config={props.config} duplicateOption={duplicateOption}>
                    </VitessceVisual>
                    <br/><br/>
                    <h2 id={'files'}>Files</h2>
                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                        <FliesTree />
                    </div>
                </div>
        </Layout>
        </LayoutCustom>
    )
}