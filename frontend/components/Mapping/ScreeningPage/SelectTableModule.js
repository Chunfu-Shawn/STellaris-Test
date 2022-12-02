import React,{useContext} from "react";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
import {Col, Divider, Row} from "antd";
import SectionTable from "./SectionTable";
import ScoreBarGraph from "./ScoreBarGraph";
import ScreenStatus from "../ScreeningPage/ScreenStatus";
import AttributeLayout from "../../GenePage/AttributeLayout";
import MappingSteps from "../MappingSteps";

export default function SelectTableModule(){
    const annContext = useContext(AnnContext);
    return(
        <div className="modal-body-stw" >
            <MappingSteps current={2}/>
            <Divider/>
            <Row justify="center" align="top" style={{marginTop:20,textAlign:"left"}}>
                <Col span={7} style={{margin: "30px 5px"}}>
                    <h2>Section Blast Result</h2>
                    <AttributeLayout attribute={"Species"}>{annContext.reqInfo.species}</AttributeLayout>
                    <AttributeLayout attribute={"Organ"}>{annContext.reqInfo.organ}</AttributeLayout>
                    <AttributeLayout attribute={"Tissues"}>{annContext.reqInfo.tissue}</AttributeLayout>
                </Col>
                <Col span={10}>
                    <ScreenStatus style={{width:500}}/>
                </Col>
            </Row>
            <ScoreBarGraph MIA={annContext.MIA}/>
            <SectionTable/>
        </div>
    )
}