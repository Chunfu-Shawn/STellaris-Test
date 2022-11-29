import {Form, Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

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

    return(
        <Form.Item name="matrixFile" label="Count Matrix File"
                   rules={[
                       {
                           required: true,
                       },
                   ]}
        >
            <Upload {...settingMatrix} maxCount={1}>
                <Button type={"primary"} icon={<UploadOutlined />} ghost>Select a count matrix file</Button>
                <small style={{color:"gray"}}> (only a .gz/zip format file)</small>
            </Upload>
        </Form.Item>
    )
}