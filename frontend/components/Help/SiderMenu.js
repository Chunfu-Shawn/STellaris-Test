import Link from "next/link.js";
import {Layout, Menu} from 'antd';
import {ProjectOutlined, PushpinOutlined, QuestionCircleOutlined, SettingOutlined, CompassOutlined} from "@ant-design/icons";
import React from "react";
const { Sider } = Layout;

const items = [
    {
        label: <Link href={'/help'}>Project Overview</Link>,
        key: 'project', icon: <ProjectOutlined /> },
    {
        label: 'Features', key: 'features', icon: <CompassOutlined />,
        children: [
            { label: <Link href={'/help/features/datasets'}>Datasets</Link>, key: 'features_datasets' },
            { label: <Link href={'/help/features/annotation'}>Spatial Annotation</Link>, key: 'features_annotation'},
            { label: <Link href={'/help/features/browser'}>Browser</Link>, key: 'features_browser'}
        ],
    },
    {
        label: 'Example Usage', key: 'example', icon: <PushpinOutlined />,
        children: [
            { label: <Link href={'/help/example/datasets'}>Datasets</Link>, key: 'example_datasets' },
            { label: <Link href={'/help/example/annotation'}>Spatial Annotation</Link>, key: 'example_annotation'},
            { label: <Link href={'/help/example/browser'}>Browser</Link>, key: 'example_browser'}
        ],
    },
    {
        label: 'FAQ', key: 'faq', icon: <QuestionCircleOutlined />,
        children: [
            { label: <Link href={'/help/faq/citation'}>Citation</Link>, key: 'citation'},
            { label: 'How to get ...', key: 'how'}
        ]
    },
    {
        label: <Link href={'/help/api'}>API</Link>, key: 'api', icon: <SettingOutlined />
    }
]

export const contentStyle = {
    height:"80vh",
    width:"80vw",
    padding: '15vh 3vw',
    textAlign: 'left'
}

export function SiderMenu(props){
    console.log(props.selected)
    return(
        <Sider  style={{backgroundColor:"transparent"}}
                breakpoint="lg"
                collapsedWidth="50"
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={[props.selected]}
                defaultOpenKeys={[props.opened]}
                style={{ marginTop:84 }}
                items={ items }
            />
        </Sider>
    )
}