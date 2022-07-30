import {Form, Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export default function FileUpload(props){
    const setting = {
        name: 'matrixFile',
        required: true,
        beforeUpload: (file) => {
            props.setFileList([file]);
            const limitM = 100; //MB
            let isMatrix = String.parse(file.name.split('.').slice(-2,-1)) === 'mtx' ||
                String.parse(file.name.split('.').slice(-2,-1)) === 'txt' ||
                String.parse(file.name.split('.').slice(-2)) === 'csv' ||
                String.parse(file.name.split('.').slice(-2)) === 'tsv';
            let isGzip = file.type === 'application/x-gzip';
            let isLimit = file.size / 1024 / 1024 <= limitM;
            if (!isMatrix||!isGzip) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} is not a compressed matrix file`,
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
        progress: {
            strokeColor: {
                '0%': '#a08cd0',
                '100%': '#22075e',
            },
            strokeWidth: 3,
            format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
        fileList:props.fileList.slice(-1),//保留最后一个文件
    };

    return(
        <Form.Item name="matrixFile" label="Matrix File"
                   rules={[
                       {
                           required: true,
                       },
                   ]}
        >
            <Upload {...setting} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select a matrix file</Button>
                <small style={{color:"gray"}}> (only a .gz format matrix file)</small>
            </Upload>
        </Form.Item>
    )
}