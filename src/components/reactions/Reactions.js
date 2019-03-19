import React, { Component } from 'react'
import {Reaction} from './Reaction';
import {contentFetcher, contentPoster, urlBuilder} from '../../utils/contentHelper'
import {capitalizeFirstLetter} from '../../utils/dataHelpers'
import {
  Row, Col,
  Card, Button, Form, InputGroup
} from 'react-bootstrap';
import styled from 'styled-components';
import store from '../../store';

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
        heart: {
          count: 0, 
          active: null
        },
        like: {
          count: 0, 
          active: null
        },
        dislike: {
          count: 0, 
          active: null
        },
        haha: {
          count: 0, 
          active: null
        },
        wow: {
          count: 0, 
          active: null
        },
        sad: {
          count: 0, 
          active: null
        },
        angry: {
          count: 0, 
          active: null
        }
      },
      currentUserEmoji: null
    }
    this.handleRequest = this.handleRequest.bind(this)
    this.emojiMapper = this.emojiMapper.bind(this)
    this.checkForActiveEmoji = this.checkForActiveEmoji.bind(this)
    this.createSelectedEmoji = this.createSelectedEmoji.bind(this)
    this.deleteSelectedEmoji = this.deleteSelectedEmoji.bind(this)
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
    this.setState({
      data: processedReactions.data,
      emotives: processedReactions.emotives,
      currentUserEmoji: processedReactions.currentUserEmoji
    })
    })
  }

  async handleRequest(callback) {
    this.checkForActiveEmoji(callback)
  }

  checkForActiveEmoji(clickCallback){
    let newEmotives = this.state.emotives
    Object.keys(this.state.emotives).map((key) => {
      if (this.state.emotives[key].active && key !== clickCallback.type){
        newEmotives[key].active = null
        newEmotives[key].count -= 1
      }
    })
    if (!newEmotives[clickCallback.type].active) {
      newEmotives[clickCallback.type].active = true
      newEmotives[clickCallback.type].count += 1
      this.createSelectedEmoji(clickCallback)
    } else if (newEmotives[clickCallback.type].active) {
      newEmotives[clickCallback.type].active = null
      newEmotives[clickCallback.type].count -= 1
      this.deleteSelectedEmoji(clickCallback)
    }

    this.setState({
      emotives: newEmotives,
    })
  }

  createSelectedEmoji(callback){
    const url = urlBuilder({
      parent_type: "reactions"
    })
    let data = {
      "reaction":{
        "attributes":{
          "member_id": store.getState().currentUser.data.id,
          "emotive": callback.type,
          "interaction_type": capitalizeFirstLetter(this.props.type),
          "interaction_id": this.props.id
        }
      }
    }
    contentPoster("post", data, url).then(newReaction => this.setState({currentUserEmoji: newReaction.id}))
  }
  deleteSelectedEmoji(callback){
    const url = urlBuilder({
      parent_type: "reactions",
      parent_id: this.state.currentUserEmoji
    })
    contentPoster("delete", {}, url).then(this.setState({currentUserEmoji: null}))
  }

  emojiMapper(data){
    console.log(data)
    var emotives = {
        heart: {
          count: 0, 
          active: null
        },
        like: {
          count: 0, 
          active: null
        },
        dislike: {
          count: 0, 
          active: null
        },
        haha: {
          count: 0, 
          active: null
        },
        wow: {
          count: 0, 
          active: null
        },
        sad: {
          count: 0, 
          active: null
        },
        angry: {
          count: 0, 
          active: null
        }
      }
    let currentUserEmoji = null
    data.map(emoji => {
      var emotive = emoji.attributes["emotive"]
      var memberID = emoji.attributes["member-id"]
      var currentMemberID = store.getState().currentUser.data.id
      emotives[emotive].count += 1
      if (currentMemberID === memberID){
        console.log(emoji, currentMemberID, memberID)
        currentUserEmoji = emoji.id
        emotives[emotive].active = true
      }
    })
    return {
      data: data,
      emotives: emotives,
      currentUserEmoji: currentUserEmoji
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextState !== this.state || nextProps !== this.props){
      return true
    } else {
      return false
    }
  }

  render() {
    // if (this.props.id == 10) {console.log("\n ID 10 EXPECT WOW","\n STATE:",this.state,"\n PROPS:",this.props,"\n WOW COUNT", )}
    console.log(this.props, this.state)
    const reactions = Object.keys(this.state.emotives).map((key, index) => (
      <li key={index} as={Button}>
        <Reaction active={this.state.emotives[key].active} type={key} count={this.state.emotives[key].count} handleRequest={this.handleRequest}/>
      </li>
    ))
    console.log(reactions)
    // this.state.emotives.map(emoji => (
    //   <li as={Button}>
    //     <Reaction active={emoji.active} type={emoji} handleRequest={this.handleRequest} enabled={this.isThisEmojiEnabled("heart")} count={this.state.emotives.heart}/>
    //   </li>
    // ))
    return (
      <ReactionsWrapper>
        {reactions}
      </ReactionsWrapper>
    )
  }
}

