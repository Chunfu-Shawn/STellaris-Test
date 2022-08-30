import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import WaitModule from "../../../components/Annotation/waitModule.js";
import useSWR from "swr";
import ResultModule from "../../../components/Annotation/resultModule.js";
import ErrorModule from "../../../components/Annotation/errorModule.js";

export async function getServerSideProps(context) {
    if ( typeof context.params.rid === undefined ) {
        return {
            notFound: true,
        }
    }
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/job-status/"+ context.params.rid
    )
    const data = await res.json()
    // 如果找不到该rid相应的任务记录，返回error 404页面
    if ( data.length === 0 ) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            rid: context.params.rid,
            data: data[0]
        }
    }
}


// 设计一个自定义hook，每次渲染后返回数据结果；
function useRequestInfo(rid){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`/api/job-status/${rid}`, fetcher, { revalidateIfStale: true })
    // 如果数据为空，为undefined，返回error为true
    return{
        data: data,
        error: error,
        isLoading: !error && !data,
    }
}

export default function ResultPage(props) {
    let {data, error, isLoading} = useRequestInfo(props.rid,false)
    let returnModule
    // 如果找不到该rid，返回error 404页面
    if (isLoading) {
        returnModule = <div>Loading...</div>
    }
    if ( !error && ! isLoading){
        // 如果该rid的状态是running，返回wait页面，是finished则返回结果页面,是error则返回错误界面；
        if(data[0].status === 'running') {
            returnModule = <WaitModule data={data[0]}></WaitModule>
        }else if(data[0].status === 'finished'){
            returnModule = <ResultModule data={data[0]}></ResultModule>
        }else if(data[0].status === 'error'){
            returnModule = <ErrorModule data={data[0]}></ErrorModule>
        }
    }
    let title = `STW | Annotation | ${props.rid}`

    return (
        <LayoutCustom>
            <Head>
                <title>{title}</title>
            </Head>
            {returnModule}
        </LayoutCustom>
    )
}