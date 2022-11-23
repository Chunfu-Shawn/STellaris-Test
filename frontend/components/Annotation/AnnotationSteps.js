import {Steps} from "antd";
import React from "react";
import {useContext} from "react";
import {AnnContext} from "../../pages/annotation/resultPage/[rid]";

export default function AnnotationSteps(props){
    const annContext = useContext(AnnContext);
    const handleClick = () => {
        window.open(`/api/submitted-files/counts/${annContext.reqInfo.rid}`, '');
        window.open(`/api/submitted-files/labels/${annContext.reqInfo.rid}`, '');
    }
    const items = [
        {
            title: "Upload Data",
            description: <><p>Upload scRNA-seq data</p>
                <a onClick={handleClick}>Download Files</a></>,
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
        <Steps current={props.current} size={"default"} items={items}/>
    )
}