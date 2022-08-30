import Head from 'next/head'
import LayoutCustom from '../../components/LayoutCustom.js'
import WaitModule from "../../components/Annotation/waitModule.js";
import useSWR from "swr";
import ResultModule from "../../components/Annotation/resultModule.js";
import Image from "next/image";
import ErrorModule from "../../components/Annotation/errorModule.js";

export async function getServerSideProps(context) {
    return {
        props: {
            rid: context.query.rid,
        }
        // getReqStatus这个函数必须在服务端运行，涉及fs包，所以在getServerSideProps中运行
        // will be passed to the page component as props
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
    const {data, error, isLoading} = useRequestInfo(props.rid||'',false)
    let returnModule
    // 如果找不到该rid，返回error 404页面
    if (error || data === undefined || Object.keys(data).length === 0){
        returnModule =
            <div className={"modal-body-stw"}>
                <Image src={'/images/404.png'} width={1000} height={500} alt={"404"}/>
            </div>
    }
    if (isLoading) {
        returnModule = <div>Loading...</div>
    }
    if ( !error && ! isLoading){
        // 如果该rid的状态是running，返回wait页面，是finished则返回结果页面,是error则返回错误界面；
        if(data.status === 'running') {
            returnModule = <WaitModule data={data}></WaitModule>
        }else if(data.status === 'finished'){
            returnModule = <ResultModule data={data}></ResultModule>
        }else if(data.status === 'error'){
            returnModule = <ErrorModule data={data}></ErrorModule>
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