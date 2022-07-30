import Head from 'next/head'
import { useRouter } from "next/router";
import UploadSuccess from "../../components/Annotation/upload-success.js";
import LayoutCustom from "../../components/LayoutCustom.js";

export async function getServerSideProps(context) {
    return {
        props: context.query, // will be passed to the page component as props
    };
}

export default function Success(props) {
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle}| Analysing: {props.title}</title>
            </Head>
            <UploadSuccess rid={props.rid}
                           email={props.email}
                           time={props.uploadtime}
            ></UploadSuccess>
        </LayoutCustom>
    )
}