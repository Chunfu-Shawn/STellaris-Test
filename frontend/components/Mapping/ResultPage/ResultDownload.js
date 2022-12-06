import {Divider,List} from "antd";
import React from "react";
import {DownloadOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {downloadFile} from "../../util";
import {useContext} from "react";
import Link from "next/link";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";

export default function ResultDownload(){
    const annContext = useContext(AnnContext);
    const dataset_id = annContext.reqInfo.dataset_id
    const section_id = annContext.reqInfo.section_id
    const data = [
        {
            title: 'Reference ST Data (h5ad)',
            onClick:() => downloadFile(
                `https://rhesusbase.com:9999/h5ad_files/${dataset_id}/${section_id}/${section_id}.h5ad`),
            description:'Processed reference ST data in HDF5 file format containing results of spatial clustering, marker ' +
                'genes and spatially variable genes, which is compatible with “anndata” python package.'
        },
        {
            title: 'Registered scRNA-seq Data (h5ad)',
            onClick:() => downloadFile(`/api/mapping-result/h5ad/sc/${annContext.reqInfo.rid}`),
            description:'scRNA-seq with the inferred spatial coordinates in HDF5 file format, which is compatible with ' +
                '“anndata” python package.'
        },
        {
            title: 'Table Results (csv)',
            onClick:() => downloadFile(`/api/mapping-result/table/${annContext.reqInfo.rid}`),
            description:'All results in csv file format'
        },
        {
            title: 'PDF Graph Results (pdf)',
            onClick:() => downloadFile(`/api/mapping-result/pdf/${annContext.reqInfo.rid}`),
            description:'All figures in pdf file format'
        },
        {
            title: 'All Result Files',
            onClick:() => {
                downloadFile(`/api/mapping-result/all/${annContext.reqInfo.rid}`)
            },
            description:'Download all packaged results'
        }
    ];
    return(
        <div name={"Download"}>
            <a id={"Download"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <span style={{fontSize:22}}>Results Download </span>
                <Link href={'/help/manual/mapping#download'}>
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