import React, { Component } from 'react'
import Section from './Section'
import { Form, Container, Button } from 'reactstrap'
import Axios from 'axios';

class FillForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: props.form,
      filledform: []
    }
  }
  submitForm = ()=>{
    alert('form submitted!!')
  }
  handleChange = (e, index,section)=>
  {
     console.log(e.target.value)
     var relativeindex = index
     for(var i =0; i<section; i++){
      relativeindex += this.state.form.sections[i].numberOfFields
     }
     console.log(relativeindex)
     const formData=this.state.filledform
     formData[relativeindex]=e.target.value
     this.setState({filledform:formData})
     console.log(this.state.filledform)
     
  }
  render () {
    const renderSections = this.state.form.sections.map((section, i) => {
      return (
        <Container>
          <h1> {section.sectionName} </h1>
          <Section number={i} section={section} change={this.handleChange} />
        </Container>
      )
    })

    return (
      <Form onSubmit={(e) => this.submitForm(e)}>
        {renderSections}
        <Button >Submit</Button>
      </Form>
    )
  }
}

export default FillForm
