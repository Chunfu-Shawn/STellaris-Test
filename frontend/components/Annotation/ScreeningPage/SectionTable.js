import {Table, Button, Modal, InputNumber, Divider, message} from "antd";
import React, {useState} from "react";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";


export default function SectionTable(props) {
    const [open, setOpen] = useState(false);
    const [datasetId, setDatasetId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [cutoff, setCutoff] = useState(0.3);
    const [sortedInfo, setSortedInfo] = useState({});
    const [confirmLoading, setConfirmLoading] = useState(false);
    const sections = props.MIA.section_id
    const enrichmentScore = props.MIA.enrichment_score
    let size = sections.length
    let data = []
    for(let i=0;i<size;i++){
        let a={};
        a.key=sections[i].split("|")[0];
        a.st_id=sections[i].split("|")[0];
        a.section_id=sections[i].split("|")[1];
        a.enrichment_score=enrichmentScore[i];
        data.push(a);
    }
    const ANN_URL = `/annotation/annotate/`

    // 开始注释
    const handleOk = () => {
        setConfirmLoading(true); // You can use any AJAX library you like
        fetch(ANN_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                datasetId: datasetId,
                sectionId: sectionId,
                cutoff: cutoff
            })
        }).then(() => {
            message.success({
                content:'start annotating successfully!',
                style:{
                    marginTop: '12vh',
                },
            });
        }).catch(() => {
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

    const onNumberChange = (value) => {
        setCutoff(value);
    };

    // column sort
    const handleChange = (pagination,filter,sorter) => {
        setSortedInfo(sorter);
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
            width:'20%',
            render: text => <Link href={'/datasets/dataPage/'+text}><a target={"_blank"}>{text}</a></Link>,
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'st_id' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Section ID',
            dataIndex: 'section_id',
            key: 'section_id',
            width:'20%',
            sorter: (a, b) => {
                if(a.st_id > b.st_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'section_id' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Method',
            dataIndex: 'method',
            key: 'method',
            width:'15%',
            sorter: (a, b) => {
                if(a.method > b.method) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'method' ? sortedInfo.order : null,
        },
        {
            title: 'Date Published',
            dataIndex: 'date_published',
            key: 'date_published',
            width: "15%",
            sorter: (a, b) => Date.parse(a.date_published) - Date.parse(b.date_published),
            sortOrder: sortedInfo.columnKey === 'date_published' ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: 'Enrichment Score',
            dataIndex: 'enrichment_score',
            key: 'enrichment_score',
            width: "20%",
            sorter: (a, b) => a.enrichment_score - b.enrichment_score,
            sortOrder: sortedInfo.columnKey === 'enrichment_score' ? sortedInfo.order : null,
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
                    onChange={onNumberChange}
                    defaultValue="0.3"
                    min="0.1"
                    max="1"
                    step="0.05"
                    stringMode
                />
            </Modal>
            <span style={{float:"left",fontSize:"16px",color:"gray",margin:"10px 0"}}>
                Species: Organ: Tissue: 0 Sections</span>
            <Table columns={columns}
                   dataSource={data}
                   onChange={handleChange}
            />
        </>
    )
}