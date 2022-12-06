import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import Image from "next/image";
import { Avatar, List, Divider } from 'antd';
import React from "react";
import {MailFilled} from "@ant-design/icons";


export default function Contact() {
    const data = [
        {
            name: 'Xiangshang Li',
            avatar: "https://joeschmoe.io/api/v1/jean",
            description: "uplee@pku.edu.cn"
        },
        {
            name: 'Chunfu Xiao',
            avatar: "https://joeschmoe.io/api/v1/josh",
            description: "xiaochunfu@stu.pku.edu.cn;  https://github.com/Chunfu-Shawn"
        },
        {
            name: 'Juntian Qi',
            avatar: "https://joeschmoe.io/api/v1/james",
            description: "juntian_qi@stu.pku.edu.cn"
        }
    ];

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Contact"}</title>
            </Head>
            <div className="modal-body-stw">
                <header className="page-header">
                    <h1>About Us</h1>
                </header>
                <div style={{width:1000,margin:"50px auto"}}>
                    <p style={{fontSize:16}}><b>Department: </b>Laboratory of Bioinformatics & Genomic Medicine, College of Future Technology, Peking University</p>
                    <p style={{fontSize:16}}><b>Address: </b>Room 315, Integrated Science Research Center No.2, Peking University, Beijing, China.</p>
                    <p style={{fontSize:16}}><b>Research: </b>Bioinformatics, Genomic Medicine, Comparative Genomics. </p>
                </div>

                <Image src="/images/CY_Lab_2022.jpg" alt="CY's Lab"  width={900} height={500}/>

                <ul className="people" style={{fontSize:16}}>
                    <li><b>Students: </b>Qi Peng, Xiangshang Li, Jie Zhang, Mingjun Ji, Xiaoge Liu, Ting Li,</li>
                    <li>Chunfu Xiao, Jiaxin Wang, Juntian Qi, Lu Tian, Xinwei Xu, Chunqiong Li, Shuhan Yang</li>
                    <li><b>CoPI/Post-Doc Researcher: </b>Dr. Ni N. An, Dr. Wanqiu Ding</li>
                    <li><b>PI:</b> Chuan-Yun Li</li>
                </ul>

                <div className="box" style={{width:900,fontSize:16,margin:"60px auto"}}>
                    <p>Our team is dedicated to the interpretations of large-scale genomics data and the studies of
                        human-specific traits. We mainly focus on i) refinements of genome annotations, integrations of
                        large-scale data and development of bioinformatics tools through meta-analyses and functional
                        genomics analyses, facilitating better understanding of gene functions and regulations in
                        well-established knowledge contexts; ii) combing population genetics analyses (with-species) and
                        comparative genomics analyses (between-species), performing molecular evolution studies to
                        understand the primate-specific gene-behavior relationships, especially for researches on
                        human-specific traits.
                    </p>
                </div>
                <Divider><h2>Development Team</h2></Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    size={"large"}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar shape="square" size={"large"} src={item.avatar} />}
                                title={<b>{item.name}</b>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                    style={{width:700, textAlign:"left",margin:"auto",marginBottom:50}}
                />
                <Divider><h2>Feedback</h2></Divider>
                <h4>Please feel free to contact us with any questions or comments.</h4>
                <span style={{fontSize:16}}>
                    <br/>
                    For datasets and webserver functions,
                    <br/>email to <b>Xiangshang Li</b>&nbsp;
                    <a target="_blank"  href="mailto:uplee@pku.edu.cn" rel="noreferrer">
                        <MailFilled />
                    </a> and <b>Juntian Qi</b>&nbsp;
                    <a target="_blank"  href="mailto:juntian_qi@stu.pku.edu.cn" rel="noreferrer">
                        <MailFilled />
                    </a>.
                    <br/><br/>
                    For bug report,
                    <br/>email to <b>Chunfu Xiao</b>&nbsp;
                    <a target="_blank"  href="mailto:xiaochunfu@stu.pku.edu.cn" rel="noreferrer">
                        <MailFilled />
                    </a>.
                    <br/><br/>
                    For updates and suggestions, email to correspondences:
                    <br/>
                    <b>Wanqiu Ding:&nbsp;&nbsp;
                        <a target="_blank"  href="mailto:dingwq@pku.edu.cn" rel="noreferrer">
                            <MailFilled /> dingwq@pku.edu.cn
                        </a>
                    </b>
                    <br/>
                    <b>Chuan-Yun Li:&nbsp;&nbsp;
                        <a target="_blank"  href="mailto:chuanyunli@pku.edu.cn" rel="noreferrer">
                            <MailFilled /> chuanyunli@pku.edu.cn
                        </a>
                    </b>
                </span>
            </div>
        </LayoutCustom>
    )
}