import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import TableLayout from "../../components/Datasets/TableLayout.js";
import {mouseData} from '../../components/Datasets/getData&Options.js';
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Space} from "antd";

export default function MouseArchive() {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <LayoutCustom>
            <Head>
                <title>STW | Mouse Archive</title>
            </Head>
            <div className="modal-body-stw" style={{padding:'100px 80px'}}>
                <div className="page-header">
                    <Space align="start">
                        <h1 style={
                            {
                                fontSize:"40px",
                            }
                        }>Spatial Transcriptome Data - Mouse Archive</h1>
                        <Link href={'/help/manual/datasets#main_page_help'}>
                            <a target={'_blank'} rel={"noreferrer"}>
                                <QuestionCircleOutlined  style={{fontSize:"20px",color:"#2b1970"}}/>
                            </a>
                        </Link>
                    </Space>
                </div>
                <TableLayout checkboxStyle={checkboxStyle} data={mouseData} archive={"mouse"}></TableLayout>
            </div>
        </LayoutCustom>
    )
}