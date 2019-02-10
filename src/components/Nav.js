import React, { Component } from 'react'

export class Nav extends Component {
  render() {
    return (
      <div>
        <ul class="nav">
          <li class="nav-item">
              <a class="nav-link active" href="/">Home</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/app">App</a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/about">About</a>
          </li>
          <li class="nav-item">
              <a class="nav-link disabled" href="/signup">Signup</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default Nav
