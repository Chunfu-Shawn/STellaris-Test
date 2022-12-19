import {Divider,List} from "antd";
import React from "react";
import {DownloadOutlined} from "@ant-design/icons";
import {downloadFile, exportToCsv} from "../util";
import {useContext} from "react";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

export default function Download(){
    const geneContext = useContext(GeneContext);
    const data = [
        {
            title: 'Gene Summary (JSON)',
            onClick:()=> window.open(`/api/gene/${geneContext.data.ensembl_id}`),
            description:'Summary of the gene in JSON format.'
        },
        {
            title: 'Gene Transcripts (CSV)',
            onClick:()=>exportToCsv(geneContext.trans,`${geneContext.data.symbol}_transcripts`),
            description:'Transcript information of the gene from Ensembl database.'
        },
        {
            title: 'Spatially Variable Expression (CSV)',
            onClick:()=>exportToCsv(geneContext.dataSV,`${geneContext.data.symbol}_spatially_variable_expression`),
            description:'Spatially variable expression records including gene name, datasets id, section id,' +
                ' organ/tissue, scan, P-value and Q-value in CSV format.'
        },
        {
            title: 'Expression Rank Score (CSV)',
            onClick:()=>exportToCsv(geneContext.dataER,`${geneContext.data.symbol}_expression_rank_score`),
            description:'Expression Rank Score of the gene which is defined as the percentile of log(CPM) in CSV format.'
        },
    ];
    // whether gene is a spatially variable gene
    if(geneContext.dataSV.length === 0) data.splice(2,1)
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
                            title={<a onClick={item.onClick}>{item.title}</a>}
                            description={item.description}
                            onClick={item.click}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}