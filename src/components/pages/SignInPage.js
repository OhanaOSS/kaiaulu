import React, { Component } from 'react';
import SignInForm from '../../components/auth/SignInForm';

class SignInPage extends Component {
  render() {
    return (
        <section>
            <h3>SignInPage</h3>
            <SignInForm/>
        </section>
    );
  }
}

export default SignInPage;