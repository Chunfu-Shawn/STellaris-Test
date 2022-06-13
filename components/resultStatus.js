export default function ResultStatus(props){
    return(
            <div className="panel panel-default" style={{width: "60vh"}}>
                <div className="panel-heading">Job Title: {props.data.title}</div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Request ID</th>
                        <th>{props.data.rid}</th>
                    </tr>
                    <tr>
                        <th>Status</th>
                        <th>Finished!</th>
                    </tr>
                    <tr>
                        <td>Submission Time</td>
                        <td>{props.data.uploadtime}</td>
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