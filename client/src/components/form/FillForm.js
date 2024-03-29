import React, { Component } from 'react'
import Section from './Section'
import { Form, Button, Container } from 'reactstrap'
import Axios from 'axios';
import '../../layout/fillform.css'

class FillForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: props.form,
      type: props.type,
      filledform: [],
      error:false,
      investorID:localStorage.getItem('id'),
      companyName:"",
      lawyer: this.props.lawyer
    }
  }
  submitForm = (e)=>{
    e.preventDefault()
    var sentData={name:this.state.companyName,type:this.props.type ,form:{data:this.state.filledform}}
    console.log(this.state.investorID)
    console.log(sentData)
    if(!this.state.lawyer) {
        Axios
        .post(`/api/investors/fillForm/${this.state.investorID}`, sentData)
        .then(res=>console.log(`company created with name ${res.data.data.name}`))
        .then(alert('form submitted!!'))
        .catch(error=>console.log(error))
    } else {
        sentData={
          name:this.state.companyName,
          type:this.props.type,
          form:
              {
                data:this.state.filledform,
                filledByLawyer: true,
                acceptedByLawyer:1
              }
          }
        Axios
        .post(`/api/lawyers/newForm`, sentData)
        .then(res=>console.log(`company created with name ${res.data.data.name}`))
        .then(alert('form submitted!!'))
        .catch(error=>console.log(error))
    }
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
     const formData=this.state.filledform
     formData[relativeindex]=e.target.value
     this.setState({filledform:formData})
     
  }
  componentDidMount(){
    if(window.location.pathname.includes('lawyers')){
      this.setState({lawyer:true})
    }
  }
  render () {
    const renderSections = this.state.form.sections.map((section, i) => {
      return (
        <Container className="Section">
          <h1> {section.sectionName} </h1>
          <Section number={i} edit={false} section={section} change={this.handleChange} />
        </Container>
      )
    })

    return this.state.error? <h1>and error has occured please try again!</h1>:(
      <div>
       <h1>Fill Form</h1>
        <Container className="FormContainer" >
          <h1> {this.state.type} </h1>
          <Form className="form" onSubmit={(e) => this.submitForm(e)}>
            {renderSections}
            <Button >Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
}

export default FillForm
