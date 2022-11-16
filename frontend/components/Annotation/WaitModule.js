import ReqStatus from "./ReqStatus.js";
import {useEffect, useState} from "react";
import {calTime} from "../util";
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";

export default function WaitModule(props){
    const [usedTime, setUsedTime] = useState(" ");
    const [nowTime, setNowTime] = useState(Date.parse(props.time));
    const annContext = useContext(AnnContext);
    useEffect(() => {
        const timer = setInterval(() => {
            console.log(nowTime)
            setNowTime(nowTime +1000)
            setUsedTime(calTime(new Date(nowTime).toISOString(),annContext.reqInfo.upload_time));
        }, 1000);
        return () => clearInterval(timer);
    });

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h3>Request Status</h3>
            </div>
            <h2>Annotation Start Successfully</h2>
            <ReqStatus style={{width: 600}}
                       usedTime={usedTime}
            />
        </div>
    )
}