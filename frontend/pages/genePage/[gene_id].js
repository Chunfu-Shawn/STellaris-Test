import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import {Anchor, Layout} from 'antd';
import React from "react";
import Error from "next/error";


export async function getServerSideProps(context) {

    if (Object.keys(context.params).length === 0) {
        return {
            notFound: true,
        }
    }

    // Pass post data to the page via props
    return {
        props: {
            gene_id:context.params.gene_id
        }
    }
}

export default function genePage(props) {

    if(!props) return <Error statusCode={404}></Error>
    else return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Gene Browser | '+ props.gene_id}</title>
            </Head>
            <div className="modal-body-stw" style={{padding:"15vh 2%",textAlign:"left"}}>
                <h1>{props.gene_id}</h1>
            </div>
        </LayoutCustom>
    )
}