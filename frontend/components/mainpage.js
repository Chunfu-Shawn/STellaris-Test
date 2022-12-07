import PlaceHolder from "./MainPage/PlaceHolder.js";
import IntroductionModule from "./MainPage/IntroductionModule.js";
import {Divider, Row} from "antd";
import React from "react";
import UploadModule from "./Mapping/index/UploadModule";
import GuidanceMain from "./MainPage/GuidanceMain";
import GeneSearchMain from "./MainPage/GeneSearchMain";

export default function MainPage() {
    return(
        <>
            <div className="cover-container" >
                <div className="inner cover" >
                    <h1 className="cover-heading">STellaris: accurate spatial reconstruction of scRNA-seq</h1>
                    <p className="lead" style={{textAlign: "justify"}}>
                        STellaris is an integrated web application for accurate spatial reconstruction of scRNA-seq,
                        which is founded on a comprehensive compilation of public available ST datasets spanning organs,
                        developmental stages and diseases. The inferred spatial information of single cells will
                        subsequently facilitate the identification and validation of intercelluar communication.
                        We hope that STellaris will expand our understanding of scRNA-seq at spatial context.
                    </p>
                    <p className="lead">
                        <a href='about/' className="btn btn-lg btn-alldata">Know more</a>
                    </p>
                </div>
            </div>
            <div className="modal-body-stw" style={{paddingTop:50}}>
                <Row style={{margin:"0px 20px"}} gutter={50} justify="space-between" >
                    <div>
                        <GeneSearchMain/>
                        <UploadModule/>
                    </div>
                    <div style={{width:350,float:"right"}}>
                        <GuidanceMain></GuidanceMain>
                    </div>
                </Row>
                <Divider style={{borderTop:"lightgray"}}>
                    <h1 className={"inner"} style={{color:"white"}}>Tools</h1>
                </Divider>
                <a id={"more"} style={{position: 'relative', top: "-200px"}}></a>
                <Row style={{margin:"20px 0px"}} gutter={[40,0]} justify="space-between" >
                    <PlaceHolder title={"ST Datasets"}
                                 context={"ST Datasets archives composed of meta information, basic visualization and " +
                                     "download modules of curated ST datasets"}
                                 link={"/datasets"} pic={"Pic1.png"}/>
                    <PlaceHolder title={"Spatial Mapping"}
                                 context={"The key module designed for predicting spatial locations of single cells " +
                                     "via integrated single-cell and best match spatial transcriptome data."}
                                 link={"/mapping"} pic={"Pic2.png"}/>
                    <PlaceHolder title={"Gene Search"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"/search"} pic={"Pic3.png"}/>
                </Row>
            </div>
        </>
    )


}