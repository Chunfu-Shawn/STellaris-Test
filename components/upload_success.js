const job_title = "xxx"
const queryID = "xxx"
const email = "xxx@qq.com"

export default function UploadSuccess(){
    return(
        <div className="modal-body" >
            <div className="page-header">
                <h1>Spatial Annotation Request</h1>
            </div>
            <div className="panel panel-default">
                <div className="panel-heading">Job Title: {job_title}</div>
                <div className="panel-body">
                    <p>This page will be automatically updated in 1 second until search is done;<br/>
                        The time for annotation will be long, so we recommend you to keep the Request ID, by which
                        you can search for he annotation result in your free time after the end of process.
                    </p>
                </div>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Request ID</th>
                        <th>{queryID}</th>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td>annotating</td>
                    </tr>
                    <tr>
                        <td>Submiited at</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>Time since submission</td>
                        <td>sss</td>
                    </tr>
                    <tr>
                        <td>The URL of result will be delivered to </td>
                        <td>{email}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}