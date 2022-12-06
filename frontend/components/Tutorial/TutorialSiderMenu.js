import React from "react";
import {SiderMenu} from "../SiderMenu.js";

const items = [
    {
        label: <a href={'#Information'}>General Information</a>, key: 'Information',
    },
    {
        label: <a href={'#Guide'}>Guide</a>, key: 'Guide'
    },
    {
        label: <a href={'#Spatial Niche'}>Spatial Niche</a>, key: 'Spatial Niche'
    },
    {
        label: <a href={'#Colocalization'}>Colocalization</a>, key: 'Colocalization',
    },
    {
        label: <a href={'#Interaction'}>Interactions</a>, key: 'Interaction',
    },
    {
        label: <a href={'#Download'}>Result Download</a>, key: 'Download',
    },

]

export default function TutorialSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   width={200}
                   openKeys = {[]}
                   divContent={props.divContent}
        />
    )
}