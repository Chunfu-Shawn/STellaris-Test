import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import TableLayout from "../../components/Datasets/TableLayout.js";
import {data} from '../../components/Datasets/getData&Options.js';

export default function AllArchive() {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <LayoutCustom>
            <Head>
                <title>STW | Datasets Archive</title>
            </Head>
            <div className="modal-body-stw" style={{padding:'8% 5%'}}>
                <div className="page-header">
                    <h1>Spatial Transcriptome Datasets </h1>
                </div>
                <TableLayout checkboxStyle={checkboxStyle} data={data} archive={"all"}></TableLayout>
            </div>
        </LayoutCustom>
    )
}