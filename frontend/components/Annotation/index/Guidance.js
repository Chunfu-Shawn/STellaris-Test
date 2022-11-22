import { Steps } from 'antd';
import React from 'react';
import {SolutionOutlined, UpCircleOutlined, SelectOutlined, CheckCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import Link from "next/link";
const { Step } = Steps;

export default function Guidance(){
    const items = [
        {
            title: "Fill in Job Information",
            description: 'Please fill in the form with "Job Title" describing your job main purpose, ' +
                'and your "Email Address" to let us contact you conveniently.',
            icon: <SolutionOutlined />
        },
        {
            title: "Select Matched Species, Organ & Tissue",
            description: "Please select the correct type of organs and tissues to " +
                "match your scRNA-seq data which will be uploaded.",
            icon: <SelectOutlined />
        },
        {
            title: "Select scRNA-seq Data",
            description: "Please upload the standard data of scRNA-seq with matrix file, " +
                "barcodes file and features file, which are compressed.",
            icon: <UpCircleOutlined />
        },
        {
            title: "Start to Upload",
            description: 'Click on the "Start Upload" bottom and wait to redirect a running page ' +
                'meaning your successfully upload.',
            icon: <CheckCircleOutlined />
        },
        {
            title: "Waiting for Finish",
            description: "Please wait for a finished page about your job. Annotating will take a few minutes.",
            icon: <ReloadOutlined />
        }]

    return(
        <>
            <Steps direction="vertical" size="default" current={5} items={items}/><br/>
            <div style={{color:"#6e6e6e",textAlign:"left",font:"bold 18px"}}>
                CLICK ON <Link href={'/help/example/annotation'}> &quot; Help / Example Usage &quot; </Link> TO GET MORE INFORMATION FOR HELP.
            </div>
        </>

    )
}