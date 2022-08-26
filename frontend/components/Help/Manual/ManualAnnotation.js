import {Breadcrumb} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderMenu.js";

export default function ManualAnnotation() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Annotation</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}