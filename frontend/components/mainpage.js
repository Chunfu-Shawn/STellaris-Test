import PlaceHolder from "./MainPage/PlaceHolder.js";
import IntroductionModule from "./MainPage/IntroductionModule.js";
import {Row} from "antd";

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
                            <a href="#more" className="btn btn-lg btn-default">Know more</a>
                        </p>
                    </div>
                </div>
                <Row style={{width:"100%"}} gutter={50} justify="space-evenly" >
                    <PlaceHolder title={"ST Datasets"} context={contextHolder} link={"/datasets"} pic={"picture1.png"}/>
                    <PlaceHolder title={"Spatial Annotation"} context={contextHolder} link={"/annotation"} pic={"picture2.png"}/>
                    <PlaceHolder title={"Gene Browser"} context={contextHolder} link={"/browser"} pic={"picture3.png"}/>
                </Row>
                <div id="more"></div>
                <h1 className={"inner"} style={{color:"white"}}>KNOW MORE</h1>
                <div className="intro-card-wrapper" >
                    <IntroductionModule title={"Spatial Transcritome Datasets"} link={"/datasets"}
                                        pic={"/images/index/Datasets.svg"}
                                        context={contextHolder}
                    /><br/>
                    <IntroductionModule title={"Spatial Annotation Tool"} link={"/annotation"}
                                        pic={"/images/index/Annotation.svg"}
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