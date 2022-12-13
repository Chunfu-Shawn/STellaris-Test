import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import {Affix, Col, Row, Tag, Space} from 'antd';
import React, {useRef, useEffect, useState} from "react";
import GenePageSiderMenu from "../../../components/GenePage/GenePageSiderMenu.js";
import Summary from "../../../components/GenePage/Summary.js";
import Features from "../../../components/GenePage/Features.js";
import SpatialExpression from "../../../components/GenePage/SpatialExpression.js";
import Download from "../../../components/GenePage/Download.js";

export async function getServerSideProps(context) {
    if ( typeof context.params.gene_id === undefined ) {
        return {
            notFound: true,
        }
    }
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/gene/"+ context.params.gene_id
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

    /*/ get correlation of genes expression
    const resCor = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/genes-expression-correlation/gene/" + data[0].symbol)
    const dataCor = await resCor.json()
     */


    // Pass post data to the page via props
    return {
        props: {
            data:data[0],
            trans:dataTrans,
        }
    }
}

export const GeneContext = React.createContext({});

export default function GenePage(props) {
    const divContent = useRef(null); //标识nav导航栏渲染内容
    const [SVGLoading, setSVGLoading] = useState(true);
    const [ERLoading, setERLoading] = useState(true);
    const [dataSV, setDataSV] = useState([]);
    const [dataER, setDataER] = useState([]);
    const organTissue = Array.from(new Set(dataSV.map(
        item => item.organ_tissue )))

    const fetchData = async () => {
        // get spatially variable gene; use await to load SV first
        fetch("/api/spatially-variable-gene/gene/"+ props.data.symbol)
            .then(res => res.json())
            .then(data => setDataSV(data))
            .then(() => setSVGLoading(false))
        // load SV first async
        fetch("/api/expression-rank-score/"+ props.data.symbol)
            .then(res => res.json())
            .then(data => setDataER(data))
            .then(() => setERLoading(false))
    };

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <LayoutCustom>
            <GeneContext.Provider value={
                {
                    ...props,
                    dataSV:dataSV,
                    dataER:dataER,
                    SVGLoading:SVGLoading,
                    ERLoading:ERLoading,
                    setERLoading:setERLoading,
                    organTissue:organTissue,
                }
            }>
            <Head>
                <title>{'STellaris | Gene Search | '+ props.data.ensembl_id}</title>
            </Head>
                <div
                    className={"modal-body-stw with-sider"}
                >
                    <Row style={{width:"100%"}}>
                        <Col span={5}>
                            <Affix offsetTop={120}>
                                <GenePageSiderMenu divContent={divContent}/>
                            </Affix>
                        </Col>
                        <Col span={19}>
                            <div ref={divContent}>
                                <h4>Gene</h4>
                                <div key={"gene_name"}>
                                    <Row align="bottom" style={{marginBottom:10}}>
                                        <Space>
                                            <span style={{fontSize:"22px",fontWeight:"bold",marginRight:10}}>{props.data.symbol}</span>
                                            <span style={{fontSize:"16px",fontWeight:"bold",color:"gray"}}> {props.data.ensembl_id}</span>
                                            {
                                                SVGLoading === true ? <></> : (dataSV.length !== 0) ?
                                                    <a href={"#Gallery"}><Tag color="volcano">SPATIALLY VARIABLE GENE</Tag></a>:
                                                    <a href={"#Expression"}><Tag color="geekblue">NON-SPATIALLY VARIABLE GENE</Tag></a>
                                            }
                                        </Space>
                                    </Row>
                                    {
                                        SVGLoading === true ? <></> :
                                        dataSV.length !== 0 ?
                                            <span>
                                                This gene was defined as a spatially variable gene in <b>{organTissue.join(", ")}</b>
                                            </span>:
                                            <span>
                                                This gene was NOT a spatially variable gene in any organs/tissues.
                                            </span>
                                    }
                                </div>
                                <Summary/>
                                {
                                    dataSV.length !== 0 ?
                                        <SpatialExpression/> :
                                        <></>
                                }
                                <Features/>
                                <Download/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </GeneContext.Provider>
        </LayoutCustom>
    )
}