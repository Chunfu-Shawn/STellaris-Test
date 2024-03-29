import {Form, Button, message, Upload, Row, Col, Tooltip} from "antd";
import {UploadOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import Link from "next/link.js";
import Image from "next/image";
import React from "react";

export default function FragmentsFileUpload(props){

    const settingFragment = {
        name: 'fragmentsFile',
        required: true,
        beforeUpload: (file) => {
            let filenameArr = file.name.split('.');
            props.setFileList([file]);
            let limitM = 200; //MB
            let isMatrix = filenameArr[filenameArr.length - 2] === 'bed';
            let isGzip = file.type === 'application/x-gzip' || file.type === 'application/gzip';
            let isZip = file.type === 'application/zip' || file.type === 'application/x-zip' ||
                file.type === 'application/x-zip-compressed'
            let isCompressed = isGzip||isZip
            let isLimit = file.size / 1024 / 1024 <= limitM;
            if (!isMatrix || !isCompressed) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} is not a compressed bed format fragments file`,
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                });
            }
            if (!isLimit) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} exceeds the limit: 200 MB`,
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                });
            }
            return false
        },
        onRemove: (file) => {
            if(props.uploading === false){
                const index = props.fileList.indexOf(file);
                const newFileList = props.fileList.slice();
                newFileList.splice(index, 1);
                props.setFileList(newFileList);
            }
        },
        fileList:props.fileList.slice(-1),//保留最后一个文件
        progress: {
            strokeColor: {
                '0%': '#3f10e9',
                '100%': '#2e0f8c',
            },
            strokeWidth: 3,
        }
    };

    const  toolTipText = <>
        <span>&gt; File Context:</span><br/>
        <span>
            This file is in BED file format containing the number of raw read counts detected in genomic regions.
            The BED fields represent: <b style={{color:"#a680ff"}}> (i) chromosome, (ii) start, (iii) end, (iv) name and
            (v) the number of read counts. </b>
            Notably, header is NOT allowed in this BED file. Formats accepted are .bed in .gz/zip compression.
            Click on &quot;?&quot; to see more.
        </span><br/>
        <span>&gt; Example:</span><br/>
        <Image src={`/images/fragments_file_example.png`} alt="..." width={400} height={200}/>
    </>

    return(
        <Row justify={"start"}>
            <Col span={16}>
                <Form.Item name="fragmentsFile" label="Fragments File"
                           rules={[
                               {
                                   required: true,
                               },
                           ]}
                >
                    <Upload {...settingFragment} maxCount={1}>
                        <Button type={"primary"} icon={<UploadOutlined />} ghost>Select a fragments file</Button>
                    </Upload>
                </Form.Item>
            </Col>
            <Col span={8}>
                <small style={{color:"gray"}}> (only a .bed.gz/zip format file) </small>
                <Link href={'/tutorial/mapping/getStarted/#data_preparation'} target={"_blank"}>
                    <a target={'_blank'} rel={"noreferrer"}>
                        <Tooltip placement="topLeft"
                                 title={toolTipText}
                                 overlayInnerStyle={{width:400}}
                        >
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </a>
                </Link>
            </Col>
        </Row>
    )
}