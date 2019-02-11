import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signIn } from '../../actions/authActions';

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseUrl: '',
      email: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const signInCredentials = {
      baseUrl: this.state.baseUrl,
      email: this.state.email,
      password: this.state.password
    };

    this.props.signIn(signInCredentials)
  }

  render() {
    return (
      <div>
        <h1>SignIn</h1>
        <form onSubmit={this.onSubmit}>
        <div>
            <label>Base URL: </label>
            <br />
            <input
              type="text"
              name="baseUrl"
              onChange={this.onChange}
              value={this.state.baseUrl}
            />
          </div>
          <div>
            <label>Email: </label>
            <br />
            <input
              type="text"
              name="email"
              onChange={this.onChange}
              value={this.state.email}
            />
          </div>
          <br />
          <div>
            <label>Password: </label>
            <br />
            <input
              type="text"
              name="password"
              onChange={this.onChange}
              value={this.state.password}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(null, { signIn })(SignInForm);
