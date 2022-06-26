import Head from 'next/head'
import Layout from '../../components/layout.js'
import { useRouter } from "next/router";
import UploadSuccess from "../../components/upload-success.js";

export async function getServerSideProps(context) {
    return {
        props: context.query, // will be passed to the page component as props
    };
}

export default function Success(props) {
    return (
        <Layout>
            <Head>
                <title>STW-Analysing: {props.title}</title>
            </Head>
            <UploadSuccess rid={props.rid}
                           email={props.email}
                           time={props.uploadtime}
            ></UploadSuccess>
        </Layout>
    )
}