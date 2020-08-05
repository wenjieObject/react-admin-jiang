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