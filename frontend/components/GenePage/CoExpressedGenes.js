import {Button, Col, Divider, Row, Table} from "antd";
import CoExpressedGenesHeatmap from "./CoExpressedGenesHeatmap";
import React from "react";
import {exportToCsv} from "../util";
import {useContext} from "react";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

export default function CoExpressedGenes(){
    const geneContext = useContext(GeneContext);
    const organTissue = Array.from(new Set(geneContext.dataCor.map(
        value => value.organ_tissue )))
    const genes = {}
    let rho = {}
    let supportiveDatasets = {}
    let meanRho = {}
    organTissue.forEach( item =>
        genes[item] = Array.from(new Set(geneContext.dataCor.map(item =>
        item.x_gene_symbol === geneContext.data.symbol?
            item.y_gene_symbol:item.x_gene_symbol)))
    )
    organTissue.forEach( item =>
        supportiveDatasets[item] = new Array(genes[item].length).fill(0)
    )
    // cal the number of supportive datasets and record the rho
    geneContext.dataCor.forEach(item=>{
        if(item.x_gene_symbol===geneContext.data.symbol) {
            supportiveDatasets[item.organ_tissue][genes[item.organ_tissue].indexOf(item.y_gene_symbol)] += 1
            rho[item.y_gene_symbol] === undefined ?
                rho[item.y_gene_symbol] = [item.pearson_rho] : rho[item.y_gene_symbol].push(item.pearson_rho)
        }
        else if(item.y_gene_symbol===geneContext.data.symbol) {
            supportiveDatasets[item.organ_tissue][genes[item.organ_tissue].indexOf(item.x_gene_symbol)] += 1
            rho[item.x_gene_symbol] === undefined ?
                rho[item.x_gene_symbol] = [item.pearson_rho] : rho[item.x_gene_symbol].push(item.pearson_rho)
        }
    })
    // calculate the mean rho of Pearson
    Object.keys(rho).forEach( key => {
        let sum = rho[key].reduce((previous, current) => current += previous);
        let avg = sum / rho[key].length;
        meanRho[key] = avg
    })
    // sort gene names and number of supportive datasets by Pearson rho in descend
    organTissue.forEach( item => {
        const max = genes[item].length - 1;
        for (let j = 0; j < max; j++) {
        // 声明一个变量，作为标志位
        let done = true;
        for (let i = 0; i < max - j; i++) {
            if (meanRho[genes[item][i]] < meanRho[genes[item][i + 1]]) {
                let tempGene = genes[item][i];
                let tempNum = supportiveDatasets[item][i];
                genes[item][i] = genes[item][i + 1];
                supportiveDatasets[item][i] = supportiveDatasets[item][i + 1];
                genes[item][i + 1] = tempGene;
                supportiveDatasets[item][i + 1] = tempNum;
                done = false;
            }
        }
        if (done) {
            break;
        }
    }})
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
            onFilter: (value, record) => record.x_gene_symbol.indexOf(value) === 0,
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
            onFilter: (value, record) => record.y_gene_symbol.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'ρ (pearson)',
            dataIndex: 'pearson_rho',
            width:'12%',
            sorter: (a, b) => a.pearson_rho - b.pearson_rho,
            defaultSortOrder: 'descend',
        },
        {
            title: 'P-value (Pearson)',
            dataIndex: 'pearson_p_value',
            width:'12%',
            sorter: (a, b) => a.pearson_rho - b.pearson_rho,
        },
        {
            title: 'ρ (Spearman)',
            dataIndex: 'spearman_rho',
            width:'12%',
            sorter: (a, b) => a.spearman_rho - b.spearman_rho,
        },
        {
            title: 'P-value (Spearman)',
            dataIndex: 'spearman_p_value',
            width:'12%',
            sorter: (a, b) => a.spearman_p_value - b.spearman_p_value,
        },
        {
            title: 'Organ/tissue',
            dataIndex: 'organ_tissue',
            width:'10%',
            filters: organTissue.map(value =>
                {
                    return{
                        text: value,
                        value: value
                    }
                }
            ),
            onFilter: (value, record) => record.organ_tissue.indexOf(value) === 0,
        },
        {
            title: 'Datasets ID',
            dataIndex: 'id',
            width:'15%',
        },
    ];

    return(
        <div name={"CoE-Genes"} style={{marginLeft:20}}>
            <a id={"CoE-Genes"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0"><b>Co-expressed Genes</b></Divider>
            {organTissue.map(
                item =>
                    <CoExpressedGenesHeatmap
                        key = {item}
                        tissue={[item]}
                        genes={genes[item].slice(0,20)}
                        supportiveDatasets={supportiveDatasets[item].slice(0,20)}
                        meanRho={meanRho}
                    />
            )}
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
                           return {key: data.x_gene_symbol+data.y_gene_symbol+data.section_id, ...data}
                       })}
                />
            </div>
        </div>
    )
}