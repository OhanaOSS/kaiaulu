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

const ImgContainer = styled(Col)``
const PosterContainer = styled(Row)``

export default class CommentReply extends Component {
  constructor(props){
    super(props)
    this.handleEdit = this.handleEdit.bind(this)
  }
  handleEdit(callback){
    console.log(this.props, this.state)
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
    console.log(this.props)
    let EditableText = contentEditable('p')
    const meta = this.props.commentReply
    const content = this.props.commentReply.attributes
    const poster = findMemberData(this.props.commentReply.attributes["member-id"])
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
            <Reactions type={meta.type} id={meta.id}/>
          </Col>
        </Wrapper>
      )
  }
}
