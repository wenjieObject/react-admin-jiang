import React, { Component } from 'react';

//antd
import { Menu } from 'antd';
//import { AppstoreOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined, } from '@ant-design/icons';

//router
import { router } from '../../router/index'
//
import {  Link } from 'react-router-dom';


const { SubMenu } = Menu;


class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: []
    }
  }

  //一级菜单

  renderMenu = ({ title, key }) => {
    return (<Menu.Item key={key} >
      <Link to={key}>{title}</Link>
    </Menu.Item>)
  }
  //子级菜单

  renderSubMenu = ({ title, key, child }) => {

    return (
      <SubMenu key={key} title={title}>
        {
          child && child.map(item => {
            return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
          })
        }
      </SubMenu>
    )

  }

  onOpenChange = (openKeys) => {
    //console.log(openKeys)

    if (openKeys.length === 1 || openKeys.length === 0) {
      this.setState({
        openKeys: openKeys
      })
      return
    }

    //二次操作 打开不同的菜单
    const lastOpenKey = openKeys[openKeys.length - 1];

    //如果点击同一个
    if (lastOpenKey.includes(openKeys[0])) {
      this.setState({
        openKeys
      })
    } else {
      this.setState({
        openKeys: [lastOpenKey]
      })
    }
  }


  render() {
    const { openKeys } = this.state;
    return (
      <Menu
        mode="inline"
        theme="dark"
        onOpenChange={this.onOpenChange}
        style={{ height: '100%', paddingTop: '50px' }}
        openKeys={openKeys}
      >
        {
          router && router.map(firstItem => {
            return firstItem.child && firstItem.child.length > 0
              ? this.renderSubMenu(firstItem)
              : this.renderMenu(firstItem)
          })
        }
      </Menu>
    );
  }
}

export default AsideMenu;