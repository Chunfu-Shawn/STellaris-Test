import {Col, Descriptions, Divider, Row, Tabs} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import ResultStatus from "../ResultStatus";
import {calTime} from "../../util";
import React from "react";
import CellCountBarChart from "./CellCountBarChart";

export default function DataSummary(props){
    const { data } = props
    return(
        <div name={"Summary"}>
            <a id={"Summary"} style={{position: 'relative', top: "-200px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <span style={{fontSize:18}}>Summary </span>
                <Link href={'/help/manual/datasets#data_page_attributes'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <Row justify="space-between" align="top">
                <Col span={10}>
                    <ResultStatus data={data} style={{width: 450}}
                                  usedTime={calTime(data.finish_time,data.upload_time)}
                    />
                </Col>
                <Col span={14}>
                    <Tabs defaultActiveKey="1">
                        <Tabs.TabPane tab="Reference ST data" key="1">
                            <Descriptions size={"small"} bordered>
                                <Descriptions.Item label="ST ID" span={1.5}>STW-XXXXXX</Descriptions.Item>
                                <Descriptions.Item label="Section ID" span={1.5}>Xsadasdas</Descriptions.Item>
                                <Descriptions.Item label="Strain" span={1.5}>--</Descriptions.Item>
                                <Descriptions.Item label="Organ" span={1.5}>Brain</Descriptions.Item>
                                <Descriptions.Item label="Tissue" span={1.5}>Brain</Descriptions.Item>
                                <Descriptions.Item label="Developmental Stage" span={1.5}>--</Descriptions.Item>
                                <Descriptions.Item label="PMID" span={1}>1213123</Descriptions.Item>
                                <Descriptions.Item label="DOI" span={2}>--</Descriptions.Item>
                                <Descriptions.Item label="Spot Count" span={1.5}>2322</Descriptions.Item>
                                <Descriptions.Item label="Number of Gene" span={1.5}>23232</Descriptions.Item>
                            </Descriptions>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Submitted scRNA-seq data" key="2">
                            <Descriptions size={"small"} bordered>
                                <Descriptions.Item label="Filtered Cell Count" span={1.5}>10322</Descriptions.Item>
                                <Descriptions.Item label="Gene Number" span={1.5}>23232</Descriptions.Item>
                            </Descriptions>
                            <CellCountBarChart/>
                        </Tabs.TabPane>
                    </Tabs>
                </Col>
            </Row>
        </div>
    )
}