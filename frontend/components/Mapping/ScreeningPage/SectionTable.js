import {Table, Button, Modal, InputNumber, Divider, message, Col, Row} from "antd";
import React, {useState, useContext} from "react";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {DateFomatter} from "../../util";
import {AnnContext} from "../../../pages/mapping/resultPage/[rid]";
import {useRouter} from "next/router";


export default function SectionTable() {
    const annContext = useContext(AnnContext);
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [datasetId, setDatasetId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [cutoff, setCutoff] = useState(0.3);
    const [bandWidth, setBandWidth] = useState(20);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const sections = annContext.MIA.section_id
    const enrichmentScore = annContext.MIA.enrichment_score
    const datasetsInfo = annContext.MIA.datasets_info
    let size = sections.length
    let data = []
    console.log(datasetsInfo[2])
    for(let i=0;i<size;i++){
        let a={};
        a.key=sections[i].split("|")[1];
        a.st_id=sections[i].split("|")[0];
        a.section_id=sections[i].split("|")[1];
        a.enrichment_score=enrichmentScore[i];
        for(let j=0; j<datasetsInfo.length; j++){
            if (a.st_id === datasetsInfo[j]["id"]){
                a.method = datasetsInfo[j].method
                a.note = datasetsInfo[j].note
                a.pathological = datasetsInfo[j].pathological
                a.date_published = datasetsInfo[j].date_published
                a.developmental_stage = datasetsInfo[j].developmental_stage
            }
        }
        console.log(a)
        data.push(a);
    }
    const ANN_URL = `/mapping/annotate/`

    // 开始注释
    const handleOk = () => {
        setConfirmLoading(true);
        fetch(ANN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                rid: annContext.reqInfo.rid,
                datasetId: datasetId,
                sectionId: sectionId,
                cutoff: cutoff,
                bandWidth: bandWidth
            })
        }).then(() => {
            router.reload()
            message.success({
                content:'start annotating successfully!',
                style:{
                    marginTop: '12vh',
                },
            });
        }).catch(() => {
            router.reload()
            message.error({
                    content:'start annotating unsuccessfully.',
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                }
            );
        })
        .finally(() => {
            setOpen(false)
            setConfirmLoading(false);
        });
    };

    const onCutoffChange = (value) => {
        setCutoff(value);
    };
    const onBandWidthChange = (value) => {
        setBandWidth(value);
    };

    // column sort
    const handleSelect = (datasetId,sectionId) => () => {
        setOpen(true)
        setDatasetId(datasetId)
        setSectionId(sectionId)
    };

    const columns = [
        {
            title: 'ST ID',
            dataIndex: 'st_id',
            key: 'st_id',
            width:'18%',
            render: text => <a href={'/datasets/dataPage/'+text} target={"_blank"} rel={'noreferrer'}>{text}</a>,
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            ellipsis: true,
        },
        {
            title: 'Section ID',
            dataIndex: 'section_id',
            key: 'section_id',
            width:'15%',
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            ellipsis: true,
        },
        {
            title: 'Developmental Stage',
            dataIndex: 'developmental_stage',
            key: 'developmental_stage',
            render: text => text ? "--" : text,
            width: "13%",
            ellipsis: true,
        },
        {
            title: 'Pathological',
            dataIndex: 'pathological',
            key: 'pathological',
            width:'12%',
            filters: [
                {
                    text: 'TRUE',
                    value: 'TRUE',
                },
                {
                    text: 'FALSE',
                    value: 'FALSE',
                }],
            onFilter: (value, record) => record.pathological === value,
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width:'10%',
            filters: Array.from(new Set(data.map(
                value => value.method ))).map(
                item => {
                    return{
                        text: item,
                        value: item
                    }
                }
            ),
            onFilter: (value, record) => record.method.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            width: "13%",
            render: (text) => DateFomatter(new Date(text)),
            sorter: (a, b) => Date.parse(a.date_published) - Date.parse(b.date_published),
            ellipsis: true,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            width:'12%',
            render: text => text===null ? "--" : text,
            ellipsis: true,
        },
        {
            title: 'Score',
            dataIndex: 'enrichment_score',
            key: 'enrichment_score',
            width: "12%",
            sorter: (a, b) => a.enrichment_score - b.enrichment_score,
            defaultSortOrder: "descend",
            ellipsis: true,
        },
        {
            title: '',
            key: 'select',
            width: 80,
            render: (_, record) =>
                <Button type={"primary"} ghost={true} size={"small"}
                        onClick={handleSelect(record.st_id,record.section_id)}>
                    select
                </Button>,
        },
    ];


    return(
        <>
            <Modal
                title="Confirm your choice of ST section to proceed Spatial Mapping"
                centered
                open={open}
                onOk={handleOk}
                okText={"Continue"}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                width={600}
            >
                <p>Confirm your selected ST section: <b>{datasetId} ({sectionId})</b> to annotate your scRNA-seq data.</p>
                <Divider orientation="left" orientationMargin="0">
                    <span style={{fontSize:14}}>Advanced Parameters of Spatial Mapping </span>
                    <Link href={'/help/manual/mapping#advanced_parameters'}>
                        <a target={"_blank"}><QuestionCircleOutlined/></a>
                    </Link>
                </Divider>
                <Row justify={"space-evenly"}>
                    <Col span={12}>
                        <span>Divergence cutoff (0~1): </span>
                        <InputNumber
                            style={{
                                width: 100,
                            }}
                            size={"small"}
                            onChange={onCutoffChange}
                            defaultValue="0.3"
                            min="0.1"
                            max="1"
                            step="0.05"
                            stringMode
                        />
                    </Col>
                    <Col span={8}>
                        <span>Band width: </span>
                        <InputNumber
                            style={{
                                width: 100,
                            }}
                            size={"small"}
                            onChange={onBandWidthChange}
                            defaultValue="20"
                            min="5"
                            max="150"
                            step="5"
                            stringMode
                        />
                    </Col>
                </Row>
            </Modal>
            <span style={{float:"left",fontSize:"16px",color:"gray",margin:"10px 0"}}>
                {size} Sections
            </span>
            <Table columns={columns}
                   dataSource={data}
            />
        </>
    )
}