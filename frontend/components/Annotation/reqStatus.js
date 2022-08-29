export default function ReqStatus(props){
    return(
            <div className="panel panel-default" style={{width: "90vh"}}>
                <div className="panel-heading">Job Title: {props.data.title}</div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Request ID</th>
                        <th>{props.data.rid}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th>Running</th>
                    </tr>
                    <tr>
                        <td>Submission Time</td>
                        <td>{props.data.upload_time}</td>
                    </tr>
                    <tr>
                        <td>Time since submission</td>
                        <td>{props.usedTime}</td>
                    </tr>
                    <tr>
                        <td>The URL of result will be delivered to </td>
                        <td>{props.data.email}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="panel-body">
                    <p>This page will be automatically updated in 1 second until job is done;<br/>
                        The time for annotation will be long, <b>so we recommend you to keep this URL ( has already been
                            sent to your E-mail address )</b>, where you can arrive the page of annotation result when analysis over.

                    </p>
                </div>
            </div>
    )
}