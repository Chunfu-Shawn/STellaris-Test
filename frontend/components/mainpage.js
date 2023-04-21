import PlaceHolder from "./MainPage/PlaceHolder.js";
import {Divider, Row} from "antd";
import React from "react";
import UploadModule from "./Mapping/index/UploadModule";
import GuidanceMain from "./MainPage/GuidanceMain";
import GeneSearchMain from "./MainPage/GeneSearchMain";

export default function MainPage() {
    return(
        <>
            <div className="cover-container">
                <div className="inner cover" >
                    <h1 className="cover-heading">STellaris: accurate spatial mapping of scRNA-seq data</h1>
                    <p className="lead" style={{textAlign: "justify"}}>
                        STellaris is an integrated web server for accurate and flexible spatial mapping of user-uploaded
                        single-cell RNA-seq (scRNA-seq) data. It is founded on a manually curated compilation of spatial
                        transcriptomics datasets across diverse organs, developmental stages and pathological states. The
                        tissue-scale spatial cellular maps would subsequently facilitate the interpretation of intercellular
                        communications in the spatial context.
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
                    <PlaceHolder title={"Spatial Mapping"}
                                 context={"The key tool designed for accurate spatial mapping for scRNA-seq data " +
                                     "based on properly matched spatial transcriptomics data."}
                                 link={"/mapping"} pic={"Pic2.png"}/>
                    <PlaceHolder title={"Dataset Browser"}
                                 context={"Dataset browser comprises modules of meta information, basic visualization and " +
                                     "files download of curated ST datasets"}
                                 link={"/datasets"} pic={"Pic1.png"}/>
                    <PlaceHolder title={"Gene Search"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"/search"} pic={"Pic3.png"}/>
                </Row>
            </div>
        </>
    )


}