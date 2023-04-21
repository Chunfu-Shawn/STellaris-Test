import {Divider, Space, Table, Tag} from "antd";
import {useState} from "react";
import {QuestionCircleFilled} from "@ant-design/icons";
import Link from "next/link.js";

export function setFilter(data){
    let filter = new Set()
    let filterJSON = []
    data.forEach( (item) => {
        filter.add(item.biotype)
    })
    for (let item of filter.values())
        filterJSON.push({text:item,value:item})
    return filterJSON
}

export default function SearchResultTable(props){
    const [sortedInfo, setSortedInfo] = useState({});
    const columns =[
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
            width:'10%',
            sorter: (a, b) => {
                if(a.symbol > b.symbol) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'symbol' ? sortedInfo.order : null,
            render: (text,record) => text!=="-" ?
                <a href={`/search/genePage/${record.ensembl_id}`} target={"_blank"} id={record.ensembl_id} rel={'noreferrer'}>
                    {text}
                </a>:"-",
        },
        {
            title: 'Ensembl ID',
            dataIndex: 'ensembl_id',
            key: 'ensembl_id',
            width:'15%',
            render: (text) => <a href={'/search/genePage/'+text} target={"_blank"} rel={'noreferrer'}>{text}</a>,
            sorter: (a, b) => {
                if(a.ensembl_id > b.ensembl_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'ensembl_id' ? sortedInfo.order : null,
        },
        {
            title: 'Entrez ID',
            dataIndex: 'entrez_id',
            key: 'entrez_id',
            width:'12%',
            sorter: (a, b) => {
                if(Number(a.entrez_id) > Number(b.entrez_id)) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'entrez_id' ? sortedInfo.order : null,
        },
        {
            title: 'Description',
            dataIndex: 'descriptive_name',
            key: 'descriptive_name',
            width:'30%',
        },
        {
            title: () => {
                return <Space>
                    <span>Gene type</span>
                    <Link href={'/help/manual/search#gene_list'}>
                        <a target={'_blank'}>
                            <QuestionCircleFilled  style={{fontSize:"15px",color:"#2b1970"}}/>
                        </a>
                    </Link>
                </Space>
            },
            dataIndex: 'biotype',
            key: 'biotype',
            width:'18%',
            sortOrder: sortedInfo.columnKey === 'biotype' ? sortedInfo.order : null,
            filters: setFilter(props.data),
            onFilter: (value, record) => record.biotype.indexOf(value) === 0,
            render: (_,{biotype}) => {
                let color = ''
                switch(biotype)
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
                    <Tag color={color} key={biotype}>
                        {biotype.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Organism',
            dataIndex: 'organism',
            key: 'organism',
            width: '20%',
            filters: [
                {
                    text: 'Homo sapiens',
                    value: 'Homo sapiens',
                },
                {
                    text: 'Mus musculus',
                    value: 'Mus musculus',
                },
            ],
            onFilter: (value, record) => record.organism.indexOf(value) === 0,
        },
    ]
    // column sort
    const handleChange = (pagination,filter,sorter) => {
        console.log('Various parameters', pagination, filter, sorter);
        setSortedInfo(sorter);
    };

    return(
        props.data.length !== 0 ?
            <>
                <div>
                    <span style={{fontSize:"15px"}}> {props.data.length} Results Found </span>
                </div>
                <Divider />
                <Table dataSource={props.data} columns={columns}
                       onChange={handleChange}
                       expandable={{
                           expandedRowRender: (record) => (
                               <Space size={"large"}>
                                   {
                                       record.name_synonyms ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                                   <b>Aliases: </b> {record.name_synonyms.split('|').join(', ')}
                                           </span> : <></>}
                                   {record.chrom_scaf ?
                                       <span
                                           style={{
                                               margin: 20,
                                           }}
                                       >
                                           <b>Chromosome </b>  {`${record.chrom_scaf}: ${record.start}-${record.end}`}
                                       </span> : <></>}
                                   {
                                       record.strand ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                   <b>Strand:</b> {record.strand ==='1'? '+':'-'}
                                           </span> : <></>
                                   }
                                   {
                                       record.version ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                   <b>Gene Version:</b> {record.version}
                                           </span> : <></>
                                   }
                               </Space>
                           ),
                           rowExpandable: (record) => record.name !== 'Not Expandable',

                       }}
                />
            </>
            :
            <div style={{height:"45vh"}}>
                <Divider />
                <span style={{fontSize:"25px",fontWeight:"bold"}}> 0 Results Found </span>
                <QuestionCircleFilled style={{fontSize:"25px",color:"#4426b0"}}/>
            </div>
    )
}