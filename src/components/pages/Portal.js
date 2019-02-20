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
import NewsfeedSidebar from '../sidebars/NewsfeedSidebar'
import {fetchMembers} from '../../actions/memberActions'

const Wrapper = styled(Row)``

class Portal extends Component {

  componentWillMount() {
    this.props.fetchMembers();
  }

  render() {
    return (
        <Wrapper>
          <ProfileSidebar sm={3}/>
          <Newsfeed sm={6}/>
          <NewsfeedSidebar sm={3}/>
        </Wrapper>
    );
  }
}

Portal.propTypes = {
  fetchMembers: PropTypes.func.isRequired,
  members: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  members: state.members
});

export default connect(mapStateToProps, { fetchMembers })(Portal);