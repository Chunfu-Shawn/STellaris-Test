import { Breadcrumb, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "./SiderMenu.js";
const { Title, Paragraph } = Typography;

export default function HelpAPI() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>API</Breadcrumb.Item>
            </Breadcrumb><br/>
            <Typography>
                <Title>STW API</Title>
                <Paragraph>STW API is a RESTful Application Program Interface to STW database resource.</Paragraph>
                <h3>General form</h3>
                <h4>1. URL from</h4>
                <div className="site-card-wrapper" style={{padding:"2%"}}>
                    <p><code>https://spatialtransweb.rhesusbase.com/api/[resource]/[argument]/([argument]...)</code></p>
                    <span>[resource] = <b>datasets-JSON</b> | <b>job-status</b> | ...</span>
                </div>
                <h3>API Resource</h3>
                <h4>1. datasets-JSON</h4>
                <div>
                    <p>This resource represents the basic information about some or a given datasets.</p>
                    <p><b>Need one argument:</b></p>
                    <b>(1)<code>ST ID</code></b>
                    <ul>
                            <ul>
                                <li>A unique id for a spatial transcriptome datasets</li>
                                <li>Example: <code>STW-H-Bone-ST-1</code></li>
                            </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatialtransweb.rhesusbase.com/api/datasets-JSON/STW-H-Bone-ST-1</code></li>
                        <li>Result:
                            <pre id={'example1'}>
                            {
                                JSON.stringify(
                                    {"ID":"STW-H-Bone-ST-1","Method":"ST","Species":"Homo sapiens","Strain":"null","Organ":"Bone","Tissue":"RA,SPA","Pathological":"TRUE","Developmental_stage":"Adult","Duplicate":"9","Duplicate_ID":"RA_A_1,RA_A_2,RA_A_3,RA_B_1,RA_B_2,RA_B_3,RA_C_1,RA_C_2,RA_C_3,SPA_A_1,SPA_A_2,SPA_A_3,SPA_B_1,SPA_B_2,SPA_B_3,SPA_C_1,SPA_C_2,SPA_C_3","Date_published":"2019-12-12","Title":"Exploring inflammatory signatures in arthritic joint biopsies with Spatial Transcriptomics","Journal":"Scientific Reports","PMID":"31831833","URL":"https://doi.org/10.1038/s41598-019-55441-y","Data_format":"barcode, count (matrix), image (jpg)","Detial":"all are pathological;\n3 biological replicates, 3 technical replicates per subject","Download_state":"Done","Preprocess_state":"Preprocess, STAGATE clustering (20220805 uplee)","Duplicate_ID(deprecated)":"RA-SpA_A-C_1-3","__EMPTY":"null"}
                                )
                            }
                        </pre>
                        </li>
                    </ul>
                    <b>(2) String:<code>'all' / 'human-ngs' / 'mouse-ngs' / 'mouse-smfish'</code></b>
                        <ul>
                            <li>a endpoint name representing a type of datasets</li>
                        </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatialtransweb.rhesusbase.com/api/datasets-JSON/all</code></li>
                        <li>Result:
                            <pre id={'example1'}>
                                {
                                    JSON.stringify(
                                        [{"ID":"STW-H-Spinal_Cord-ST-1","Method":"ST","Species":"Homo sapiens","Strain":"null","Organ":"Spinal Cord","Tissue":"Lumbar Spinal Cord Tissue Sections","Pathological":"TRUE","Developmental_stage":"null","Duplicate":"331","Duplicate_ID":"null","Date_published":"2019-04-05","Title":"Spatiotemporal dynamics of molecular pathology in amyotrophic lateral sclerosis","Journal":"Science","PMID":"30948552","URL":"https://doi.org/10.1126/science.aav9776","Data_format":"barcodes, annotation, counts, image(jpg)","Detial":"all records in GEO are mouse samples","Download_state":"Done","Preprocess_state":"Partially preprocess (Image not processed) (20220805)","Duplicate_ID(deprecated)":"CN51_C2 (and so on)","__EMPTY":"null"}]
                                    ) + '......'
                                }
                            </pre>
                        </li>
                    </ul>
                </div>
                <h4>2.job-status</h4>
                <div>
                    <p>This resource represents one annotation status about your job.</p>
                    <p><b>Need one argument:</b></p>
                    <ul>
                        <code>Request ID</code>
                        <ul>
                            <li>a job id assigned after run a spatial annotation ( A universally unique identifier (UUID) )</li>
                            <li>Example: <code>8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatialtransweb.rhesusbase.com/api/job-status/8dd3efa0-1884-11ed-8536-0d8688eaef3a</code></li>
                        <li>Result:
                            <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        {"rid":"8dd3efa0-1884-11ed-8536-0d8688eaef3a","title":"An important job!","email":"someone@mail.com","organ":"Spinal Cord","tissue":"Lumbar Spinal Cord Tissue Sections","matrixfilepath":"public/uploads/2022810/8dd3efa0-1884-11ed-8536-0d8688eaef3a/28fb5e40-1886-11ed-8536-0d8688eaef3a.matrix.mtx.gz","barcodesfilepath":"public/uploads/2022810/8dd3efa0-1884-11ed-8536-0d8688eaef3a/290681d0-1886-11ed-8536-0d8688eaef3a.barcodes.tsv.gz","featuresfilepath":"public/uploads/2022810/8dd3efa0-1884-11ed-8536-0d8688eaef3a/2906a8e0-1886-11ed-8536-0d8688eaef3a.features.tsv.gz","resultpath":"public/results/8dd3efa0-1884-11ed-8536-0d8688eaef3a","uploadtime":"2022-08-10T08:26:41.139Z","finishtime":"2022-08-10T08:26:41.146Z","status":"error"}
                                    )
                                }
                            </pre>
                        </li>
                    </ul>
                </div>
            </Typography>
        </div>
    )
}