import React, { Component } from 'react';
import { removePost } from '../../actions/postActions';
import { isEmpty } from '../../utils/dataHelpers'
import {Card} from 'react-bootstrap';
import Comments from '../comments/Comments';
import Reactions from '../reactions/Reactions';
import store from '../../store';
import styled from "styled-components";
import {contentFetcher, urlBuilder, contentPoster} from '../../utils/contentHelper';
import contentEditable from '../utils/contentEditable'

const Wrapper = styled.div`
  margin-bottom: 2rem;
`

const TopBarSpan = styled.span`
  display: inline-flex;
  width: 100%;
  & > h6 {
    flex: 1 0 20%;
  }
`

class FeedPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: [],
      replyType: {
        parentID: this.props.meta.id,
        parentType: this.props.meta.type,
        requestType: "comment"
      }
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete = () => {
    const url = urlBuilder({
      parent_type: this.props.meta.type,
      parent_id: this.props.meta.id
    })
    contentPoster("delete", {}, url).then(res => {
      if (isEmpty(res)) {
        store.dispatch(removePost(this.props.meta.id))
      } else {
        console.error("post failed to delete", res)
      }
    })
  }

  handleEdit(callback){
    const url = urlBuilder({
      parent_id: this.props.meta.id,
      parent_type: this.props.meta.type
    })
    let data = {
      "post": {
        "attributes":{
          "body":	callback.value
        }
      }
    }
    contentPoster("patch", data, url)
  };

  async componentDidMount() {
    if (this.props.post.links !== undefined && this.props.post.links.comments !== undefined) {
      let commentPromise = contentFetcher(this.props.post.links.comments)
      commentPromise.then(comments => this.setState({comments: comments})) 
    }
  }

  render() {
    let EditableText = contentEditable('p')
    const meta = this.props.meta
    const post = this.props.post
    const poster = this.props.poster
    if (post.media === null) {
      if (post["member-id"] === store.getState().currentUser.data.id) {
        return (
          <Wrapper>
            <TopBarSpan><h6>{`${store.getState().currentUser.data.name} ${store.getState().currentUser.data.surname}`}</h6><button onClick={this.handleDelete}>Delete</button></TopBarSpan>
            <Card>
              <Card.Body>
                  <EditableText object={meta} onSave={this.handleEdit} value={post.body}/>
              </Card.Body>
            </Card>
            <Reactions type={meta.type} id={meta.id}/>
            <Comments comments={this.state.comments} replyType={this.state.replyType}/>
          </Wrapper>
        );
      } else {
        return (
          <Wrapper>
            <TopBarSpan><h6>{`${poster.name} ${poster.surname}`}</h6></TopBarSpan>
            <Card>
              <Card.Body>
                  <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
            <Reactions type={meta.type} id={meta.id}/>
            <Comments comments={this.state.comments} replyType={this.state.replyType}/>
          </Wrapper>
        );
      }
    } else {
      if (post["member-id"] === store.getState().currentUser.data.id) {
        return (
          <Wrapper>
            <TopBarSpan><h6>{`${store.getState().currentUser.data.name} ${store.getState().currentUser.data.surname}`}</h6><button onClick={this.handleDelete}>Delete</button></TopBarSpan>
            <Card>
              <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${post.media}`} />
              <Card.Body>
                  <EditableText object={meta} onSave={this.handleEdit} value={post.body}/>
              </Card.Body>
            </Card>
            <Reactions type={meta.type} id={meta.id}/>
            <Comments comments={this.state.comments} replyType={this.state.replyType}/>
          </Wrapper>
        );
      } else {
        return (
          <Wrapper>
            <TopBarSpan><h6>{`${poster.name} ${poster.surname}`}</h6></TopBarSpan>
            <Card>
              <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${post.media}`} />
              <Card.Body>
                  <Card.Text>{post.body}</Card.Text>
              </Card.Body>
            </Card>
            <Reactions type={meta.type} id={meta.id}/>
            <Comments comments={this.state.comments} replyType={this.state.replyType}/>
          </Wrapper>
        );
      }
    }
  }
}

export default FeedPost