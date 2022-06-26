import Link from "next/link";
import Script from "next/script";

function Navigator(){
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
                        <li id="help" className="nav-item"><Link href="/help" className="nav-link" ><a>Help</a></Link></li>
                        <li id="contact" className="nav-item"><Link href="/contact" className="nav-link" ><a>Contact</a></Link></li>
                    </ul>
                </div>
            </nav>
            <Script id="dynamically" strategy="lazyOnload">
            </Script>
        </div>
    )
}

export default Navigator