import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../LayoutCustom.js'
import {Affix, Col, Row} from 'antd';
import React from 'react';
import TutorialSiderMenu from "./TutorialSiderMenu";;

export default function TutorialLayout({children, opened, selected}) {
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Tutorial"}</title>
            </Head>
            <div className="modal-body-stw" style={{padding:"0px 0px"}}>
                <Row style={{width:"100%"}}>
                    <Col span={3}>
                        <Affix offsetTop={0}>
                            <TutorialSiderMenu selected={selected} opened={opened}/>
                        </Affix>
                    </Col>
                    <Col span={21}>
                        <div style={{display:'inline-block',paddingBottom:'50px'}}>
                            {children}
                        </div>
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}