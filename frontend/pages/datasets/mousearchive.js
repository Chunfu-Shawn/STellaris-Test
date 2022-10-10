import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import TableLayout from "../../components/Datasets/TableLayout.js";
import {DateFomatter} from '../../components/util.js';
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {Space} from "antd";


export async function getServerSideProps() {
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/datasets-list/Mus musculus")
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

export default function MouseArchive(props) {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <LayoutCustom>
            <Head>
                <title>STW | Mouse Archive</title>
            </Head>
            <div className={"modal-body-stw"} style={{padding:'120px 80px'}}>
                <Space align="start" style={{height:120}}>
                    <span style={
                        {
                            fontSize:"45px",
                        }
                    }>Spatial Transcriptome Data - Mouse Archive</span>
                </Space>
                <TableLayout checkboxStyle={checkboxStyle} data={props.data} archive={"mouse"}></TableLayout>
            </div>
        </LayoutCustom>
    )
}