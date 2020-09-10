import React, { Component } from 'react';
import { Form, Input, InputNumber, Button ,Select,Radio  } from 'antd';

const { Option } = Select;
class FormCom extends Component {

    constructor(props) {
        super(props);
        this.state = {        }
    }

 

    //关联校验
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

    //radio 元素
    radioElem = (item) => {

        let rules = this.buildRules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules || []}>
                <Radio.Group >
                    {
                        item.options && item.options.map(elem => {
                            return <Radio value={elem.value} key={elem.value}>{elem.label}</Radio>
                        })
                    }
                </Radio.Group>
            </Form.Item>
        )
    }

    //input 元素
    inputElem = (item) => {

        let rules=this.buildRules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules || []}>
                <Input style={{width:"200px"}} />
            </Form.Item>
        )
    }

    //InputNumber 元i素
    inputNumberElem = (item) => {

        let rules = this.buildRules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules || []}>
                <InputNumber min={0} max={100} style={{ width: "200px" }} />
            </Form.Item>
        )
    }

    //select 元素
    selectElem = (item) => {

        let rules=this.buildRules(item)
        return (
            <Form.Item name={item.name} label={item.label} key={item.name} rules={rules || []}>
                <Select  style={{width:"200px"}}>
                    {
                        item.options && item.options.map(elem=>{
                           return <Option value={elem.value}  key={elem.value}>{elem.label}</Option>
                        })
                    }                    
                </Select>
            </Form.Item>
        )
    }

    //处理所有input元素
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
            else if (item.type === "InputNumber") {
                formList.push(this.inputNumberElem(item))
            }
            else if (item.type === "Radio") {
                formList.push(this.radioElem(item))
            }

        })

        return formList;

    }

    onFinish = values => {
        this.props.onFinish(values)
      };

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