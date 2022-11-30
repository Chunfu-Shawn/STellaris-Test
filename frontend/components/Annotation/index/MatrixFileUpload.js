import {Form, Button, message, Upload, Row, Col, Tooltip} from "antd";
import {UploadOutlined,QuestionCircleOutlined} from "@ant-design/icons";
import Link from "next/link.js";
import Image from "next/image";

export default function MatrixFileUpload(props){

    const settingMatrix = {
        name: 'matrixFile',
        required: true,
        beforeUpload: (file) => {
            let filenameArr = file.name.split('.');
            props.setFileList([file]);
            let limitM = 100; //MB
            let isMatrix = filenameArr[filenameArr.length - 2] === 'txt' ||
                filenameArr[filenameArr.length - 2] === 'csv' ||
                filenameArr[filenameArr.length - 2] === 'tsv';
            let isGzip = file.type === 'application/x-gzip';
            let isZip = file.type === 'application/zip'
            let isLimit = file.size / 1024 / 1024 <= limitM;
            if (!isMatrix || !(isGzip||isZip)) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} is not a compressed csv/tsv/txt format count matrix file`,
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                });
            }
            if (!isLimit) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} exceeds the limit: 100 MB`,
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                });
            }
            return false
        },
        onRemove: (file) => {
            const index = props.fileList.indexOf(file);
            const newFileList = props.fileList.slice();
            newFileList.splice(index, 1);
            props.setFileList(newFileList);
        },
        fileList:props.fileList.slice(-1),//保留最后一个文件
    };

    const  toolTipText = <>
        <span>&gt; File Context:</span><br/>
        <span>
            This file contains gene expression (raw counts) values in which <b style={{color:"#a680ff"}}>columns are genes </b>
            presented with gene names identifier (Ensembl IDs or HGNC symbol name) and
            <b style={{color:"#a680ff"}}> rows are cell IDs</b>. Formats accepted are .csv .tsv and .txt in .gz/zip
            compression. Click on 'Question' to see more.
        </span><br/>
        <span>&gt; Example:</span><br/>
        <Image src={`/images/counts_matrix_example.png`} alt="..." width={400} height={220}/>
    </>

    return(
        <Row justify={"start"}>
            <Col span={16}>
                <Form.Item name="matrixFile" label="Count Matrix File"
                           rules={[
                               {
                                   required: true,
                               },
                           ]}
                >
                    <Upload {...settingMatrix} maxCount={1}>
                        <Button type={"primary"} icon={<UploadOutlined />} ghost>Select a count matrix file</Button>
                    </Upload>
                </Form.Item>
            </Col>
            <Col span={7}>
                <small style={{color:"gray"}}> (only a .gz/zip format file) </small>
                <Link href={'help/manual/annotation#format_uploaded_files'} target={"_blank"}>
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