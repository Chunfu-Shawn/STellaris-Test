import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../../../components/LayoutCustom.js'
import {Layout,Breadcrumb, Menu} from 'antd';
import React, { useState } from 'react';
import {contentStyle, items} from "../SiderMenuItems.js";
const { Sider } = Layout;

export default function HelpAnnotation() {

    const onClick = (e) => {
        console.log('click ', e);
    };

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Help"}</title>
            </Head>
            <Layout style={{backgroundColor:"transparent"}}>
                <Sider  style={{backgroundColor:"transparent"}}
                        breakpoint="lg"
                        collapsedWidth="50"
                >
                    <Menu
                        defaultSelectedKeys={"citation"}
                        defaultOpenKeys={['faq']}
                        mode="inline"
                        onClick={onClick}
                        style={{ marginTop:85 }}
                        items={items}
                    />
                </Sider>
                <div className="modal-body-stw" style={contentStyle}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Help</Breadcrumb.Item>
                        <Breadcrumb.Item>FAQ</Breadcrumb.Item>
                        <Breadcrumb.Item>Citation</Breadcrumb.Item>
                    </Breadcrumb>

                </div>
            </Layout>
        </LayoutCustom>
    )
}