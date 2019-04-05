import React, { Component } from 'react';
import {
  Container, Row, Col,
  Card, Form
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from "styled-components";
import ProfileSidebar from '../sidebars/ProfileSidebar'
import Newsfeed from '../newsfeed/Newsfeed'
import AuthSidebar from '../sidebars/AuthSidebar'
import {fetchMembers, setFamilyMembers} from '../../actions/memberActions'

const Wrapper = styled(Row)``

class Portal extends Component {

  componentWillMount() {
    this.props.fetchMembers();
    this.props.setFamilyMembers();
  }

  render() {
    return (
        <Wrapper>
          <ProfileSidebar sm={3}/>
          <Newsfeed sm={6}/>
          <AuthSidebar members={this.props.members} sm={3}/>
        </Wrapper>
    );
  }
}

Portal.propTypes = {
  setFamilyMembers: PropTypes.func.isRequired,
  fetchMembers: PropTypes.func.isRequired,
  members: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  members: state.members
});

export default connect(mapStateToProps, {setFamilyMembers, fetchMembers })(Portal);