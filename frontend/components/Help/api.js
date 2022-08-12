import { Breadcrumb, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "./SiderMenuItems.js";
const { Title, Paragraph } = Typography;

export default function HelpAPI() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>API</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Typography>
                <Title>STW API</Title>
                <Paragraph>STW API is a REST-style Application Program Interface to STW database resource.</Paragraph>
                <h4>General form</h4>
                <h5>URL from</h5>
                <div className="site-card-wrapper" style={{padding:"2%"}}>
                    <p>https://spatialtransweb.rhesusbase.com/api/[operation]/[argument]/([argument]...)</p>
                    <p>[operation] = getDatasetsJSON | getReqStatus | ...</p>
                </div>
            </Typography>
        </div>
    )
}