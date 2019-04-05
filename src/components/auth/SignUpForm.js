import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signUpWithNewFamily } from '../../actions/authActions';
import SelectFamily from './SelectFamily'

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        baseUrl: '',
        familyName: '',
        familyID: null,
        name: '',
        surname: '',
        email: '',
        password: ''
    };

  this.onChange = (e) => {
    console.log(this.state)
    this.setState({ [e.target.name]: e.target.value });
  }

  this.onSubmit = (e) => {
    console.log(this.state)
    e.preventDefault();
    let signUpCredentials

    if (this.props.type === "new") {
      signUpCredentials = {
        baseUrl: this.state.baseUrl,
        familyName: this.state.familyName,
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        password: this.state.password
      };
    } else if (this.props.type === "existing") {
      signUpCredentials = {
        baseUrl: this.state.baseUrl,
        familyName: this.state.familyName,
        familyID: this.state.familyID,
        name: this.state.name,
        surname: this.state.surname,
        email: this.state.email,
        password: this.state.password
      };
    }

    this.props.signUpWithNewFamily(signUpCredentials);
  }
  this.handleFamilyData = (data) => {
    if (data.familyName !== undefined && data.familyID !== undefined) {
      this.setState({ 
        familyName: data.familyName,
        familyID: data.familyID
       });
    }else if (data.familyName !== undefined) {
      this.setState({ 
        familyName: data.familyName
       });
    }
    console.log(this.state, data)
  }
}

  render() {
    if (this.props.type === "new") {
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
    } else if (this.props.type === "existing") {
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
            <SelectFamily auth="unauthorized" baseUrl={this.state.baseUrl} familyData={this.handleFamilyData}/>
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
}

SignUpForm.propTypes = {
    signUpWithNewFamily: PropTypes.func.isRequired
};

export default connect(null, { signUpWithNewFamily })(SignUpForm);
