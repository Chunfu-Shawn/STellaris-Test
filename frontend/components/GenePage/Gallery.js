import {Col, Divider, Pagination, Row, Space} from "antd";
import React, {useContext, useState} from "react";
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
            "organ_tissue": item,
            "url": `https://rhesusbase.com:9999/jsonl_files/${record.id}/${record.section_id}/${record.section_id}.jsonl`
        }
    })
    const [datasetsShow,setDatasetsShow] = useState(datasets.slice(0,6))
    const handleChange = value => {
        let start = (value-1)*6
        setDatasetsShow(datasets.slice(start,start+6))
    };

    return(
        <div name={"Gallery"} style={{marginLeft:20}}>
            <a id={"Gallery"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0"><b>Gallery</b></Divider>
            <Row style={{marginLeft:20,width:1100}} wrap={true} gutter={[20,20]}>
                {datasetsShow.map((item,index) => {
                    return(
                        <Col key={item.name} span={8} style={{height:350}}>
                            <h5>{item.organ_tissue}: </h5>
                            <h6>{item.id} | {item.name}</h6>
                            <DynamicGeneExpress
                                setCustom={true}
                                width={300}
                                height={300}
                                dataset={item}
                                gene={geneContext.data.symbol}
                            />
                        </Col>
                    )
                })}
            </Row>
            <Row style={{textAlign:"center",padding:20}}>
                <Pagination size="small"
                            defaultCurrent={1}
                            defaultPageSize={6}
                            style={{margin:"auto"}}
                            onChange={handleChange}
                            total={organTissue.length} />
            </Row>
        </div>
    )
}