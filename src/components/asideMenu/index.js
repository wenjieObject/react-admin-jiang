import React, { Component } from 'react';

//antd
import { Menu, Button } from 'antd';
import {AppstoreOutlined,PieChartOutlined,DesktopOutlined,ContainerOutlined,MailOutlined,} from '@ant-design/icons';

//router
import {router} from '../../router/index'

const { SubMenu } = Menu;


class AsideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            collapsed:false
        }
        console.log(router)
    }

    foreachRouter=()=>{
        router.map((item, key) => {
            if(item.child && item.child.length>0){

            }else{

            }
        })
    }

    buildFirstMenu=({title,icon,key})=>{
        return (
            <Menu.Item key={key} icon={<PieChartOutlined />}>
              {title}
            </Menu.Item>
        )

    }

    buildChildMenu=({title,icon,key,child})=>{
        return (
            <SubMenu key={key} icon={<MailOutlined />} title={title}>
              {this.buildFirstMenu}
            </SubMenu>
        )
    }


    toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

    render() { 
        return ( 
            <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            //collapsed={this.state.collapsed}
          >
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item key="3" icon={<ContainerOutlined />}>
              Option 3
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
              <Menu.Item key="9">Option 9</Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <SubMenu key="sub3" title="Submenu">
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
         );
    }
}
 
export default AsideMenu;