import Head from 'next/head'
import Layout from '../components/layout'
import UploadSuccess from "../components/upload_success";
const title = "STW - Wait ..."

export default function Waitpage() {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <UploadSuccess></UploadSuccess>
        </Layout>
    )
}