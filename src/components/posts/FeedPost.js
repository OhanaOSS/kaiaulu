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
import Axios from 'axios';

const Wrapper = styled(Card)`
  margin-bottom: 2rem;
`


class FeedPost extends Component {

  componentWillMount() {
    console.log(this.props, `CWM`)
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props,nextProps, `CWRP`)
  }



  render() {
    const post = this.props.post
    return (
      <Wrapper>
        <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${post.media}`} />
        <Card.Body>
            <Card.Text>{post.body}</Card.Text>
            {console.log(this.props)}
        </Card.Body>
      </Wrapper>
    );
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