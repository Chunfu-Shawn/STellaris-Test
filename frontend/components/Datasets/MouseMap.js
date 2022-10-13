import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
//引入jquery
import $ from 'jquery';
const showData = {
    "Brain": 25,
    "Heart": 9,
    "Embryo": 4,
    //"Prostate": 1,
    "Testis": 2,
    "Hindlimb": 3,
    "Aorta": 1,
    "Kidney": 9,
    "Liver": 6,
    "Colon": 3,
    //"Uterus": 2,
    //"Urinary Bladder": 1,
    //"Bone": 2,
    //"Lung": 4,
    "Ileum": 4,
    "Skeletal Muscle": 2
}

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
                                textBorderWidth: 5
                            }
                        },
                        blur: {},
                    },
                    grid: {
                        left: '60%',
                        top: '20%',
                        bottom: '20%'
                    },
                    xAxis: {
                    },
                    yAxis: {
                        data: Object.keys(showData)
                    },
                    series: [
                        {
                            type: 'bar',
                            emphasis: {
                                focus: 'self'
                            },
                            data: Object.values(showData)
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
            <h4 style={{color:"white"}}>Mouse Archive</h4>
            <div ref={chartRef} style={{height:"500px"}}></div>
        </div>
    )
}