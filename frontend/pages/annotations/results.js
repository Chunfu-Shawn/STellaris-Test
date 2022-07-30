import Head from 'next/head'
import LayoutCustom, { siteTitle }from '../../components/LayoutCustom.js'
import WaitModule from "../../components/Annotation/waitModule.js";
import Error from 'next/error'
import {getReqStatus} from "../../../libs/api/getReqStatus.js";
import useSWR from "swr";
import ResultModule from "../../components/Annotation/resultModule.js";
import Image from "next/image";
import ErrorModule from "../../components/Annotation/errorModule.js";

export async function getServerSideProps(context) {
    return {
        props: getReqStatus(context.query.rid)
        // getReqStatus这个函数必须在服务端运行，涉及fs包，所以在getServerSideProps中运行
        // will be passed to the page component as props
    }
}


// 设计一个自定义hook，每次渲染后返回数据结果；
function useRequestInfo(rid){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`/api/getFilesInfo/${rid}`, fetcher, { revalidateIfStale: true })
    // 如果数据为空，为undefined，返回error为true
    return{
        data: data,
        error: error,
        isLoading: !error && !data,
    }
}

export default function ResultPage(props) {
    // 如果找不到该rid，返回error 404页面
    const {data, error, isLoading} = useRequestInfo(props.rid||'',false)
    if (error){
        return (
            <LayoutCustom>
                <Head>
                    <title>{siteTitle}| Annotation</title>
                </Head>
                <div className={"modal-body-stw"}>
                    <Image src={'/static/images/404.png'} width={1000} height={500}/>
                </div>
            </LayoutCustom>
                )
    }
    if (isLoading) {
        return (
            <LayoutCustom>
                <Head>
                    <title>{siteTitle}| Annotation: {props.rid}</title>
                </Head>
                <div>Loading...</div>
            </LayoutCustom>
        )
    }
    //否则返回等待页面
    let returnModule
    // 如果该rid的状态是running，返回wait页面，是finished则返回结果页面,是error则返回错误界面；
    if(data.status === 'running') {
        returnModule = <WaitModule data={data}></WaitModule>
    }else if(data.status === 'finished'){
        returnModule = <ResultModule data={data}></ResultModule>
    }else if(data.status === 'error'){
        returnModule = <ErrorModule data={data}></ErrorModule>
    }

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle}| Annotation: {props.rid}</title>
            </Head>
            {returnModule}
        </LayoutCustom>
    )
}