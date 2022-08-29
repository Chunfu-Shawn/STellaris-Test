import ResultStatus from "./resultStatus.js";
import {calTime} from "./waitModule.js";
import VitessceVisual from "../Datasets/DataPage/VitessceModule.js";
import {Button, Col, Row, Statistic} from "antd";


export default function ResultModule(props){

    return(
        <div className="modal-body-stw" >
            <div className="page-header">
                <h1>Annotation Result: </h1>
            </div>
            <div style={{width:"85%"}}>
                <Row justify="space-around" align="middle">
                    <Col flex={2}>
                        <ResultStatus data={props.data} style={{width: "60vh",margin: "0px 120px auto"}}
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
                <h2>View</h2><br/>
                <VitessceVisual></VitessceVisual>
            </div>
        </div>
    )
}