import { Steps } from 'antd';
import React from 'react';
import {
    SolutionOutlined,
    SelectOutlined,
    CheckCircleOutlined,
    ReloadOutlined,
    SearchOutlined
} from "@ant-design/icons";
import Link from "next/link";

export default function Guidance(){
    const items = [
        {
            title: "Basic Information",
            description: 'First, please enter a name of your job and provide an email address (optional) to receive ' +
                'the notification of project progress.',
            icon: <SearchOutlined/>
        },
        {
            title: "Select Matched Species, Organ & Tissue",
            description: "Please select the category of species, organ and tissue that your scRNA-seq data fits into.",
            icon: <SolutionOutlined />
        },
        {
            title: "Select scRNA-seq Data",
            description: "Please select your scRNA-seq data including a cell-by-gene raw count matrix file and a " +
                "label file with cell type annotation.",
            icon: <SelectOutlined />
        },
        {
            title: "Upload",
            description: "Click on the 'Upload' button and this will redirect you to a running page.",
            icon: <CheckCircleOutlined />
        },
        {
            title: "Wait to Finish",
            description: "It will takes about 2~3 min for section blast analysis, and then you can choose a proper " +
                "ST section for subsequent spatial mapping!",
            icon: <ReloadOutlined />
        }]

    return(
        <>
            <Steps direction="vertical" size="default" current={5} items={items}/><br/>
            <div style={{color:"#6e6e6e",textAlign:"left",font:"bold 18px"}}>
                CLICK ON <a style={{fontSize:16}} href={'/tutorial'}> &quot;Tutorial&quot; </a> FOR MORE INSTRUCTIONS!
            </div>
        </>

    )
}