import React from "react";
import {Tooltip, Tree} from 'antd';
import {QuestionCircleOutlined} from "@ant-design/icons";
import {downloadFile} from "../../util";
const { DirectoryTree } = Tree;

export default function FliesTree(props){
    const treeData = [
        {
            title: 'h5ad files',
            key: 'h5ad_files',
            selectable: false,
            disableCheckbox: true,
            children: props.sections_id.map( item => {
                return (
                    {
                        title: `${item}.h5ad`,
                        key: `${item}.h5ad`,
                        isLeaf: true,
                    })
                }
            )
        },
        /*{
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
        },*/
    ];
    const onSelect = (key, info) => {
        const sectionID = key[0].split(".")[0]
        downloadFile(`https://rhesusbase.com:9999/h5ad_files/${props.st_id}/${sectionID}/${sectionID}.h5ad`)
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
        />
    )
}