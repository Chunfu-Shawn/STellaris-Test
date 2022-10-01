import {Divider, Table} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";

const SVGeneColumns = [
    {
        title: 'Gene Name',
        dataIndex: 'gene_name',
        width:'20%',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        filterSearch: true,
    },
    {
        title: 'Ensembl ID',
        dataIndex: 'ensembl_id',
        width:'20%',
        render: (text) => <Link href={`/genePage/${text}`}><a target={'_blank'}>{text}</a></Link>,
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        filterSearch: true,
    },
    {
        title: 'Duplicate ID',
        dataIndex: 'duplicate_id',
        width:'30%',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        filterSearch: true,
    },
    {
        title: 'Main Distribution',
        dataIndex: 'main_distribution',
        width:'30%',
        wrap:true
    },
];
const CEGeneColumns = [
    {
        title: 'Gene Name',
        dataIndex: 'x_gene_symbol',
        width:'20%',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        filterSearch: true,
    },
    {
        title: 'Gene Name',
        dataIndex: 'y_gene_symbol',
        width:'15%',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        filterSearch: true,
    },
    {
        title: 'Duplicate ID',
        dataIndex: 'duplicate_id',
        width:'15%',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Category 1',
                value: 'Category 1',
            },
            {
                text: 'Category 2',
                value: 'Category 2',
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
    },
    {
        title: 'Correlation Coefficient',
        dataIndex: 'rho',
        width:'20%',
        sorter: (a, b) => a.name.length - b.name.length,
    },
    {
        title: 'P-value',
        dataIndex: 'p_value',
        width:'30%',
        sorter: (a, b) => a.name.length - b.name.length,
    },
];
const regionSpecificGenes = [
    {
        key:1,
        gene_name: 'ID2',
        ensembl_id: "ENSG00000115738",
        duplicate_id: "1",
        main_distribution: 'cluster1, cluster2, cluster3'
    }
]

export default function Features(){
    return(
        <div name={"Features"}>
            <a id={"Features"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                <span style={{fontSize:22}}>Features </span>
                <Link href={'/help/manual/datasets#data_page_features'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <div style={{marginLeft:20}}>
                <Divider orientation="left" orientationMargin="0" dashed>
                    <span style={{fontSize:18}}>Spatially Variable Genes</span>
                </Divider>
                <div style={{overflow:"scroll"}}>
                    <Table columns={SVGeneColumns} pagination={false} dataSource={regionSpecificGenes}
                           size={"middle"}
                           bordered={true}
                    />
                </div>
                <Divider orientation="left" orientationMargin="0" dashed>
                    <span style={{fontSize:18}}>Co-Expressed Genes</span>
                </Divider>
                <div style={{overflow:"scroll"}}>
                    <Table columns={CEGeneColumns} pagination={false} dataSource={null}
                           size={"middle"}
                           bordered={true}
                    />
                </div>
            </div>
        </div>
    )
}