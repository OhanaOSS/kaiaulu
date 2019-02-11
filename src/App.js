import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import store, {history} from './store';
import {Route, Redirect, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from './components/pages/Home'
import Portal from './components/pages/Portal'
import RegistrationPage from './components/pages/RegistrationPage'
import SignInPage from './components/pages/SignInPage'
import About from './components/pages/About'
import NotFound from './components/pages/NotFound'
import Nav from './components/Nav';

const PrivateRoute = ({ component: Component, ...data }) => (
  <Route  
    {...data}
    render={props =>
      store.getState().currentUser.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <ConnectedRouter history = {history}>
          <div className="App">
            <Nav />
            <Switch>
              <Route exact path="/" component={Home}/>
              <PrivateRoute path="/app" component={Portal}/>
              <Route path="/signup" component={RegistrationPage}/>
              <Route path="/signin" component={SignInPage}/>
              <Route path="/about" component={About}/>
              {/* <Route exact component={NotFound}/> */}
            </Switch>
          </div>
          </ConnectedRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  history: PropTypes.object,
}

export default App;