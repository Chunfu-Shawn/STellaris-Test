import ReqStatus from "./ReqStatus.js";
import AnnotationSteps from "./AnnotationSteps";
import React from "react";
import {Divider} from "antd";

export default function WaitModule(){

    return(
        <div className="modal-body-stw" >
            <AnnotationSteps current={3}/>
            <Divider/>
            <h2>Annotation Start Successfully</h2>
            <ReqStatus style={{width: 600, margin:"50px auto"}}
                       type={"annotating"}
            />
        </div>
    )
}