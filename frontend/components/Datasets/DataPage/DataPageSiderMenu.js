import {Layout} from 'antd';
import React from "react";
import {SiderMenu} from "../../SiderMenu.js";

const items = [
    {
        label: <a href={'#Summary'}>Summary</a>, key: 'Summary',
    },
    {
        label: <a href={'#Sample'}>Sample</a>, key: 'Sample'
    },
    {
        label: <a href={'#Duplicates'}>Duplicates</a>, key: 'Duplicates'
    },
    {
        label: <a href={'#Source'}>Source</a>, key: 'Source',
    },
    {
        label: <a href={'#View'}>View</a>, key: 'View',
    },
    {
        label: <a href={'#Files'}>Files</a>, key: 'Files'
    }
]

export default function DataPageSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   openKeys = {["Spatial Expression","Features"]}
                   divContent={props.divContent}
        />
    )
}