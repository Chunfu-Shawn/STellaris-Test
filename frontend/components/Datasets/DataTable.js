import {Button, Layout, Space, Table, Collapse, Checkbox, Col, Row, Input} from 'antd';
const { Search } = Input;
import React, {useRef, useState,useEffect} from 'react';
import Link from "next/link";
import {getDatasetsJSON} from './GetData.js';

const { Panel } = Collapse;
const {Content,Sider} = Layout;
const methodsOptions = ['stereo-seq', 'slide-seq', 'Visium', 'ST', 'MERFISH','DBiT-seq','Seq-Scope','RNAscope','sci-Space',
    'Space-TREX','STRS','seqFISH','seqFISH+','HCR-seqFISH','osmFISH','EASI-FISH','HybISS'];
const speciesOptions = ['Mus musculus', 'Homo sapiens'];
const organsOptions = ['brain','testis', 'Kidney','Liver','Stomach','Colon','spinal_cord'];
const pathologicalOptions = ['TRUE','FALSE'];

export default function DataTable(props) {
    const [data, setData] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({method:[],species:[],organ:[],pathological:[]});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSearched, setDataSearched] = useState(null);
    useEffect(()=> {
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
            filteredValue: filteredInfo.pathological || null,
            onFilter: (value, record) => record.pathological.includes(value),
            ellipsis: true,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            filteredValue: filteredInfo.date_published || null,
            onFilter: (value, record) => record.date_published.includes(value),
            sorter: (a, b) => a.date_published < b.date_published,
            sortOrder: sortedInfo.columnKey === 'date_published' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    // checkbox filter
    const filterChangeDataType = (checkedValues) => {
        //将filteredInfo中的属性method替换成checkedValues
        let filters = {method:checkedValues,species:filteredInfo.species,organ:filteredInfo.organ,pathological:filteredInfo.pathological}
        console.log('Various parameters', filters);
        setFilteredInfo(filters);
    };
    const filterChangeSpecies = (checkedValues) => {
        let filters = {method:filteredInfo.method,species:checkedValues,organ:filteredInfo.organ,pathological:filteredInfo.pathological}
        console.log('Various parameters', filters);
        setFilteredInfo(filters);
    };
    const filterChangeOrgan = (checkedValues) => {
        let filters = {method:filteredInfo.method,species:filteredInfo.species,organ:checkedValues,pathological:filteredInfo.pathological}
        console.log('Various parameters', filters);
        setFilteredInfo(filters);
    };
    const filterChangePathological = (checkedValues) => {
        let filters = {method:filteredInfo.method,species:filteredInfo.species,organ:filteredInfo.organ,pathological:checkedValues}
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
                data[i].method.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].species.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].organ.toString().toLowerCase().includes(value.toLowerCase())
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
            <Space align="start">
                <Sider style={{backgroundColor:'white'}}>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="Methods" key="1" style={{fontSize: '18px'}}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                onChange={filterChangeDataType}
                                //读取filteredInfo中选择的值
                                value={filteredInfo.method}
                            >
                                {methodsOptions.map( (method)=>
                                    <Row key={method} justify="start">
                                        <Checkbox value={method} style={props.checkboxStyle}>{method}</Checkbox>
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
                                value={filteredInfo.species}
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
                                onChange={filterChangeOrgan}
                                value={filteredInfo.organ}
                            >
                                {organsOptions.map( (organ)=>
                                    <Row key={organ} justify="start">
                                        <Checkbox value={organ} style={props.checkboxStyle}>{organ}</Checkbox>
                                    </Row>
                                )}
                            </Checkbox.Group>
                        </Panel>
                        <Panel header="Pathological" key="4" style={{fontSize: '18px'}}>
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                onChange={filterChangePathological}
                                value={filteredInfo.pathological}
                            >
                                {pathologicalOptions.map( (pathological)=>
                                    <Row key={pathological} justify="start">
                                        <Checkbox value={pathological} style={props.checkboxStyle}>{pathological}</Checkbox>
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
                    <Table columns={columns} rowSelection={rowSelection} dataSource={dataSearched||data} pagination={{position: ['bottomCenter'],}} onChange={handleChange} />
                </Content>
            </Space>
        </Layout>
    );
};