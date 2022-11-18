import {Affix, Col, Divider, Row, Tag, Tooltip, Tabs} from "antd";
import dynamic from "next/dynamic";
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
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";

const stDataset = {
    "id": "coronal_2",
    "name": "coronal_2",
    "url": "https://rhesusbase.com:9999/jsonl_files/STW-M-Brain-Stereo-seq-1/coronal_1/coronal_1.jsonl"
}
const scRawDataset = {
    "id": "GSM5833739",
    "name": "GSM5833739",
    "url": "https://rhesusbase.com:9999/jsonl_files/Mouse-corticogenesis/sc.jsonl"
}
const scAnnDataset = {
    "id": "GSM5833739",
    "name": "GSM5833739",
    "url": "https://rhesusbase.com:9999/jsonl_files/Mouse-corticogenesis/sc_registered.jsonl"
}

export default function ResultModule(){
    const divContent = useRef(null); //标识nav导航栏渲染内容
    const annContext = useContext(AnnContext);
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
                                {annContext.reqInfo.species==="Homo sapiens"?
                                    <Tag color="cyan">Homo sapiens</Tag>
                                    :
                                    <Tag color="geekblue">Mus musculus</Tag>
                                }
                                <Tag color="purple">{annContext.reqInfo.organ}</Tag>
                                <Tag color="purple">{annContext.reqInfo.tissue}</Tag>
                            </Col>
                            <Col span={8} offset={8}>
                                <a key={2} target={'_blank'} href={`/api/datasets-info/${annContext.reqInfo.rid}`} download rel="noreferrer" >
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
                        <Preprocessing />
                        <div name={"Visualization"}>
                            <a id={"Visualization"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:21}}>Visualization </span>
                                <Link href={'/help/manual/datasets#data_page_attributes'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <Row justify="space-between" align="top">
                                <Col span={11}>
                                    <Tabs defaultActiveKey="1">
                                        <Tabs.TabPane tab="Reference ST data" key="1">
                                            <DynamicVisualTool setCustom={true} drawerOpen={false}
                                                               width={500} height={800}
                                                               chartSize={220} dataset={stDataset}/>
                                        </Tabs.TabPane>
                                    </Tabs>
                                </Col>
                                <Col span={13}>
                                    <Tabs defaultActiveKey="1">
                                        <Tabs.TabPane tab="Annotated scRNA-seq data" key="1">
                                            <DynamicVisualTool setCustom={true} drawerOpen={false}
                                                               width={600} height={800}
                                                               chartSize={220} dataset={scAnnDataset}/>
                                        </Tabs.TabPane>
                                        <Tabs.TabPane tab="Submitted scRNA-seq data" key="2">
                                            <DynamicVisualTool setCustom={true} drawerOpen={false}
                                                               width={600} height={800}
                                                               chartSize={220} dataset={scRawDataset}/>
                                        </Tabs.TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                        </div>
                        <div name={"Evaluation"}>
                            <a id={"Evaluation"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:21}}>Evaluation </span>
                                <Link href={'/help/manual/datasets#data_page_attributes'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <Row justify={"space-evenly"} align={"top"}>
                                <Col>
                                    <UMAPScatter/>
                                </Col>
                                <Col>
                                    <UMAPScatter/>
                                </Col>
                            </Row>
                            <Row justify={"space-evenly"} align={"top"}>
                                <Col>
                                    <DistanceDensityGraph/>
                                </Col>
                                <Col>
                                    <MappedCellCountBarGraph/>
                                </Col>
                            </Row>
                        </div>
                        <div name={"Colocalization"}>
                            <a id={"Colocalization"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:21}}>Cell Types Colocalization </span>
                                <Link href={'/help/manual/datasets#data_page_attributes'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <Row justify={"space-evenly"} align={"top"}>
                                <Col>
                                    <JSDHeatmap/>
                                </Col>
                                <Col>
                                    <MSTNetwork/>
                                </Col>
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