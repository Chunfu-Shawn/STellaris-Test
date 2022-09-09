import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Col, Row, Table, Tooltip, Divider, Tag, Affix} from 'antd';
import {FileTextFilled, DownloadOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import React from "react";
import Error from "next/error";
import FliesTree from "../../../components/Datasets/DataPage/FliesTree";
import DataPageSiderMenu from "../../../components/Datasets/DataPage/DataPageSiderMenu.js"
import {useRef} from "react";
import Link from "next/link.js";
import Summary from "../../../components/GenePage/Summary.js";
import Sample from "../../../components/Datasets/DataPage/Sample";
import VisualToolModule from "../../../components/Datasets/DataPage/VisualToolModule";

export async function getServerSideProps(context) {
    // params contains the post `st_id`.
    // If the route is like /datapages/1, then params.st_id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/datasets-JSON/"+context.params.st_id)
    const data = await res.json()
    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        }
    }
    const resConfig = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000/")
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
    const divContent = useRef(null); //标识nav导航栏渲染内容
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
    const dataSample = [
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
        {
            key: "Pathological",
            value: props.data.Pathological==='null'?"false":props.data.Pathological
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
    const iconStyle = {color:"dimgray",float:"right",fontSize:"22px",margin:'0 2%'}

    if(!props) return <Error statusCode={404}></Error>
    else return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Datasets | '+ props.data.ID}</title>
            </Head>
                <div className={"modal-body-stw with-sider"}>
                    <Row style={{width:"100%"}}>
                        <Col span={5}>
                            <Affix offsetTop={120}>
                                <DataPageSiderMenu divContent={divContent}/>
                            </Affix>
                        </Col>
                        <Col span={19}>
                            <div ref={divContent}>
                                <h4>Dataset</h4>
                                <h2 style={{fontFamily:"Tahoma, sans-serif"}}> {props.data.ID} </h2>
                                <div name={"Summary"}>
                                    <a id={"Summary"} style={{position: 'relative', top: "-200px"}}></a>
                                    <Row style={{height:50}}>
                                        <Col span={8}>
                                            {props.data.Pathological==="TRUE"?
                                                <Tag color="red">Pathological Tissue</Tag>
                                                :
                                                <Tag color="green">Normal Tissue</Tag>}
                                            {props.data.Species==="Homo sapiens"?
                                                <Tag color="gold">Homo sapiens</Tag>
                                                :
                                                <Tag color="blue">Mus musculus</Tag>}
                                        </Col>
                                        <Col span={8} offset={8}>
                                            <a key={1} target={'_blank'} href={`/api/getDatasetsJSON/${props.data.ID}`} rel="noreferrer" >
                                                <Tooltip title="View JSON">
                                                    <FileTextFilled style={iconStyle}/>
                                                </Tooltip>
                                            </a>
                                            <a key={2} target={'_blank'} href={`/api/getDatasetsJSON/${props.data.ID}`} download rel="noreferrer" >
                                                <Tooltip title="Download JSON">
                                                    <DownloadOutlined  style={iconStyle}/>
                                                </Tooltip>
                                            </a>
                                            <a key={3} target={'_blank'} href={`/help/manual/datasets`} rel="noreferrer" >
                                                <Tooltip title="View Help">
                                                    <QuestionCircleOutlined style={iconStyle}/>
                                                </Tooltip>
                                            </a>
                                        </Col>
                                    </Row>
                                    <div className="site-card-wrapper" style={{padding:"2%"}}>
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
                                    </div>
                                </div>
                                <Sample data={props.data}/>
                                <div name={"Duplicates"}>
                                    <a id={"Duplicates"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Duplicates </span>
                                        <Link href={'/help/manual/datasets#data_page_duplicates'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
                                    <div className={"site-card-wrapper"}>
                                        <Table columns={columns} pagination={false} dataSource={dataDuplicates} size={"middle"}/>
                                    </div>
                                </div>
                                <div name={"Source"}>
                                    <a id={"Source"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Source </span>
                                        <Link href={'/help/manual/datasets#data_page_source'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
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
                                    </div>
                                </div>
                                <VisualToolModule
                                    st_id={props.data.ID}
                                    duplicateOption={duplicateOption}
                                    />
                                <div name={"Files"}>
                                    <a id={"Files"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Files </span>
                                        <Link href={'/help/manual/datasets#data_page_files'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
                                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                                        <FliesTree />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
        </LayoutCustom>
    )
}