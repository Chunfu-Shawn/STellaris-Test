import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import { useRouter } from "next/router";
import {Button, Form, Input, message,Layout} from 'antd';
const { Header, Sider, Content } = Layout;
import {useState} from "react";
import {data, getAnnotationOptions} from "../components/Datasets/getData&Options.js";
import SelectOrganTissue from "../components/Annotation/index/SelectOrganTissue";
import MatrixFileUpload from "../components/Annotation/index/MatrixFileUpload.js";
import BarcodesFileUpload from  "../components/Annotation/index/BarcodesFileUpload.js";
import FeaturesFileUpload from "../components/Annotation/index/FeaturesFileUpload.js";
import Guidance from "../components/Annotation/index/Guidance";


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
    const [matrixFileList, setMatrixFileList] = useState([]);
    const [barcodesFileList, setBarcodesFileList] = useState([]);
    const [featuresFileList, setFeaturesFileList] = useState([]);
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
        matrixFileList.forEach((file) => {
            formData.append('matrixFile', file);
        });
        barcodesFileList.forEach((file) => {
            formData.append('barcodesFile', file);
        });
        featuresFileList.forEach((file) => {
            formData.append('featuresFile', file);
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
                setMatrixFileList([]);
                setBarcodesFileList([]);
                setFeaturesFileList([]);
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
            span: 18,
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
        setMatrixFileList([]);
        setBarcodesFileList([]);
        setFeaturesFileList([]);
    };
    const onFill = () => {
        form.setFieldsValue({
            title: 'An important job!',
            emailAddress: 'someone@mail.com',
        });
        if(matrixFileList!==[])
            setMatrixFileList([
            {
                uid: '1',
                name: 'default_scRNA-seq_matrix.mtx.gz',
                status: 'done',
                response: 'Server Error 500',
                // custom error message to show
                url: 'http://localhost:3000/api/getDefaultMatrixFile',
            },
        ]);
        if(barcodesFileList!==[])
            setBarcodesFileList([
                {
                    uid: '1',
                    name: 'default_scRNA-seq_barcodes.tsv.gz',
                    status: 'done',
                    response: 'Server Error 500',
                    // custom error message to show
                    url: 'http://localhost:3000/api/getDefaultMatrixFile',
                },
            ]);
        if(featuresFileList!==[])
            setFeaturesFileList([
                {
                    uid: '1',
                    name: 'default_scRNA-seq_features.tsv.gz',
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
            <Layout style={{backgroundColor:"transparent"}}>
                <Sider width={'40%'} style={
                    {
                        backgroundColor:"rgba(55,52,112,0.04)",
                        borderStyle:"inset",
                        borderColor:"lightgray",
                        borderBottom:"none",
                    }}>
                    <div className="modal-body-stw" style={{padding: "10vh 5vw",paddingTop: "20vh"}}>
                        <Guidance></Guidance>
                    </div>
                </Sider>
                <div className="modal-body-stw" style={{width:"60%",textAlign:"left"}}>
                    <div className="page-header" style={{margin:"10% 0"}}>
                        <h1 style={{fontWeight:"bold"}}>Spatial Annotation</h1>
                    </div>
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
                            <SelectOrganTissue setOrgan={setOrgan}
                                               organOptions={organOptions}
                                               tissueOptions={tissueOptions}
                                               tissues={tissues}
                                               setTissues={setTissues}
                                               secondTissue={secondTissue}
                                               setSecondTissue={setSecondTissue}
                            />

                            <MatrixFileUpload setFileList={setMatrixFileList}
                                              fileList={matrixFileList}
                            />
                            <BarcodesFileUpload setFileList={setBarcodesFileList}
                                                fileList={barcodesFileList}
                            />
                            <FeaturesFileUpload setFileList={setFeaturesFileList}
                                                fileList={featuresFileList}
                            />

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" disabled={matrixFileList.length === 0}
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
            </Layout>
        </LayoutCustom>
    )
}