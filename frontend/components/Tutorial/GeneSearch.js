import React from "react";
import {Breadcrumb, Typography, Image} from "antd";
import {contentStyle} from "../Help/SiderStaticMenu";
import Link from "next/link";

export default function GeneSearch(){
    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Tutorial</Breadcrumb.Item>
                <Breadcrumb.Item>Gene Search</Breadcrumb.Item>
            </Breadcrumb>
            <a id={"Gene Search"} style={{position: 'relative', top: "-150px"}}></a>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h2>Gene Search</h2>
                <p>
                    In this tutorial, we will show you how to retrieve gene expression characteristics from the spatial
                    perspective through gene search portal (
                    <Link href={"https://spatial.rhesusbase.com/search"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b>https://spatial.rhesusbase.com/search</b>
                        </a>
                    </Link>), such as spatially variable gene expression and tissue-wide gene expression, which was
                    summarized upon our ST dataset catalog.
                </p>
                <p>
                    1. Click on <b>&quot;Search&quot;</b> tab in the navigator bar. After selecting the organism and gene ID
                    type, enter the gene of interest you wish to search. Here we use human ID2 gene as an example. We
                    search for it by gene symbol in both human and mouse datasets.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/gene/gene1.png"} width={800} height={450}
                           alt={"gene1"}/>
                </div>
                <p>
                    2.	A list of partially matching genes is returned, and you can click on the desired gene to proceed.
                    Here we select human ID2 gene in the second row.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/gene/gene2.png"} width={800} height={450}
                           alt={"gene2"}/>
                </div>
                <p>
                    3. At the top of this page, we provide a summary of whether or not the query gene is defined as
                    a spatially variable gene (SVG) across different organs. In this example, human ID2 gene was determined
                    as a SVG in colon, liver and heart. The details of SVG characteristics will be shown later.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/gene/SVG.png"} width={800} height={240}
                           alt={"SVG"}/>
                </div>
                <p>
                    4. The <b>&quot;Summary&quot;</b> part shows the basic properties of query gene.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/gene/summary.png"} width={800} height={370}
                           alt={"summary"}/>
                </div>
                <p>
                    5. The <b>&quot;SVG Expression&quot;</b> part visualizes the gene expression in organs/tissues where
                    it was determined as a SVG. A randomly selected ST section for a certain organ/tissue is displayed
                    to view the spatially resolved gene expression characteristics. A table of ST sections where target
                    gene was identified as a SVG is also provided and you can click on <b>&quot;Export to CVS&quot;</b>
                    button to download it. You can also click on <b>&quot;ST ID&quot;</b> to explore ST sections of your
                    interest.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/gene/SVG_expression.png"} width={800} height={550}
                           alt={"SVG_expression"}/>
                </div>
                <p>
                    6. We also provide a summary of pseudo-bulk gene expressions measured by the percentile of log(CPM) across
                    ST sections, which was displayed in descending order. More details of &quot;Rank Score&quot; value are
                    displayed in
                    <Link href={"/help/manual/search#expression_rank_score"}>
                        <a target={"_blank"} rel={"noreferrer"}>
                            <b> help </b>
                        </a>
                    </Link>.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/gene/expression_rank_score.png"} width={800} height={460}
                           alt={"expression_rank_score"}/>
                </div>
                <p>
                    7. Navigate to <b>&quot;Download&quot;</b> part to export the underlying files supporting this page.
                </p>
                <div style={{textAlign:"center"}} >
                    <Image src={"/images/tutorial/gene/gene_download.png"} width={800} height={460}
                           alt={"gene_download"}/>
                </div>
            </Typography>
        </div>
    )
}