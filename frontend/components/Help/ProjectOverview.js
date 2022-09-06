import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import { contentStyle } from "./SiderMenu.js";
import dynamic from 'next/dynamic';
const { Title } = Typography;

export default function HelpProject() {
    const DynamicVisualTool = dynamic(() =>
        import('../VisualTool/VisualTool.js').then((mod) => mod.VisualTool),
        {
            ssr: false,
        })
    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Project Overview</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Typography>
                <Title>Spatial Transcriptome Web</Title>
            </Typography>
            <DynamicVisualTool/>
        </div>
    )
}