import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Layout, Menu} from 'antd';
import React, { useState } from 'react';
import { items } from "../components/Help/SiderMenuItems.js";
import HelpProject from "../components/Help/projectoverview.js";
import HelpDatasets from "../components/Help/example/datasets.js";
import HelpAnnotation from "../components/Help/example/annotation.js";
import HelpBrowser from "../components/Help/example/browser";
import HelpCitation from "../components/Help/faq/citation";
import HelpAPI from "../components/Help/api.js";
const { Sider } = Layout;

export default function Help() {

    const [childrenDiv, setChildrenDiv] = useState(<HelpProject></HelpProject>);

    const onClick = (value) => {
        console.log(value.key)
        if (value.key === 'project') setChildrenDiv(<HelpProject></HelpProject>)
        else if (value.key === 'datesets') setChildrenDiv(<HelpDatasets></HelpDatasets>)
        else if (value.key === 'annotation') setChildrenDiv(<HelpAnnotation></HelpAnnotation>)
        else if (value.key === 'browser') setChildrenDiv(<HelpBrowser></HelpBrowser>)
        else if (value.key === 'citation') setChildrenDiv(<HelpCitation></HelpCitation>)
        else if (value.key === 'how') setChildrenDiv(<HelpCitation></HelpCitation>)
        else if (value.key === 'api') setChildrenDiv(<HelpAPI></HelpAPI>)
    }

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
                        mode="inline"
                        defaultSelectedKeys={['project']}
                        onClick={onClick}
                        style={{ marginTop:85 }}
                        items={ items }
                    />
                </Sider>
                {childrenDiv}
            </Layout>
        </LayoutCustom>
    )
}