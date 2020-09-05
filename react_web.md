​	


## 1.脚手架、git仓库



create-react-app

```sh
# 全局安装
npm install -g create-react-app
# 构建一个my-app的项目
npx create-react-app my-app
cd my-app

# 启动编译当前的React项目，并自动打开 http://localhost:3000/
npm start
```

git初始化

## 2.路由react-router-dom



```js
      <BrowserRouter>
        <Switch>
            <Route exact  path="/" component={Home}/>
            <Route  path="/about" component={About}/>
            <Route  path="/news" component={News}/>
        </Switch>
      </BrowserRouter>
```

BrowserRouter与HashRouter

Switch：只匹配第一个匹配上的路由地址

exact：精确匹配

## 3.sass全局变量和全局样式



### 3.1使用scss语法

安装sass-loader和node-sass依赖

```sh
npm install sass-loader node-sass --save-dev
```

node_modules/react-scripts/config/webpack.config.js

```js
{
    exclude: [/\.js$/,/\.html$/,/\.json$/,/\.scss$/],
    loader: require.resolve('file-loader'),
    options: {
            name: 'static/media/[name].[hash:8].[ext]',
        },
},
    //添加以下代码
{
    test:/\.scss$/,
    loaders:['style-loader','css-loader','sass-loader']
}
```

### 3.2 全局变量

命令

```sh
npm install sass-resources-loader
```

```js

//修改node_modules/react-scripts/config/webpack.config.js
{
              test: sassRegex,
              exclude: sassModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'sass-loader',
                  //添加以上代码
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: path.resolve(__dirname,'../src/styles/main.scss')
                  },
                },
              ),
              sideEffects: true,
            }
```



## 4.快捷键和命令

ctrl+k，ctrl+f 格式化代码

ccc

imrc

dom设置class改成className

## 5.antd按需加载

命令行

```sh
cnpm i babel-plugin-import --save-dev
```

webpack.config.js添加下列配置

```js
                plugins: [
                  ['import', { libraryName: 'antd', style: 'css' }],
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
                  ],
                ],
```

## 6.antd-ui登录页面

### 6.1 初始化页面样式

```css
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0} 

body{font:12px"宋体","Arial Narrow",HELVETICA;background:#fff;-webkit-text-size-adjust:100%;} 

a{color:#2d374b;text-decoration:none} 

a:hover{color:#cd0200;text-decoration:underline} 

em{font-style:normal} 

li{list-style:none} 

img{border:0;vertical-align:middle} 

table{border-collapse:collapse;border-spacing:0} 

p{word-wrap:break-word} 
```

block属性：避免容器被字体撑大

样式权重 ：!important



### 6.2 页面设计、子组件调用父组件方法

![image-20200805154625216](C:\Users\wenjiejiang\AppData\Roaming\Typora\typora-user-images\image-20200805154625216.png)

**上图中index是父组件，loginForm和registerForm是子组件 **

index代码

```js
import React, { Component } from 'react';
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import './index.scss'

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType:'login'
          }
    }

    switchForm=(value)=>{
         this.setState({
            formType:value
         });
    }

    render() { 
        return ( <div className='initForm'>
            {
                this.state.formType==='login'?
                <LoginForm switchForm={this.switchForm}/>
                :<RegisterForm  switchForm={this.switchForm}/>
            }
        </div> );
    }
}
 
export default login;
```

loginForm.js 代码

```js
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinish=()=>{
        alert('LoginForm')
    }

    
    switchForm=()=>{
        this.props.switchForm('register')
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
          </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
          </Button>
          Or <span onClick={this.switchForm}>register now!</span>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;
```

registerForm.js 页面

```js
import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onFinish = () => {
        alert('RegisterForm')
    }

    switchForm = () => {
        //调用父级的方法
        this.props.switchForm('login')
    }

    render() {
        return (
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="confirmPassword"
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
              </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        register
              </Button>
              Or <span onClick={this.switchForm}>login now!</span>
                </Form.Item>
            </Form>
        );
    }
}

export default RegisterForm;
```



### 6.3 父组件调用子组件方法

1. **在父组件或者子组件的实例**

2. **在子组件调用父组件的方法，并把子组件的实例传给父组件**
3. **通过实例调用子组件的方法**

父组件代码

```js
import React, {Component} from 'react';

export default class Parent extends Component {
   render() {
       return(
           <div>
               <Child onRef={this.onRef} />
               <button onClick={this.click} >click</button>
           </div>
       )
   }

   onRef = (ref) => {
       this.child = ref
   }

   click = (e) => {
       this.child.myName()
   }

}
```



子组件

```js
class Child extends Component {
   componentDidMount(){
       this.props.onRef(this)
   }

   myName = () => alert('kaysen')

   render() {
       return ('hello world!')
   }
}
```



## 7.react 函数定义方式

### 7.1箭头函数

funcName=()=>{};

this.funcName

### 7.2构造器内声明

在constructor内绑定

this.funcName=this.funcName.bind(this);

函数声明与render平级

funcName(){}

### 7.3 bind()绑定

funcName(){}

调用this.funcName.bind(this);

### 7.4 箭头函数

（data）=>{this.funcName}



### 7.5 方法修改this指向



```js
//在constructor里面写以下语句
this.changePage=this.changePage.bind(this)

    changePage(current) {
        //console.log(this)
        const { condition } = this.props;
        condition.page=current-1;
        this.loadData(condition);
    }
```





## 8.form校验、接口跨域、axios、api管理



### 8.1 form表单校验



```js
                <Form.Item
                    name="password"
                    rules={
                        [
                            { required: true, message: 'Please input your Password!' },
                            ({getFieldValue})=>({ //es6 解构
                                validator(rule,value){
                                    if(value.length<6){
                                        return Promise.reject('不能小于6位')
                                    }
                                    return Promise.resolve()
                                }
                            }),
                            {min:6,message:'不能小于6位'},
                            {max:20,message:'不能大于20位'},
                            {pattern:/^(?![0-9]+$)/,message:'xxxxx'}
                        ]
                    }>
                    <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
                </Form.Item>
```



### 8.2 跨域

#### 8.2.1命令行

```sh
//显示隐藏文件，不可逆
npm run eject

npm i http-proxy-middleware
```

#### 8.2.2 src目录下新建文件setupProxy.js

/proxy 替换url的地址

1.地址开头匹配到proxy，开始做代理http://10.40.3.209:5000/api/v1

2./proxy/workcenter/eqp-sub => /workcenter/eqp-sub

3.替换之后的地址http://10.40.3.209:5000/api/v1/workcenter/eqp-sub

```js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports=function(app){
    app.use(createProxyMiddleware('/proxy',{
         target: 'http://10.40.3.209:5000/api/v1',     
         changeOrigin: true ,
         pathRewrite:{
             "^/proxy":""
         }
        })
    );
}
```

#### 8.2.3 配置paths

config下paths.js 配置

 proxySetup: resolveApp('src/setupProxy.js'),

### 8.3 axios 暴露api方法

命令行

```sh
npm install axios -S
```

新建request.js文件 处理请求拦截和响应拦截，**baseURL需要与替换地址一致**

```js
import axios from 'axios'

const service=axios.create({
    baseURL:'/proxy',
    timeout:1000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default service
```

新建account.js文件 暴露调用服务方法

```js
import service from '../../src/utils/request'

export function login(data) {
   return service.request({
        url: '/workcenter/eqp-sub',
        method: 'post',
        //params: data, //适用于get、delete
        data: data , //适用于post、put
    });
}
```

在前端操作中调用，{login}是上述的方法

```js
import {login} from '../../api/account'
    onFinish=()=>{
        login(this.state.logindata).then(response=>{
            console.log(response)
        }).catch(error=>{
            //reject 走这里
            console.log(error)
        });
    }
```

#### 8.3.1 拦截器

#### 8.3.2环境变量

create-react-app创建项目内置环境变量NODE_ENV,可通过process.env.NODE_ENV读取变量

**NODE_ENV默认三个值**

1.开发development -npm start

2.测试 test -npm run test

3.生成 production -npm run build

项目打包配置命令行

```sh
npm install -g dotenv -cil
```

发布测试和打包的命令

src下新建三个文件分别对应开发、测试、生产

.env.development  、.env.test 、.env.production



###  8.4.解构方式获取state的值，获取验证码接口，倒计时，防止误触

react没有vue的双向数据绑定，v-model

**富文本变量使用，倒计时函数**

```js
    countDown=()=>{
        //setInterval \ clearInterval 不间断定时器
        //setTimeout \ clearTimeout 只执行一次
        let timer=null
        let sec=60
        this.setState({
            code_loading:false,
            code_text:`${sec}s`,
            code_disable:true
        })

        timer=setInterval(() => {
            sec--
            if(sec<=0){
                this.setState({
                    code_text:'重新获取',
                    code_disable:false
                })
                clearInterval(timer)
                return false
            }
            this.setState({
                code_text:`${sec}s`
            })
        }, 1000);

    }
```

## 9.组件化类型

### 9.1 无状态组件

纯静态展示的作用，属性（props）加一个渲染函数（render）。复用性比较强，比如button

### 9.2 有状态组件

组件内部包含状态state，通常有生命周期

**示例**

抽离组件和方法

组件传值

```js
//获取父组件的传值   
componentWillReceiveProps(value){
        console.log(value)
    }
```

抽离倒计时组件 并暴露

 ```js
import React, { Component } from 'react';
import { Button,message } from 'antd';

//api
import { getCode } from '../../api/account'

let timer = null

class Code extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            code_loading: false,
            code_text: '获取验证码',
            code_disable: false
        }
    }

    //获取验证码
    getCode = () => {

        if (!this.state.username) {
            message.warning('请输入用户名');
            return
        }
        this.countDown();
        console.log(this.state.username)
        const codeData = {
            tableName: 'TAM_TOOLS_TYPE',
            conditions: [],
            pagination: {
                pageIndex: 1,
                pageSize: 10
            }
        };

        getCode(codeData).then(response => {
            //console.log(response)
        }).catch(error => {
            console.log(error)
        }).finally(e => {
            this.setState({
                code_loading: false,
                code_text: '重新获取'
            })
        });
    }


    //倒计时
    countDown = () => {
        //setInterval \ clearInterval 不间断定时器
        //setTimeout \ clearTimeout 只执行一次
        let sec = 60
        this.setState({
            code_loading: false,
            code_text: `${sec}s`,
            code_disable: true
        })

        timer = setInterval(() => {
            sec--
            if (sec <= 0) {
                this.setState({
                    code_text: '重新获取',
                    code_disable: false
                })
                clearInterval(timer)
                return false
            }
            this.setState({
                code_text: `${sec}s`
            })

        }, 1000);

    }


    //从父组件获取值
    componentWillReceiveProps({ username }) {
        this.setState({
            username: username
        })
    }

  //销毁组件时删除计时
    componentWillUnmount(){
        clearInterval(timer)
    } 

    render() {

        const {username,code_loading,code_text,code_disable} =this.state;

        return (
            <Button type="danger" disabled={code_disable} loading={code_loading} block onClick={this.getCode}>
                {code_text}
            </Button>
        );
    }
}

export default Code;
 ```



使用组件

```js
//组件
import Code from '../../components/code'

//username给组件传值
<Code username={username}/>
```





### 9.3 UI组件

类似无状态组件，负责数据渲染

### 9.4 容器组件

axios数据获取及业务逻辑处理，不负责数据渲染

### 9.5 高阶组件



### 9.6 回调渲染



## 10.密码加密

命令行

```sh
npm install crypto-js
```

使用

```js
import CryptoJs from crypto-js
 
//md5加密
const pwd=CryptoJs.MD5(password).tostring()
```



## 11.登录跳转主页，后台搭建



路由跳转

```js
import {withRouter} from 'react-router-dom';

//登录跳转
 this.props.history.push("/index");

export default withRouter(LoginForm);
```



## 12.私有化组件、存储token 安全机制进入后台首页



```js
//路由写法
<Route exact  path="/" render={()=><Login/>}/>
```

### 12.1 设置session



```js

export function setToken(value){
    sessionStorage.setItem("adminToken",value);
}

export function getToken(){
   return sessionStorage.getItem("adminToken");
}
```

### 12.2 登录写入session

```js
//session

import {setToken} from '@/utils/session'

setToken("6F9619FF-8B86-D011-B42D-00C04FC964FF");

```

### 12.3 判断登录、私有化组件

```js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {  getToken } from '@/utils/session'

const PrivateRouter = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            getToken()!==null
            ?<Component {...props} /> 
            :<Redirect to='/' />
        )} />
    )
}

export default PrivateRouter;
```



## 13.配置路由，生成侧边栏菜单，点击菜单显示内容



### 13.1 app.js中index路由不能设置exact

```js
      <BrowserRouter>
        <Switch>
            <Route  exact path="/" component={Login}/>
            <PrivateRouter  path="/index" component={Index}/>
        </Switch>
      </BrowserRouter>
```



### 13.2 遍历菜单展示



```js

  //无子级菜单
  //Link 点击菜单展示主项
  renderMenu = ({ title, key }) => {
    return (<Menu.Item key={key} >
      <Link to={key}>{title}</Link>
    </Menu.Item>)
  }
  //子级菜单
  renderSubMenu = ({ title, key, child }) => {

    return (
      <SubMenu key={key} title={title}>
        {
          child && child.map(item => {
            return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
          })
        }
      </SubMenu>
    )
  }
  
  //render
      return (
      <Menu
        mode="inline"
        theme="dark"
        onOpenChange={this.onOpenChange}
        style={{ height: '100%', paddingTop: '50px' }}
        openKeys={openKeys}
      >
        {
          router && router.map(firstItem => {
            return firstItem.child && firstItem.child.length > 0
              ? this.renderSubMenu(firstItem)
              : this.renderMenu(firstItem)
          })
        }
      </Menu>
    );
```

### 13.3 内容区域

```js
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
```



### 13.4 主体框架



```js

import React, { Component } from 'react';

//css
import './layout.scss'
//antd
import { Layout } from 'antd';

//自定义组件
import AsideMenu from '@/components/asideMenu/index'

import ContainMain from '../../components/containMain/index'

const { Sider, Header, Content } = Layout;


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Layout className="layout-wrap">
                <Sider width='250px'>
                    <AsideMenu></AsideMenu>
                </Sider>
                <Layout>
                    <Header className='layout-header'>Header</Header>
                    <Content className='layout-main'>
                        <ContainMain></ContainMain>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Index;
```



## 14.菜单刷新，收起展开，withRouter，存储到cookie



### 14.1菜单收起展开



```js
                <Sider collapsed={this.state.collapsed}>
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginLeft:'20px'}}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button>
                    <AsideMenu></AsideMenu>
                </Sider>
```



### 14.2 刷新选中菜单



openKeys是指父级菜单

selectedKeys是最子集菜单

```js
        <Menu
          //selectedKeys={openKeys}
          mode="inline"
          theme="dark"
          onOpenChange={this.onOpenChange}
          style={{ height: '100%', paddingTop: '50px' }}
          openKeys={openKeys}
        >
          {
            router && router.map(firstItem => {
              return firstItem.child && firstItem.child.length > 0
                ? this.renderSubMenu(firstItem)
                : this.renderMenu(firstItem)
            })
          }
        </Menu>
```



```js
  componentDidMount(){
    console.log(this.props.location.pathname)
     
    const pathnames=this.props.location.pathname.split('/').slice(0,3).join('/');
    console.log(pathnames)
    this.setState({
      openKeys: [pathnames]
    })
  }

export default withRouter(AsideMenu);
```





## 15.自动化工程生成组件



在生成主体内容区域的时候遍历项目文件

```js
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
```

遍历展示路由

```js
           <Switch>
                {
                    componentFiles.map(item => {
                        return < PrivateRouter key={item.path} path={item.path} component={item.component} />
                    })
                }
                {/* <PrivateRouter path='/index/department/add' component={DepartMentAdd} />
                <PrivateRouter path='/index/department/list' component={DepartMentList} /> */}
            </Switch>
```



## 16.react-cookie

命令行

```sh
npm install react-cookies --save 
```

使用

```js
import cookies from 'react-cookies'

//存储cookie
export function setToken(value){
    cookies.save('adminToken',value)
}
//获取cookie
export function getToken(value){
   return cookies.load('adminToken')
}
//存储username
export function setUsername(value){
    cookies.save('username',value)
}
//获取username
export function getUsername(value){
    return cookies.load('username')
}
```

 

**1.sessionStorage:当前会话，关闭浏览器窗口销毁。**

**2.localStorage：永远不会消失，主动清除。**

**3.cookie：设置过期之前，关闭浏览器不会消失。**



### 16.1请求拦截添加token



### 16.2 防止连续触发

按钮添加loading效果



## 17.响应拦截、全局处理



axios的全局处理

```js
import axios from 'axios'
import {getToken} from '@/utils/cookies'
import { message } from 'antd';

const service=axios.create({
    baseURL:'/proxy',
    timeout:1000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers['Token']=getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const data =response.data;
    if(data.resCode !== 0){
      //弹窗报错
      message.info(data.message)
      return Promise.reject(response);
    }else{
      return response;
    }
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default service
```

调用api,响应的Promise.reject(response);会触发到下面api的catch

```js
        login(logindata).then(response => {
            //console.log(response)
            this.props.history.push("/index");
        }).catch(error => {
            //console.log(error)
        });
```



## 18.react生命周期，如何使用

constructor

```js
    //生命周期挂载完成
    componentDidMount(){
       //这里加载数据
    }
```



## 19.引用路径配置



在webpack.config.js中

```js
alias: {
        // 路径引用 @
        '@': paths.appSrc,
      },

//使用
import AsideMenu from '@/components/asideMenu/index'
```

## 20.路由传参



1. params传参（参数会在地址栏展示）

   1. 路由页面

   2. 链接方式

      ```js
      import {Link} from "react-router-dom"
      //传参
      
      
      ```

   3. js方式

      

   4. 获取参数

    

   ```js
   //获取url参数
   this.props.match
   ```

   

2. query传参（刷新页面，参数消失）

   ```js
    <Button  type='primary'><Link to={{pathname:'/index/department/add',query:{id:'12'}}}>编辑</Link></Button>
   ```

   获取参数

   ```js
   this.props.location.query.name
   ```



3. state传参（参数加密）

```js
<Link to={{pathname:'/link',state:{id:'12'}}}>xx </Link>
```

​         获取参数

```js
this.props.location.state.name
```



## 21.table组件封装，页码



table 每行添加按钮,及传递函数

```js
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
                                <Button onClick={()=>this.editBtnClick(rowData)} type='primary'>编辑</Button>
                            </div>
                        )
                    }                     
                },
              ],
```



### 21.1封装table



table 列添加元素

```js
  columns :[
                {
                  title: 'destOperationCode',
                  dataIndex: 'destOperationCode',
                  width: 250,
                  render:(destOperationCode,rowData)=>{
                      return <a href={rowData.destOperationCode}>{destOperationCode}</a>
                  }
                },
```



封装table，传入api地址，渲染数据

```js
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
```



使用封装的table

```js

import React, { Component, Fragment } from 'react';

import { Form, Input, Button, Radio,Table  } from 'antd';

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
                {/* <Table columns={columns} rowKey="key" dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 340 }} />, */}

            </Fragment>);
    }
}

export default DepartMentList;
```



### 21.2 table二次封装 

1. 在父组件或者子组件的实例

2. 在子组件调用父组件的方法，并把子组件的实例传给父组件
3. 通过实例调用子组件的方法

#### 21.2.1 删除方法封装

**TableCommon封装批量删除方法**

**父组件传入删除api**

表格组件封装TableCommon

```js
import React, { Component, Fragment } from 'react';

import { Button,  message,Table,Modal } from 'antd';

import service from '../../utils/request'

class TableCommon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            current: 1,
            total: 0,
            pageSize: 20,
            condition:{},
            loadingTable:false,
            visible:false,
            confirmLoading:false,
            selectRowKeys:[],
        }
        this.changePage=this.changePage.bind(this)
        this.changePageSize=this.changePageSize.bind(this)

    }

   
    loadData = (condition) => {

        condition.page=this.state.current-1
        condition.size=this.state.pageSize


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
                current: result.number +1  ,
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
        this.setState({
            current
        },()=>{
            this.loadData(condition);
        })
    }

    // 回调函数,每页显示多少条
    changePageSize(current, pageSize) {
        const { condition } = this.props;
        this.setState({
            current:1,
            pageSize:pageSize
        },()=>{
            this.loadData(condition);
        })
        
    }

    //确认删除操作
    modalThen=()=>{
        this.setState({
            confirmLoading:true
        })
        
        message.info('删除成功'+this.props.deleteurl);

        this.setState({
            confirmLoading:false,
            visible:false
        })
    }

    showModal=()=>{

        //如果没有勾选return
        const {selectRowKeys} =this.state
        if(!selectRowKeys || selectRowKeys.length===0){
            message.info('请选择数据');
            return
        }
        this.setState({
            visible:true
        })
    }

    selectionChage=(value)=> {
        //console.log(value)
        this.setState({
            selectRowKeys:value
        })
    }


    render() {
        const { columns, rowKey } = this.props;
        const { dataSource,loadingTable } = this.state
        const rowSelection={
            onChange:this.selectionChage
        }

        return (
            <Fragment>
                <Table columns={columns}
                    rowKey={rowKey}
                    size="middle"
                    rowSelection={true ? rowSelection : false}
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
              <Button type="primary" onClick={this.showModal}>批量删除</Button>
                {/*批量删除确认弹窗*/}
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.modalThen}
                    onCancel={()=>{this.setState({visible:false})}}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.confirmLoading}
                >
                    <p className="text-center">确定删除此信息？，删除无法恢复</p>
                </Modal>
            </Fragment>
        );
    }
}

export default TableCommon;
```

父组件调用表格组件

inData,logTimeBegin,logTimeEnd 是自定义参数，page和size是固定参数

```js
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
        //console.log(e.target.value)
        this.setState({
            inData:e.target.value,
        })
    }

    onQuery=()=>{
        const {inData,logTimeBegin,logTimeEnd} =this.state;
        this.child.loadData({inData,logTimeBegin,logTimeEnd});
    }

    onRef = (ref) => {
        this.child = ref
    }

    render() { 
        const {inData,logTimeBegin,logTimeEnd} =this.state;

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
            <TableCommon 
                condition={{inData,logTimeBegin,logTimeEnd}} 
                columns={this.state.columns} 
                url='/esblog/list'  
                rowKey="requestId" 
                deleteurl='/esblog/delete'
                onRef={this.onRef}  />
        </Fragment>
        );
    }
}
 
export default EsblogList;
```









### 21.5 this.setState 回调函数



```js
this.setState({
        pageNumer:value
    },()=>{
        //回调事件
    }
)
```





