import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Input, message, Select, Space} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
const { Search } = Input;
const { Option } = Select;

export default function Browser() {
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('Symbol');
    const [species, setSpecies] = useState('All');
    const UPLOAD_URL = 'http://localhost:3000/browser/results'
    const router = useRouter()
    const onIDTypeChange = (value) => {
        setIdType(value)
    }
    const onSpeciesChange = (value) => {
        setSpecies(value)
    }
    const onSearch = (value) => {
        if (value === ''){
            router.push({
                pathname: `/browser`,
            })
        }else {
            setSearching(true)
            router.push({
                pathname: `${UPLOAD_URL}`,
                query: {
                    idType: idType,
                    species: species,
                    geneName: value
                },
            })
            setSearching(false)
        }
    }
    let title = `${siteTitle}| Data Browser`
    return (
        <LayoutCustom>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body-stw" style={{height:"90vh"}}>
                <div style={
                    {
                        marginTop:"8%",
                        marginBottom:"5%",
                    }
                }>
                    <Space align="center">
                        <span style={
                            {
                                fontSize:"48px",
                                fontWeight:"bold"
                            }
                        }>Gene Browser</span>
                        <Link href={'/help/manual/browser#main_page_help'}>
                            <a target={'_blank'} rel={"noreferrer"}>
                                <QuestionCircleOutlined  style={{fontSize:"20px",color:"#2b1970"}}/>
                            </a>
                        </Link>
                    </Space>
                </div>
                <Input.Group compact>
                    <Select defaultValue="All" style={{width:'10%'}} size={"large"} onChange={onSpeciesChange}>
                        <Option value="All">All</Option>
                        <Option value="Human">Human</Option>
                        <Option value="Mouse">Mouse</Option>
                    </Select>
                    <Select defaultValue="Symbol" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="Symbol">Symbol</Option>
                        <Option value="Ensembl">Ensembl ID</Option>
                        <Option value="Entrez">Entrez ID</Option>
                    </Select>
                    <Search
                        placeholder="input search gene"
                        enterButton="Search"
                        id={"browser"}
                        allowClear
                        onSearch={onSearch}
                        size={"large"}
                        style={{
                            width: "60%",
                            color: '#22075e',
                        }}
                        loading={searching}
                    />
                </Input.Group>
                <div style={{marginTop:50,fontSize:16}}>
                    <span>
                        e.g. <b><Link href={"browser/genePage/ENSG00000154856"}>APCDD1</Link></b> or
                        <b><Link href={"browser/genePage/ENSG00000012048"}> BRCA2</Link></b> or
                        <b><Link href={"browser/genePage/ENSG00000250337"}> ENSG00000250337</Link></b>
                    </span>
                </div>
            </div>
        </LayoutCustom>
    )
}