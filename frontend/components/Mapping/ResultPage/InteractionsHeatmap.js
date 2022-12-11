import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function InteractionsHeatmap() {
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const annContext = useContext(AnnContext);
    const interHeat = JSON.parse(annContext.result.interHeat)

    // custom graph parameters
    const fontSize = 12 - 0.2 * interHeat.cell_types.length
    const nameLongest = Math.max(...interHeat.cell_types.map(item=>item.length))
    const count = interHeat.count.map(item=>item[2])
    const countMin = Math.min(...count)
    const countMax = Math.max(...count)

    // 定义渲染函数
    function renderChart() {
        try {
            let option =
                {
                    tooltip: {
                        position: 'top',
                        trigger:"item",
                        formatter: (params) =>
                            `${interHeat.cell_types[params.value[0]]} ~ ${interHeat.cell_types[params.value[1]]}
                            </br>
                            <b>Number of Interactions: ${params.value[2]}`
                    },
                    grid: {
                        left:nameLongest*3.5,
                        top:50,
                        right: 10,
                        bottom:nameLongest*3.5,
                    },
                    xAxis: {
                        type: 'category',
                        data: interHeat.cell_types,
                        axisTick:{
                            show:false,
                        },
                        axisLine:{
                            show:false,
                        },
                        axisLabel:{
                            rotate:45,
                            fontWeight:"bold",
                            fontSize:fontSize
                        }
                    },
                    toolbox: {
                        itemSize:18,
                        feature: {
                            saveAsImage: {
                                type: "svg",
                            }
                        },
                        iconStyle: {
                            borderWidth:2
                        }
                    },
                    yAxis: {
                        type: 'category',
                        data: interHeat.cell_types,
                        splitArea: {
                            show: true
                        },
                        axisTick:{
                            show:false,
                        },
                        axisLabel:{
                            rotate:45,
                            fontWeight:"bold",
                            fontSize:fontSize
                        }

                    },
                    visualMap: {
                        min: countMin,
                        max: countMax,
                        calculable: true,
                        orient: 'horizontal',
                        show: true,
                        right: 90,
                        top:0
                    },
                    series: [
                        {
                            name: 'Number of Interactions',
                            type: 'heatmap',
                            data: interHeat.count,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 5,
                                    shadowColor: "black"
                                }
                            }
                        }
                    ],
                    gradientColor:[
                        d3.interpolateViridis(0),
                        d3.interpolateViridis(0.25),
                        d3.interpolateViridis(0.75),
                        d3.interpolateViridis(0.95),
                        d3.interpolateViridis(1),
                    ]
                };
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 option 发生改变的时候，不需要
            // 重新创建图表，而是复用该图表实例，提升性能
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            } else {
                chartInstance = echarts.init(chartRef.current,null,{locale:"EN",renderer:"svg"});
            }
            chartInstance.setOption(option);
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
            <p style={{fontSize:16,marginBottom:10,width:450}}>
                <b>Total number</b> of ligand-receptor interactions:
            </p>
            <div ref={chartRef} style={{height:500,width:450,marginBottom:30}}></div>
        </>
    )
}
