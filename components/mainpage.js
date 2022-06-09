import Link from "next/link";

export default function MainPage() {
    return(
        <>
            <div className="modal-body mainbody">
                <div className="cover-container" >
                    <div className="inner cover" >
                        <h1 className="cover-heading">Spatial Transcriptome Web Tools and Databases</h1>
                        <p className="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
                        <p className="lead">
                            <a href="#more" className="btn btn-lg btn-default">Know more</a>
                        </p>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-xs-6 col-md-4">
                        <Link href="/annotation"><a className="thumbnail">
                            <img src="/images/placeholder.png" alt="..."/>
                                <div className="caption">
                                    <h3>Spatial Annotation</h3>
                                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                </div>
                        </a></Link>
                    </div>
                    <div className="col-xs-6 col-md-4">
                        <Link href="/dataset-page"><a className="thumbnail">
                            <img src="/images/placeholder.png" alt="..."/>
                                <div className="caption">
                                    <h3>Test Vitessce</h3>
                                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                </div>
                        </a></Link>
                    </div>
                    <div className="col-xs-6 col-md-4">
                        <Link href="/contact"><a className="thumbnail">
                            <img src="/images/placeholder.png" alt="missing pic"/>
                                <div className="caption">
                                    <h3>Test Contact</h3>
                                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                </div>
                        </a></Link>
                    </div>

                </div>
                <div id="more"></div>
                <br/>
                <br/>
                    <h1>KNOW MORE</h1>
                <br/>
                <br/>
                <div className="jumbotron" >
                    <div className="media-left">
                        <a href="#">
                            <img className="media-object"  src="/images/placeholder.png" alt="missing pic"/>
                        </a>
                    </div>
                    <div className="media-body">
                        <h3 className="media-heading  media-left">Spatial Transcriptome of Brain</h3>
                        <br/>
                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    </div>
                <br/>
                <br/>
                <div className="media-left" >
                    <a href="/annotation">
                        <img className="media-object" src="/images/placeholder.png" alt="missing pic"/>
                    </a>
                </div>
                <div className="media-body">
                    <h3 className="media-heading media-left">  Spatial Annotation Tool</h3>
                    <br/>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                </div>
                <br/>
                <br/>
                <div className="media-left">
                    <a href="/vitessce">
                        <img className="media-object" src="/images/placeholder.png" alt="missing pic"/>
                    </a>
                </div>
                <div className="media-body">
                    <h3 className="media-heading media-left">  Data and Browser</h3>
                    <br/>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                </div>
                </div>
            </div>
        </>
    )


}