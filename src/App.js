import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import Home from './components/pages/Home'
import Portal from './components/pages/Portal'
import RegistrationPage from './components/pages/RegistrationPage'
import SignInPage from './components/pages/SignInPage'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import Nav from "./components/Nav";


const PrivateRoute = ({ component: Component, ...rest }) => (
  console.log(rest),
  <Route
    {...rest}
    render={props =>
      this.state.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      isLoggedIn: false
    }
  }


  render() {
    return (
      <Provider store={store}>
          <BrowserRouter>
          <div className="App">
            <Nav />
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/app" component={Portal}/>
            <Route path="/signup" component={RegistrationPage}/>
            <Route path="/signin" component={SignInPage}/>
            <Route path="/about" component={About}/>
            {/* <Route exact component={NotFound}/> */}
          </div>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;