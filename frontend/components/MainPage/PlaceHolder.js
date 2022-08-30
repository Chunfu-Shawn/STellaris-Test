import Link from "next/link.js";
import {Col} from "antd";

export default function PlaceHolder(props){
    return(
        <Col span={8}>
            <Link href={props.link}>
                <a className="thumbnail">
                    <img src={`/images/index/${props.pic}`} alt="..." style={{width:"100%",height:"auto"}}/>
                    <div className="caption">
                        <h3>{props.title}</h3>
                        <p>{props.context}</p>
                    </div>
                </a>
            </Link>
        </Col>
    )
}