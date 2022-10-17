import ReqStatus from "./reqStatus.js";
import {useEffect, useState} from "react";

export function calTime(nowtime,etime){
    let usedTime = Date.parse(nowtime) - Date.parse(etime)
    // 计算相差小时数
    let hours=Math.floor(usedTime/(3600*1000))
    //计算相差分钟数
    let leave1=usedTime%(3600*1000);        //计算小时数后剩余的毫秒数
    let minutes=Math.floor(leave1/(60*1000));
    //计算相差秒数
    let leave2=leave1%(60*1000);      //计算分钟数后剩余的毫秒数
    let seconds=Math.round(leave2/1000);
    return hours + "h " + minutes + "m " + seconds + "s"
}

export default function WaitModule(props){
    const [usedTime, setUsedTime] = useState(" ");
    useEffect(() => {
        const timer = setInterval(() => {
            let nowtime = Date.parse(props.time)
            nowtime += 1000
            setUsedTime(calTime(nowtime.toISOString(),props.data.upload_time));
        }, 1000);
        return () => clearInterval(timer);
    });

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h1>Request Status</h1>
            </div>
            <h3>File submitted successfully!</h3>
            <ReqStatus data={props.data}
                       style={{width: 600}}
                       usedTime={usedTime}
            />
        </div>
    )
}