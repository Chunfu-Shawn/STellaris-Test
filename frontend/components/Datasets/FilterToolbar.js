import {Checkbox, Col, Collapse, Row, Slider, Space} from "antd";
import React, {useEffect, useRef, useState} from "react";
const { Panel } = Collapse;
import {getSummaryOptions} from "./getData&Options.js";
import * as echarts from 'echarts';
import BarChart from "./BarChart.js";

Date.prototype.toLocaleString = function() {
    // 补0 例如 2018/7/10 14:7:2 补完后为 2018/07/10 14:07:02
    function addZero(num) {
        return num < 10 ? "0" + num : num;
    }
    // 按自定义拼接格式返回
    return this.getFullYear() + "-" + addZero(this.getMonth() + 1);
};


export default function FilterToolbar(props){
    const {
        filterClick,
        setFilterClick
    } = props
    const [methodsOptionActiveKey,setMethodsOptionActiveKey] = useState([])
    const [organsOptionActiveKey,setOrgansOptionActiveKey] = useState([])
    const [num, setNum] = useState({
        method:{},
        species:{},
        organ:{},
        pathological:{},
        date_published:new Array(20).fill(0)}
    );
    const [panelState,setPanelState] = useState({method:'all',organ:'all'})
    const methodsOptions = getSummaryOptions(props.data)['methodsOptions'].slice(0,6);
    const methodsOptions2 = getSummaryOptions(props.data)['methodsOptions'].slice(6);
    const speciesOptions = getSummaryOptions(props.data)['speciesOptions'];
    const organsOptions = getSummaryOptions(props.data)['organOptions'].slice(0,6);
    const organsOptions2 = getSummaryOptions(props.data)['organOptions'].slice(6);
    const pathologicalOptions = getSummaryOptions(props.data)['pathologicalOptions'];
    const datePublishedOptions = [
        new Date(getSummaryOptions(props.data)['date_published'][0]).toLocaleString(),
        new Date(getSummaryOptions(props.data)['date_published'][1]).toLocaleString()
    ];
    const marks = {
        0: {
            style: {
                width: 100,
                fontSize:12,
                color: '#9d9d9d',
            },
            label: datePublishedOptions[0]
        },
        100: {
            style: {
                width: 100,
                fontSize:12,
                color: '#9d9d9d',
            },
            label: datePublishedOptions[1]
        },
    };
    //render echart, count number
    useEffect(()=>{
        summaryDatasets(props.dataShow)
    },[props.dataShow])

    const onViewMoreMethodsOptions = () => {
        if (methodsOptionActiveKey.includes(1)){
            setMethodsOptionActiveKey([])
            setPanelState(Object.assign({}, panelState, {method: "all"}))
        } else {
            setMethodsOptionActiveKey([1])
            setPanelState(Object.assign({}, panelState, {method: "less"}))
        }
    }
    const onViewMoreOrgansOptions = () => {
        if (organsOptionActiveKey.includes(1)){
            setOrgansOptionActiveKey([])
            setPanelState(Object.assign({}, panelState, {organ: "all"}))
        } else {
            setOrgansOptionActiveKey([1])
            setPanelState(Object.assign({}, panelState, {organ: "less"}))
        }
    }

    const timeSubstract = ( time1,time2 ) => {
        if(time1&&time2) return Date.parse(time1) - Date.parse(time2)
        else return "arguments missing"
    }
    const formatter = (value) => {
        let time = timeSubstract(datePublishedOptions[1], datePublishedOptions[0])
        // 返回时间，格式为2022-04
        return new Date(Date.parse(datePublishedOptions[0])+time/100*value).toLocaleString()
    };
    // checkbox filter
    const filterChangeMethod = (checkedValues) => {
        //将filteredInfo中的属性method替换成checkedValues
        let filters = {
            method:checkedValues,
            species:props.filteredInfo.species,
            organ:props.filteredInfo.organ,
            pathological:props.filteredInfo.pathological,
            date_published:props.filteredInfo.date_published
        }
        setFilterClick('method')
        props.setFilteredInfo(filters);
        onFilter(filters)
    };
    const filterChangeSpecies = (checkedValues) => {
        let filters = {
            method:props.filteredInfo.method,
            species:checkedValues,
            organ:props.filteredInfo.organ,
            pathological:props.filteredInfo.pathological,
            date_published:props.filteredInfo.date_published
        }
        setFilterClick('species')
        props.setFilteredInfo(filters);
        onFilter(filters)
    };
    const filterChangeOrgan = (checkedValues) => {
        let filters = {
            method:props.filteredInfo.method,
            species:props.filteredInfo.species,
            organ:checkedValues,
            pathological:props.filteredInfo.pathological,
            date_published:props.filteredInfo.date_published
        }
        setFilterClick('organ')
        props.setFilteredInfo(filters);
        onFilter(filters)
    };
    const filterChangePathological = (checkedValues) => {
        let filters = {
            method:props.filteredInfo.method,
            species:props.filteredInfo.species,
            organ:props.filteredInfo.organ,
            pathological:checkedValues,
            date_published:props.filteredInfo.date_published
        }
        setFilterClick('pathological')
        props.setFilteredInfo(filters);
        onFilter(filters)
    };
    const filterChangeDate = (value) => {
        let filters = {
            method:props.filteredInfo.method,
            species:props.filteredInfo.species,
            organ:props.filteredInfo.organ,
            pathological:props.filteredInfo.pathological,
            date_published: [Date.parse(formatter(value[0])),Date.parse(formatter(value[1]))],
            }
        setFilterClick('date_published')
        props.setFilteredInfo(filters);
        onFilter(filters)
    };
    const onFilter = (filters) => {
        // 如果有筛选值，设置filtering为true
        props.setFiltering(false)
        for (let i in filters)
            if(filters[i].length!==0) props.setFiltering(true)
        // filter
        let dataFiltered = []
        for (let i in props.data){
            if(
                (filters.method.length===0?true:filters.method.includes(props.data[i].method))&&
                (filters.organ.length===0?true:filters.organ.includes(props.data[i].organ))&&
                (filters.species.length===0?true:filters.species.includes(props.data[i].species))&&
                (filters.pathological.length===0?true:filters.pathological.includes(props.data[i].pathological))&&
                (filters.date_published.length===0?true:(filters.date_published[0] <= Date.parse(props.data[i].date_published) &&
                    filters.date_published[1] >= Date.parse(props.data[i].date_published)))
            )
            {
                dataFiltered.push(props.data[i])
            }
        }
        props.setDataFilter(dataFiltered)
    }
    // to summary the number of different categories records
    const summaryDatasets = (dataTemp) => {
        const options = ['method','species','organ','pathological','date_published']
        let time = timeSubstract(datePublishedOptions[1], datePublishedOptions[0])
        options.map((value,index)=>{
            if (value === filterClick && props.filteredInfo[filterClick].length !== 0){
                options.splice(index,1)
            }
        })
        // initialize num_tmp
        let num_tmp ={}
        options.map((value)=>{
            if (value === "date_published") {
                num_tmp['date_published'] = new Array(20).fill(0)
            }else {
                num_tmp[value] = {}
            }
        })
        if( filterClick !== '' && props.filteredInfo[filterClick].length !== 0)
            num_tmp[filterClick] = num[filterClick]
        else num_tmp[filterClick] = {}
        // numDatePublished.map(item=>num['date_published'][item]=0)
        for(let i in dataTemp){
            options.map((value)=> {
                if (value === "date_published") {
                    let index = Math.ceil(timeSubstract(dataTemp[i][value], datePublishedOptions[0]) * 20 / time) - 1
                    num_tmp["date_published"][index] += 1
                }else {
                    num_tmp[value][dataTemp[i][value]] === undefined ?
                        num_tmp[value][dataTemp[i][value]] = 1 : num_tmp[value][dataTemp[i][value]] += 1
                }
            })
        }
        setNum(num_tmp)
    }

    return (
        <>
            <Collapse bordered={false} defaultActiveKey={['1','5']} style={{fontSize: '18px',textAlign:"left"}}>
                <Panel header="Methods" key="1">
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={filterChangeMethod}
                        //读取filteredInfo中选择的值
                        value={props.filteredInfo.method}
                    >
                        {methodsOptions.map( (method)=>
                            <Row key={method+num['method'][method]}>
                                <Col span={18} style={{
                                    display: "inline-block",
                                    /* 设置盒子内元素水平居中 */
                                    textAlign: 'left'}}>
                                    <Checkbox value={method} style={props.checkboxStyle}>
                                        <span>{method}</span>
                                    </Checkbox>
                                </Col>
                                <Col span={6}>
                                    <span style={{color:'gray'}}>{num['method'][method]||0}</span>
                                </Col>
                            </Row>
                        )}
                        <Collapse bordered={false} activeKey={methodsOptionActiveKey}>
                            <Panel showArrow={false} header="" collapsible="header" key="1" >
                                {methodsOptions2.map( (method)=>
                                    <Row key={method}>
                                        <Col span={18} style={{
                                            display: "inline-block",
                                            /* 设置盒子内元素水平居中 */
                                            textAlign: 'left'}}>
                                            <Checkbox value={method} style={props.checkboxStyle}>
                                                <span>{method}</span>
                                            </Checkbox>
                                        </Col>
                                        <Col span={6}>
                                            <span style={{color:'gray'}}>{num['method'][method]||0}</span>
                                            </Col>
                                    </Row>
                                )}
                            </Panel>
                        </Collapse>
                        <a onClick={onViewMoreMethodsOptions} >view {panelState.method}</a>
                    </Checkbox.Group>
                </Panel>
                {props.archive==="all" ? <Panel header="Species" key="2" style={{fontSize: '18px'}}>
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={filterChangeSpecies}
                        value={props.filteredInfo.species}
                    >
                        {speciesOptions.map( (species)=>
                            <Row key={species}>
                                <Col span={18} style={{
                                    display: "inline-block",
                                    /* 设置盒子内元素水平居中 */
                                    textAlign: 'left'}}>
                                    <Checkbox value={species} style={props.checkboxStyle}>
                                        <span>{species}</span>
                                    </Checkbox>
                                </Col>
                                <Col span={6}>
                                    <span style={{color:'gray'}}>{num['species'][species]||0}</span>
                                </Col>
                            </Row>
                        )}
                    </Checkbox.Group>
                </Panel>:<></>
                }
                <Panel header="Organ" key="3" style={{fontSize: '18px'}}>
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={filterChangeOrgan}
                        value={props.filteredInfo.organ}
                    >
                        {organsOptions.map( (organ)=>
                            <Row key={organ}>
                                <Col span={18} style={{
                                    display: "inline-block",
                                    /* 设置盒子内元素水平居中 */
                                    textAlign: 'left'}}>
                                    <Checkbox value={organ} style={props.checkboxStyle}>
                                        <span>{organ}</span>
                                    </Checkbox>
                                </Col>
                                <Col span={6}>
                                    <span style={{color:'gray'}}>{num['organ'][organ]||0}</span>
                                </Col>
                            </Row>
                        )}
                        <Collapse bordered={false} activeKey={organsOptionActiveKey}>
                            <Panel showArrow={false} collapsible="header" key="1" >
                                {organsOptions2.map( (organ)=>
                                    <Row key={organ}>
                                        <Col span={18} style={{
                                            display: "inline-block",
                                            /* 设置盒子内元素水平居中 */
                                            textAlign: 'left'}}>
                                            <Checkbox value={organ} style={props.checkboxStyle}>
                                                <span>{organ}</span>
                                            </Checkbox>
                                        </Col>
                                        <Col span={6}>
                                            <span style={{color:'gray'}}>{num['organ'][organ]||0}</span>
                                        </Col>
                                    </Row>
                                )}
                            </Panel>
                        </Collapse>
                        <a onClick={onViewMoreOrgansOptions} >view {panelState.organ}</a>
                    </Checkbox.Group>
                </Panel>
                <Panel header="Pathological" key="4" style={{fontSize: '18px'}}>
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={filterChangePathological}
                        value={props.filteredInfo.pathological}
                    >
                        {pathologicalOptions.map( (pathological)=>
                            <Row key={pathological}>
                                <Col span={18} style={{
                                    display: "inline-block",
                                    /* 设置盒子内元素水平居中 */
                                    textAlign: 'left'}}>
                                    <Checkbox value={pathological} style={props.checkboxStyle}>
                                        <span>{pathological}</span>
                                    </Checkbox>
                                </Col>
                                <Col span={6}>
                                    <span style={{color:'gray'}}>{num['pathological'][pathological]||0}</span>
                                </Col>
                            </Row>
                        )}
                    </Checkbox.Group>
                </Panel>
                <Panel header="Date Published" key="5" style={{fontSize: '18px'}}>
                    <Col>
                        <BarChart num_date_published={num["date_published"]}></BarChart>
                    </Col>
                    <Col>
                        <Slider range marks={marks} defaultValue={[0, 100]} tipFormatter={formatter}
                                onChange={filterChangeDate}
                        />
                    </Col>
                </Panel>
            </Collapse>
        </>
    )
}