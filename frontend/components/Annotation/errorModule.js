import ResultStatus from "./resultStatus.js";
import {calTime} from "./waitModule.js";
import {Button, Col, Row, Statistic} from "antd";


export default function ErrorModule(props){

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h1>Annotation Result: </h1>
            </div>
            <h1>ERROR!</h1>
            <ResultStatus data={props.data} style={{width: "60vh"}}
                          usedTime={calTime(props.data.finishtime,props.data.uploadtime)}>
            </ResultStatus>
        </div>
    )
}