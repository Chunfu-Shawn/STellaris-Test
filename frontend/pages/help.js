import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout.js'

export default function Help() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle+"- Help"}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"100vh"}}>
            </div>
        </Layout>
    )
}