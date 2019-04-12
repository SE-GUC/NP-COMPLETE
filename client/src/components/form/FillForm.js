import React, { Component } from 'react'
import Section from './Section'
import { Form } from 'reactstrap'

class FillForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: props.form
    }
  }

  render () {
    const renderSections = this.state.form.sections.map((section, i) => {
      return <Section number={i} section={section} />
    })

    return (
      <Form>
        {renderSections}
      </Form>
    )
  }
}

export default FillForm
