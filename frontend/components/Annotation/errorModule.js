import ResultStatus from "./resultStatus.js";
import {calTime} from "../util.js";


export default function ErrorModule(props){

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h1>Annotation Result</h1>
            </div>
            <h1>ERROR!</h1>
            <h4>There is something wrong happened in server or in your data file. Please upload again with correct format file.</h4>
            <ResultStatus data={props.data}
                          style={{width: 600}}
                          usedTime={calTime(props.data.finish_time,props.data.upload_time)}>
            </ResultStatus>
        </div>
    )
}