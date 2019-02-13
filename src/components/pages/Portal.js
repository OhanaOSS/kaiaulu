import React, { Component } from 'react';
import {
  Container, Row, Col,
  Card, Form
} from 'react-bootstrap';
import styled from "styled-components";
import ProfileSidebar from '../sidebars/ProfileSidebar'
import Newsfeed from '../newsfeed/Newsfeed'
import NewsfeedSidebar from '../sidebars/NewsfeedSidebar'

const Wrapper = styled(Row)``

class Portal extends Component {
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

export default Portal;