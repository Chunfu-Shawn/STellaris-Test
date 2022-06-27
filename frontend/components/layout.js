import Head from 'next/head'
import Link from 'next/link'
import Navigator from "./navigator.js";
import Footer from "./footer.js";
import Script from "next/script";
import {BackTop} from "antd";
// eslint-disable-next-line @next/next/no-document-import-in-page

export const siteTitle = "Spatial Trans Web"

export default function Layout({ children }) {
    const style = {
        // z-index让元件浮到最顶层
        zIndex:100,
        height: 40,
        width: 40,
        margin: "90vh 0vh 0px 81vh",
        lineHeight: '40px',
        borderRadius: 4,
        borderColor: "white",
        border:"1px solid",
        backgroundColor: '#22075e',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        position: 'fixed',

    };
    return (
        <>
            <Head>
                <link rel="short icon" href="/frontend/static/images/favicon_io/android-chrome-192x192.png" />
                <meta charSet="UTF-8"/>
                <meta name="og:title" content='Welcome to Spatial Trans Web' />
            </Head>
            <Navigator></Navigator>
            <a>
                <BackTop>
                <button style={style}>UP</button>
                </BackTop>
            </a>
            {children}
            <Footer></Footer>

        </>
    )
}
