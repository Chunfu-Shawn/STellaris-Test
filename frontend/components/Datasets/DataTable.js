import {Table, Tooltip} from "antd";
import React from "react";


export default function DataTable(props) {
    const columns = [
        {
            title: 'ST ID',
            dataIndex: 'st_id',
            key: 'st_id',
            width:'22%',
            render: text => <a href={'dataPage/'+text}>{text}</a>,
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            sortOrder: props.sortedInfo.columnKey === 'st_id' ? props.sortedInfo.order : null,
            ellipsis: true,
            //...getColumnSearchProps('st_id')
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width:'10%',
            sorter: (a, b) => {
                if(a.method > b.method) return 1
                else return -1
            },
            sortOrder: props.sortedInfo.columnKey === 'method' ? props.sortedInfo.order : null,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            sorter: (a, b) => {
                if(a.species > b.species) return 1
                else return -1
            },
            sortOrder: props.sortedInfo.columnKey === 'species' ? props.sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Strain',
            dataIndex: 'strain',
            key: 'strain',
            width:'8%',
            render: (strain) => ( strain !== "null" ?
                <Tooltip placement="topLeft" title={strain}>
                    {strain}
                </Tooltip>
                    : '--'
            ),
            sorter: (a, b) => {
                if(a.strain > b.strain) return 1
                else return -1
            },
            sortOrder: props.sortedInfo.columnKey === 'strain' ? props.sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Organ',
            dataIndex: 'organ',
            key: 'organ',
            width:'9%',
            render: (organ) => (
                <Tooltip placement="topLeft" title={organ}>
                    {organ}
                </Tooltip>
            ),
            sorter: (a, b) => {
                if(a.organ > b.organ) return 1
                else return -1
            },
            sortOrder: props.sortedInfo.columnKey === 'organ' ? props.sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Tissue',
            dataIndex: 'tissue',
            key: 'tissue',
            width:'10%',
            render: (tissue) => ( tissue !== ''?
                <Tooltip placement="topLeft" title={tissue}>
                    {tissue}
                </Tooltip>:
                    '--'
            ),
            sorter: (a, b) => {
                if(a.tissue > b.tissue) return 1
                else return -1
            },
            sortOrder: props.sortedInfo.columnKey === 'tissue' ? props.sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Pathological',
            dataIndex: 'pathological',
            key: 'pathological',
            width:'11%',
            ellipsis: true,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            sorter: (a, b) => Date.parse(a.date_published) - Date.parse(b.date_published),
            sortOrder: props.sortedInfo.columnKey === 'date_published' ? props.sortedInfo.order : null,
            ellipsis: true,
        },
    ];


    return(
        <>
            <Table columns={columns}
                   rowSelection={props.rowSelection}
                   dataSource={props.searching||props.filtering?props.dataShow:props.data}
                   onChange={props.handleChange}
            />
            <span style={{float:"right",fontSize:"16px",color:"gray"}}>{props.dataShow.length} Results Found</span>
        </>
    )
}