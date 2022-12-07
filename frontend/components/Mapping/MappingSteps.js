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
            title: "Section Blast",
            description: <span>Screen reference ST sections by MIA <b>(about 2 min)</b></span>
        },
        {
            title: "Select a Section",
            description: "Select a matched section to map user's scRNA-seq"
        },
        {
            title: "Spatial Mapping",
            description: <span>Map single cells to spatial context of selected ST section <b>(about 30 min)</b></span>
        },
        {
            title: "Mapping Results",
            description: "View mapping results and spatially resolved cell-cell interactions"
        }]
    return(
        <Steps current={props.current} size={"default"} items={items}/>
    )
}