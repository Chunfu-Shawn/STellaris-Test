import * as echarts from 'echarts';
import React, {useContext, useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function LigandsReceptorsDotplot(props) {
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const annContext = useContext(AnnContext);
    const dotPlot = JSON.parse(annContext.result.dotPlot)

    const xAxis = dotPlot[props.env].xAxis
    const yAxis = dotPlot[props.env].yAxis
    const data = dotPlot[props.env].value.map(item => {
        return [parseInt(item[0]),parseInt(item[1]),parseFloat(item[2])]
    })
    // custom graph parameters
    const xAxisFontSize = Math.max(13 - 0.08 *  xAxis.length,9)
    const yAxisFontSize = Math.max(15 - 0.05 *  yAxis.length,7)
    const xAxisNameLongest = Math.max(...xAxis.map(item=>item.length))*xAxisFontSize
    const yAxisNameLongest = Math.max(...yAxis.map(item=>item.length))

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                tooltip: {
                    position: 'top',
                    formatter: function (params) {
                        return (
                            '<b>'+xAxis[params.value[0]] +'</b></br>'+
                            'Log2 Mean Expression Value: ' + params.value[2] +
                            '</br>'+ ' between ' +
                            '<b>'+yAxis[params.value[1]].split('|').join(' - ')+'</b>'
                        );
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
                grid: {
                    top: 90,
                    left: 20,
                    bottom: 0,
                    right: 60,
                    containLabel: true
                },
                dataZoom: [
                    {
                        type: 'slider',
                        xAxisIndex: 0,
                        top:50,
                        filterMode: 'none'
                    },
                    {
                        type: 'slider',
                        yAxisIndex: 0,
                        filterMode: 'none'
                    }
                ],
                xAxis: {
                    type: 'category',
                    data: xAxis,
                    boundaryGap: false,
                    splitLine: {
                        show: true
                    },
                    axisLabel:{
                        rotate:60,
                        fontWeight:"bold",
                        fontSize:xAxisFontSize
                    }
                },
                yAxis: {
                    type: 'category',
                    data: yAxis,
                    splitLine: {
                        show: true
                    },
                    axisLabel:{
                        rotate:30,
                        fontWeight:"bold",
                        fontSize:yAxisFontSize
                    }
                },
                visualMap: {
                    min: Math.min(...data.map( function (item) { return item[2] } )),
                    max: Math.max(...data.map( function (item) { return item[2] } )),
                    calculable: true,
                    orient: 'horizontal',
                    top: 0,
                    right: 90,
                    show: true
                },
                series: [
                    {
                        type: 'scatter',
                        symbolSize: yAxisFontSize,
                        data: data,
                        animationDelay: function (idx) {
                            return idx * 5;
                        }
                    }
                ],
                gradientColor:[
                    d3.interpolateViridis(0),
                    d3.interpolateViridis(0.25),
                    d3.interpolateViridis(0.5),
                    d3.interpolateViridis(0.75),
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
    },[props.env]);

    return(
        <>
            <p style={{fontSize:16,marginBottom:10,height:50,width:450}}>
                Ligand-receptor interactions in microenvironment:
                <b> {props.env}</b></p>
            <div ref={chartRef} style={{height:1200,width:650}}></div>
        </>
    )
}
