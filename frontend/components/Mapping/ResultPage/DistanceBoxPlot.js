import React, {useContext, useEffect, useRef} from "react";
import * as echarts from "echarts";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
//引入jquery
import $ from 'jquery';
import * as d3 from "d3-scale-chromatic";

export default function DistanceBoxPlot(){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const annContext = useContext(AnnContext);
    const dataDis = JSON.parse(annContext.result.eucDisBox)

    // 定义渲染函数
    function renderChart() {
        try {
            const sourceData = dataDis.map(item => [item.cell_type_pair,item.group,item.euclidean_distance])
            sourceData.unshift(["cell_type_pair","group","euclidean_distance"])
            echarts.registerTransform(ecSimpleTransform.aggregate);
            let option = {
                dataset: [
                    {
                        id: 'raw',
                        source: sourceData
                    },
                    {
                        id: 'euclidean_distance_aggregate',
                        fromDatasetId: 'raw',
                        transform: [
                            {
                                type: 'ecSimpleTransform:aggregate',
                                config: {
                                    resultDimensions: [
                                        {name: 'min', from: 'euclidean_distance', method: 'min'},
                                        {name: 'Q1', from: 'euclidean_distance', method: 'Q1'},
                                        {name: 'median', from: 'euclidean_distance', method: 'median'},
                                        {name: 'Q3', from: 'euclidean_distance', method: 'Q3'},
                                        {name: 'max', from: 'euclidean_distance', method: 'max'},
                                        {name: 'group', from: 'group'},
                                        {name: 'cell_type_pair', from: 'cell_type_pair'}
                                    ],
                                    groupBy: 'group'
                                }
                            },
                            {
                                type: 'sort',
                                config: {
                                    dimension: 'median',
                                    order: 'asc'
                                }
                            }
                        ]
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    confine: true
                },
                title: {
                    text: 'Euclidean Distance',
                    textStyle:{
                        fontSize:15
                    }
                },
                yAxis: {
                    type: 'value',
                },
                xAxis: {
                    type: 'category',
                    name:"Group",
                    nameLocation: "center",
                    nameGap: 50,
                    nameTextStyle:{
                        fontSize:14,
                        fontWeight:"bold"
                    },
                    axisLabel:{
                        rotate:35,
                        fontSize:13
                    },
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
                    bottom: 80,
                    left: 100
                },
                legend: {
                    selected: {detail: true},
                    left:250,
                },
                series: [
                    {
                        name: 'Boxplot',
                        type: 'boxplot',
                        datasetId: 'euclidean_distance_aggregate',
                        boxWidth:"50%",
                        itemStyle: {
                            color: d3.interpolateYlOrRd(0.1),
                            borderColor: d3.interpolateYlOrRd(0.5),
                        },
                        encode: {
                            y: ['min', 'Q1', 'median', 'Q3', 'max'],
                            x: 'group',
                            tooltip: ['min', 'median', 'max']
                        }
                    },
                    {
                        name: 'Raw data',
                        type: 'scatter',
                        datasetId: 'raw',
                        symbolSize: 5,
                        tooltip: {
                            trigger: 'item'
                        },
                        itemStyle: {
                            opacity:0.4,
                            color: 'rgba(182,77,45,0.4)'
                        },
                        encode: {
                            y: 'euclidean_distance',
                            x: 'group',
                            tooltip: ['cell_type_pair','group','euclidean_distance']
                        }
                    }
                ]
            }
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 option 发生改变的时候，不需要
            // 重新创建图表，而是复用该图表实例，提升性能
            chartInstance.setOption(option);
            chartInstance.off('click');
            chartInstance.hideLoading()
        } catch (error) {
            console.error("error", error.message);
            chartInstance && chartInstance.dispose();
        }
    }

    useEffect(() => {
        $.when(
            $.getScript(
                'https://rhesusbase.com:9999/files/ecSimpleTransform.min.js'
            )
        ).done(function () {
            chartInstance = echarts.init(chartRef.current,null,{locale:"EN",renderer:"svg"});
            chartInstance.showLoading()
            renderChart();
        });
        return () => {
            // 销毁图表实例，释放内存
            chartInstance && chartInstance.dispose()
        }
    },[dataDis])

    return(
        <div ref={chartRef} style={{height:500,width:500,margin:"0px 70px"}}></div>
    )
}