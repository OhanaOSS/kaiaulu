import React, { Component } from 'react'
import Comment from './Comment'
import CommentForm from './CommentForm'


export default class Comments extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: [],
      commentsReactions: [],
      replyType: this.props.replyType
    }
    this.formHandler = this.formHandler.bind(this)
  }

  formHandler(callback){
    this.setState({
      comments: [...this.state.comments, callback]
    })
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


