import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import MainPage from "../components/mainpage";

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