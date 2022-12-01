import {Steps} from "antd";
import React from "react";
import {useContext} from "react";
import {AnnContext} from "../../pages/mapping/resultPage/[rid]";
import {downloadFile} from "../util";

export default function MappingSteps(props){
    const annContext = useContext(AnnContext);
    const handleClick = () => {
        downloadFile(`/api/submitted-files/counts/${annContext.reqInfo.rid}`)
        downloadFile(`/api/submitted-files/labels/${annContext.reqInfo.rid}`);
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
            description: "Select a matched section to map user's scRNA-seq"
        },
        {
            title: "Mapping",
            description: "Annotate scRNA-seq spatial location by selected ST data"
        },
        {
            title: "Mapping Result",
            description: "scRNA-seq Mapping Result"
        }]
    return(
        <Steps current={props.current} size={"default"} items={items}/>
    )
}