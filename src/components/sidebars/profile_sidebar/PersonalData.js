import React, { Component } from 'react'
import styled from 'styled-components'
import contentEditable from '../../utils/contentEditable'
import {urlBuilder, contentPoster} from '../../../utils/contentHelper';

const SpanedContent = styled.span`
  display: inline-flex;
  font-size: .75rem;
  width: 100%;
`

export default class PersonalData extends Component {
  constructor(props){
    super(props);
    
    this.handleEdit = (callback) => {
      
      const url = urlBuilder({
        parent_id: this.props.data.id,
        parent_type: this.props.data.type
      })
      let data = {
        "member": {
          "attributes":{
            [callback.name]:	callback.value
          }
        }
      }
      console.log(callback)
      console.log("patch", data, url)
      contentPoster("patch", data, url).then(res => console.log(res))
    }
  }
  render() {
    let EditableText = contentEditable('p')
    const attributes = this.props.data.attributes
    return (
      <div>
        <SpanedContent>{<EditableText name={"bio"} onSave={this.handleEdit} value={attributes.bio}/>}</SpanedContent>
        <SpanedContent>Email: {<EditableText name={"email"} onSave={this.handleEdit} value={attributes.email}/>}</SpanedContent>
        <SpanedContent>Instagram: {<EditableText name={"instagram"} onSave={this.handleEdit} value={attributes.instagram}/>}</SpanedContent>
        <SpanedContent>Gender: {<EditableText name={"gender"} onSave={this.handleEdit} value={attributes.gender}/>}</SpanedContent>
      </div>
    )
  }
}
