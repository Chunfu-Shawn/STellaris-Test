import {Button, Collapse, Divider, Modal, Table} from "antd";
import CoExpressedGenesHeatmap from "./CoExpressedGenesHeatmap";
import React from "react";

const { Panel } = Collapse;

export default function CoExpressedGenes(props){
    const columns = [
        {
            title: 'Genes Name',
            dataIndex: 'Genes Name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'STW-H-Spinal_Cord-ST-1',
            dataIndex: 'STW-H-Spinal_Cord-ST-1',
        },
        {
            title: 'STW-H-Spinal_Cord-ST-2',
            dataIndex: 'STW-H-Spinal_Cord-ST-2',
        },
        {
            title: 'STW-H-Bone-ST-1',
            dataIndex: 'STW-H-Bone-ST-1',
        },
    ];


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
        <div name={"CoE-Genes"} style={{marginLeft:20}}>
            <a id={"CoE-Genes"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0"><b>Co-expressed Genes</b></Divider>
            <CoExpressedGenesHeatmap
                tissue={["Brain"]}
                genes={[
                    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a', '10a', '11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'
                ]}
                supportiveDatasets={[5,10,20,12,12,1,4,6,8,3,1,9,2,14,21,16,18,19,2,12,5,5,12,3]}
            />
            <CoExpressedGenesHeatmap
                tissue={["Heart"]}
                genes={[
                    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a', '10a', '11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'
                ]}
                supportiveDatasets={[2,10,2,13,12,1,9,6,3,3,1,9,2,14,14,16,1,1,2,2,5,5,2,3]}
            />
            <CoExpressedGenesHeatmap
                tissue={["Liver"]}
                genes={[
                    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
                    '7a', '8a', '9a', '10a', '11a',
                    '12p', '1p', '2p', '3p', '4p', '5p',
                    '6p', '7p', '8p', '9p', '10p', '11p'
                ]}
                supportiveDatasets={[15,1,2,2,2,6,6,3,9,1,2,10,12,14,11,19,1,9,12,2,13,11,2,13]}
            />
            <Collapse collapsible="header" defaultActiveKey={['1']} bordered={false} ghost>
                <Panel
                    header={
                        <div style={{width:"1000px"}}>
                            <span><b>Correlation coefficient</b> between co-expressed genes and target gene,
                                    click to show or hide the table.</span>
                            <Button size={"small"} onClick={exportToCsv} style={{float:"right"}}>
                                Export to CSV
                            </Button>
                        </div>
                    }
                    key="1">
                    <Table bordered columns={columns}/>
                </Panel>
            </Collapse>
        </div>
    )
}