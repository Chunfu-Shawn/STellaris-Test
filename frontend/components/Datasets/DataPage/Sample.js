import {Divider} from "antd";
import {LinkOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";
import AttributeLayout from "../../GenePage/AttributeLayout";
import Link from "next/link.js";

export default function Sample(props){

    return(
        <div name={"Sample"} >
            <a id={"Sample"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                <span style={{fontSize:22}}>Sample </span>
                <Link href={'/help/manual/datasets#data_page_sample'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <AttributeLayout attribute={"Species"}>{props.data.Species}</AttributeLayout>
            <AttributeLayout attribute={"Strain"}>{props.data.Strain!=="null"?props.data.Strain:"--"}</AttributeLayout>
            <AttributeLayout attribute={"Pathological"}>{props.data.Pathological}</AttributeLayout>
            <AttributeLayout attribute={"Developmental Stage"}>
                {props.data.Developmental_stage!=="null"?props.data.Developmental_stage:"--"}
            </AttributeLayout>
            <AttributeLayout attribute={"Organ"}>{props.data.Organ}</AttributeLayout>
            <AttributeLayout attribute={"Tissue"}>{props.data.Tissue}</AttributeLayout>
        </div>
    )
}