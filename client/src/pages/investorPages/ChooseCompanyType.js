import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import FillForm from '../../components/form/FillForm'
import { Container, Header, Card } from 'semantic-ui-react'
import DisplayCard from '../../components/generic/DisplayCard'
const form = require('../../components/form/DynamicForm.json')

export class ChooseCompanyType extends Component {
  constructor (props) {
    super(props)
    this.state = {
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
    if (localStorage.getItem('language') === 'English') {
      if (this.state.showOptions) {
        return (
          <Container fluid >
            <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
            </style>
            <Header inverted as='h1'>Choose your company type</Header>
            <Card.Group>
              <DisplayCard title='Type:' text='A Single Share Holder Company' buttonText='SSC' id='btn' click={this.clickSSC} />
              <DisplayCard title='Type:' text='Sole Proprietorship Company' buttonText='SPC' id='btn' click={this.clickSPC} />
            </Card.Group>
          </Container>

        )
      }
      if (this.state.renderSPC) {
        return <FillForm type={'SPC'} form={form.SPC} />
      }
      if (this.state.renderSSC) {
        return <FillForm type={'SSC'} form={form.SSC} />
      }
    } else {
      if (this.state.showOptions) {
        return (
          <Container fluid >
            <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}
            </style>
            <Header inverted as='h1'>اختار نوع شركتك</Header>
            <Card.Group>
              <DisplayCard title='Type:' text='A Single Share Holder Company' buttonText='SSC' id='btn' click={this.clickSSC} />
              <DisplayCard title='Type:' text='Sole Proprietorship Company' buttonText='SPC' id='btn' click={this.clickSPC} />
            </Card.Group>
          </Container>

        )
      }
      if (this.state.renderSPC) {
        return <FillForm type={'SPC'} form={form.SPC} lawyer={this.state.lawyer} />
      }
      if (this.state.renderSSC) {
        return <FillForm type={'SSC'} form={form.SSC} lawyer={this.state.lawyer} />
      }
    }
  }
}

export default ChooseCompanyType
