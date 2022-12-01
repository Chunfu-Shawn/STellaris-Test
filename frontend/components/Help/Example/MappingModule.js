import {Breadcrumb} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";

export default function MappingModule() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Example Usage</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}