import {Breadcrumb, Divider, Typography} from 'antd';
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
                <Divider/>
                <h3>API Resource</h3>
                <h4>1. datasets-JSON</h4>
                <div>
                    <p>This resource represents the basic information about some or a given datasets.</p>
                    <p><b>Need one argument: (1)&apos;ST ID&apos; or (2)&apos;String&apos;</b></p>
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
                    <b>(2) String:<code>&apos;all&apos; / &apos;human-ngs&apos; / &apos;mouse-ngs&apos; / &apos;mouse-smfish&apos;</code></b>
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
                <Divider/>
                <h4>2. job-status</h4>
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
                <Divider/>
                <h4>3. gene</h4>
                <div>
                    <p>This resource represents basic information of a gene.</p>
                    <p><b>Need one argument:</b></p>
                    <ul>
                        <code>Ensembl ID</code>
                        <ul>
                            <li>identifier for a gene as per the Ensembl (European Bioinformatics Institute and the Wellcome Trust Sanger Institute) database</li>
                            <li>Example: <code>ENSG00000154856</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatialtransweb.rhesusbase.com/api/gene/ENSG00000000003</code></li>
                        <li>Result:
                            <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        [{"ensembl_id":"ENSG00000000003","symbol":"TSPAN6","entrez_id":"7105","descriptive_name":"tetraspanin 6 [Source:HGNC Symbol;Acc:HGNC:11858]","other_designations":"tetraspanin-6|A15 homolog|putative NF-kappa-B-activating protein 321|tetraspan TM4SF|tetraspanin TM4-D|transmembrane 4 superfamily member 6","name_synonyms":"T245|TM4SF6|TSPAN-6","dbXrefs":"MIM:300191|HGNC:HGNC:11858|Ensembl:ENSG00000000003|AllianceGenome:HGNC:11858","version":15,"gene_source":"ensembl_havana","name_source":"HGNC Symbol","biotype":"protein_coding","chrom_scaf":"X","start":100627108,"end":100639991,"strand":"-1","map_location":"Xq22.1","organism":"Homo sapiens"}]
                                        )
                                }
                            </pre>
                        </li>
                    </ul>
                </div>
                <Divider/>
                <h4>4. gene transcript(s)</h4>
                <div>
                    <p>This resource represents some basic information of transcript from a gene.</p>
                    <p><b>Need one argument:</b></p>
                    <ul>
                        <code>Ensembl ID</code>
                        <ul>
                            <li>identifier for a gene as per the Ensembl (European Bioinformatics Institute and the Wellcome Trust Sanger Institute) database</li>
                            <li>Example: <code>ENSG00000154856</code></li>
                        </ul>
                    </ul>
                    <p><b>Example:</b></p>
                    <ul>
                        <li><code>https://spatialtransweb.rhesusbase.com/api/gene/transcript/ENSG00000000003</code></li>
                        <li>Result:
                            <pre id={'example2'}>
                                {
                                    JSON.stringify(
                                        [{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000373020","name":"TSPAN6-201","version":9,"source":"ensembl_havana","type":"protein_coding","count":5,"length":3768,"start":100627108,"end":100636806,"tss":100636806,"refseq_mrna":"NM_003270","refseq_ncrna":"-","tsl":"tsl1 (assigned to previous version 8)"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000494424","name":"TSPAN6-202","version":1,"source":"havana","type":"processed_transcript","count":5,"length":820,"start":100633442,"end":100639991,"tss":100639991,"refseq_mrna":"-","refseq_ncrna":"-","tsl":"tsl2"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000496771","name":"TSPAN6-203","version":5,"source":"havana","type":"processed_transcript","count":5,"length":1025,"start":100632541,"end":100636689,"tss":100636689,"refseq_mrna":"-","refseq_ncrna":"-","tsl":"tsl3"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000612152","name":"TSPAN6-204","version":4,"source":"ensembl","type":"protein_coding","count":5,"length":3796,"start":100627109,"end":100637104,"tss":100637104,"refseq_mrna":"NM_001278740","refseq_ncrna":"-","tsl":"tsl5"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000612152","name":"TSPAN6-204","version":4,"source":"ensembl","type":"protein_coding","count":5,"length":3796,"start":100627109,"end":100637104,"tss":100637104,"refseq_mrna":"NM_001278741","refseq_ncrna":"-","tsl":"tsl5"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000612152","name":"TSPAN6-204","version":4,"source":"ensembl","type":"protein_coding","count":5,"length":3796,"start":100627109,"end":100637104,"tss":100637104,"refseq_mrna":"NM_001278743","refseq_ncrna":"-","tsl":"tsl5"},{"ensembl_id":"ENSG00000000003","ensembl_transcript_id":"ENST00000614008","name":"TSPAN6-205","version":4,"source":"ensembl","type":"protein_coding","count":5,"length":900,"start":100632063,"end":100637104,"tss":100637104,"refseq_mrna":"NM_001278742","refseq_ncrna":"-","tsl":"tsl5"}]
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