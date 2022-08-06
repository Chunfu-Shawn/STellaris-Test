import React, {Suspense, useState} from 'react';
import myViewConfig from './vi-config.json';
import {Button, Col, Row, Select} from "antd";
import { LoadingOutlined,SelectOutlined } from '@ant-design/icons';
const { Option } = Select;

const Vitessce = React.lazy(() => import('./VitessceWrapper.js'));


export default function VitessceVisualization(props) {
    props.duplicateOption[0] === "default"?
        myViewConfig.datasets[0].files.forEach( file => {
            file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}.zarr`
        }):
        myViewConfig.datasets[0].files.forEach( file => {
            file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${props.duplicateOption[0]}.zarr`
        })

    const height = 900
    const [viewConfig, setViewConfig] = useState(myViewConfig);
    const onChangeDuplicate =(value)=>{
        let viewConfigTemp = {...viewConfig}
        viewConfigTemp.datasets[0].files.forEach( file => {
            file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${value}.zarr`
            console.log(file)
        })
        setViewConfig(viewConfigTemp)
    }
    return (
        <>
        <Row justify="start" align="stretch">
            <Col span={6}><span style={{fontSize:"16px"}}>Anndata-Zarr ID (Duplicates): </span></Col>
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
        </Row><br/>
        <div className="panel-visual" style={{height:height+2+"px"}}>
            <Suspense fallback={
                <LoadingOutlined spin={true} style={{marginTop:"20%",fontSize:"30px"}}/>
            }
            >
                <Vitessce
                    config={viewConfig}
                    height={height}
                    theme="dark"
                />
            </Suspense>
        </div>
            <p style={{float:'right',color:"gray"}}>Powered by <a target={"__blank"} href={"https://vitessce.io/"}>Vitessce <SelectOutlined /></a></p>
        </>
    )
}