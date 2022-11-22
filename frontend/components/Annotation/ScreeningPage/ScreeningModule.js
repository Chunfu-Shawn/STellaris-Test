import ReqStatus from "../ReqStatus.js";
import {Divider, Steps} from "antd";

export default function ScreeningModule(){
    const items = [
        {
            title: "Upload Data",
            description: "Upload scRNA-seq data and select sample source"
        },
        {
            title: "ST Screening",
            description: "Screen reference ST sections by MIA"
        },
        {
            title: "Select a Section",
            description: "Select a matched section to annatate user's scRNA-seq"
        },
        {
            title: "Annotating",
            description: "Annotate scRNA-seq spatial location by selected ST data"
        },
        {
            title: "Annotation Result",
            description: "scRNA-seq Annotation Result"
        }]

    return(
        <div className="modal-body-stw" >
            <Steps current={1} size={"default"} items={items}/>
            <Divider/>
            <h2>Screening Start</h2>
            <ReqStatus style={{width: 600,margin:"50px auto"}}
                       type={"screening"}
            />
        </div>
    )
}