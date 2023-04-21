import React from "react";
import {Breadcrumb, Space, Typography, Image} from "antd";
import {contentStyle} from "../Help/SiderStaticMenu";
import Link from "next/link.js";
import {downloadFile} from "../util";


export default function GetStarted(){

    const handleClick = () => {
        downloadFile(`/api/submitted-files/counts/52fa0100-909b-11ed-9249-979b422f6c75`)
        downloadFile(`/api/submitted-files/labels/52fa0100-909b-11ed-9249-979b422f6c75`)
    }

    return(
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
                <Breadcrumb.Item>Get started</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"Get started"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Get started (step by step)</h2>
                <p>In this tutorial, we use public
                    <a onClick={handleClick}>
                        <b> scRNA-seq data </b>
                    </a>
                    derived from the developing mouse cerebral cortex at E14.5 (
                    <Link href={"https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE123335"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>GSE123335</b>
                        </a>
                    </Link>) to show you how to get started with the<b> spatial mapping </b>
                    tool, the key module implemented in STellaris. Prior to performing spatial mapping analysis, we have
                    some preparatory work to do, including preparing input files, submitting a job, selecting a properly
                    matched ST section and setting appropriate parameters for spatial mapping.
                </p>
                <h3>1. Prepare input files</h3>
                <a id={"data_preparation"} style={{position: 'relative', top: "-150px"}}></a>
                <p>To perform the spatial mapping analysis, users need to upload two files:
                    <ul>
                        <li>
                            1) A cell-by-gene <b>raw counts</b> matrix file, where the column names are <b>gene symbols</b>
                            the row names are <b>unique cell IDs</b>;
                        </li>
                        <li>
                            2) A cell type annotation file, where the first column contains the cell IDs <b>in the same
                            order</b> as the count matrix, and one of the latter columns is labelled &quot;cell_type&quot;
                            and contains categorical annotations, such as clusters, cell types, or cell states.
                        </li>
                    </ul>
                    Please note that the gene identifiers must be gene symbols currently. These two files should be
                    tab- or comma-delimited (.tsv, .txt or .csv)  in gzip or zip compression (.gz or .zip).
                </p>
                <p>An appropriate raw count matrix file looks like:</p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/start/counts_matrix_example.png"} width={600} height={350}
                           alt={"counts_matrix_example"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>An appropriate cell type annotation file looks like:</p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/start/labels_example.png"} width={600} height={200}
                           alt={"labels_example"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>2. Submit a job</h3>
                <p>Go to the home page or Mapping page from the navigator bar, and submit a job following these steps:</p>
                <h4>Basic information</h4>
                <ul>
                    <li>Enter a title of your job in &quot;Job Title&quot; box (up to 80 characters).</li>
                    <li>Optionally, enter an email address to receive progress notification for your project.</li>
                    <li>Select ST sections that match your scRNA-seq data by specifying the species, organ and tissue.
                        This step is crucial to ensure that only the ST sections that meet these criteria will be considered
                        in subsequent analyses. Here we choose species &quot;Mus musculus&quot; for species, &quot;Brain&quot;
                        for organ and &quot;Brain&quot; for tissue.</li>
                </ul>
                <h4>Data upload</h4>
                <ul>
                    <li>Click on the “Select a count matrix file” button and select a prepared count matrix file.</li>
                    <li>Click on the “Select a label file” button to select a metadata file with cell type annotations.</li>
                    <li>Click on the “Upload” button and wait for a second.</li>
                </ul>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/start/get_started.png"} width={800} height={450}
                           alt={"get_started"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>3. Section blast</h3>
                <p>
                    After successfully uploading your scRNA-seq data, you will receive a confidential URL for your job
                    request and be redirected to a running page. The next step called &quot;Section Blast&quot; will automatically
                    start. This analysis aims to quickly screen out the ST section that properly matches your scRNA-seq data. See
                    <Link href={"/help/manual/mapping#section_blast"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> here </b>
                        </a>
                    </Link>for more details on this step. Section Blast is generally fast and should take about 2-3 minutes.
                </p>
                <div style={{textAlign:"center"}} >
                    <Space>
                        <Image src={"/images/tutorial/start/email.png"} width={400} height={230}
                               alt={"email"} style={{borderStyle:"dashed"}}/>
                        <Image src={"/images/tutorial/start/section_blast.png"} width={600} height={330}
                               alt={"section_blast"}/>
                    </Space>
                </div>
                <p>
                    Once Section Blast is finished, the matching scores of ST sections will be returned in descending order.
                    A table with additional attributes of the examined ST sections (104 sections in this example) will
                    also be reported. To select the section to which you want to map, you can manipulate this table by
                    reordering it by a certain feature or filtering some sections in the table header. You can also click
                    the &quot;ST ID&quot; to navigate to the <b>dataset browser</b> of the ST dataset that you are interested in for further
                    information. Once you have decided which ST section to use for spatial mapping, you can click the
                    &quot;select&quot; button on the right to proceed.
                </p>
                <div style={{textAlign:"center"}}>
                    <Space>
                        <Image src={"/images/tutorial/start/section_bar.png"} width={550} height={310}
                               alt={"section_bar"}/>
                        <Image src={"/images/tutorial/start/section_table.png"} width={550} height={310}
                               alt={"section_table"}/>
                    </Space>
                </div>
                <p>
                    In this example, we select the top-ranked ST section that was derived from the coronal plane of the
                    E14.5 embryonic mouse brain, which was generated using Stereo-seq in this study (
                    <Link href={"/datasets/dataPage/STW-M-Brain-Stereo-seq-1"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>STW-M-Brain-Stereo-seq-1 coronal_1</b>
                        </a>
                    </Link>
                    ). Notably, this section precisely matches the developmental stage of the uploaded scRNA-seq data,
                    highlighting the feasibility of Section Blast.
                </p>
                <div style={{textAlign:"center"}}>
                    <Space>
                        <Image src={"/images/tutorial/start/select_section.png"} width={550} height={310}
                               alt={"select_section"}/>
                        <Image src={"/images/tutorial/start/select_section2.png"} width={550} height={310}
                               alt={"select_section2"}/>
                    </Space>
                </div>
                <h3>4. Spatial mapping</h3>
                <p>
                    After clicking the &quot;select&quot; button, a confirming dialog will pop up allowing you to set the advanced
                    parameters for spatial mapping. As the scRNA-seq data is sufficient in number (10,932 cells), we
                    restrict the &quot;redundancy&quot; parameter to 1 and keep other parameters as default. See
                    <Link href={"/help/manual/mapping#advanced_parameters"}>
                       <a target={"_blank"} rel={"noreferrer"}>
                            <b> here </b>
                        </a>
                    </Link>for the description of the advanced parameters. Click the &quot;Continue&quot; button to begin
                    the spatial mapping process, which will redirect you to a running page.
                </p>
                <div style={{textAlign:"center",marginTop:10}} >
                    <Image src={"/images/tutorial/start/select_section3.png"} width={800} height={440}
                           alt={"select_section3"}/>
                </div>
                <p>
                    Note that if the server is busy, your job will be queued and started automatically when the server
                    becomes available. Typically, the spatial mapping takes about 30 minutes for about 20,000 single cells.
                    Please be patient, and you can leave the running page while the job is in progress, but remember to
                    come back later.
                </p>
                <div style={{textAlign:"center",margin:10}}>
                    <Space>
                        <Image src={"/images/tutorial/start/select_section4.png"} width={550} height={320}
                               alt={"select_section4"}/>
                        <Image src={"/images/tutorial/start/select_section5.png"} width={550} height={320}
                               alt={"select_section5"}/>
                    </Space>
                </div>
                <p>
                    When the job is completed, you will be automatically redirected to the result page of spatial mapping.
                    The interpretation of spatial mapping results will be discussed using several case studies in the next
                    tutorial &quot;
                    <Link href={"/tutorial/mapping/mouseBrain"}>
                        <a>
                            <b>Result interpretation</b>
                        </a>
                    </Link>&quot;.
                </p>
            </Typography>
        </div>
    )
}