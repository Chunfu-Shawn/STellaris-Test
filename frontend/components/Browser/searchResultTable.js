import {Divider, Space, Table, Tag} from "antd";
import {useState} from "react";
import {QuestionCircleOutlined,QuestionCircleFilled} from "@ant-design/icons";
import Link from "next/link.js";
import {useRouter} from "next/router.js";

export default function SearchResultTable(props){
    const router = useRouter()
    const [sortedInfo, setSortedInfo] = useState({});
    const columns =[
        {
            title: 'HGNC Symbol',
            dataIndex: 'gene_name',
            key: 'gene_name',
            render: (text) => text!=="-" ? <Link href={'/genePage/'+text}><a target={"_blank"}>{text}</a></Link>:"-",
            width:'15%',
            sorter: (a, b) => {
                if(a.gene_name > b.gene_name) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'gene_name' ? sortedInfo.order : null,
        },
        {
            title: 'Ensembl ID',
            dataIndex: 'gene_id',
            key: 'gene_id',
            width:'20%',
            sorter: (a, b) => {
                if(a.gene_id > b.gene_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'gene_id' ? sortedInfo.order : null,
        },
        {
            title: 'Entrez ID',
            dataIndex: 'gene_entrez_id',
            key: 'gene_entrez_id',
            width:'15%',
            sorter: (a, b) => {
                if(a.gene_entrez_id > b.gene_entrez_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'gene_entrez_id' ? sortedInfo.order : null,
        },
        {
            title: () => {
                return <Space>
                    <span>Gene type</span>
                    <Link href={'/help/features/browser'} target={'_blank'}><QuestionCircleOutlined style={{fontSize:"15px",color:"purple"}}/></Link>
                </Space>
            },
            dataIndex: 'gene_biotype',
            key: 'gene_biotype',
            width:'20%',
            sortOrder: sortedInfo.columnKey === 'gene_biotype' ? sortedInfo.order : null,
            render: (_,{gene_biotype}) => {
                let color = ''
                switch(gene_biotype)
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
                    <Tag color={color} key={gene_biotype}>
                        {gene_biotype.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            width: '20%',
            filters: [
                {
                    text: 'Homo_sapiens',
                    value: 'Homo_sapiens',
                },
                {
                    text: 'Mus_musculus',
                    value: 'Mus_musculus',
                },],
            onFilter: (value, record) => record.species.indexOf(value) === 0,
        },
        /*{
            title: '',
            dataIndex: 'gene_id',
            key: 'more',
            width:'10%',
            render: (text) => text!=="-" ? <Link href={'/genePage/'+text}><a target={"_blank"}>more</a></Link>:"-",
        },*/
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
                                   {record.chromosome ?
                                       <span
                                           style={{
                                               margin: 20,
                                           }}
                                       >
                               <b>Chromosome:</b> {record.chromosome}
                           </span> : <></>}
                                   {
                                       record.strand ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                   <b>Strand:</b> {record.strand}
                           </span> : <></>
                                   }
                                   {
                                       record.start ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                   <b>Start:</b> {record.start}
                           </span> : <></>
                                   }
                                   {
                                       record.end ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                   <b>End:</b> {record.end}
                           </span> : <></>
                                   }
                                   {
                                       record.gene_version ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                   <b>Gene Version:</b> {record.gene_version}
                           </span> : <></>
                                   }
                                   {
                                       record.gene_source ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                               <b>Gene Source:</b> {record.gene_source}
                           </span> : <></>
                                   }
                               </Space>
                           ),
                           rowExpandable: (record) => record.name !== 'Not Expandable',

                       }}
                       onRow={ record => {
                           return {
                               onClick: event => {
                                   router.push({
                                   pathname: `http://localhost:3000/genePage`,
                                   query: {
                                       geneName: record.gene_name
                                   },
                               })}, // 点击行
                           };
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