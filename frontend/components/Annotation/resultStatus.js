export default function ResultStatus(props){
    return(
            <div className="panel panel-default" style={props.style}>
                <div className="panel-heading"><b>Job Title: {props.data.title}</b></div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Request ID</th>
                        <th>{props.data.rid}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th>{props.data.status}</th>
                    </tr>
                    <tr>
                        <td>Submission Time</td>
                        <td>{props.data.uploadtime}</td>
                    </tr>
                    <tr>
                        <td>Finish Time</td>
                        <td>{props.data.finishtime}</td>
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