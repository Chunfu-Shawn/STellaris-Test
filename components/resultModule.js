import ResultStatus from "./resultStatus";
import {calTime} from "./waitModule";


export default function ResultModule(props){

    return(
        <div className="modal-body" >
            <div className="page-header">
                <h1>Request Result</h1>
            </div>
            <ResultStatus data={props.data}
                       usedTime={calTime(props.data.finishtime,props.data.uploadtime)}
            />
        </div>
    )
}