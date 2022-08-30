import {Layout} from 'antd';
import React from "react";
import {SiderMenu} from "../SiderMenu.js";

const items = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'Summary'
    },
    {
        label: 'Spatial Expression', key: 'Spatial Expression',
        children: [
            { label: <a href={'#RSE'}>RSE</a>, key: 'RSE' },
            { label: <a href={'#CoE-Genes'}>CoE-Genes</a>, key: 'CoE-Genes'},
            { label: <a href={'#HighlyE-Clusters'}>HighlyE-Clusters</a>, key: 'HighlyE-Clusters'}
        ],
    },
    {
        label: 'Features', key: 'Features',
        children: [
            { label: <a href={'#Genomic Context'}>Genomic Context</a>, key: 'Genomic Context' },
            { label: <a href={'#Transcript'}>Transcript</a>, key: 'Transcript'}
        ],
    },
    {
        label: <a href={'#download'}>Download</a>, key: 'download'
    }
]

export default function GenePageSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   openKeys = {["Summary","Features"]}
                   divContent={props.divContent}
        />
    )
}