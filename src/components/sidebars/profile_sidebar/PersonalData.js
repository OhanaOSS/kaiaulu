import React, { Component } from 'react'
import styled from 'styled-components'

const SpanedContent = styled.span`
  display: inline-flex;
  font-size: .75rem;
  width: 100%;
`

export default class PersonalData extends Component {
  render() {
    const attributes = this.props.data.attributes
    return (
      <div>
        <SpanedContent>{attributes.bio}</SpanedContent>
        <SpanedContent>Email: {attributes.email}</SpanedContent>
        <SpanedContent>Instagram: {attributes.instagram}</SpanedContent>
        <SpanedContent>Gender: {attributes.gender}</SpanedContent>
      </div>
    )
  }
}
