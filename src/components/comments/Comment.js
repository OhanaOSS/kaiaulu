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
import CommentReplies from './CommentReplies';


const Wrapper = styled(Row)``

const ImgContainer = styled(Col)``
const PosterContainer = styled(Row)``
const CommentText = styled(Card.Text)`
  color: red;
`

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      commentReplies: [],
      commentRepliesreactions: [],
      replyType: {
        parentID: this.props.comment.id,
        parentType: "comment",
        requestType: "comment_reply"
      }
    }
    this.formHandler = this.formHandler.bind(this)
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
    const url = urlBuilder({
      parent_id: this.state.replyType.parentID,
      parent_type: this.state.replyType.parentType,
      request_type: this.state.replyType.requestType
    })
    // console.log(url)
    let commentRepliesPromise = contentFetcher(url)
    // console.log(commentRepliesPromise)
    commentRepliesPromise.then(commentReplies => {
      this.setState({commentReplies: commentReplies})
      // console.log(commentReplies)
    })
  }

  formHandler(callback){
    this.setState({
      commentReplies: [...this.state.commentReplies, callback]
    })
  }


  render() {
    const content = this.props.comment.attributes
    const poster = findMemberData(this.props.comment.attributes["member-id"])
    const commentReplies = this.state.commentReplies.map(commentReply => (
      <CommentReplies
        key={commentReply.id}
        commentReply={commentReply}
        comment={this.props.comment}
      />  
    ));
    // {console.log("Comment.js State:", this.state, "\nComment.js Props:", this.props)}
    if (!content.media) {
      return (
        <Wrapper>
          <PosterContainer as={Col} sm={{ span: 9, offset: 3 }}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} sm={{ span: 9, offset: 3 }}>
            <Card.Body>
              <CommentText>{content.body}</CommentText>
            </Card.Body>
          </Card>
          <CommentForm type={this.state.replyType} formHandler={this.formHandler}/>
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
              <CommentText>{content.body}</CommentText>
            </Card.Body>
          </Card>
          <Col sm={{ span: 10, offset: 2 }}>
            <CommentForm type={this.state.replyType} formHandler={this.formHandler}/>
          </Col>
          {commentReplies}
        </Wrapper>
      )
    }
  }
}
