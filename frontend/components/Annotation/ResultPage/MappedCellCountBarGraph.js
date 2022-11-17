import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import * as echarts from "echarts";

const series =
    [
        {
            name: 'Mapped Cell',
            data: [1812, 1233, 479, 734, 2129, 220, 350]
        },
        {
            name: 'Deprecated Cell',
            data: [301, 26, 50, 30, 162, 34, 265]
        },
    ]

export default function MappedCellCountBarGraph(){
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
                title: {
                    text: 'Number of cell (Mapped and deprecated)',
                },
                tooltip: {
                    trigger: 'item',
                    axisPointer: {
                        show: true,
                        type: 'shadow'
                    },
                    formatter: (param) => `<b>${param.name}</b>
                        <br/><b>${param.seriesName}</b>: ${param.value}`
                },
                toolbox: {
                    feature: {
                        saveAsImage:{type:"svg"},
                    }
                },
                grid: {
                    top: 70,
                    left: 10,
                    right: 30,
                    bottom: 50,
                    containLabel: true
                },
                legend: [
                    {
                        bottom:"0",
                        left: "0",
                        orient:"horizontal"
                    }
                ],
                xAxis: [
                    {
                        type: 'category',
                        data: ['Type1', 'Type2', 'Type3', 'Type4', 'Type5', 'Type6', 'Type7']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name:"Cell Count",
                        nameTextStyle:{
                            fontSize: 14
                        },
                        axisLabel:{
                            formatter: (value) => value
                        }
                    }
                ],
                color: [d3.interpolateBuPu(0.3),d3.interpolateBuPu(0.9)],
                series: series.map( (item) => {
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
                                    formatter: (params) => params.value
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
                chartInstance = echarts.init(chartRef.current,null,{locale:"EN",renderer:"svg"});
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
        <div ref={chartRef} style={{height:400,width:600,marginBottom:10}}></div>
    )
}