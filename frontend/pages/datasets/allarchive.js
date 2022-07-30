import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../../components/LayoutCustom.js'
import Link from "next/link";
import TableLayout from "../../components/Datasets/TableLayout.js";

export default function AllArchive() {
    const checkboxStyle={fontWeight:'normal'}
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle}| Datasets Archive</title>
            </Head>
            <div className="modal-body-stw">
                <div className="page-header">
                    <h1>Spatial Transcritome Datasets </h1>
                </div>
                <TableLayout checkboxStyle={checkboxStyle}></TableLayout>
            </div>
        </LayoutCustom>
    )
}