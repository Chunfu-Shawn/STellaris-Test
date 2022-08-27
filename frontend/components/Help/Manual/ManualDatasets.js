import {Breadcrumb, Typography} from 'antd';
import React  from 'react';
import {contentStyle} from "../SiderMenu.js";
import GeneAttributionsTable from "./Datasets/GeneAttributionsTable.js";
import SearchResultsAttributionsTable from "./Datasets/SearchResultsAttributionsTable.js";
import GeneInfoAttributionsTable from "./Datasets/GeneInfoAttributionsTable.js";
import GeneFeaturesAttributionsTable from "./Datasets/GeneFeaturesAttributionsTable.js";

export default function ManualDatasets() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Datasets</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50}}>
                <h1>Datasets</h1>
                <h2>1. Introduction</h2>
                <p style={{fontSize:16}}>
                    We collected and integrated 125 set of spatial transcriptome datasets.
                </p>
            </Typography>

        </div>
    )
}