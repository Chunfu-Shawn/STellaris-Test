import {Checkbox, Col, Collapse, Row, Slider, Space} from "antd";
import React, {useEffect, useRef} from "react";
const { Panel } = Collapse;
const methodsOptions = ['stereo-seq', 'slide-seq2', 'Visium', 'ST', 'MERFISH','STRS','DBiT-seq'];
const methodsOptions2 = ['Seq-Scope','RNAscope','sci-Space', 'Space-TREX','seqFISH','seqFISH+','HCR-seqFISH','osmFISH','EASI-FISH','HybISS']
const speciesOptions = ['Mus musculus', 'Homo sapiens'];
const organsOptions = ['brain','testis', 'Kidney','Liver','Stomach','Colon','spinal_cord'];
const pathologicalOptions = ['TRUE','FALSE'];
import * as echarts from 'echarts';

let option = {
    color:'rgba(54,0,135,0.15)',
    xAxis: {
        axisLine:{
            show:false,
        },
        axisTick:{
            show:false,
        },
        type: 'category',
    },
    yAxis: {
        show:false,
        type: 'value'
    },
    grid:{
        left:0,
        top:0,
        right: 0,
        bottom:0,
    },
    series: [
        {
            data: [1, 2, 5, 8, 7,12,11,7,8,14,21,24,25,25, 11, 13],
            type: 'bar',
            barCategoryGap:0
        }
    ]
};


const marks = {
    0: {
        style: {
            color: '#9d9d9d',
        },
        label: '2016',
    },
    100: {
        style: {
            color: '#9d9d9d',
        },
        label: '2023',
    },
};
const formatter = (value) => {
    const pad = num => (num > 9 ? "" : "0") + num;
    let monthAll = Math.floor(value*84/100)
    let month = monthAll %12 + 1
    let year = Math.floor(monthAll/12) + 1
    return 2015 + year + '-' + pad(month)
};

export default function FilterToolbar(props){
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
        console.log('Various parameters', filters);
        props.setFilteredInfo(filters);
        //onFilter(filters)
    };
    const filterChangeSpecies = (checkedValues) => {
        let filters = {
            method:props.filteredInfo.method,
            species:checkedValues,
            organ:props.filteredInfo.organ,
            pathological:props.filteredInfo.pathological,
            date_published:props.filteredInfo.date_published
        }
        console.log('Various parameters', filters);
        props.setFilteredInfo(filters);
    };
    const filterChangeOrgan = (checkedValues) => {
        let filters = {
            method:props.filteredInfo.method,
            species:props.filteredInfo.species,
            organ:checkedValues,
            pathological:props.filteredInfo.pathological,
            date_published:props.filteredInfo.date_published
        }
        console.log('Various parameters', filters);
        props.setFilteredInfo(filters);
    };
    const filterChangePathological = (checkedValues) => {
        let filters = {
            method:props.filteredInfo.method,
            species:props.filteredInfo.species,
            organ:props.filteredInfo.organ,
            pathological:checkedValues,
            date_published:props.filteredInfo.date_published
        }
        console.log('Various parameters', filters);
        props.setFilteredInfo(filters);
    };
    const filterChangeDate = (value) => {
        let filters = {
            method:props.filteredInfo.method,
            species:props.filteredInfo.species,
            organ:props.filteredInfo.organ,
            pathological:props.filteredInfo.pathological,
            date_published: [Date.parse(formatter(value[0]))+'-'+ Date.parse(formatter(value[1]))],
            }
        console.log('Various parameters', filters)
        props.setFilteredInfo(filters);
    };
    /*const onFilter = (filters) => {
        let dataFiltered = []
        let dataTemp = props.dataShow.length===0 ? props.data : props.dataShow
        for (let i in dataTemp){
            if(
                filters.method.includes(dataTemp[i].method)||
                filters.organ.includes(dataTemp[i].organ)||
                filters.species.includes(dataTemp[i].species)||
                filters.pathological.includes(dataTemp[i].pathological)||
                (filters.date_published[0] <= Date.parse(dataTemp[i].date_published) &&
                    filters.date_published[1] >= Date.parse(dataTemp[i].date_published))
            )
            {
                dataFiltered.push(dataTemp[i])
            }
        }
        props.setDataShow(dataFiltered)
        console.log('dataFiltered',dataFiltered)
    }*/

    const chartRef = useRef(null);
    useEffect(()=>{
        let myChart = echarts.init(chartRef.current);
        option && myChart.setOption(option);
    },[])

    return (
        <>
            <Collapse bordered={false} defaultActiveKey={['1','5']}>
                <Panel header="Methods" key="1" style={{fontSize: '18px'}}>
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={filterChangeMethod}
                        //读取filteredInfo中选择的值
                        value={props.filteredInfo.method}
                    >
                        {methodsOptions.map( (method)=>
                            <Row key={method} justify="start">
                                <Checkbox value={method} style={props.checkboxStyle}>{method}</Checkbox>
                            </Row>
                        )}
                        <Collapse bordered={false} >
                            <Panel showArrow={false} header="view more" collapsible="header" key="1">
                                {methodsOptions2.map( (method)=>
                                    <Row key={method} justify="start">
                                        <Checkbox value={method} style={props.checkboxStyle}>{method}</Checkbox>
                                    </Row>
                                )}
                            </Panel>
                        </Collapse>
                    </Checkbox.Group>
                </Panel>
                <Panel header="Species" key="2" style={{fontSize: '18px'}}>
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={filterChangeSpecies}
                        value={props.filteredInfo.species}
                    >
                        {speciesOptions.map( (species)=>
                            <Row key={species} justify="start">
                                <Checkbox value={species} style={props.checkboxStyle}>{species}</Checkbox>
                            </Row>
                        )}
                    </Checkbox.Group>
                </Panel>
                <Panel header="Organ" key="3" style={{fontSize: '18px'}}>
                    <Checkbox.Group
                        style={{
                            width: '100%',
                        }}
                        onChange={filterChangeOrgan}
                        value={props.filteredInfo.organ}
                    >
                        {organsOptions.map( (organ)=>
                            <Row key={organ} justify="start">
                                <Checkbox value={organ} style={props.checkboxStyle}>{organ}</Checkbox>
                            </Row>
                        )}
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
                            <Row key={pathological} justify="start">
                                <Checkbox value={pathological} style={props.checkboxStyle}>{pathological}</Checkbox>
                            </Row>
                        )}
                    </Checkbox.Group>
                </Panel>
                <Panel header="Date Published" key="5" style={{fontSize: '18px'}}>
                    <Col>
                        <div ref={chartRef} style={{height:50}}></div>
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