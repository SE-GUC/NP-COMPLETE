import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import FillForm from '../../components/form/FillForm'
const form = require('../../components/form/DynamicForm.json')

export class ChooseCompanyType extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      showOptions: true,
      renderSSC: false,
      renderSPC: false,
      lawyer: this.props.lawyer
    }
    this.clickSPC = this.clickSPC.bind(this)
    this.clickSSC = this.clickSSC.bind(this)
  }

  clickSPC () {
    this.setState({ showOptions: false, renderSPC: true })
  }
  clickSSC () {
    this.setState({ showOptions: false, renderSSC: true })
  }

  render () {
    if (this.state.showOptions) {
      return (
        <div className='App'>
          <Button href='/investor'>Back</Button>
          <h1>Choose your company type</h1>
          <Button style={btnStyle} onClick={this.clickSSC}>SSC</Button>
          <Button style={btnStyle} onClick={this.clickSPC}>SPC</Button>
        </div>

      )
    }
    if (this.state.renderSPC) {
      return (
        <div>
          <Button href='/investors/fillForm'>Back</Button>
          <FillForm type={'SPC'} form={form.SPC} lawyer={this.state.lawyer} />
        </div>

      )
    }
    if (this.state.renderSSC) {
      return (
        <div>
          <Button href='/investors/fillForm'>Back</Button>
          <FillForm type={'SSC'} form={form.SSC} />
        </div>

      )
    }
  }
}

const btnStyle = {
  background: '#00a0ff',
  color: 'fff',
  border: 'none',
  padding: '10px 90px',
  cursor: 'pointer',
  float: 'center',
  fontSize: 20,
  margin: '20px',
  hover: true
}

export default ChooseCompanyType
