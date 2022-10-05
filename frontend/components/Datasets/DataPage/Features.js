import {Divider, Table} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";
import {toNonExponential} from "../../util";

export default function Features(props){
    const SVGeneColumns = [
        {
            title: 'Gene Name',
            dataIndex: 'gene_symbol',
            width:'12%',
            filters: props.spatiallyVariableGenes.map(value =>
                {
                    return{
                        text: value.gene_symbol,
                        value: value.gene_symbol
                    }
                }),
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
            title: 'P-Value',
            dataIndex: 'p_value',
            width:'12%',
            sorter: (a, b) => a.p_value - b.p_value,
        },
        {
            title: 'Q-Value',
            dataIndex: 'q_value',
            width:'12%',
            sorter: (a, b) => a.q_value - b.q_value,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Span',
            dataIndex: 'span',
            width:'10%',
            sorter: (a, b) => a.span - b.span,
        },
        {
            title: 'Duplicate ID',
            dataIndex: 'duplicate_id',
            width:'15%',
            filters: props.duplicateOption.map(value =>
            {
                return{
                    text: value,
                    value: value
                }
            }),
            onFilter: (value, record) => record.duplicate_id.indexOf(value) === 0,
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
            width:'12%',
            filters: props.genesExpressionCorrelation.map(value =>
            {
                return{
                    text: value.x_gene_symbol,
                    value: value.x_gene_symbol
                }
            }),
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'Gene Name',
            dataIndex: 'y_gene_symbol',
            width:'12%',
            filters: props.genesExpressionCorrelation.map(value =>
            {
                return{
                    text: value.y_gene_symbol,
                    value: value.y_gene_symbol
                }
            }),
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'ρ (pearson)',
            dataIndex: 'pearson_rho',
            width:'15%',
            sorter: (a, b) => a.pearson_rho - b.pearson_rho,
            defaultSortOrder: 'descend',
        },
        {
            title: 'P-value (Pearson)',
            dataIndex: 'pearson_p_value',
            width:'15%',
            sorter: (a, b) => a.pearson_rho - b.pearson_rho,
        },
        {
            title: 'ρ (Spearman)',
            dataIndex: 'spearman_rho',
            width:'15%',
            sorter: (a, b) => a.spearman_rho - b.spearman_rho,
        },
        {
            title: 'P-value (Spearman)',
            dataIndex: 'spearman_p_value',
            width:'15%',
            sorter: (a, b) => a.spearman_p_value - b.spearman_p_value,
        },
        {
            title: 'Duplicate ID',
            dataIndex: 'duplicate_id',
            width:'15%',
            filters: props.duplicateOption.map(value =>
            {
                return{
                    text: value,
                    value: value
                }
            }),
            onFilter: (value, record) => record.name.indexOf(value) === 0,
        },
    ];
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
                    <Table columns={SVGeneColumns}
                           dataSource={props.spatiallyVariableGenes}
                           size={"small"}
                           bordered={true}
                    />
                </div>
                <Divider orientation="left" orientationMargin="0" dashed>
                    <span style={{fontSize:18}}>Co-Expressed Genes</span>
                </Divider>
                <div style={{overflow:"scroll"}}>
                    <Table columns={CEGeneColumns}
                           dataSource={props.genesExpressionCorrelation}
                           size={"small"}
                           bordered={true}
                    />
                </div>
            </div>
        </div>
    )
}