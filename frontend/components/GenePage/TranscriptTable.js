import {Space, Table, Tag} from "antd";
import {useContext, useState} from "react";
import {QuestionCircleFilled} from "@ant-design/icons";
import React from "react";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

export default function TranscriptTable(){
    const [sortedInfo, setSortedInfo] = useState({});
    const transContext = useContext(GeneContext)
    const columns =[
        {
            title: 'Transcript ID',
            dataIndex: 'ensembl_transcript_id',
            key: 'ensembl_transcript_id',
            width: '20%',
            sorter: (a, b) => {
                if (a.ensembl_transcript_id > b.ensembl_transcript_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'ensembl_transcript_id' ? sortedInfo.order : null,
            render: (text) => text !== "-" ?
                <a target={"_blank"} href={`http://www.ensembl.org/id/${text}`} rel="noreferrer">{text}</a>
                : "-",
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width:'15%',
            sorter: (a, b) => {
                if(a.name > b.name) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
        },
        {
            title: 'Length',
            dataIndex: 'length',
            key: 'length',
            width:'6%',
            sorter: (a, b) => {
                if(a.length > b.length) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'length' ? sortedInfo.order : null,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width:'20%',
            sorter: (a, b) => {
                if(a.type > b.type) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'type' ? sortedInfo.order : null,
            render: (_,{type}) => {
                let color = ''
                switch(type)
                {
                    case 'protein_coding':
                        color = 'volcano'
                        break;
                    case 'lncRNA':
                        color = 'green'
                        break;
                    case 'processed_pseudogene':
                        color = 'cyan'
                        break;
                    case 'unprocessed_pseudogene':
                        color = 'purple'
                        break;
                    case 'miRNA':
                        color = 'geekblue'
                        break;
                    case 'TEC':
                        color = 'blue'
                        break;
                    case 'snRNA':
                        color = 'lime'
                        break;
                    case 'misc_RNA':
                        color = 'gold'
                        break;
                    case 'snoRNA':
                        color = 'orange'
                        break;
                    default:
                        color = 'default'
                }
                return (
                    <Tag color={color} key={type}>
                        {type.toUpperCase()}
                    </Tag>
                );
            },

        },
        {
            title: 'TSS',
            dataIndex: 'tss',
            key: 'tss',
            width: '10%',
            sorter: (a, b) => {
                if(a.tss > b.tss) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'tss' ? sortedInfo.order : null,
        },
        {
            title: 'Refseq mRNA',
            dataIndex: 'refseq_mrna',
            key: 'refseq_mrna',
            width: '10%',
            render: (text) => <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${text}`}
                                 target={"_blank"} rel="noreferrer">{text}</a>
        },
        {
            title: 'Refseq ncRNA',
            dataIndex: 'refseq_ncrna',
            key: 'refseq_ncrna',
            width: '10%',
            render: (text) => <a href={`https://www.ncbi.nlm.nih.gov/nuccore/${text}`}
                                 target={"_blank"} rel="noreferrer">{text}</a>
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
            width: '15%',
        },
    ]

    // column sort
    const handleChange = (pagination,filter,sorter) => {
        setSortedInfo(sorter);
    };

    return(
        transContext.trans.length !== 0 ?
            <Table
                dataSource={transContext.trans.map(data => {
                    return {key: data.ensembl_transcript_id, ...data}
                })}
                columns={columns}
                onChange={handleChange}
                size={"small"}
                expandable={{
                    expandedRowRender: (record) => (
                        <Space size={"large"}>
                            {
                                record.version ?
                                    <span
                                        style={{
                                            margin: 20,
                                        }}
                                    >
                                        <b>Version: </b> {record.version}
                                    </span> : <></>
                            }
                            {
                                record.start&&record.end ?
                                    <span
                                        style={{
                                            margin: 20,
                                        }}
                                    >
                                        <b>Chr</b> {transContext.data.chrom_scaf}: {record.start}-{record.end}
                                    </span> : <></>
                            }
                            {
                                record.count ?
                                    <span
                                        style={{
                                            margin: 20,
                                        }}
                                    >
                                        <b>Count: </b>  {record.count}
                                    </span> : <></>
                            }
                            {
                                record.tsl ?
                                    <span
                                        style={{
                                            margin: 20,
                                        }}
                                    >
                                        <b>TSL:</b> {record.tsl}
                                    </span> : <></>
                            }
                        </Space>
                    )
                }}
            />
            :
            <div style={{height:"50px"}}>
                <span style={{fontSize:"16px",fontWeight:"bold"}}> 0 transcript </span>
                <QuestionCircleFilled style={{fontSize:"16px",color:"#4426b0"}}/>
            </div>
    )
}