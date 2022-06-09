import Head from 'next/head'
import Layout from '../../components/layout'
import Wait from "../../components/wait";
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
    return {
        props: {
            rid: context.query.rid,
            time: context.query.time,
            title: context.query.title,
            email: context.query.email,
        }, // will be passed to the page component as props
    }
}

export default function WaitPage(props) {
    //const router = useRouter()
    return (
        <Layout>
            <Head>
                <title>STW-Analysing: {props.rid}</title>
            </Head>
            <Wait info={props} ></Wait>
        </Layout>
    )
}