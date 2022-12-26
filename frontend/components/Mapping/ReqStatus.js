import {Tag} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {AnnContext} from "../../pages/mapping/resultPage/[rid]";
import {useEffect, useState} from "react";
import {calTime} from "../util";

export default function ReqStatus(props){
    const annContext = useContext(AnnContext);
    let startTime
    const [nowTime, setNowTime] = useState(Date.parse(annContext.serverTime));
    const fetchTime = async () => {
        fetch("/api/server-time")
            .then(res => res.json())
            .then(json => setNowTime(Date.parse(json.serverTime)))
    }
    useEffect(()=>{
        const timer = setInterval(async () => await fetchTime(), 1000);
        return () => clearInterval(timer);
    },[])

    if( props.type === "screening"){
        startTime = annContext.reqInfo.upload_time
    }else startTime = annContext.reqInfo.ann_start_time

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
                        <td>{calTime(new Date(nowTime).toISOString(), startTime)}</td>
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