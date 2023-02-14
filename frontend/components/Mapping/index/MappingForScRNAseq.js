import {Button, Form, Input, message} from "antd";
import SelectSpeciesOrganTissue from "./ForScRNAseq/SelectSpeciesOrganTissue";
import MatrixFileUpload from "./ForScRNAseq/MatrixFileUpload";
import LabelsFileUpload from "./ForScRNAseq/LabelsFileUpload";
import RunExampleModule from "./ForScRNAseq/RunExampleModule";
import {throttle} from "../../util";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {getMappingModuleOptions} from "../../Datasets/getData&Options";


export default function MappingForScRNAseq(props) {
    const {
        validateMessages
    } = props
    const UPLOAD_URL = `/mapping/scRNA-seq/`
    const [matrixFileList, setMatrixFileList] = useState([]);
    const [labelsFileList, setLabelsFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [speciesOptions, setSpeciesOptions] = useState(null);
    const [organOptions, setOrganOptions] = useState(null);
    const [tissueOptions, setTissueOptions] = useState(null);
    const [species, setSpecies] = useState(null);
    const [organ, setOrgan] = useState(null);
    const [tissue, setTissue] = useState(null);

    const fetchSpecieOrganTissueOptions = async () => {
        let {speciesOptions, organOptions, tissueOptions} = await fetch("/api/datasets-info/all")
            .then(res => res.json()).then(data => getMappingModuleOptions(data))
        setSpeciesOptions(speciesOptions)
        setOrganOptions(organOptions)
        setTissueOptions(tissueOptions)
        setSpecies(speciesOptions[0])
        setOrgan(organOptions[speciesOptions[0]][0])
        setTissue(tissueOptions[speciesOptions[0]][organOptions[speciesOptions[0]][0]][0])
    }

    // load species organ tissue options
    useEffect(() => {
        fetchSpecieOrganTissueOptions()
    }, [])

    const router = useRouter()
    const [form] = Form.useForm();

    // 手动上传表单
    const handleUpload = () => {
        const formData = new FormData();
        matrixFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            setMatrixFileList([file])
            formData.append('matrixFile', file);
        });
        labelsFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            setLabelsFileList([file])
            formData.append('labelsFile', file);
        });
        formData.append('title', form.getFieldValue('title'))
        formData.append('emailAddress', form.getFieldValue('emailAddress'))
        formData.append('species', species)
        formData.append('organ', organ)
        formData.append('tissue', tissue)
        formData.append('type', "scRNA-seq")
        formData.append('isDemo', "false")
        setUploading(true);
        // You can use any AJAX library you like
        axios({
            method: 'post',
            url: UPLOAD_URL,
            data: formData,
            onUploadProgress: progressEvent => {
                matrixFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    setMatrixFileList([file])
                })
                labelsFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 380 | 0);
                    setLabelsFileList([file])
                });
            },
        }).then(response => response.data)
            .then(json => json.rid)
            .then(rid => {
                matrixFileList.forEach((file) => {
                    file.status = 'done'
                    setMatrixFileList([file])
                });
                labelsFileList.forEach((file) => {
                    file.status = 'done'
                    setLabelsFileList([file])
                });
                message.success({
                    content: 'upload successfully!',
                    style: {
                        marginTop: '12vh',
                    },
                });
                //nextjs路由跳转到结果页面
                router.push('/mapping/resultPage/' + rid)
            })
            .catch(() => {
                matrixFileList.forEach((file) => {
                    file.status = 'error'
                    setMatrixFileList([file])
                });
                labelsFileList.forEach((file) => {
                    file.status = 'error'
                    setLabelsFileList([file])
                });
                message.error({
                        content: 'upload unsuccessfully.',
                        style: {
                            marginTop: '12vh',
                        },
                        duration: 3,
                    }
                );
                setUploading(false);
                //router.reload()
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
    };

    return (
        <Form {...layout} layout={'horizontal'} form={form}
              onFinish={throttle(1000, handleUpload)}
              name="control-hooks"
              validateMessages={validateMessages}
              style={{width: 600}}>
            <Form.Item name="title" label="Job Title"
                       rules={[
                           {
                               required: true,
                               max: 80,
                           },
                       ]}
            >
                <Input placeholder='Enter job title'/>
            </Form.Item>
            <Form.Item name="emailAddress" label="Email Address (optional)"
                       rules={[
                           {
                               required: false,
                               type: 'email',
                               max: 40
                           },
                       ]}
            >
                <Input placeholder='Enter your email address'/>
            </Form.Item>

            {
                speciesOptions ?
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
                    : null
            }

            <MatrixFileUpload setFileList={setMatrixFileList}
                              fileList={matrixFileList}
                              uploading={uploading}
            />
            <LabelsFileUpload setFileList={setLabelsFileList}
                              fileList={labelsFileList}
                              uploading={uploading}
            />

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" disabled={
                    matrixFileList.length === 0 ||
                    labelsFileList.length === 0
                }
                        loading={uploading} className={"btn-upload"}>
                    {uploading ? 'Uploading...' : 'Upload'}
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