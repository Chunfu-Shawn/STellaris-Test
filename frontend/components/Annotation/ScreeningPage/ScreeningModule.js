import ReqStatus from "../ReqStatus.js";
import {Divider} from "antd";
import AnnotationSteps from "../AnnotationSteps";
import React from "react";

export default function ScreeningModule(){

    return(
        <div className="modal-body-stw" >
            <AnnotationSteps current={1}/>
            <Divider/>
            <h2>Screening Start</h2>
            <ReqStatus style={{width: 600,margin:"50px auto"}}
                       type={"screening"}
            />
        </div>
    )
}