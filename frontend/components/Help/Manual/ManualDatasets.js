import {Breadcrumb, Typography} from 'antd';
import React  from 'react';
import {contentStyle} from "../SiderStaticMenu.js";
import Image from "next/image";
import DatasetAttributesTable from './DatasetPage/DatasetAttributesTable'

export default function ManualDatasets() {

    return (
        <div className="modal-body-stw" style={contentStyle}>
            <Breadcrumb>
                <Breadcrumb.Item>Help</Breadcrumb.Item>
                <Breadcrumb.Item>Manual</Breadcrumb.Item>
                <Breadcrumb.Item>Datasets</Breadcrumb.Item>
            </Breadcrumb>
            <Typography style={{marginTop:50,fontSize:16}}>
                <h1>Datasets</h1>
                <h2>1. Introduction</h2>
                <p>
                    We collected and integrated 96 set of spatial transcriptome datasets.
                </p>
                <h2>2. Data Pre-processing</h2>
                <h2>3. Datasets Attributes</h2>
                <a id={"data_page_attributes"} style={{position: 'relative', top: "-150px"}}></a>
                <p>Each dataset comprises following attributes:</p>
                <DatasetAttributesTable/>
                <h2>4. Data Visualization</h2>
                <a id={"data_page_view"} style={{position: 'relative', top: "-150px"}}></a>
                <p> STW uses Spatial-Trans-Visual-Tool (<a href={"https://github.com/Chunfu-Shawn/Spatial-Trans-Visual-Tool"} target={"_blank"} rel={"noreferrer"}>
                    https://github.com/Chunfu-Shawn/Spatial-Trans-Visual-Tool</a>) which was developed from Cirrocumulus
                    (<a href={"https://cirrocumulus.readthedocs.io/en/latest/"} target={"_blank"} rel={"noreferrer"}>
                        https://cirrocumulus.readthedocs.io/en/latest/</a>)
                    for dataset visualization. Cirrocumulus is an interactive visualization tool for large-scale single-cell
                    and spatial transcriptomic data. The data visualization module consists of Sections selector, an app bar, side bar,
                    primary embedding, embedding gallery and toolbar and distribution plots.
                </p>
                <Image src={"/images/visual-tool.png"} alt={'spatial_trans_visual_tool'} width={900} height={700}/>
                <ul>
                    <li><b>Sections ID Selector</b>: allows users to select a section of this datasets to show</li>
                    <li><b>App bar</b>: The app bar shows the number of plots in your dataset and the number of selected cells.
                        Additionally, it lets you switch between different tabs.</li>
                    <li><b>Side bar</b>: allows users to select which cell embeddings, genes/features, cell metadata (such as cluster labels)
                        and sets (predefined lists of genes, e.g. cluster markers) to visualize, and shows the current datasets cell filters.
                    </li>
                    <li><b>Primary Embedding</b>: allows users to watch and interact with the view of spatial data.</li>
                    <li><b>Embedding Gallery</b>: shows all selected features and embeddings and thus provides a way for comparing attributes and embeddings.</li>
                    <li><b>Toolbar</b>: some tools to select interested spots, download a slice of spatial data and so on.</li>
                    <li><b>Distribution</b>: allows users to explore the differential gene expression across cell clusters with a dot plot, a heat map, or a violin plot.</li>
                </ul>
                <p>For more details, please visit:
                    <a href={'https://cirrocumulus.readthedocs.io/en/latest/documentation.html'} target={'_blank'} rel={'noreferrer'}>
                        https://cirrocumulus.readthedocs.io/en/latest/documentation.html</a>
                </p>
                <h2>5. Data Features</h2>
                <a id={"data_page_features"} style={{position: 'relative', top: "-150px"}}></a>
                <p>
                </p>

            </Typography>

        </div>
    )
}