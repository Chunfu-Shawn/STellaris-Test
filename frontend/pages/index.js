import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import MainPage from "../components/mainpage.js";

export default function Home() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <div className={"mainbody"}>
                <MainPage></MainPage>
            </div>
        </LayoutCustom>
    )
}