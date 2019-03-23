import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import store from '../store';
import SignOutButton from './auth/SignOutButton';
import SelectFamily from './auth/SelectFamily'

export class Nav extends Component {
  render() {
    if (store.getState().currentUser.isAuthenticated){
      return (
        <div>
          <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/app">App</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <SignOutButton/>
            </li>
            <li className="nav-item">
                <SelectFamily/>
            </li>
          </ul>
        </div>
      )
    } else {
      return (
        <div>
          <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/app">App</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link disabled" to="/signup">Signup</Link>
            </li>
          </ul>
        </div>
      )
    }
  }
}

export default Nav
