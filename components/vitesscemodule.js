import React from 'react';
import { Vitessce } from 'vitessce';
import myViewConfig from './vi-config.json';
import 'vitessce/dist/es/production/static/css/index.css';
//import '../static/css/vitessce.module.css';

export default function VitessceDate() {
    return (
        <Vitessce
            config={myViewConfig}
            height={800}
            theme="light"
        />
    );
}