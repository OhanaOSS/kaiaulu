import React, { Component } from 'react'
import Comment from './Comment'
import {
  Row, Col,
  Card, Button, Image
} from 'react-bootstrap';
import store, {history} from '../../store';
import styled from "styled-components";
import Axios from 'axios';
import CommentForm from './CommentForm'
import Reactions from '../reactions/Reactions';
import contentEditable from '../utils/contentEditable'
import {contentPoster, urlBuilder, findMemberData} from '../../utils/contentHelper';



const Wrapper = styled(Row)`
  width: 100%;
  margin-top: .75rem;
`
const PosterContainer = styled(Row)`
  display: inline-flex;
  width: 100%;
  & > h6 {
    flex: 1 0 20%;
  }
`

export default class CommentReply extends Component {
  constructor(props){
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
  }
  handleEdit(callback){
    
    const url = urlBuilder({
      parent_id: this.props.comment.id,
      parent_type: this.props.comment.type,
      request_type: this.props.commentReply.type,
      request_id: this.props.commentReply.id,
    })
    let data = {
      "comment_reply": {
        "attributes":{
          "body":	callback.value
        }
      }
    }
    contentPoster("patch", data, url)
  };
  
  render() {
    let EditableText = contentEditable('p')
    const currentUserID = store.getState().currentUser.data.id
    const meta = this.props.commentReply
    const content = this.props.commentReply.attributes
    const poster = findMemberData(this.props.commentReply.attributes["member-id"])
    if (currentUserID === this.props.commentReply.attributes["member-id"]) {
      return (
        <Wrapper>
          <PosterContainer as={Col} sm={{ span: 9, offset: 3 }}>
          <h6>{`${poster.name} ${poster.surname}`}</h6><button onClick={() => {this.props.handleDelete(meta.id)}}>Delete</button>
          </PosterContainer>
          <Card as={Col} sm={{ span: 9, offset: 3 }}>
            <Card.Body>
              <EditableText object={meta} onSave={this.handleEdit} value={content.body}/>
            </Card.Body>
          </Card>
          <Col md={{span: 9, offset: 3}}>
            <Reactions type={"CommentReply"} id={meta.id}/>
          </Col>
        </Wrapper>
      )
    } else {
      return (
        <Wrapper>
          <PosterContainer as={Col} sm={{ span: 9, offset: 3 }}>
            <h6>{`${poster.name} ${poster.surname}`}</h6>
          </PosterContainer>
          <Card as={Col} sm={{ span: 9, offset: 3 }}>
            <Card.Body>
              <EditableText object={meta} onSave={this.handleEdit} value={content.body}/>
            </Card.Body>
          </Card>
          <Col md={{span: 9, offset: 3}}>
            <Reactions type={"CommentReply"} id={meta.id}/>
          </Col>
        </Wrapper>
      ) 
    }
  }
}
