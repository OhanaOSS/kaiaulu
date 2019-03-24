import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button, Form, InputGroup
} from 'react-bootstrap';
import styled from "styled-components";
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleUploadPrep = this.handleUploadPrep.bind(this)
    this.configureData = this.configureData.bind(this)
  }
  
  configureData(s) {
    const data = {
      "post": {
        "attributes": {
          "body": s.status, 
          "family_id": store.getState().currentUser.selectedFamily.familyID,
          "member_id": store.getState().currentUser.data.id
        }
      }
    }
    return data
  }
  
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpload(postResponse, attachments){
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


  handleUploadPrep(files){
    this.setState({media: files})
  }
  
  
  handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    if (form.checkValidity() === true) {
        this.setState({ validated: true });
        contentPoster("post", this.configureData(this.state),urlBuilder({
            parent_type: "post"
       })).then(res => {
            this.handleUpload(res, this.state.media)
          }).then(res =>{
            this.setState({
              status: '',
              validated: false,
              media: null
            })
            form.reset();
          })
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

export default NewsfeedStatusUpdater;

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