import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout.js'
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { UploadOutlined } from '@ant-design/icons';
import {Button, Form, Input, message, Upload} from 'antd';

/* eslint-disable no-template-curly-in-string */

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

const props = {
    name: 'matrix',
    required: true,
    beforeUpload: (file) => {
        const limitM = 100 //MB
        const isMatrix = file.type === 'application/x-gzip';
        const isLimit = file.size / 1024 / 1024 <= limitM;
        if (!isMatrix) {
            alert(`File: ${file.name} is not a compressed matrix file`);
        }
        if (!isLimit) {
            alert(`File: ${file.name} exceeds the limit`);
        }
        return (isMatrix && isLimit) || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    progress: {
        strokeColor: {
            '0%': '#a08cd0',
            '100%': '#22075e',
        },
        strokeWidth: 3,
        format: percent => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
};

export default function Annotation() {
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
    };
    const onFinish = (values) => {

        console.log(values);
    };
    const onFill = () => {
        /*
        const response =  fetch('/api/getDefaultMatrixFile');
        let matrixFile = response.arrayBuffer();
        console.log(matrixFile)
         */
        form.setFieldsValue({
            JobTitle: 'Hello world!',
            /*
            MatrixFile: matrixFile,
             */
            EmailAddress: 'xiaochunfu@126.com',
        });
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
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item name="JobTitle" label="Job Title"
                            rules={[
                                {
                                    required: true,
                                    max: 50,
                                },
                            ]}
                        >
                            <Input placeholder='Enter job name' />
                        </Form.Item>
                        <Form.Item name="EmailAddress" label="Email Address"
                            rules={[
                                {
                                    required: true,
                                    type:'email'
                                },
                            ]}
                        >
                            <Input placeholder='Enter your email address' />
                        </Form.Item>
                        <Form.Item name="MatrixFile" label="Matrix File"
                                   rules={[
                                       {
                                           required: true,
                                       },
                                   ]}
                        >
                            <Upload {...props} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload a matrix file</Button>
                                <small style={{color:"gray"}}> (only a .gz format matrix file)</small>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className={"btn-upload"}>Upload</Button>
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