import Link from "next/link.js";
import {Col, Row} from "antd";
import Image from "next/image";

export default function IntroductionModule(props){
    return(
        <Row gutter={[20,0]}>
            <Col span={6}>
                <Link href={props.link}>
                    <a>
                        <Image className="media-object"
                             src="/images/index/placeholder.png"
                             alt="missing pic"
                             width={242} height={200}
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