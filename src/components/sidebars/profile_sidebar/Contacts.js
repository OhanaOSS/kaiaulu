import React, { Component } from 'react';
import styled from 'styled-components';
import contentEditable from '../../utils/contentEditable';
import {urlBuilder, contentPoster} from '../../../utils/contentHelper';
import store from '../../../store';
import { isEmpty } from '../../../utils/dataHelpers'
import SmallAddSquare from '../../utils/SmallAddSquare'
import {Modal, Button, Form, DropdownButton, Dropdown, FormControl, InputGroup} from 'react-bootstrap'


const SpanedContent = styled.span`
  display: inline-flex;
  font-size: .75rem;
  width: 100%;
`
export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      validated: false
    };

    this.handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setState({ validated: true });
    }

    this.handleClose = () => {
      this.setState({ show: false });
    }

    this.handleShow = () => {
      this.setState({ show: true });
    }


    this.handleEdit = (callback) => {
      const url = urlBuilder({
        parent_id: store.getState().currentUser.data.id,
        parent_type: "members"
      })
      console.log("callback", callback)
      if (callback.value === null) {
        let newContactArr = [...this.props.data]
        console.log(newContactArr)
        newContactArr = newContactArr.filter(i => !isEmpty(i) && (Object.keys(i)[0] !== callback.type))
        console.log(newContactArr)
        newContactArr = [...newContactArr]
        console.log(newContactArr)
        let data = {
          "member": {
            "attributes":{
              "contacts": newContactArr
            }
          }
        }
        console.log(callback)
        console.log("patch", data, url)
        contentPoster("patch", data, url).then(res => console.log(res))
      } else {
        let newContactArr = [...this.props.data]
        console.log(newContactArr)
        newContactArr = newContactArr.filter(i => !isEmpty(i) && (Object.keys(i)[0] !== callback.type))
        console.log(newContactArr)
        newContactArr = [...newContactArr, {[callback.type]: callback.value}]
        console.log(newContactArr)
        let data = {
          "member": {
            "attributes":{
              "contacts": newContactArr
            }
          }
        }
        console.log(callback)
        console.log("patch", data, url)
        contentPoster("patch", data, url).then(res => console.log(res))
      }
    }
  }
  render() {
    const { validated } = this.state;
    let EditableText = contentEditable('p')
    console.log(this.props.data)
    const contactArray = this.props.data
    const contacts = contactArray.map((obj, index) => {
      if (!obj.isEmpty) {
       return (
        <SpanedContent key={index}>
          <EditableText contact="true" value={<p key={index}>{`${Object.keys(obj)[0]}: ${Object.values(obj)[0]}`}</p>} onSave={this.handleEdit}/>
        </SpanedContent>
       ) 
      }
    })
    return (
      <div>
        {contacts}
      </div>
    )
  }
}
