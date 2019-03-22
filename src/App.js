import React, { Component } from 'react';
import './App.css';
import All from './All';
import Add from './Add';
import Welcome from './Welcome';
import Signup from './Signup';
import {BrowserRouter,Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Welcome} exact/>
          <Route path="/Signup" component={Signup} />
          <Route path="/Add" exact component={Add}  />
          <Route path="/All" component={All} />
          <Route path="/add/:id" exact component={Add}/> 
        </div>
      </BrowserRouter>
    )

  }
}

export default App;
