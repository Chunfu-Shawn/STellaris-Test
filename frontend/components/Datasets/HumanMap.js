import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
import {showData} from "./getData&Options";
//引入jquery
import $ from 'jquery';

export default function HumanMap(props){
    const chartRef = useRef(null);
    useEffect(() => {
        let ROOT_PATH =
            '/api/human-map';
        let myChart = echarts.init(chartRef.current);
        let option;
        $.get(
            ROOT_PATH,
            function (svg) {
                echarts.registerMap('organ_diagram', { svg: svg });
                option = {
                    tooltip: {},
                    color:'#ffa940',
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
                        left: '60%',
                        top: '20%',
                        bottom: '20%'
                    },
                    xAxis: {
                        },
                    yAxis: {
                        data: Object.keys(showData["Human"])
                    },
                    series: [
                        {
                            type: 'bar',
                            emphasis: {
                                focus: 'self'
                            },
                            data: Object.values(showData["Human"])
                        }
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
            }
        );
    }, []);
    return (
        <div>
            <h4 style={{color:"white"}}>Human Archive</h4>
            <div ref={chartRef} style={{height:"500px"}}></div>
        </div>
    )
}