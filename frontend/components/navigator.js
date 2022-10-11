import Link from "next/link";
import {useEffect, useState} from "react";
import {Button, Dropdown, Menu} from "antd";
import {MenuOutlined} from "@ant-design/icons";
const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <Link href="/datasets" className="nav-link" ><a>Datasets</a></Link>
                ),
            },
            {
                key: '2',
                label: (
                    <Link href="/annotation" className="nav-link" ><a>Annotation</a></Link>
                ),
            },
            {
                key: '3',
                label: (
                    <Link href="/browser" className="nav-link" ><a>Browser</a></Link>
                ),
            },
            {
                key: '4',
                label: (
                    <Link href="/help" className="nav-link" ><a>Help</a></Link>
                ),
            },
            {
                key: '5',
                label: (
                    <Link href="/contact" className="nav-link" ><a>Contact</a></Link>
                ),
            },
        ]}
    />
);

const useViewport = () => {
    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1000);
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return { width };
}

export default function Navigator(){
    const collapseButtom =
        <Dropdown overlay={menu} placement="bottom" >
            <Button
                type={'primary'}
                size={'large'}
                icon={<MenuOutlined />}
                style={{margin:"24px 10px",float:"right"}}
            ></Button>
        </Dropdown>

    const navAction = ()=>{
        let url = document.location;
        let navUl = document.querySelector("nav ul");
        let navUlChildren = navUl.children;
        for (let i = 0; i < navUlChildren.length; i++)
        {
            if(String(url).split('/')[3] === navUlChildren[i].id){
                navUlChildren[i].className = "active";
            }else
                delete navUlChildren[i].className;
        }
    }
    /*
    useEffect(()=>{
        if (width >= breakpoint) navAction();
    })
     */

    //const { width } = useViewport();
    const breakpoint = 992;

    return(
        <nav id="topheader" className="navbar-inverse navbar-fixed-top">
            <div className="container">
                <div>
                    <Link href="/" ><a className="navbar-brand">SPATIAL TRANS WEB</a></Link>
                </div>
                {
                    //width < breakpoint ? collapseButtom:
                    <ul className={"nav navbar-nav"} >
                        <li id="datasets" className="nav-item"><Link href="/datasets" className="nav-link" ><a>Datasets</a></Link></li>
                        <li id="annotation" className="nav-item"><Link href="/annotation" className="nav-link" ><a>Annotation</a></Link></li>
                        <li id="browser" className="nav-item"><Link href="/browser" className="nav-link" ><a>Browser</a></Link></li>
                        <li id="help" className="nav-item"><Link href="/help" className="nav-link" ><a>Help</a></Link></li>
                        <li id="contact" className="nav-item"><Link href="/contact" className="nav-link" ><a>Contact</a></Link></li>
                    </ul>
                }
            </div>
        </nav>
    )
}