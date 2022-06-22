import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import Image from "next/image";

export default function Contact() {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <div className="modal-body contact-context">
                <header className="page-header">
                    <h1>About Us</h1>
                    <p>Laboratory of Bioinformatics & Genomic Medicine</p>
                </header>

                <ul className="people" >
                    <li><b>Students: </b>Qi Peng, Xiangshang Li, Jie Zhang, Mingjun Ji, Xiaoge Liu,</li>
                    <li>Ting Li , Chunfu Xiao, Jiaxin Wang, Juntian Qi, Lu Tian, Xinwei Xu</li>
                    <li><b>CoPI/Post-Doc Researcher: </b>Dr. Ni N. An, Dr. Wanqiu Ding, Dr. Qing Yu</li>
                    <li><b>PI:</b> Chuan-Yun Li</li>
                </ul>
                <Image src="/images/CY_Lab_2022.jpg" alt="CY's Lab"  width={900} height={500} />

                <div className="box">
                    <p>We focus on i) systems biology analyses to study the molecular mechanisms underlying MS and CVD in the framework of development, regulation and evolution;
                        ii) refinements of genome annotations through meta-analyses and functional genomics analyses, facilitating better understanding of gene functions and MS/CVD mechanisms in well-established knowledge contexts; and
                        iii) combing population genetics analyses (with-species) and comparative genomics analyses (between-species), performing molecular evolution studies to understand the primate-specific gene-behavior relationships,
                        especially for evolutionary mechanisms for MS/CVD pathological behaviors.
                    </p>
                </div>

                <div className="box_address" >
                    <span><b>Address:</b></span><br/>
                Laboratory of Bioinformatics and Genomic Medicine<br/>
                College of Future Institute<br/>
                Lab Equipment Building 2, Room 315, Peking University<br/>
                Beijing, China
                </div>
            </div>
        </Layout>
    )
}