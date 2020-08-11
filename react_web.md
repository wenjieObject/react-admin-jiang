

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





## 12.私有化组件、存储token 安全机制进入后台首页





## 13.配置路由，生成侧边栏菜单，点击菜单显示内容





## 14.菜单刷新，收起展开，withRouter，存储到cookie





## 15.自动化工程生成组件



```js
/**
 * '../../views' 扫描的路径
 * true是否扫描文件下的子文件
 * /\.js$/ 匹配的文件类型
*/
const files =require.context('../../views',true,/\.js$/);
```





## 16.react-cookie



sessionStorage:当前会话，关闭浏览器窗口销毁。

localStorage：永远不会消失，主动清除。

cookie：设置过期之前，关闭浏览器不会消失。









