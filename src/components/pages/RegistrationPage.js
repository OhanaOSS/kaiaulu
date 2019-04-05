import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap'
import SignUpForm from '../auth/SignUpForm'

class RegistrationPage extends Component {
  render() {
    return (
        <section>
            <h3>Signup Page</h3>
            <Tabs defaultActiveKey="existing">
              <Tab eventKey="new" title="Signup with New Family">
                <SignUpForm type="new"/>
              </Tab>
              <Tab eventKey="existing" title="Signup with Existing Family">
                <SignUpForm type="existing"/>
              </Tab>
            </Tabs>
        </section>
    );
  }
}

export default RegistrationPage;