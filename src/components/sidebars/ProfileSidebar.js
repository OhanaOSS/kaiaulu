import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button, Image
} from 'react-bootstrap';
import styled from "styled-components";
import store from "../../store";
import { urlBuilder, contentFetcher, fileUpload } from '../../utils/contentHelper'

const Wrapper = styled(Col)``

const StyledImage = styled.img`
  max-width: 150px;
  max-height: 150px;
  border-radius: 80px;
  margin: 0 auto;
`
const StyledCard = styled(Card)`

`
const Name = styled.div`
  margin: 0 auto;
`
const HiddenInput = styled.input`
  display: none;
`

const NickName = (data) => {
  const StyledNickName = styled.small`
    margin: 0 auto;
  `
  if (data.nickname) {
    return <StyledNickName>{`"${data.nickname}"`}</StyledNickName>
  } else {
    return <StyledNickName>{`"Test"`}</StyledNickName>
  }
}

class ProfileSidebar extends Component {
  constructor(props){
    super(props)
    this.state = {
      profile: null,
      media: null
    }
    this.handleClick = (e) => {
      this.refs.fileUploader.click();
    }
    this.handleUpload = (files) => {
        console.log(files)
        const memberID = store.getState().currentUser.data.id
        let data = new FormData();
        data.append("id", memberID)
        data.append("avatar", files[0])
        console.log(data)
        fileUpload("put", data, urlBuilder({
          parent_id: memberID,
          parent_type: "members"
        })).then(res => {
          console.log(res)
          this.setState({profile: res})
        }).then(console.log(this.state))
    }
  }
  componentDidMount(){
    contentFetcher(urlBuilder({
      parent_id: store.getState().currentUser.data.id,
      parent_type: "members"
    })).then(res => this.setState({profile: res}))
  }
  render() {
    const currentUser = store.getState().currentUser.data
    if (this.state.profile) {
      return (
        <Wrapper sm={3}>
            <StyledCard>
                  <StyledImage src={`http://${store.getState().currentUser.baseUrl}/${this.state.profile.attributes.avatar}`} onClick={this.handleClick} rounded/>
                  <Name>{`${currentUser.name} ${currentUser.surname}`}</Name>
                  <HiddenInput type="file" id="file" ref="fileUploader" onChange={e => this.handleUpload(e.currentTarget.files)}/>
            </StyledCard>
        </Wrapper>
      );  
    } else {
      return (
        <Wrapper sm={3}>
            <StyledCard>
                  <Name>{`${currentUser.name} ${currentUser.surname}`}</Name>
                  <HiddenInput type="file" id="file" ref="fileUploader" onChange={e => this.handleUpload(e.currentTarget.files)}/>
            </StyledCard>
        </Wrapper>
      );   
    }
  }
}

export default ProfileSidebar;
