import React,{useRef} from 'react';
import Head from "next/head";
import {Affix, Col, Row, Typography} from "antd";
import LayoutCustom from "../components/LayoutCustom";
import TutorialSiderMenu from "../components/Tutorial/TutorialSiderMenu";

export default function Help() {
    const divContent = useRef(null); //标识nav导航栏渲染内容

    return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Tutorial'}</title>
            </Head>
            <div
                className={"modal-body-stw with-sider"}
            >
                <Row style={{width:"100%"}}>
                    <Col span={5}>
                        <Affix offsetTop={120}>
                            <TutorialSiderMenu divContent={divContent}/>
                        </Affix>
                    </Col>
                    <Col span={19}>
                        <Typography style={{fontSize:16}}>
                            <div ref={divContent}>
                                <h1>Tutorial</h1>
                                <div name={"Information"}>
                                    <a id={"Information"} style={{position: 'relative', top: "-150px"}}></a>
                                    <h2>General Information</h2>
                                </div>
                                <div name={"Guide"}>
                                    <a id={"Guide"} style={{position: 'relative', top: "-150px"}}></a>
                                    <h2>Guide</h2>
                                </div>
                            </div>
                        </Typography>
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}