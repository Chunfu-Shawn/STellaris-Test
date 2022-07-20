import Head from 'next/head'
import Layout from '../../components/layout.js'
import Link from "next/link";
import DataTable from "../../components/Datasets/DataTable";
const title = "STW - Datasets Archive"

export default function AllArchive() {

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body-stw">
                <div className="page-header">
                    <h1>Spatial Transcritome Datasets </h1>
                </div>
                <DataTable></DataTable>
            </div>
        </Layout>
    )
}