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

export class Reaction extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: null,
      count: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e){
    // console.log('\nthis state:', this.state, '\nthis props',this.props)
    if (this.state.enabled) {
      this.setState({
        active: 'null',
        count: this.state.count -= 1
      })
    } else {
      this.setState({
        active: 'true',
        count: this.state.count += 1
      })
    }
    this.props.handleRequest({
      type: e.target.getAttribute('name'),
      active: e.target.getAttribute('active')
    })
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.count !== this.state.count) {
      this.setState({count: nextProps.count})
    }
    if(nextProps.active !== this.state.active) {
      this.setState({active: nextProps.active})
    }
  }
  render(){
    switch (this.props.type) {
      case "heart":
        return (
          <EmojiContainer className={"reaction"}>
            <Emoji onClick={this.handleClick} name={"heart"}>❤️</Emoji><Count count={this.state.count}/>
          </EmojiContainer>
          )
      case "like":
        return (
          <EmojiContainer className={"reaction"}>
            <Emoji onClick={this.handleClick} name={"like"}>👍</Emoji><Count count={this.state.count}/>
          </EmojiContainer>
          )
      case "dislike":
        return (
          <EmojiContainer className={"reaction"}>
            <Emoji onClick={this.handleClick} name={"dislike"}>👎</Emoji><Count count={this.state.count}/>
          </EmojiContainer>
          )
      case "wow":
        return (
          <EmojiContainer className={"reaction"}>
            <Emoji onClick={this.handleClick} name={"wow"}>😮</Emoji><Count count={this.state.count}/>
          </EmojiContainer>
          )
      case "haha":
          return (
            <EmojiContainer className={"reaction"}>
              <Emoji onClick={this.handleClick} name={"haha"}>🤣</Emoji><Count count={this.state.count}/>
            </EmojiContainer>
            )
      case "sad":
        return (
          <EmojiContainer className={"reaction"}>
            <Emoji onClick={this.handleClick} name={"sad"}>😢</Emoji><Count count={this.state.count}/>
          </EmojiContainer>
          )
      case "angry":
        return (
          <EmojiContainer className={"reaction"}>
            <Emoji onClick={this.handleClick} name={"angry"}>😠</Emoji><Count count={this.state.count}/>
          </EmojiContainer>
          )
      default:
        return <></>
    }
  }
}