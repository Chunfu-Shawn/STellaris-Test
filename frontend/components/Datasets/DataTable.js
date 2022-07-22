import {Button, Layout, Space, Table, Collapse, Checkbox, Col, Row, Input} from 'antd';
const { Search } = Input;
import React, {useRef, useState} from 'react';
import Link from "next/link";
import {data} from './GetData.js';
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';

const { Panel } = Collapse;
const {Content,Sider} = Layout;
const dataTypesOptions = ['Stereo-seq', 'Slide-seq', 'Visium', 'ST', 'MERFISH'];
const speciesOptions = ['Mouse', 'Human'];
const organsOptions = ['Brain', 'Kidney','Liver','Stomach','Colon'];

export default function DataTable(props) {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [checkedList, setCheckedList] = useState({data_types:[],species:[],organs:[]});
    const [loading, setLoading] = useState(false);
    const [dataSearched, setDataSearched] = useState(null);
    // column sort
    const handleChange = (pagination,filter,sorter) => {
        console.log('Various parameters', pagination, filter, sorter);
        setSortedInfo(sorter);
    };
    // bottom
    const clearFilters = () => {
        setCheckedList([]);
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
            title: 'Data Types',
            dataIndex: 'data_types',
            key: 'data_types',
            width: '15%',
            filteredValue: filteredInfo.data_types || null,
            onFilter: (value, record) => record.data_types.includes(value),
            sorter: (a, b) => a.data_types < b.data_types,
            sortOrder: sortedInfo.columnKey === 'data_types' ? sortedInfo.order : null,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            width: '15%',
            filteredValue: filteredInfo.species || null,
            onFilter: (value, record) => record.species.includes(value),
            sorter: (a, b) => a.species < b.species,
            sortOrder: sortedInfo.columnKey === 'species' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Organs',
            dataIndex: 'organs',
            key: 'organs',
            width: '15%',
            filteredValue: filteredInfo.organs || null,
            onFilter: (value, record) => record.organs.includes(value),
            sorter: (a, b) => a.organs < b.organs,
            sortOrder: sortedInfo.columnKey === 'organs' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    // checkbox filter
    const filterChangeDataType = (checkedValues) => {
        //将checkedList中的属性data_type替换成checkedValues
        let list = {data_types:checkedValues,species:checkedList.species,organs:checkedList.organs}
        setCheckedList(list);
        //将filteredInfo中的属性data_type替换成checkedValues
        let filters = {data_types:checkedValues,species:filteredInfo.species,organs:filteredInfo.organs}
        console.log('Various parameters', filters);
        setFilteredInfo(filters);
    };
    const filterChangeSpecies = (checkedValues) => {
        let list = {data_types:checkedList.data_types,species:checkedValues,organs:checkedList.organs}
        setCheckedList(list);
        let filters = {data_types:filteredInfo.data_types,species:checkedValues,organs:filteredInfo.organs}
        console.log('Various parameters', filters);
        setFilteredInfo(filters);
    };
    const filterChangeOrgans = (checkedValues) => {
        let list = {data_types:checkedList.data_types,species:checkedList.species,organs:checkedValues}
        setCheckedList(list);
        let filters = {data_types:filteredInfo.data_types,species:filteredInfo.species,organs:checkedValues}
        console.log('Various parameters', filters);
        setFilteredInfo(filters);
    };


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
        for (let i in data){
            if(
                data[i].st_id.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].data_types.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].species.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].organs.toString().toLowerCase().includes(value.toLowerCase())
            )
            {
                dataSearched.push(data[i])
            }
        }
        setDataSearched(dataSearched)
        console.log(dataSearched)
    }
    // To search in table when input search bar lost the focus
    const onSearchClick = (e)=>{
        onSearch(e.target.value)
    }

    return (
        <Layout style={{backgroundColor:'white'}}>
            <Space>
                <Sider style={{backgroundColor:'white'}}>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="Data Types" key="1" style={{fontSize: '18px'}}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                onChange={filterChangeDataType}
                                //读取checkedList中选择的值
                                value={checkedList.data_types}
                            >
                                {dataTypesOptions.map( (data_type)=>
                                    <Row key={data_type} justify="start">
                                        <Checkbox value={data_type} style={props.checkboxStyle}>{data_type}</Checkbox>
                                    </Row>
                                )}
                            </Checkbox.Group>
                        </Panel>
                        <Panel header="Species" key="2" style={{fontSize: '18px'}}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                onChange={filterChangeSpecies}
                                value={checkedList.species}
                            >
                                {speciesOptions.map( (species)=>
                                    <Row key={species} justify="start">
                                        <Checkbox value={species} style={props.checkboxStyle}>{species}</Checkbox>
                                    </Row>
                                )}
                            </Checkbox.Group>
                        </Panel>
                        <Panel header="Organ" key="3" style={{fontSize: '18px'}}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                onChange={filterChangeOrgans}
                                value={checkedList.organs}
                            >
                                {organsOptions.map( (organ)=>
                                    <Row key={organ} justify="start">
                                        <Checkbox value={organ} style={props.checkboxStyle}>{organ}</Checkbox>
                                    </Row>
                                )}
                            </Checkbox.Group>
                        </Panel>
                    </Collapse>
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
                                width: '68vh',
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
                    <Table columns={columns} rowSelection={rowSelection} dataSource={dataSearched||data} pagination={{position: ['bottomCenter'],}} onChange={handleChange} />
                </Content>
            </Space>
        </Layout>
    );
};