import React, { Component } from 'react'

export class Nav extends Component {
  render() {
    return (
      <div>
        <ul className="nav">
          <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/app">App</a>
          </li>
          <li className="nav-item">
              <a className="nav-link" href="/about">About</a>
          </li>
          <li className="nav-item">
              <a className="nav-link disabled" href="/signup">Signup</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav
