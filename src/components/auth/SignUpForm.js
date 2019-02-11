import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpWithNewFamily } from '../actions/authActions';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        baseUrl: '',
        familyName: '',
        name: '',
        surname: '',
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

    const signUpCredentials = {
      baseUrl: this.state.baseUrl,
      familyName: this.state.familyName,
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      password: this.state.password
    };

    this.props.signUpWithNewFamily(signUpCredentials);
  }

  render() {
    return (
      <div>
        <small>SignIn</small>
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
            <label>familyName: </label>
            <br />
            <input
              type="text"
              name="familyName"
              onChange={this.onChange}
              value={this.state.familyName}
            />
          </div>
          <div>
            <label>name: </label>
            <br />
            <input
              type="text"
              name="name"
              onChange={this.onChange}
              value={this.state.name}
            />
          </div>
          <div>
            <label>surname: </label>
            <br />
            <input
              type="text"
              name="surname"
              onChange={this.onChange}
              value={this.state.surname}
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

SignUpForm.propTypes = {
    signUpWithNewFamily: PropTypes.func.isRequired
};

export default connect(null, { signUpWithNewFamily })(SignUpForm);
