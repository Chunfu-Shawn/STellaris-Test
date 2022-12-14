import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Col, Row, Table, Tooltip, Divider, Tag, Affix} from 'antd';
import {FileTextFilled, DownloadOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import React from "react";
import FliesTree from "../../../components/Datasets/DataPage/FliesTree";
import DataPageSiderMenu from "../../../components/Datasets/DataPage/DataPageSiderMenu.js"
import {useRef} from "react";
import Link from "next/link.js";
import Summary from "../../../components/GenePage/Summary.js";
import Sample from "../../../components/Datasets/DataPage/Sample";
import VisualToolModule from "../../../components/Datasets/DataPage/VisualToolModule";
import AttributeLayout from "../../../components/GenePage/AttributeLayout";
import {DateFomatter} from "../../../components/util";
import Features from "../../../components/Datasets/DataPage/Features";

export async function getServerSideProps(context) {
    // params contains the post `st_id`.
    // If the route is like /datapages/1, then params.st_id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/datasets-info/"+context.params.st_id)
    const data = await res.json()
    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        }
    }

    // 取搜索结果数组中的第一个结果
    const sectionOption = data[0].section_id.split(',')

    // get correlation of genes expression
    /*let genesExpressionCorrelation = []
    for (const item of sectionOption) {
        const res = await fetch((process.env.NODE_ENV==="production"?
                process.env.PRODUCTION_URL:"http://localhost:3000")
            +"/api/genes-expression-correlation/section/"+item)
        const data = await res.json()
        genesExpressionCorrelation.push.apply(genesExpressionCorrelation, data)
    }*/

    // Pass post data to the page via props
    return {
        props: {
            data:data[0],
            sectionOption:sectionOption,
            //spatiallyVariableGenes:spatiallyVariableGenes,
            //genesExpressionCorrelation:genesExpressionCorrelation,
            //config:config
        }
    }
}

export default function DataPage(props) {
    const divContent = useRef(null); //标识nav导航栏渲染内容
    const iconStyle = {color:"dimgray",float:"right",fontSize:"22px",margin:'0 2%'}

    return (
        <LayoutCustom>
            <Head>
                <title>{'STellaris | Datasets | '+ props.data.id}</title>
            </Head>
                <div className={"modal-body-stw with-sider"}>
                    <Row style={{width:"100%"}}>
                        <Col span={4}>
                            <Affix offsetTop={120}>
                                <DataPageSiderMenu divContent={divContent}/>
                            </Affix>
                        </Col>
                        <Col span={20}>
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
                                <div name={"Sections"}>
                                    <a id={"Sections"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Sections </span>
                                        <Link href={'/help/manual/datasets#data_page_attributes'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
                                    <AttributeLayout attribute={"Number of Sections"}>{props.data.sections}</AttributeLayout>
                                    <div style={{wordBreak:"break-all", wordWrap:"break-word"}}>
                                        <AttributeLayout attribute={"Section ID"}>{props.data.section_id!==null?props.data.section_id:"--"}</AttributeLayout>
                                    </div>
                                </div>
                                <Features
                                    data={props.data}
                                    sectionOption={props.sectionOption}
                                />
                                <VisualToolModule
                                    st_id={props.data.id}
                                    sectionOption={props.sectionOption}
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
                                                <p>{props.data.journal||"--"}</p>
                                            </Col>
                                            <Col span={3}>
                                                <h4>PMID</h4>
                                                <p>{props.data.pmid||"--"}</p>
                                            </Col>
                                            <Col span={8}>
                                                <h4>URL</h4>
                                                <a href={props.data.url||"#"}>{props.data.url||"--"}</a>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                                <div name={"Download"}>
                                    <a id={"Download"} style={{position: 'relative', top: "-150px"}}></a>
                                    <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                                        <span style={{fontSize:22}}>Download </span>
                                        <Link href={'/help/manual/datasets#h5ad'}>
                                            <a target={"_blank"}><QuestionCircleOutlined/></a>
                                        </Link>
                                    </Divider>
                                    <div className="site-card-wrapper" style={{padding:"10px"}}>
                                        <FliesTree st_id={props.data.id} sections_id={props.sectionOption}/>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
        </LayoutCustom>
    )
}