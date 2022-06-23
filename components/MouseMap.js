import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
//引入jquery
import $ from 'jquery';

export default function BodyMap(props){
    const chartRef = useRef(null);
    useEffect(() => {
        let ROOT_PATH =
            '/api/getMouseMap';
        let myChart = echarts.init(chartRef.current);
        let option;
        $.get(
            ROOT_PATH,
            function (svg) {
                echarts.registerMap('organ_diagram', { svg: svg });
                option = {
                    tooltip: {},
                    color:'#5b4fcc',
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
                                textBorderColor: '#fff',
                                textBorderWidth: 2
                            }
                        },
                        blur: {},
                        select: {
                            itemStyle: {
                                color: '#8c94f3'
                            },
                            label: {
                                show: false,
                                textBorderColor: '#fff',
                                textBorderWidth: 2
                            }
                        }
                    },
                    grid: {
                        left: '60%',
                        top: '20%',
                        bottom: '20%'
                    },
                    xAxis: {
                    },
                    yAxis: {
                        data: [
                            'heart',
                            'large-intestine',
                            'small-intestine',
                            'spleen',
                            'kidney',
                            'lung',
                            'liver'
                        ]
                    },
                    series: [
                        {
                            type: 'bar',
                            emphasis: {
                                focus: 'self'
                            },
                            data: [24, 35, 41, 50, 1, 9, 23]
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
        <div className={props.class+" text-center"}>
            <h4 style={{color:"white"}}>Mouse Spatial Transcriptome Datasets</h4>
            <div ref={chartRef} style={{height:"50vh"}}></div>
        </div>
    )
}