import {Col, Divider, Row, Space} from "antd";
import React,{useContext} from "react";
import {DynamicGeneExpress} from "./SpatialExpression";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

export default function Gallery(){
    const geneContext = useContext(GeneContext);
    const organTissue = geneContext.organTissue
    const datasets = organTissue.map( item=>{
        let record = geneContext.dataSV
            .filter(item2 => item2.organ_tissue === item)[Math.floor(Math.random())*organTissue.length]
        return {
            "id": record.id,
            "name": record.section_id,
            "url": `https://rhesusbase.com:9999/jsonl_files/${record.id}/${record.section_id}/${record.section_id}.jsonl`
        }
    })

    return(
        <div name={"Gallery"} style={{marginLeft:20}}>
            <a id={"Gallery"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0"><b>Gallery</b></Divider>
            <Row style={{marginLeft:20,width:1100}} wrap={true} gutter={[20,20]}>
                {organTissue.map((item,index) => {
                    return(
                        <Col key={item} span={8} style={{height:350}}>
                            <h5>{item}: </h5>
                            <h6>{datasets[index].id} | {datasets[index].name}</h6>
                            <DynamicGeneExpress
                                setCustom={true}
                                width={300}
                                height={300}
                                dataset={datasets[index]}
                                gene={geneContext.data.symbol}
                            />
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}