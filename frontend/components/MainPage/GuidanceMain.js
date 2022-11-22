import { Steps } from 'antd';
import React from 'react';
import {SolutionOutlined, UpCircleOutlined, SelectOutlined, CheckCircleOutlined, SearchOutlined} from "@ant-design/icons";
import Link from "next/link";
const { Step } = Steps;

export default function GuidanceMain(){
    const itemsGene = [
        {
            title: "Search Gene",
            description: "You can Select Gene Symbol, Ensembl ID or Entrez ID and input gene id to search for spatially" +
                " resolved expression profile of interested gene.",
            icon: <SearchOutlined />
        }
    ]
    const items = [
        {
            title: "Spatial Annotation",
            description: 'First please fill in the form with "Job Title" and "Email Address" (optional).',
            icon: <SearchOutlined/>
        },
        {
            title: "Select Matched Species, Organ & Tissue",
            description: "Please select the correct species, organs and tissues to match your scRNA-seq data.",
            icon: <SolutionOutlined />
        },
        {
            title: "Select scRNA-seq Data",
            description: "Please upload scRNA-seq data including matrix file and labels file, which are compressed.",
            icon: <SelectOutlined />
        },
        {
            title: "Upload and Wait",
            description: 'Click on the "Start Upload" bottom and wait to redirect a running page. ' +
                'There will be some steps to annotate your data. Please wait for a finished page about your job.',
            icon: <CheckCircleOutlined />
        }]
    return(
        <>
            <Steps className={"mainGuidance"} direction="vertical" size="default" current={1} items={itemsGene}/>
            <Steps className={"mainGuidance"} direction="vertical" size="default" current={4} items={items}/>
            <br/>
            <div style={{color:"#efefef",textAlign:"left",font:"bold 18px"}}>
                CLICK ON <a style={{color:"#7653de",fontSize:16}} href={'/help/example/annotation'}> &quot; Help / Example Usage &quot; </a> TO GET MORE INFORMATION FOR HELP.
            </div>
        </>

    )
}