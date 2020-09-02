import React, { Component, Fragment } from 'react';

import { Form, Input, Button, Radio, Table, Pagination } from 'antd';

import service from '../../utils/request'

class TableCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            current: 0,
            total: 0,
            pageSize: 0,
            condition:{},
            loadingTable:false
        }
        this.changePage=this.changePage.bind(this)
    }

   
    loadData = (condition) => {

        this.setState({
            loadingTable:true
        });
        service.request({
            url: this.props.url,
            method: 'post',
            data: condition
        }).then(data => {
            var result = data.data
            this.setState({
                dataSource: result.content,
                current: result.number + 1,
                total: result.totalElements,
                pageSize: result.size,
                loadingTable:false
            })
        }).catch(e => {
            this.setState({
                loadingTable:true
            });
        });
    }

    myName = (xx) => alert(xx)


    componentDidMount() {
        //console.log(this)
        const { condition } = this.props;
        //通过传入的url查询数据
        this.loadData(condition);
        this.props.onRef(this)
    }

    // 回调函数，切换下一页
    changePage(current) {
        //console.log(_self)
        const { condition } = this.props;
        condition.page=current-1;
        this.loadData(condition);
    }

    // 回调函数,每页显示多少条
    changePageSize(pageSize, current) {
        const { condition } = this.props;
        condition.page=current-1;
        condition.size=pageSize;
        this.loadData(condition);
    }


    render() {
        const { columns, rowKey, rowSelection } = this.props;
        const { dataSource,loadingTable } = this.state

        return (
            <Fragment>
                <Table columns={columns}
                    rowKey={rowKey}
                    size="middle"
                    rowSelection={rowSelection ? rowSelection : false}
                    dataSource={dataSource}
                    bordered
                    loading={loadingTable}
                    // 分页
                    pagination={{
                        current: this.state.current,
                        total: this.state.total,
                        onChange: this.changePage,
                        pageSize: this.state.pageSize,
                        onShowSizeChange: this.changePageSize,
                    }}
                    scroll={{ y: 380 }}
                />
            </Fragment>
        );
    }
}

export default TableCommon;