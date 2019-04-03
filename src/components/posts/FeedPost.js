import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removePost } from '../../actions/postActions';
import { REMOVE_POST } from '../../actions/types'
import { isEmpty } from '../../utils/dataHelpers'
import {
  Row, Col,
  Card, Button
} from 'react-bootstrap';
import Comments from '../comments/Comments';
import Reactions from '../reactions/Reactions';
import store, {history} from '../../store';
import styled from "styled-components";
import Axios from 'axios';
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
      console.log(res)
      if (isEmpty(res)) {
        console.log("fired")
        store.dispatch(removePost(this.props.meta.id))
      } else {
        console.error("post failed to delete", res)
      }
    })
  }

  handleEdit(callback){
    
    const url = urlBuilder({
      parent_id: this.props.post.id,
      parent_type: this.props.post.type
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
    let commentPromise = contentFetcher(this.props.post.links.comments)
    commentPromise.then(comments => this.setState({comments: comments}))
  }

  render() {
    let EditableText = contentEditable('p')
    const meta = this.props.meta
    const post = this.props.post
    const poster = this.props.poster
    console.log(this.props)
    if (post["member-id"] === store.getState().currentUser.data.id) {
      return (
        <Wrapper>
          <TopBarSpan><h6>{`${poster.name} ${poster.surname}`}</h6><button onClick={this.handleDelete}>Delete</button></TopBarSpan>
          <Card>
            <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${post.media}`} />
            <Card.Body>
                <EditableText object={meta} onSave={this.handleEdit} value={post.body}/>
                <Card.Text>{post.body}</Card.Text>
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

// FeedPost.propTypes = {
//   fetchPosts: PropTypes.func.isRequired,
//   posts: PropTypes.array.isRequired,
//   newPost: PropTypes.object
// };

// const mapStateToProps = state => ({
//   posts: state.posts.items,
//   newPost: state.posts.item
// });

// export default connect(mapStateToProps, { fetchPosts })(Posts);
export default FeedPost