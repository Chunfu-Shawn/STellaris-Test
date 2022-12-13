import React, {useContext, useEffect, useRef} from "react";
import * as echarts from "echarts";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";
//引入jquery
import $ from 'jquery';
import {LoadingOutlined} from "@ant-design/icons";

export default function GeneExpressionBoxPlot(){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const geneContext = useContext(GeneContext);
    const dataER = geneContext.dataER

    // 定义渲染函数
    function renderChart() {
        try {
            const sourceData = dataER.map(item => [item.organ_tissue,item.rank_score])
            sourceData.unshift(["organ_tissue","rank_score"])
            echarts.registerTransform(ecSimpleTransform.aggregate);
            let option = {
                dataset: [
                    {
                        id: 'raw',
                        source: sourceData
                    },
                    {
                        id: 'rank_score_aggregate',
                        fromDatasetId: 'raw',
                        transform: [
                            {
                                type: 'ecSimpleTransform:aggregate',
                                config: {
                                    resultDimensions: [
                                        {name: 'min', from: 'rank_score', method: 'min'},
                                        {name: 'Q1', from: 'rank_score', method: 'Q1'},
                                        {name: 'median', from: 'rank_score', method: 'median'},
                                        {name: 'Q3', from: 'rank_score', method: 'Q3'},
                                        {name: 'max', from: 'rank_score', method: 'max'},
                                        {name: 'organ_tissue', from: 'organ_tissue'}
                                    ],
                                    groupBy: 'organ_tissue'
                                }
                            },
                            {
                                type: 'sort',
                                config: {
                                    dimension: 'median',
                                    order: 'desc'
                                }
                            }
                        ]
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    confine: true
                },
                yAxis: {
                    type: 'value',
                    name: 'Rank Score',
                },
                xAxis: {
                    type: 'category',
                    axisLabel:{
                        rotate:35,
                        fontSize:13
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
                    bottom: 120
                },
                legend: {
                    selected: {detail: true}
                },
                series: [
                    {
                        name: 'Boxplot',
                        type: 'boxplot',
                        datasetId: 'rank_score_aggregate',
                        boxWidth:"50%",
                        itemStyle: {
                            color: '#b8c5f2'
                        },
                        encode: {
                            y: ['min', 'Q1', 'median', 'Q3', 'max'],
                            x: 'organ_tissue',
                            itemName: ['organ_tissue'],
                            tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
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
                            opacity:0.5,
                            color: '#6e6e6e'
                        },
                        encode: {
                            y: 'rank_score',
                            x: 'organ_tissue',
                            tooltip: ['organ_tissue','rank_score']
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
        chartInstance = echarts.init(chartRef.current,null,{locale:"EN",renderer:"svg"});
        chartInstance.showLoading()
        $.when(
            $.getScript(
                'https://rhesusbase.com:9999/files/ecSimpleTransform.min.js'
            )
        ).done(function () {
            renderChart();
        });
        return () => {
            // 销毁图表实例，释放内存
            chartInstance && chartInstance.dispose()
        }
    },[dataER])

    return(
        <div ref={chartRef} style={{height:600,marginBottom:10,textAlign:"center"}}></div>
    )
}