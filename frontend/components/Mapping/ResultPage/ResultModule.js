import {Affix, Col, Divider, Row, Tag, notification, Tooltip, Tabs, Empty} from "antd";
import dynamic from "next/dynamic";
import React, {useEffect} from "react";
import {useRef} from "react";
import ResultPageSiderMenu from "../ResultPage/ResultPageSiderMenu";
import Link from "next/link";
import {DownloadOutlined, QuestionCircleOutlined, SmileOutlined} from "@ant-design/icons";
import ResultsDownload from "./ResultsDownload";
import Preprocessing from "../ResultPage/Preprocessing";
import UMAPScatter from "../ResultPage/UMAPScatter";
import JSDHeatmap from "../ResultPage/JSDHeatmap";
import MSTNetwork from "../ResultPage/MSTNetwork";
import CellInteractions from "../ResultPage/CellInteractions";
import DistanceDensityGraph from "../ResultPage/DistanceDensityGraph";
import MappedCellCountBarGraph from "../ResultPage/MappedCellCountBarGraph";
import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
import MappingSteps from "../MappingSteps";
import UmapFilteredCellCountBarGraph from "./UmapFilteredCellCountBarGraph";
import UMAPModule from "./UMAPModule";

export default function ResultModule(){
    const divContent = useRef(null); //标识nav导航栏渲染内容
    const annContext = useContext(AnnContext);
    const dotPlot = JSON.parse(annContext.result.dotPlot)

    const iconStyle = {color:"black", float:"right",fontSize:"25px",margin:'0 2%'}
    const stDataset = {
        "id": annContext.reqInfo.section_id,
        "name": annContext.reqInfo.section_id,
        "url": `https://rhesusbase.com:9999/jsonl_files/${annContext.reqInfo.dataset_id}/`+
            `${annContext.reqInfo.section_id}/${annContext.reqInfo.section_id}.jsonl`
    }
    const scRawDataset = {
        "id": "sc_reduction",
        "name": "sc_reduction",
        "url": `/api/mapping-result/jsonl/${annContext.reqInfo.rid}/sc_reduction.jsonl`
    }
    const scRegDataset = {
        "id": "sc_registered",
        "name": "sc_registered",
        "url": `/api/mapping-result/jsonl/${annContext.reqInfo.rid}/sc_registered.jsonl`
    }
    const scMultiRegDataset = {
        "id": "sc_multi_registered",
        "name": "sc_multi_registered",
        "url": `/api/mapping-result/jsonl/${annContext.reqInfo.rid}/sc_multiomics.jsonl`
    }

    const DynamicVisualTool = dynamic(() =>
            import('../../../components/VisualTool/VisualTool.js')
                .then((mod) => mod.VisualTool),
        {
            ssr: false,
        })
    const item1 = [
        {
            label: 'Reference ST data', key: '1', children:
                <DynamicVisualTool setCustom={true} drawerOpen={false}
                                   width={500} height={800}
                                   chartSize={220} dataset={stDataset}/>
        }
    ]
    let item2 = [
        {
            label: 'Registered scRNA-seq data', key: '1', children:
                <DynamicVisualTool setCustom={true} drawerOpen={false}
                                   width={600} height={800}
                                   chartSize={220} dataset={scRegDataset}/>
        },
        {
            label: 'Submitted scRNA-seq data', key: '2', children:
                <DynamicVisualTool setCustom={true} drawerOpen={false}
                                   width={600} height={800}
                                   chartSize={220} dataset={scRawDataset}/>
        },
    ]
    if (annContext.reqInfo.type === "multiomics")
        item2.push(
            {
                label: 'Registered single-cell multiomics data', key: '3', children:
                    <DynamicVisualTool setCustom={true} drawerOpen={false}
                                       width={600} height={800}
                                       chartSize={220} dataset={scMultiRegDataset}/>
            }
        )
    useEffect(()=>{
        notification.info({
            message: `Result page needs time to load data`,
            description: "If some modules fail to load, refresh the page please :)",
            style:{
                marginTop:100
            },
            duration: 5,
            icon: (
                <SmileOutlined
                    style={{
                        color: '#108ee9',
                    }}
                />
            ),
        });
    },[])


    return(
        <div className={"modal-body-stw with-sider"}>
            <div style={{margin:"0px 90px 0px 150px"}}>
                <MappingSteps current={4}/>
            </div>
            <Divider/>
            <Row style={{width:"100%"}}>
                <Col span={4}>
                    <Affix offsetTop={120}>
                        <ResultPageSiderMenu divContent={divContent}/>
                    </Affix>
                </Col>
                <Col span={20}>
                    <div ref={divContent}>
                        <h2>Spatial Mapping Results</h2>
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
                                <a key={2} href={`#Download`} >
                                    <Tooltip title="Download Results">
                                        <DownloadOutlined  style={iconStyle}/>
                                    </Tooltip>
                                </a>
                                <a key={3} target={'_blank'} href={`/help/manual/mapping`} rel="noreferrer" >
                                    <Tooltip title="View Help">
                                        <QuestionCircleOutlined style={iconStyle}/>
                                    </Tooltip>
                                </a>
                            </Col>
                        </Row>
                        <Preprocessing />
                        <div name={"Filtering"}>
                            <a id={"Filtering"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:22}}>Coembedding Filtering </span>
                                <Link href={'/help/manual/mapping#filtering'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <UMAPModule/>
                            <UmapFilteredCellCountBarGraph/>
                        </div>
                        <div name={"Spatial"}>
                            <a id={"Spatial"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:22}}>Spatial Cellular Map </span>
                                <Link href={'/help/manual/mapping#spatial'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            <Row justify="space-between" align="top">
                                <Col span={11}>
                                    <Tabs defaultActiveKey="1" items={item1}/>
                                </Col>
                                <Col span={13}>
                                    <Tabs defaultActiveKey="1" items={item2}/>
                                </Col>
                            </Row>
                            <Row justify={"space-evenly"} align={"top"} style={{marginTop:20}}>
                                <Col>
                                    <MappedCellCountBarGraph/>
                                </Col>
                                <Col>
                                    <DistanceDensityGraph/>
                                </Col>
                            </Row>
                        </div>
                        <div name={"Colocalization"}>
                            <a id={"Colocalization"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize: 22}}>Cell Type Colocalization </span>
                                <Link href={'/help/manual/mapping#colocalization'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            {annContext.result.mst && annContext.result.jsd ?
                                <Row justify={"space-evenly"} align={"top"}>
                                    <Col>
                                        <JSDHeatmap/>
                                    </Col>
                                    <Col>
                                        <MSTNetwork/>
                                    </Col>
                                </Row>
                                :
                                <Empty
                                    description={<>
                                        <p><b>No Data</b></p>
                                        <span>Result Not Found. There are some problems happened in mapping.</span>
                                    </>
                                }
                                />
                            }
                        </div>
                        <div name={"Interaction"}>
                            <a id={"Interaction"} style={{position: 'relative', top: "-150px"}}></a>
                            <Divider orientation="left" orientationMargin="0">
                                <span style={{fontSize:22}}>Cell-Cell Ligand-receptor Interactions </span>
                                <Link href={'/help/manual/mapping#interaction'}>
                                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                                </Link>
                            </Divider>
                            {dotPlot && dotPlot.microenvironment.length !== 0 ?
                                <CellInteractions/>
                                :
                                <Empty
                                    description={<>
                                        <p><b>No Data</b></p>
                                        <span>Result Not Found. You may select <b>wrong species</b> or your gene name of
                                            counts.gz file is not <b>HGNC Symbol</b> !</span>
                                    </>}
                                />
                            }
                        </div>
                        <ResultsDownload/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}