import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../components/LayoutCustom.js'
import Link from "next/link";
import HumanMap from '../components/Datasets/HumanMap.js'
import MouseMap from "../components/Datasets/MouseMap.js";
import {Col, Row} from "antd";


export default function Datasets() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle +'| Datasets'}</title>
            </Head>
            <div className={'mainbody'}>
                <div className="modal-body-stw">
                    <div className={"cover-container inner"} >
                        <div className="text-left">
                            <h1 style={{color:"white",fontSize:"40px"}}>Spatial Transcriptome Datasets </h1><br/>
                        </div>
                        <p className={"lead text-justify"}>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        </p>
                    </div>
                    <Row gutter={50}>
                        <Col xs={16} xl={12}>
                            <HumanMap></HumanMap>
                        </Col>
                        <Col xs={16} xl={12}>
                            <MouseMap></MouseMap>
                        </Col>
                    </Row>
                    <div className={"lead"} id={"bottoms"}>
                        <Link href={"/datasets/allarchive"}>
                            <button type="button" className="btn btn-alldata btn-lg">All</button>
                        </Link>
                        <Link href={"/datasets/humanarchive"}>
                            <button type="button" className="btn btn-data btn-lg">Human Archive</button>
                        </Link>
                        <Link href={"/datasets/mousearchive"}>
                            <button type="button" className="btn btn-data btn-lg">Mouse Archive</button>
                        </Link>
                    </div>
                </div>
            </div>
        </LayoutCustom>
    )
}