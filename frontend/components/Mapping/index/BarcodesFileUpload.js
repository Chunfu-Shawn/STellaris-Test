import {Form, Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export default function BarcodesFileUpload(props){

    const settingBarcodes = {
        name: 'barcodesFile',
        required: true,
        beforeUpload: (file) => {
            let filenameArr = file.name.split('.');
            props.setFileList([file]);
            let limitM = 5; //MB
            let isBarcodes = filenameArr[filenameArr.length - 2] === 'txt' ||
                filenameArr[filenameArr.length - 2] === 'csv' ||
                filenameArr[filenameArr.length - 2] === 'tsv';
            let isGzip = file.type === 'application/x-gzip';
            let isLimit = file.size / 1024 / 1024 <= limitM;
            if (!isBarcodes||!isGzip) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} is not a compressed barcodes file`,
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                });
            }
            if (!isLimit) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} exceeds the limit: 5 MB`,
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
        <Form.Item name="barcodesFile" label="Barcodes File"
                   rules={[
                       {
                           required: true,
                       },
                   ]}
        >
            <Upload {...settingBarcodes} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select a barcodes file</Button>
                <small style={{color:"gray"}}> (only a .gz format barcodes file)</small>
            </Upload>
        </Form.Item>
    )
}