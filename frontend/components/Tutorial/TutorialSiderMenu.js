import React from "react";
import {SiderMenu} from "../SiderMenu.js";

const items = [
    {
        label: <a href={'#Overview'}>Overview</a>, key: 'Overview',
    },{
        label: <a href={'#Spatial Mapping'}>Spatial Mapping</a>, key: 'Spatial Mapping',
        children:
            [{
                label: <a href={'#Get started'}>Get started</a>, key: 'Get started',
            }],
    },
    {
        label: <a href={'#Mouse organogenesis'}>Mouse organogenesis</a>, key: 'Mouse organogenesis'
    },
    {
        label: <a href={'#Tumor microenvironment in PDAC'}>Tumor microenv in PDAC</a>, key: 'Tumor microenvironment in PDAC',
    },

]

export default function TutorialSiderMenu(props){

    return(
        <SiderMenu items = {items}
                   width={200}
                   defaultAcitiveNav={"Overview"}
                   openKeys = {["Guide","Spatial Mapping"]}
                   divContent={props.divContent}
        />
    )
}