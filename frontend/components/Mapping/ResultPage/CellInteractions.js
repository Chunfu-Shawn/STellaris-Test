import {Col, Row, Select} from "antd";
import InteractionsHeatmap from "./InteractionsHeatmap";
import LigandsReceptorsDotplot from "./LigandsReceptorsDotplot";
import LigandsReceptorsNetwork from "./LigandsReceptorsNetwork";
import React, {useContext, useState} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
const { Option } = Select;

export default function CellInteractions(){
    const annContext = useContext(AnnContext);
    const dotPlot = JSON.parse(annContext.result.dotPlot)

    // 判断微环境内是否 数据为空
    const groupCellTypes = dotPlot['group|cell_type'].filter( item => {
        if (dotPlot[item].value.length !== 0)
            return item
    })
    let groupWithCellTypes = {}
    groupCellTypes.forEach( item => {
        let group = item.substring(0,item.indexOf("|"))
        let cellType = item.substring(item.indexOf("|")+1,)
        if (groupWithCellTypes[group] === undefined){
            groupWithCellTypes[group] = []
        }
        groupWithCellTypes[group].push(cellType)
    })
    const groupOrder = ["near","medium","far"]
    const groups = Object.keys(groupWithCellTypes).sort(
        (a,b) => groupOrder.indexOf(a) - groupOrder.indexOf(b))
    const [group, setGroup] = useState(groups[0])
    const [cellTypes, setCellTypes] = useState(groupWithCellTypes[group])
    const [cellType, setCellType] = useState(cellTypes[0])
    const [groupAndCellType, setGroupAndCellType] = useState(group+"|"+cellTypes[0])
    const [cellTypePairs, setCellTypePairs] = useState(dotPlot[groupAndCellType].xAxis)
    const [cellTypePair, setCellTypePair] = useState(cellTypePairs[0])

    const onChangeGroup = (value) => {
        // usestate 是异步函数，set后不能马上生效
        setGroup(value)
        setCellTypes(groupWithCellTypes[value])
        setCellType(groupWithCellTypes[value][0])
        setGroupAndCellType(value+"|"+groupWithCellTypes[value][0])
        setCellTypePairs(dotPlot[value+"|"+groupWithCellTypes[value][0]].xAxis)
        setCellTypePair(dotPlot[value+"|"+groupWithCellTypes[value][0]].xAxis[0])
    }

    const onChangeCellType = (value) => {
        setCellType(value)
        setGroupAndCellType(group+"|"+value)
        setCellTypePairs(dotPlot[group+"|"+value].xAxis)
        setCellTypePair(dotPlot[group+"|"+value].xAxis[0])
    }

    const onChangeCellTypePair = (value) => {
        setCellTypePair(value)
    }

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
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    value={cellTypePair}
                                    style={{
                                        width: 300,
                                    }}
                                    onChange={onChangeCellTypePair}
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
                            <Col span={3}><span style={{fontSize: 18}}>Group: </span></Col>
                            <Col span={6}>
                                <Select
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    defaultValue={groups[0]}
                                    style={{
                                        width: 150,
                                    }}
                                    onChange={onChangeGroup}
                                >
                                    {groups.map(item =>
                                        <Option key={item} value={item}>{item}</Option>)
                                    }
                                </Select>
                            </Col>
                            <Col span={4}><span style={{fontSize: 18}}>Cell type: </span></Col>
                            <Col span={11}>
                                <Select
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    value={cellType}
                                    style={{
                                        width: 250,
                                    }}
                                    onChange={onChangeCellType}
                                >
                                    {cellTypes.map(item =>
                                        <Option key={item} value={item}>{item}</Option>)
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <LigandsReceptorsDotplot groupAndCellType={groupAndCellType}/>
                    </> :
                    <></>
                }
            </Col>
        </Row>
    )
}