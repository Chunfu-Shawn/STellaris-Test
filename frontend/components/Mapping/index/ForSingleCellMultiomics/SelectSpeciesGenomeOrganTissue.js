import {Col, Row, Select} from "antd";
const { Option } = Select;


export default function SelectSpeciesGenomeOrganTissue(props){
    const {
        speciesOptions,
        organOptions,
        tissueOptions,
        genomeOptions,
        species,
        setSpecies,
        genome,
        setGenome,
        organ,
        setOrgan,
        tissue,
        setTissue,
    } = props

    const handleSpeciesChange = (value) => {
        setSpecies(value)
        setGenome(genomeOptions[value][0]);
        setOrgan(organOptions[value][0])
        setTissue(tissueOptions[value][organOptions[value][0]][0])
    };

    const handleGenomeChange = (value) => {
        setGenome(value);
    };

    const handleOrganChange = (value) => {
        setOrgan(value)
        setTissue(tissueOptions[species][value][0]);
    };

    const handleTissueChange = (value) => {
        setTissue(value);
    };

    return(
        <Row style={{marginBottom:"5%",width:600}} gutter={[10,10]} justify="space-between" >
            <Col span={5}>
                <span><b>Species:</b></span>
            </Col>
            <Col span={7}>
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
            <Col span={5}>
                <span><b>Genome:</b></span>
            </Col>
            <Col span={7}>
                <Select
                    style={{
                        width: "100%",
                    }}
                    onChange={handleGenomeChange}
                    value={genome}
                >
                    {genomeOptions[species].map((genome) => (
                        <Option key={genome}>{genome}</Option>
                    ))}
                </Select>
            </Col>
            <Col span={5}>
                <span><b>Organ:</b></span>
            </Col>
            <Col span={7}>
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
            <Col span={5}>
                <span><b>Tissue: </b></span>
            </Col>
            <Col span={7}>
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