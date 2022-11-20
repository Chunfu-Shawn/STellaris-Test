import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import { contentStyle } from "./SiderStaticMenu.js";
const { Title } = Typography;

export default function HelpProject() {
    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Project Overview</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Typography>
                <Title>Spatial Transcriptome Webserver</Title>
                <p style={{fontSize:18}}>
                    STW is a comprehensive web-based platform involved database about spatial transcriptome data and gene spatial expression and
                    tools about spatial alignment of sc/snRNA-seq data from a reference spatial data.
                </p>
            </Typography>
        </div>
    )
}