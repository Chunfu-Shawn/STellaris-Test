import {Button, Layout, Space, Input} from 'antd';
const { Search } = Input;
import React, {useState, useEffect} from 'react';
import FilterToolbar from "./FilterToolbar";
import DataTable from "./DataTable";
const {Content,Sider} = Layout;

export default function TableLayout(props) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({method:[],species:[],organ:[],pathological:[],date_published:[]});
    const [loading, setLoading] = useState(false);
    const [filtering, setFiltering] = useState(false);
    const [dataFilter, setDataFilter] = useState(props.data);
    const [searching, setSearching] = useState(false);
    const [dataSearch, setDataSearch] = useState([]);
    const [dataShow, setDataShow] = useState([]);
    const [filterClick,setFilterClick] = useState('');
    useEffect(()=> {
            toSetDataShow()
        },[dataSearch,dataFilter])
    // bottom
    const clearFilters = () => {
        setFilteredInfo({method:[],species:[],organ:[],pathological:[],date_published:[]});
        setDataFilter(props.data)
    };

    const clearAll = () => {
        setSortedInfo({});
        setFilteredInfo({method:[],species:[],organ:[],pathological:[],date_published:[]});
        setDataFilter(props.data)
    };

    // export table to csv or excel
    const exportToCsv = () => {
        setLoading(true); // ajax request after empty completing
        const replacer = (key, value) => (value === null ? "" : value);
        let dataDownload = []
        selectedRowKeys.forEach(value => {
            dataDownload.push(props.data[value-1])
        })
        const header = Object.keys(dataDownload[0]);
        let csv = dataDownload.map(row =>
            header
                .map(fieldName => JSON.stringify(row[fieldName], replacer))
                .join(",")
        );
        csv.unshift(header.join(","));
        csv = csv.join("\r\n");
        csv = "data:text/csv;charset=utf-8,\uFEFF" + csv;;
        const link = document.createElement("a");
        link.href = encodeURI(csv);
        link.download = `st_datasets_table.csv`;
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named 'my_data.csv'.
        document.body.removeChild(link); // Required for FF
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 500);
    };

    // To search in table
    const onSearch = (value) => {
        // 如果有搜索值，设置filtering为true
        if(value.length!==0) setSearching(true)
        else setSearching(false)
        //search
        let dataSearched = []
        for (let i in props.data){
            if(
                props.data[i].st_id.toString().toLowerCase().includes(value.toLowerCase())||
                props.data[i].method.toString().toLowerCase().includes(value.toLowerCase())||
                props.data[i].species.toString().toLowerCase().includes(value.toLowerCase())||
                props.data[i].strain.toString().toLowerCase().includes(value.toLowerCase())||
                props.data[i].organ.toString().toLowerCase().includes(value.toLowerCase())||
                props.data[i].tissue.toString().toLowerCase().includes(value.toLowerCase())||
                props.data[i].pathological.toString().toLowerCase().includes(value.toLowerCase())||
                props.data[i].date_published.toString().toLowerCase().includes(value.toLowerCase())
            )
            {
                dataSearched.push(props.data[i])
            }
        }
        setDataSearch(dataSearched)
        setFilterClick('')
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
        }else dataShow = props.data
        setDataShow(dataShow)
    }
    // to select some rows
    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    // column sort
    const handleChange = (pagination,filter,sorter) => {
        setSortedInfo(sorter);
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <Layout style={{backgroundColor:'white'}}>
            <Space align="start" style={{width: 1340}}>
                <Sider style={{backgroundColor:'white',width:340}}>
                    <FilterToolbar filteredInfo={filteredInfo}
                                   setFilteredInfo={setFilteredInfo}
                                   checkboxStyle={props.checkboxStyle}
                                   data={props.data}
                                   dataShow={dataShow}
                                   setDataFilter={setDataFilter}
                                   setFiltering={setFiltering}
                                   filtering={filtering}
                                   searching={searching}
                                   archive={props.archive}
                                   filterClick={filterClick}
                                   setFilterClick={setFilterClick}
                    ></FilterToolbar>
                </Sider>
                <Content style={{width:1100}}>
                    <Space align="center" style={{height:60,float:"left",width:1000}}>
                        <Search
                            placeholder="input search text"
                            allowClear
                            onSearch={onSearch}
                            onBlur={onSearchClick}
                            size={'large'}
                            style={{
                                width: 650,
                            }}
                        />
                        <Button onClick={clearFilters}>Clear filters</Button>
                        <Button onClick={clearAll}>Clear filters and sorters</Button>
                        <Button type="primary" onClick={exportToCsv} disabled={!hasSelected} loading={loading}>
                            Export
                        </Button>
                        <span>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                    </Space>
                    <DataTable
                        sortedInfo={sortedInfo}
                        searching={searching}
                        filtering={filtering}
                        rowSelection={rowSelection}
                        handleChange={handleChange}
                        dataShow={dataShow}
                        data={props.data}
                    ></DataTable>
                </Content>
            </Space>
        </Layout>
    );
};