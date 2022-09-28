import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import { useRouter } from "next/router";
import {Form, Input, message, Layout, Popconfirm, Space, Row, Col, Tabs} from 'antd';
const { Sider } = Layout;
import Guidance from "../components/Annotation/index/Guidance";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import DeNovoAnnotation from "../components/Annotation/DeNovoAnnotation";
import React, {useState} from "react";
import CellTypesAnnotate from "../components/Annotation/CellTypesAnnotate";
import {data, getAnnotationOptions} from "../components/Datasets/getData&Options";

const items = [
    { label: 'annotation1', key: 'annotation1', children: <DeNovoAnnotation/> }, // 务必填写 key
    { label: 'annotation2', key: 'annotation1', children: '内容 2' },
];

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


const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    string: {
        max: "'${name}' cannot be longer than ${max} characters",
    }
};
const organOptions = getAnnotationOptions(data)['organOptions'];
const tissueOptions = getAnnotationOptions(data)['tissueOptions'];

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
                        <Tabs className={'border-card-wrapper'}
                              style={{padding:40,width:700,background:'rgb(255,255,255)'}}
                              defaultActiveKey="1"
                              size={'large'}
                        >
                            <Tabs.TabPane tab="De Novo Annotate" key="1">
                                <DeNovoAnnotation
                                    validateMessages={validateMessages}
                                    organOptions={organOptions}
                                    tissueOptions={tissueOptions}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Cell Types Annotate" key="2">
                                <CellTypesAnnotate
                                    validateMessages={validateMessages}
                                    organOptions={organOptions}
                                    tissueOptions={tissueOptions}
                                />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </Tabs.TabPane>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </LayoutCustom>
    )
}