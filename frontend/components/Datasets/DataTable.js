import {Button, Layout, Space, Table, Collapse, Checkbox, Col, Row, Input, Tooltip} from 'antd';
const { Search } = Input;
import React, {useRef, useState,useEffect} from 'react';
import Link from "next/link";
import {getDatasetsJSON} from './GetData.js';
import FilterToolbar, {
    methodsOptions,
    methodsOptions2,
    organsOptions,
    pathologicalOptions,
    speciesOptions
} from "./FilterToolbar";

const { Panel } = Collapse;
const {Content,Sider} = Layout;

export default function DataTable(props) {
    const [data, setData] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({method:[],species:[],organ:[],pathological:[],date_published:[]});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtering, setFiltering] = useState(false);
    const [dataFilter, setDataFilter] = useState([]);
    const [searching, setSearching] = useState(false);
    const [dataSearch, setDataSearch] = useState([]);
    const [dataShow, setDataShow] = useState([]);
    const [num, setNum] = useState({method:{},species:{},organ:{},pathological:{}});
    useEffect(()=> {
        // 获取后端JSON数据表
            getDatasetsJSON(setData).catch(e => console.log(e))
            toSetDataShow()
            summaryDatasets(dataShow)
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
            width:'22%',
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
            width:'10%',
            sorter: (a, b) => a.method < b.method,
            sortOrder: sortedInfo.columnKey === 'method' ? sortedInfo.order : null,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            sorter: (a, b) => a.species < b.species,
            sortOrder: sortedInfo.columnKey === 'species' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Strain',
            dataIndex: 'strain',
            key: 'strain',
            width:'8%',
            render: (strain) => (
                <Tooltip placement="topLeft" title={strain}>
                    {strain}
                </Tooltip>
            ),
            sorter: (a, b) => a.strain < b.strain,
            sortOrder: sortedInfo.columnKey === 'strain' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Organ',
            dataIndex: 'organ',
            key: 'organ',
            width:'8%',
            render: (organ) => (
                <Tooltip placement="topLeft" title={organ}>
                    {organ}
                </Tooltip>
            ),
            sorter: (a, b) => a.organ < b.organ,
            sortOrder: sortedInfo.columnKey === 'organ' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Tissue',
            dataIndex: 'tissue',
            key: 'tissue',
            width:'10%',
            render: (tissue) => (
                <Tooltip placement="topLeft" title={tissue}>
                    {tissue}
                </Tooltip>
            ),
            sorter: (a, b) => a.tissue < b.tissue,
            sortOrder: sortedInfo.columnKey === 'tissue' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Pathological',
            dataIndex: 'pathological',
            key: 'pathological',
            width:'10%',
            ellipsis: true,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
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
        // 如果有搜索值，设置filtering为true
        if(value.length!==0) setSearching(true)
        else setSearching(false)
        //search
        let dataSearched = []
        for (let i in data){
            if(
                data[i].st_id.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].method.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].species.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].strain.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].organ.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].tissue.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].pathological.toString().toLowerCase().includes(value.toLowerCase())||
                data[i].date_published.toString().toLowerCase().includes(value.toLowerCase())
            )
            {
                dataSearched.push(data[i])
            }
        }
        setDataSearch(dataSearched)
        console.log('dataSearched',dataSearched)
    }
    // To search in table when input search bar lost the focus
    const onSearchClick = (e)=>{
        onSearch(e.target.value)
    }

    // show data intersected from dataFilter and dataSearch
    const toSetDataShow = () =>{
        let dataShow = []
        if (filtering){
            if (searching){
                for (let i = 0, len = dataFilter.length; i < len; i++) {
                    for (let j = 0, length = dataSearch.length; j < length; j++) {
                        if (dataFilter[i].key === dataSearch[j].key) {
                            dataShow.push(dataFilter[i])
                        }
                    }
                }
            }else dataShow = dataFilter
        }else if (searching){
            dataShow = dataSearch
        }else dataShow = data
        setDataShow(dataShow)
    }
    // to summary the number of different categories records
    const summaryDatasets = (dataTemp) => {
        let num ={}
        num['method'] = {}
        num['species'] = {}
        num['organ'] = {}
        num['pathological'] = {}
        num['date_published'] = {}
        // numDatePublished.map(item=>num['date_published'][item]=0)
        for(let i in dataTemp){
            num['method'][dataTemp[i].method]===undefined?
                num['method'][dataTemp[i].method] = 1 : num['method'][dataTemp[i].method] += 1
            num['species'][dataTemp[i].species]===undefined?
                num['species'][dataTemp[i].species] = 1 : num['species'][dataTemp[i].species] +=1
            num['organ'][dataTemp[i].organ] === undefined?
                num['organ'][dataTemp[i].organ] = 1 : num['organ'][dataTemp[i].organ] += 1
            num['pathological'][dataTemp[i].pathological] === undefined?
                num['pathological'][dataTemp[i].pathological] = 1 : num['pathological'][dataTemp[i].pathological] += 1
        }
        setNum(num)
    }

    return (
        <Layout style={{backgroundColor:'white'}}>
            <Space align="start">
                <Sider style={{backgroundColor:'white'}}>
                    <FilterToolbar filteredInfo={filteredInfo}
                                   setFilteredInfo={setFilteredInfo}
                                   checkboxStyle={props.checkboxStyle}
                                   data={data}
                                   setDataFilter={setDataFilter}
                                   setFiltering={setFiltering}
                                   filtering={filtering}
                                   searching={searching}
                                   num={num}
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
                           dataSource={searching||filtering?dataShow:data}
                           onChange={handleChange}
                           //footer={()=>dataShow.length+' Results Found'}
                    />
                    <span style={{float:"right",fontSize:"16px",color:"gray"}}>{dataShow.length} Results Found</span>
                </Content>
            </Space>
        </Layout>
    );
};