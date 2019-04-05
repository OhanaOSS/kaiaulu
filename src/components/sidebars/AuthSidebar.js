import React, { Component } from 'react';
import {
Col} from 'react-bootstrap';
import styled from "styled-components";
import MemberToAuth from './auth_sidebar/MemberToAuth'

const Wrapper = styled(Col)``

class AuthSidebar extends Component {


  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props) {
      return true
    }
  }

  render() {
    console.log(this.props)
    console.log(this.props.members.familyMembers.filter(m => m.attributes["authorized-at"] === null))
    // const membersToAuth = this.props.members.familyMembers.filter(m => m.attributes["authorized-at"] === null)
    let list = this.props.members.familyMembers.map((familyMember, index) => (
      <MemberToAuth key={index} familyMember={familyMember} memberProfile={this.props.members.items.filter(i => i.id === familyMember.attributes["member-id"].toString())[0]}/>
    ))
    if (this.props.members.familyMembers.length > 0) {
      return (
        <Wrapper sm={3}>
          {list}
        </Wrapper>
    ); 
    } else {
      return <Wrapper sm={3}/>
    }
  }
}

export default AuthSidebar;