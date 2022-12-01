import Link from "next/link.js";
import {Layout, Menu} from 'antd';
import {ProjectOutlined, PushpinOutlined, QuestionCircleOutlined, SettingOutlined, CompassOutlined} from "@ant-design/icons";
import React from "react";
const { Sider } = Layout;

const items = [
    {
        label: 'Manual', key: 'manual', icon: <CompassOutlined />,
        children: [
            { label: <Link href={'/help/manual/datasets'}>Datasets</Link>, key: 'manual_datasets' },
            { label: <Link href={'/help/manual/mapping'}>Spatial Mapping</Link>, key: 'manual_mapping'},
            { label: <Link href={'/help/manual/browser'}>Gene Browser</Link>, key: 'manual_browser'}
        ],
    },
    {
        label: 'Example Usage', key: 'example', icon: <PushpinOutlined />,
        children: [
            { label: <Link href={'/help/example/datasets'}>Datasets</Link>, key: 'example_datasets' },
            { label: <Link href={'/help/example/mapping'}>Spatial Mapping</Link>, key: 'example_mapping'},
            { label: <Link href={'/help/example/browser'}>Gene Browser</Link>, key: 'example_browser'}
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
    width:"1100px",
    padding: '10% 2%',
    textAlign: 'left'
}

export function SiderStaticMenu(props){
    return(
        <Sider  style={{backgroundColor:"transparent"}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={[props.selected]}
                defaultOpenKeys={props.opened}
                style={{ marginTop:84 }}
                items={ items }
            />
        </Sider>
    )
}