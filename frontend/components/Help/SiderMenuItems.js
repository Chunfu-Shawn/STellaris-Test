import Link from "next/link.js";
import {ProjectOutlined, PushpinOutlined, QuestionCircleOutlined, SettingOutlined} from "@ant-design/icons";
import React from "react";

export const items = [
    {
        label: "Project Overview",
        key: 'project', icon: <ProjectOutlined /> },
    {
        label: 'Example Usage', key: 'example', icon: <PushpinOutlined />,
        children: [
            { label: 'Datesets', key: 'datesets' },
            { label: 'Spatial Annotation', key: 'annotation'},
            { label: 'Browser', key: 'browser'}
        ],
    },
    {
        label: 'FAQ', key: 'faq', icon: <QuestionCircleOutlined />,
        children: [
            { label: 'Citation', key: 'citation'},
            { label: 'How to get ...', key: 'how'}
        ]
    },
    {
        label: 'API', key: 'api', icon: <SettingOutlined />
    }
]

export const contentStyle = {
    height:"80vh",
    width:"80%",
    padding: '15vh 3vw',
    textAlign: 'left'
}