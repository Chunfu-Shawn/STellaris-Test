import {Breadcrumb, Typography} from 'antd';
import React from 'react';
import {contentStyle} from "../SiderMenu.js";
import GeneAttributionsTable from "./Datasets/GeneAttributionsTable.js";
import SearchResultsAttributionsTable from "./Datasets/SearchResultsAttributionsTable.js";
import GeneInfoAttributionsTable from "./Datasets/GeneInfoAttributionsTable.js";
import GeneFeaturesAttributionsTable from "./Datasets/GeneFeaturesAttributionsTable.js";

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
                <h2>4. Files Format</h2>
                <h2>5. Annotation Result</h2>

            </Typography>
        </div>
    )
}