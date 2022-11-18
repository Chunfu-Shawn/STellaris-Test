import {Table, Tooltip, Button} from "antd";
import React, {useState} from "react";
import Link from "next/link.js";


export default function SectionTable(props) {
    const [sortedInfo, setSortedInfo] = useState({});
    const sections = props.MIA.section_id
    const enrichmentScore = props.MIA.enrichment_score
    let size = sections.length
    let data = []
    for(let i=0;i<size;i++){
        let a={};
        a.st_id=sections[i].split("|")[0];
        a.section_id=sections[i].split("|")[1];
        a.enrichment_score=enrichmentScore[i];
        data.push(a);
    }

    // column sort
    const handleChange = (pagination,filter,sorter) => {
        setSortedInfo(sorter);
    };
    const columns = [
        {
            title: 'ST ID',
            dataIndex: 'st_id',
            key: 'st_id',
            width:'20%',
            render: text => <Link href={'dataPage/'+text}><a>{text}</a></Link>,
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'st_id' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Section ID',
            dataIndex: 'section_id',
            key: 'section_id',
            width:'15%',
            render: text => <b>{text}</b>,
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'section_id' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width:'10%',
            sorter: (a, b) => {
                if(a.method > b.method) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'method' ? sortedInfo.order : null,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            sorter: (a, b) => {
                if(a.species > b.species) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'species' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Organ',
            dataIndex: 'organ',
            key: 'organ',
            width:'9%',
            render: (organ) => (
                <Tooltip placement="topLeft" title={organ}>
                    {organ}
                </Tooltip>
            ),
            sorter: (a, b) => {
                if(a.organ > b.organ) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'organ' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Tissue',
            dataIndex: 'tissue',
            key: 'tissue',
            width:'10%',
            render: (tissue) => ( tissue !== ''?
                    <Tooltip placement="topLeft" title={tissue}>
                        {tissue}
                    </Tooltip>:
                    '--'
            ),
            sorter: (a, b) => {
                if(a.tissue > b.tissue) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'tissue' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            width: "15%",
            sorter: (a, b) => Date.parse(a.date_published) - Date.parse(b.date_published),
            sortOrder: sortedInfo.columnKey === 'date_published' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Enrichment Score',
            dataIndex: 'enrichment_score',
            key: 'enrichment_score',
            width: "15%",
            sorter: (a, b) => a.enrichment_score - b.enrichment_score,
            sortOrder: sortedInfo.columnKey === 'enrichment_score' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: '',
            key: 'select',
            width: 80,
            render: (_, record) => <Button type={"primary"} ghost={true}>select</Button>,
        },
    ];


    return(
        <>
            <span style={{float:"right",fontSize:"16px",color:"gray"}}>0 Sections</span>
            <Table columns={columns}
                   dataSource={data}
                   onChange={handleChange}
            />
        </>
    )
}