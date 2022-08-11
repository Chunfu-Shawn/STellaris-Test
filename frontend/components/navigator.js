import Link from "next/link";
import Script from "next/script";
import {useEffect} from "react";
import $ from 'jquery';

export default function Navigator(){
    useEffect(()=>{
        function navAction(){
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
        $(function(){
            $(document).ready(function(){
                navAction();
            });
        })
    })
    return(
        <div id = "Navigator">
            <nav id="topheader" className="navbar navbar-inverse navbar-fixed-top" >
                <div className="container">
                    <div>
                        <Link href="/" ><a className="navbar-brand">SPATIAL TRANS WEB</a></Link>
                    </div>
                    <ul className="nav navbar-nav" >
                        <li id="datasets" className="nav-item"><Link href="/datasets" className="nav-link" ><a>Datasets</a></Link></li>
                        <li id="annotation" className="nav-item"><Link href="/annotation" className="nav-link" ><a>Annotation</a></Link></li>
                        <li id="browser" className="nav-item"><Link href="/browser" className="nav-link" ><a>Browser</a></Link></li>
                        <li id="help" className="nav-item"><Link href="/help/projectoverview" className="nav-link" ><a>Help</a></Link></li>
                        <li id="contact" className="nav-item"><Link href="/contact" className="nav-link" ><a>Contact</a></Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}