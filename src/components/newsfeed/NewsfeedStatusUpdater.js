import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button, Form, InputGroup
} from 'react-bootstrap';
import styled from "styled-components";

const Wrapper = styled(Form)``

class NewsfeedStatusUpdater extends Component {
  render() {
    return (
        <Wrapper
            // noValidate
            // validated={validated}
            // onSubmit={e => this.handleSubmit(e)}
        >
        <Form.Row>
          <Form.Group as={Col} sm={12} controlId="validationCustom01">
            <Form.Control
              required
              name="status"
              as="textarea"
              rows="3"
              resize="vertical"
              placeholder="First name"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
            <Form.Group as={Col} sm={9} controlId="validationCustom02">
                <Form.Control
                required
                name="file-upload"
                type="file"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm={3} controlId="validationCustom02">
                <Button type="submit">Post Status</Button>
                <Form.Control.Feedback>Sucess!</Form.Control.Feedback>
            </Form.Group>
        </Form.Row>

        </Wrapper>
    );
  }
}

export default NewsfeedStatusUpdater;