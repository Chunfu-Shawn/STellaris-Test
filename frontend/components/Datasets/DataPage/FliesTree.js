import React from "react";
import { Tree } from 'antd';
const { DirectoryTree } = Tree;
const treeData = [
    {
        title: 'anndata-zarr',
        key: '0-0',
        children: [
            {
                title: 'leaf 0-0',
                key: '0-0-0',
                isLeaf: true,
            },
            {
                title: 'leaf 0-1',
                key: '0-0-1',
                isLeaf: true,
            },
        ],
    },
    {
        title: 'raw data',
        key: '0-1',
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

export default function FliesTree(){
    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };

    const onExpand = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return(
        <DirectoryTree
            style={{fontSize:18}}
            height={400}
            multiple
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
        />
    )
}