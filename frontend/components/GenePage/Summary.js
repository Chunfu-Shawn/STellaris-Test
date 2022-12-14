import {Divider} from "antd";
import {LinkOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React,{useContext} from "react";
import AttributeLayout from "./AttributeLayout";
import Link from "next/link.js";
import {GeneContext} from "../../pages/search/genePage/[gene_id]";

export default function Summary(){
    const geneContext = useContext(GeneContext);
    const data = geneContext.data
    const dataSV = geneContext.dataSV
    const organTissue = geneContext.organTissue
    let HGNC = ""
    if(data.dbXrefs)
        data.dbXrefs.split('|').forEach((item)=>{
            if(item.split(":")[0]==="HGNC") HGNC = item.split(":")[2]
        })

    return(
        <div name={"Summary"}>
            <a id={"Summary"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <b>Summary </b>
                <Link href={'/help/manual/search#annotation'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            {
                data.symbol!=="-"?
                <AttributeLayout attribute={"Symbol"}>
                    <a target={"_blank"} href={`https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:${HGNC}`}
                       rel="noreferrer">
                        {data.symbol}<LinkOutlined />{` (${data.name_source})`}
                    </a>
                </AttributeLayout>
                    :<></>
            }
            <AttributeLayout attribute={"Entrez ID"}>
                <a href={`https://www.ncbi.nlm.nih.gov/gene/${data.entrez_id}`} target={"_blank"} rel="noreferrer">
                    {` ${data.entrez_id}`}<LinkOutlined />
                </a>
            </AttributeLayout>
            <AttributeLayout attribute={"Description"}>{data.descriptive_name}</AttributeLayout>
            <AttributeLayout attribute={"Gene Type"}>{data.biotype}</AttributeLayout>
            <AttributeLayout attribute={"Organism"}>{data.organism}</AttributeLayout>
            {
                data.name_synonyms?
                    <AttributeLayout attribute={"Gene Synonyms"}>{data.name_synonyms.split('|').join(', ')}</AttributeLayout>
                    :<></>
            }
            {
                data.other_designations?
                <AttributeLayout attribute={"Other Designations"}>{data.other_designations.split('|').join('; ')}</AttributeLayout>
                    :<></>
            }
            {
                data.dbXrefs?
                <AttributeLayout attribute={"Identifiers in Other DB"}>
                    {data.dbXrefs.split('|').map((item)=>{
                        if(item.split(":")[0]==="HGNC")
                            return <span key={item.split(":")[0]}><a target={"_blank"}
                                                                     href={`https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:${item.split(":")[2]}`}
                                                                     rel="noreferrer">
                                        {item.split(":")[0]}:{item.split(":")[1]}:{item.split(":")[2]}<LinkOutlined /></a>, </span>
                        if(item.split(":")[0]==="MGI")
                            return <span key={item.split(":")[0]}><a target={"_blank"}
                                                                     href={`http://www.informatics.jax.org/marker/${item.split(":")[1]}:${item.split(":")[2]}`}
                                                                     rel="noreferrer">
                                        {item.split(":")[0]}:{item.split(":")[1]}:{item.split(":")[2]}<LinkOutlined /></a>, </span>
                        if(item.split(":")[0]==="Ensembl")
                            return <span key={item.split(":")[0]}><a target={"_blank"}
                                                                     href={`http://www.ensembl.org/id/${item.split(":")[1]}`}
                                                                     rel="noreferrer">
                                        {item.split(":")[0]}:{item.split(":")[1]}<LinkOutlined /></a>, </span>
                        if(item.split(":")[0]==="MIM")
                            return <span key={item.split(":")[0]}><a target={"_blank"}
                                                                     href={`https://omim.org/entry/${item.split(":")[1]}`}
                                                                     rel="noreferrer">
                                        {item.split(":")[0]}:{item.split(":")[1]}<LinkOutlined /></a>, </span>
                        if(item.split(":")[0]==="AllianceGenome")
                            return <span key={item.split(":")[0]}><a target={"_blank"}
                                                                     href={`https://www.alliancegenome.org/gene/${item.split(":")[1]}:${item.split(":")[2]}`}
                                                                     rel="noreferrer">
                                        {item.split(":")[0]}:{item.split(":")[1]}:{item.split(":")[2]}<LinkOutlined /></a>, </span>
                    })}
                </AttributeLayout>
                    : <></>
            }
            <AttributeLayout attribute={"Location"}>
                <>
                    <a target={"_blank"}
                       href={`https://www.ensembl.org/${data.organism === "Homo sapiens"?"Homo_sapiens":"Mus_musculus"}/Location/View?g=${data.ensembl_id}`}
                       rel="noreferrer">
                        Chromosome  {`${data.chrom_scaf}: ${data.start}-${data.end}`}<LinkOutlined />
                    </a>
                    <span>{data.strand === "1"?" forward strand.":" reverse strand."}</span>
                </>
            </AttributeLayout>
            <AttributeLayout attribute={"Chromosomal Location"}>
                {data.map_location}
            </AttributeLayout>
            <AttributeLayout attribute={"Gene Version"}>{data.version} (provided by Ensembl)</AttributeLayout>
            <AttributeLayout attribute={"Gene Source"}>{data.gene_source}</AttributeLayout>
        </div>
    )
}