import Link from "next/link.js";
import {ProjectOutlined, PushpinOutlined, QuestionCircleOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";

export const items = [
    {
        label: <Link href={'/help/projectoverview'}><a>Project Overview</a></Link>,
        key: 'project', icon: <ProjectOutlined /> },
    {
        label: 'Example Usage', key: 'example', icon: <PushpinOutlined />,
        children: [
            { label: <Link href={'/help/example/datasets'}><a>Datesets</a></Link>, key: 'datesets' },
            { label: <Link href={'/help/example/annotation'}><a>Spatial Annotation</a></Link>, key: 'annotation'},
            { label: <Link href={'/help/example/search'}><a>Search</a></Link>, key: 'search'}
        ],
    },
    {
        label: 'FAQ', key: 'faq', icon: <QuestionCircleOutlined />,
        children: [
            { label: <Link href={'/help/faq/citation'}><a>Citation</a></Link>, key: 'citation'},
            { label: 'How to get ...', key: 'how'}
        ]
    },
    {
        label: <Link href={'/help/api'}><a>API</a></Link>, key: 'api', icon: <SettingOutlined />
    }
]

export const contentStyle = {
    height:"80vh",
    width:"80%",
    padding: '8% 3%',
    textAlign: 'left'
}