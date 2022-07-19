import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout.js'
import { useRouter } from "next/router";
import { UploadOutlined } from '@ant-design/icons';
import {Button, Form, Input, message, Upload} from 'antd';
import {useState} from "react";

/* eslint-disable no-template-curly-in-string */
const SERVER_URL = 'http://localhost:3000'
const UPLOAD_URL = `${SERVER_URL}/annotations/upload/`

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    string: {
        max: "'${name}' cannot be longer than ${max} characters",
    }
};
/* eslint-enable no-template-curly-in-string */

export default function Annotation() {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const props = {
        name: 'matrixFile',
        required: true,
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            const limitM = 100 //MB
            const isMatrix = file.type === 'application/x-gzip';
            const isLimit = file.size / 1024 / 1024 <= limitM;
            if (!isMatrix) {
                setFileList([])
                message.error({
                    content:`File: ${file.name} is not a compressed matrix file`,
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                });
            }
            if (!isLimit) {
                setFileList([])
                message.error({
                    content:`File: ${file.name} exceeds the limit`,
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                });
            }
            return false
        },
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        progress: {
            strokeColor: {
                '0%': '#a08cd0',
                '100%': '#22075e',
            },
            strokeWidth: 3,
            format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
        },
        fileList:fileList.slice(-1),//保留最后一个文件
    };
    // 手动上传表单
    const handleUpload = () => {
        let rid = ""
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('matrixFile', file);
        });
        formData.append('title',form.getFieldValue('title'))
        formData.append('emailAddress',form.getFieldValue('emailAddress'))
        setUploading(true); // You can use any AJAX library you like
        fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
            .then(json => rid = json.rid)
            .then(() => {
                setFileList([]);
                message.success({
                    content:'upload successfully!',
                    style:{
                        marginTop: '12vh',
                    },
                });
            })
            .catch(() => {
                message.error({
                    content:'upload failed.',
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                }
                );
            })
            .finally(() => {
                setUploading(false);
                //nextjs路由跳转到结果页面
                router.push('http://localhost:3000/annotations/results/'+rid)
            });
    };
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 5,
            span: 14,
        },
    };
    const onReset = () => {
        form.resetFields();
        setFileList([]);
    };
    const onFinish = (values) => {
        console.log(values);
    };
    const onFill = () => {
        form.setFieldsValue({
            title: 'An important job!',
            /*
            MatrixFile: matrixFile,
             */
            emailAddress: 'someone@mail.com',
        });
        if(fileList!==[])
            setFileList([
            {
                uid: '1',
                name: 'default_scRNA-seq_matrix.txt.gz',
                status: 'done',
                response: 'Server Error 500',
                // custom error message to show
                url: 'http://localhost:3000/api/default_scRNA-seq_matrix.txt.gz',
            },
        ]);
    };

    return (
        <Layout>
            <Head>
                <title>{siteTitle +'- Annotation'}</title>
            </Head>
            <div className="modal-body-stw">
                <div className="page-header">
                    <h1>Spatial Annotation</h1>
                </div>
                <div className="panel panel-primary panel-annotation">
                    <Form {...layout} form={form} name="control-hooks" validateMessages={validateMessages}>
                        <Form.Item name="title" label="Job Title"
                            rules={[
                                {
                                    required: true,
                                    max: 50,
                                },
                            ]}
                        >
                            <Input placeholder='Enter job name'/>
                        </Form.Item>
                        <Form.Item name="emailAddress" label="Email Address"
                            rules={[
                                {
                                    required: true,
                                    type:'email'
                                },
                            ]}
                        >
                            <Input placeholder='Enter your email address' />
                        </Form.Item>
                        <Form.Item name="matrixFile" label="Matrix File"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}
                        >
                            <Upload {...props} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select a matrix file</Button>
                                <small style={{color:"gray"}}> (only a .gz format matrix file)</small>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" onClick={handleUpload} disabled={fileList.length === 0}
                                    loading={uploading} className={"btn-upload"}>
                                {uploading ? 'Uploading' : 'Start Upload'}
                            </Button>
                            <Button type="ghost" htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button type="link" htmlType="button" onClick={onFill}>
                                Fill form
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}