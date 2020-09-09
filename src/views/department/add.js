import React, { Component, Fragment } from 'react';

import { Form, Input, InputNumber, Button } from 'antd';

import FormCom from '@/components/form/index'

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

class DepartMentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formItem: [
        {  type: "Input", label: "部门名称", name: "name",required: true  },
        {  type: "Select", label: "部门名称s", name: "names",required: true },

      ]

    }
  }

  onFinish = values => {
    console.log(values);
  };

  render() {
    return (
      <Fragment>
        <FormCom formItem={this.state.formItem} />

        <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
          <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'age']} label="Age" rules={[{ type: 'number', min: 0, max: 99 }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name={['user', 'website']} label="Website">
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'introduction']} label="Introduction">
            <Input.TextArea />
          </Form.Item>
 
        </Form>
      </Fragment>
    );
  }
}

export default DepartMentAdd;