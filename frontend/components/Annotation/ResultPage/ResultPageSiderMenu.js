import {Layout} from 'antd';
import React from "react";
import {SiderMenu} from "../../SiderMenu.js";

const items = [
    {
        label: <a href={'#Summary'}>Summary</a>, key: 'Summary',
    },
    {
        label: <a href={'#Visualization'}>Visualization</a>, key: 'Visualization'
    },
    {
        label: <a href={'#Evaluation'}>Evaluation</a>, key: 'Evaluation'
    },
    {
        label: <a href={'#Co-localization'}>Co-localization</a>, key: 'Co-localization',
    },
    {
        label: <a href={'#Interaction'}>Cells Interaction</a>, key: 'Interaction',
    },
    {
        label: <a href={'#Download'}>Result Download</a>, key: 'Download',
    },

]

export default function ResultPageSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   width={150}
                   openKeys = {["Spatial Expression","Features"]}
                   divContent={props.divContent}
        />
    )
}