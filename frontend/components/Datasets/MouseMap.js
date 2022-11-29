import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
import {showData} from "./getData&Options";
//引入jquery
import $ from 'jquery';

export default function MouseMap(props){
    const chartRef = useRef(null);
    useEffect(() => {
        let ROOT_PATH =
            '/api/mouse-map';
        let myChart = echarts.init(chartRef.current);
        let option;
        $.get(
            ROOT_PATH,
            function (svg) {
                echarts.registerMap('organ_diagram', { svg: svg });
                option = {
                    tooltip: {},
                    color:'#40a9ff',
                    textStyle: {
                        color: '#ffffff',
                    },
                    geo: {
                        left: 10,
                        right: '50%',
                        map: 'organ_diagram',
                        selectedMode: 'multiple',
                        emphasis: {
                            focus: 'self',
                            itemStyle: {
                                color: null
                            },
                            label: {
                                position: 'bottom',
                                distance: 0,
                                color:'#fff',
                                textBorderWidth: 2
                            }
                        },
                        blur: {}
                    },
                    grid: {
                        left: 320,
                        top: 70,
                        bottom: 50,
                        right: 10
                    },
                    legend: {
                        data: ['Dateset', 'Section'],
                        textStyle: {
                            color: "#ffffff"
                        }
                    },
                    xAxis: [
                        {
                            type: 'value',
                            name: "Section",
                            nameLocation: "center",
                            nameTextStyle:{
                                fontSize:15,
                                padding:[20,0]
                            }
                        },
                        {
                            type: 'value',
                            name:"Dataset",
                            nameLocation: "center",
                            nameTextStyle:{
                                fontSize:15,
                                padding:[20,0]
                            }
                        },
                    ],
                    yAxis: {
                        data: Object.keys(showData["Mouse"])
                    },
                    series: [
                        {
                            name:"Dateset",
                            type: 'bar',
                            xAxisIndex:1,
                            color:'#0d64a9',
                            emphasis: {
                                focus: 'self'
                            },
                            data: Object.values(showData["Mouse"])
                        },
                        {
                            name:"Section",
                            type: 'bar',
                            xAxisIndex:0,
                            emphasis: {
                                focus: 'self'
                            },
                            data: Object.values(showData["Mouse"]).map(val=>val+20)
                        },
                    ]
                };
                option&&myChart.setOption(option);
                myChart.on('mouseover', { seriesIndex: 0 }, function (event) {
                    myChart.dispatchAction({
                        type: 'highlight',
                        geoIndex: 0,
                        name: event.name
                    });
                });
                myChart.on('mouseout', { seriesIndex: 0 }, function (event) {
                    myChart.dispatchAction({
                        type: 'downplay',
                        geoIndex: 0,
                        name: event.name
                    });
                });
                myChart.on('mouseover', { seriesIndex: 1 }, function (event) {
                    myChart.dispatchAction({
                        type: 'highlight',
                        geoIndex: 0,
                        name: event.name
                    });
                });
                myChart.on('mouseout', { seriesIndex: 1 }, function (event) {
                    myChart.dispatchAction({
                        type: 'downplay',
                        geoIndex: 0,
                        name: event.name
                    });
                });
            }
        );
    }, []);
    return (
        <div>
            <h4 style={{color:"white"}}>Mouse Archive</h4>
            <div ref={chartRef} style={{height:"500px"}}></div>
        </div>
    )
}