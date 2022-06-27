import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout.js'
import {Input} from 'antd';
const { Search } = Input;

export default function SearchPage() {
    const onSearch = (value) => alert(value);
    return (
        <Layout>
            <Head>
                <title>{siteTitle + "- Search"}</title>
            </Head>

            <div className="modal-body-stw">
                <header className="page-header">
                    <h1>Search</h1>
                </header>
                <Search placeholder="input search text" enterButton="Search" onSearch={onSearch}
                        style={{
                            width: "30%"
                        }}
                />
            </div>
        </Layout>
    )
}