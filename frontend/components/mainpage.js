import PlaceHolder from "./MainPage/PlaceHolder.js";
import IntroductionModule from "./MainPage/IntroductionModule.js";
import {Row} from "antd";

export default function MainPage() {
    let contextHolder = "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."
    return(
        <>
            <div className="modal-body-stw">
                <div className="cover-container" >
                    <div className="inner cover" >
                        <h1 className="cover-heading">Spatial Transcriptome Web Tools and Database</h1>
                        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                        <p className="lead">
                            <a href="#more" className="btn btn-lg btn-default">Know more</a>
                        </p>
                    </div>
                </div>
                <Row style={{width:"100%"}} gutter={50} justify="space-evenly" >
                    <PlaceHolder title={"Spatial Trans Data"} context={contextHolder} link={"/datasets"} pic={"picture3.png"}/>
                    <PlaceHolder title={"Spatial Annotation"} context={contextHolder} link={"/annotation"} pic={"picture1.png"}/>
                    <PlaceHolder title={"Gene Browser"} context={contextHolder} link={"/browser"} pic={"picture2.png"}/>
                </Row>
                <div id="more"></div>
                <h1 className={"inner"} style={{color:"white"}}>KNOW MORE</h1>
                <div className="intro-card-wrapper" >
                    <IntroductionModule title={"Spatial Trans Datasets"} link={"/datasets"} context={contextHolder} /><br/>
                    <IntroductionModule title={"Spatial Annotation Tool"} link={"/annotation"} context={contextHolder} /><br/>
                    <IntroductionModule title={"Browser"}  link={"/browser"}context={contextHolder} />
                </div>
            </div>
        </>
    )


}