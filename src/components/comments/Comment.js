import React, { Component } from 'react'
import Comment from './Comment'
import {
  Row, Col,
  Card, Button, Image
} from 'react-bootstrap';
import store, {history} from '../../store';
import styled from "styled-components";
import Axios from 'axios';
import {contentFetcher, urlBuilder} from '../../utils/contentHelper';

const Wrapper = styled(Row)``

const ImgContainer = styled(Col)``

export default class Comments extends Component {
  

  render() {
    const content = this.props.comment.attributes
    const poster = this.props.comment.relationships.member.data
    if (!content.media) {
      return (
        <Wrapper>
          <ImgContainer sm={2}>
            <Image src="https://loremflickr.com/50/50/face,person" roundedCircle />
          </ImgContainer>
          <Card as={Col} sm={10}>
            <Card.Body>
              <Card.Text>{content.body}</Card.Text>
              {console.log(this.state)}
            </Card.Body>
            {console.log(this.props)}
          </Card>
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <ImgContainer sm={2}>
            <Image src="https://loremflickr.com/50/50/face,person" roundedCircle />
          </ImgContainer>
          <Card as={Col} sm={10}>
            <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${content.media}`} />
            <Card.Body>
              <Card.Text>{content.body}</Card.Text>
              {console.log(this.state)}
            </Card.Body>
            {console.log(this.props)}
          </Card>
        </Wrapper>
      )
    }
  }
}
