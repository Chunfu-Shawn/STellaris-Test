import {Table} from "antd";
import React from "react";
const data = [
    {
        "Datasets": "Genomic Context",
        "Attribute": "Location",
        "Description": "scaffold or chromosome and coordinate on which this gene is placed. For mitochondrial genomes, the value 'MT' is used."
    },
    {
        "Datasets": "Genomic Context",
        "Attribute": "Chromosomal Location",
        "Description": "map location for this gene"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Transcript ID",
        "Description": "a stable identifier for this transcript from Ensembl"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Name",
        "Description": "a name for this transcript from Ensembl"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Length",
        "Description": "length of this transcript (bp)"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Type",
        "Description": <span>a transcript classification containing <b>protein coding, lncRNA, processed pseudogene, unprocessed pseudogene,
        miRNA, TEC, snRNA, misc_RNA, snoRNA and so on</b>, which integrated from Ensembl Database</span>
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Transcription Start Sites (TSS)",
        "Description": "the transcription start sites of this transcript"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Refseq mRNA ID",
        "Description": "a corresponding ID of this mRNA from NCBI's Reference Sequences (RefSeq) database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Refseq ncRNA ID",
        "Description": "a corresponding ID of this non-coding RNA from NCBI's Reference Sequences (RefSeq) database"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Version",
        "Description": "the version of this trancript from Ensembl"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Start - End",
        "Description": "the start and end coordinate of this trancript"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Count",
        "Description": "the expression count"
    },
    {
        "Datasets": "Transcript",
        "Attribute": "Transcript Support Level (TSL)",
        "Description": <span>The Transcript Support Level (TSL) is a method to highlight the well-supported and poorly-supported
            transcript models for users, based on the type and quality of the alignments used to annotate the transcript.
            <ul>
                <li><b>TSL 1</b>: A transcript where all splice junctions are supported by at least one non-suspect mRNA</li>
                <li><b>TSL 2</b>: A transcript where the best supporting mRNA is flagged as suspect or the support is from multiple ESTs</li>
                <li><b>TSL 3</b>: A transcript where the only support is from a single EST</li>
                <li><b>TSL 4</b>: A transcript where the best supporting EST is flagged as suspect</li>
                <li><b>TSL 5</b>: A transcript where no single transcript supports the model structure</li>
                <li><b>TSL NA</b>: A transcript that was not analysed for TSL</li>
            </ul>
        </span>
    },
]
const columns =[
    {
        title: 'Datasets',
        dataIndex: 'Datasets',
        key: 'Datasets',
        width: '4%',
        align:"center",
        render: text => { return <b>{text}</b> },
        onCell: (_,index)=>{
            if (index === 0) return { rowSpan: 2 }
            else if (index === 2 )return { rowSpan: 11}
            else return { rowSpan: 0 }
        }
    },
    {
        title: 'Attribute',
        dataIndex: 'Attribute',
        key: 'Attribute',
        width:'5%',
        onCell: ()=>{ return { rowSpan: 1} }
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        width:'10%',
        onCell: ()=>{ return { rowSpan: 1} }
    }
]

export default function GeneFeaturesAttributesTable(){
    return(
        <Table dataSource={
            data.map( item => {
                return { key:item.Attribution,...item}
            })
        } columns={columns} size={"small"} bordered={true} pagination={false}/>
    )
}