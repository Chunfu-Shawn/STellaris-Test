import Head from 'next/head'
import Layout from '../../components/layout.js'
import Link from "next/link";
import TableLayout from "../../components/Datasets/TableLayout.js";
const title = "STW - Datasets Archive"

export default function AllArchive() {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body-stw">
                <div className="page-header">
                    <h1>Spatial Transcritome Datasets </h1>
                </div>
                <TableLayout checkboxStyle={checkboxStyle}></TableLayout>
            </div>
        </Layout>
    )
}