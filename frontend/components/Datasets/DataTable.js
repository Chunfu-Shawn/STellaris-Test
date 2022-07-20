import {Button, Layout, Space, Table, Collapse, Checkbox, Col, Row } from 'antd';
const { Panel } = Collapse;
import React, { useState } from 'react';
import Link from "next/link";
const {Content,Sider} = Layout;

const data = [
    {
        key: '1',
        st_id: 'WT A2-2 Mouse E14.5 Brain Coronal Section',
        data_types: 'Stereo-seq',
        species: 'Mouse',
        organs: 'Brain'
    },
    {
        key: '2',
        st_id: 'WT A1-2 Human E4.5 Brain Coronal Section',
        data_types: 'Stereo-seq',
        species: 'Human',
        organs: 'Brain'
    },
    {
        key: '3',
        st_id: 'SCP815-Puck_190921_19',
        data_types: 'Slide-seq',
        species: 'Mouse',
        organs: 'Kidney'
    },
    {
        key: '4',
        st_id: 'SCP815-Puck_190921_20',
        data_types: 'Slide-seq',
        species: 'Mouse',
        organs: 'Kidney'
    },
];

const App = () => {
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

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
        },
        {
            title: 'Data Types',
            dataIndex: 'data_types',
            key: 'data_types',
            filters: [
                {
                    text: 'Stereo-seq',
                    value: 'Stereo-seq',
                },
                {
                    text: 'Slide-seq',
                    value: 'Slide-seq',
                },
            ],
            filteredValue: filteredInfo.data_types || null,
            onFilter: (value, record) => record.data_types.includes(value),
            sorter: (a, b) => a.data_types < b.data_types,
            sortOrder: sortedInfo.columnKey === 'data_types' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Species',
            dataIndex: 'species',
            key: 'species',
            filters: [
                {
                    text: 'Mouse',
                    value: 'Mouse',
                },
                {
                    text: 'Human',
                    value: 'Human',
                },
            ],
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
            filters: [
                {
                    text: 'Brain',
                    value: 'Brain',
                },
                {
                    text: 'Kidney',
                    value: 'Kidney',
                },
            ],
            filteredValue: filteredInfo.organs || null,
            onFilter: (value, record) => record.organs.includes(value),
            sorter: (a, b) => a.organs < b.organs,
            sortOrder: sortedInfo.columnKey === 'organs' ? sortedInfo.order : null,
            ellipsis: true,
        },
    ];

    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const download = () => {
        setLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <Layout style={{backgroundColor:'white'}}>
            <Space>
                <Sider style={{backgroundColor:'white'}}>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        <Panel header="Data Types" key="1">
                            <Checkbox.Group
                                style={{
                                    width: '100%',
                                }}
                                onChange={onChange}
                            >
                                <Row>
                                    <Col span={24}>
                                        <Checkbox value="Stereo-seq">Stereo-seq</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="Slide-seq">Slide-seq</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="10X Visium">10X Visium</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="ST">ST</Checkbox>
                                    </Col>
                                    <Col span={24}>
                                        <Checkbox value="MERFISH">MERFISH</Checkbox>
                                    </Col>
                                </Row>
                            </Checkbox.Group>
                        </Panel>
                        <Panel header="Species" key="2">

                        </Panel>
                        <Panel header="Organ" key="3">

                        </Panel>
                    </Collapse>
                </Sider>
                <Content>
                    <Space align="center" style={{height:'8vh',float:"right"}}>
                        <span>{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}</span>
                        <Button onClick={setIDSort}>Sort ST ID</Button>
                        <Button onClick={clearFilters}>Clear filters</Button>
                        <Button onClick={clearAll}>Clear filters and sorters</Button>
                        <Button type="primary" onClick={download} disabled={!hasSelected} loading={loading}>
                            Download
                        </Button>
                    </Space>
                    <Table columns={columns} rowSelection={rowSelection} dataSource={data} pagination={{position: ['bottomCenter'],}} onChange={handleChange} />
                </Content>
            </Space>
        </Layout>
    );
};

export default App;