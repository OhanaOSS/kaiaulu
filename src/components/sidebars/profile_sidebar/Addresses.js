import React, { Component } from 'react'
import styled from "styled-components"

const SpanedContent = styled.span`
  display: inline-flex;
  font-size: .75rem;
  width: 100%;
`

const Address = (data) => {
  console.log(data.address)
  if (data.address["line-2"]) {
    return (
    <div>
      <SpanedContent>{data.address["line-1"]}</SpanedContent>
      <SpanedContent>{data.address["line-2"]}</SpanedContent>
      <SpanedContent>{`${data.address["city"]}, ${data.address["state"]} ${data.address["postal"]}`}</SpanedContent>
    </div>
    )
  } else {
    return (
    <div>
      <SpanedContent>{data.address["line-1"]}</SpanedContent>
      <SpanedContent>{`${data.address["city"]}, ${data.address["state"]} ${data.address["postal"]}`}</SpanedContent>
    </div>
      )
  }
}

export default class Addresses extends Component {
  render() {
    const addressesHash = this.props.data
    const addresses = Object.keys(addressesHash).map((address, index) => (
      <>
      {console.log(addressesHash[address])}
      <Address key={index} address={addressesHash[address]} />
      </>
    ))
    return (
      <div>
        {addresses}
      </div>
    )
  }
}

