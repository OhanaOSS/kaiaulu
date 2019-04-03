import React, { Component } from 'react'
import {Button} from 'react-bootstrap'
import styled from 'styled-components'

const StyledAddButton = styled(Button)`
  height: fit-content !important;
  padding: 0 !important;
  line-height: 1;
  margin-left: 5px;
`

export default class SmallAddSquare extends Component {
  render() {
    return <StyledAddButton variant="primary">+</StyledAddButton>
  }
}
