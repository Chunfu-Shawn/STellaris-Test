import {Button, Form, Input, message, Popconfirm, Dropdown, Menu} from "antd";
import SelectSpeciesOrganTissue from "./index/SelectSpeciesOrganTissue";
import MatrixFileUpload from "./index/MatrixFileUpload";
import LabelsFileUpload from "./index/LabelsFileUpload";
import {throttle} from "../util";
import {useState} from "react";
import {useRouter} from "next/router";


export default function AnnotateSpatialLocation(props){
    const {
        speciesOptions,
        organOptions,
        tissueOptions,
        validateMessages
    } = props
    const UPLOAD_URL = `/annotation/upload/`
    const DEMO_URL = `/annotation/demo/`
    const [matrixFileList, setMatrixFileList] = useState([]);
    const [labelsFileList, setLabelsFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [species, setSpecies] = useState(speciesOptions[0]);
    const [organ, setOrgan] = useState(organOptions[speciesOptions[0]][0]);
    const [tissue, setTissue] = useState(tissueOptions[organOptions[speciesOptions[0]][0]][0]);

    const router = useRouter()
    const [form] = Form.useForm();

    // 手动上传表单
    const handleUpload = () => {
        let rid = ""
        const formData = new FormData();
        matrixFileList.forEach((file) => {
            formData.append('matrixFile', file);
        });
        labelsFileList.forEach((file) => {
            formData.append('barcodesFile', file);
        });
        formData.append('title',form.getFieldValue('title'))
        formData.append('emailAddress',form.getFieldValue('emailAddress'))
        formData.append('species',species)
        formData.append('organ',organ)
        formData.append('tissue',tissue)
        formData.append('isDemo',"false")
        setUploading(true); // You can use any AJAX library you like
        fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
            .then(json => rid = json.rid)
            .then(() => {
                setMatrixFileList([]);
                setLabelsFileList([]);
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
                setUploading(false);
                router.reload()
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const layout = {
        labelAlign: "left",
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
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
        setLabelsFileList([]);
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

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Button type={"link"} onClick={throttle(1000,onRunDemo)}>
                            E14.5 Mouse Whole Brain Stereo-seq
                        </Button>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <Button type={"link"} onClick={throttle(1000,onRunDemo)}>
                            Mouse Embryo seqFISH
                        </Button>
                    ),
                },
            ]}
        />
    );

    return(
        <Form {...layout} layout={'horizontal'} form={form}
              onFinish={throttle(1000,handleUpload)}
              name="control-hooks"
              validateMessages={validateMessages}
              style={{width:600}}>
            <Form.Item name="title" label="Project Title"
                       rules={[
                           {
                               required: true,
                               max: 60,
                           },
                       ]}
            >
                <Input placeholder='Enter project title'/>
            </Form.Item>
            <Form.Item name="emailAddress" label="Email Address (optional)"
                       rules={[
                           {
                               required: false,
                               type:'email',
                               max:50
                           },
                       ]}
            >
                <Input placeholder='Enter your email address' />
            </Form.Item>
            <SelectSpeciesOrganTissue
                speciesOptions={speciesOptions}
                organOptions={organOptions}
                tissueOptions={tissueOptions}
                species={species}
                setSpecies={setSpecies}
                organ={organ}
                setOrgan={setOrgan}
                tissue={tissue}
                setTissue={setTissue}
            />

            <MatrixFileUpload setFileList={setMatrixFileList}
                              fileList={matrixFileList}
            />
            <LabelsFileUpload setFileList={setLabelsFileList}
                                fileList={labelsFileList}
            />

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" disabled={
                    matrixFileList.length === 0 ||
                    labelsFileList.length === 0
                }
                        loading={uploading} className={"btn-upload"}>
                    {uploading ? 'Uploading...' : 'Start Upload'}
                </Button>
                <Button type="ghost" htmlType="button" onClick={onReset} className={"btn-upload"}>
                    Reset
                </Button>
                <Dropdown
                    overlay={menu}
                >
                    <Button type="primary" htmlType="button" className={"btn-upload"}>
                        Run Example
                    </Button>
                </Dropdown>
            </Form.Item>
        </Form>
    )
}