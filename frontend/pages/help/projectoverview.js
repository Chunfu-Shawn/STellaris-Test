import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../../components/LayoutCustom.js'
import {Layout, Breadcrumb, Menu, Typography} from 'antd';
import React, { useState } from 'react';
import { items,contentStyle} from "./SiderMenuItems.js";
const { Title, Paragraph, Text, Link } = Typography;
const { Sider } = Layout;


export default function Help() {

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
                        defaultSelectedKeys={"project"}
                        mode="inline"
                        onClick={onClick}
                        style={{ marginTop:85 }}
                        items={items}
                    />
                </Sider>
                <div className="modal-body-stw" style={contentStyle}>
                    <Breadcrumb>
                        <Breadcrumb.Item>Help</Breadcrumb.Item>
                        <Breadcrumb.Item>Project Overview</Breadcrumb.Item>
                    </Breadcrumb><br/>
                    <Typography>
                        <Title>Spatial Transcriptome Web</Title>
                    </Typography>
                </div>
            </Layout>
        </LayoutCustom>
    )
}