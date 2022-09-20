import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";


export default function ProportionClustersBarChart(props) {
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    //柱状图点击事件
    const onClick = (e) => {
        console.log(e)
        alert(e.name)
    }

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        show: true,
                        type: 'shadow'
                    },
                    formatter: (param) => `<b>${param.name}</b>
                        <br/><b>${param.seriesName}</b>: ${param.value}%
                        <br/> <b>marker genes</b>: ${param.value}`
                },
                grid: {
                    top: 10,
                    left: 150,
                    right: 30,
                    bottom: 10,
                    containLabel: true
                },
                legend: [
                    {
                        left: "left",
                        orient:"vertical"
                    }
                ],
                xAxis: [
                    {
                        type: 'value',
                        name:"Proportion",
                        nameLocation:"center",
                        nameTextStyle:{
                            fontSize: 14
                        },
                        axisLabel:{
                            formatter: (value) => value + "%"
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        data: ['Brain', 'Liver', 'Lung', 'Colon', 'Stomach', 'Heart', 'Bone']
                    }
                ],
                color: props.series.map( (item,index) => d3.interpolateBuPu((index+1)/props.series.length)),
                series: props.series.map( (item) => {
                    return {
                        name: item.name,
                        type: 'bar',
                        stack: 'Ad',
                        data: item.data,
                        emphasis:
                            {
                                focus: 'none',
                                label: {
                                    show : true,
                                    formatter: (params) => params.value+"%"
                                }
                            }
                    }
                })
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
            chartInstance.on('click',onClick);
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
        <div ref={chartRef} style={{height:200,marginBottom:10}}></div>
    )
}
