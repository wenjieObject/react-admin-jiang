import React, { Component } from 'react';
import './App.scss';
import {Switch,Route,BrowserRouter} from 'react-router-dom';
import Login from './views/login/index';

 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {  }
   }
   render() { 
     return ( 
 
      <BrowserRouter>
        <Switch>
            <Route exact  path="/" component={Login}/>

        </Switch>
      </BrowserRouter>
       );
   }
 }
  
 export default App;
 
