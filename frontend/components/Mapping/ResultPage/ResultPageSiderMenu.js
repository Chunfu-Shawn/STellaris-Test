import React from "react";
import {SiderMenu} from "../../SiderMenu.js";

const items = [
    {
        label: <a href={'#Preprocessing'}>Preprocessing</a>, key: 'Preprocessing',
    },
    {
        label: <a href={'#Filtering'}>Filtering</a>, key: 'Filtering'
    },
    {
        label: <a href={'#Spatial'}>Spatial Map</a>, key: 'Spatial'
    },
    {
        label: <a href={'#Colocalization'}>Colocalization</a>, key: 'Colocalization',
    },
    {
        label: <a href={'#Interaction'}>Interactions</a>, key: 'Interaction',
    },
    {
        label: <a href={'#Download'}>Results Download</a>, key: 'Download',
    },

]

export default function ResultPageSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   width={150}
                   openKeys = {[]}
                   defaultAcitiveNav={"Preprocessing"}
                   divContent={props.divContent}
        />
    )
}