import {Tag} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";

export default function ScreenStatus(props){
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
                        <td>Submission Time</td>
                        <td>{annContext.reqInfo.upload_time}</td>
                    </tr>
                    <tr>
                        <td>Run Time</td>
                        <td>{props.usedTime}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
    )
}