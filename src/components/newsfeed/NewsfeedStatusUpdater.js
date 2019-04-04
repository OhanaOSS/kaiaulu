import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button, Form, InputGroup
} from 'react-bootstrap';
import styled from "styled-components";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions'
import {contentPoster, fileUpload, urlBuilder } from '../../utils/contentHelper'
import store from '../../store'

const Wrapper = styled(Form)``
const Placeholders = ["How's your day going?", "What's going on in your life?", "Update your status here..."]
class NewsfeedStatusUpdater extends Component {

  constructor(props) {
    super(props);

    this.state = { 
        status: '',
        media: null,
        type: "post",
        validated: false,
        buttonActive: null
    };
  
  this.handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  this.handleUpload = (postResponse, attachments) => {
    var body = new FormData();
    const post = {
        "id": postResponse.id,
        "attributes": {
          "media": attachments[0]
        }
    }
    body.append("id", postResponse.id)
    body.append("media", attachments[0])
    fileUpload("put", body, postResponse.links.self).then(res => {
      return res
    })
  }


  this.handleUploadPrep = (files) => {
    this.setState({media: files})
  }
  
  this.submitWithMedia = (url) => {
    var form = new FormData();
    form.append("body", this.state.status)
    form.append("media", this.state.media[0])
    form.append("family_id", store.getState().currentUser.selectedFamily.familyID)
    form.append("member_id", store.getState().currentUser.data.id)
    fileUpload("post", form, url).then(res => {
      this.handleSucessPostProcess(res)
      return res
    })
  }

  this.submitWithOutMedia = (url) => {
    const data = {
      "post": {
        "attributes": {
          "body": this.state.status, 
          "family_id": store.getState().currentUser.selectedFamily.familyID,
          "member_id": store.getState().currentUser.data.id
        }
      }
    }
    contentPoster("post", data, url).then(res => {
      this.handleSucessPostProcess(res)
      return res
    })
  }

  this.handleSucessPostProcess = (res) => {
    store.dispatch(createPost(res))
    this.setState({
      status: '',
      validated: false,
      media: null
    })
  }

  this.handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    if (form.checkValidity() === true) {
        this.setState({ validated: true });
        const url = urlBuilder({parent_type: "post"})
        new Promise((resolve) => {
          if (this.state.media !== null) {
            resolve(this.submitWithMedia(url))
          } else {
            resolve(this.submitWithOutMedia(url))
          }
        }).then(e.currentTarget.reset())
    }
  }
}
  render() {
    const placeholder = Placeholders[Math.floor(Math.random()*Placeholders.length)]
    return (
        <Wrapper
          noValidate
          validated={this.state.validated}
          onSubmit={e => this.handleSubmit(e)}
        >
        <Form.Row>
          <Form.Group as={Col} sm={12} controlId="validationCustom01">
            <Form.Control
              required
              name="status"
              as="textarea"
              rows="3"
              resize="vertical"
              placeholder={placeholder}
              onChange={this.handleChange}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} sm={9} controlId="validationCustom02">
                <Form.Control
                name="file-upload"
                type="file"
                onChange={e => this.handleUploadPrep(e.currentTarget.files)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="validationCustom02">
                <StatusButton/>
                <Form.Control.Feedback>Sucess!</Form.Control.Feedback>
            </Form.Group>
        </Form.Row>

        </Wrapper>
    );
  }
}

NewsfeedStatusUpdater.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(null, { createPost })(NewsfeedStatusUpdater);

class StatusButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      activeButton: null
    }
  this.checkForValidSelectedFamily = this.checkForValidSelectedFamily.bind(this)
  }

  checkForValidSelectedFamily(){
    if (store.getState().currentUser.selectedFamily) {
      this.setState({
        activeButton: true
      })
    }
  }
  componentDidMount(){
    this.checkForValidSelectedFamily()
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState !== this.state || nextProps !== this.props){
      return true
    } else {
      return false
    }
  }

  render() {
    if (this.state.activeButton) {
      return (
        <div onPointerEnter={()=>{this.checkForValidSelectedFamily()}} onPointerLeave={()=>{this.checkForValidSelectedFamily()}} >
          <Button type="submit">Post Status</Button>
        </div>
      )
    } else {
      return (
        <div onPointerEnter={()=>{this.checkForValidSelectedFamily()}} onPointerLeave={()=>{this.checkForValidSelectedFamily()}} >
          <Button type="submit" disabled>Post Status</Button>
        </div>
      )
    }
  }
}