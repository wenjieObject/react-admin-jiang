import React, { Component, Fragment } from 'react';

import { Form, Input, Button } from 'antd';

import {Link} from "react-router-dom"

import TableCommon from '@/components/tableCommon/index'

class DepartMentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns :[
                {
                  title: 'Name',
                  dataIndex: 'name',
                  width: 150,
                },
                {
                  title: 'Age',
                  dataIndex: 'age',
                  width: 150,
                },
                {
                  title: 'Address',
                  dataIndex: 'address',
                  width: 300,
                },
                {
                    title: 'operation',
                    dataIndex: 'operation',
                    render:(text,rowData)=>{
                        return (
                            <div className='inline-button'>
                                <Button  type='primary'><Link to={{pathname:'/index/department/add',query:{id:'12'}}}>编辑</Link></Button>
                            </div>
                        )
                    }                     
                },
              ],
               
        }
    }

    editBtnClick=(e)=>{
        //console.log(e)
    }


    render() {

        const {columns,data}=this.state;
        return (
            <Fragment>
                <Form layout="inline" style={{margin:'10px'}}>
                    <Form.Item label="Field A">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item label="Field B">
                        <Input placeholder="input placeholder" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
                </Form>
                <TableCommon rowSelection={true} columns={columns} url='xxx'  rowKey="key"  />
            </Fragment>
            );
    }
}

export default DepartMentList;