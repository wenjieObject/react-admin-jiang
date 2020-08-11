import React, { Component } from 'react';

//css
import './layout.scss'
//antd
import {Layout} from 'antd';

//自定义组件
import AsideMenu from '../../components/asideMenu/index'

const {Sider,Header,Content}=Layout;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <Layout className="layout-wrap">
                <Sider width='250px'>
                    <AsideMenu></AsideMenu>
                </Sider>
                <Layout>
                    <Header className='layout-header'>Header</Header>
                    <Content className='layout-main'>Content</Content>
                </Layout>
            </Layout>
        );
    }
}
 
export default Index;