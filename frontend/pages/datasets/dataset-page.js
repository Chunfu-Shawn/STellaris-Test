import Head from 'next/head'
import Layout from '../../components/layout.js'
import datePageCss from "../../styles/datasetpage.module.css";
import VitessceVisual from "../../components/VitessceModule.js";
const title = "STW - Datasets"

export default function DatasetPage(prop) {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body-stw">
                <ul id="navpill" className="nav nav-pills nav-stacked "
                    style={{ float: 'left', margin: '80px 20px', position: 'fixed' }}>
                    <li><a href="frontend/pages/datasets/dataset-page.js#summary">Summary</a></li>
                    <li><a href="frontend/pages/datasets/dataset-page.js#view">View</a></li>
                    <li><a href="frontend/pages/datasets/dataset-page.js#data">Data Download</a></li>
                </ul>
                <div className="page-header" style={{width: "70%",marginLeft:"30vh"}}>
                    <h1> Stereo-seq <small> WT A2-2 Mouse E14.5 Brain Coronal Section </small></h1>
                </div>

                <div id="summary"  className={datePageCss.summary}>
                    <h2>Summary</h2><br/>
                    <div className={datePageCss.text}>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida
                    at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida
                    at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida
                    at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida
                    at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida
                    at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida
                    at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</div>
                </div>
                <div id="view" className={datePageCss.view}>
                    <h2>View</h2><br/>
                    <VitessceVisual></VitessceVisual>
                </div>
                <div id="data" className={datePageCss.date}>
                    <h2>Data and Download</h2><br/>
                    <div className={datePageCss.text}>
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                    eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                    eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at
                    eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                    </div>
                </div>
                <div style={{clear:"both"}}></div>{/*--额外标签法，令其清除浮动（clear）以撑大父容器*/}
            </div>
        </Layout>
    )
}