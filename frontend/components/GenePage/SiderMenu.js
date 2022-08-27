import {Layout, Menu} from 'antd';
import React, {useState,useEffect} from "react";
const { Sider } = Layout;

const items = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'Summary'
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
        label: 'Features', key: 'Features',
        children: [
            { label: <a href={'#Genomic Context'}>Genomic Context</a>, key: 'Genomic Context' },
            { label: <a href={'#Transcript'}>Transcript</a>, key: 'Transcript'}
        ],
    },
    {
        label: <a href={'#download'}>Download</a>, key: 'download'
    }
]

export const contentStyle = {
    height:"80vh",
    width:"80vw",
    padding: '15vh 3vw',
    textAlign: 'left'
}

export function SiderMenu(props){
    const [activeNav,setActiveNav] = useState(["Summary"]);//与标识导航栏高亮
    const scrollEventListener = () => {
        //获取导航栏显示内容区域信息
        let nav_contentReact = props.divContent.current.getBoundingClientRect();
        //获取导航栏显示内容区域直接子元素
        let groupList = Array.from(props.divContent.current.children);
        if (nav_contentReact) {
            groupList.map(item => {
                let itemReact = item.getBoundingClientRect();
                if (itemReact.y <= 200 && (itemReact.y + itemReact.height) > 200) {
                    //当该子元素距离顶部小于等于60时，说明此时导航栏应该高亮，
                    //同时在其高度范围内均应高亮。
                    console.log(item.getAttribute("name"))
                    setActiveNav([item.getAttribute("name")])
                }
            })
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', scrollEventListener)
        return ()=>{
            //组件注销时去除监听事件
            document.removeEventListener('scroll', scrollEventListener)
        }
    })
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
                defaultOpenKeys={['Features',"Spatial Expression"]}
                selectedKeys={activeNav}
                mode="inline"
                style={{marginTop:120}}
                items={items}
                />
        </Sider>
    )
}