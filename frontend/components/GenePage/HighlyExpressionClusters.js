import {Col, Divider, Row, Space} from "antd";
import ProportionClustersBarChart from "./ProportionClustersBarChart";
import MarkerGenesList from "./MarkerGenesList";
import React from "react";

const series =
    [
        {
            name: 'cluster 1',
            data: [12, 32, 10, 14, 9, 23, 21]
        },
        {
            name: 'cluster 2',
            data: [18, 12, 79, 34, 29, 20, 0]
        },
        {
            name: 'cluster 3',
            data: [30, 26, 0, 30, 62, 34, 65]
        },
        {
            name: 'cluster 4',
            data: [40, 30, 11, 22, 0, 23, 14]
        }
    ]
const markergenes = [
    {
        cluster: "cluster1",
        genes: [
            'Racing',
            'Japanese',
            'Australian',
            'Racing',
            'Japanese',
            'Australian',
            'Man',
            'Los',
        ]
    },
    {
        cluster: "cluster2",
        genes: [
            'Racing',
            'Japanese',
            'Australian',
            'Man',
            'Los',
            'Japanese',
            'Australian',
            'Man',
            'Los',
        ]
    },
    {
        cluster: "cluster3",
        genes: [
            'Racing',
            'Japanese',
            'Australian',
            'Racing',
            'Japanese',
            'Australian',
            'Man',
            'Los',
        ]
    },
    {
        cluster: "cluster4",
        genes: [
            'Racing',
            'Japanese',
            'Australian',

        ]
    }
]

export default function HighlyExpressionClusters(){
    return(
        <div name={"HighlyE-Clusters"} style={{marginLeft:20}}>
            <a id={"HighlyE-Clusters"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0" ><b>Highly-expressed Clusters</b></Divider>
            <div style={{marginLeft:20}}>
                <Divider orientation="left" orientationMargin="10" dashed><small><b>Proportion of clusters</b></small></Divider>
                <ProportionClustersBarChart series={series}/>
            </div>
            <div style={{marginLeft:20}}>
                <Divider orientation="left" orientationMargin="10" dashed><small><b>Marker Genes</b></small></Divider>
                <Row style={{width:1000,margin:20}} justify={"center"}>
                    <Space size={"large"}>
                        {
                            markergenes.map( (item) =>
                                <Col span={24/markergenes.length} key={item.genes}>
                                    <MarkerGenesList genes={item.genes} cluster={item.cluster}/>
                                </Col>
                            )
                        }
                    </Space>
                </Row>
            </div>
        </div>
    )
}