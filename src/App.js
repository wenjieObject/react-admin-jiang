import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.scss';
import {Switch,Route,BrowserRouter} from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import News from './views/News';

 class App extends Component {
   constructor(props) {
     super(props);
     this.state = {  }
   }
   render() { 
     return ( 
       <div className='test'>
         <h1>这是标题</h1>
      <BrowserRouter>
        <Switch>
            <Route exact  path="/" component={Home}/>
            <Route  path="/about" component={About}/>
            <Route  path="/news" component={News}/>

        </Switch>
      </BrowserRouter>
      </div>
      );
   }
 }
  
 export default App;
 
//export default ;
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//       </header>
//     </div>
//   );
// }

// export default App;
