import React, { Component } from 'react'
import {Heart, Like, Dislike, Haha, Wow, Sad, Angry} from './Reaction';
import {contentFetcher, urlBuilder} from '../../utils/contentHelper'
import {
  Row, Col,
  Card, Button, Form, InputGroup
} from 'react-bootstrap';
import styled from 'styled-components';

const ReactionsWrapper = styled.ul`
  margin-top: .25rem;
  margin-bottom: .25rem;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  padding-inline-start: 0px;
  li {
    margin-right: 0.5rem;
  }
`


export default class Reactions extends Component {

  constructor(props){
    super(props)
    this.state = {
      data: [],
      emotives: {
        heart: 0, 
        like: 0, 
        dislike: 0, 
        haha: 0, 
        wow: 0, 
        sad: 0, 
        angry: 0
      },
      enabled: false,
      activeEmoji: null
    }
    this.handleRequest = this.handleRequest.bind(this)
    this.emojiMapper = this.emojiMapper.bind(this)
    this.isThisEmojiEnabled = this.isThisEmojiEnabled.bind(this)
  }

  componentDidMount() {
    const url = urlBuilder({
      parent_id: this.props.id,
      parent_type: this.props.type,
      request_type: "reaction"
    })
    console.log(url)
    contentFetcher(url).then(reactions => this.emojiMapper(reactions)).then(processedReactions => {
      console.log(processedReactions)
      if(processedReactions.enabled) {
        this.setState({
          data: processedReactions.data,
          emotives: processedReactions.emotives,
          enabled: processedReactions.enabled,
          activeEmoji: processedReactions.activeEmoji
        })
      } else {
        this.setState({
          data: processedReactions.data,
          emotives: processedReactions.emotives
        })
      }
    })
  }

  async handleRequest(callback) {
    console.log(callback)
  }

  isThisEmojiEnabled(str){
    if (this.state.activeEmoji && this.state.activeEmoji === str) {
      return true
    } else {
      return false
    }
  }

  emojiMapper(data){
    var emotives = {
      heart: 0, 
      like: 0, 
      dislike: 0, 
      haha: 0, 
      wow: 0, 
      sad: 0, 
      angry: 0
    }
    let isCurrentMember
    let activeEmoji

    data.map(emoji => {
      var emotive = emoji.attributes["emotive"]
      var memberID = emoji.attributes["member-id"]
      var currentMemberID = 12
      emotives[emotive] += 1
      if (currentMemberID === memberID){
        isCurrentMember = true
        activeEmoji = emotive
      }
    })
    if(isCurrentMember){
      return {
        data: data,
        emotives: emotives,
        enabled: true,
        activeEmoji: activeEmoji
      }
    } else {
      return {
        data: data,
        emotives: emotives
      }
    }
  }

  render() {
    if (this.props.id == 10) {console.log("\n ID 10 EXPECT WOW","\n STATE:",this.state,"\n PROPS:",this.props,"\n WOW COUNT", )}
    
    return (
      <ReactionsWrapper>
        <li as={Button}>
          <Heart handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("heart")} count={this.state.emotives.heart}/>
        </li>
        <li as={Button}>
          <Like handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("like")} count={this.state.emotives.like}/>
        </li>
        <li as={Button}>
          <Dislike handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("dislike")} count={this.state.emotives.dislike}/>
        </li>
        <li as={Button}>
          <Haha handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("haha")} count={this.state.emotives.haha}/>
        </li>
        <li as={Button}>
          <Wow handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("wow")} count={this.state.emotives.wow}/>
        </li>
         <li as={Button}>
          <Sad handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("sad")} count={this.state.emotives.sad}/>
        </li>
        <li as={Button}>
          <Angry handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("angry")} count={this.state.emotives.angry}/>
        </li>
      </ReactionsWrapper>
    )
  }
}

