import React, {Suspense, useState} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
const Vitessce = React.lazy(() => import('./VitessceWrapper.js'));
import myViewConfig from './vi-config.json';
import 'vitessce/dist/es/production/static/css/index.css';
import {Button, Col, Row, Select} from "antd";
const { Option } = Select;

export default function VitessceVisualization(props) {
    const height = 600
    const [loadings, setLoadings] = useState(false);
    const [duplicateID, setDuplicateID] = useState(props.duplicateOption[0]);
    const [viewConfig, setViewConfig] = useState(myViewConfig);
    const onChangeDuplicate =(value)=>{
        setDuplicateID(value)
    }
    const onClickChange =()=>{
        setLoadings(true)
        let viewConfigTemp = {...viewConfig}
        viewConfigTemp.datasets[0].files.forEach( file => {
            file.url = "https://rhesusbase.com:9999/zarr_files/STW-Homo_sapiens-Bone-ST-1/" + duplicateID + ".stagate_leiden.zarr"
            console.log(file)
            //file.url = "https://rhesusbase.com:9999/mouse-ngs/35050211/"+ duplicateID + "zarr"
        })
        setViewConfig(viewConfigTemp)
        setTimeout(()=>{
            setLoadings(false)
        },1000)
    }
    return (
        <>
        <Row justify="start" align="bottom">
            <Col span={3}><h5>Duplicates ID: </h5></Col>
            <Col span={6}>
                <Select
                    defaultValue={props.duplicateOption[0]}
                    style={{
                        width: '15vw',
                    }}
                    onChange={onChangeDuplicate}
                >
                    {props.duplicateOption.map(item =>
                            <Option key={item} value={item}>{item}</Option>
                        )
                    }
                </Select>
            </Col>
            <Col span={2}>
                <Button type="primary" ghost
                        onClick={onClickChange}
                        loading={loadings}>
                    View this Duplicate
                </Button>
            </Col>
        </Row><br/>
        <div className="panel-visual" style={{height:height+10+"px"}}>
            <Suspense fallback={
                <LoadingOutlined
                style={{
                    fontSize: 30,
                    margin:'10%'
                }}
                spin/>
            }>
                <Vitessce
                    config={viewConfig}
                    height={height}
                    theme="dark"
                />
            </Suspense>
        </div>
        </>
    )
}