import {Col, Divider, Row, Select} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import InteractionsHeatmap from "./InteractionsHeatmap";
import LigandsReceptorsDotplot from "./LigandsReceptorsDotplot";
import LigandsReceptorsNetwork from "./LigandsReceptorsNetwork";
import React, {useContext, useState} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";
const { Option } = Select;

export default function CellInteractions(){
    const onChangeEnv = (value) => {
        setEnv(value)
        // usestate 是异步函数，set后不能马上生效
        setCellTypePairs(dotPlot[value].xAxis)
        setCellTypePair(dotPlot[value].xAxis[0])
    }
    const onChangeCell = (value) => {
        setCellTypePair(value)
    }
    const annContext = useContext(AnnContext);
    const dotPlot = JSON.parse(annContext.result.dotPlot)
    const microenvironment = dotPlot.microenvironment
    const [env, setEnv] = useState(microenvironment[0])
    const [cellTypePairs, setCellTypePairs] = useState(dotPlot[env].xAxis)
    const [cellTypePair, setCellTypePair] = useState(cellTypePairs[0])

    return(
        <>
            <Row justify="start" align="stretch" style={{margin:"20px 0"}}>
                <Col span={4}><span style={{fontSize:18}}>Microenvironment: </span></Col>
                <Col span={7}>
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

            <Row justify="space-between" align="stretch">
                <Col>
                    {annContext.result.interHeat?<InteractionsHeatmap/>:null}
                    {annContext.result.lpPair?<LigandsReceptorsNetwork cellTypePair={cellTypePair}/>:null}
                </Col>
                <Col>
                    {annContext.result.dotPlot?<LigandsReceptorsDotplot env={env}/>:null}
                </Col>
            </Row>
        </>
    )
}