import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions/postActions';
import {
  Row, Col,
  Card, Button
} from 'react-bootstrap';
import Comments from '../comments/Comments';
import store, {history} from '../../store';
import styled from "styled-components";
import Axios from 'axios';
import {contentFetcher, urlBuilder} from '../../utils/contentHelper';

const Wrapper = styled.div`
  margin-bottom: 2rem;
`


class FeedPost extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: [],
      reactions: [],
      replyType: {
        parentID: this.props.meta.id,
        // currently singular as "post"
        parentType: this.props.meta.type,
        requestType: "comment"
      }
    }
  }

  async componentDidMount() {
    let commentPromise = contentFetcher(this.props.post.links.comments)
    commentPromise.then(comments => this.setState({comments: comments}))
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props,nextProps, `CWRP`)
  }



  render() {
    const post = this.props.post
    const poster = this.props.poster
    return (
      <Wrapper>
        <h6>{`${poster.name} ${poster.surname}`}</h6>
        <Card>
          <Card.Img variant="top" src={`http://${store.getState().currentUser.baseUrl}${post.media}`} />
          <Card.Body>
              <Card.Text>{post.body}</Card.Text>
              {console.log("FeedPost State:", this.state, "\nFeedPost Props:", this.props)}
          </Card.Body>
        </Card>
        {/* <Reactions type={"post"} id={post.id}/> */}
        <Comments comments={this.state.comments} replyType={this.state.replyType}/>
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