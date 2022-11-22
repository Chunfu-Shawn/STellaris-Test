import ReqStatus from "./ReqStatus.js";
import AnnotationSteps from "./AnnotationSteps";
import React from "react";

export default function WaitModule(){

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h3>Request Status</h3>
            </div>
            <AnnotationSteps current={3}/>
            <h2>Annotation Start Successfully</h2>
            <ReqStatus style={{width: 600, margin:"50px auto"}}
                       type={"annotating"}
            />
        </div>
    )
}