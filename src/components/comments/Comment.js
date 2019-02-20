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
import CommentReplies from './CommentReplies';


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

async componentDidMount() {
    let commentRepliesPromise = contentFetcher(urlBuilder({
      parent_id: this.props.comment.id,
      parent_type: "comments",
      request_type: "comment_replys"
    }))
    console.log(commentRepliesPromise)
    commentRepliesPromise.then(commentReplies => {
      this.setState({commentReplies: commentReplies})
      console.log(commentReplies)
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props,nextProps, `CWRP`)
  }


  render() {
    const content = this.props.comment.attributes
    const poster = this.props.comment.relationships.member.data
    const commentReplies = this.state.commentReplies.map(commentReply => (
      <CommentReplies
        key={commentReply.id}
        commentReply={commentReply}
        comment={this.props.comment}
      />  
    ));

    if (!content.media) {
      return (
        <Wrapper>
          <Col sm={{ span: 10, offset: 2 }}>{`${poster.name} ${poster.surname}`}</Col>
          <Card as={Col} sm={{span: 10, offset: 2}}>
            <Card.Body>
              <Card.Text>{content.body}</Card.Text>
            </Card.Body>
          </Card>
          <CommentForm/>
          {commentReplies}
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <PosterContainer as={Col} sm={{ span: 10, offset: 2 }}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} sm={{ span: 10, offset: 2 }}>
            <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${content.media}`} />
            <Card.Body>
              <Card.Text>{content.body}</Card.Text>
            </Card.Body>
          </Card>
          <Col sm={{ span: 10, offset: 2 }}>
            <CommentForm/>
          </Col>
          {commentReplies}
        </Wrapper>
      )
    }
  }
}
