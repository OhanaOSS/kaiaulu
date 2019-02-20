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
import CommentForm from './CommentForm'



const Wrapper = styled(Row)``

const ImgContainer = styled(Col)``
const PosterContainer = styled(Row)``

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      commentReplies: [],
      commentRepliesreactions: []
    }
  }

//   comment:
// attributes: {body: "Sed cum non. Molestiae veniam est.", edit: null, commentable-type: "Post", commentable-id: 10, member-id: 11, …}
// id: "22"
// relationships:
  // comment-replies:
    // data: Array(3)
      // 0: {id: "26", type: "comment-reply"}
      // 1: {id: "27", type: "comment-reply"}
      // 2: {id: "28", type: "comment-reply"}
// type: "comment"

  // componentDidMount() {

  //   let commentRepliesPromise = contentFetcher(urlBuilder({
  //     parent_id: this.props.comment.id,
  //     parent_type: "comments",
  //     request_type: "comment_replies"
  //   }))
  //   commentRepliesPromise.then(commentReplies => this.setState({commentReplies: commentReplies}))
  // }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props,nextProps, `CWRP`)
  }


  render() {
    const content = this.props.commentReply.attributes
    const poster = this.props.commentReply.relationships.member.data

      return (
        <Wrapper>
          <PosterContainer as={Col} sm={{ span: 10, offset: 2 }}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} sm={{ span: 10, offset: 2 }}>
            <Card.Body>
              <Card.Text>{content.body}</Card.Text>
            </Card.Body>
          </Card>
        </Wrapper>
      )
  }
}
