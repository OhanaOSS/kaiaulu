import React, { Component } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'


export default class Comments extends Component {

  render() {
    const comments = this.props.comments.map(comment => (
      <Comment 
        key={comment.id}
        comment={comment}  
      />
    ));
    return (
      <div>
        <CommentForm/>
        {comments}
      </div>
    );
  }
}


