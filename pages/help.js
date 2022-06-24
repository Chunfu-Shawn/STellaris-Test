import Head from 'next/head'
import Layout from '../components/layout'
import BodyMap from "../components/Datasets/BodyMap.js";
const title = "STW - Help"

export default function Contact() {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body">
            </div>
        </Layout>
    )
}