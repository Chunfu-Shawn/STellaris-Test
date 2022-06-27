import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout.js'
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';


export default function Annotation() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <Layout>
            <Head>
                <title>{siteTitle +'- Annotation'}</title>
            </Head>
            <div className="modal-body-stw">
                <div className="page-header">
                    <h1>Spatial Annotation</h1>
                </div>
                <div className="panel panel-primary panel-annotation">
                    <form action="/annotations/upload" method="post" encType="multipart/form-data">
                        <div className="form-group">
                            <div className="form-group"> Job title：
                                <input placeholder='Enter task name' type="text" name="title" id="title" required={true} {...register("title",{required:true,maxLength:20})}/>{errors.title && <p style={{color:"red"}}>Please input your task name that no more than 10 words </p>}
                            </div>
                            <div className="form-group"> matrix file：
                                <input type="file" id="matrix" name="matrix" required={true}/>
                            </div>
                            <div className="form-group"> Email address:
                                <input placeholder='Enter email' type="email" name="email" required={true} {...register("email",{required:true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}/>
                                {errors.email && <p style={{color:"red"}}>Please input your correct email</p>}
                            </div>
                            <button type="submit" className="btn btn-upload">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}