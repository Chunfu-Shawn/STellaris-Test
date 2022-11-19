import React,{useContext, useState} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";
import {Divider, Modal, Steps} from "antd";
import SectionTable from "./SectionTable";
import ScoreBarGraph from "./ScoreBarGraph";
const {Step} = Steps;

export default function SelectTableModule(props){
    const [open, setOpen] = useState(false);
    const [usedTime, setUsedTime] = useState(" ");
    const [nowTime, setNowTime] = useState(Date.parse(props.time));
    const annContext = useContext(AnnContext);

    return(
        <div className="modal-body-stw" >
            <Steps current={2} size={"default"}>
                <Step title="Upload Data" description={"Upload scRNA-seq data and select sample source"} />
                <Step title="ST Screening" description={"Screen reference ST sections by MIA"}/>
                <Step title="Select a Section" description={"Select a matched section to annatate user's scRNA-seq"} />
                <Step title="Annotating" description={"Annotate scRNA-seq spatial location by selected ST data"} />
                <Step title="Annotation Result" description={"scRNA-seq Annotation Result"} />
            </Steps>
            <Divider/>
            <h2>Screening Results</h2>
            <Modal
                title="Continue to Annotate"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={600}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
            <ScoreBarGraph MIA={annContext.MIA}/>
            <SectionTable MIA={annContext.MIA} setOpen={setOpen}/>
        </div>
    )
}