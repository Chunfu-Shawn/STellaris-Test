
function calTime(etime){
    let nowtime = Date.now()
    let usedTime = nowtime - Date.parse(etime)
    // 计算相差小时数
    let hours=Math.floor(usedTime/(3600*1000))
    //计算相差分钟数
    let leave1=usedTime%(3600*1000);        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave1/(60*1000));
    //计算相差秒数
    let leave2=leave1%(60*1000);      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave2/1000);
    return hours + " h " + minutes + " m " + seconds + " s"
}

export default function Wait(props){
    return(
        <div className="modal-body" >
            <div className="page-header">
                <h1>Request Status</h1>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Job Title: {props.info.title}</div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Request ID</th>
                        <th>{props.info.rid}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th>Running...</th>
                    </tr>
                    <tr>
                        <td>Submission Time</td>
                        <td>{props.info.time}</td>
                    </tr>
                    <tr>
                        <td>Time since submission</td>
                        <td>{calTime(props.info.time)}</td>
                    </tr>
                    <tr>
                        <td>The URL of result will be delivered to </td>
                        <td>{props.info.email}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="panel-body">
                    <p>This page will be automatically updated in 1 second until search is done;<br/>
                        The time for annotation will be long, <b>so we recommend you to keep this URL (has already been
                            sent to your E-mail address)</b>, where you can arrive the page of annotation result when analysis over.

                    </p>
                </div>
            </div>
        </div>
    )
}