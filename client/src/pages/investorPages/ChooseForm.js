import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import FillForm from '../../components/form/FillForm'
const form = require('../../components/form/DynamicForm.json')

class ChooseForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showOptions: true,
      renderSSC: false,
      renderSPC: false
    }
    this.clickSPC = this.clickSPC.bind(this)
    this.clickSSC = this.clickSSC.bind(this)
  }

  clickSPC () {
    // alert('SPC')
    this.setState({ showOptions: false, renderSPC: true })
  }
  clickSSC () {
    // alert('SSC')
    this.setState({ showOptions: false, renderSSC: true })
  }

  render () {
    if (this.state.showOptions) {
      return (
        <div>
          <p>{form.SSC.sections[0].sectionName}</p>
          <Button onClick={this.clickSSC}> SSC </Button>
          <Button onClick={this.clickSPC}> SPC </Button>
        </div>
      )
    }
    if (this.state.renderSPC) {
      return <FillForm type={'SPC'} form={form.SPC} />
    }
    if (this.state.renderSSC) {
      return <FillForm type={'SSC'} form={form.SSC} />
    }
  }
}

export default ChooseForm
