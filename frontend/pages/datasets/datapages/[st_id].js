import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Anchor, Layout, Typography, Card, Col, Row, Alert} from 'antd';
const { Sider } = Layout;
import datePageCss from "../../../styles/datasetpage.module.css";
import VitessceVisual from "../../../components/VitessceModule.js";
import {data} from '../../../components/Datasets/getData&Options.js';
import {useEffect, useState} from "react";
const { Link } = Anchor;

export async function getServerSideProps(context) {
    // params contains the post `id`.
    // If the route is like /posts/1, then params.id is 1
    const res = await fetch((process.env.NODE_ENV==="production"?
        "http://10.10.30.30:3000/":"http://localhost:3000/")
        +"api/getDatasetsJSON/"+context.params.st_id)
    const data = await res.json()

    // Pass post data to the page via props
    return { props: data }
}

export default function DataPage(props) {
    const [targetOffset, setTargetOffset] = useState(undefined);
    useEffect(() => {
        setTargetOffset(window.innerHeight / 2);
    }, []);
    return (
        <LayoutCustom>
            <Head>
                <title>SWT | Datasets | {props.id}</title>
            </Head>
            <Layout>
                <Sider style={{backgroundColor:"transparent"}}>
                    <Anchor targetOffset={targetOffset} style={{paddingTop:"20vh",paddingLeft:"8vh",fontSize:18}}>
                        <Link href="#info" title="Information">
                            <Link href={"#sample"} title={'Sample'}/>
                        </Link>
                        <Link href="#source" title="Source" />
                        <Link href="#view" title="View" />
                        <Link href="#data" title="Data Download"/>
                    </Anchor>
                </Sider>
                <div className="modal-body-stw" style={{textAlign: "left",paddingLeft:'3%',paddingRight:'15%'}}>
                    <h3>Data</h3>
                    <h1> {props.id} </h1><br/><br/>
                    <h2 id="info" > Information </h2>
                        <div className="site-card-wrapper" style={{padding:"2%"}}>
                            <Row gutter={30}>
                                <Col span={10}>
                                    <h4>ST ID</h4>
                                    <div className={"description"}>{props.id}</div>
                                </Col>
                                <Col span={8}>
                                    <h4>Date Published</h4>
                                    <div className={"description"}>{props.date_published}</div>
                                </Col>
                                <Col span={6}>
                                    <h4>Method</h4>
                                    <div className={"description"}>{props.method}</div>
                                </Col>
                            </Row>
                        </div><br/>
                        <h3 id={'sample'}>Sample</h3>
                        <div className="site-card-wrapper">
                                <Row gutter={[10,16]}>
                                    <Col span={6}>
                                        <Card>
                                            <h4>Species</h4>
                                            <div className={"description"}>{props.species}</div>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <h4>Strain</h4>
                                            <div className={"description"}>{props.strain}</div>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <h4>Developmental Stage</h4>
                                            <div className={"description"}>{props.developmental_stage}</div>
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <h4>Organ</h4>
                                            <div className={"description"}>{props.organ}</div>
                                        </Card>
                                    </Col>
                                    <Col span={8}>
                                        <Card>
                                            <h4>Tissue</h4>
                                            <div className={"description"}>{props.tissue}</div>
                                        </Card>
                                    </Col>
                                    <Col span={4}>
                                        {
                                            props.pathological==="TRUE"?
                                            <Alert
                                                message={"Pathological: "+ props.pathological}
                                                type="error"
                                            />:
                                            <Alert
                                                message={"Pathological: "+ props.pathological}
                                                type="success"
                                            />
                                        }
                                    </Col>
                                </Row>
                        </div><br/><br/>
                    <h2 id={'source'}>Source</h2>
                    <div className="site-card-wrapper" style={{padding:"2%"}}>
                        <Row gutter={10}>
                            <Col span={9}>
                                <h4>Title</h4>
                                <p>{props.title}</p>
                            </Col>
                            <Col span={4}>
                                <h4>Journal</h4>
                                <p>{props.journal}</p>
                            </Col>
                            <Col span={3}>
                                <h4>PMID</h4>
                                <p>{props.pmid}</p>
                            </Col>
                            <Col span={8}>
                                <h4>URL</h4>
                                <a href={props.URL}>{props.URL}</a>
                            </Col>
                        </Row>
                    </div><br/><br/>
                        <h2 id={'view'}>View</h2>
                        <VitessceVisual></VitessceVisual>
                    <br/><br/>
                        <h2 id={'data'}>Data and Download</h2>
                        <div className={datePageCss.text}>
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                        eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                        eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                        eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                        </div>
                </div>
        </Layout>
        </LayoutCustom>
    )
}