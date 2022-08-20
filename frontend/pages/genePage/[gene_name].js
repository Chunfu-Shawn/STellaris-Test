import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import {Anchor, Layout} from 'antd';
import React from "react";
import Error from "next/error";


export async function getServerSideProps(context) {
    // params contains the post `st_id`.
    // If the route is like /datapages/1, then params.st_id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
            "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/datasets-JSON/"+context.params.st_id)
    const data = await res.json()
    if (Object.keys(data).length === 0) {
        return {
            notFound: true,
        }
    }

    // Pass post data to the page via props
    return {
        props: {
            data:data,
            config:config
        }
    }
}

export default function genePage(props) {

    if(!props) return <Error statusCode={404}></Error>
    else return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Browser'}</title>
            </Head>
            <Layout>
            </Layout>
        </LayoutCustom>
    )
}