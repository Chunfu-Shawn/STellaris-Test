import Layout from "../components/layout";
import VitessceDate from "../components/vitesscemodule"
import Head from "next/head";

export default function Vtest(){
    return(
        <Layout>
            <Head>
                <title>Vitessce Test</title>
            </Head>
            <div className="modal-body">
                <div className="page-header">
                    <h1>Spatial Date Visualization</h1>
                </div>
                <VitessceDate></VitessceDate>
            </div>
        </Layout>
    )
}