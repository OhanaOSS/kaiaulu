import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateToken } from '../actions/authActions';
import store from '../store';

class ReduxTokenTester extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClickTwo = this.onClickTwo.bind(this);
  }


  onClick(e) {
    e.preventDefault();
    let temp_headers = store.getState().currentUser.currentHeader

    const validateTokenRequest = {
        "access-token": temp_headers["access-token"],
        "client": temp_headers["client"],
        "uid": temp_headers["uid"],
        'Content-Type': 'application/json'
    };

    this.props.validateToken(validateTokenRequest);
  }
    onClickTwo(e) {
      e.preventDefault();

      const validateTokenRequest = {
      };

      this.props.validateToken(validateTokenRequest);
    }

  render() {
    return (
      <div>
        <button onClick={this.onClick}>Good Request</button>
        <button onClick={this.onClickTwo}>Bad Request</button>
      </div>
    );
  }
}

ReduxTokenTester.propTypes = {
  validateToken: PropTypes.func.isRequired
};

export default connect(null, { validateToken })(ReduxTokenTester);
