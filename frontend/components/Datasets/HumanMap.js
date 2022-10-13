import * as echarts from 'echarts';
import {useEffect, useRef} from "react";
//引入jquery
import $ from 'jquery';
const showData = {
    //"Spinal Cord": 2,
    "Bone": 6,
    "Breast": 1,
    "Heart": 3,
    //"Testis": 1,
    "Uterus": 2,
    "Colon": 3,
    "Prostate": 2,
    "Kidney": 1,
    "Liver": 5,
    "Adipose Tissue": 1,
    "Brain": 1,
    "Lung": 2,
    "Embryo": 1
}

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
            <h4 style={{color:"white"}}>Human Archive</h4>
            <div ref={chartRef} style={{height:"500px"}}></div>
        </div>
    )
}