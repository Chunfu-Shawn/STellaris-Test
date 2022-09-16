import React, {useEffect, useState} from 'react';
import {Col, Divider, Row, Select} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import dynamic from "next/dynamic";
const { Option } = Select;
//import datasetDefault from '../../VisualTool/dataset.json' assert { type : 'json' }

const DynamicVisualTool = dynamic(() =>
        import('../dataPage/../../../components/VisualTool/VisualTool.js')
            .then((mod) => mod.VisualTool),
    {
        ssr: false,
    })

export default function VisualToolModule(props) {
    const [dataset, setDataset] = useState({});

    useEffect(() => {
        // no duplicate
        if(props.duplicateOption[0] === "null")
            setDataset({
                "id": props.st_id,
                "name": props.st_id,
                "url": "https://rhesusbase.com:9999/datasets/adata_a2p2.telen.m500.log1p.leiden.deg/adata_a2p2.telen.m500.log1p.leiden.deg.jsonl"
            })
    },[]);
    const onChangeDuplicate = (value) => {
        let datasetTemp
        datasetTemp = {
            ...dataset,
            "url": "https://rhesusbase.com:9999/datasets/adata_a2p2.telen.m500.log1p.leiden.deg/adata_a2p2.telen.m500.log1p.leiden.deg.jsonl"
            //"url": 'https://rhesusbase.com:9999/datasets/'+props.st_id+'/'+value+'/'+value+'.jsonl'
        }
        console.log(datasetTemp)
        setDataset(datasetTemp)
    }

    return (
        <div name={"View"}>
            <a id={"View"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                <span style={{fontSize:22}}>View </span>
                <Link href={'/help/manual/datasets#data_page_view'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <Row justify="start" align="stretch">
                <Col span={3}><span style={{fontSize:"16px"}}>Duplicates ID: </span></Col>
                <Col span={6}>
                    <Select
                        defaultValue={props.duplicateOption[0]==="null"?'default':props.duplicateOption[0]}
                        style={{
                            width: '15vw',
                        }}
                        onChange={onChangeDuplicate}
                    >
                        {
                            props.duplicateOption[0]==="null" ?
                                <Option key={"default"} value={"default"}>{"default"}</Option>
                            :
                                (
                                    props.duplicateOption.map((item) =>
                                    <Option key={item} value={item}>{item}</Option>)
                                )
                        }
                    </Select>
                </Col>
            </Row><br/>
            <DynamicVisualTool setCustom={true} width={1100} height={800} dataset={dataset}/>
        </div>
    )
}