import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signOut } from '../../actions/authActions';
import store from '../../store';

class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }


  onClick(e) {
    e.preventDefault();
    let temp_headers = store.getState().currentUser.currentHeader

    const signOutRequest = {
        "access-token": temp_headers["access-token"],
        "client": temp_headers["client"],
        "uid": temp_headers["uid"],
        'Content-Type': 'application/json'
    };

    this.props.signOut(signOutRequest);
  }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>Sign Out</button>
      </div>
    );
  }
}

SignOutButton.propTypes = {
    signOut: PropTypes.func.isRequired
};

export default connect(null, { signOut })(SignOutButton);
