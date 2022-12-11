import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function MSTNetwork() {
    // use echarts
    const chartRef = useRef(null);
    const annContext = useContext(AnnContext);
    const mst = JSON.parse(annContext.result.mst)
    let chartInstance = null;

    // max and min
    const maxDegree = Math.max(...mst.nodes.map( item => item.degree))
    const minDegree = Math.min(...mst.nodes.map( item => item.degree))
    const maxWeight = Math.max(...mst.edges.map( item => item.weight))
    const minWeight = Math.min(...mst.edges.map( item => item.weight))
    const scaleWeight = (degree) => {
        return (degree-minWeight)/(maxWeight-minWeight)
    }

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
                    text: 'MST of cell type colocalization',
                    top: 'top',
                    left: 'left',
                    textStyle:{
                        fontSize: 14
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
                series: [
                    {
                        name: 'Les Miserables',
                        type: 'graph',
                        layout: 'force',
                        data: mst.nodes.map( item => {
                            return {
                                id: item.id,
                                name: item.name,
                                symbolSize: Math.min(item.degree*4+6,40),
                                value: item.degree,
                            }
                        }),
                        edges: mst.edges.map( item => {
                            return {
                                source: item.source,
                                target: item.target,
                                "lineStyle": {
                                    "width": scaleWeight(item.weight)*10+6,
                                    "color": d3.interpolateYlOrRd(scaleWeight(item.weight)+0.1)
                                }
                            }
                        }),
                        roam: false,
                        draggable: true,
                        label: {
                            show:true,
                            fontWeight:"bold",
                            position: 'bottom'
                        },
                        force: {
                            repulsion: 400,
                            edgeLength: 2
                        },
                        emphasis: {
                            focus: 'adjacency',
                        },
                    }
                ],
                visualMap: {
                    min: minDegree-1,
                    max: maxDegree+1,
                    orient: 'horizontal',
                    top:0,
                    right:80,
                    show: true
                },
                gradientColor:[
                    d3.interpolateYlOrRd(0),
                    d3.interpolateYlOrRd(0.25),
                    d3.interpolateYlOrRd(0.5),
                    d3.interpolateYlOrRd(0.75),
                    d3.interpolateYlOrRd(1),
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
        <div ref={chartRef} style={{height:500,width:600,marginBottom:10}}></div>
    )
}
