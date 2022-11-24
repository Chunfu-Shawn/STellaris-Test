import Head from 'next/head'
import LayoutCustom from '../../../components/LayoutCustom.js'
import WaitModule from "../../../components/Annotation/WaitModule.js";
import useSWR from "swr";
import ResultModule from "../../../components/Annotation/ResultPage/ResultModule.js";
import ErrorModule from "../../../components/Annotation/ErrorModule.js";
import React from "react";
import LoadingModule from "../../../components/Annotation/ResultPage/LoadingModule";
import {Result,Button} from "antd";
import ScreeningModule from "../../../components/Annotation/ScreeningPage/ScreeningModule";
import SelectTableModule from "../../../components/Annotation/ScreeningPage/SelectTableModule";

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
    const res2 = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/server-time"
    )
    const data2 = await res2.json()
    // 如果找不到该rid相应的任务记录，返回error 404页面
    if ( data.title === undefined ) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            rid: context.params.rid,
            data: {...data,serverTime:data2["serverTime"]},
        }
    }
}


// 自定义hook，每次渲染后返回任务状态；
function useRequestInfo(rid){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`/api/job-status/${rid}`, fetcher,
        {
            revalidateIfStale: false,
            refreshInterval: 1000,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        reqInfo: data,
        error: error,
        isLoading: !error && !data,
    }
}

// 自定义hook，每次渲染后返回Screening Log结果；
function useScreeningLog(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="screening"?`/api/screening-log/${rid}`:null, fetcher,
        {
            revalidateIfStale: false,
            refreshInterval: 500,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        sLog: data,
        error2: error,
        isLoading2: !error && !data,
    }
}

// 自定义hook，每次渲染后返回MIA结果；
function useMIAResult(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="selecting"?`/api/mia-result/${rid}`:null, fetcher,
        {
            revalidateIfStale: false,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        MIA: data,
        error3: error,
        isLoading3: !error && !data,
    }
}

// 自定义hook，每次渲染后返回 Niche Anchor Log结果；
function useNicheAnchorLog(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="running"?`/api/niche-anchor-log/${rid}`:null, fetcher,
        {
            revalidateIfStale: false,
            refreshInterval: 500,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        nLog: data,
        error4: error,
        isLoading4: !error && !data,
    }
}

// 自定义hook，根据任务状态，每次渲染后返回任务结果；
function useAnnResult(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="finished"?`/api/annotation-result/${rid}`:null, fetcher,
        {
            revalidateIfStale: false,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        result: data,
        error5: error,
        isLoading5: !error && !data,
    }
}

export const AnnContext = React.createContext({});

export default function ResultPage(props) {
    let {reqInfo, error, isLoading} = useRequestInfo(props.rid)
    let {sLog, error2, isLoading2} = useScreeningLog(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {MIA, error3, isLoading3} = useMIAResult(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {nLog, error4, isLoading4} = useNicheAnchorLog(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {result, error5, isLoading5} = useAnnResult(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let returnModule
    // 如果找不到该rid，返回error 404页面
    if (isLoading || isLoading2 || isLoading3 || isLoading4 || isLoading5) {
        returnModule = <div style={{textAlign:"center"}}><LoadingModule/></div>
    }
    //  如果找不到结果，显示error页面
    if ( error || error2 || error3 || error4 || error5){
        returnModule =
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                style={{margin:150}}
                extra={<Button type="primary" href={"/"}>Back Home</Button>}
            />
    }
    // 等待fetch 任务状态和任务结果结束，才开始渲染页面
    if ( !error && ! isLoading ){
        // 如果该rid的状态是auditioning，返回auditioning wait页面，
        // 是selecting，返回海选后table的页面，
        // 是running，返回wait页面，
        // 是finished则返回结果页面,
        // 是error则返回错误界面；
        if(reqInfo.status === 'screening' && !error2 && !isLoading2) {
            returnModule = <ScreeningModule/>
        }else if(reqInfo.status === 'selecting' && !error3 && !isLoading3) {
            returnModule = <SelectTableModule/>
        }else if(reqInfo.status === 'running' && !error4 && !isLoading4) {
            returnModule = <WaitModule/>
        }else if(reqInfo.status === 'finished' && !error5 && !isLoading5){
            returnModule = <ResultModule/>
        }else if(reqInfo.status === 'error'){
            returnModule = <ErrorModule/>
        }
    }
    let title = `STW | Annotation | ${props.rid}`

    return (
        <LayoutCustom>
            <AnnContext.Provider
                value={
                {
                    serverTime: props.data.serverTime,
                    reqInfo: reqInfo,
                    sLog: sLog,
                    MIA: MIA,
                    nLog: nLog,
                    result: result
                }
            }>
                <Head>
                    <title>{title}</title>
                </Head>
                {returnModule}
            </AnnContext.Provider>
        </LayoutCustom>
    )
}