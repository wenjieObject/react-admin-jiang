import React, { Component } from 'react';
import { Form, Input, Button, Checkbox,message } from 'antd';
import { UserOutlined, LockOutlined,PoweroffOutlined  } from '@ant-design/icons';
import './index.scss'
//api
import {login,getCode} from '../../api/account'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            code_loading:false,
            code_text:'获取验证码',
            code_disable:false

        }
    }

    //倒计时
    countDown=()=>{
        //setInterval \ clearInterval 不间断定时器
        //setTimeout \ clearTimeout 只执行一次
        let timer=null
        let sec=60
        this.setState({
            code_loading:false,
            code_text:`${sec}s`,
            code_disable:true
        })

        timer=setInterval(() => {
            sec--
            if(sec<=0){
                this.setState({
                    code_text:'重新获取',
                    code_disable:false
                })
                clearInterval(timer)
                return false
            }
            this.setState({
                code_text:`${sec}s`
            })
            
        }, 1000);

    }

    inputChage=(e)=>{
        let value=e.target.value;
        this.setState({
            username:value
        })
    }

    //获取验证码
    getCode=()=>{

        if(!this.state.username){
            message.warning('请输入用户名');
            return
        }
        this.countDown();
        console.log(this.state.username)
        const codeData = {
            tableName:'TAM_TOOLS_TYPE',
            conditions:[],
            pagination:{
                pageIndex:1,
                pageSize:10
            }
        };

        getCode(codeData).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        }).finally(e=>{
            this.setState({
                code_loading:false,
                code_text:'重新获取'
            })
        });
    }

    //登录
    onFinish=()=>{

        const logindata = [{
            PASSWORD: "digiwin",
            TYPE: "webadmin",
            USER_NO: "digiwin"
        }];
        login(logindata).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        });
    }

    switchForm=()=>{
        this.props.switchForm('register')
    }

    render() {
        const {username,code_loading,code_text,code_disable} =this.state;
        const _this=this;
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
                    <Button type="danger" disabled={code_disable} loading={code_loading} block onClick={this.getCode}>
                        {code_text}
                    </Button>
          Or <span onClick={this.switchForm}>register now!</span>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;