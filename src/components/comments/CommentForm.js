import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button, Form, InputGroup
} from 'react-bootstrap';
import styled from "styled-components";
import {contentPoster, urlBuilder } from '../../utils/contentHelper'
import { capitalizeFirstLetter } from '../../utils/dataHelpers'
import store from '../../store'

const Wrapper = styled(Form)``
const StyledFormGroup = styled(Form.Group)`
  display: inline-flex;
  button {
    margin-left: .25rem;
  }
`

export default class CommentForm extends Component {

    constructor(props) {
        super(props);
    
        this.state = { 
            status: '',
            attachment: {},
            type: this.props.type,
            validated: false,
            method: "post"
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.configureData = this.configureData.bind(this)
      }
      
      configureData(s) {
        const state = s
        const member = store.getState().currentUser.data
        switch (s.type.requestType) {
            case "comment":
                return {
                    comment: {
                        attributes:{
                            body:	state.status,
                            member_id:	member.id,
                            commentable_type: capitalizeFirstLetter(state.type.parentType),
                            commentable_id: state.type.parentID
                        }
                    }
                }
            case "comment_reply":
                return {
                    comment_reply: {
                        attributes: {
                          body: state.status,
                          member_id:  member.id,
                          comment_id: state.type.parentID
                        }
                    }
                }

            default:
                return new Error(`${s.type.requestType} did not match a case for configureData`)
        }
      }
      
      handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      
      handleSubmit(e) {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
          e.stopPropagation();
        }
        if (form.checkValidity() === true) {
            this.setState({ validated: true });
            contentPoster(this.state.method,this.configureData(this.state),urlBuilder({
                parent_id: this.state.type.parentID,
                parent_type: this.state.type.parentType,
                request_type: this.state.type.requestType
           })).then(res => {
                this.setState({
                    status: '',
                    attachment: {},
                    type: this.props.type,
                    validated: false,
                    method: "post"
                })
                form.reset();
                // hands data up to Comment.js
                this.props.formHandler(res)
           });
        }
      }

  render() {
    const { validated } = this.state;
    return (
        <Wrapper
            noValidate
            validated={validated}
            onSubmit={e => this.handleSubmit(e)}
        >
        <Form.Row>
          <StyledFormGroup as={Col} sm={12} controlId="validationCustom01">
            <Form.Control
              required
              name="status"
              as="textarea"
              value={this.state.status}
              rows="1"
              resize="vertical"
              placeholder="Comment here..."
              onChange={this.handleChange}
            />
            <Form.Control.Feedback>Submitted!</Form.Control.Feedback>
            <Button className={'btn-sm'} type="submit">Post Comment</Button>
          </StyledFormGroup>
        </Form.Row>
        </Wrapper>
    );
  }
}