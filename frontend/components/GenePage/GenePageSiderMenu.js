import React,{useContext} from "react";
import {SiderMenu} from "../SiderMenu.js";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

const itemsSV = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'Summary'
    },
    {
        label: 'SVG Expression', key: 'Spatial Expression',
        children: [
            { label: <a href={'#Gallery'}>Gallery</a>, key: 'Gallery' },
            { label: <a href={'#Table'}>Table</a>, key: 'Table'},
        ],
    },
    {
        label: 'Features', key: 'Features',
        children: [
            { label: <a href={'#Expression'}>Expression</a>, key: 'Expression' },
            { label: <a href={'#Transcript'}>Transcript</a>, key: 'Transcript'}
        ],
    },
    {
        label: <a href={'#Download'}>Download</a>, key: 'Download'
    }
]
const itemsNonSV = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'Summary'
    },
    {
        label: 'Features', key: 'Features',
        children: [
            { label: <a href={'#Expression'}>Expression</a>, key: 'Expression' },
            { label: <a href={'#Transcript'}>Transcript</a>, key: 'Transcript'}
        ],
    },
    {
        label: <a href={'#Download'}>Download</a>, key: 'Download'
    }
]

export default function GenePageSiderMenu(props){
    const geneContext = useContext(GeneContext);
    return(
        <SiderMenu items = {geneContext.dataSV.length !== 0 ? itemsSV : itemsNonSV}
                   openKeys = {["Spatial Expression","Features"]}
                   defaultAcitiveNav={"Summary"}
                   divContent={props.divContent}
        />
    )
}