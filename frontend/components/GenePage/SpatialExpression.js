import {Divider} from "antd";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React  from "react";
import CoExpressedGenes from "./CoExpressedGenes";
import RegionSpecificExpression from "./RegionSpecificExpression";
import dynamic from "next/dynamic";
import HighlyExpressionClusters from "./HighlyExpressionClusters";

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
                <b>Spatial Expression </b>
                <Link href={'/help/manual/browser'}><a target={"_blank"}><QuestionCircleOutlined/></a></Link>
            </Divider>
            <RegionSpecificExpression />
            <CoExpressedGenes />
            <HighlyExpressionClusters/>
        </>
    )
}