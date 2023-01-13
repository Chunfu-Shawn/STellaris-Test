import {Button, Form, Input, message} from "antd";
import MatrixFileUpload from "./ForScRNAseq/MatrixFileUpload";
import LabelsFileUpload from "./ForScRNAseq/LabelsFileUpload";
import RunExampleModule from "./ForSingleCellMultiomics/RunExampleModule";
import {throttle} from "../../util";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {getMappingModuleOptions} from "../../Datasets/getData&Options";
import FragmentsFileUpload from "./ForSingleCellMultiomics/FragmentsFileUpload";
import PeakFileUpload from "./ForSingleCellMultiomics/PeakFileUpload";
import SelectSpeciesGenomeOrganTissue from "./ForSingleCellMultiomics/SelectSpeciesGenomeOrganTissue";


export default function MappingForSingleCellMultiomics(props) {
    const {
        validateMessages
    } = props
    const UPLOAD_URL = `/mapping/multiomics`
    const [matrixFileList, setMatrixFileList] = useState([]);
    const [labelsFileList, setLabelsFileList] = useState([]);
    const [fragmentsFileList, setFragmentsFileList] = useState([]);
    const [peakFileList, setPeakFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [speciesOptions, setSpeciesOptions] = useState(null);
    const [genomeOptions, setGenomeOptions] = useState(null);
    const [organOptions, setOrganOptions] = useState(null);
    const [tissueOptions, setTissueOptions] = useState(null);
    const [species, setSpecies] = useState(null);
    const [genome, setGenome] = useState(null);
    const [organ, setOrgan] = useState(null);
    const [tissue, setTissue] = useState(null);

    const fetchSpecieOrganTissueOptions = async () => {
        let {speciesOptions, genomeOptions, organOptions, tissueOptions} = await fetch("/api/datasets-info/all")
            .then(res => res.json()).then(data => getMappingModuleOptions(data))
        setSpeciesOptions(speciesOptions)
        setGenomeOptions(genomeOptions)
        setOrganOptions(organOptions)
        setTissueOptions(tissueOptions)
        setSpecies(speciesOptions[0])
        setGenome(genomeOptions[speciesOptions[0]][0])
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
            formData.append('matrixFile', file);
        });
        labelsFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            formData.append('labelsFile', file);
        });
        fragmentsFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            formData.append('fragmentsFile', file);
        });
        if (peakFileList.length !== 0)
            peakFileList.forEach((file) => {
                file.percent = 0
                file.status = 'uploading'
                formData.append('peakFile', file);
            });
        formData.append('title', form.getFieldValue('title'))
        formData.append('emailAddress', form.getFieldValue('emailAddress'))
        formData.append('species', species)
        formData.append('genome', genome)
        formData.append('organ', organ)
        formData.append('tissue', tissue)
        formData.append('type', "multiomics")
        formData.append('isDemo', "false")
        setUploading(true);
        // You can use any AJAX library you like
        console.log(formData.get("fragmentsFile"))
        axios({
            method: 'POST',
            headers: {'Content-Type':'multipart/form-data'},
            url: UPLOAD_URL,
            data: formData,
            onUploadProgress: progressEvent => {
                matrixFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    setMatrixFileList([file])
                })
                labelsFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 788 | 0);
                    setLabelsFileList([file])
                })
                fragmentsFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 132 | 0);
                    setLabelsFileList([file])
                })
                peakFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 477 | 0);
                    setLabelsFileList([file])
                })
            },
        }).then(response => response.data)
            .then(json => json.rid)
            .then(rid => {
                matrixFileList.forEach((file) => {
                    file.status = 'done'
                });
                labelsFileList.forEach((file) => {
                    file.status = 'done'
                });
                fragmentsFileList.forEach((file) => {
                    file.status = 'done'
                });
                peakFileList.forEach((file) => {
                    file.status = 'done'
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
                });
                labelsFileList.forEach((file) => {
                    file.status = 'error'
                });
                fragmentsFileList.forEach((file) => {
                    file.status = 'error'
                });
                peakFileList.forEach((file) => {
                    file.status = 'error'
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
        console.log("reset")
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
                    <SelectSpeciesGenomeOrganTissue
                        speciesOptions={speciesOptions}
                        genomeOptions={genomeOptions}
                        organOptions={organOptions}
                        tissueOptions={tissueOptions}
                        species={species}
                        setSpecies={setSpecies}
                        genome={genome}
                        setGenome={setGenome}
                        organ={organ}
                        setOrgan={setOrgan}
                        tissue={tissue}
                        setTissue={setTissue}
                    />
                    : null
            }
            <div style={{textAlign:"left",marginBottom:15}}>
                <span style={{fontSize:17,fontWeight:"bold"}}><i>scRNA-seq:</i></span>
            </div>
            <MatrixFileUpload setFileList={setMatrixFileList}
                              fileList={matrixFileList}
                              uploading={uploading}
            />
            <LabelsFileUpload setFileList={setLabelsFileList}
                              fileList={labelsFileList}
                              uploading={uploading}
            />
            <div style={{textAlign:"left",marginBottom:15}}>
                <span style={{fontSize:17,fontWeight:"bold"}}><i>single-cell multiomics:</i></span>
            </div>
            <FragmentsFileUpload setFileList={setFragmentsFileList}
                                 fileList={fragmentsFileList}
                                 uploading={uploading}
            />
            <PeakFileUpload setFileList={setPeakFileList}
                            fileList={peakFileList}
                            uploading={uploading}
            />

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit"
                        disabled={
                        matrixFileList.length === 0 ||
                        labelsFileList.length === 0 ||
                        fragmentsFileList.length === 0
                    }
                        loading={uploading}
                        className={"btn-upload"}
                >
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