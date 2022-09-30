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
import AttributeLayout from "../../../components/GenePage/AttributeLayout";
import {DateFomatter} from "../../../components/util";

export async function getServerSideProps(context) {
    // params contains the post `st_id`.
    // If the route is like /datapages/1, then params.st_id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/datasets-info/"+context.params.st_id)
    // 取搜索结果数组中的第一个结果
    const data = await res.json()
    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        }
    }
    /*const resConfig = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000/")
        +"api/vi-custom-config/"+context.params.st_id)
    const config = await resConfig.json()*/

    // Pass post data to the page via props
    return {
        props: {
            data:data[0],
            //config:config
        }
    }
}

export default function DataPage(props) {
    const divContent = useRef(null); //标识nav导航栏渲染内容
    const duplicateOption = props.data.duplicate_id.split(',')
    const geneColumns = [
        {
            title: 'Gene Name',
            dataIndex: 'gene_name',
            width:'20%',
        },
        {
            title: 'Ensembl ID',
            dataIndex: 'ensembl_id',
            width:'20%',
            render: (text) => <Link href={`/genePage/${text}`}><a target={'_blank'}>{text}</a></Link>
        },
        {
            title: 'Duplicate ID',
            dataIndex: 'duplicate_id',
            width:'30%',
            wrap:true
        },
        {
            title: 'Main Distribution',
            dataIndex: 'main_distribution',
            width:'30%',
            wrap:true
        },
    ];
    const regionSpecificGenes = [
        {
            key:1,
            gene_name: 'ID2',
            ensembl_id: "ENSG00000115738",
            main_distribution: 'cluster1, cluster2, cluster3'
        }
    ]
    const iconStyle = {color:"dimgray",float:"right",fontSize:"22px",margin:'0 2%'}

    if(!props) return <Error statusCode={404}></Error>
    else return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Datasets | '+ props.data.id}</title>
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
                                <h2 style={{fontFamily:"Tahoma, sans-serif"}}> {props.data.id} </h2>
                                <div name={"Summary"}>
                                    <a id={"Summary"} style={{position: 'relative', top: "-200px"}}></a>
                                    <Row style={{height:50}}>
                                        <Col span={8}>
                                            {props.data.pathological==="TRUE"?
                                                <Tag color="red">Pathological Tissue</Tag>
                                                :
                                                <Tag color="green">Normal Tissue</Tag>}
                                            {props.data.species==="Homo sapiens"?
                                                <Tag color="gold">Homo sapiens</Tag>
                                                :
                                                <Tag color="blue">Mus musculus</Tag>}
                                        </Col>
                                        <Col span={8} offset={8}>
                                            <a key={1} target={'_blank'} href={`/api/datasets-info/${props.data.id}`} rel="noreferrer" >
                                                <Tooltip title="View JSON">
                                                    <FileTextFilled style={iconStyle}/>
                                                </Tooltip>
                                            </a>
                                            <a key={2} target={'_blank'} href={`/api/datasets-info/${props.data.id}`} download rel="noreferrer" >
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
                                                <div className={"description"}>{props.data.id}</div>
                                            </Col>
                                            <Col span={8}>
                                                <h4>Date Published</h4>
                                                <div className={"description"}>{DateFomatter(new Date(props.data.date_published))}</div>
                                            </Col>
                                            <Col span={6}>
                                                <h4>Method</h4>
                                                <div className={"description"}>{props.data.method}</div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <Sample data={props.data}/>
                                <div name={"Duplicates"}>
                                    <a id={"Duplicates"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Duplicates </span>
                                        <Link href={'/help/manual/datasets#data_page_attributes'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
                                    <AttributeLayout attribute={"Number of Duplicates"}>{props.data.duplicate}</AttributeLayout>
                                    <div style={{wordBreak:"break-all", wordWrap:"break-word"}}>
                                        <AttributeLayout attribute={"Duplicate ID"}>{props.data.duplicate_id!==null?props.data.duplicate_id:"--"}</AttributeLayout>
                                    </div>
                                </div>
                                <div name={"Features"}>
                                    <a id={"Features"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Features </span>
                                        <Link href={'/help/manual/datasets#data_page_features'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
                                    <div style={{marginLeft:20}}>
                                        <Divider orientation="left" orientationMargin="0" dashed>
                                            <span style={{fontSize:18}}>Region variable Genes</span>
                                        </Divider>
                                        <div style={{overflow:"scroll",height:200}}>
                                            <Table columns={geneColumns} pagination={false} dataSource={regionSpecificGenes}
                                                   size={"middle"}
                                                   bordered={true}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <VisualToolModule
                                    st_id={props.data.id}
                                    duplicateOption={duplicateOption}
                                    />
                                <div name={"Source"}>
                                    <a id={"Source"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Source </span>
                                        <Link href={'/help/manual/datasets#data_page_attributes'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
                                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                                        <Row gutter={10}>
                                            <Col span={9}>
                                                <h4>Title</h4>
                                                <p>{props.data.title}</p>
                                            </Col>
                                            <Col span={4}>
                                                <h4>Journal</h4>
                                                <p>{props.data.journal}</p>
                                            </Col>
                                            <Col span={3}>
                                                <h4>PMID</h4>
                                                <p>{props.data.pmid}</p>
                                            </Col>
                                            <Col span={8}>
                                                <h4>URL</h4>
                                                <a href={props.data.url}>{props.data.url}</a>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div name={"Files"}>
                                    <a id={"Files"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Files </span>
                                    </Divider>
                                    <div className="site-card-wrapper" style={{padding:"10px"}}>
                                        <FliesTree st_id={props.data.id} duplicates_id={duplicateOption}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
        </LayoutCustom>
    )
}