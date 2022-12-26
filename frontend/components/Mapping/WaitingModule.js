import MappingSteps from "./MappingSteps";
import React,{useContext} from "react";
import {Col, Divider, Row} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {AnnContext} from "../../pages/mapping/resultPage/[rid]";


export default function RunningModule(){
    const annContext = useContext(AnnContext);
    return(
        <div className="modal-body-stw" >
            <MappingSteps current={3}/>
            <Divider/>
            <h2>Wait to Start Spatial Mapping</h2>
            <div style={{margin:"0px auto",marginTop:20}}>
                <p style={{fontSize:16,width:600,margin:"0px auto"}}>
                    Your job is in the queue. If the server is free, your job will start automatically.
                </p>
                <LoadingOutlined style={{fontSize:40,margin:"30px auto"}}/>
                <div style={
                    {
                        margin:"auto",
                        width:600,
                        marginTop:20,
                        padding:"20px 20px",
                        textAlign:"left",
                        borderRadius:10,
                        backgroundColor:"#f6f6f6"
                    }}
                >
                    <div style={{width:350,margin:"auto"}}>
                        <Row style={{height:"auto",marginBottom:"5px"}}>
                            <Col span={20}>
                                <span style={{color:"dimgray",fontSize:18}}>
                                    Your number in the queue
                                </span>
                            </Col>
                            <Col span={4}>
                                <span style={{color:"gray",fontWeight:"bold",fontSize:18}}>
                                    {annContext.queueInfo.waitingOrder}
                                </span>
                            </Col>
                        </Row>
                        <Row style={{height:"auto",marginBottom:"5px"}}>
                            <Col span={20}>
                                <span style={{color:"dimgray",fontSize:18}}>
                                    Total number of waiting jobs
                                </span>
                            </Col>
                            <Col span={4}>
                                <span style={{color:"gray",fontWeight:"bold",fontSize:18}}>
                                    {annContext.queueInfo.waitingJobNumber}
                                </span>
                            </Col>
                        </Row>
                        <Row style={{height:"auto",margin:"15px 0px"}}>
                            <Col span={17}><span style={{color:"dimgray"}}>Estimated waiting time</span></Col>
                            <Col span={7}>
                                <span style={{fontWeight:"bold",color:"gray"}}>
                                    {annContext.queueInfo.waitingOrder * 5} - {annContext.queueInfo.waitingOrder * 10} min
                                </span>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}