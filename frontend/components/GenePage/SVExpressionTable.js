import {Button, Col, Divider, Row, Table} from "antd";
import React from "react";
import {exportToCsv} from "../util";
import {useContext} from "react";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";
import Link from "next/link";

export default function SVExpressionTable(){
    const geneContext = useContext(GeneContext);
    const svg = geneContext.dataSV

    const columns = [
        {
            title: 'Gene Name',
            dataIndex: 'gene_symbol',
            width:'10%',
        },
        {
            title: 'ST ID',
            dataIndex: 'id',
            width:'17%',
            filters: Array.from(new Set(svg.map(item=>item.id))).map(item =>
            {
                return{
                    text: item,
                    value: item
                }
            }),
            render: text => <a href={'/datasets/dataPage/'+text} target={"_blank"} rel={'noreferrer'}>{text}</a>,
            onFilter: (value, record) => record.id.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'Section ID',
            dataIndex: 'section_id',
            width:'15%',
            filters: Array.from(new Set(svg.map(item=>item.section_id))).map(item =>
            {
                return{
                    text: item,
                    value: item
                }
            }),
            onFilter: (value, record) => record.section_id.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'Organ/Tissue',
            dataIndex: 'organ_tissue',
            width:'10%',
            filters: Array.from(new Set(svg.map(item=>item.organ_tissue))).map(item =>
            {
                return{
                    text: item,
                    value: item
                }
            }),
            onFilter: (value, record) => record.organ_tissue.indexOf(value) === 0,
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
    ];

    return(
        <div name={"Table"} style={{marginLeft:20}}>
            <a id={"Table"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="10">
                <Row gutter={[0,0]} style={{width:180}} align={"stretch"}>
                    <Col span={6}>
                        <b>Table</b>
                    </Col>
                    <Col span={18}>
                        <Button size={"small"}
                                onClick={() => exportToCsv(svg,`${geneContext.data.symbol}_spatially_variable_expression`)}
                                style={{float:"right"}}>
                            Export to CSV
                        </Button>
                    </Col>
                </Row>
            </Divider>
            <Table bordered
                   columns={columns}
                   size={"small"}
                   dataSource={svg.map(data => {
                       return {key: data.section_id, ...data}
                   })}
            />
        </div>
    )
}