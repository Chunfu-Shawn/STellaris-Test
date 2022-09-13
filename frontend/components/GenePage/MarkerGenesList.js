import {List} from "antd";

export default function MarkerGenesList(props){
    return(
        <div style={{width:"200px"}}>
            <div>Marker Genes of <b>{props.cluster.toUpperCase()}</b>:<br/>Cluster Proportion: 40%</div>
            <List
                size="small"
                bordered
                dataSource={props.genes}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                style={{overflow: "scroll",height: 200}}
            />
        </div>
    )
}