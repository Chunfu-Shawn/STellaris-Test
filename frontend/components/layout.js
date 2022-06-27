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
        margin: "90vh 0vh 0px 46%",
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
                <link rel="shortcut icon" href="/images/favicon_io/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png"/>
                <meta charSet="UTF-8"/>
                <meta name="og:title" content='Welcome to Spatial Trans Web' />
            </Head>
            <Navigator></Navigator>
            <BackTop>
                <button style={style}>UP</button>
            </BackTop>
            {children}
            <Footer></Footer>

        </>
    )
}
