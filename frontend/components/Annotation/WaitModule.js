import ReqStatus from "./ReqStatus.js";
import {useEffect, useState} from "react";
import {calTime} from "../util";
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";

export default function WaitModule(){

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h3>Request Status</h3>
            </div>
            <h2>Annotation Start Successfully</h2>
            <ReqStatus style={{width: 600, margin:"50px auto"}}
                       type={"annotating"}
            />
        </div>
    )
}