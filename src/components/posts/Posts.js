import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';
import {
  Row, Col,
  Card, Button
} from 'react-bootstrap';
import store, {history} from '../../store';
import styled from "styled-components";
import FeedPost from "./FeedPost";


class Posts extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    const postItems = this.props.posts.map(post => (
      <FeedPost
        key={post.id}
        meta={post}
        post={post.attributes}
        poster={post.relationships.member.data}
        relatedCommentsLink={post.relationships.comments.links.related}
        comments={post.relationships.comments.data}
      />
    ));
    return (
      <div>
        {postItems}
      </div>
    );
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

const mapStateToProps = state => ({
  posts: state.posts.items
});

export default connect(mapStateToProps, { fetchPosts })(Posts);
