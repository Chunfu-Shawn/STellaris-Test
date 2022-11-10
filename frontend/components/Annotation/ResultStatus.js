import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Tag} from "antd";

export default function ResultStatus(props){
    return(
            <div className="panel panel-default" style={props.style}>
                <div className="panel-heading"><b>Project Title: &nbsp;&nbsp;&nbsp;&nbsp;{props.data.title}</b></div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Request ID</th>
                        <th>{props.data.rid}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th>{
                            props.data.status === "finished"?
                            <Tag icon={<CheckCircleOutlined />} color="success">Finished</Tag>:
                            <Tag icon={<CloseCircleOutlined />} color="error">Error</Tag>
                        }</th>
                    </tr>
                    <tr>
                        <td>Submission Time</td>
                        <td>{props.data.upload_time}</td>
                    </tr>
                    <tr>
                        <td>Finish Time</td>
                        <td>{props.data.finish_time}</td>
                    </tr>
                    <tr>
                        <td>Time Consumption</td>
                        <td>{props.usedTime}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
    )
}