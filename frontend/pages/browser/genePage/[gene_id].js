import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Layout, Row, Tag} from 'antd';
import React, {useRef} from "react";
import GenePageSiderMenu from "../../../components/GenePage/GenePageSiderMenu.js";
import Summary from "../../../components/GenePage/Summary.js";
import Features from "../../../components/GenePage/Features.js";
import SpatialExpression from "../../../components/GenePage/SpatialExpression.js";

export async function getServerSideProps(context) {
    if ( typeof context.params.gene_id === undefined ) {
        return {
            notFound: true,
        }
    }
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000/")
        +"api/gene/"+ context.params.gene_id
    )
    const data = await res.json()
    if ( data.length === 0 ) {
        return {
            notFound: true,
        }
    }
    const resTrans = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/gene/transcript/"+ context.params.gene_id
    )
    const dataTrans = await resTrans.json()

    // Pass post data to the page via props
    return {
        props: {
            // return first record
            data:data[0],
            trans:dataTrans.map(data => {
                return {key: data.ensembl_transcript_id, ...data}
            })
        }
    }
}

export default function GenePage(props) {
    const divContent = useRef(null); //标识nav导航栏渲染内容

    return (
        <LayoutCustom>
            <Head>
                <title>{'STW | Gene Browser | '+ props.data.ensembl_id}</title>
            </Head>
            <Layout hasSider style={{backgroundColor:"transparent"}}>
                <GenePageSiderMenu divContent={divContent}/>
                <div
                    ref={divContent}
                    style={{minWidth:"1200px",marginLeft:"200px",padding:"15vh 50px",textAlign:"left"}}
                >
                    <h4>Gene</h4>
                    <div key={"gene_name"}>
                        <Row align="bottom" style={{marginBottom:10}}>
                            <span style={{fontSize:"22px",fontWeight:"bold",marginRight:10}}>{props.data.symbol}</span>
                            <span style={{fontSize:"16px",fontWeight:"bold",color:"gray"}}> {props.data.ensembl_id}</span>
                        </Row>
                        <a href={"#RSE"}><Tag color="volcano">REGIONAL SPECIFIC GENE</Tag></a>
                    </div>
                    <Summary data={props.data}/>
                    <SpatialExpression />
                    <Features data={props.data} trans={props.trans}/>
                </div>
            </Layout>
        </LayoutCustom>
    )
}