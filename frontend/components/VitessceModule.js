import React, {Suspense} from 'react';
import { LoadingOutlined,SelectOutlined } from '@ant-design/icons';

const VitessceWrapper = React.lazy(() => import('./Datasets/DataPage/VitessceWrapper.js'));


export default function VitessceModule(props) {
    return (
        <>
            <div className="panel-visual" style={{height:props.height+2+"px"}}>
                <Suspense fallback={
                    <LoadingOutlined spin={true} style={{marginTop:"20%",fontSize:"30px"}}/>
                }
                >
                    <VitessceWrapper
                        config={props.viewConfig}
                        height={props.height}
                        theme="dark"
                    />
                </Suspense>
            </div>
            <p style={{float:'right',color:"gray"}}>Powered by <a target={"__blank"} href={"https://vitessce.io/"}>Vitessce <SelectOutlined /></a></p>
        </>
    )
}