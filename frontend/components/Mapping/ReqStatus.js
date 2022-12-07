import {Tag} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {AnnContext} from "../../pages/mapping/resultPage/[rid]";
import {useEffect, useState} from "react";
import {calTime} from "../util";

export default function ReqStatus(props){
    const annContext = useContext(AnnContext);
    const [usedTime, setUsedTime] = useState(" ");
    const [nowTime, setNowTime] = useState(Date.parse(annContext.serverTime)+2000);
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
                        <td>The URL of result page will be sent to </td>
                        <td>{annContext.reqInfo.email ? annContext.reqInfo.email: "no email address"}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="panel-body">
                    <p>
                        This page will be automatically updated every second until job is done. It may take a while, so
                        <b> we highly recommend you to save this URL </b>(already sent to your E-mail address if provided), where
                        you can view the results when job is over. Note that no mail will be sent if this is an example job.
                    </p>
                </div>
            </div>
    )
}