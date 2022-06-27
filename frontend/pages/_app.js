import '../static/bootstrap-3.4.1-dist/css/bootstrap.css'
import '../styles/mainpage.css'
import '../styles/globals.css'
import Head from "next/head.js";

function MyApp({ Component, pageProps }) {
    return(
        <Component {...pageProps} />
    )
}

export default MyApp
