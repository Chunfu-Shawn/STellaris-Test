import {Col, Divider, Row, Space} from "antd";
import React from "react";
import {DynamicGeneExpress} from "./SpatialExpression";
import {firstUpperCase} from '../util'
import dataset from "../VisualTool/dataset.json";
import {useContext} from "react";
import {GeneContext} from "../../pages/browser/genePage/[gene_id]";
const dataset2 = {
    "id": "GSM5833739",
    "name": "GSM5833739",
    "url": "https://rhesusbase.com:9999/datasets/GSM5833739_10x_Visium_deal/GSM5833739_10x_Visium_deal.jsonl"
}

export default function RegionSpecificExpression(){
    const geneContext = useContext(GeneContext);

    return(
        <div name={"RSE"} style={{marginLeft:20}}>
            <a id={"RSE"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0"><b>Region Specific Expression</b></Divider>
            <Row style={{marginLeft:20}}>
                <Space>
                    <Col>
                        <h5>Brain: {dataset.id}</h5>
                        <DynamicGeneExpress
                            setCustom={true}
                            width={300}
                            height={300}
                            dataset={dataset}
                            gene={firstUpperCase(geneContext.data.symbol)}
                        />
                    </Col>
                    <Col>
                        <h5>Brain: {dataset2.id}</h5>
                        <DynamicGeneExpress
                            setCustom={true}
                            width={300}
                            height={300}
                            dataset={dataset2}
                            gene={firstUpperCase(geneContext.data.symbol)}
                        />
                    </Col>
                </Space>
            </Row>
        </div>
    )
}