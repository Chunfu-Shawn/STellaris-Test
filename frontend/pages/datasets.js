import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../components/LayoutCustom.js'
import HumanMap from '../components/Datasets/HumanMap.js'
import MouseMap from "../components/Datasets/MouseMap.js";
import {Col, Row} from "antd";


export default function Datasets() {
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle +'| Dataset Browser'}</title>
            </Head>
            <div className={'mainbody'}>
                <div className="modal-body-stw">
                    <div className={"inner"} >
                        <div className="text-left">
                            <h1 style={{color:"white",fontSize:"40px"}}>Spatial Transcriptomics Dataset Browser </h1><br/>
                        </div>
                        <p className={"lead text-justify"}>
                            STellaris aims to provide a comprehensive compilation of spatial transcriptomic (ST) data
                            spanning a wide variety of biological systems, which serves as the foundation to assist in
                            mapping spatial location for single-cell transcriptome data. We included 100 datasets comprising
                            774 sections across organs, developmental stages and pathological states in human and mouse.
                            All curated ST datasets were processed by a centralized workflow. We provide this interface
                            for researchers to navigate through this catalog. Choose the ST data of your concern and
                            explore the spatially resolved expression profile of genes of interest.
                        </p>
                    </div>
                    <Row justify={"space-evenly"} style={{margin:"80px 0px"}}>
                        <Col span={12}>
                            <HumanMap></HumanMap>
                        </Col>
                        <Col span={12}>
                            <MouseMap></MouseMap>
                        </Col>
                    </Row>
                    <div className={"lead"} id={"bottoms"}>
                        <a href={"/datasets/allarchive"}>
                            <button type="button" className="btn btn-alldata btn-lg">All</button>
                        </a>
                        <a href={"/datasets/humanarchive"}>
                            <button type="button" className="btn btn-data btn-lg">Human Archive</button>
                        </a>
                        <a href={"/datasets/mousearchive"}>
                            <button type="button" className="btn btn-data btn-lg">Mouse Archive</button>
                        </a>
                    </div>
                </div>
            </div>
        </LayoutCustom>
    )
}