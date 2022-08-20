import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import TableLayout from "../../components/Datasets/TableLayout.js";
import {mouseData} from '../../components/Datasets/getData&Options.js';

export default function MouseArchive() {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <LayoutCustom>
            <Head>
                <title>STW | Mouse Archive</title>
            </Head>
            <div className="modal-body-stw" style={{padding:'8% 5%'}}>
                <div className="page-header">
                    <h1>Spatial Transcriptome Data - Mouse Archive</h1>
                </div>
                <TableLayout checkboxStyle={checkboxStyle} data={mouseData} archive={"mouse"}></TableLayout>
            </div>
        </LayoutCustom>
    )
}