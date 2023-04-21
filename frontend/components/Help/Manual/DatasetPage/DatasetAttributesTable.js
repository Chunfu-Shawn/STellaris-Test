import {Table} from "antd";
import React from "react";
const data = [
    {
        "Attribute": "ID",
        "Description": "Assigned unique ID for each dataset in this web"
    },
    {
        "Attribute": "Method",
        "Description": "The spatial transcriptomic technology for each dataset"
    },
    {
        "Attribute": "Date Published",
        "Description": "Date when the data was published"
    },
    {
        "Attribute": "Species",
        "Description": "Species where the data was derived"
    },
    {
        "Attribute": "Strain",
        "Description": 'Strain of the sample'
    },
    {
        "Attribute": "Organ",
        "Description": "Organ where the sample was captured"
    },
    {
        "Attribute": "Tissue",
        "Description": "Tissue where the sample was captured"
    },
    {
        "Attribute": "Pathological",
        "Description": "True / false meaning whether the sample was pathological"
    },
    {
        "Attribute": "Developmental Stage",
        "Description": "Developmental stage of the donor"
    },
    {
        "Attribute": "Number of Section",
        "Description": "Number of technologically sections in each dataset"
    },
    {
        "Attribute": "Section ID",
        "Description": "Names of sections in this dataset"
    },
    {
        "Attribute": "Title",
        "Description": "Title of the article where the dataset was published"
    },
    {
        "Attribute": "Journal",
        "Description": "Journal name of the article where the dataset was published"
    },
    {
        "Attribute": "PMID",
        "Description": "PMID (pubmed id) of the article where the dataset was published"
    },
]
const columns =[
    {
        title: 'Attribute',
        dataIndex: 'Attribute',
        key: 'Attribute',
        width: '6%',
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        width:'30%',
    }
]

export default function DatasetAttributesTable(){
    return(
        <div style={{marginLeft:100,width:800}}>
            <Table dataSource={
                data.map( item => {
                    return { key:item.Attribute,...item}
                })
            } columns={columns} size={"small"} bordered={true} pagination={false}/>
        </div>
    )
}