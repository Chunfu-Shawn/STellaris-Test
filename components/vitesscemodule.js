import React, { Suspense } from 'react';
const Vitessce = React.lazy(() => import('./VitessceWrapper'));
import myViewConfig from './vi-config.json';
import 'vitessce/dist/es/production/static/css/index.css';

export default function VitessceVisualization(props) {
    const { config } = props;
    const height = 800
    const LoadingModule = function (){
        return(
            <div style={{paddingTop:"50px"}} ><h5>Loading...</h5></div>
        )
    }
    return (
        <div className="panel-visual" style={{height:height+10+"px"}}>
            <Suspense fallback={<LoadingModule/>}>
                <Vitessce
                    config={myViewConfig}
                    height={height}
                    theme="dark"
                />
            </Suspense>
        </div>
    )
}