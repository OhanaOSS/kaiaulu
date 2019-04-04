import React, { Component } from 'react';
import {
  Row, Col,
  Card, Button, Image
} from 'react-bootstrap';
import styled from "styled-components";
import store from "../../store";
import { urlBuilder, contentFetcher } from '../../utils/contentHelper'

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
      profile: null
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
      return (
        <Wrapper sm={3}>
            <StyledCard>
                  <StyledImage src={`http://${store.getState().currentUser.baseUrl}/images/default_avatar.png`} rounded/>
                  <Name>{`${currentUser.name} ${currentUser.surname}`}</Name>
            </StyledCard>
        </Wrapper>
      );  
  }
}

export default ProfileSidebar;
