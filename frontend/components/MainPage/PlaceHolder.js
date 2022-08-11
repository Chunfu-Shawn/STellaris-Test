import Link from "next/link.js";
import Image from "next/image";

export default function PlaceHolder(props){
    return(
        <div className="col-xs-6 col-md-4">
            <Link href={props.link}>
                <a className="thumbnail">
                    <Image src={`/images/index/${props.pic}`} alt="..." height={270} width={300} layout={"intrinsic"}/>
                    <div className="caption">
                        <h3>{props.title}</h3>
                        <p>{props.context}</p>
                    </div>
                </a>
            </Link>
        </div>
    )
}