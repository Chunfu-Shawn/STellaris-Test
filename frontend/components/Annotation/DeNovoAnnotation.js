import {Button, Form, Input, message, Popconfirm} from "antd";
import SelectOrganTissue from "./index/SelectOrganTissue";
import MatrixFileUpload from "./index/MatrixFileUpload";
import BarcodesFileUpload from "./index/BarcodesFileUpload";
import FeaturesFileUpload from "./index/FeaturesFileUpload";
import {throttle} from "../util";
import {useState} from "react";
import {useRouter} from "next/router";


export default function DeNovoAnnotation(props){
    const {
        organOptions,
        tissueOptions,
        validateMessages
    } = props
    const UPLOAD_URL = `/annotation/upload/`
    const DEMO_URL = `/annotation/demo/`
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

    const onRunDemo = () => {
        let rid = ""
        setUploading(true);
        fetch(DEMO_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isDemo:'true',
            })
        }).then(response => response.json())
            .then(json => rid = json.rid)
            .then((rid) => {
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
    return(
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
                <Button type="primary" htmlType="submit" disabled={
                    matrixFileList.length === 0 ||
                    barcodesFileList.length === 0 ||
                    featuresFileList.length === 0
                }
                        loading={uploading} className={"btn-upload"}>
                    {uploading ? 'Uploading...' : 'Start Upload'}
                </Button>
                <Button type="dashed" htmlType="button" onClick={onReset} className={"btn-upload"}>
                    Reset
                </Button>
                <Popconfirm
                    title="Are you sure to run a demo?"
                    onConfirm={throttle(1000,onRunDemo)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="ghost" htmlType="button">
                        Run Demo
                    </Button>
                </Popconfirm>
            </Form.Item>
        </Form>
    )
}