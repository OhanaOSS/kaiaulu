import React, { Component } from 'react'
import styled from 'styled-components'

const SpanedContent = styled.span`
  display: inline-flex;
  font-size: .75rem;
  width: 100%;
`

export default class Contacts extends Component {
  render() {
    console.log(this.props.data)
    const contactObj = this.props.data
    const contacts = Object.keys(contactObj).map((type, index) => (
      <SpanedContent key={index}>{`${type}: ${contactObj[type]}`}</SpanedContent>
    ))
    return (
      <div>
        {contacts}
      </div>
    )
  }
}
