import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function EDHeatmap() {
    // use echarts
    let chartInstance = null;
    const chartRef = useRef(null);
    const annContext = useContext(AnnContext);
    const eucDis = JSON.parse(annContext.result.eucDis)

    // custom graph parameters
    const fontSize = 12 - 0.2 * eucDis.cell_types.length
    const nameLongest = Math.max(...eucDis.cell_types.map(item=>item.length))

    // 定义渲染函数
    function renderChart() {
        try {
            let option =
                {
                    title:{
                        text:"Euclidean distance between cell types (log2)",
                        textStyle:{
                            fontSize:14
                        }
                    },
                    tooltip: {
                        position: 'top',
                        trigger:"item",
                        formatter: (params) =>
                            `${eucDis.cell_types[params.value[0]]} ~ ${eucDis.cell_types[params.value[1]]}
                            </br>
                            <b>Log2 eucDis</b>: ${params.value[2]}`
                    },
                    grid: {
                        containLabel:true,
                        left:0,
                        top:70,
                        right: 10,
                        bottom:0
                    },
                    xAxis: {
                        type: 'category',
                        data: eucDis.cell_types,
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
                        },
                        top:20
                    },
                    yAxis: {
                        type: 'category',
                        data: eucDis.cell_types,
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
                        min: Math.min(...eucDis.log_distance.map(item=>item[2])),
                        max: Math.max(...eucDis.log_distance.map(item=>item[2])),
                        calculable: true,
                        orient: 'horizontal',
                        show: true,
                        top:20,
                        right:80
                    },
                    series: [
                        {
                            name: 'Number of supportive datasets',
                            type: 'heatmap',
                            data: eucDis.log_distance,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 5,
                                    shadowColor: "black"
                                }
                            }
                        }
                    ],
                    gradientColor:[
                        d3.interpolateYlOrRd(1),
                        d3.interpolateYlOrRd(0.75),
                        d3.interpolateYlOrRd(0.5),
                        d3.interpolateYlOrRd(0.25),
                        d3.interpolateYlOrRd(0),
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
    },[annContext.result]);

    return(
        <div ref={chartRef} style={{height:500,width:450,marginBottom:10}}></div>
    )
}
