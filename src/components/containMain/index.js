import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

//组件
import DepartMentAdd from '@/views/department/add';
import DepartMentList from '@/views/department/list';

//私有组件
import PrivateRouter from '@/components/privateRouter/index'


//自动化工程
/**
 * '../../views' 扫描的路径
 * true是否扫描文件下的子文件
 * /\.js$/ 匹配的文件类型
*/
const files = require.context('@/views/', true, /\.js$/);
const componentFiles = [];
files.keys().map(key => {
    //console.log(key)
    //console.log(files(key).default)
    if (key.includes('./index/') || key.includes('./login/')) {
        return false
    }

    const splitFileName = key.split('.');
    const path = '/index' + splitFileName[1].toLowerCase();
    const component = files(key).default;
    const jsonObj = {};
    jsonObj.path = path
    jsonObj.component = component
    componentFiles.push(jsonObj);
})


class ContainMain extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {

        return (

            <Switch>
                {
                    componentFiles.map(item => {
                        return < PrivateRouter key={item.path} path={item.path} component={item.component} />
                    })
                }
                {/* <PrivateRouter path='/index/department/add' component={DepartMentAdd} />
                <PrivateRouter path='/index/department/list' component={DepartMentList} /> */}
            </Switch>

        )
    }
}

export default ContainMain;