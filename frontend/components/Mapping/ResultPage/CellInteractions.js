import {Col, Divider, Row, Select} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import InteractionsHeatmap from "./InteractionsHeatmap";
import LigandsReceptorsDotplot from "./LigandsReceptorsDotplot";
import LigandsReceptorsNetwork from "./LigandsReceptorsNetwork";
import React, {useContext, useState} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
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

    // 判断微环境内是否 数据为空
    const microenvironment = dotPlot.microenvironment.filter( item => {
        if (dotPlot[item].value.length !== 0)
            return item
    })

    const [env, setEnv] = useState(microenvironment[0])
    const [cellTypePairs, setCellTypePairs] = useState(dotPlot[env].xAxis)
    const [cellTypePair, setCellTypePair] = useState(cellTypePairs[0])

    return(
        <Row justify="space-between" align="stretch">
            <Col span={10}>
                {annContext.result.interHeat?<InteractionsHeatmap/>:null}
                {annContext.result.lpPair?
                    <>
                        <Row justify="start" align="stretch" style={{margin:"20px 0"}}>
                            <Col span={8}><span style={{fontSize:18}}>Cell Type Pair: </span></Col>
                            <Col span={16}>
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
                        <LigandsReceptorsNetwork cellTypePair={cellTypePair}/>
                    </>:
                    <></>}
            </Col>
            <Col span={14}>
                {annContext.result.dotPlot ?
                    <>
                        <Row justify="start" align="stretch" style={{marginBottom: 20}}>
                            <Col span={8}><span style={{fontSize: 18}}>Microenvironment: </span></Col>
                            <Col span={16}>
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
                        </Row>
                        <LigandsReceptorsDotplot env={env}/>
                    </> :
                    <></>
                }
            </Col>
        </Row>
    )
}