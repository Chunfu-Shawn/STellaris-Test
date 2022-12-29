import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../../components/LayoutCustom.js'
import {Col, Input, Row, Select} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import SearchResultsTable from "../../components/Search/SearchResultsTable.js";
const { Search } = Input;
const { Option } = Select;

export async function getServerSideProps(context) {
    // if geneName is not provided, return 404 Page
    if ( typeof context.query.geneName === 'undefined' || !context.query.geneName ||
        typeof context.query.species === 'undefined' ||
        !( context.query.species === "All" || context.query.species === "Human" || context.query.species === "Mouse") ||
        typeof context.query.idType === 'undefined' ||
        !( context.query.idType === "Symbol" || context.query.idType === "Ensembl" || context.query.idType === "Entrez")
    )
        {
            return {
                redirect: {
                    destination: '/search',
                    permanent: false,
                }
            }
        }
    let idType = ""
    if (context.query.idType === "Symbol") idType = "symbol"
    else if(context.query.idType === "Ensembl") idType = "ensembl_id"
    else if(context.query.idType === "Entrez") idType = "entrez_id"
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3000")
        +"/api/genelist/"+
        context.query.species + '/' +
        context.query.idType + '/' +
        context.query.geneName
    )
    const data = await res.json()
    // The exact results always present firstly
    const data_processed = []
    data.forEach((item)=>{
        if(item[idType].toUpperCase() === context.query.geneName.toUpperCase()){
            data_processed.unshift(item)
        }else data_processed.push(item)
    })

    // Pass post data to the page via props
    return {
        props: {
            searchName:context.query.geneName,
            idType: context.query.idType,
            species: context.query.species,
            data:data_processed.map(data => {
                return { key:data.ensembl_id, ...data }
            }),
        }
    }
}

export default function Results(props) {
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('Symbol');
    const [species, setSpecies] = useState('All');
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
                pathname: `/search`,
            })
        }else {
            setSearching(true)
            router.push({
                pathname: `/search/results`,
                query: {
                    idType: idType,
                    species: species,
                    geneName: value
                },
            })
            setSearching(false)
        }
    }
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Gene Search"}</title>
            </Head>
            <div className="modal-body-stw" style={{padding:"150px 30px",textAlign:"left"}}>
                <Row>
                    <Col xs={0} md={0} lg={4}>
                        <div style={
                            {
                                fontSize:"26px",
                            }
                        }>
                            Gene List
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={20}>
                        <Input.Group compact>
                            <Select defaultValue={props.species} style={{width:110}} size={"large"} onChange={onSpeciesChange}>
                                <Option value="All">All</Option>
                                <Option value="Human">Human</Option>
                                <Option value="Mouse">Mouse</Option>
                            </Select>
                            <Select defaultValue={props.idType} style={{width:150}} size={"large"} onChange={onIDTypeChange}>
                                <Option value="Symbol">Symbol</Option>
                                <Option value="Ensembl">Ensembl ID</Option>
                                <Option value="Entrez">Entrez ID</Option>
                            </Select>
                            <Search
                                placeholder={props.searchName}
                                defaultValue={props.searchName}
                                id={"search"}
                                allowClear
                                onSearch={onSearch}
                                size={"large"}
                                style={{
                                    width: 850,
                                    color: '#22075e',
                                }}
                                loading={searching}
                            />
                        </Input.Group>
                    </Col>
                </Row>
                <div>
                    <SearchResultsTable data={props.data} />
                </div>
            </div>
        </LayoutCustom>
    )
}