import {Col, Divider, Row, Select} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import InteractionsHeatmap from "./InteractionsHeatmap";
import LigandsReceptorsDotplot from "./LigandsReceptorsDotplot";
import LigandsReceptorsNetwork from "./LigandsReceptorsNetwork";
import React, {useContext, useState} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";
import LoadingModule from "./LoadingModule";
const { Option } = Select;

export default function CellInteractions(){
    const onChangeEnv = (value) => {
        setEnv(value)
        // usestate 是异步函数，set后不能马上生效
        setCellTypePairs(dotPlot[value].yAxis)
        setCellTypePair(dotPlot[value].yAxis[0])
    }
    const onChangeCell = (value) => {
        setCellTypePair(value)
    }
    const annContext = useContext(AnnContext);
    const dotPlot = JSON.parse(annContext.result.dotPlot)
    const microenvironment = dotPlot.microenvironment
    const [env, setEnv] = useState(microenvironment[0])
    const [cellTypePairs, setCellTypePairs] = useState(dotPlot[env].yAxis)
    const [cellTypePair, setCellTypePair] = useState(cellTypePairs[0])

    return(
        <div name={"Interaction"}>
            <a id={"Interaction"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <span style={{fontSize:21}}>Cell Interactions </span>
                <Link href={'/help/manual/datasets#data_page_attributes'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <Row justify="start" align="stretch" style={{margin:"20px 0"}}>
                <Col span={4}><span style={{fontSize:18}}>Microenvironment: </span></Col>
                <Col span={8}>
                    <Select
                        defaultValue={microenvironment[0]}
                        style={{
                            width: 300,
                        }}
                        onChange={onChangeEnv}
                    >
                        {microenvironment.map(item =>
                            <Option key={item} value={item}>{item}</Option>)
                        }
                    </Select>
                </Col>
                <Col span={3}><span style={{fontSize:18}}>Cell Type Pair: </span></Col>
                <Col span={8}>
                    <Select
                        value={cellTypePair}
                        style={{
                            width: 300,
                        }}
                        onChange={onChangeCell}
                    >
                        {cellTypePairs.map(item =>
                            <Option key={item} value={item}>{item}</Option>)
                        }
                    </Select>
                </Col>
            </Row>
            <Row justify="space-evenly" align="stretch">
                <Col>
                    <InteractionsHeatmap/>
                </Col>
                <Col>
                    <LigandsReceptorsNetwork cellTypePair={cellTypePair}/>
                </Col>
            </Row>
            <Row justify="space-evenly" align={"top"}>
                <LigandsReceptorsDotplot env={env}/>
            </Row>
        </div>
    )
}