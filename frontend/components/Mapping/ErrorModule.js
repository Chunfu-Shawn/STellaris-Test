import ErrorStatus from "./ErrorStatus";
import {CloseCircleOutlined} from "@ant-design/icons";
import {Card, Col, Row} from "antd";
import React, {useContext} from "react";
import {AnnContext} from "../../pages/mapping/resultPage/[rid]";


export default function ErrorModule(){
    const annContext = useContext(AnnContext);
    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h3>Mapping Results</h3>
            </div>
            <h2>ERROR!</h2>
            <h4>Unfortunately, something wrong happened or your uploaded files is undesirable.</h4>
            <span>
                Please check it or create an issue on our
                <a href={"https://github.com/Chunfu-Shawn/STellaris_Spatial_Mapping"} target={"_blank"} rel={'noreferrer'}> Github repository</a>.
            </span>
            <Row justify="center" align="top" style={{marginTop:20,textAlign:"left"}}>
                <Col span={7} style={{marginLeft: "40px"}}>
                    <Card
                        title= {<b><CloseCircleOutlined /> Error Log </b>}
                        style={{
                            textAlign:"left",
                            height: 200,
                            width: 350,
                            borderColor:"#dcdcdc"
                        }}
                        headStyle={{background:"#f5f5f5",borderColor:"#dcdcdc"}}
                        bodyStyle={{color:"gray"}}
                        size={"small"}
                    >
                        <div style={{overflow: "scroll",height: 140,width: 330}}>
                            {annContext.eLog.map(item => <p key={item} style={{margin:"5px 0px"}}>{item}</p>)}
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <ErrorStatus style={{width: 500, margin:"0px auto"}}/>
                </Col>
            </Row>
        </div>
    )
}