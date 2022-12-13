import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

export default function UMAPScatter(props){
    // use echarts
    const umap = props.data
    const chartRef = useRef(null);
    let chartInstance = null;
    const cell_types = Object.keys(umap)
    const itemHeight = Math.min(200/cell_types.length +2, 18)

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
                    top: 80,
                    left: 0,
                    right: 150,
                    bottom: 0,
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
                            type:"svg",
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
                    right: 0,
                    top:50,
                    orient:"vertical",
                    type:"scroll",
                    itemHeight:itemHeight,
                    textStyle:{
                        fontWeight:"bold",
                        fontSize:itemHeight+1,
                    },
                    formatter: function(sStr) { // 需要配合textStyle.lineHeight设置行高，不然换行后行间距太小
                        let str = "";
                        let l = 0;
                        let schar;
                        for (let i = 0; schar = sStr.charAt(i); i++) {
                            str += schar;
                            // /[^\x00-\xff]/ 匹配双字节字符，如中文、全角符号，其它单字节字符如字母、数字、半角符号
                            l += schar.match(/[^\x00-\xff]/) ? 2 : 1;
                            if (l > 20) {
                                // 只有原字符串内容长度大于需要换行的长度临界点，才需要换行
                                str += (sStr.length > str.length) ? '\n' : '';
                                l = 0;
                            }
                        }
                        return str;
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
                        symbolSize:3,
                        data: umap[item].value,
                    }
                }),
                color: props.colors
            };
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 option 发生改变的时候，不需要
            // 重新创建图表，而是复用该图表实例，提升性能
            const renderedInstance = echarts.getInstanceByDom(chartRef.current);
            if (renderedInstance) {
                chartInstance = renderedInstance;
            } else {
                chartInstance = echarts.init(chartRef.current,null,{locale: 'EN',renderer:"svg"});
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
        <div ref={chartRef} style={{height:450,width:550,marginBottom:10}}></div>
    )
}