import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import TableLayout from "../../components/Datasets/TableLayout.js";
import {data} from '../../components/Datasets/getData&Options.js';
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Space} from "antd";

export default function AllArchive() {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <LayoutCustom>
            <Head>
                <title>STW | Datasets Archive</title>
            </Head>
            <div className={"modal-body-stw"} style={{padding:'100px 50px'}}>
                <div className="page-header">
                    <Space align="start">
                        <h1 style={
                            {
                                fontSize:"40px",
                            }
                        }>Spatial Transcriptome Datasets</h1>
                        <Link href={'/help/manual/datasets#main_page_help'}>
                            <a target={'_blank'} rel={"noreferrer"}>
                                <QuestionCircleOutlined  style={{fontSize:"20px",color:"#2b1970"}}/>
                            </a>
                        </Link>
                    </Space>
                </div>
                <TableLayout checkboxStyle={checkboxStyle} data={data} archive={"all"}></TableLayout>
            </div>
        </LayoutCustom>
    )
}