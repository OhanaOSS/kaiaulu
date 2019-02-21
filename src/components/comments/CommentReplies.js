import React, { Component } from 'react'
import Comment from './Comment'
import {
  Row, Col,
  Card, Button, Image
} from 'react-bootstrap';
import store, {history} from '../../store';
import styled from "styled-components";
import Axios from 'axios';
import {contentFetcher, urlBuilder, findMemberData} from '../../utils/contentHelper';
import CommentForm from './CommentForm'



const Wrapper = styled(Row)`
  width: 100%;
`

const ImgContainer = styled(Col)``
const PosterContainer = styled(Row)``
const CommentReplyText = styled(Card.Text)`
  font-size: 12px;
  color: blue;
`
export default class Comments extends Component {
  render() {
    const content = this.props.commentReply.attributes
    const poster = findMemberData(this.props.commentReply.attributes["member-id"])
      return (
        <Wrapper>
          <PosterContainer as={Col} sm={{ span: 9, offset: 3 }}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} sm={{ span: 9, offset: 3 }}>
            <Card.Body>
              <CommentReplyText>{content.body}</CommentReplyText>
            </Card.Body>
          </Card>
        </Wrapper>
      )
  }
}
