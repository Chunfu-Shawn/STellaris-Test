import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import TableLayout from "../../components/Datasets/TableLayout.js";
import {humanData} from '../../components/Datasets/getData&Options.js';

export default function HumanArchive() {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <LayoutCustom>
            <Head>
                <title>STW | Human Archive</title>
            </Head>
            <div className="modal-body-stw" style={{padding:'8% 5%'}}>
                <div className="page-header">
                    <h1>Spatial Transcritome Data - Human Archive</h1>
                </div>
                <TableLayout checkboxStyle={checkboxStyle} data={humanData} archive={"human"}></TableLayout>
            </div>
        </LayoutCustom>
    )
}