import React, { Component } from 'react';

//css
import './layout.scss'
//antd
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

//自定义组件
import AsideMenu from '@/components/asideMenu/index'

import ContainMain from '../../components/containMain/index'

const { Sider, Header, Content } = Layout;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        }
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout className="layout-wrap">
                <Sider collapsed={this.state.collapsed} collapsible trigger={null}> 
                    <AsideMenu></AsideMenu>
                </Sider>
                <Layout>
                    <Header className="layout-header" style={{ background: '#fff', padding: 0 }}>
                        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginLeft:'1px'}}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                        </Button>
                    </Header>
                    <Content  style={{ margin: '10px 10px', padding: 10, background: '#fff', minHeight: 280 }}>
                        <ContainMain></ContainMain>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Index;