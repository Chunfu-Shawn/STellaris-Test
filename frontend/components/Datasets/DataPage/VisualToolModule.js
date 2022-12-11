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
    const {
        st_id,
        sectionOption
    } = props
    const [dataset, setDataset] = useState({});
    useEffect(()=>{
        // no section
        if(sectionOption[0] === "null")
            setDataset({
                "id": `${st_id} | ${sectionOption[0]}`,
                "name": `${st_id} | ${sectionOption[0]}`,
                "url": `https://rhesusbase.com:9999/jsonl_files/${st_id}/${sectionOption[0]}/${sectionOption[0]}.jsonl`
            })
        else
            setDataset({
                "id": `${st_id} | ${sectionOption[0]}`,
                "name": `${st_id} | ${sectionOption[0]}`,
                "url": `https://rhesusbase.com:9999/jsonl_files/${st_id}/${sectionOption[0]}/${sectionOption[0]}.jsonl`
            })
    },[st_id,sectionOption[0]])

    const onChangeSection = (value) => {
        let datasetTemp
        datasetTemp = {
            "id": `${st_id} | ${value}`,
            "name": `${st_id} | ${value}`,
            "url": `https://rhesusbase.com:9999/jsonl_files/${st_id}/${value}/${value}.jsonl`
        }
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
                <Col span={3}><span style={{fontSize:"16px"}}>Section ID: </span></Col>
                <Col span={6}>
                    <Select
                        defaultValue={props.sectionOption[0]==="null"?'default':props.sectionOption[0]}
                        style={{
                            width: '15vw',
                        }}
                        onChange={onChangeSection}
                    >
                        {
                            props.sectionOption[0]==="null" ?
                                <Option key={"default"} value={"default"}>{"default"}</Option>
                            :
                                (
                                    props.sectionOption.map((item) =>
                                    <Option key={item} value={item}>{item}</Option>)
                                )
                        }
                    </Select>
                </Col>
            </Row><br/>
            <DynamicVisualTool setCustom={true} width={1140} height={800} dataset={dataset}/>
        </div>
    )
}