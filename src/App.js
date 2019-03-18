import React, { Component } from 'react';
import './App.css';
import All from './All';
import Add from './Add';
import {BrowserRouter,Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" component={Add} exact />
          <Route path="/All" component={All} />
          <Route path="/add/:id" component={Add}/> 
        </div>
      </BrowserRouter>
    )

  }
}

export default App;
