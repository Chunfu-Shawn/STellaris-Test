import Head from 'next/head'
import Layout from '../../components/layout'
import WaitModule from "../../components/waitModule";
import DefaultErrorPage from 'next/error'
import {getReqStatus} from "../../libs/api/getReqStatus";
import {useEffect, useState} from "react";
import useSWR from "swr";
import ResultModule from "../../components/resultModule";

export async function getServerSideProps(context) {
    return {
        props: getReqStatus(context.query.rid)
        // getReqStatus这个函数必须在服务端运行，涉及fs包，所以在getServerSideProps中运行
        // will be passed to the page component as props
    }
}


// 设计一个自定义hook，每次渲染后返回数据结果；
function useRequestInfo(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`/api/getFilesInfo/${rid}`, fetcher, { revalidateIfStale: true , isPaused(){ return status } })
    return {
        data: data,
        error: error,
        isLoading: !error && !data,
    }
}

export default function ResultPage(props) {
    const {data, error, isLoading} = useRequestInfo(props.rid,false)
    if (isLoading) {
        return (
            <Layout>
                <Head>
                    <title>STW-Annotation: {props.rid}</title>
                </Head>
                <div>Loading...</div>
            </Layout>
        )
    }
    if (error){
        return (
            <Layout>
                <Head>
                    <title>STW-Annotation: {props.rid}</title>
                </Head>
                <div>Loading...</div>
            </Layout>
        )
    }
    // 如果找不到该rid，返回error 404页面
    if (props.rid === undefined) return <DefaultErrorPage statusCode={404} />
    console.log(data)
    //否则返回等待页面
    return (
        <Layout>
            <Head>
                <title>STW-Annotation: {props.rid}</title>
            </Head>
            {/* 如果该rid的状态是false，返回wait页面，是true则返回结果页面 */}
            {data.status ?
                <ResultModule data={data}></ResultModule>
                :
                <WaitModule data={data}
                      error={error}
                      isLoading={isLoading}></WaitModule>
            }
        </Layout>
    )
}