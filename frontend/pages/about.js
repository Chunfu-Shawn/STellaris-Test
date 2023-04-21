import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import Image from "next/image";
import { Divider } from 'antd';
import React from "react";


export default function About() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| About"}</title>
            </Head>
            <div className="modal-body-stw">
                <header className="page-header">
                    <h1>About STellaris</h1>
                </header>
                <div className="box">
                    <p>
                        Single-cell RNA sequencing (scRNA-seq) has enabled comprehensive profiling of molecular signatures
                        of diverse cell types. However, the spatial information was lost during the tissue dissociation step,
                        hindering the further interpretation of crosstalk between different cell types that coordinates
                        tissue formation and pathological states. Emerging spatial transcriptomics (ST) methods enable
                        measuring gene expression while preserving spatial information. The expanding ST datasets offer
                        the potential for serving as a reference atlas for guiding spatial mapping of existing scRNA-seq
                        data, thereby increasing their value in deciphering intercellular communications in the spatial
                        context.
                    </p>
                    <p>
                        <b>STellaris</b> is an integrated web server for accurate and flexible spatial mapping of user-uploaded
                        scRNA-seq data. It is founded on a manually curated compilation of ST datasets across diverse organs,
                        developmental stages and pathological states in humans and mice. With the inferred spatial information
                        of single cells, STellaris can thus characterize spatial distances between cell type pairs and
                        identify intercellular LRIs between them. Notably, the spatial construction of other single-cell
                        omics data that were jointly profiled with the transcriptome can be resolved simultaneously if
                        provided.
                    </p>
                    <p>
                        STellaris also provides a dataset browser tool for navigating ST datasets collected in our local
                        database, as well as a gene search tool for retrieving gene expression characteristics from a
                        spatial perspective.
                    </p>
                </div>
                <Image src={'/images/Figure1-v4.png'} alt={"figure1"} width={800} height={700}/>
                <Divider><h2>License</h2></Divider>
                <div className="box">
                    <p>
                        STellaris is open and free for everyone to use and there is no login requirement. Please be
                        assured that your submitted data will be kept private. We kindly request users to limit their
                        requests to no more than <b>3</b> concurrent jobs when using this web server.
                    </p>
                </div>
                <Divider><h2>Acknowledgement</h2></Divider>
                <div className="box">
                    <p>
                        STellaris draws inspiration from and integrates several tools or methods that have been
                        <a href={"https://pubmed.ncbi.nlm.nih.gov/?term=35314812%2C31932730%2C34857954%2C36130281%2C29409532%2C34774128%2C32719530"}
                           target={"_blank"} rel={"noreferrer"}>
                            &nbsp;published earlier
                        </a>.
                    </p>
                    <p>
                        This project was supported by grants from the Ministry of Science and Technology of China
                        (National Key Research and Development Program of China, 2018YFA0801405 and 2019YFA0801801) and
                        the National Natural Science Foundation of China (31871272 and 31801103).
                    </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            </div>
        </LayoutCustom>
    )
}