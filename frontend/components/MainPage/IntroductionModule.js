import Link from "next/link.js";
import {Col, Row} from "antd";

export default function IntroductionModule(props){
    return(
        <Row gutter={[20,0]}>
            <Col span={6}>
                <Link href={props.link}>
                    <a>
                        <img className="media-object"
                             src="/images/index/placeholder.png"
                             alt="missing pic"
                             style={{width:"100%",height:"auto"}}
                        />
                    </a>
                </Link>
            </Col>
            <Col span={18}>
                <h3>
                    <Link href={props.link}>
                        <a style={{color:"#1b103f"}}>{props.title}</a>
                    </Link>
                </h3>
                <p style={{color:"gray"}}>{props.context}</p>
            </Col>
        </Row>
    )
}