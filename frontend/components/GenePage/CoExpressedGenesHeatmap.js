import * as echarts from 'echarts';
import React, {useContext, useEffect, useRef, useState} from "react";
import * as d3 from "d3-scale-chromatic";
import {DynamicGeneExpress} from "./SpatialExpression";
import Drawer from "@mui/material/Drawer";
//import {firstUpperCase} from '../util'
import dataset from "../VisualTool/dataset.json";
import {Col, Divider, Row} from "antd";
import {GeneContext} from '../../pages/search/genePage/[gene_id]'
const dataset2 = {
    "id": "GSM5833739",
    "name": "GSM5833739",
    "url": "https://rhesusbase.com:9999/datasets/GSM5833739_10x_Visium_deal/GSM5833739_10x_Visium_deal.jsonl"
}

export default function CoExpressedGenesHeatmap(props) {
    // use echarts
    const geneContext = useContext(GeneContext);
    const chartRef = useRef(null);
    let chartInstance = null;
    const [corGene,setCorGene] = useState('')
    const [drawOpen, setDrawOpen] = useState(false);

    //热力图点击事件
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawOpen(open);
        setCorGene(event.name)
        console.log(open)
    };

    // 定义渲染函数
    function renderChart() {
        try {
            let option =
                {
                    tooltip: {
                        position: 'top'
                    },
                    grid: {
                        left:150,
                        top:10,
                        right: 50,
                        bottom:50,
                    },
                    xAxis: {
                        type: 'category',
                        data: props.genes,
                        axisTick:{
                            show:false,
                        },
                        axisLine:{
                            show:false,
                        },
                        axisLabel:{
                            margin:5,
                            rotate:30,
                            fontSize:13
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: props.tissue,
                        splitArea: {
                            show: true
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLabel:{
                            fontStyle:"bold",
                            fontSize:15
                        }

                    },
                    visualMap: {
                        min: 0,
                        max: 30,
                        calculable: true,
                        orient: 'horizontal',
                        show: false
                    },
                    series: [
                        {
                            name: 'Number of supportive datasets',
                            type: 'heatmap',
                            data: props.supportiveDatasets.map( (item,index) => [index, 0, item || '-'] ),
                            label: {
                                show: true
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 5,
                                    shadowColor: "black"
                                }
                            },
                            tooltip: {
                                trigger:"item",
                                formatter: (params) =>
                                    `<b style="color: #2b0f75">${geneContext.data.symbol} ~ ${props.genes[params.value[0]]}</b><br/>
                                    Mean Pearson Correlation (ρ): <b>${props.meanRho[props.genes[params.value[0]]]}</b><br/>
                                    Supported by <b>${params.value[2]}</b> datasets</br>
                                    <b>Click</b> to show two genes expression in these datasets`
                            }
                        }
                    ],
                    gradientColor:[
                        d3.interpolateBuPu(0),
                        d3.interpolateBuPu(0.25),
                        d3.interpolateBuPu(0.5),
                        d3.interpolateBuPu(0.75),
                        d3.interpolateBuPu(1),
                    ]
                };
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 option 发生改变的时候，不需要
            // 重新创建图表，而是复用该图表实例，提升性能
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            } else {
                chartInstance = echarts.init(chartRef.current);
            }
            chartInstance.setOption(option);
            chartInstance.off('click');
            chartInstance.on('click',toggleDrawer(true));
        } catch (error) {
            console.error("error", error.message);
            chartInstance && chartInstance.dispose();
        }
    }

    useEffect(() => {
        renderChart();
        return () => {
            // 销毁图表实例，释放内存
            chartInstance && chartInstance.dispose();
        };
    });

    return(
        <>
            <div ref={chartRef} style={{height:100,marginBottom:10}}></div>
            <Drawer
                anchor={"right"}
                open={drawOpen}
                onClose={toggleDrawer(false)}
            >
                <div style={{width:"700px",overflow:"scroll"}}>
                    <Divider orientation="left" orientationMargin={10}><h4>Dataset ID: {dataset.id}</h4></Divider>
                    <Row gutter={[20]} style={{padding:"0px 20px"}}>
                        <Col>
                            <h5>{geneContext.data.symbol}</h5>
                            <DynamicGeneExpress setCustom={true} width={300} height={300} dataset={dataset} gene={geneContext.data.symbol}/>
                        </Col>
                        <Col>
                            <h5>{corGene}</h5>
                            <DynamicGeneExpress setCustom={true} width={300} height={300} dataset={dataset} gene={corGene}/>
                        </Col>
                    </Row>
                    <Divider orientation="left" orientationMargin={10}><h4>Dataset ID: {dataset2.id}</h4></Divider>
                    <Row gutter={[20]} style={{padding:"0px 20px"}}>
                        <Col>
                            <h5>{geneContext.data.symbol}</h5>
                            <DynamicGeneExpress setCustom={true} width={300} height={300} dataset={dataset2} gene={geneContext.data.symbol}/>
                        </Col>
                        <Col>
                            <h5>{corGene}</h5>
                            <DynamicGeneExpress setCustom={true} width={300} height={300} dataset={dataset2} gene={corGene}/>
                        </Col>
                    </Row>
                    <div style={{height:"30vh"}}></div>
                </div>
            </Drawer>
        </>

    )
}
