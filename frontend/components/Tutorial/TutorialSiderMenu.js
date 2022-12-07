import React from "react";
import {SiderMenu} from "../SiderMenu.js";

const items = [
    {
        label: <a href={'#Information'}>General Information</a>, key: 'Information',
    },
    {
        label: <a href={'#Guide'}>Guide for mapping</a>, key: 'Guide',
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
                   defaultAcitiveNav={"Information"}
                   openKeys = {["Guide"]}
                   divContent={props.divContent}
        />
    )
}