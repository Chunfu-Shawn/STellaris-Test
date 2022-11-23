import {Layout} from 'antd';
import React from "react";
import {SiderMenu} from "../../SiderMenu.js";

const items = [
    {
        label: <a href={'#Preprocessing'}>Preprocessing</a>, key: 'Preprocessing',
    },
    {
        label: <a href={'#Visualization'}>Visualization</a>, key: 'Visualization'
    },
    {
        label: <a href={'#Evaluation'}>Evaluation</a>, key: 'Evaluation'
    },
    {
        label: <a href={'#Colocalization'}>Colocalization</a>, key: 'Colocalization',
    },
    {
        label: <a href={'#Interaction'}>Cell Interactions</a>, key: 'Interaction',
    },
    {
        label: <a href={'#Download'}>Result Download</a>, key: 'Download',
    },

]

export default function ResultPageSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   width={150}
                   openKeys = {[]}
                   divContent={props.divContent}
        />
    )
}