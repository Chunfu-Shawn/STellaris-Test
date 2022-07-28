import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../components/LayoutCustom.js'
import Link from "next/link";
import BodyMap from '../components/Datasets/BodyMap.js'
import MouseMap from "../components/Datasets/MouseMap.js";


export default function Datasets() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle +'- Datasets'}</title>
            </Head>
            <div className="modal-body-stw mainbody">
                <div className={"row cover-container inner"} >
                    <div className="cover-heading">
                        <h1 className="cover-heading" style={{color:"white",fontSize:"50px"}}>Spatial Transcritome Datasets </h1>
                    </div>
                    <p className={"lead text-justify"}>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </p>
                </div>
                <div className={"row cover"} >
                    <BodyMap class={"col-md-6 col-lg-6"}></BodyMap>
                    <MouseMap class={"col-md-6 col-lg-6"}></MouseMap>
                </div>
                <div className={"lead"} id={"bottoms"}>
                    <Link href={"/datasets/allarchive"}>
                        <button type="button" className="btn btn-alldata btn-lg">All</button>
                    </Link>
                    <button type="button" className="btn btn-data btn-lg">Human Archive</button>
                    <button type="button" className="btn btn-data btn-lg">Mouse Archive</button>
                </div>
            </div>
        </LayoutCustom>
    )
}