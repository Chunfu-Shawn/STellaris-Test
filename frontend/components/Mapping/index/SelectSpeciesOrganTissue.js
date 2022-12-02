import {Col, Row, Select} from "antd";
const { Option } = Select;


export default function SelectSpeciesOrganTissue(props){
    const {
        speciesOptions,
        organOptions,
        tissueOptions,
        species,
        setSpecies,
        organ,
        setOrgan,
        tissue,
        setTissue,
    } = props
    const handleSpeciesChange = (value) => {
        setSpecies(value)
        setOrgan(organOptions[value][0])
        setTissue(tissueOptions[value][organOptions[value][0]][0])
    };

    const handleOrganChange = (value) => {
        setOrgan(value)
        setTissue(tissueOptions[species][value][0]);
    };

    const handleTissueChange = (value) => {
        setTissue(value);
    };

    return(
        <Row style={{marginBottom:"5%",width:600}} justify="space-between" >
            <Col span={3}>
                <span><b>Species:</b></span>
            </Col>
            <Col span={4}>
                <Select
                    defaultValue={species}
                    style={{
                        width: "100%",
                    }}
                    onChange={handleSpeciesChange}
                >
                    {speciesOptions.map((species) => (
                        <Option key={species}>{species}</Option>
                    ))}
                </Select>
            </Col>
            <Col span={2}>
                <span><b>Organ:</b></span>
            </Col>
            <Col span={5}>
                <Select
                    style={{
                        width: "100%",
                    }}
                    onChange={handleOrganChange}
                    value={organ}
                >
                    {organOptions[species].map((organ) => (
                        <Option key={organ}>{organ}</Option>
                    ))}
                </Select>
            </Col>
            <Col span={2}>
                <span><b>Tissue: </b></span>
            </Col>
            <Col span={6}>
                <Select
                    style={{
                        width: "100%",
                    }}
                    value={tissue}
                    onChange={handleTissueChange}
                >
                    {tissueOptions[species][organ].map((tissue) => (
                        <Option key={tissue}>{tissue}</Option>
                    ))}
                </Select>
            </Col>
        </Row>
    )
}