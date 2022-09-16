import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderMenu.js";
import SearchResultsAttributesTable from "./GenePage/SearchResultsAttributesTable.js";
import GeneAttributionsTable from "./GenePage/GeneAttributionsTable.js";
import GeneInfoAttributesTable from "./GenePage/GeneInfoAttributesTable.js";
import GeneFeaturesAttributesTable from "./GenePage/GeneFeaturesAttributesTable.js";

export default function ManualBrowser() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Gene Browser</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h1>Gene Browser</h1>
                <h2>1. Introduction</h2>
                <p style={{fontSize:16}}>The Gene Browser module would help users to search for the basic information and
                    spatial expression pattern of a interested gene. Gene Page contains some annotation
                    sections, such as <b>Summary, Genomic Context, Transcripts, Regional Specific Expression, Co-expressed Genes,
                    and Highly-expressed Clusters</b>, which present a whole spatial expression profile about a gene.
                </p>
                <h2>2. Gene Datasets</h2>
                <p>We collected and integrated those public gene information data from <a
                    href={"http://www.ensembl.org/biomart/martview/0dfa7ad57e65ec64a7972af5c8b5710e"} target={"_blank"} rel={"noreferrer"}>
                    <u>Ensembl Database (by biomart) </u></a>and <a href={"https://ftp.ncbi.nih.gov/gene/DATA/GENE_INFO/Mammalia/"} target={"_blank"} rel={"noreferrer"}>
                        <u>NCBI Gene Database (by ftp server).</u></a> The data <b>from NCBI are modified by 2022-08-26</b> and those from Ensembl
                    are <b>Human genes GRCh38.p13 and Mouse genes GRCm39 from Ensembl Genes 107 database</b>.
                </p>
                <p>
                    The Gene Datasets contains <b>68324</b> Human gene records, <b>56748</b> Mouse gene records
                and <b>463409</b> transcripts records, which containing following attributes:
                </p>
                <GeneAttributionsTable/>
                <h2>3. Browser</h2>
                <a id={"main_page_help"} style={{position: 'relative', top: "-150px"}}></a>
                <p>The Browser module is a ordinary search engine. It would provide some genes which have similar names
                    after users choose the <b>organism</b> and <b>type of gene id</b> and inputted what they were
                    going to search.
                </p>
                <h4>(1) Main Page</h4>
                <p>The browser allows users to choose which different organism and id type of their interested genes.</p>
                <b>Organisms:</b>
                <ul>
                    <li><b>Human</b>: interested genes from Homo sapiens</li>
                    <li><b>Mouse</b>: interested genes from Mus musculus</li>
                    <li><b>All</b>: interested genes from above two</li>
                </ul>
                <b>ID type:</b>
                <ul>
                    <li><b>Symbol</b>: short-form abbreviation for a particular gene</li>
                    <li><b>Ensembl ID</b>: identifier for a gene as per the Ensembl (European Bioinformatics Institute and the Wellcome Trust Sanger Institute) database</li>
                    <li><b>Entrez ID</b>: identifier for a gene per the NCBI Entrez database</li>
                </ul>
                <a id={"search_results_help"} style={{position: 'relative', top: "-150px"}}></a>
                <h4>(2) Search Results</h4>
                <p>The browser will provide all genes having similar names and presents the most matched genes foremost.
                    <br/><b>The search rules</b> is Case insensitive and whether containing inputted string.
                </p>
                <p>The search records contains following attributes:</p>
                <SearchResultsAttributesTable />
                <h4>(3) Gene Page</h4>
                <p>The Gene Page contains some annotations of a gene, such as Summary, Genomic Context, Transcripts,
                    Regional Specific Expression, Co-expressed Genes, and Highly-expressed Clusters, <b>which emphatically
                        present a whole spatial expression profile</b>.
                </p>
                <h5>- Summary</h5>
                <a id={"gene_page_summary"} style={{position: 'relative', top: "-150px"}}></a>
                <p>This section comprises following attributes:</p>
                <GeneInfoAttributesTable/>
                <h5>- Spatial Expression</h5>
                <a id={"gene_page_spatial_expression"} style={{position: 'relative', top: "-150px"}}></a>
                <p>This section comprises following attributes:</p>
                <h5>- Features</h5>
                <a id={"gene_page_features"} style={{position: 'relative', top: "-150px"}}></a>
                <p>This section comprises two annotations: <b>Genomic Context</b> and <b>Transcript</b>. Here are the attributes of these annotations below:</p>
                <GeneFeaturesAttributesTable/>
            </Typography>
        </div>
    )
}