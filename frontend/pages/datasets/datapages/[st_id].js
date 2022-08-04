import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Anchor, Layout, Col, Row, Alert, Table,Tooltip} from 'antd';
import {FileTextFilled, DownloadOutlined, InfoCircleFilled} from '@ant-design/icons';
import React from "react";
import VitessceVisual from "../../../components/Datasets/DataPage/VitessceModule.js";
import {data} from '../../../components/Datasets/getData&Options.js';
import {useEffect, useState} from "react";
import Error from "next/error";
import FliesTree from "../../../components/Datasets/DataPage/FliesTree";

const { Sider } = Layout;
const { Link } = Anchor;

export async function getServerSideProps(context) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
        "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/getDatasetsJSON/"+context.params.st_id)
    const data = await res.json()
    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        }
    }
    // Pass post data to the page via props
    return { props: data }}

export default function DataPage(props) {
    const [targetOffset, setTargetOffset] = useState(undefined);
    const duplicateOption  = props.duplicate_zarr_id ? props.duplicate_zarr_id.split(',') : ['default']
    const columns = [
        {
            title: 'Key',
            dataIndex: 'key',
            width:'40%'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            width:'60vh',
            wrap:true
        },
    ];
    const dataSample =[
        {
            key:"Species",
            value:props.species
        },
        {
            key:"Strain",
            value:props.strain
        },
        {
            key:"Developmental Stage",
            value:props.developmental_stage
        },
        {
            key:"Organ",
            value:props.organ
        },
        {
            key:"Tissue",
            value:props.tissue
        },
    ]
    const dataDuplicates =[
        {
            key:"Duplicate",
            value:props.duplicate
        },
        {
            key:"Duplicate ID",
            value:props.duplicate_id
        },
        {
            key:"Data format",
            value:props.data_format
        }
    ]

    useEffect(() => {
        setTargetOffset(window.innerHeight / 2);
    }, []);

    if(!props) return <Error statusCode={404}></Error>
    else return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Datasets | '+ props.id}</title>
            </Head>
            <Layout>
                <Sider style={{backgroundColor:"transparent"}}>
                    <Anchor targetOffset={targetOffset} style={{paddingTop:"20vh",paddingLeft:"8vh",fontSize:18}}>
                        <Link href="#info" title="Information">
                            <Link href={"#sample"} title='Sample'/>
                            <Link href={"#duplicates"} title='Duplicates'/>
                        </Link>
                        <Link href="#source" title="Source" />
                        <Link href="#view" title="View" />
                        <Link href="#files" title="Files"/>
                    </Anchor>
                </Sider>
                <div className={"modal-body-stw"} style={{textAlign: "left",paddingLeft:'3%',paddingRight:'15%'}}>
                    <h3>Datasets</h3>
                    <h1 style={{fontFamily:"Tahoma, sans-serif;"}}> {props.id} </h1><br/>
                    <Row>
                        <Col span={8}><h2 id="info" > Information </h2></Col>
                        <Col span={8} offset={8}>
                            <a target={'_blank'} href={`/api/getDatasetsJSON/${props.id}`} download>
                                <Tooltip title="Download JSON">
                                    <DownloadOutlined  style={{float:"right",fontSize:"25px",margin:'0 2%'}}/>
                                </Tooltip>
                            </a>
                            <a target={'_blank'} href={`/api/getDatasetsJSON/${props.id}`}>
                                <Tooltip title="View JSON">
                                    <FileTextFilled style={{float:"right",fontSize:"25px",margin:'0 2%'}}/>
                                </Tooltip>
                            </a>
                            <a target={'_blank'} href={`/help`}>
                                <Tooltip title="View Help">
                                    <InfoCircleFilled style={{float:"right",fontSize:"25px",margin:'0 2%'}}/>
                                </Tooltip>
                            </a>
                        </Col>
                    </Row>
                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                        <Row gutter={30}>
                            <Col span={10}>
                                <h4>ST ID</h4>
                                <div className={"description"}>{props.id}</div>
                            </Col>
                            <Col span={8}>
                                <h4>Date Published</h4>
                                <div className={"description"}>{props.date_published}</div>
                            </Col>
                            <Col span={6}>
                                <h4>Method</h4>
                                <div className={"description"}>{props.method}</div>
                            </Col>
                        </Row>
                    </div><br/>
                    <div style={{marginLeft:"5%"}}>
                        <Row>
                            <Col span={3} style={{minWidth:100}}>
                                <h3 id={'sample'}>Sample</h3>
                            </Col>
                            <Col span={5} style={{minWidth:200}}>
                                {props.pathological==="TRUE"?
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
                        <Table columns={columns} pagination={false} dataSource={dataDuplicates} size="middle" />
                    </div>
                    <br/><br/>
                    <h2 id={'source'}>Source</h2>
                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                        <Row gutter={10}>
                            <Col span={9}>
                                <h4>Title</h4>
                                <p>{props.title}</p>
                            </Col>
                            <Col span={4}>
                                <h4>Journal</h4>
                                <p>{props.journal}</p>
                            </Col>
                            <Col span={3}>
                                <h4>PMID</h4>
                                <p>{props.pmid}</p>
                            </Col>
                            <Col span={8}>
                                <h4>URL</h4>
                                <a href={props.URL}>{props.URL}</a>
                            </Col>
                        </Row>
                    </div><br/><br/>
                    <h2 id={'view'}>View</h2>
                    <VitessceVisual st_id={props.id} duplicateOption={duplicateOption}></VitessceVisual>
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