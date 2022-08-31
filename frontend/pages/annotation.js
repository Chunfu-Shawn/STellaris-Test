import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import { useRouter } from "next/router";
import {Button, Form, Input, message, Layout, Popconfirm, Space, Row, Col} from 'antd';
const { Sider } = Layout;
import {useState} from "react";
import {data, getAnnotationOptions} from "../components/Datasets/getData&Options.js";
import SelectOrganTissue from "../components/Annotation/index/SelectOrganTissue";
import MatrixFileUpload from "../components/Annotation/index/MatrixFileUpload.js";
import BarcodesFileUpload from  "../components/Annotation/index/BarcodesFileUpload.js";
import FeaturesFileUpload from "../components/Annotation/index/FeaturesFileUpload.js";
import Guidance from "../components/Annotation/index/Guidance";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";


const organOptions = getAnnotationOptions(data)['organOptions'];
const tissueOptions = getAnnotationOptions(data)['tissueOptions'];
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

export async function getServerSideProps() {
    const SERVER_URL = process.env.NODE_ENV==="production"? process.env.PRODUCTION_URL : 'http://localhost:3000'
    return{
        props:{
            SERVER_URL: SERVER_URL
        }
    }
}

export default function Annotation(props) {
    const UPLOAD_URL = `${props.SERVER_URL}/annotation/upload/`
    const DEMO_URL = `${props.SERVER_URL}/annotation/demo/`
    console.log("UPLOAD_URL ",UPLOAD_URL)
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
        formData.append('isDemo',"false")
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
                router.push('/annotation/resultPage/'+rid)
            })
            .catch(() => {
                message.error({
                    content:'upload unsuccessfully.',
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
            span: 19,
        },
    };
    const onReset = () => {
        form.resetFields();
        setMatrixFileList([]);
        setBarcodesFileList([]);
        setFeaturesFileList([]);
    };
    const cancel = (e) => {
        console.log(e);
    };
    const onRunDemo = () => {
        let rid = ""
        setUploading(true);
        fetch(DEMO_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({isDemo:'true'})
        }).then(response => response.json())
            .then(json => rid = json.rid)
            .then(() => {
                message.success({
                    content:'run demo successfully!',
                    style:{
                        marginTop: '12vh',
                    },
                });
                //nextjs路由跳转到结果页面
                router.push('/annotation/resultPage/'+rid)
            })
            .catch(() => {
                message.error({
                        content:'run demo unsuccessfully.',
                        style:{
                            marginTop: '12vh',
                        },
                        duration:3,
                    }
                );
                //router.reload()
            })
            .finally(() => {
                setUploading(false);
            });
    };

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle +'| Annotation'}</title>
            </Head>
            <Row style={{width:"100vw",minWidth:1440}}>
                <Col style={{width:"35%"}}>
                    <div className={"modal-body-stw"} style={
                        {
                            backgroundColor:"rgba(55,52,112,0.04)",
                            borderStyle:"inset",
                            borderColor:"lightgray",
                            borderBottom:"none",
                            padding:"150px 80px 150px 100px",
                            width:"auto",
                            minWidth:500,
                            height:"100%",
                        }}>
                        <div style={{width:350,float:"right"}}>
                            <Guidance></Guidance>
                        </div>
                    </div>
                </Col>
                <Col style={{width:"65%"}}>
                    <div className="modal-body-stw" style={{width:"auto",textAlign:"left"}}>
                        <div style={{margin:"80px 0"}}>
                            <Space align="start">
                                <h1 style={
                                    {
                                        fontSize:"46px",
                                    }
                                }>Spatial Annotation</h1>
                                <Link href={'/help/manual/annotation'}>
                                    <a target={'_blank'} rel={"noreferrer"}>
                                        <QuestionCircleOutlined  style={{fontSize:"20px",color:"#2b1970"}}/>
                                    </a>
                                </Link>
                            </Space>
                        </div>
                        <Form {...layout} layout={'horizontal'} form={form}
                              onFinish={handleUpload}
                              name="control-hooks"
                              validateMessages={validateMessages}
                              style={{width:600}}>
                            <Form.Item name="title" label="Job Title"
                                       rules={[
                                           {
                                               required: true,
                                               max: 60,
                                           },
                                       ]}
                            >
                                <Input placeholder='Enter job name'/>
                            </Form.Item>
                            <Form.Item name="emailAddress" label="Email Address"
                                       rules={[
                                           {
                                               required: true,
                                               type:'email',
                                               max:50
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
                                <Button type="dashed" htmlType="button" onClick={onReset} className={"btn-upload"}>
                                    Reset
                                </Button>
                                <Popconfirm
                                    title="Are you sure to run a demo?"
                                    onConfirm={onRunDemo}
                                    onCancel={cancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="ghost" htmlType="button">
                                        Run Demo
                                    </Button>
                                </Popconfirm>
                            </Form.Item>
                        </Form>
                    </div>
                </Col>
            </Row>
        </LayoutCustom>
    )
}