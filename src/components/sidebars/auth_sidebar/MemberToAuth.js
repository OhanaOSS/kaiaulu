import React, { Component } from 'react';
import store from '../../../store';
import {
  Row, Col,
  Card, Button, Image, SplitButton, Dropdown
} from 'react-bootstrap';
import styled from 'styled-components';
import { contentPoster, urlBuilder } from '../../../utils/contentHelper'

const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
  margin: 0 auto;
`
const User = styled.span`
  display: inline-flex;
  margin-right: 5px;
  width: 100%;
`

const AuthProfile = styled.div`
  margin-bottom: 20px;
`

export default class MemberToAuth extends Component {
  constructor(props){
    super(props)
    this.state = {
      familyMemberData: null,
      profile: null,
      authorized: false
    }
    this.handleRoleChange = (e) => {
      console.log()
      const data = {
        "family_member": {
          "user_role": e.target.getAttribute("type")
        }
      }
      contentPoster("patch", data, this.state.familyMemberData.links.self).then(res => this.setState({familyMemberData: res}))
    }
    this.handleUpdate = (res) => {
      console.log(this.state.familyMemberData, res)
      new Promise(resolve => {
        resolve(this.setState({familyMemberData: res}))
      }).then(this.isAuthorized)
    }
    this.isAuthorized = () => {
      if (this.state.familyMemberData.attributes["authorized-at"] !== null) {
        this.setState({authorized: true})
      } else if (this.state.authorized === true) {
        this.setState({authorized: false})
      }
    }
  }

  componentWillMount(){
    console.log(this.props)
    this.setState({
      familyMemberData: this.props.familyMember
    })
  }

  componentDidMount(){
    this.isAuthorized()
    console.log(store.getState().members.items)
    this.setState({
      familyMemberData: this.props.familyMember,
      profile: store.getState().members.items.filter(i => i.id === this.props.familyMember.attributes["member-id"].toString())
    })
  }


  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props) {
      if (nextProps.memberProfile !== this.props.memberProfile) {
        this.setState({
          profile: nextProps.memberProfile
        })
      }
      if (nextProps.familyMember !== this.props.familyMember) {
        this.setState({
          familyMemberData: nextProps.memberProfile
        })
      }
      return true
    }
  }

  render() {
    let {authorized} = this.isAuthorized
    if (this.props.memberProfile === undefined) {
      return <></>
    } else {
      console.log(this.props, this.state)

      const dropDownOptions = ["user", "admin", "owner"].map((attr, index) => (
        <Dropdown.Item onClick={this.handleRoleChange} key={index} eventKey={index} type={attr}>{attr}</Dropdown.Item>
      ))
      return (
        <AuthProfile>
          <span><StyledImage src={`http://${store.getState().currentUser.baseUrl}/${this.props.memberProfile.attributes.avatar}`} roundedCircle /></span>
          <User><h6>{`${this.props.memberProfile.attributes.name} ${this.props.memberProfile.attributes.surname}`}</h6> <small>{`(${this.state.familyMemberData.attributes["user-role"]})`}</small></User>
          <AuthorizeButton authorized={this.state.authorized} url={this.state.familyMemberData.links.self} resetState={this.handleUpdate}/>
          <SplitButton
            drop={"down"}
            variant="secondary"
            title={"Change Role"}
            id={`dropdown-button-drop-down`}
            key={"down"}
            size="sm"
          >
            {dropDownOptions}
          </SplitButton>
        </AuthProfile>
      ) 
    }
  }
}

const StyledButton = styled(Button)`

  margin-bottom: 10px;

`

class AuthorizeButton extends Component {
  constructor(props){
    super(props)

    this.handleAuthorization = () => {
      let data
      if (this.props.authorized === true) {
        data = {
          "family_member": {
              "authorized_at": null
          }
        }
      } else if (this.props.authorized === false) {
        data = {
          "family_member": {
              "authorized_at": new Date()
          }
        }
      } else {new Error("Missing Authorization Flag")}
 
      contentPoster("patch", data, this.props.url).then(res => this.props.resetState(res))
    }
  }
  componentWillReceiveProps(nextProps){
    if (nextProps !== this.props) {
      return true
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if ((nextProps !== this.props) || (nextState !== this.state)) {
      return true
    }
  }
  render() {
    console.log(this.props)
    if (this.props.authorized === true) {
      return (
        <div>
          <StyledButton variant="secondary" size="sm" onClick={this.handleAuthorization}>Deauthorize Member</StyledButton>
        </div>
      )
    } else if (this.props.authorized === false) {
      return (
        <div>
          <StyledButton variant="secondary" size="sm" onClick={this.handleAuthorization}>Authorize Member</StyledButton>
        </div>
      )
    } else {
      return <></>
    }
  }
}



// familyMember:
// attributes:
// authorized-at: null
// created-at: "2019-04-02T17:24:03.279Z"
// family-id: 1
// member-id: 2
// updated-at: "2019-04-04T23:03:11.095Z"
// user-role: "user"
// __proto__: Object
// id: "2"
// links: {self: "/v1/family_members/2"}
// relationships: {member: {…}, family: {…}}
// type: "family-member"
// __proto__: Object
// memberProfile:
// attributes:
// avatar: "/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7039a71133de01ed570eda1a4db3aea6a899f636/img.jpg"
// name: "Devin"
// nickname: "Spencer"
// surname: "Macejkovic"
// __proto__: Object
// id: "2"
// links: {self: "/v1/members/2"}
// relationships: {families: {…}}
// type: "member"
// __proto__: Object