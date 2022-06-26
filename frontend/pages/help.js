import Head from 'next/head'
import Layout from '../components/layout.js'
import BodyMap from "../components/Datasets/BodyMap.js";
const title = "STW - Help"

export default function Contact() {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body-stw">
            </div>
        </Layout>
    )
}