import { Steps } from 'antd';
import React from 'react';
import {SolutionOutlined, UpCircleOutlined, SelectOutlined, CheckCircleOutlined, ReloadOutlined} from "@ant-design/icons";
const { Step } = Steps;

export default function Guidance(){
    return(
        <Steps direction="vertical" size="default" current={5} >
            <Step title="Fill in Job Information"
                  description='Please fill in the form with "Job Title" describing your job main purpose,
                  and your "Email Address" to let us contact you conveniently.'
                  icon={<SolutionOutlined />}/>
            <Step title="Select Matched Organ and Tissue" description="Please select the correct type of organs and tissues to
            match your scRNA-seq data which will be uploaded."
                  icon={<SelectOutlined />}/>
            <Step title="Upload a Set of scRNA-seq Data" description="Please upload the standard data of scRNA-seq with matrix file,
            barcodes file and features file, which are compressed."
                  icon={<UpCircleOutlined />}/>
            <Step title='Start to Upload' description='Click on the "Start Upload" bottom and wait to redirect a running page
             meaning your successfully upload.'
                  icon={<CheckCircleOutlined />}/>
            <Step title="Waiting for Finish" description="Please wait for a finished page about your job. Annotation will cost few minutes."
                  icon={<ReloadOutlined />}/>
        </Steps>
    )
}