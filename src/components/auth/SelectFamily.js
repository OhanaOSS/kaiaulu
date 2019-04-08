import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFamilies } from '../../actions/authActions';
import SplitButton from 'react-bootstrap/SplitButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {familyFetcher, contentFetcher, urlBuilder} from '../../utils/contentHelper';

class SelectFamily extends Component {
  constructor(props){
    super(props)
    this.state = {
      families: [],
      authFamilies: [],
      selectedFamily: null
    }
    this.getAuthFamilies = this.getAuthFamilies.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.currentFamily = this.currentFamily.bind(this)
  }
  async componentDidMount(){
    if (this.props.auth === "authorized") {
    this.getAuthFamilies()
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.auth === "unauthorized" && nextProps.baseUrl !== null) {
      this.getAllFamilies()
    }
  }

  getAuthFamilies(){
    const membersFamiliesURL = urlBuilder({
      parent_type: 'authorized_families'
    })
    const authFamiliesPromise = contentFetcher(membersFamiliesURL)
    authFamiliesPromise.then(authFamilies => {
      this.setState({authFamilies: authFamilies})
      this.props.setFamilies(authFamilies, this.state.selectedFamily)
    })
  }
  getAllFamilies(){
    const allFamiliesPromise = familyFetcher(this.props.baseUrl)
    allFamiliesPromise.then(families => {
      this.setState({families: families})
    })
  }
  handleClick(e){
    if (this.props.auth === "authorized") {
      const familyID = e.target.getAttribute('id')
      const familyName = e.target.getAttribute('name')
      const newSelectedFamily = {
        familyName: familyName,
        familyID: familyID
      }
      this.setState({
        selectedFamily: newSelectedFamily
      })
      this.props.setFamilies(this.state.authFamilies, newSelectedFamily) 
    } else if (this.props.auth === "unauthorized"){
      const familyID = e.target.getAttribute('id')
      const familyName = e.target.getAttribute('name')
      const selectedFamily = {
        familyName: familyName,
        familyID: familyID
      }
      this.props.familyData(selectedFamily)
    }
  }
  currentFamily(){
    if (this.state.selectedFamily === null) {
      return "Select Family"
    } else {
      return this.state.selectedFamily.familyName
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextState !== this.state || nextProps !== this.props){
      this.props.setFamilies(nextState.authFamilies, nextState.selectedFamily)
      return true
    } else {
      return false
    }
  }

  render() {
    if (this.props.auth === "authorized") {
      const currentFamily = this.currentFamily()
      const options = this.state.authFamilies.map((family, index) => (
        <Dropdown.Item onClick={this.handleClick} key={index} eventKey={index} name={family.attributes["family-name"]} id={family.id}>{family.attributes["family-name"]}</Dropdown.Item>
      ))
      return (
        <SplitButton
          drop={"down"}
          variant="secondary"
          title={currentFamily}
          id={`dropdown-button-drop-down`}
          key={"down"}
          size="small"
        >
          {options}
        </SplitButton>
      )
    } else if (this.props.auth === "unauthorized") {
      const currentFamily = this.currentFamily()
      const options = this.state.families.map((family, index) => (
        <Dropdown.Item onClick={this.handleClick} key={index} eventKey={index} name={family.attributes["family-name"]} id={family.id}>{family.attributes["family-name"]}</Dropdown.Item>
      ))
      return (
        <SplitButton
          drop={"down"}
          variant="secondary"
          title={currentFamily}
          id={`dropdown-button-drop-down`}
          key={"down"}
        >
          {options}
        </SplitButton>
      )
    }
  }
}

SelectFamily.propTypes = {
  setFamilies: PropTypes.func.isRequired
};

export default connect(null, { setFamilies })(SelectFamily);
