import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";

export default function LigandsReceptorsNetwork() {
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
                    // text:'弦图',
                    left: '25%'
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
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
                        normal: {
                            position: 'inside',
                            fontWeight: 'bold',
                            formatter: '{b}',
                            fontSize: 13,
                        }
                    },
                    edgeSymbol: ['circle'],
                    edgeSymbolSize: [4, 10],
                    edgeLabel: {
                        normal: {
                            textStyle: {
                                fontSize: 17,
                                fontWeight: 'bold',
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                rotate: true,
                                show: true,
                                textStyle: {
                                    color: '#333',
                                    fontWeight: '400'
                                }
                            },
                        },
                        emphasis: {
                            label: {
                                show: true,
                                textStyle: null
                            }
                        }
                    },
                    // 节点数据格式
                    data: [
                        {
                            name: '1',
                            symbolSize: 30, // 设置节点大小
                            itemStyle: {
                                normal: {
                                    color: '#F07C82'
                                }
                            }
                        }, {
                            name: '2',
                            symbolSize: 34,
                            itemStyle: {
                                normal: {
                                    color: '#F07C82'
                                }
                            }
                        },
                        // ......
                    ],
                    links: [
                        {
                            source: "1",
                            target: "2",
                            name: "",
                            tooltip: {
                                trigger: "item",
                                formatter: function (params, ticket, callback) {
                                    return params.data.name;
                                }
                            },
                            symbolSize: [5, 20],
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
                                normal: {
                                    width: 5.6666666666666666,
                                    curveness: 0.2,
                                    color: "#F07C82"
                                }
                            }
                        },

                        // ......
                    ]
                },
                ]
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
        <div ref={chartRef} style={{height:400,width:600,marginBottom:10}}></div>
    )
}
