import {MailOutlined} from "@ant-design/icons";
import React from "react";

export default function FooterCustom(){

    return(
        <div id="footer" className="modal-footer" style={{width:"100%",minWidth:1440,zIndex:1000}}>
            <footer className="h5 small">
                <div style={{margin:30}}>
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
                </div>
            </footer>
        </div>
    )
}