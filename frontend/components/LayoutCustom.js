import Head from 'next/head'
import Navigator from "./navigator.js";
import FooterCustomWithMap from "./footerWithMap.js";
import FooterCustom from "./footer.js";
import {BackTop} from "antd";
// eslint-disable-next-line @next/next/no-document-import-in-page

export const siteTitle = "STellaris "

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
                <link rel="shortcut icon" href="/images/favicon_io/logo2.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon_io/logo2.png" />
                <link rel="icon" type="image/png" sizes="128x128" href="/images/favicon_io/logo2-128x128.ico"/>
                <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon_io/logo2-64x64.ico"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon_io/logo2-32x32.ico"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon_io/logo2-16x16.ico"/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=1440,height=1000,user-scalable=yes"/>
                <meta name="og:title" content='Welcome to STellaris' />
            </Head>
            <Navigator></Navigator>
            <BackTop duration={100} visibilityHeight={1000} style={{right:60}}>
                <button style={style}>UP</button>
            </BackTop>
            {children}
            <div style={{flexGrow:1}}></div>
            {
                children[1].props.id === "home" ?
                <FooterCustomWithMap> </FooterCustomWithMap>
                :<FooterCustom> </FooterCustom>
            }
        </>
    )
}
