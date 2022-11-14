import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import {graph} from "./graph"

export default function MSTNetwork() {
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
                    text: 'MST of cell types colocalization',
                    top: 'top',
                    left: 'left',
                    textStyle:{
                        fontSize: 14
                    }
                },
                toolbox: {
                    feature: {
                        saveAsImage:{type:"svg"},
                    }
                },
                legend: [
                    {
                        // selectedMode: 'single',
                        data: graph.categories.map(function (a) {
                            return a.name;
                        }),
                        top:"bottom"
                    }
                ],
                series: [
                    {
                        name: 'Les Miserables',
                        type: 'graph',
                        layout: 'force',
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        roam: true,
                        label: {
                            position: 'right'
                        },
                        force: {
                            repulsion: 100
                        }
                    }
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
        <div ref={chartRef} style={{height:400,width:600,marginBottom:10}}></div>
    )
}
