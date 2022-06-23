import Link from "next/link.js";

export default function PlaceHolder(props){
    return(
        <div className="col-xs-6 col-md-4">
            <Link href={props.link}>
                <a className="thumbnail">
                    <img src="static/images/placeholder.png" alt="..."/>
                    <div className="caption">
                        <h3>{props.title}</h3>
                        <p>{props.context}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}