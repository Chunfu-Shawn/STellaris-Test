import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import * as echarts from "echarts";

export default function DistanceDensityGraph(){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                xAxis: {
                    type: 'category',
                    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
                },
                yAxis: {
                    type: 'value'
                },
                visualMap: [
                    {
                        show: false,
                        type: 'continuous',
                        seriesIndex: 0,
                        min: 100,
                        max: 1300
                    }
                ],
                series: [
                    {
                        data: [210,431,620, 832, 931, 1034, 1290, 1330, 1320,1100,921,590,321,100],
                        type: 'line',
                        symbol: 'none',
                        smooth: true
                    }
                ],
                toolbox: {
                    feature: {
                        saveAsImage:{type:"svg"},
                    }
                },
                gradientColor:[
                    d3.interpolateInferno(1),
                    d3.interpolateInferno(0.75),
                    d3.interpolateInferno(0.5),
                    d3.interpolateInferno(0.25),
                    d3.interpolateInferno(0),
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
        <div ref={chartRef} style={{height:400,width:500,marginBottom:10}}></div>
    )
}