import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export class Nav extends Component {
  render() {
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

export default Nav
