import {Divider} from "antd";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React,{useEffect, useState} from "react";
import Gallery from "./Gallery";
import dynamic from "next/dynamic";
import SVExpressionTable from "./SVExpressionTable";

export const DynamicGeneExpress = dynamic(() =>
        import('../VisualTool/SingleGeneExpressionModule.js').then(
            (mod) => mod.SingleGeneExpressionModule),
    {
        ssr: false,
    })

export default function SpatialExpression(){

    return(
        <>
            <Divider orientation="left" orientationMargin="0">
                <b>Spatial Variable Gene Expression </b>
                <Link href={'/help/manual/search#svg'}><a target={"_blank"}><QuestionCircleOutlined/></a></Link>
            </Divider>
            <Gallery/>
            <SVExpressionTable/>
        </>
    )
}