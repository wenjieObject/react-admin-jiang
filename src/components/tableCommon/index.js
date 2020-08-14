import React, { Component, Fragment } from 'react';

import { Form, Input, Button, Radio, Table } from 'antd';

class TableCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource:[]

        }
    }

    loadData=()=>{
        const { url } = this.props;
        console.log(url);
        let data=[];
        for (let i = 0; i < 100; i++) {
            data.push({
              key: i,
              name: `Edward King ${i}`,
              age: 32,
              address: `London, Park Lane no. ${i}`,
            });
          }
          this.setState({
            dataSource:data
          })
    }

    componentDidMount() {
        //通过传入的url查询数据
        this.loadData();        
    }

    render() {
        const { columns,  rowKey,rowSelection } = this.props;
        return (
            <Fragment>
                <Table columns={columns}
                    rowKey={rowKey}
                    rowSelection={rowSelection?rowSelection:false}
                    dataSource={this.state.dataSource}
                    pagination={{ pageSize: 50 }}
                    bordered
                    scroll={{ y: 340 }} />,
            </Fragment>
        );
    }
}

export default TableCommon;