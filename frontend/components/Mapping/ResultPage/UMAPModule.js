import {Col, Row} from "antd";
import UMAPScatter from "./UMAPScatter";
import React, {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
import * as d3 from "d3-scale-chromatic";

export default function UMAPModule(){
    const annContext = useContext(AnnContext);
    const umapPrep = JSON.parse(annContext.result.umapPrep)
    const umapFilter = JSON.parse(annContext.result.umapFilter)
    const length = Math.max(Object.keys(umapPrep).length, Object.keys(umapFilter).length)
    const colors = ["darkgray"].concat(
        [...Array(length).keys()].map( (item,index) => d3.interpolateRainbow(
            index/length
        )))
    return(
        <Row justify={"space-evenly"} align={"top"}>
            <Col>
                <UMAPScatter data={JSON.parse(annContext.result.umapPrep)}
                             title={"Coembedding of reference ST and submitted scRNA-seq data"}
                             colors={colors}
                />
            </Col>
            <Col>
                <UMAPScatter data={JSON.parse(annContext.result.umapFilter)}
                             title={"Coembedding of reference ST and filtered scRNA-seq data"}
                             colors={colors}
                />
            </Col>
        </Row>
    )
}