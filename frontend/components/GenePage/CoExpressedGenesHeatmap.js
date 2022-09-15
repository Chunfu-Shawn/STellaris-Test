import * as echarts from 'echarts';
import React, {useContext, useEffect, useRef, useState} from "react";
import * as d3 from "d3-scale-chromatic";
import {DynamicGeneExpress} from "./SpatialExpression";
import Drawer from "@mui/material/Drawer";
import {firstUpperCase} from '../util'
import dataset from "../VisualTool/dataset.json";
import {Col, Divider, Row} from "antd";
import {GeneContext} from '../../pages/browser/genePage/[gene_id]'
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
    const [drawOpen, setDrawOpen] = useState(false);

    //热力图点击事件
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawOpen(open);
        console.log(drawOpen)
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
                        left:60,
                        top:10,
                        right: 0,
                        bottom:20,
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
                                formatter: "Correlation coefficients: 1.00"
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
            <div ref={chartRef} style={{height:60,marginBottom:10}}></div>
            <Drawer
                anchor={"right"}
                open={drawOpen}
                onClose={toggleDrawer(false)}
            >
                <div style={{width:"680px",overflow:"scroll"}}>
                    <Divider orientation="left" orientationMargin={10}><h4>Dataset ID: adata_a2p2</h4></Divider>
                    <Row gutter={[20]} style={{padding:"0px 20px"}}>
                        <Col>
                            <h5>{geneContext.data.symbol}</h5>
                            <DynamicGeneExpress setCustom={true} width={300} height={300} dataset={dataset} gene={firstUpperCase(geneContext.data.symbol)}/>
                        </Col>
                        <Col>
                            <h5>ID2</h5>
                            <DynamicGeneExpress setCustom={true} width={300} height={300} dataset={dataset} gene={firstUpperCase("id2")}/>
                        </Col>
                    </Row>
                    <Divider orientation="left" orientationMargin={10}><h4>Dataset ID: test</h4></Divider>
                    <div style={{height:"60vh"}}></div>
                </div>
            </Drawer>
        </>

    )
}
