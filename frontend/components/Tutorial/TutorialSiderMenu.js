import React from "react";
import {SiderMenu} from "../SiderMenu.js";

const items = [
    {
        label: <a href={'#Overview'}>Overview</a>, key: 'Overview',
    },{
        label: <a href={'#Spatial Mapping'}>Spatial Mapping</a>, key: 'Spatial Mapping',
        children:
            [
                {
                    label: <a href={'#Get started'}>Get started</a>, key: 'Get started',
                },
                {
                    label: <a href={'#Result interpretation'}>Result interpretation</a>, key: 'Result interpretation',
                },
                {
                    label: <a href={'#MutiOmics'}>Expanded application</a>, key: 'MutiOmics',
                }
            ],
    },
    {
        label: <a href={'#Dataset Browser'}>Dataset Browser</a>, key: 'Dataset Browser'
    },
    {
        label: <a href={'#Gene Search'}>Gene Search</a>, key: 'Gene Search',
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