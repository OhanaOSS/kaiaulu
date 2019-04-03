import React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components'

export default function contentEditable(WrappedComponent) {
  const StyledWrappedComponent = styled(WrappedComponent)`
    &:focus {
      background: linen;
    }
  `
  return class extends React.Component {

    state = {
      editing: false
    }

    toggleEdit = (e) => {
      console.log(this.props)
      e.stopPropagation();
      if (this.state.editing) {
        this.cancel();
      } else {
        this.edit();
      }
    };

    edit = () => {
      this.setState({
        editing: true
      }, () => {
        this.domElm.focus();
      });
    };

    save = () => {
      this.setState({
        editing: false
      }, () => {
        if (this.isValueChanged()) {
          console.log(this.props)
          if (this.props.name) {
            this.props.onSave({
              value: this.domElm.textContent,
              name: this.props.name
            })
            console.log('Value is changed', this.domElm.textContent);
          } else if (this.props.address) {
            let addressType = this.domElm.textContent.match(/^[^:]+/g)[0]
            let newValue = this.domElm.textContent.match(/(?:\s+)(\s?.*)/g)[0]
            console.log(addressType, newValue)
            this.props.onSave({
              value: newValue,
              type: addressType
            })
            console.log(this.domElm.textContent)
          } else if (this.props.contact) {
            if (this.domElm.textContent.length > 0) {
              let contactType = this.domElm.textContent.match(/^[^:]+/g)[0].trim(0)
              let newValue = this.domElm.textContent.match(/(?:\s+)(\s?.*)/g)[0].trim(0)
              console.log(contactType, newValue)
              this.props.onSave({
                value: newValue,
                type: contactType
              })
              console.log('Value is changed', this.domElm.textContent)
            } else {
              this.setForDelete()
            }
          } else {
            this.props.onSave({value: this.domElm.textContent})
            console.log('Value is changed', this.domElm.textContent); 
          }
        }
      });
    };

    setForDelete = () => {
      this.props.onSave({
        value: null,
        type: this.props.value.props.children.match(/(?:\s+)(\s?.*)/g)[0].trim(0)
      })
    }

    cancel = () => {
      this.setState({
        editing: false
      });
    };

    isValueChanged = () => {
      return this.props.value !== this.domElm.textContent
    };

    handleKeyDown = (e) => {
      const { key } = e;
      switch (key) {
        case 'Enter':
        case 'Escape':
          this.save();
          break;
      }
    };

    render() {
      let editOnClick = true;
      const {editing} = this.state;
      if (this.props.editOnClick !== undefined) {
        editOnClick = this.props.editOnClick;
      }
      return (
        <StyledWrappedComponent
          className={editing ? 'editing' : ''}
          onClick={editOnClick ? this.toggleEdit : undefined}
          contentEditable={editing}
          ref={(domNode) => {
            this.domElm = domNode;
          }}
          onBlur={this.save}
          onKeyDown={this.handleKeyDown}
          {...this.props}
      >
        {this.props.value}
      </StyledWrappedComponent>
      )
    }
  }
}