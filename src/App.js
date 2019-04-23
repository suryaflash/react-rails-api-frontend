import React, { Component } from 'react';
import './App.css';
import All from './containers/All';
import Add from './containers/Add';
import Welcome from './containers/Welcome';
import Signup from './containers/Signup';
import View from './containers/View';
import Edit from './containers/Edit';
import Histori from './containers/Histori';
import { BrowserRouter, Route } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route path="/articles/:id/view" component={View} exact />
          <Route path="/" component={Welcome} exact />
          <Route path="/Signup" component={Signup} exact />
          <Route path="/articles/new" component={Add} exact />
          <Route path="/articles" component={All} exact />
          <Route path="/articles/:id/edit" component={Edit} exact />

          <Route path="/articles/:id/history" component={Histori} exact />
        </BrowserRouter>
      </Provider>
    )

  }
}

export default App;
