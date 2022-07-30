import {Col, Row, Select} from "antd";
const { Option } = Select;


export default function SelectOrganTissue(props){

    const handleOrganChange = (value) => {
        props.setOrgan(value)
        props.setTissues(props.tissueOptions[value]);
        props.setSecondTissue(props.tissueOptions[value][0]);
    };

    const onSecondTissueChange = (value) => {
        props.setSecondTissue(value);
    };

    return(
        <Row style={{marginBottom:"5%"}}>
            <Col span={5}>
                <span><b>organ:</b></span>
            </Col>
            <Col span={5}>
                <Select
                    defaultValue={props.organOptions[0]}
                    style={{
                        width: '12vw',
                    }}
                    onChange={handleOrganChange}
                >
                    {props.organOptions.map((organ) => (
                        <Option key={organ}>{organ}</Option>
                    ))}
                </Select>
            </Col>
            <Col span={5}>
                <span><b>tissue: </b></span>
            </Col>
            <Col span={5}>
                <Select
                    style={{
                        width: '12vw',
                    }}
                    value={props.secondTissue}
                    onChange={onSecondTissueChange}
                >
                    {props.tissues.map((tissue) => (
                        <Option key={tissue}>{tissue}</Option>
                    ))}
                </Select>
            </Col>
        </Row>
    )
}