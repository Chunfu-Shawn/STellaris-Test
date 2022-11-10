import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Space, Row, Col} from 'antd';
import Guidance from "../components/Annotation/index/Guidance";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import UploadModule from "../components/Annotation/index/UploadModule";

/*
export async function getServerSideProps() {
    const SERVER_URL = process.env.NODE_ENV==="production"? process.env.PRODUCTION_URL : 'http://localhost:3000'
    return{
        props:{
            SERVER_URL: SERVER_URL
        }
    }
}
 */

export default function Annotation(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle +'| Annotation'}</title>
            </Head>
            <Row style={{width:"100vw",minWidth:1440}}>
                <Col style={{width:"35%"}}>
                    <div className={"modal-body-stw"} style={
                        {
                            borderStyle:"inset",
                            borderColor:"lightgray",
                            borderBottom:"none",
                            backgroundColor:"rgba(221,221,248,0.18)",
                            padding:"150px 80px 150px 100px",
                            width:"auto",
                            minWidth:500,
                            height:"100%",
                        }}>
                        <div style={{width:350,float:"right"}}>
                            <Guidance></Guidance>
                        </div>
                    </div>
                </Col>
                <Col style={{width:"65%"}}>
                    <div className="modal-body-stw" style={{width:"auto",padding:'120px 100px',textAlign:"left"}}>
                        <div style={{margin:"40px 0px 50px 0"}}>
                            <Space align="start">
                                <h1 style={
                                    {
                                        fontSize:"46px",
                                    }
                                }>Spatial Annotation</h1>
                                <Link href={'/help/manual/annotation'}>
                                    <a target={'_blank'} rel={"noreferrer"}>
                                        <QuestionCircleOutlined  style={{fontSize:"20px",color:"#2b1970"}}/>
                                    </a>
                                </Link>
                            </Space>
                        </div>
                        <UploadModule/>
                    </div>
                </Col>
            </Row>
        </LayoutCustom>
    )
}