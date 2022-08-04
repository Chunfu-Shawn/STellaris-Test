import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import React from "react";

export default function Help() {
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Help"}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"100vh"}}>
            </div>
        </LayoutCustom>
    )
}