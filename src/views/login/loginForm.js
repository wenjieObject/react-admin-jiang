import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import './index.scss'
import {withRouter} from 'react-router-dom';

//api
import {login} from '../../api/account'

//组件
import Code from '../../components/code'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
        }
    }


    inputChage=(e)=>{
        let value=e.target.value;
        this.setState({
            username:value
        })
    }



    //登录
    onFinish=()=>{

        this.props.history.push("/index");
        return;
        const logindata = [{
            PASSWORD: "digiwin",
            TYPE: "webadmin",
            USER_NO: "digiwin"
        }];
        login(logindata).then(response => {
            //console.log(response)
            this.props.history.push("/index");
        }).catch(error => {
            //console.log(error)
        });
    }

    switchForm=()=>{
        this.props.switchForm('register')
    }

    render() {
        const {username} =this.state;
        //const _this=this;
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input value={username} onChange={this.inputChage} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <span className="login-form-forgot" >
                        Forgot password
                    </span>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    <Code username={username}/>
          Or <span onClick={this.switchForm}>register now!</span>
                </Form.Item>
            </Form>
        );
    }
}

export default withRouter(LoginForm);