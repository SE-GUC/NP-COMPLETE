import React, { Component } from 'react'
import Section from './Section'
import { Form, Container, Button } from 'reactstrap'
import Axios from 'axios';

class FillForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: props.form,
      filledform: [],
      error:false,
      investorID:"",
      companyName:""
    }
  }
  handleIDChange =(e)=>{
    this.setState({investorID:e.target.value})
    console.log(e.target.value)
  }
  submitForm = (e)=>{
    e.preventDefault()
    var sentData={name:this.state.companyName,type:this.props.type ,form:{data:this.state.filledform}}
    console.log(this.state.investorID)
    console.log(sentData)
    Axios
    .post(`http://localhost:8000/api/investors/fillForm/${this.state.investorID}`, sentData)
    .then(res=>alert(`company created with name ${res.data.data.name}`))
    .then(alert('form submitted!!'))
    .catch(error=>console.log(error))
    
  }
  handleChange = (e, index,section)=>
  {
     if(e.target.name==="Company Name"){
       this.setState({companyName:e.target.value})
     }
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
          <Section number={i} edit={false} section={section} change={this.handleChange} />
        </Container>
      )
    })

    return this.state.error? <h1>and error has occured please try again!</h1>:(
     <div>
        <input
          type="text"
          onChange={this.handleIDChange}
        />
        <Form onSubmit={(e) => this.submitForm(e)}>
          {renderSections}
          <Button >Submit</Button>
        </Form>
      </div>
    )
  }
}

export default FillForm
