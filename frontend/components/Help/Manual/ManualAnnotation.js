import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderStaticMenu.js";
import GeneAttributionsTable from "./GenePage/GeneAttributionsTable.js";
import SearchResultsAttributesTable from "./GenePage/SearchResultsAttributesTable.js";
import GeneInfoAttributesTable from "./GenePage/GeneInfoAttributesTable.js";
import GeneFeaturesAttributesTable from "./GenePage/GeneFeaturesAttributesTable.js";

export default function ManualAnnotation() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Spatial Annotation</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50}}>
                <h1>Spatial Annotation</h1>
                <h2>1. Introduction</h2>
                <p style={{fontSize:16}}> This Module allows users to utilize multiple machine learning methods to map cell labels
                    in scRNA-seq data back to the spatial transcriptome to see the distribution of cell labels in the spatial transcriptome data.
                    It presents the predicted spatial distribution of cell labels by scRNA-seq came from users, which may provide a new
                    dimensional perspective to explore the scRNA-seq datasets.
                </p>
                <h2>2. Reference Data</h2>
                <h2>3. Methods</h2>
                <h4>(1) Tangram </h4>
                <p>Tangram, an algorithm that uses sc/snRNA-seq data as &apos;puzzle pieces&apos; to align in space to match
                    &apos;the shape&apos; of the spatial data (Fig. 1a). The input to Tangram is sc/snRNA-seq data along with
                    spatial profiling data from the same region or tissue type, from any currently available spatial
                    method (for example MERFISH, smFISH, STARmap, ISH, or Visium), requiring only that the two modalities
                    share at least some subset of common genes.</p>
                <p>
                    <i>- Biancalani, T., Scalia, G., Buffoni, L. et al. Deep learning and alignment of spatially resolved
                    single-cell transcriptomes with Tangram. Nat Methods 18, 1352–1362 (2021). </i>
                    <a href={"https://doi.org/10.1038/s41592-021-01264-7"} target={"_blank"} rel={"noreferrer"}>
                    https://doi.org/10.1038/s41592-021-01264-7</a>
                </p>
                <h4>(2) Cell2location </h4>
                <h2>4. Files Format</h2>
                <h2>5. Annotation Result</h2>

            </Typography>
        </div>
    )
}