import {Layout, Menu} from 'antd';
import React from "react";
const { Sider } = Layout;

const items = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'project' },
    {
        label: 'Features', key: 'Features',
        children: [
            { label: <a href={'#Genomic Context'}>Genomic Context</a>, key: 'Genomic Context' },
            { label: <a href={'#Transcript'}>Transcript</a>, key: 'Transcript'}
        ],
    },
    {
        label: 'Spatial Expression', key: 'Spatial Expression',
        children: [
            { label: <a href={'#RSE'}>RSE</a>, key: 'RSE' },
            { label: <a href={'#CoE-Genes'}>CoE-Genes</a>, key: 'CoE-Genes'},
            { label: <a href={'#HighlyE-Clusters'}>HighlyE-Clusters</a>, key: 'HighlyE-Clusters'}
        ],
    },
    {
        label: <a href={'#api'}>API</a>, key: 'api'
    }
]

export const contentStyle = {
    height:"80vh",
    width:"80vw",
    padding: '15vh 3vw',
    textAlign: 'left'
}

export function SiderMenu(props){

    const updateActiveState = () => {
        let {topSpaceHeight, navs} = this.props;
        let doms = navs
            .map(nav => document.getElementById(nav.id))
            .filter(item => !!item);
        let activeId = '';

        if (!doms.length) {
            return;
        }

        for (let i = 0, len = doms.length; i < len; i++) {
            let domRect = doms[i].getBoundingClientRect();
            let nextDom = doms[i + 1];

            if (domRect.top < topSpaceHeight) {
                if (
                    (nextDom && nextDom.getBoundingClientRect().top > topSpaceHeight) ||
                    (!nextDom && domRect.bottom > 0)
                ) {
                    activeId = navs[i].id;
                    break;
                }
            }
        }
    }
    return(
        <Sider
            style={
            {
                backgroundColor:"transparent",
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0
            }
        }
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={[props.selected]}
                defaultOpenKeys={["Features","Spatial Expression"]}
                style={{ marginTop:"120px"}}
                items={ items }
            />
        </Sider>
    )
}