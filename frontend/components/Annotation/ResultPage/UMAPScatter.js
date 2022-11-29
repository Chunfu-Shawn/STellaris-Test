import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import * as echarts from "echarts";
import {useContext} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";

export default function UMAPScatter(props){
    // use echarts
    const umap = props.data
    const chartRef = useRef(null);
    let chartInstance = null;
    const cell_types = Object.keys(umap)
    const itemHeight = 200/cell_types.length

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
                    text: 'UMAP',
                    subtext: props.title,
                    subtextStyle:{
                        fontSize: 16
                    }
                },
                grid: {
                    left: '0',
                    right: '150',
                    bottom: '0',
                },
                tooltip: {
                    // trigger: 'axis',
                    showDelay: 0,
                    formatter: function (params) {
                        return (
                            "<b>"+umap[params.seriesName].id[params.dataIndex]+"</b>"+
                            "<br/><b>"+"Cell type: </b>"+ params.seriesName
                        );
                    }
                },
                toolbox: {
                    itemSize:18,
                    feature: {
                        saveAsImage: {
                            type:"png",
                            pixelRatio: 6
                        },
                        dataZoom: {},
                    },
                    iconStyle: {
                        borderWidth:2
                    }
                },
                legend: {
                    data: cell_types,
                    orient:"vertical",
                    right: 0,
                    top: 30,
                    itemHeight:itemHeight,
                    textStyle:{
                        fontWeight:"bold",
                        fontSize:itemHeight+1
                    }
                },
                xAxis: [
                    {
                        type: 'value',
                        show: false,
                        scale: true,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        show: false,
                        scale: true,
                        axisLabel: {
                            formatter: '{value}'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: cell_types.map( item => {
                    return {
                        name: item,
                        type: 'scatter',
                        emphasis: {
                            focus: 'series',
                        },
                        blur: {
                            itemStyle: {
                                opacity: 0.01
                            }
                        },
                        symbolSize:4,
                        data: umap[item].value,
                    }
                }),
                color:["darkgray"].concat(
                    cell_types.map( (item,index) => d3.interpolateRainbow(
                    index/cell_types.length
                )))
            };
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 option 发生改变的时候，不需要
            // 重新创建图表，而是复用该图表实例，提升性能
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            } else {
                chartInstance = echarts.init(chartRef.current,null,{locale: 'EN',renderer:"canvas"});
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
        <div ref={chartRef} style={{height:500,width:550,marginBottom:10}}></div>
    )
}