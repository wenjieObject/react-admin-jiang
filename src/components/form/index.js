import React, { Component } from 'react';
import { Form, Input, InputNumber, Button } from 'antd';

class FormCom extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    buildRules = (item) => {

        let rules = []
        if (item.required) {
            let message = `${item.label}不能为空`;
            rules.push({ required: true, message })
        }
        if(item.rules && item.rules.length >0){
            rules= rules.concat(item.rules)
        }

        return rules;

    }

    //input 元素
    inputElem = (item) => {

        let rules=this.buildRules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules || []}>
                <Input />
            </Form.Item>
        )
    }

    //select 元素
    selectElem = (item) => {

        let rules=this.buildRules(item)

        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules || []}>
                <Input />
            </Form.Item>
        )
    }

    //处理input元素
    initFormItem = () => {
        //console.log(this.props)
        const { formItem } = this.props;

        if (!formItem || formItem.length === 0) {
            return false;
        }

        let formList = []
        //循环处理传入的元素
        formItem.map(item => {

            if (item.type === "Input") {
                formList.push(this.inputElem(item))

            }
            else if (item.type === "Select") {
                formList.push(this.selectElem(item))
            }

        })

        return formList;

    }


    onFinish = () => {

    }

    render() {


        const layout = {
            labelCol: {
                span: 2,
            },
            wrapperCol: {
                span: 16,
            },
        };

        return (

            <Form {...layout} name="nest-messages" onFinish={this.onFinish} >
                {this.initFormItem() }
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Form.Item>
            </Form>

        );
    }

}

export default FormCom;