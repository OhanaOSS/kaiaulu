import React, { Component } from 'react'
import styled from "styled-components";
import {
  Row, Col,
  Card, Button, Form, InputGroup
} from 'react-bootstrap';

// enum :emotive => {heart: 0, like: 1, dislike: 2, haha: 3, wow: 4, sad: 5, angry: 6}

const CountBubble = styled.p`
  width: 1rem;
  height: 1.2rem;
  background-color: lightblue;
  border-radius: 20px;
  font-size: 0.75rem;
  text-align: center;
  vertical-align: middle;
  z-index: -1;
  margin-left: -0.25rem;
  margin-bottom: 0;
`
const Emoji = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1;
  right: 1px;
  position: relative;
`
const EmojiContainer = styled(Form)`
  display: flex;
  flex-direction: row;
`

class Count extends Component {
  constructor(props){
    super(props)
    this.state = {
      count: 0
    }
  }

  componentDidMount(){
    this.setState({count: this.props.count})
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.count !== this.state.count) {
      this.setState({count: nextProps.count})
    }
  }

  render() {
    if (this.state.count > 0) {
      console.log("count",this.state.count)
      return <CountBubble>{this.state.count}</CountBubble>
    } else {
      return <></>
    }
  }
}

class Reaction extends Component {
  constructor(props){
    super(props)
    this.state = {
      enabled: false,
      count: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e){
    this.props.handleRequest({
      type: e.target.getAttribute('name'), 
      enabled: this.state.enabled
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.count !== this.state.count) {
      this.setState({count: nextProps.count})
    }
    if(nextProps.enabled !== this.state.enabled) {
      this.setState({enabled: nextProps.enabled})
    }
  }
}


export class Heart extends Reaction {
  render() {
    return (
      <EmojiContainer>
        <Emoji onClick={this.handleClick} name={"heart"}>❤️</Emoji><Count count={this.state.count}/>
      </EmojiContainer>
      )
  }
}

export class Like extends Reaction {
  render() {
    return (
      <EmojiContainer>
        <Emoji onClick={this.handleClick} name={"like"}>👍</Emoji><Count count={this.state.count}/>
      </EmojiContainer>
      )
  }
}

export class Dislike extends Reaction {
  render() {
    return (
      <EmojiContainer>
        <Emoji onClick={this.handleClick} name={"dislike"}>👎</Emoji><Count count={this.state.count}/>
      </EmojiContainer>
      )
  }
}

export class Haha extends Reaction {
  render() {
    return (
      <EmojiContainer>
        <Emoji onClick={this.handleClick} name={"haha"}>🤣</Emoji><Count count={this.state.count}/>
      </EmojiContainer>
      )
  }
}

export class Wow extends Reaction {
  render() {
    console.log("wow state count",this.state.count)
    return (
      <EmojiContainer>
        <Emoji onClick={this.handleClick} name={"wow"}>😮</Emoji><Count count={this.state.count}/>
      </EmojiContainer>
      )
  }
}

export class Sad extends Reaction {
  render() {
    return (
      <EmojiContainer>
        <Emoji onClick={this.handleClick} name={"sad"}>😢</Emoji><Count count={this.state.count}/>
      </EmojiContainer>
      )
  }
}

export class Angry extends Reaction {
  render() {
    return (
      <EmojiContainer>
        <Emoji onClick={this.handleClick} name={"angry"}>😠</Emoji><Count count={this.state.count}/>
      </EmojiContainer>
      )
  }
}
