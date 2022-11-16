import {Col, Divider, Row, Select} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import InteractionsHeatmap from "./InteractionsHeatmap";
import LigandsReceptorsDotplot from "./LigandsReceptorsDotplot";
import LigandsReceptorsNetwork from "./LigandsReceptorsNetwork";
import React from "react";
const { Option } = Select;

export default function CellInteractions(){
    const onChangeSection = (value) => {}
    return(
        <div name={"Interaction"}>
            <a id={"Interaction"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <span style={{fontSize:21}}>Cell Interactions </span>
                <Link href={'/help/manual/datasets#data_page_attributes'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <Row justify="space-evenly" align={"top"}>
                <InteractionsHeatmap/>
                <Col>
                    <Row justify="start" align="stretch">
                        <Col span={6}><span style={{fontSize:14}}>Microenvironment: </span></Col>
                        <Col span={8}>
                            <Select
                                defaultValue={'default'}
                                style={{
                                    width: 160,
                                }}
                                onChange={onChangeSection}
                            >
                                <Option key={"default"} value={"default"}>{"default"}</Option>
                            </Select>
                        </Col>
                        <Col span={10}><span style={{fontSize:14,fontWeight:"bold"}}>Ligands and receptors interactions</span></Col>
                    </Row>
                    <LigandsReceptorsDotplot/>
                </Col>
            </Row>
            <LigandsReceptorsNetwork/>
        </div>
    )
}