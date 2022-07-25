import {Button, Layout, Space, Table, Collapse, Checkbox, Col, Row, Input} from 'antd';
const { Search } = Input;
import React, {useRef, useState,useEffect} from 'react';
import Link from "next/link";
import {getDatasetsJSON} from './GetData.js';
import FilterToolbar from "./FilterToolbar";

const { Panel } = Collapse;
const {Content,Sider} = Layout;

export default function DataTable(props) {
    const [data, setData] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({method:[],species:[],organ:[],pathological:[],date_published:[]});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtering, setFiltering] = useState(false);
    const [dataShow, setDataShow] = useState([]);
    useEffect(()=> {
        // 获取后端JSON数据表
            getDatasetsJSON(setData).catch(e => console.log(e))
        },[data])
    // column sort
    const handleChange = (pagination,filter,sorter) => {
        console.log('Various parameters', pagination, filter, sorter);
        setSortedInfo(sorter);
    };
    // bottom
    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const setIDSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'st_id',
        });
    };

    const columns = [
        {
            title: 'ST ID',
            dataIndex: 'st_id',
            key: 'st_id',
            render: text => <Link href={text}><a>{text}</a></Link>,
            sorter: (a, b) => a.st_id < b.st_id,
            sortOrder: sortedInfo.columnKey === 'st_id' ? sortedInfo.order : null,
            ellipsis: true,
            //...getColumnSearchProps('st_id')
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width:'11%',
            filteredValue: filteredInfo.method || null,
            onFilter: (value, record) => record.method.includes(value),
            sorter: (a, b) => a.method < b.method,
            sortOrder: sortedInfo.columnKey === 'method' ? sortedInfo.order : null,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            filteredValue: filteredInfo.species || null,
            onFilter: (value, record) => record.species.includes(value),
            sorter: (a, b) => a.species < b.species,
            sortOrder: sortedInfo.columnKey === 'species' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Strain',
            dataIndex: 'strain',
            key: 'strain',
            width:'10%',
            filteredValue: filteredInfo.strain || null,
            onFilter: (value, record) => record.strain.includes(value),
            sorter: (a, b) => a.strain < b.strain,
            sortOrder: sortedInfo.columnKey === 'strain' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Organ',
            dataIndex: 'organ',
            key: 'organ',
            filteredValue: filteredInfo.organ || null,
            onFilter: (value, record) => record.organ.includes(value),
            sorter: (a, b) => a.organ < b.organ,
            sortOrder: sortedInfo.columnKey === 'organ' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Tissue',
            dataIndex: 'tissue',
            key: 'tissue',
            filteredValue: filteredInfo.tissue || null,
            onFilter: (value, record) => record.tissue.includes(value),
            sorter: (a, b) => a.tissue < b.tissue,
            sortOrder: sortedInfo.columnKey === 'tissue' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Pathological',
            dataIndex: 'pathological',
            key: 'pathological',
            width:'10%',
            filteredValue: filteredInfo.pathological || null,
            onFilter: (value, record) => record.pathological.includes(value),
            ellipsis: true,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            filteredValue: filteredInfo.date_published || null,
            // value
            onFilter: (value, record) => {
                let arr = value.split('-');
                return arr[0] <= Date.parse(record.date_published) && arr[1] >= Date.parse(record.date_published);
            },
            sorter: (a, b) => a.date_published < b.date_published,
            sortOrder: sortedInfo.columnKey === 'date_published' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];


    // to select some rows
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    // export table to csv or excel
    const exportTo = () => {
        setLoading(true); // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    // To search in table
    const onSearch = (value) => {
        let dataSearched = []
        //let dataTemp = filtering ? dataShow : data
        for (let i in dataTemp){
            if(
                dataTemp[i].st_id.toString().toLowerCase().includes(value.toLowerCase())||
                dataTemp[i].method.toString().toLowerCase().includes(value.toLowerCase())||
                dataTemp[i].species.toString().toLowerCase().includes(value.toLowerCase())||
                dataTemp[i].organ.toString().toLowerCase().includes(value.toLowerCase())
            )
            {
                dataSearched.push(dataTemp[i])
            }
        }
        setDataShow(dataSearched)
        console.log(dataSearched)
    }
    // To search in table when input search bar lost the focus
    const onSearchClick = (e)=>{
        onSearch(e.target.value)
    }

    return (
        <Layout style={{backgroundColor:'white'}}>
            <Space align="start">
                <Sider style={{backgroundColor:'white'}}>
                    <FilterToolbar filteredInfo={filteredInfo}
                                   setFilteredInfo={setFilteredInfo}
                                   setDataShow={setDataShow}
                                   checkboxStyle={props.checkboxStyle}
                                   data={data}
                                   dataShow={dataShow}
                                   setFiltering={setFiltering}
                    ></FilterToolbar>
                </Sider>
                <Content>
                    <Space align="center" style={{height:'8vh',float:"left"}}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            onSearch={onSearch}
                            onBlur={onSearchClick}
                            size={'large'}
                            style={{
                                width: '65vh',
                            }}
                        />
                        <Button onClick={setIDSort}>Sort ST ID</Button>
                        <Button onClick={clearFilters}>Clear filters</Button>
                        <Button onClick={clearAll}>Clear filters and sorters</Button>
                        <Button type="primary" onClick={exportTo} disabled={!hasSelected} loading={loading}>
                            Export
                        </Button>
                        <span>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                    </Space>
                    <Table columns={columns}
                           rowSelection={rowSelection}
                           dataSource={filtering ? dataShow : data}
                           pagination={{position: ['bottomCenter'],}}
                           onChange={handleChange}
                           summary={(mergeData) => {
                               let num = {};
                               mergeData.forEach(({ method }) => {
                                   if (num[method]===undefined)
                                   num[method] = 1;
                                   else num[method] += 1;
                               });
                               return (
                                   <>
                                       <Table.Summary.Row>
                                           <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                                           <Table.Summary.Cell index={0}>{num['ST']}</Table.Summary.Cell>
                                       </Table.Summary.Row>
                                   </>
                               );
                           }}
                    />
                </Content>
            </Space>
        </Layout>
    );
};