import {Card, Col, Descriptions, Divider, Row, Tabs} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import ResultStatus from "./ResultStatus";
import React from "react";
import CellCountBarChart from "./CellCountBarChart";
import {useContext} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";

export default function Preprocessing(){
    const annContext = useContext(AnnContext);
    const sectionId = annContext.reqInfo.section_id
    const datasetInfo = annContext.result.datasetInfo

    const items = [
        {
            label: 'Reference ST data', key: '1', children:
                <Card
                    style={{
                        width: 650,
                    }}
                >
                    <Descriptions labelStyle={{fontWeight:"bold"}}>
                        <Descriptions.Item label="ST ID" span={1.5}>{datasetInfo.id}</Descriptions.Item>
                        <Descriptions.Item label="Section ID" span={1.5}>{sectionId}</Descriptions.Item>
                        <Descriptions.Item label="Method" span={1.5}>{datasetInfo.method}</Descriptions.Item>
                        <Descriptions.Item label="Species" span={1.5}>{datasetInfo.species}</Descriptions.Item>
                        <Descriptions.Item label="Strain" span={1.5}>
                            {datasetInfo.strain === null ? "--" : datasetInfo.strain}
                        </Descriptions.Item>
                        <Descriptions.Item label="Developmental Stage" span={1.5}>
                            {datasetInfo.developmental_stage === null ? "--" : datasetInfo.developmental_stage}
                        </Descriptions.Item>
                        <Descriptions.Item label="Organ" span={1.5}>{datasetInfo.organ}</Descriptions.Item>
                        <Descriptions.Item label="Tissue" span={1.5}>{datasetInfo.tissue}</Descriptions.Item>
                        <Descriptions.Item label="PMID" span={1}>{datasetInfo.pmid}</Descriptions.Item>
                        <Descriptions.Item label="DOI" span={2}>{datasetInfo.url}</Descriptions.Item>
                        <Descriptions.Item label="Spot Count" span={1}>2322</Descriptions.Item>
                        <Descriptions.Item label="Number of Gene" span={1}>23232</Descriptions.Item>
                    </Descriptions>
                </Card>
        },
        {
            label: 'Submitted scRNA-seq data', key: '2', children:
                <>
                    <Descriptions size={"small"} bordered>
                        <Descriptions.Item label="Filtered Cell Count" span={1.5}>10322</Descriptions.Item>
                        <Descriptions.Item label="Gene Number" span={1.5}>23232</Descriptions.Item>
                    </Descriptions>
                    <CellCountBarChart/>
                </>
        },
    ]
    return(
        <div name={"Preprocessing"}>
            <a id={"Preprocessing"} style={{position: 'relative', top: "-200px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <span style={{fontSize:21}}>Preprocessing </span>
                <Link href={'/help/manual/datasets#data_page_attributes'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <Row justify="space-between" align="top">
                <Col span={10}>
                    <ResultStatus style={{width: 450}}/>
                </Col>
                <Col span={14}>
                    <Tabs defaultActiveKey="1" items={items}/>
                </Col>
            </Row>
        </div>
    )
}