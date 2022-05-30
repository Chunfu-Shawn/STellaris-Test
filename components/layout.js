import Head from 'next/head'
import Link from 'next/link'
import Navigator from "./navigator";
import Footer from "./footer";
import Script from "next/script";

const name = 'Chunfu Shawn'
export const siteTitle = 'Welcome to Spatial Trans Web'

export default function Layout({ children, home }) {
    return (
        <>
            <Head>
                <link rel="short icon" href="/images/favicon_io/android-chrome-192x192.png" />
                <meta charSet="UTF-8"/>
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta name="og:title" content={siteTitle} />
            </Head>

            <Navigator></Navigator>
            {children}
            <Footer></Footer>
        </>
    )
}
