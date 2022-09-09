import {Divider} from "antd";
import {LinkOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React from "react";
import AttributeLayout from "./AttributeLayout";
import Link from "next/link.js";

export default function Summary(props){
    let HGNC = ""
    if(props.data.dbXrefs)
        props.data.dbXrefs.split('|').forEach((item)=>{
            if(item.split(":")[0]==="HGNC") HGNC = item.split(":")[2]
        })

    return(
        <div name={"Summary"}>
            <a id={"Summary"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <b>Summary </b>
                <Link href={'/help/manual/browser#gene_page_summary'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            {
                props.data.symbol!=="-"?
                <AttributeLayout attribute={"Symbol"}>
                    <a target={"_blank"} href={`https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:${HGNC}`}
                       rel="noreferrer">
                        {props.data.symbol}<LinkOutlined />{` (${props.data.name_source})`}
                    </a>
                </AttributeLayout>
                    :<></>
            }
            <AttributeLayout attribute={"Entrez ID"}>
                <a href={`https://www.ncbi.nlm.nih.gov/gene/${props.data.entrez_id}`} target={"_blank"} rel="noreferrer">
                    {` ${props.data.entrez_id}`}<LinkOutlined />
                </a>
            </AttributeLayout>
            <AttributeLayout attribute={"Description"}>{props.data.descriptive_name}</AttributeLayout>
            <AttributeLayout attribute={"Gene Type"}>{props.data.biotype}</AttributeLayout>
            <AttributeLayout attribute={"Organism"}>{props.data.organism}</AttributeLayout>
            {
                props.data.name_synonyms?
                    <AttributeLayout attribute={"Gene Synonyms"}>{props.data.name_synonyms.split('|').join(', ')}</AttributeLayout>
                    :<></>
            }
            <AttributeLayout attribute={"Variable Expression in Regions"}>{}</AttributeLayout>
            {
                props.data.other_designations?
                <AttributeLayout attribute={"Other Designations"}>{props.data.other_designations.split('|').join('; ')}</AttributeLayout>
                    :<></>
            }
            {
                props.data.dbXrefs?
                <AttributeLayout attribute={"Identifiers in Other DB"}>
                    {props.data.dbXrefs.split('|').map((item)=>{
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
            <AttributeLayout attribute={"Gene Version"}>{props.data.version} (provided by Ensembl)</AttributeLayout>
            <AttributeLayout attribute={"Gene Source"}>{props.data.gene_source}</AttributeLayout>
        </div>
    )
}