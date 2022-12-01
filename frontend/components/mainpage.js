import PlaceHolder from "./MainPage/PlaceHolder.js";
import IntroductionModule from "./MainPage/IntroductionModule.js";
import {Divider, Row} from "antd";
import React from "react";
import UploadModule from "./Mapping/index/UploadModule";
import GuidanceMain from "./MainPage/GuidanceMain";
import GeneBrowserMain from "./MainPage/GeneBrowserMain";

export default function MainPage() {
    let contextHolder = "Cras justo odio, dapibus ac facilisis in, egestas eget quam."
    return(
        <>
            <div className="modal-body-stw">
                <div className="cover-container" >
                    <div className="inner cover" >
                        <h1 className="cover-heading">Spatial Transcriptome Web Database and Tools</h1>
                        <p className="lead">
                            STW is a comprehensive webserver integrating database about spatial transcriptome data and gene spatial expression and
                            tools about integrating scRNA-seq and spatial transcriptomics data for further analysis.
                        </p>
                        <p className="lead">
                            <a href='#more' className="btn btn-lg btn-alldata">Know more</a>
                        </p>
                    </div>
                </div>
                <Row style={{margin:"0px 20px"}} gutter={50} justify="space-between" >
                    <div>
                        <GeneBrowserMain/>
                        <UploadModule/>
                    </div>
                    <div style={{width:350,float:"right"}}>
                        <GuidanceMain></GuidanceMain>
                    </div>
                </Row>
                <Divider style={{borderTop:"lightgray"}}>
                    <h1 className={"inner"} style={{color:"white"}}>KNOW MORE</h1>
                </Divider>
                <a id={"more"} style={{position: 'relative', top: "-200px"}}></a>
                <Row style={{margin:"20px 0px"}} gutter={[40,0]} justify="space-between" >
                    <PlaceHolder title={"ST Datasets"}
                                 context={"ST Datasets Archive providing data basic information, data visualization and data download."}
                                 link={"/datasets"} pic={"picture1.png"}/>
                    <PlaceHolder title={"Spatial Mapping"}
                                 context={"A tool to predict spatial location of submitted scRNA-seq referred to matched ST data from datasets archive."}
                                 link={"/mapping"} pic={"picture2.png"}/>
                    <PlaceHolder title={"Gene Browser"}
                                 context={"A tool to search for spatial expression profile of interested genes out of ST datasets archive across multi organs and tissues."}
                                 link={"/browser"} pic={"picture3.png"}/>
                </Row>
                <div className="intro-card-wrapper" >
                    <IntroductionModule title={"Spatial Transcritome Datasets"} link={"/datasets"}
                                        pic={"/images/index/Datasets.svg"}
                                        context={contextHolder}
                    /><br/>
                    <IntroductionModule title={"Spatial Mapping Tool"} link={"/mapping"}
                                        pic={"/images/index/Mapping.svg"}
                                        context={contextHolder}
                    /><br/>
                    <IntroductionModule title={"Gene Browser"}  link={"/browser"}
                                        pic={"/images/index/GeneBrowser.svg"}
                                        context={"The Gene Browser module would help users to search for the basic information and" +
                                            "spatial expression pattern of a interested gene. Gene Page contains some annotation" +
                                            "sections, such as Summary, Spatially variable Expression, Co-expressed Genes, Highly-expressed Clusters, " +
                                            "Genomic Context, Pseudobulk RNA-seq Expression and Transcripts, which present a whole spatial expression profile about a gene."}
                    />
                </div>
            </div>
        </>
    )


}