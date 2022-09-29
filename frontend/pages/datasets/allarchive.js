import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import TableLayout from "../../components/Datasets/TableLayout.js";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Space} from "antd";
import {DateFomatter} from "../../components/util";

export async function getServerSideProps() {
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/datasets-list/all")
    // 取搜索结果数组中的第一个结果
    const data = await res.json()
    let key = 1

    return {
        props: {
            data:data.map(item => {
                return {
                    key: key++,
                    st_id: item.id,
                    date_published: DateFomatter(new Date(item.date_published)),
                    method: item.method,
                    species: item.species,
                    strain: item.strain?item.strain:'--',
                    organ: item.organ,
                    tissue: item.tissue,
                    pathological: item.pathological,
                }
            }),
        }
    }
}


export default function AllArchive(props) {
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
                <TableLayout checkboxStyle={checkboxStyle} data={props.data} archive={"all"}></TableLayout>
            </div>
        </LayoutCustom>
    )
}