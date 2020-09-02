import React, { Component,Fragment } from 'react';
import { Form, Input, Button,DatePicker } from 'antd';
import TableCommon from '@/components/tableCommon/index'

const { RangePicker } = DatePicker;

class EsblogList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            columns :[
                {
                  title: 'destOperationCode',
                  dataIndex: 'destOperationCode',
                  width: 250,
                },
                {
                  title: 'srcAppCode',
                  dataIndex: 'srcAppCode',
                  width: 150,
                },
                {
                  title: 'srcIp',
                  dataIndex: 'srcIp',
                  width: 150,
                },
                {
                    title: 'logTime1',
                    dataIndex: 'logTime1',
                    width: 150,
                },
                {
                    title: 'inData',
                    dataIndex: 'inData',
                    width: 300,
                },
                {
                    title: 'outData',
                    dataIndex: 'outData',
                    width: 300,
                },
              ],
              inData:"",
              logTimeBegin:"2020-08-31",
              logTimeEnd:"2020-09-01",
              page:0,
              size:20,
          }
    }

    componentWillMount(){

        this.setState({
            inData:"",
            logTimeBegin:"2020-08-31",
            logTimeEnd:"2020-09-01"
        })
         
    }

    handleSelectTime=(value,dateString)=>{
        if(dateString[0]){
            this.setState({
                logTimeBegin:dateString[0],
                logTimeEnd:dateString[1],
            })
        }         
    }

    handleKeyword = (e)=>{
        console.log(e.target.value)
        this.setState({
            inData:e.target.value,
        })
    }

    onQuery=()=>{
        const {inData,logTimeBegin,logTimeEnd,page,size} =this.state;
        this.child.loadData({inData,logTimeBegin,logTimeEnd,page,size});
    }

    onRef = (ref) => {
        this.child = ref
    }

    render() { 
        const {inData,logTimeBegin,logTimeEnd,page,size} =this.state;

        return ( 
            <Fragment>
            <Form layout="inline" style={{marginTop:'20px'}}>
                <Form.Item label="调用时间">
                   <RangePicker  onChange={this.handleSelectTime} />
                </Form.Item>
                <Form.Item label="关键字">
                    <Input onChange={this.handleKeyword} placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.onQuery}>查询</Button>
                </Form.Item>
            </Form>
            <div style={{margin:'10px'}}></div>
            <TableCommon rowSelection={true} condition={{inData,logTimeBegin,logTimeEnd,page,size}} 
                columns={this.state.columns} url='/esblog/list'  rowKey="requestId" 
                onRef={this.onRef}  />
        </Fragment>
        );
    }
}
 
export default EsblogList;