import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import VitessceVisual from "../components/Datasets/DataPage/VitessceModule.js";
import React from "react";

export default function Help() {
    const duplicateOption = ['duplicate1','duplicate2','duplicate3']
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Help"}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"100vh"}}>
                <VitessceVisual duplicateOption={duplicateOption}></VitessceVisual>
            </div>
        </LayoutCustom>
    )
}