import React, { Component } from 'react'
import Section from './Section'
import { Form, Container, Button} from 'reactstrap'

class FillForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: props.form
    }
  }

  render () {
    const renderSections = this.state.form.sections.map((section, i) => {
        return (
            <Container>
                <h1> {section.sectionName} </h1>
                <Section number={i} section={section} /> 
            </Container>
        )
    })

    return (
      <Form onSubmit={(e)=> this.submitForm(e)}>
        {renderSections}
        <Button type="submit" >Submit</Button>
      </Form>
    )
  }
}

export default FillForm
