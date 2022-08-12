import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Input, Select} from 'antd';
const { Search } = Input;
const { Option } = Select;

export default function SearchPage() {
    const onSearch = (value) => alert(value);
    let title = `${siteTitle}| Browse Data`
    return (
        <LayoutCustom>
            <Head>
                <title>{title}</title>
            </Head>

            <div className="modal-body-stw" style={{height:"90vh"}}>
                <header className="page-header">
                    <h1>Browser</h1>
                </header>
                <Input.Group compact>
                    <Select defaultValue="Datasets" style={{width:'10%'}} size={"large"}>
                        <Option value="Datasets">Datasets</Option>
                        <Option value="Gene">Gene</Option>
                        <Option value="Organ">Organ</Option>
                        <Option value="Tissue">Tissue</Option>
                    </Select>
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        allowClear
                        onSearch={onSearch}
                        size={"large"}
                        style={{
                            width: "60%",
                            color: '#22075e'
                        }}
                    />
                </Input.Group>
            </div>
        </LayoutCustom>
    )
}