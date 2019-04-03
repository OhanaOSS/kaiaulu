import React, { Component } from 'react'
import styled from "styled-components"
import contentEditable from '../../utils/contentEditable'
import {urlBuilder, contentPoster} from '../../../utils/contentHelper';
import * as AddressParser from 'parse-address';
import store from '../../../store'

const SpanedContent = styled.span`
  display: inline-flex;
  font-size: .75rem;
  width: 100%;
`

const Address = (data) => {
  console.log(data)
  if (data.address["sec-unit-num"] && data.address["sec-unit-type"]) {
    return (
    <div>
      <SpanedContent>{`${data.address["address-type"]}: ${data.address["number"]} ${data.address["prefix"]} ${data.address["street"]} ${data.address["type"]}`}</SpanedContent>
      <SpanedContent>{`${data.address["sec-unit-num"]} ${data.address["sec-unit-type"]}`}</SpanedContent>
      <SpanedContent>{`${data.address["city"]}, ${data.address["state"]} ${data.address["zip"]}`}</SpanedContent>
    </div>
    )
  } else {
    return (
    <div>
      <SpanedContent>{`${data.address["address-type"]}: ${data.address["number"]} ${data.address["prefix"]} ${data.address["street"]} ${data.address["type"]}`}</SpanedContent>
      <SpanedContent>{`${data.address["city"]}, ${data.address["state"]} ${data.address["zip"]}`}</SpanedContent>
    </div>
      )
  }
}

export default class Addresses extends Component {
  constructor(props){
    super(props);
    
    this.handleEdit = (callback) => {
      const parsedAddress = AddressParser.parseLocation(callback.value);
      console.log("parsed", parsedAddress)
      const url = urlBuilder({
        parent_id: store.getState().currentUser.data.id,
        parent_type: "members"
      })
      // city: "example"
      // number: "123"
      // sec_unit_num: "200"
      // sec_unit_type: "ste"
      // state: "tx"
      // street: "abc"
      // type: "St"
      let data = {
        "member": {
          "attributes":{
            "addresses": Object.assign({},this.props.data, {[callback.type]: parsedAddress})
          }
        }
      }
      console.log(callback)
      console.log("patch", data, url)
      contentPoster("patch", data, url).then(res => console.log(res))
    }
  }
  render() {
    let EditableText = contentEditable('div')
    console.log(this.props)
    const addressesHash = this.props.data
    const addresses = Object.keys(addressesHash).map((address, index) => (
      <>
      {console.log(addressesHash[address])}
      <EditableText address="true" value={<Address key={index} address={addressesHash[address]} />} onSave={this.handleEdit}/>
      </>
    ))
    return (
      <div>
        {addresses}
      </div>
    )
  }
}

