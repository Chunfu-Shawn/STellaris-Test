import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout.js'
import MainPage from "../components/mainpage.js";

export default function Home() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <MainPage></MainPage>
        </Layout>
    )
}