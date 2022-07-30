import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import { useRouter } from "next/router";
import { UploadOutlined } from '@ant-design/icons';
import {Button, Form, Input, Select, message, Upload, Row, Col} from 'antd';
import {useState} from "react";
import {data, getAnnotationOptions} from "../components/Datasets/getData&Options.js";
import SelectOrganTissue from "../components/Annotation/index/SelectOrganTissue";
import FileUpload from "../components/Annotation/index/FileUpload";


const organOptions = getAnnotationOptions(data)['organOptions'];
const tissueOptions = getAnnotationOptions(data)['tissueOptions'];
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

export default function Annotation() {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [organ, setOrgan] = useState(organOptions[0]);
    const [tissues, setTissues] = useState(tissueOptions[organOptions[0]]);
    const [secondTissue, setSecondTissue] = useState(tissueOptions[organOptions[0]][0]);

    const router = useRouter()
    const [form] = Form.useForm();
    // 手动上传表单
    const handleUpload = () => {
        let rid = ""
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('matrixFile', file);
        });
        formData.append('title',form.getFieldValue('title'))
        formData.append('emailAddress',form.getFieldValue('emailAddress'))
        formData.append('organ',organ)
        formData.append('tissue',secondTissue)
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
                //nextjs路由跳转到结果页面
                router.push('http://localhost:3000/annotations/results/'+rid)
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
                router.reload()
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 6,
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
                name: 'default_scRNA-seq_matrix.mtx.gz',
                status: 'done',
                response: 'Server Error 500',
                // custom error message to show
                url: 'http://localhost:3000/api/getDefaultMatrixFile',
            },
        ]);
    };

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle +'| Annotation'}</title>
            </Head>
            <div className="modal-body-stw">
                <div className="page-header">
                    <h1>Spatial Annotation</h1>
                </div>
                <div className="panel panel-primary panel-annotation">
                    <Form {...layout} layout={'horizontal'} form={form}
                          onFinish={handleUpload}
                          name="control-hooks"
                          validateMessages={validateMessages}>
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
                            <FileUpload setFileList={setFileList}
                                        fileList={fileList}
                            />
                        </Form.Item>
                        <SelectOrganTissue setOrgan={setOrgan}
                                           organOptions={organOptions}
                                           tissueOptions={tissueOptions}
                                           tissues={tissues}
                                           setTissues={setTissues}
                                           secondTissue={secondTissue}
                                           setSecondTissue={setSecondTissue}
                                           />
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" disabled={fileList.length === 0}
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
        </LayoutCustom>
    )
}