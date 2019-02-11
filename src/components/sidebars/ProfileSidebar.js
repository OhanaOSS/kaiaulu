import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button
} from 'react-bootstrap';
import styled from "styled-components";

const Wrapper = styled(Col)``

class ProfileSidebar extends Component {
  render() {
    return (
        <Wrapper sm={3}>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Wrapper>
    );
  }
}

export default ProfileSidebar;