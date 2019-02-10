import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/pages/Home'
import Portal from './components/pages/Portal'
import RegistrationPage from './components/pages/RegistrationPage'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
          <div className="App">
            <Nav />
            <Route exact path="/" component={Home}/>
            <Route path="/app" component={Portal}/>
            <Route path="/signup" component={RegistrationPage}/>
            <Route path="/about" component={About}/>
            <Route component={NotFound}/>
          </div>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;