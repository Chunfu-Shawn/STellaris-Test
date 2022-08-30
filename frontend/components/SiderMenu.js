import {Layout, Menu} from 'antd';
import React, {useState,useEffect} from "react";
const { Sider } = Layout;

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
                if (itemReact.y <= 300 && (itemReact.y + itemReact.height) > 300) {
                    //当该子元素距离顶部小于等于300时，说明此时导航栏应该高亮，
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
                defaultOpenKeys={props.openKeys}
                selectedKeys={activeNav}
                mode="inline"
                style={{marginTop:120}}
                items={props.items}
            />
        </Sider>
    )
}