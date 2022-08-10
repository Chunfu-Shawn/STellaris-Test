import 'vitessce/dist/es/production/static/css/index.css';
import { Vitessce } from 'vitessce';

export default function VitessceWrapper(props){
    let viewConfig = {...props.config}
    viewConfig.datasets[0].files[0].url = props.url
    viewConfig.datasets[0].files[1].url = props.url
    viewConfig.datasets[0].files[2].url = props.url
    return(
        <Vitessce
            config={viewConfig}
            height={props.height}
            theme="dark"
            />
    )

}