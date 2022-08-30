import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import { contentStyle } from "./SiderMenu.js";
import HumanMap from "../Datasets/HumanMap.js";
const { Title } = Typography;


export default function HelpProject() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Project Overview</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Typography>
                <Title>Spatial Transcriptome Web</Title>
            </Typography>
        </div>
    )
}