import React from 'react';
import Head from "next/head";
import {Divider, Typography} from "antd";
import LayoutCustom from "../components/LayoutCustom";
import IntroductionModule from "../components/MainPage/IntroductionModule";
const {Title} = Typography

export default function About() {
    let contextHolder = "Cras justo odio, dapibus ac facilisis in, egestas eget quam."
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
                    <div className="intro-card-wrapper" >
                        <IntroductionModule title={"Spatial Transcritome Datasets"} link={"/datasets"}
                                            pic={"/images/index/Datasets.svg"}
                                            context={contextHolder}
                        /><br/>
                        <IntroductionModule title={"Spatial Mapping Tool"} link={"/mapping"}
                                            pic={"/images/index/Mapping.svg"}
                                            context={contextHolder}
                        /><br/>
                        <IntroductionModule title={"Gene Search"}  link={"/search"}
                                            pic={"/images/index/GeneSearch.svg"}
                                            context={"The Gene Search module would help users to search for the basic information and" +
                                                "spatial expression pattern of a interested gene. Gene Page contains some annotation" +
                                                "sections, such as Summary, Spatially variable Expression, Co-expressed Genes, Highly-expressed Clusters, " +
                                                "Genomic Context, Pseudobulk RNA-seq Expression and Transcripts, which present a whole spatial expression profile about a gene."}
                        />
                    </div>
                </Typography>
            </div>
        </LayoutCustom>
    )
}