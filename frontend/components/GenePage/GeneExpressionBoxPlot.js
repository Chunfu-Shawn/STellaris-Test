import React, {useContext, useEffect, useRef} from "react";
import * as echarts from "echarts";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";
//引入jquery
import $ from 'jquery';

export default function GeneExpressionBoxPlot(){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const geneContext = useContext(GeneContext);
    const data = geneContext.data
    const pseudoExpr = geneContext.dataPseudoEr
    let organTissue = Array.from(new Set(pseudoExpr.map(item => item.organ_tissue)))
        .sort((a,b) => {
            if(a > b) return 1
            else return -1
        })

    const transform2boxplot = function (data,organTissue){
        let sourceData = organTissue.map(item => [])
        data.forEach(item => {
            sourceData[organTissue.indexOf(item.organ_tissue)].push(item.rank_score)
        })
        return sourceData
    }

        //transform2boxplot(pseudoExpr,organTissue)

    // 定义渲染函数
    function renderChart(data) {
        try {
            const sourceData = data.map(item => [item.organ_tissue,item.rank_score])
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
                        rotate:45,
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
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
            chartInstance = renderedInstance;
        } else {
            chartInstance = echarts.init(chartRef.current);
        }
            chartInstance.setOption(option);
            chartInstance.off('click');
        } catch (error) {
            console.error("error", error.message);
            chartInstance && chartInstance.dispose();
        }
    }

    useEffect(() => {
        $.when(
            $.get("/api/pseudo-expression/" + data.symbol),
            $.getScript(
                'https://rhesusbase.com:9999/files/ecSimpleTransform.min.js'
            )
        ).done(function (res) {
            renderChart(res[0]);
        });
        return () => {
            // 销毁图表实例，释放内存
            chartInstance && chartInstance.dispose()
        }
    },[])

    return(
        <div ref={chartRef} style={{height:600,marginBottom:10}}></div>
    )
}