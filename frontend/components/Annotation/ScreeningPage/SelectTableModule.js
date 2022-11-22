import React,{useContext} from "react";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";
import {Col, Divider, Row, Steps} from "antd";
import SectionTable from "./SectionTable";
import ScoreBarGraph from "./ScoreBarGraph";
import ScreenStatus from "../ScreeningPage/ScreenStatus";
import AttributeLayout from "../../GenePage/AttributeLayout";

export default function SelectTableModule(){
    const annContext = useContext(AnnContext);
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
            <Steps current={2} size={"default"} items={items}/>
            <Divider/>
            <Row justify="center" align="top" style={{marginTop:20,textAlign:"left"}}>
                <Col span={6} style={{margin: "30px 5px"}}>
                    <h2>Screening Results</h2>
                    <AttributeLayout attribute={"Species"}>{annContext.reqInfo.species}</AttributeLayout>
                    <AttributeLayout attribute={"Organ"}>{annContext.reqInfo.organ}</AttributeLayout>
                    <AttributeLayout attribute={"Tissues"}>{annContext.reqInfo.tissue}</AttributeLayout>
                </Col>
                <Col span={10}>
                    <ScreenStatus style={{width:500}}/>
                </Col>
            </Row>
            <ScoreBarGraph MIA={annContext.MIA}/>
            <SectionTable MIA={annContext.MIA}/>
        </div>
    )
}