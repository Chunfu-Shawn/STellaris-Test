import {Divider,List} from "antd";
import React from "react";
import {DownloadOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {exportToCsv} from "../../util";
import {useContext} from "react";
import Link from "next/link";

export default function ResultDownload(){
    const data = [
        {
            title: 'Reference ST Data (h5ad)',
            url: `/api/gene/`,
            onClick:()=>void (0),
            description:'Reference ST data with additional metadata, in HDF5 format, ' +
                'readable with the "anndata" Python package'
        },
        {
            title: 'Annotated scRNA-seq Data (h5ad)',
            url: `#`,
            onClick:()=>void (0),
            description:'Annotated scRNA-seq data in HDF5 format, ' +
                'readable with the "anndata" Python package, whose raw data was submitted by user.'
        },
        {
            title: 'Co-localization Assessment',
            url: `#`,
            onClick:()=>exportToCsv(geneContext.dataCor,`${geneContext.data.symbol}_pseudobulk_RNA-seq_expression`),
            description:'Co-localization Assessment'
        }
    ];
    return(
        <div name={"Download"}>
            <a id={"Download"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <span style={{fontSize:18}}>Result Files Download </span>
                <Link href={'/help/manual/datasets#data_page_attributes'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
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