import React, { Component, Fragment } from 'react';

import { Form, Input, InputNumber, Button } from 'antd';

import FormCom from '@/components/form/index'

class DepartMentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formItem: [
        {  type: "Input", label: "部门名称", name: "name",required: true  },
        {  type: "InputNumber", label: "人数", name: "number",required: true  },
        {  
           type: "Select", 
           label: "部门名称s", 
           name: "names",
           required: true ,
           options:[
            {label:"研发",value:"1"},
            {label:"开发",value:"2"},
            {label:"行政",value:"3"},
          ]
        },
        {  
          type: "Radio", 
          label: "禁启用", 
          name: "statue",
          required: true ,
          options:[
           {label:"禁用",value:false},
           {label:"启用",value:true},
         ]
        },

      ],
      formConfig:{

      }

    }
  }

  onFinish = values => {
    console.log(values);
  };

  render() {
    return (
      <Fragment>
        <FormCom formItem={this.state.formItem} onFinish={this.onFinish}  />
      </Fragment>
    );
  }
}

export default DepartMentAdd;