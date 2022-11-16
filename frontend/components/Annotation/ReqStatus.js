import {Tag} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";

export default function ReqStatus(props){
    const annContext = useContext(AnnContext);
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
                        <th><Tag icon={<SyncOutlined spin />} color="processing">Running</Tag></th>
                    </tr>
                    <tr>
                        <td>Submission Time</td>
                        <td>{annContext.reqInfo.upload_time}</td>
                    </tr>
                    <tr>
                        <td>Time since submission</td>
                        <td>{props.usedTime}</td>
                    </tr>
                    <tr>
                        <td>The URL of result will be delivered to </td>
                        <td>{annContext.reqInfo.email === "undefined"? "no email address" : annContext.reqInfo.email}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="panel-body">
                    <p>This page will be automatically updated in 1 second until job is done;<br/>
                        The time for annotation will be long, <b>so we recommend you to save this URL ( has already been
                            sent to your E-mail if you provide E-mail address)</b>, where you can arrive the page of annotation result when analysis over.

                    </p>
                </div>
            </div>
    )
}