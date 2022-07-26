import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

export default function BarChart(props){
    let option = {
        color:'rgba(54,0,135,0.15)',
        xAxis: {
            axisLine:{
                show:false,
            },
            axisTick:{
                show:false,
            },
            type: 'category',
        },
        yAxis: {
            show:false,
            type: 'value'
        },
        grid:{
            left:0,
            top:0,
            right: 0,
            bottom:0,
        },
        series: [
            {
                data: props.num["date_published"],
                type: 'bar',
                barCategoryGap:0
            }
        ]
    };
    // use echarts
    const chartRef = useRef(null);
    useEffect(()=>{
        let myChart = echarts.init(chartRef.current);
        option && myChart.setOption(option);
    })

    return(
        <div ref={chartRef} style={{height:50}}></div>
    )
}