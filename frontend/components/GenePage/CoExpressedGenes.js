import {Button, Col, Collapse, Divider, Modal, Row, Table} from "antd";
import CoExpressedGenesHeatmap from "./CoExpressedGenesHeatmap";
import React from "react";
import {exportToCsv} from "../util";
import {useContext} from "react";
import {GeneContext} from "../../pages/browser/genePage/[gene_id]";

const { Panel } = Collapse;

export default function CoExpressedGenes(){
    const geneContext = useContext(GeneContext);
    const columns = [
        {
            title: 'Gene Name',
            dataIndex: 'x_gene_symbol',
            width:'12%',
            filters: geneContext.dataCor.map(value =>
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
            filters: geneContext.dataCor.map(value =>
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
            onFilter: (value, record) => record.name.indexOf(value) === 0,
        },
    ];

    return(
        <div name={"CoE-Genes"} style={{marginLeft:20}}>
            <a id={"CoE-Genes"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0"><b>Co-expressed Genes</b></Divider>
            <CoExpressedGenesHeatmap
                tissue={["Brain"]}
                genes={[
                    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a', '10a', '11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'
                ]}
                supportiveDatasets={[5,10,20,12,12,1,4,6,8,3,1,9,2,14,21,16,18,19,2,12,5,5,12,3]}
            />
            <CoExpressedGenesHeatmap
                tissue={["Heart"]}
                genes={[
                    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a', '10a', '11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'
                ]}
                supportiveDatasets={[2,10,2,13,12,1,9,6,3,3,1,9,2,14,14,16,1,1,2,2,5,5,2,3]}
            />
            <CoExpressedGenesHeatmap
                tissue={["Liver"]}
                genes={[
                    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a', '10a', '11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'
                ]}
                supportiveDatasets={[15,1,2,2,2,6,6,3,9,1,2,10,12,14,11,19,1,9,12,2,13,11,2,13]}
            />
            <div style={{marginLeft:20}}>
                <Divider orientation="left" orientationMargin="10" dashed>
                    <Row gutter={[100,0]} style={{width:"auto"}}>
                        <Col span={16}>
                            <small><b>Correlation coefficient</b></small>
                        </Col>
                        <Col span={8}>
                            <Button size={"small"}
                                    onClick={() => exportToCsv(geneContext.dataCor,`${geneContext.data.symbol}_coexpressed_genes`)}
                                    style={{float:"right"}}>
                                Export to CSV
                            </Button>
                        </Col>
                    </Row>
                </Divider>
                <Table bordered
                       columns={columns}
                       size={"small"}
                       dataSource={geneContext.dataCor.map(data => {
                           return {key: data.x_gene_symbol+data.y_gene_symbol+data.duplicate_id, ...data}
                       })}
                />
            </div>
        </div>
    )
}