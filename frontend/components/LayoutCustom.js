import Head from 'next/head'
import Navigator from "./navigator.js";
import FooterCustom from "./footer.js";
import {BackTop} from "antd";
// eslint-disable-next-line @next/next/no-document-import-in-page

export const siteTitle = "Spatial Trans Web "

export default function LayoutCustom({ children }) {
    const style = {
        // z-index让元件浮到最顶层
        height: 40,
        width: 40,
        borderRadius: 4,
        borderColor: '#391085',
        backgroundColor: '#2a0b62',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
    };
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/favicon_io/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/favicon-16x16.png"/>
                <link href="https://fonts.googlefonts.cn/css?family=Open+Sans" rel="stylesheet"/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=1440,height=1000,user-scalable=yes"/>
                <meta name="og:title" content='Welcome to Spatial Trans Web' />
            </Head>
            <Navigator></Navigator>
            <BackTop duration={100} visibilityHeight={1000} style={{right:60}}>
                <button style={style}>UP</button>
            </BackTop>
            {children}
            <FooterCustom></FooterCustom>
        </>
    )
}
