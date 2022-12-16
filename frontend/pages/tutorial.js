import React,{useRef} from 'react';
import Head from "next/head";
import {Affix, Button, Col, Row, Space, Typography} from "antd";
import LayoutCustom from "../components/LayoutCustom";
import TutorialSiderMenu from "../components/Tutorial/TutorialSiderMenu";
import Link from "next/link.js";
import Image from "next/image";
import Overview from "../components/Tutorial/Overview";
import GetStarted from "../components/Tutorial/GetStarted";
import ResultInterpretation from "../components/Tutorial/ResultInterpretation";
import DatasetBrowser from "../components/Tutorial/DatasetBrowser";
import GeneSearch from "../components/Tutorial/GeneSearch";
import MutiOmics from "../components/Tutorial/MutiOmics";

export default function Help() {
    const divContent = useRef(null); //标识nav导航栏渲染内容

    return (
        <LayoutCustom>
            <Head>
                <title>{'STellaris | Tutorial'}</title>
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
                                <Overview/>
                                <h2>
                                    Spatial Mapping
                                </h2>
                                <GetStarted/>
                                <ResultInterpretation/>
                                <MutiOmics/>
                                <DatasetBrowser/>
                                <GeneSearch/>
                            </div>
                        </Typography>
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}