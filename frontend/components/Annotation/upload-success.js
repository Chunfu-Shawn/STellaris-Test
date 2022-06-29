import Link from "next/link";

export default function UploadSuccess(props){
    return(
        <div className="modal-body-stw" style={{height: "85vh",textAlign:"center"}}>
            <div className="page-header">
                <h2>Spatial Annotation</h2>
            </div>
            <div className="panel-info">
                <h3>File submitted successfully!</h3>
                <div className="panel panel-default" style={{width:"70vh"}}>
                    <table className="table">
                        <tbody>
                        <tr>
                            <th>Request ID: </th>
                            <th>{props.rid}</th>
                        </tr>
                        <tr>
                            <td>Submission Time: </td>
                            <td>{props.time}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <span style={{fontSize: "17px"}}>Annootation results will display at: </span><br/>
                <span style={{fontSize: "17px"}}>
                    <Link href={`/annotations/results?rid=${props.rid}`} as={`/annotations/results/${props.rid}`}>
                    <a>https://localhost:3000/annotations/results/{props.rid}</a>
                    </Link>.
                </span>
                <p>
                    This URL has already been sent to your E-mail address ( {props.email} ).
                </p>
            </div>
        </div>
    )
}