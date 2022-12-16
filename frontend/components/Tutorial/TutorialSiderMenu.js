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
                    label: <Link href={'/tutorial/mapping/getStarted'}>Get started</Link>, key: 'Get started',
                },
                {
                    label: <Link href={'/tutorial/mapping/result'}>Result interpretation</Link>, key: 'Result interpretation',
                },
                {
                    label: <Link href={'/tutorial/mapping/exApp'}>Expanded application</Link>, key: 'MutiOmics',
                }
            ],
    },
    {
        label: <Link href={'/tutorial/datasets'}>Dataset Browser</Link>, key: 'Dataset Browser'
    },
    {
        label: <Link href={'/tutorial/gene'}>Gene Search</Link>, key: 'Gene Search',
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