import {Divider} from "antd";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";
import AttributeLayout from "../../GenePage/AttributeLayout";
import Link from "next/link.js";

export default function Sample(props){

    return(
        <div name={"Sample"} >
            <a id={"Sample"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                <span style={{fontSize:22}}>Sample </span>
                <Link href={'/help/manual/datasets#data_page_attributes'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <AttributeLayout attribute={"Species"}>{props.data.species}</AttributeLayout>
            <AttributeLayout attribute={"Strain"}>{props.data.strain!==null?props.data.strain:"--"}</AttributeLayout>
            <AttributeLayout attribute={"Pathological"}>{props.data.pathological}</AttributeLayout>
            <AttributeLayout attribute={"Developmental Stage"}>
                {props.data.developmental_stage!==null?props.data.developmental_stage:"--"}
            </AttributeLayout>
            <AttributeLayout attribute={"Organ"}>{props.data.organ}</AttributeLayout>
            <AttributeLayout attribute={"Tissue"}>{props.data.tissue}</AttributeLayout>
            <AttributeLayout attribute={"Note"}>{props.data.note!==null?props.data.note:"--"}</AttributeLayout>
        </div>
    )
}