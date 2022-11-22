import {Tag} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";
import {useEffect, useState} from "react";
import {calTime} from "../util";

export default function ReqStatus(props){
    const annContext = useContext(AnnContext);
    const [usedTime, setUsedTime] = useState(" ");
    const [nowTime, setNowTime] = useState(Date.parse(annContext.serverTime));
    let startTime = new Date().toTimeString()

    if( props.type === "screening"){
        startTime = annContext.reqInfo.upload_time
    }else startTime = annContext.reqInfo.ann_start_time

    useEffect(() => {
        const timer = setInterval(() => {
            setNowTime(nowTime +1000)
            setUsedTime(calTime(new Date(nowTime).toISOString(), startTime))
        }, 1000);
        return () => clearInterval(timer);
    });
    return(
            <div className="panel panel-default" style={props.style}>
                <div className="panel-heading">Job Title: &nbsp;&nbsp;&nbsp;&nbsp;{annContext.reqInfo.title}</div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Job ID</th>
                        <th>{annContext.reqInfo.rid}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th><Tag icon={<SyncOutlined spin />} color="processing">{annContext.reqInfo.status}</Tag></th>
                    </tr>
                    <tr>
                        <td>Start Time</td>
                        <td>{startTime}</td>
                    </tr>
                    <tr>
                        <td>Run Time</td>
                        <td>{usedTime}</td>
                    </tr>
                    <tr>
                        <td>The URL of result will be delivered to </td>
                        <td>{annContext.reqInfo.email ? annContext.reqInfo.email: "no email address"}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="panel-body">
                    <p>This page will be automatically updated in 1 second until job is done;<br/>
                        The time for screening and annotation will be long, <b>so we recommend you to save this URL ( has already been
                            sent to your E-mail if you provide E-mail address)</b>, where you can arrive the page of annotation result when analysis over.

                    </p>
                </div>
            </div>
    )
}