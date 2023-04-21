import React from "react";
import {Layout, Menu} from "antd";
import Link from "next/link.js";
const { Sider } = Layout;

const items = [
    {
        label: <Link href={'/tutorial'}>Overview</Link>, key: 'Overview',
    },{
        label: "Spatial Mapping", key: 'Spatial Mapping',
        children:
            [
                {
                    label: <Link href={'/tutorial/mapping/getStarted'}><a>Get started</a></Link>, key: 'Get started'
                },
                {
                    label: 'Result interpretation', key: 'Result interpretation', type:'group',
                    children:[
                        {
                            label: <Link href={'/tutorial/mapping/mouseBrain'}><a>Mouse fetal brain</a></Link>, key: 'MouseFetalBrain',
                        },
                        {
                            label: <Link href={'/tutorial/mapping/humanSCC'}><a>Human SCC</a></Link>, key: 'HumanSCC',
                        },
                        {
                            label: <Link href={'/tutorial/mapping/multiomics'}><a>H3K4me3 modification</a></Link>, key: 'Multiomics',
                        }
                    ]
                }
            ],
    },
    {
        label: <Link href={'/tutorial/datasets'}><a>Dataset Browser</a></Link>, key: 'Dataset Browser'
    },
    {
        label: <Link href={'/tutorial/gene'}><a>Gene Search</a></Link>, key: 'Gene Search',
    },

]

export default function TutorialSiderMenu(props){

    return(
        <Sider  style={{backgroundColor:"transparent"}}>
            <Menu
                mode="inline"
                defaultSelectedKeys={[props.selected]}
                defaultOpenKeys={props.opened}
                style={{ marginTop:84 }}
                items={ items }
            />
        </Sider>
    )
}