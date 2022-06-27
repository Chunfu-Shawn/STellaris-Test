import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout.js'
import MouseMap from "../components/Datasets/MouseMap.js";

export default function Contact() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle+"- Help"}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"100vh"}}>
                <MouseMap/>
            </div>
        </Layout>
    )
}