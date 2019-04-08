import React, { Component } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'
import {contentPoster, urlBuilder} from '../../utils/contentHelper';
import {isEmpty} from '../../utils/dataHelpers';

export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: [],
      commentsReactions: [],
      replyType: this.props.replyType
    }

  this.formHandler = (callback) => {
    this.setState({
      comments: [...this.state.comments, callback]
    })
  }
  this.handleDelete = (id) => {
    const url = urlBuilder({
      parent_type: this.state.replyType.parentType,
      parent_id: this.state.replyType.parentID,
      request_type: this.state.replyType.requestType,
      request_id: id
    })
    let data = {
      id: id
    }
    contentPoster("delete", data, url).then(res => {
      if (isEmpty(res)) {
        let newState = this.state.comments.filter(i => i["id"] !== id.toString())
        this.setState({comments: newState})
      } else {
        console.error("Comment failed to delete", res)
      }
    })
  }
}

  componentWillReceiveProps(nextProps){
    if (nextProps.comments !== this.props.comments) {
      this.setState({
        comments: nextProps.comments
      })
    }
  }

  render() {
    const comments = this.state.comments.map(comment => (
      <Comment 
        key={comment.id}
        comment={comment}
        handleDelete={this.handleDelete}  
      />
    ));
    return (
      <div>
        <CommentForm type={this.state.replyType} formHandler={this.formHandler}/>
        {comments}
      </div>
    );
  }
}


