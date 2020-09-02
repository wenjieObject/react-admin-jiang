import React, { Component, Fragment } from 'react';

//antd
import { Menu } from 'antd';
//router
import { router } from '../../router/index'
//
import { Link,withRouter } from 'react-router-dom';

import { DesktopOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;


class AsideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: [],
      collapsed: false,
       
    }
  }

  componentDidMount(){
    //console.log(this.props.location.pathname)
     
    const pathnames=this.props.location.pathname.split('/').slice(0,3).join('/');
    //console.log(pathnames)
    this.setState({
      openKeys: [pathnames]
    })
  }

  //一级菜单
  renderMenu = ({ title, key }) => {
    return (<Menu.Item key={key} icon={<DesktopOutlined />} >
      <Link to={key}>{title}</Link>
    </Menu.Item>)
  }

  //子级菜单
  renderSubMenu = ({ title, key, child }) => {

    return (
      <SubMenu key={key} title={title} icon={<DesktopOutlined />}>
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
      <Fragment>


        <Menu
          //openKeys={openKeys}
          //selectedKeys={openKeys}
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
      </Fragment>
    );
  }
}

export default withRouter(AsideMenu);