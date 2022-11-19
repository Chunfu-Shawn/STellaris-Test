import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import * as echarts from "echarts";
import {useContext} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";

export default function ScoreBarGraph(props){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
                    text: 'Enrichment Score',
                    textStyle:{
                        fontSize:16
                    }
                },
                grid:{
                    bottom:100,
                    left:50,
                    right:0
                },
                toolbox:{
                    feature:{
                        saveAsImage:{
                            type: "svg"
                        }
                    }
                },
                tooltip: {
                    position: 'top',
                    formatter: function (params) {
                        return (
                            '<b>'+params.name +'</b></br>'+
                            '<b>MIA Enrichment Score: </b>' + props.MIA.enrichment_score[params.dataIndex]
                        );
                    }
                },
                xAxis: {
                    type: 'category',
                    data: props.MIA.section_id.map(item => item.split("|")[1]),
                    axisLabel:{
                        rotate:45,
                        fontWeight:"bold",
                        fontSize:10
                    }
                },
                yAxis: {
                    show:true,
                    splitLine: {
                        show: true
                    },
                    type: 'value'
                },
                series: [
                    {
                        data: props.MIA.enrichment_score,
                        type: 'bar',
                        barCategoryGap:"50%",
                        itemStyle:{
                            color: d3.interpolateBuPu(0.3),
                            borderColor: d3.interpolateBuPu(0.5)
                        },
                    }
                ],
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
        <div ref={chartRef} style={{height:400,width:1100,marginBottom:10}}></div>
    )
}