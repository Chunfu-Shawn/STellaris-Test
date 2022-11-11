import ResultStatus from "./ResultStatus.js";
import {calTime} from "../util.js";


export default function ErrorModule(props){

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h3>Annotation Result</h3>
            </div>
            <h2>ERROR!</h2>
            <h4>There is something wrong happened in server or your data file is undesirable. Please upload again with correct format file.</h4>
            <ResultStatus data={props.data}
                          style={{width: 600, margin:"50px auto"}}
                          usedTime={calTime(props.data.finish_time,props.data.upload_time)}>
            </ResultStatus>
        </div>
    )
}