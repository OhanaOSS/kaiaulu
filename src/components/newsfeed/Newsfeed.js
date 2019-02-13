import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button
} from 'react-bootstrap';
import NewsfeedStatusUpdater from './NewsfeedStatusUpdater'
import styled from "styled-components";
import Posts from '../posts/Posts';

const Wrapper = styled(Col)``

class Newsfeed extends Component {
  render() {
    return (
        <Wrapper sm={6}>
            <NewsfeedStatusUpdater/>
            <Posts/>>
        </Wrapper>
    );
  }
}

export default Newsfeed;