import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import * as echarts from "echarts";
import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function DistanceDensityGraph(){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const annContext = useContext(AnnContext);
    const rfDist = JSON.parse(annContext.result.rfDist)

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
                    text: 'Density of Random Forest Distance',
                    textStyle:{
                        fontSize:15
                    }
                },
                xAxis: {
                    type: 'category',
                    data: rfDist.x
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: rfDist.density,
                        type: 'bar',
                        barCategoryGap:0,
                        itemStyle:{
                            color: d3.interpolateBuPu(0.3),
                            borderColor: d3.interpolateBuPu(0.2)
                        },
                    }
                ],
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
        <div ref={chartRef} style={{height:350,width:300,marginBottom:10}}></div>
    )
}