import ResultStatus from "./resultStatus.js";
import {calTime} from "./waitModule.js";
import {Button, Col, Row, Statistic} from "antd";
import dynamic from "next/dynamic";


export default function ResultModule(props){
    const DynamicVisualTool = dynamic(() =>
            import('../../components/VisualTool/VisualTool.js')
                .then((mod) => mod.VisualTool),
        {
            ssr: false,
        })
    return(
        <div className="modal-body-stw" style={{minWidth:"1200px",padding:"15vh 50px",textAlign:"left"}}>
            <div className="page-header">
                <h1>Annotation Result </h1>
            </div>
            <div style={{width:"85%"}}>
                <Row justify="space-around" align="middle">
                    <Col flex={2}>
                        <ResultStatus data={props.data} style={{width: 500,margin: "0px 120px auto"}}
                           usedTime={calTime(props.data.finish_time,props.data.upload_time)}
                        />
                    </Col>
                    <Col flex={3}>
                        <Statistic title="Cell Counts" value={12893} />
                    </Col>
                    <Col flex={3}>
                        <Statistic title="Genes Counts" value={22893} precision={2} />
                        <Button style={{ marginTop: 16 }} type="primary">
                            View More
                        </Button>
                    </Col>
                    <Row>
                        <Statistic title="Prediction Accuracy" value={98} loading />
                    </Row>
                </Row>
            </div>
            <div style={{width:"85%",margin: "70px auto"}}>
                <h2>View</h2>
                <DynamicVisualTool/>
            </div>
        </div>
    )
}