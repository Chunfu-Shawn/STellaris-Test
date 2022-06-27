import Link from "next/link.js";

export default function IntroductionModule(props){
    return(
        <div className={"row"} style={{margin:"20px 0px"}}>
            <div className="media-left">
                <Link href="#">
                    <a>
                    <img className="media-object" src="/images/placeholder.png" alt="missing pic"/>
                    </a>
                </Link>
            </div>
            <div className="media-body">
                <h3 className="media-heading  media-left">{props.title}</h3>
                <br/>
                <p>{props.context}</p>
            </div>
        </div>
    )
}