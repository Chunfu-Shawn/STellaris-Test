import {Divider,List} from "antd";
import React from "react";
import {DownloadOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {downloadFile} from "../../util";
import {useContext} from "react";
import Link from "next/link";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";

export default function ResultDownload(){
    const annContext = useContext(AnnContext);
    const data = [
        {
            title: 'Reference ST Data (h5ad)',
            onClick:() => downloadFile(
                `https://rhesusbase.com:9999/h5ad_files/${annContext.reqInfo.dataset_id}/${annContext.reqInfo.section_id}.h5ad`),
            description:'Reference ST data with additional metadata, in HDF5 format, ' +
                'readable with the "anndata" Python package'
        },
        {
            title: 'Annotated scRNA-seq Data (h5ad)',
            onClick:() => downloadFile(`/api/annotation-result/h5ad/sc/${annContext.reqInfo.rid}`),
            description:'Annotated scRNA-seq data in HDF5 format, ' +
                'readable with the "anndata" Python package, whose raw data was submitted by user.'
        },
        {
            title: 'Table Results (csv)',
            onClick:() => downloadFile(`/api/annotation-result/table/${annContext.reqInfo.rid}`),
            description:'All table (csv) format result files'
        },
        {
            title: 'PDF Graph Results (pdf)',
            onClick:() => downloadFile(`/api/annotation-result/pdf/${annContext.reqInfo.rid}`),
            description:'All pdf graph result files'
        },
        {
            title: 'All Result Files',
            onClick:() => {
                downloadFile(`/api/annotation-result/all/${annContext.reqInfo.rid}`)
            },
            description:'Download all result files in zip'
        }
    ];
    return(
        <div name={"Download"}>
            <a id={"Download"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <span style={{fontSize:22}}>Result Files Download </span>
                <Link href={'/help/manual/annotation#download'}>
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
                            avatar={<DownloadOutlined style={{fontSize:18}}/>}
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