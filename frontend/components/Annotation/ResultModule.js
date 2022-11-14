import {Affix, Col, Divider, Row, Tag, Tooltip, Tabs, Descriptions, Select} from "antd";
import dynamic from "next/dynamic";
import dataset from "../VisualTool/dataset.json";
import React from "react";
import {useRef} from "react";
import ResultPageSiderMenu from "./ResultPage/ResultPageSiderMenu";
import Link from "next/link";
import {DownloadOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import ResultDownload from "./ResultPage/ResultDownload";
import Preprocessing from "./ResultPage/Preprocessing";
import UMAPScatter from "./ResultPage/UMAPScatter";
import JSDHeatmap from "./ResultPage/JSDHeatmap";
import MSTNetwork from "./ResultPage/MSTNetwork";
import CellInteractions from "./ResultPage/CellInteractions";
import DistanceDensityGraph from "./ResultPage/DistanceDensityGraph";
import MappedCellCountBarGraph from "./ResultPage/MappedCellCountBarGraph";

const dataset2 = {
    "id": "GSM5833739",
    "name": "GSM5833739",
    "url": "https://rhesusbase.com:9999/jsonl_files/GSM5833739_10x_Visium_deal/GSM5833739_10x_Visium_deal.jsonl"
}

export default function ResultModule(props){
    const{ data } = props
    const divContent = useRef(null); //标识nav导航栏渲染内容
    const iconStyle = {color:"black", float:"right",fontSize:"24px",margin:'0 2%'}
    const DynamicVisualTool = dynamic(() =>
            import('../../components/VisualTool/VisualTool.js')
                .then((mod) => mod.VisualTool),
        {
            ssr: false,
        })

    return(
        <div className={"modal-body-stw with-sider"}>
            <Row style={{width:"100%"}}>
                <Col span={4}>
                    <Affix offsetTop={120}>
                        <ResultPageSiderMenu divContent={divContent}/>
                    </Affix>
                </Col>
                <Col span={20}>
                    <div ref={divContent}>
                        <h2>Annotation Result</h2>
                        <Row>
                            <Col span={8}>
                                {data.species==="Homo sapiens"?
                                    <Tag color="cyan">Homo sapiens</Tag>
                                    :
                                    <Tag color="geekblue">Mus musculus</Tag>
                                }
                                <Tag color="purple">{data.organ}</Tag>
                                <Tag color="purple">{data.tissue}</Tag>
                            </Col>
                            <Col span={8} offset={8}>
                                <a key={2} target={'_blank'} href={`/api/datasets-info/${data.rid}`} download rel="noreferrer" >
                                    <Tooltip title="Download All Results">
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
                        <Preprocessing data={data}/>
                        <div name={"Visualization"}>
                            <a id={"Visualization"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:18}}>Visualization </span>
                                <Link href={'/help/manual/datasets#data_page_attributes'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <Row justify="space-between" align="middle">
                                <Col span={12}>
                                    <DynamicVisualTool setCustom={true} width={550} dataset={dataset}/>
                                </Col>
                                <Col span={12}>
                                    <DynamicVisualTool setCustom={true} width={550} dataset={dataset2}/>
                                </Col>
                            </Row>
                        </div>
                        <div name={"Evaluation"}>
                            <a id={"Evaluation"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:18}}>Evaluation </span>
                                <Link href={'/help/manual/datasets#data_page_attributes'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <Row>
                                <UMAPScatter/>
                                <UMAPScatter/>
                            </Row>
                            <Row>
                                <DistanceDensityGraph/>
                                <MappedCellCountBarGraph/>
                            </Row>
                        </div>
                        <div name={"Co-localization"}>
                            <a id={"Co-localization"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:18}}>Cell Types Co-localization </span>
                                <Link href={'/help/manual/datasets#data_page_attributes'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <Row justify={"space-evenly"}>
                                <JSDHeatmap/>
                                <MSTNetwork/>
                            </Row>
                        </div>
                        <CellInteractions/>
                        <ResultDownload/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}