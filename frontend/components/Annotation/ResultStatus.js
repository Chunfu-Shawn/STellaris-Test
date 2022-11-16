import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Tag} from "antd";
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";

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
                        <th>{
                            annContext.reqInfo.status === "finished"?
                            <Tag icon={<CheckCircleOutlined />} color="success">Finished</Tag>:
                            <Tag icon={<CloseCircleOutlined />} color="error">Error</Tag>
                        }</th>
                    </tr>
                    <tr>
                        <td style={{width:"30%"}}>Submission Time</td>
                        <td>{annContext.reqInfo.upload_time}</td>
                    </tr>
                    <tr>
                        <td>Finish Time</td>
                        <td>{annContext.reqInfo.finish_time}</td>
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