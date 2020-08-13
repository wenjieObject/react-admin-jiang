import React, { Component, Fragment } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

//组件
import DepartMentAdd from '@/views/department/add';
import DepartMentList from '@/views/department/list';

//私有组件
import PrivateRouter from '@/components/privateRouter/index'

class ContainMain extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (

            <Switch>
                <PrivateRouter path='/index/department/add' component={DepartMentAdd} />
                <PrivateRouter path='/index/department/list' component={DepartMentList} />
            </Switch>

        );
    }
}

export default ContainMain;