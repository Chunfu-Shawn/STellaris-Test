import {useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
import {calTime} from "../../util";

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
                        <td>Start Time</td>
                        <td>{annContext.reqInfo.upload_time}</td>
                    </tr>
                    <tr>
                        <td>Run Time</td>
                        <td>{calTime(annContext.reqInfo.screen_finish_time,annContext.reqInfo.upload_time)}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
    )
}