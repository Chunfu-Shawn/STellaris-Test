import React from "react";
import {Tooltip, Tree} from 'antd';
import {QuestionCircleOutlined} from "@ant-design/icons";
import Link from "next/link";
const { DirectoryTree } = Tree;

export default function FliesTree(props){
    const treeData = [
        {
            title: 'h5ad files',
            key: 'h5ad_files',
            selectable: false,
            disableCheckbox: true,
            children: props.duplicates_id.map( item => {
                return (
                    {
                        title: `${item}.h5ad`,
                        key: `${item}.h5ad`,
                        isLeaf: true,
                    })
                }
            )
        },
        {
            title: 'raw data',
            key: 'raw_data',
            selectable: false,
            disableCheckbox: true,
            children: [
                {
                    title: 'leaf 1-0',
                    key: '0-1-0',
                    isLeaf: true,
                },
                {
                    title: 'leaf 1-1',
                    key: '0-1-1',
                    isLeaf: true,
                },
            ],
        },
    ];
    const onSelect = (key, info) => {
        window.open(`https://rhesusbase.com:9999/h5ad_files/${props.st_id}/${key}`)
        console.log('Trigger Select', key, info);
    };

    const onExpand = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return(
        <DirectoryTree
            style={{fontSize:18}}
            height={400}
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
            titleRender={(data)=>{
                if(data.key === 'h5ad_files'){
                    return(
                        <span>{data.title+" "}
                            <Tooltip
                                title="Normalized gene expression with additional metadata, in HDF5 format,
                                readable with the 'anndata' Python package">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    )
                }else if(data.key === 'raw_data'){
                    return(
                        <span>{data.title+" "}
                            <Tooltip
                                title="Raw data, mainly in matrix, barcodes and features format">
                                <QuestionCircleOutlined/>
                            </Tooltip>
                        </span>
                    )
                }else {
                    return(
                        <span>{data.title}</span>
                    )
                }
            }}
        />
    )
}