import {Button, Form, Input, message} from "antd";
import SelectSpeciesOrganTissue from "./SelectSpeciesOrganTissue";
import MatrixFileUpload from "./MatrixFileUpload";
import LabelsFileUpload from "./LabelsFileUpload";
import RunExampleModule from "./RunExampleModule"
import {throttle} from "../../util";
import {useState} from "react";
import {useRouter} from "next/router";


export default function SpatialMapping(props){
    const {
        speciesOptions,
        organOptions,
        tissueOptions,
        validateMessages
    } = props
    const UPLOAD_URL = `/annotation/upload/`
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
            formData.append('labelsFile', file);
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
            span: 9,
        },
        wrapperCol: {
            span: 15,
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
        console.log("reset")
    };

    return(
        <Form {...layout} layout={'horizontal'} form={form}
              onFinish={throttle(1000,handleUpload)}
              name="control-hooks"
              validateMessages={validateMessages}
              style={{width:600}}>
            <Form.Item name="title" label="Job Title"
                       rules={[
                           {
                               required: true,
                               max: 50,
                           },
                       ]}
            >
                <Input placeholder='Enter job title'/>
            </Form.Item>
            <Form.Item name="emailAddress" label="Email Address (optional)"
                       rules={[
                           {
                               required: false,
                               type:'email',
                               max:40
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
                <RunExampleModule
                    setUploading={setUploading}
                />
            </Form.Item>
        </Form>
    )
}