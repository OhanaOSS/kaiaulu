import React, { Component } from 'react'
import Comment from './Comment'
import {
  Row, Col,
  Card, Button, Image
} from 'react-bootstrap';
import store, {history} from '../../store';
import styled from "styled-components";
import Axios from 'axios';
import {contentPoster, contentFetcher, urlBuilder, findMemberData} from '../../utils/contentHelper';
import CommentForm from './CommentForm'
import CommentReplies from './CommentReplies';
import Reactions from '../reactions/Reactions';
import contentEditable from '../utils/contentEditable'

const Wrapper = styled(Row)`
  margin-top: .75rem;
`

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
    this.handleEdit = this.handleEdit.bind(this)
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
    let commentRepliesPromise = contentFetcher(url)
    commentRepliesPromise.then(commentReplies => {
      this.setState({commentReplies: commentReplies})
    })
  }

  formHandler(callback){
    this.setState({
      commentReplies: [...this.state.commentReplies, callback]
    })
  }

  handleEdit(callback){
    const url = urlBuilder({
      parent_id: this.state.replyType.parentID,
      parent_type: this.state.replyType.parentType,
    })
    let data = {
      "comment": {
        "attributes":{
          "body":	callback.value
        }
      }
    }
    contentPoster("patch", data, url)
  }


  render() {
    
    const currentUserID = store.getState().currentUser.data.id
    const meta = this.props.comment
    const content = this.props.comment.attributes
    const poster = findMemberData(this.props.comment.attributes["member-id"])
    let EditableText = contentEditable('p')
    const commentReplies = this.state.commentReplies.map(commentReply => (
      <CommentReplies
        key={commentReply.id}
        commentReply={commentReply}
        comment={this.props.comment}
      />  
    ));
    const StyledTextContainer = styled(Card.Body)`
      p {
        margin-bottom: 0;
      }
    `
    if (!content.media && currentUserID === this.props.comment.attributes["member-id"]){
      return (
        <Wrapper>
          <PosterContainer as={Col} md={{span: 10, offset: 2}}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} md={{span: 10, offset: 2}}>
            <StyledTextContainer>
              <EditableText object={meta} onSave={this.handleEdit} value={content.body}/>
            </StyledTextContainer>
          </Card>
          <Col md={{span: 10, offset: 2}}>
            <Reactions type={meta.type} id={meta.id}/>
          </Col>
          <Col md={{span: 10, offset: 2}}>
          <CommentForm type={this.state.replyType} formHandler={this.formHandler}/>
          </Col>
          <Col md={{span: 10, offset: 2}}>
            {commentReplies}
          </Col>
        </Wrapper>
      )
    } else if (currentUserID === this.props.comment.attributes["member-id"]){
      return (
        <Wrapper>
          <PosterContainer as={Col} md={{span: 10, offset: 2}}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} md={{span: 10, offset: 2}}>
            <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${content.media}`} />
            <StyledTextContainer>
              <CommentText>{content.body}</CommentText>
            </StyledTextContainer>
          </Card>
          <Col md={{span: 10, offset: 2}}>
            <Reactions type={meta.type} id={meta.id}/>
          </Col>
          <Col md={{span: 10, offset: 2}}>
            <CommentForm type={this.state.replyType} formHandler={this.formHandler}/>
          </Col>
          {commentReplies}
        </Wrapper>
      )
    } else if (!content.media) {
      return (
        <Wrapper>
          <PosterContainer as={Col} md={{span: 10, offset: 2}}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} md={{span: 10, offset: 2}}>
            <StyledTextContainer>
              <CommentText>{content.body}</CommentText>
            </StyledTextContainer>
          </Card>
          <Col md={{span: 10, offset: 2}}>
            <Reactions type={meta.type} id={meta.id}/>
          </Col>
          <Col md={{span: 10, offset: 2}}>
          <CommentForm type={this.state.replyType} formHandler={this.formHandler}/>
          </Col>
          <Col md={{span: 10, offset: 2}}>
            {commentReplies}
          </Col>
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <PosterContainer as={Col} md={{span: 10, offset: 2}}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} md={{span: 10, offset: 2}}>
            <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${content.media}`} />
            <StyledTextContainer>
              <CommentText>{content.body}</CommentText>
            </StyledTextContainer>
          </Card>
          <Col md={{span: 10, offset: 2}}>
            <Reactions type={meta.type} id={meta.id}/>
          </Col>
          <Col md={{span: 10, offset: 2}}>
            <CommentForm type={this.state.replyType} formHandler={this.formHandler}/>
          </Col>
          {commentReplies}
        </Wrapper>
      )
    }
  }
}
