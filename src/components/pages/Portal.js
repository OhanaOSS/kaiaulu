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
            <h3>Portal</h3>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis mollitia eum praesentium maiores, facere sapiente aliquid? Explicabo nobis quos eius rerum cumque officia minus porro, accusantium eos nisi. Architecto, corrupti.</div>
          <ProfileSidebar sm={3}/>
          <Newsfeed sm={6}/>
          <NewsfeedSidebar/>
        </Wrapper>
    );
  }
}

export default Portal;