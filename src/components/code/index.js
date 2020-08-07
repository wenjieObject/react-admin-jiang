import React, { Component } from 'react';
import { Button,message } from 'antd';


//api
import { getCode } from '../../api/account'

let timer = null

class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            code_loading: false,
            code_text: '获取验证码',
            code_disable: false
        }
    }

    //获取验证码
    getCode = () => {

        if (!this.state.username) {
            message.warning('请输入用户名');
            return
        }
        this.countDown();
        console.log(this.state.username)
        const codeData = {
            tableName: 'TAM_TOOLS_TYPE',
            conditions: [],
            pagination: {
                pageIndex: 1,
                pageSize: 10
            }
        };

        getCode(codeData).then(response => {
            //console.log(response)
        }).catch(error => {
            console.log(error)
        }).finally(e => {
            this.setState({
                code_loading: false,
                code_text: '重新获取'
            })
        });
    }


    //倒计时
    countDown = () => {
        //setInterval \ clearInterval 不间断定时器
        //setTimeout \ clearTimeout 只执行一次
        let sec = 60
        this.setState({
            code_loading: false,
            code_text: `${sec}s`,
            code_disable: true
        })

        timer = setInterval(() => {
            sec--
            if (sec <= 0) {
                this.setState({
                    code_text: '重新获取',
                    code_disable: false
                })
                clearInterval(timer)
                return false
            }
            this.setState({
                code_text: `${sec}s`
            })

        }, 1000);

    }


    componentWillReceiveProps({ username }) {
        this.setState({
            username: username
        })
    }

    componentWillUnmount(){
        clearInterval(timer)
    } 

    render() {

        const {username,code_loading,code_text,code_disable} =this.state;

        return (
            <Button type="danger" disabled={code_disable} loading={code_loading} block onClick={this.getCode}>
                {code_text}
            </Button>
        );
    }
}

export default Code;