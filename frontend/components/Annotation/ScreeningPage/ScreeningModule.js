import ReqStatus from "../ReqStatus.js";
import {useEffect, useState} from "react";
import {calTime} from "../../util";
import {useContext} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";
import {Divider, Result, Steps, Typography} from "antd";
import {SelectOutlined} from "@ant-design/icons";
const { Paragraph, Text } = Typography;
const {Step} = Steps;

export default function ScreeningModule(props){
    const [usedTime, setUsedTime] = useState(" ");
    const [nowTime, setNowTime] = useState(Date.parse(props.time));
    const annContext = useContext(AnnContext);
    useEffect(() => {
        const timer = setInterval(() => {
            console.log(nowTime)
            setNowTime(nowTime +1000)
            setUsedTime(calTime(new Date(nowTime).toISOString(),annContext.reqInfo.upload_time));
        }, 1000);
        return () => clearInterval(timer);
    });

    return(
        <div className="modal-body-stw" >
            <Steps current={1} size={"default"}>
                <Step title="Upload Data" description={"Upload scRNA-seq data and select sample source"} />
                <Step title="ST Screening" description={"Screen reference ST sections by MIA"}/>
                <Step title="Select a Section" description={"Select a matched section to annatate user's scRNA-seq"} />
                <Step title="Annotating" description={"Annotate scRNA-seq spatial location by selected ST data"} />
                <Step title="Annotation Result" description={"scRNA-seq Annotation Result"} />
            </Steps>
            <Divider/>
            <h2>Screening Start</h2>
            <ReqStatus style={{width: 600,margin:"50px auto"}}
                       usedTime={usedTime}
            />
        </div>
    )
}