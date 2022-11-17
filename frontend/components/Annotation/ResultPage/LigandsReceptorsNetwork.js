import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import {useContext} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";

export default function LigandsReceptorsNetwork(props) {
    // use echarts
    const {cellTypePair} = props
    const chartRef = useRef(null);
    let chartInstance = null;
    const annContext = useContext(AnnContext);
    const lpPair = JSON.parse(annContext.result.lpPair)[cellTypePair]
    const nodeLigands = Array.from(
        new Set(
            lpPair.map(item => item.gene_l!==null ? item.gene_l : item.partner_l)
        ))
    const nodeReceptors = Array.from(
        new Set(
            lpPair.map(item => item.gene_r!==null ? item.gene_r : item.partner_r)
        ))
    let nodeBoth = [];
    for (let i = 0; i < nodeLigands.length; i++) {
        for (let j = 0; j < nodeReceptors.length; j++) {
            if(nodeLigands[i] === nodeReceptors[j]){
                nodeBoth.push(nodeLigands[i]);
                nodeLigands.splice(i,1)
                nodeReceptors.splice(j,1)
                i--;
                j--;
            }
        }
    }
    console.log(nodeLigands,nodeReceptors,nodeBoth)

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
                    text:'Ligands and receptors interactions between two cell types',
                    textStyle: {
                        fontSize: 16
                    }
                },
                grid:{
                    top:30
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            type: "svg",
                            pixelRatio: 3  // 数值越高下载图片内存越大越清晰，建议范围（3-10）
                        }
                    }
                },
                series: [{
                    type: 'graph',
                    layout: 'circular',
                    roam: true,
                    focusNodeAdjacency: true,
                    circular: {
                        rotateLabel: true
                    },
                    label: {
                        show:true,
                        fontWeight:"bold",
                        position: 'bottom'
                    },
                    // 节点数据格式
                    data: nodeLigands.map(item =>{
                            return(
                                {
                                    id: item,
                                    name: item,
                                    symbolSize: 20,
                                    itemStyle: {
                                        normal: {
                                            color: '#F07C82'
                                        }
                                    }
                                }
                            )
                    }).concat(
                        nodeReceptors.map(item =>{
                            return(
                                {
                                    id: item,
                                    name: item,
                                    symbolSize: 20,
                                    itemStyle: {
                                        normal: {
                                            color: '#917cf0'
                                        }
                                    }
                                }
                            )
                        })
                    ).concat(
                        nodeBoth.map(item =>{
                            return(
                                {
                                    id: item,
                                    name: item,
                                    symbolSize: 20,
                                    itemStyle: {
                                        normal: {
                                            color: '#99f07c'
                                        }
                                    }
                                }
                            )
                        })
                    ),
                    edges: lpPair.map(item => {
                        return(
                            {
                                source: item.gene_l !== null ? item.gene_l : item.partner_l,
                                target: item.gene_r !== null ? item.gene_r : item.partner_r,
                                name: `${item.gene_l !== null ? item.gene_l : item.partner_l} -> ${item.gene_r !== null ? item.gene_r : item.partner_r}`,
                                tooltip: {
                                    trigger: "item",
                                    formatter: function (params, ticket, callback) {
                                        return params.data.name;
                                    }
                                },
                                label: {
                                    normal: {
                                        formatter: function (params, ticket, callback) {
                                            params.name = params.data.name;
                                            return params.name;
                                        },
                                        show: true
                                    }
                                },
                                lineStyle: {
                                    "normal": {
                                        'width': parseFloat(item.mean)*20,
                                        "curveness": 0.2,
                                        "color": "#030303"
                                    }
                                }
                            }
                        )
                    }),
                }]
            }
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
        <div ref={chartRef} style={{height:500,width:600,marginBottom:10}}></div>
    )
}
