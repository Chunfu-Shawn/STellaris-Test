import {Table, Button, Modal, InputNumber, Divider, message} from "antd";
import React, {useState, useContext} from "react";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {DateFomatter} from "../../util";
import {AnnContext} from "../../../pages/annotation/resultPage/[rid]";
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
        a.key=sections[i].split("|")[0];
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
        data.push(a);
    }
    const ANN_URL = `/annotation/annotate/`

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
            message.success({
                content:'start annotating successfully!',
                style:{
                    marginTop: '12vh',
                },
            });
            router.reload()
        }).catch(() => {
            message.error({
                    content:'start annotating unsuccessfully.',
                    style:{
                        marginTop: '12vh',
                    },
                    duration:3,
                }
            );
            router.reload()
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
            render: text => <Link href={'/datasets/dataPage/'+text}><a target={"_blank"}>{text}</a></Link>,
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
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width:'10%',
            sorter: (a, b) => {
                if(a.method > b.method) return 1
                else return -1
            },
        },
        {
            title: 'Note',
            dataIndex: 'note',
            key: 'note',
            width:'12%',
            render: text => text ? "--" : text,
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
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            width: "13%",
            render: (text) => DateFomatter(new Date(text)),
            sorter: (a, b) => Date.parse(a.date_published) - Date.parse(b.date_published),
            ellipsis: true,
        },
        {
            title: 'Developmental Stage',
            dataIndex: 'developmental_stage',
            render: text => text ? "--" : text,
            key: 'developmental_stage',
            width: "13%",
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
                title="Confirm Section to continue annotation"
                centered
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                width={600}
            >
                <p>Confirm Your Selected Section: <b>{datasetId} ({sectionId})</b> to annotate your scRNA-seq data.</p>
                <Divider orientation="left" orientationMargin="0">
                    <span style={{fontSize:14}}>Advanced Annotation Parameters </span>
                    <Link href={'/help/manual/datasets#data_page_attributes'}>
                        <a target={"_blank"}><QuestionCircleOutlined/></a>
                    </Link>
                </Divider>
                <span>cutoff: </span>
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
                <span>band width: </span>
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