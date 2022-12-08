import {Divider,List} from "antd";
import React from "react";
import {DownloadOutlined} from "@ant-design/icons";
import {exportToCsv} from "../util";
import {useContext} from "react";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

export default function Download(){
    const geneContext = useContext(GeneContext);
    const data = [
        {
            title: 'Gene Information (JSON)',
            url: `/api/gene/${geneContext.data.ensembl_id}`,
            onClick:()=>void (0),
            description:'Information about Summary and Genomic Context in JSON format.'
        },
        {
            title: 'Spatially Variable Expression (CSV)',
            url: `#`,
            onClick:()=>exportToCsv(geneContext.dataSV,`${geneContext.data.symbol}_spatially_variable_expression`),
            description:'Raw spatially variable expression data about gene name, gene scan, P-value, Q-value, ' +
                'section id, datasets id and organ/tissue that data derived in CSV format.'
        },
        {
            title: 'Pseudobulk RNA-seq Expression data (CSV)',
            url: `#`,
            onClick:()=>exportToCsv(geneContext.dataPseudoEr,`${geneContext.data.symbol}_pseudobulk_RNA-seq_expression`),
            description:'Pseudobulk RNA-seq Expression data for interested gene is computed from spatial transcriptome ' +
                'data stored in our database, which been normalized by RPKM in CSV format.'
        },
        {
            title: 'Gene Transcripts (CSV)',
            url: `#`,
            onClick:()=>exportToCsv(geneContext.trans,`${geneContext.data.symbol}_transcripts`),
            description:'Transcript information about this gene came from Ensembl database.'
        },
    ];
    // whether gene is a spatially variable gene
    if(geneContext.dataSV.length === 0) data.splice(1,1)
    return(
        <div name={"Download"}>
            <a id={"Download"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <b>Download </b>
            </Divider>
            <List
                itemLayout="horizontal"
                dataSource={data}
                size="small"
                bordered
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<DownloadOutlined />}
                            title={<a href={item.url} rel="noreferrer" onClick={item.onClick}>{item.title}</a>}
                            description={item.description}
                            onClick={item.click}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}