import {Divider} from "antd";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";

export default function SpatialExpression(props){
    return(
        <>
            <Divider orientation="left" orientationMargin="0">
                <b>Spatial Expression </b>
                <Link href={'/help/manual/browser'}><a target={"_blank"}><QuestionCircleOutlined/></a></Link>
            </Divider>
            <div name={"RSE"} style={{marginLeft:"20px"}}>
                <a id={"RSE"} style={{position: 'relative', top: "-150px"}}></a>
                <Divider orientation="left" orientationMargin="0" dashed><b>Regional Specific Expression</b></Divider>
                <div style={{height:'20vh'}}>
                </div>
            </div>
            <div name={"CoE-Genes"} style={{marginLeft:"20px"}}>
                <a id={"CoE-Genes"} style={{position: 'relative', top: "-150px"}}></a>
                <Divider orientation="left" orientationMargin="0" dashed><b>Co-expressed Genes</b></Divider>
                <div style={{height:'20vh'}}>
                </div>
            </div>
            <div name={"HighlyE-Clusters"} style={{marginLeft:"20px"}}>
                <a id={"HighlyE-Clusters"} style={{position: 'relative', top: "-150px"}}></a>
                <Divider orientation="left" orientationMargin="0" dashed><b>Highly-expressed Clusters</b></Divider>
                <div style={{height:'20vh'}}>
                </div>
            </div>
        </>
    )
}