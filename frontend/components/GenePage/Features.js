import {Button, Collapse, Divider} from "antd";
import {LinkOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";
import AttributeLayout from "./AttributeLayout";
import Link from "next/link.js";
import TranscriptTable from "./TranscriptTable.js";

const { Panel } = Collapse;

export default function Features(props){
    // export table to csv or excel
    const exportToCsv = () => {
        const replacer = (key, value) => (value === null ? "" : value);
        let dataDownload = props.trans;
        const header = Object.keys(dataDownload[0]);
        let csv = dataDownload.map(row =>
            header
                .map(fieldName => JSON.stringify(row[fieldName], replacer))
                .join(",")
        );
        csv.unshift(header.join(","));
        csv = csv.join("\r\n");
        csv = "data:text/csv;charset=utf-8,\uFEFF" + csv;;
        const link = document.createElement("a");
        link.href = encodeURI(csv);
        link.download = `${props.trans[0].ensembl_id}_transcripts.csv`;
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named 'my_data.csv'.
        document.body.removeChild(link); // Required for FF
    };

    return(
        <>
            <Divider orientation="left" orientationMargin="0">
                <b>Features </b>
                <Link href={'/help/features/browser'}><a target={"_blank"}><QuestionCircleOutlined/></a></Link>
            </Divider>
            <div name={"Genomic Context"} style={{marginLeft:"20px"}}>
                <a id={"Genomic Context"} style={{position: 'relative', top: "-150px"}}></a>
                <Divider orientation="left" orientationMargin="0" dashed><b>Genomic Context</b></Divider>
                <AttributeLayout attribute={"Location"}>
                    <>
                        <a target={"_blank"} href={`http://www.ensembl.org/Homo_sapiens/Location/View?g=${props.data.ensembl_id}`}>
                            Chromosome  {`${props.data.chrom_scaf}: ${props.data.start}-${props.data.end}`}<LinkOutlined />
                        </a>
                        <span>{props.data.strand === "1"?" forward strand.":" reverse strand."}</span>
                    </>
                </AttributeLayout>
                <AttributeLayout attribute={"Chromosomal Location"}>
                    {props.data.map_location}
                </AttributeLayout>
            </div>
            <div name={"Transcript"} style={{marginLeft:"20px"}}>
                <a id={"Transcript"} style={{position: 'relative', top: "-150px"}}></a>
                <Divider orientation="left" orientationMargin="0" dashed><b>Transcript</b></Divider>
                <Collapse collapsible="header" defaultActiveKey={['1']} bordered={false}>
                    <Panel
                        header={
                        <div style={{width:"70vw"}}>
                            <span>This gene has <b>{props.trans.length}</b> transcript(s), click to show or hide the table.</span>
                            <Button size={"small"} onClick={exportToCsv} style={{float:"right"}}>
                                Export to CSV
                            </Button>
                        </div>
                    }
                        key="1">
                        <TranscriptTable trans={props.trans}/>
                    </Panel>
                </Collapse>
            </div>
        </>
    )
}