import {Button, Col, Divider, Row, Table} from "antd";
import React from "react";
import {exportToCsv} from "../util";
import {useContext} from "react";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

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
            title: 'Dataset ID',
            dataIndex: 'id',
            width:'17%',
            filters: svg.map(item =>
            {
                return{
                    text: item.id,
                    value: item.id
                }
            }),
            onFilter: (value, record) => record.section_id.indexOf(value) === 0,
        },
        {
            title: 'Section ID',
            dataIndex: 'section_id',
            width:'15%',
            filters: svg.map(item =>
            {
                return{
                    text: item.section_id,
                    value: item.section_id
                }
            }),
            onFilter: (value, record) => record.section_id.indexOf(value) === 0,
        },
        {
            title: 'Organ/Tissue',
            dataIndex: 'organ_tissue',
            width:'10%',
            filters: svg.map(item =>
            {
                return{
                    text: item.organ_tissue,
                    value: item.organ_tissue
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
        <div name={"SVE Table"} style={{marginLeft:20}}>
            <a id={"SVE Table"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="10">
                <Row gutter={[0,0]} style={{width:400}} align={"stretch"}>
                    <Col span={16}>
                        <b>Spatially Variable Expression Table</b>
                    </Col>
                    <Col span={8}>
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