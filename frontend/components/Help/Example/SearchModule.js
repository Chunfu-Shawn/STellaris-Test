import {Breadcrumb} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";

export default function HelpSearch() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Example Usage</Breadcrumb.Item>
                <Breadcrumb.Item>Search</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}