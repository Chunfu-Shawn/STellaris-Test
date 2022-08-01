import PlaceHolder from "./MainPage/PlaceHolder.js";
import IntroductionModule from "./MainPage/IntroductionModule.js";

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
                <div className="row" >
                    <PlaceHolder title={"Spatial Trans Data"} context={contextHolder} link={"/datasets"}/>
                    <PlaceHolder title={"Spatial Annotation"} context={contextHolder} link={"/annotation"}/>
                    <PlaceHolder title={"Test Vitessce"} context={contextHolder} link={"/datasets/dataset-page"}/>

                </div>
                <div id="more"></div>
                <h1 className={"inner"} style={{color:"white"}}>KNOW MORE</h1>
                <div className="jumbotron" >
                    <IntroductionModule title={"Spatial Trans Web"} context={contextHolder} />
                    <IntroductionModule title={"Spatial Annotation Tool"} context={contextHolder} />
                    <IntroductionModule title={"Data and Browser"} context={contextHolder} />
                </div>
            </div>
        </>
    )


}