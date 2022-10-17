import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

export default function GeneExpressionBarChart(){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    //柱状图点击事件

    // 指定图表的配置项和数据
    let categoryData = []; //X轴数据
    let errorData = []; //错误的数据
    let barData = []; // 柱状图数据
    let dataCount = 20; //数据数量
    for(let i = 0; i < dataCount; i++) {
        let val = Math.random() * 20; // random() 方法可返回介于 0 ~ 1 之间的一个随机数。
        let error = Math.random() * 5 // 获得standard error
        categoryData.push(i);
        errorData.push([
            i,
            echarts.number.round(Math.max(0, val - error)), // error bar 的上值
            echarts.number.round(val + error) // error bar 的下值
        ]);
        barData.push(echarts.number.round(val, 2));
    }

    /*
        params：包含了当前数据信息和坐标系的信息。
        api：是一些开发者可调用的方法集合。
        api.value(...)，意思是取出 dataItem 中的数值。例如 api.value(0) 表示取出当前 dataItem 中第一个维度的数值。
        api.coord(...)，意思是进行坐标转换计算。例如 var point = api.coord([api.value(0), api.value(1)]) 表示 dataItem 中的数值转换成坐标系上的点。
        api.size(...) 函数，表示得到坐标系上一段数值范围对应的长度。
        shape 属性描述了这个矩形的像素位置和大小。
    */

    function renderItem(params, api) {
        let xValue = api.value(0); //api.value(0) 表示取出当前 dataItem 中第一个维度的数值。
        let highPoint = api.coord([xValue, api.value(1)]); //高点
        let lowPoint = api.coord([xValue, api.value(2)]); //低点
        let halfWidth = api.size([1, 0])[0] * 0.1; //半宽度
        let style = api.style({
            stroke: api.visual('color'),
            fill: null
        });

        return {
            type: 'group',
            children: [
                {
                    type: 'line',
                    shape: {
                        x1: highPoint[0] - halfWidth,
                        y1: highPoint[1],
                        x2: highPoint[0] + halfWidth,
                        y2: highPoint[1]
                    },
                    style: style
                },
                {
                    type: 'line',
                    shape: {
                        x1: highPoint[0],
                        y1: highPoint[1],
                        x2: lowPoint[0],
                        y2: lowPoint[1]
                    },
                    style: style
                },
                {
                    type: 'line',
                    shape: {
                        x1: lowPoint[0] - halfWidth,
                        y1: lowPoint[1],
                        x2: lowPoint[0] + halfWidth,
                        y2: lowPoint[1]
                    },
                    style: style
                }
            ]
        };
    }
        // 定义渲染函数
    function renderChart() {
        try {
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        show: true,
                        type: 'shadow'
                    },
                    formatter: (param) => `<b>${param[0].name}</b>
                        <br/><b>${param[0].seriesName}</b>: ${param[0].value.toFixed(3)} ± ${(param[1].value[2]-param[0].value).toFixed(3)}
                        <br/><b>Number of samples</b>: `
                },
                grid: {
                    top: 10,
                    left: 50,
                    right: 10,
                    bottom: 40,
                    containLabel: true
                },
                xAxis: {
                    name:'Organ/Tissue',
                    nameLocation:'center',
                    nameTextStyle:{
                        fontSize:15,// 字体大小
                        fontWeight: 800, // 字体粗细
                        color: "#000000",// 字体颜色
                        padding: [20, 0, 0, 0], // 可以调整标题距离坐标轴的距离 [上，右，下，左]
                    },
                    data: categoryData,
                },
                yAxis: {
                    name:'Reads Count',
                    nameLocation:'center',
                    nameTextStyle:{
                        fontSize:15,// 字体大小
                        fontWeight: 800, // 字体粗细
                        color: "#000000",// 字体颜色
                        padding: [0, 0, 30, 0], // 可以调整标题距离坐标轴的距离 [上，右，下，左]
                    },
                    axisLabel:{
                        show: true
                    }
                },
                series: [
                    {
                        type: 'bar',
                        name: 'Mean Reads Count',
                        data: barData,
                        itemStyle: {
                            normal: {
                                color: '#91c5ef'
                            }
                        }
                    },
                    // error bar
                    {
                        type: 'custom',
                        name: 'Standard Error',
                        itemStyle: {
                            normal: {
                                borderWidth: 1.5
                            }
                        },
                        renderItem: renderItem,
                        encode: { //可以定义 data 的哪个维度被编码成什么
                            x: 0,// data 中『维度0』对应到 X 轴
                            y: [1, 2] // data 中『维度1』和『维度2』对应到 Y轴
                        },
                        data: errorData,
                        z: 100
                    }
                ]
            };
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
        renderChart();
        return () => {
        // 销毁图表实例，释放内存
        chartInstance && chartInstance.dispose();
        };
    });

        return(
            <div ref={chartRef} style={{height:400,marginBottom:10}}></div>
        )
}