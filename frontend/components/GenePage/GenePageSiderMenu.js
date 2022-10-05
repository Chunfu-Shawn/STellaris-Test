import React,{useContext} from "react";
import {SiderMenu} from "../SiderMenu.js";
import {GeneContext} from "../../pages/browser/genePage/[gene_id]";

const itemsSV = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'Summary'
    },
    {
        label: 'Spatial Expression', key: 'Spatial Expression',
        children: [
            { label: <a href={'#SV Expression'}>SV Expression</a>, key: 'SV Expression' },
            { label: <a href={'#CoE-Genes'}>CoE-Genes</a>, key: 'CoE-Genes'},
            { label: <a href={'#HighlyE-Clusters'}>HighlyE-Clusters</a>, key: 'HighlyE-Clusters'}
        ],
    },
    {
        label: 'Features', key: 'Features',
        children: [
            { label: <a href={'#Genomic Context'}>Genomic Context</a>, key: 'Genomic Context' },
            { label: <a href={'#Expression'}>Expression</a>, key: 'Expression' },
            { label: <a href={'#Transcript'}>Transcript</a>, key: 'Transcript'}
        ],
    },
    {
        label: <a href={'#download'}>Download</a>, key: 'download'
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
            { label: <a href={'#Genomic Context'}>Genomic Context</a>, key: 'Genomic Context' },
            { label: <a href={'#Expression'}>Expression</a>, key: 'Expression' },
            { label: <a href={'#Transcript'}>Transcript</a>, key: 'Transcript'}
        ],
    },
    {
        label: <a href={'#download'}>Download</a>, key: 'download'
    }
]

export default function GenePageSiderMenu(props){
    const geneContext = useContext(GeneContext);
    return(
        <SiderMenu items = {geneContext.dataSV.length !== 0 ? itemsSV : itemsNonSV}
                   openKeys = {["Spatial Expression","Features"]}
                   divContent={props.divContent}
        />
    )
}