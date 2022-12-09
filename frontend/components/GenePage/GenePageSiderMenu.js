import React,{useContext} from "react";
import {SiderMenu} from "../SiderMenu.js";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

const itemsSV = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'Summary'
    },
    {
        label: 'Spatial Expression', key: 'Spatial Expression',
        children: [
            { label: <a href={'#SV Expression'}>SV Expression</a>, key: 'SV Expression' },
            { label: <a href={'#SVE Table'}>SV Expression Table</a>, key: 'SVE Table'},
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