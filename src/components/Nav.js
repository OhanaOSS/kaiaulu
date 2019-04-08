import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import store from '../store';
import SignOutButton from './auth/SignOutButton';
import SelectFamily from './auth/SelectFamily'
import styled from 'styled-components';
import {Nav} from 'react-bootstrap'

const StyledNav = styled(Nav)`
  a:nth-child(3) {
    margin-left: auto;
    margin-right: 15px;
  }
`
export class NavBar extends Component {
  render() {
    if (store.getState().currentUser.isAuthenticated){
      return (
        <div>
          <StyledNav>
            <Nav.Link>
                <Link className="nav-link" to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
                <Link className="nav-link" to="/app">App</Link>
            </Nav.Link>
            <Nav.Link>
                <SelectFamily auth="authorized"/>
            </Nav.Link>
            <Nav.Link>
                <SignOutButton/>
            </Nav.Link>
          </StyledNav>
        </div>
      )
    } else {
      return (
        <div>
          <Nav>
            <Nav.Link>
                <Link className="nav-link" to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
                <Link className="nav-link" to="/app">App</Link>
            </Nav.Link>
            <Nav.Link>
                <Link className="nav-link" to="/signup">Signup</Link>
            </Nav.Link>
            <Nav.Link>
                <Link className="nav-link" to="/app">Sign in</Link>
            </Nav.Link>
          </Nav>
        </div>
      )
    }
  }
}

export default NavBar
