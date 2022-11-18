import ReqStatus from "./../ReqStatus.js";
import {useEffect, useState} from "react";
import {calTime} from "../../util";
import {useContext} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";
import {Divider, Result, Steps, Typography} from "antd";
import SectionTable from "./SectionTable";
import ScoreBarGraph from "./ScoreBarGraph";
const { Paragraph, Text } = Typography;
const {Step} = Steps;

export default function SelectTableModule(props){
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
            <SectionTable MIA={annContext.MIA}/>
            <ScoreBarGraph MIA={annContext.MIA}/>
        </div>
    )
}