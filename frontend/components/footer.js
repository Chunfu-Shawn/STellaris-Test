import {MailOutlined} from "@ant-design/icons";
import React, {useEffect, useRef} from "react";
import {Col, Row} from "antd";
import $ from "jquery";

export default function FooterCustom(){
    const mapref = useRef(null)
    useEffect(()=>{
        const script = document.createElement('script')
        const footer = document.getElementsByTagName('footer')[0]
        const div = footer.childNodes[0].childNodes[0];
        script.type = "text/javascript"
        script.id = "clustrmaps"
        script.src = '//cdn.clustrmaps.com/map_v2.js?cl=7c7c7c&w=240&t=tt&d=qS4jz1-x7Tq1AwMDK69clxIemcUWOM4uBrMhsah2v6Q&co=212121&ct=a5a5a5&cmo=c4c4c4&cmn=4a2f87'
        div.appendChild(script)
    },[])
    return(
        <div id="footer" className="modal-footer" style={{width:"100%",minWidth:1440,zIndex:1000}}>
            <footer className="h5 small">
                <Row justify="center">
                    <Col>
                    </Col>
                    <Col style={{textAlign:"left",margin:30}}>
                        <p>Copyright &copy; 2021-{String(new Date().getFullYear())} |
                            <a href="https://future.pku.edu.cn/" target="_blank" rel="noreferrer"> College of Future Technology (CFT), </a>
                            <a href="https://english.pku.edu.cn" target="_blank" rel="noreferrer"> Peking University</a>
                        </p>
                        <p>
                            All Rights Reserved | E-mail:<span> </span>
                            <a target="_blank"  href="mailto:xiaochunfu@stu.pku.edu.cn" rel="noreferrer">
                                <MailOutlined />
                            </a>
                        </p>
                        <p><a href="https://beian.miit.gov.cn/integrated/recordquery#/Integrated/recordQuery" target="_blank" id="beian" rel="noreferrer">
                            苏ICP备2021011214号-1</a></p>
                    </Col>
                </Row>
            </footer>
        </div>
    )
}