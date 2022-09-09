import {Col, Row} from "antd";
import React from "react";

export default function AttributeLayout({attribute,children}){
    return(
        <Row style={{height:"auto",marginBottom:"5px"}}>
            <Col span={6}><span style={{fontWeight:"bold",color:"dimgray"}}>{attribute}</span></Col>
            <Col span={18}>
                <span style={{color:"gray"}}>
                    {children}
                </span>
            </Col>
        </Row>
    )
}