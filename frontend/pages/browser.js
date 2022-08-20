import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Input, message, Select} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
const { Search } = Input;
const { Option } = Select;

export default function Browser() {
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('HGNC');
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
    let title = `${siteTitle}| Browse Data`
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
                        fontSize:"48px",
                        fontWeight:"bold"
                    }
                }>
                    Browse Gene
                </div>
                <Input.Group compact>
                    <Select defaultValue="All" style={{width:'10%'}} size={"large"} onChange={onSpeciesChange}>
                        <Option value="All">All</Option>
                        <Option value="Human">Human</Option>
                        <Option value="Mouse">Mouse</Option>
                    </Select>
                    <Select defaultValue="HGNC" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="HGNC">HGNC Symbol</Option>
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
            </div>
        </LayoutCustom>
    )
}