import * as echarts from 'echarts';
import React, {useEffect, useRef} from "react";
import * as d3 from "d3-scale-chromatic";
import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function LigandsReceptorsNetwork(props) {
    // use echarts
    const {cellTypePair} = props
    const chartRef = useRef(null);
    let chartInstance = null;
    const annContext = useContext(AnnContext);
    const lpPair = JSON.parse(annContext.result.lpPair)[cellTypePair]
    const minMeans = Math.min(...lpPair.map( item => item.means))
    const maxMeans = Math.max(...lpPair.map( item => item.means))
    const scaleMeans = (means) => {
        return (means-minMeans)/(maxMeans-minMeans)
    }
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
    // custom graph parameters
    const symbolSize = Math.max(20 - 0.1*(nodeLigands.length + nodeLigands.length + nodeBoth.length),8)

    // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                title: {
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
                tooltip:{},
                legend:{
                    show:true,
                    orient:"vertical",
                    textStyle:{
                        fontWeight: "bold"
                    },
                    top: 0,
                    left:0
                },
                series: [{
                    type: 'graph',
                    layout: 'circular',
                    roam: true,
                    draggable:false,
                    circular: {
                        rotateLabel: true
                    },
                    label: {
                        show:true,
                        fontWeight:"bold",
                    },
                    emphasis: {
                        lineStyle: {
                            width: 7
                        }
                    },
                    // 节点数据格式
                    data: nodeLigands.map(item =>{
                            return(
                                {
                                    id: item,
                                    name: item,
                                    symbolSize: symbolSize,
                                    category:"Ligand",
                                    itemStyle: {
                                        color: d3.interpolateSpectral(0),
                                    },
                                    emphasis: {
                                        focus: 'adjacency',
                                    },
                                    tooltip:{
                                        formatter: (params) => {
                                            return `${params.marker} ${params.data.category}: ${params.data.name}`
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
                                    symbolSize: symbolSize,
                                    category:"Receptor",
                                    itemStyle: {
                                        color: d3.interpolateSpectral(1),
                                    },
                                    emphasis: {
                                        focus: 'adjacency',
                                    },
                                    tooltip:{
                                        formatter: (params) => {
                                            return `${params.marker} ${params.data.category}: ${params.data.name}`
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
                                    symbolSize: symbolSize,
                                    category:"Both",
                                    itemStyle: {
                                        color: d3.interpolateSpectral(0.6),
                                    },
                                    emphasis: {
                                        focus: 'adjacency',
                                    },
                                    tooltip:{
                                        formatter: (params) => {
                                            return `${params.marker} ${params.data.category}: ${params.data.name}`
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
                                    formatter: function (params) {
                                        return (
                                            "<b>" + params.name + "</b>" + "</br>" +
                                            "<b>Mean Expression: </b>" +
                                            Math.pow(2,parseFloat(item.means)).toFixed(4)
                                    )
                                    }
                                },
                                "lineStyle": {
                                    'width': 3,
                                    "curveness": 0.3,
                                    "color": d3.interpolateViridis(scaleMeans(parseFloat(item.means)))
                                }
                            }
                        )
                    }),
                    categories:[
                        {
                            name:"Ligand",
                            symbol:'circle',
                            itemStyle: {
                                color: d3.interpolateSpectral(0)
                            }
                        },
                        {
                            name:"Receptor",
                            symbol:'circle',
                            itemStyle: {
                                color: d3.interpolateSpectral(1)
                            },
                        },
                        {
                            name:"Both",
                            symbol:'circle',
                            itemStyle: {
                                color: d3.interpolateSpectral(0.6)
                            }
                        }]
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
    },[cellTypePair]);

    return(
        <>
            <p style={{fontSize:16,marginBottom:10,height:50,width:450}}>
                Ligand-receptor interactions between:
                <b> {cellTypePair.split('|').join(' - ')}</b></p>
            <div ref={chartRef} style={{height:500,width:450,marginBottom:10}}></div>
        </>
    )
}
