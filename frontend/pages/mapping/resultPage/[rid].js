import Head from 'next/head'
import useSWR from "swr";
import React from "react";
import {Result,Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import LayoutCustom, {siteTitle} from '../../../components/LayoutCustom.js'
import ScreeningModule from "../../../components/Mapping/ScreeningPage/ScreeningModule";
import SelectTableModule from "../../../components/Mapping/ScreeningPage/SelectTableModule";
import WaitingModule from "../../../components/Mapping/WaitingModule.js";
import RunningModule from "../../../components/Mapping/RunningModule.js";
import ResultModule from "../../../components/Mapping/ResultPage/ResultModule.js";
import ErrorModule from "../../../components/Mapping/ErrorModule.js";
import LoadingModule from "../../../components/Mapping/ResultPage/LoadingModule";

export async function getServerSideProps(context) {
    if ( typeof context.params.rid === undefined ) {
        return {
            notFound: true,
        }
    }
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/job-info/"+ context.params.rid
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
    const { data, error } = useSWR(`/api/job-info/${rid}`, fetcher,
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
            refreshInterval: 1000,
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

// 自定义hook，每次渲染后返回MIA结果；
function useQueueInfo(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="waiting"?`/api/queue/${rid}`:null, fetcher,
        {
            revalidateIfStale: false,
            refreshInterval: 2000,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        queueInfo: data,
        error4: error,
        isLoading4: !error && !data,
    }
}

// 自定义hook，每次渲染后返回 Niche Anchor Log结果；
function useSpatialMappingLog(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="running"?`/api/niche-anchor-log/${rid}`:null, fetcher,
        {
            refreshInterval: 1000,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        nLog: data,
        error5: error,
        isLoading5: !error && !data,
    }
}

// 自定义hook，根据任务状态，每次渲染后返回任务结果；
function useAnnResult(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="finished"?`/api/mapping-result/${rid}`:null, fetcher,
        {
            revalidateIfStale: false,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        result: data,
        error6: error,
        isLoading6: !error && !data,
    }
}

// 自定义hook，根据任务状态，每次渲染后返回任务结果；
function useErrorLog(rid,status){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(status==="error"?`/api/error-log/${rid}`:null, fetcher,
        {
            revalidateIfStale: true,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        eLog: data,
        error7: error,
        isLoading7: !error && !data,
    }
}

export const AnnContext = React.createContext({});

export default function ResultPage(props) {
    let {reqInfo, error, isLoading} = useRequestInfo(props.rid)
    let {sLog, error2, isLoading2} = useScreeningLog(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {queueInfo, error4, isLoading4} = useQueueInfo(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {MIA, error3, isLoading3} = useMIAResult(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {nLog, error5, isLoading5} = useSpatialMappingLog(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {result, error6, isLoading6} = useAnnResult(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let {eLog, error7, isLoading7} = useErrorLog(props.rid,
        reqInfo===undefined ? false : reqInfo.status)
    let returnModule

    // 如果找不到该rid，返回error 404页面
    if (isLoading || isLoading2 || isLoading3 || isLoading5 || isLoading6 || isLoading7) {
        returnModule = <div style={{textAlign:"center"}}><LoadingModule/></div>
    }


    //  如果找不到job信息或者分析的log信息，显示error页面
    if ( error || error2 || error5 || error7){
        returnModule =
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
                style={{margin:150}}
                extra={<Button type="primary" href={"/"}>Back Home</Button>}
            />
    }

    //  如果找不到MIA结果或最终结果，显示数据过期的页面
    if ( error3 || error6 ){
        returnModule =
            <Result
                icon={<DeleteOutlined />}
                title={<p>Sorry, your data and results have been expired!</p>}
                subTitle={"It's been over a week since you submitted the job. Please submit a new job if necessary!"}
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
        }else if(reqInfo.status === 'waiting' && !error4 && !isLoading4) {
            returnModule = <WaitingModule/>
        }else if(reqInfo.status === 'running' && !error5 && !isLoading5) {
            returnModule = <RunningModule/>
        }else if(reqInfo.status === 'finished' && !error6 && !isLoading6){
            returnModule = <ResultModule/>
        }else if(reqInfo.status === 'error' && !error6 && !isLoading7){
            returnModule = <ErrorModule/>
        }
    }

    return (
        <LayoutCustom>
            <AnnContext.Provider
                value={
                {
                    serverTime: props.data.serverTime,
                    reqInfo: reqInfo,
                    sLog: sLog,
                    MIA: MIA,
                    queueInfo: queueInfo,
                    nLog: nLog,
                    result: result,
                    eLog:eLog
                }
            }>
                <Head>
                    <title>{siteTitle+"| Mapping | "+props.rid}</title>
                </Head>
                {returnModule}
            </AnnContext.Provider>
        </LayoutCustom>
    )
}