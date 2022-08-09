import {Form, Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export default function FeaturesFileUpload(props){

    const settingFeatures = {
        name: 'featuresFile',
        required: true,
        beforeUpload: (file) => {
            props.setFileList([file]);
            let limitM = 5; //MB
            let isMatrix = String.parse(file.name.split('.').slice(-2,-1)) === 'tsv' ||
                String.parse(file.name.split('.').slice(-2,-1)) === 'txt' ||
                String.parse(file.name.split('.').slice(-2)) === 'csv';
            let isGzip = file.type === 'application/x-gzip';
            let isLimit = file.size / 1024 / 1024 <= limitM;
            if (!isMatrix||!isGzip) {
                props.setFileList([])
                message.error({
                    content:`File: ${file.name} is not a compressed features file`,
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
        <Form.Item name="featureFile" label="Features File"
                   rules={[
                       {
                           required: true,
                       },
                   ]}
        >
            <Upload {...settingFeatures} maxCount={1}>
                <Button icon={<UploadOutlined />}>Select a features file</Button>
                <small style={{color:"gray"}}> (only a .gz format features file)</small>
            </Upload>
        </Form.Item>
    )
}