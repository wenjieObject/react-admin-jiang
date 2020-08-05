

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

28.05

```js
<Form.i>
```



### 8.2 跨域

命令行

```sh
npm i http-proxy-middleware
```

src目录下新建文件setupProxy.js



