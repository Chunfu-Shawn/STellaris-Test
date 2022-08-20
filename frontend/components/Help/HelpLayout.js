import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../LayoutCustom.js'
import {Col, Row} from 'antd';
import React from 'react';
import {SiderMenu} from "./SiderMenu";

export default function HelpLayout({children, opened, selected}) {
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Help"}</title>
            </Head>
            <Row>
                <Col>
                    <SiderMenu selected={selected} opened={opened}/>
                </Col>
                <Col>
                    <div style={{display:'inline-block',paddingBottom:'8%'}}>
                        {children}
                    </div>
                </Col>
            </Row>
        </LayoutCustom>
    )
}