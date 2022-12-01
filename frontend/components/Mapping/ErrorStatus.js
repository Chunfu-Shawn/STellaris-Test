import {CloseCircleOutlined} from "@ant-design/icons";
import {Tag} from "antd";
import {useContext} from "react";
import {AnnContext} from "../../pages/mapping/resultPage/[rid]";

export default function ErrorStatus(props){
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
                        <Tag icon={<CloseCircleOutlined />} color="error">Error</Tag>
                    </th>
                </tr>
                <tr>
                    <td style={{width:"30%"}}>Submission Time</td>
                    <td>{annContext.reqInfo.upload_time}</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}