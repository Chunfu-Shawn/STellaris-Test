import React, {useState} from 'react';
import {Col, Divider, Row, Select} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import dynamic from "next/dynamic";
const { Option } = Select;

export default function VisualToolModule(props) {
    const DynamicVisualTool = dynamic(() =>
            import('../dataPage/../../../components/VisualTool/VisualTool.js')
                .then((mod) => mod.VisualTool),
        {
            ssr: false,
        })
    let viewConfigInit = {...props.config}
    props.duplicateOption[0] === "null"?
        // no duplicate
        viewConfigInit.datasets[0].files.forEach( file => {
            if (file.url !== undefined) file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}.zarr`
            else file.options.images[0].url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}.zarr/uns/spatial/Sample1/images/hires`
        }):
        viewConfigInit.datasets[0].files.forEach( file => {
            if (file.url !== undefined) file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${props.duplicateOption[0]}.zarr`
            else file.options.images[0].url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${props.duplicateOption[0]}.zarr/uns/spatial/Sample1/images/hires`
        })
    const [viewConfig, setViewConfig] = useState(viewConfigInit);
    const onChangeDuplicate = (value) => {
        let viewConfigTemp = JSON.parse(JSON.stringify(viewConfig)) //deep copy
        viewConfigTemp.datasets[0].files.forEach( (file,index) => {
            if (file.url !== undefined) file.url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${value}.zarr`
            else file.options.images[0].url = `https://rhesusbase.com:9999/zarr_files/${props.st_id}/${value}.zarr/uns/spatial/Sample1/images/hires`
            viewConfigTemp.datasets[0].files[index] = file
        })
        console.log(viewConfigTemp)
        setViewConfig(viewConfigTemp)
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
            <DynamicVisualTool setCustom={true} width={1000} height={800}/>
        </div>
    )
}