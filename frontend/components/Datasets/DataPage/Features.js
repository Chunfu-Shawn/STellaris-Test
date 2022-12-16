import {Button, Col, Divider, Row, Table} from "antd";
import Link from "next/link";
import {QuestionCircleOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {exportToCsv, toNonExponential} from "../../util";

export default function Features(props){
    const [loading, setLoading] = useState(false);
    const [sVGenes, setSVGenes] = useState([]);
    const SVGeneColumns = [
        {
            title: 'Gene Name',
            dataIndex: 'gene_symbol',
            width:'12%',
            filters: Array.from(new Set(sVGenes.map(
                value => value.gene_symbol ))).map(
                item => {
                    return{
                        text: item,
                        value: item
                    }
                }
            ),
            onFilter: (value, record) => record.gene_symbol.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'Ensembl ID',
            dataIndex: 'ensembl_id',
            width:'20%',
            render: (text) => <Link href={`/search/genePage/${text}`}><a target={'_blank'}>{text}</a></Link>,
            sorter: (a, b) => {
                if(a.ensembl_id > b.ensembl_id) return 1
                else return -1
            },
        },
        {
            title: 'P-Value',
            dataIndex: 'p_value',
            width:'12%',
            sorter: (a, b) => a.p_value - b.p_value,
        },
        {
            title: 'Q-Value',
            dataIndex: 'q_value',
            width:'12%',
            sorter: (a, b) => a.q_value - b.q_value,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Span',
            dataIndex: 'span',
            width:'10%',
            sorter: (a, b) => a.span - b.span,
        },
        {
            title: 'Section ID',
            dataIndex: 'section_id',
            width:'15%',
            filters: props.sectionOption.map(value =>
            {
                return{
                    text: value,
                    value: value
                }
            }),
            onFilter: (value, record) => record.section_id.indexOf(value) === 0,
        }
    ];

    const fetchData = async () => {
        setLoading(true);
        // get spatially variable gene
        let spatiallyVariableGenes = []
        for (const item of props.sectionOption) {
            await fetch("/api/spatially-variable-gene/section/"+item)
                .then(res => res.json())
                .then(data => spatiallyVariableGenes.push.apply(spatiallyVariableGenes, data))
        }
        setSVGenes(spatiallyVariableGenes)
    };

    useEffect(() => {
        fetchData().then(() => setLoading(false))
    }, []);

    return(
        <div name={"Features"}>
            <a id={"Features"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0" style={{marginTop:50}}>
                <span style={{fontSize:22}}>Features </span>
                <Link href={'/help/manual/datasets#identification_svg'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <div style={{marginLeft:20}}>
                <Divider orientation="left" orientationMargin="0" dashed>
                    <Row gutter={[80]} style={{width:"auto"}}>
                        <Col span={14}>
                            <span style={{fontSize:18}}>Spatially Variable Genes</span>
                        </Col>
                        <Col span={10}>
                            <Button size={"small"}
                                    onClick={() => exportToCsv(sVGenes,`${props.data.id}_SV_genes`)}
                            >
                                Export to CSV
                            </Button>
                        </Col>
                    </Row>
                </Divider>
                <div style={{overflow:"scroll"}}>
                    <Table columns={SVGeneColumns}
                           dataSource={sVGenes.map(item=> {
                               return {
                                   key:item.gene_symbol+item.ensembl_id+item.section_id,
                                   ...item
                               }
                           })}
                           loading={loading}
                           size={"small"}
                           bordered={true}
                    />
                </div>
                {/*<Divider orientation="left" orientationMargin="0" dashed>
                    <Row gutter={[80]} style={{width:"auto"}}>
                        <Col span={14}>
                            <span style={{fontSize:18}}>Co-Expressed Genes</span>
                        </Col>
                        <Col span={10}>
                            <Button size={"small"}
                                    onClick={() => exportToCsv(props.genesExpressionCorrelation,`${props.data.id}_coexpressed_genes`)}
                            >
                                Export to CSV
                            </Button>
                        </Col>
                    </Row>
                </Divider>
                <div style={{overflow:"scroll"}}>
                    <Table columns={CEGeneColumns}
                           dataSource={props.genesExpressionCorrelation.map(item=> {
                               return {
                                   key:item.x_gene_symbol+item.y_gene_symbol,
                                   ...item
                               }
                           })}
                           size={"small"}
                           bordered={true}
                    />
                </div>*/}
            </div>
        </div>
    )
}