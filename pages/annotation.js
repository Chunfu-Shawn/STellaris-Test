import Head from 'next/head'
import Layout from '../components/layout'
const title = "STW - Annotation"

export default function Contact() {
    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <div className="modal-body">
                <div className="page-header">
                    <h1>Spatial Annotation</h1>
                </div>
                <div className="panel panel-primary panel-annotation">
                    <form action="/waitpage" method="post" encType="multipart/form-data">
                        <div className="form-group">
                            <div className="form-group"> Job title：<input type="text" id="title" name="title"/></div><br/>
                            <div className="form-group"> matrix file：<input type="file" id="matrix" name="matrix"/></div>
                            <div className="form-group"> Email address: <input className="form-group" type="email" id="email" name="email"/></div>
                            <button type="submit" className="btn btn-upload">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}