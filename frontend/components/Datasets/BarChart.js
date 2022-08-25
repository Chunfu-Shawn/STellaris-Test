import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

export default function BarChart(props){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;

    // 定义渲染函数
    function renderChart() {
        try {
            let options = {
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
                        data: props.num_date_published,
                        type: 'bar',
                        barCategoryGap:0
                    }
                ]
            };
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 options 发生改变的时候，不需要
            // 重新创建图表，而是复用该图表实例，提升性能
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            } else {
                chartInstance = echarts.init(chartRef.current);
            }
            chartInstance.setOption(options);
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
    }, [props.num_date_published]);

    return(
        <div ref={chartRef} style={{height:50}}></div>
    )
}