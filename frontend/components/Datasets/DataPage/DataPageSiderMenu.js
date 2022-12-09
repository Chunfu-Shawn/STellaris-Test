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
        label: <a href={'#Sections'}>Sections</a>, key: 'Sections'
    },
    {
        label: <a href={'#Features'}>Features</a>, key: 'Features',
    },
    {
        label: <a href={'#View'}>View</a>, key: 'View',
    },
    {
        label: <a href={'#Source'}>Source</a>, key: 'Source',
    },
    {
        label: <a href={'#Download'}>Download</a>, key: 'Download'
    }
]

export default function DataPageSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   width={150}
                   openKeys = {["Spatial Expression","Features"]}
                   defaultAcitiveNav={"Summary"}
                   divContent={props.divContent}
        />
    )
}