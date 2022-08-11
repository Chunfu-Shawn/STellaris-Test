import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Input} from 'antd';
const { Search } = Input;

export default function SearchPage() {
    const onSearch = (value) => alert(value);
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle + "| Search"}</title>
            </Head>

            <div className="modal-body-stw" style={{height:"90vh"}}>
                <header className="page-header">
                    <h1>Browser</h1>
                </header>
                <Search placeholder="input search text" enterButton="Search" onSearch={onSearch}
                         style={{
                            width: "50%",
                            color: '#22075e'
                        }}
                />
            </div>
        </LayoutCustom>
    )
}