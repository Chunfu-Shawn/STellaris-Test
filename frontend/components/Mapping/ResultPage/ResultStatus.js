import {CheckCircleOutlined} from "@ant-design/icons";
import {Tag} from "antd";
import {calTime} from "../../util.js";
import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function ResultStatus(props){
    const annContext = useContext(AnnContext);

    return(
            <div className="panel panel-default" style={props.style}>
                <div className="panel-heading"><b>Job Title: &nbsp;&nbsp;&nbsp;&nbsp;{annContext.reqInfo.title}</b></div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Job ID</th>
                        <th>{annContext.reqInfo.rid}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th>
                            <Tag icon={<CheckCircleOutlined />} color="success">Finished</Tag>
                        </th>
                    </tr>
                    <tr>
                        <td style={{width:"30%"}}>Start Time</td>
                        <td>{annContext.reqInfo.ann_start_time}</td>
                    </tr>
                    <tr>
                        <td>End Time</td>
                        <td>{annContext.reqInfo.ann_finish_time}</td>
                    </tr>
                    <tr>
                        <td>Run Time</td>
                        <td>{calTime(annContext.reqInfo.ann_finish_time,annContext.reqInfo.ann_start_time)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
    )
}