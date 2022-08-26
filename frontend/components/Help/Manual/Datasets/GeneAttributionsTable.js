import {Collapse, Table} from "antd";
import React from "react";
const { Panel } = Collapse;
const data = [
    {
        "Datasets": "Gene Info",
        "Attribution": "Symbol",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Ensembl ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Description",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Gene Type",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Organism",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Chromosome, Start, End, Strand",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Gene Source",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Gene Version",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Entrez ID",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Aliases / Gene Synonyms",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Chromosomal Location",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Other Designations",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Gene Info",
        "Attribution": "Identifiers in Other DB",
        "Source": "NCBI Gene Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Transcript ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Name",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Length",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Type",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Transcription Start Sites (TSS)",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Refseq mRNA ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Refseq ncRNA ID",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Version",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Start - End",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Count",
        "Source": "Ensembl Database"
    },
    {
        "Datasets": "Transcript",
        "Attribution": "Transcript Support Level (TSL)",
        "Source": "Ensembl Database"
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
            if (index === 0) return { rowSpan: 13 }
            else if (index === 13 )return { rowSpan: 11}
            else return { rowSpan: 0 }
        }
    },
    {
        title: 'Attribution',
        dataIndex: 'Attribution',
        key: 'Attribution',
        width:'10%',
        onCell: ()=>{ return { rowSpan: 1} }
    },
    {
        title: 'Source',
        dataIndex: 'Source',
        key: 'Source',
        width:'10%',
        onCell: ()=>{ return { rowSpan: 1} }
    }
]

export default function GeneAttributionsTable(){
    return(
        <Collapse defaultActiveKey={['1']} bordered={false} style={{width:"80%", margin:"10px 100px"}} >
            <Panel key={1} header={<b>Datasets Attribution and Source (click to hide or show this panel)</b>}>
                <Table dataSource={
                    data.map( item => {
                        return { key:item.Attribution,...item}
                    })
                } columns={columns} size={"small"} bordered={true} pagination={false}/>
            </Panel>
        </Collapse>
    )
}