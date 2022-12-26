import React from "react";
import {Breadcrumb, Space, Typography, Image} from "antd";
import {contentStyle} from "../Help/SiderStaticMenu";

export default function GetStarted(){
    return(
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Mapping</Breadcrumb.Item>
                <Breadcrumb.Item>Get started</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"Get started"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Get started (step by step)</h2>
                <p>Here, we use the scRNA-seq data of <b>mouse fetal cerebral cortex (E14.5)</b>, which was randomly sampled
                    to 3,000 cells for speeding things up, to guide users through the Spatial Mapping workflow, which is the
                    key module in STellaris. This tutorial are divided into data preparation, job submission, section blast,
                    spatial mapping and data export.
                </p>
                <h3>1. Data preparation</h3>
                <a id={"data_preparation"} style={{position: 'relative', top: "-150px"}}></a>
                <p>The spatial mapping analysis requires two files uploaded by users: 1) cell-by-gene count matrix file
                    measured by raw counts where column name are gene symbols and row name are unique cell ids; 2) meta
                    information of cells requiring unique cell ids in the first column that are in same order as count matrix
                    and cell type (or cluster) labels in one of the latter columns titled with “cell_type”. Note that the
                    identifiers of genes should only be gene symbols currently. These two files should be tab- or comma-delimited
                    (.tsv, .txt or .csv)  in gzip or zip compression (.gz or .zip). </p>
                <p>A desirable count matrix file looks like:</p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/start/counts_matrix_example.png"} width={600} height={350}
                           alt={"counts_matrix_example"} style={{borderStyle:"dashed"}}/>
                </div>
                <p>A desirable label file looks like:</p>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/start/labels_example.png"} width={600} height={200}
                           alt={"labels_example"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>2. Submit a job</h3>
                <h4>Basic information</h4>
                <ul>
                    <li>Enter a title of your job in “Job Title” box (no more than 80 characters).</li>
                    <li>Enter an email address to receive the notification of project progress (optional but recommended).</li>
                    <li>Select candidate ST sections matching your scRNA-seq by specifying “Species”, “Organ” and “Tissue”.
                        This step is crucial that only the ST sections meeting these conditions will be considered in the
                        following analyses.</li>
                </ul>
                <h4>Data upload</h4>
                <ul>
                    <li>Click on “Select a count matrix file” button on the home page or Mapping page in the navigator bar
                        and select a prepared count matrix file.</li>
                    <li>Click on “Select a label file” to select a meta file with cell type annotation.</li>
                    <li>Click on “Upload” and wait for a second.</li>
                </ul>
                <div style={{textAlign:"center"}}>
                    <Image src={"/images/tutorial/start/get_started.png"} width={800} height={450}
                           alt={"get_started"} style={{borderStyle:"dashed"}}/>
                </div>
                <h3>3. Section blast</h3>
                <p>After user data were successfully uploaded, you will receive a confidential URL of your requested job and
                    be redirected to a running page. The next step we term as &quot;section blast&quot; will automatically start. In brief,
                    this analysis aims to help researcher rapidly search for the best match reference ST section in samples of
                    interest. This step is generally fast and will take about 2~3 min.
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
                    When section blast is finished, a matching score of each ST section will be returned in descending order.
                    A table with additional attributes of target ST sections (104 sections in this example) will also be reported.
                    To choose the section to which you want to map, you can manipulate this table by reordering by a certain
                    feature or filtering out some sections in the table header. You can also click the &quot;ST ID&quot; and navigate
                    to Datasets page of ST dataset that you are interested in for further information. Once you have determined
                    the ST section used for spatial mapping, you can click the &quot;select&quot; button on the right to proceed.
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
                    Here we select the top-ranked ST section, a spatial transcriptomic map of mouse fetal brain coronal plane
                    at E14.5, which is generated by our lab using Stereo-seq. This enriched ST section is in the same stage
                    as our query scRNA-seq data, underlining the feasibility of section blast.
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
                    A confirming dialog will pop up when you click the &quot;select&quot; button where you can set the advanced parameters
                    for spatial mapping. Here we use the defaults and click &quot;Continue&quot; to start the process of spatial mapping,
                    and this will redirect us to another running page. If the server is busy, your job would be in the queue
                    and start automatically when the previous jobs are complete. Note that spatial mapping will generally
                    take about 30 min for around 20,000 single cells, please be patient, you can leave aside the running
                    page and remember to come back later.
                </p>
                <div style={{textAlign:"center"}}>
                    <Space>
                        <Image src={"/images/tutorial/start/select_section3.png"} width={550} height={320}
                               alt={"select_section3"}/>
                        <Image src={"/images/tutorial/start/select_section4.png"} width={550} height={320}
                               alt={"select_section4"}/>
                    </Space>
                </div>
                <div style={{textAlign:"center",marginTop:10}} >
                    <Image src={"/images/tutorial/start/select_section5.png"} width={550} height={320}
                           alt={"select_section5"}/>
                </div>
                <p>
                    You will be automatically redirected to the result page of spatial mapping when the job is completed.
                    The interpretation of spatial mapping results will be discussed in the next tutorial &quot;Result
                    interpretation&quot;.
                </p>
            </Typography>
        </div>
    )
}