import React from 'react';
import Head from "next/head";
import {Divider, Typography} from "antd";
import LayoutCustom from "../components/LayoutCustom";
const {Title} = Typography

export default function About() {
    return (
        <LayoutCustom>
            <Head>
                <title>{'SNA | About'}</title>
            </Head>
            <div className="modal-body-stw" style={
                {
                    width:1440,
                    padding: 120,
                    textAlign: 'left'
                }}>
                <Typography>
                    <Title>Spatial Niche Anchor</Title>
                    <Divider/>
                    <p style={{fontSize:18}}>
                        SNA is a comprehensive web-based platform involved database about spatial transcriptome data and gene spatial expression and
                        tools about spatial alignment of sc/snRNA-seq data from a reference spatial data.
                    </p>
                </Typography>
            </div>
        </LayoutCustom>
    )
}