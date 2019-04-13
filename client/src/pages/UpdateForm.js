import React, { Component } from 'react'
import Section from '../components/form/Section'
import { Form, Container, Button } from 'reactstrap'
import Axios from 'axios';
const form = require('../components/form/DynamicForm.json')

class UpdateForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {sections:[]},
      filledform: [],
      oldData:[],
      error:false,
      investorID:"",
      lawyerID:"",
      companyName:"",
      loading:true,
      companyID:"",
      formType:"",
      idEntered:false,
      lawyer:false
    }
  }
  handleIDChange =(e)=>{
    this.setState({companyID:e.target.value})
    console.log(e.target.value)
  }
  handleLawyerIDChange =(e)=>{
    this.setState({lawyerID:e.target.value})
    console.log(e.target.value)
  }
  submitForm = (e)=>{
    e.preventDefault()
    var sentData={data:this.state.filledform}
   if(!this.state.lawyer)
    {
      Axios
      .put(`api/investors/editForm/${this.state.companyID}`, sentData)
      .then(res=>alert(res.data.message))
      .catch(error=>console.log(error))
    }
    else {
      Axios
      .put(`api/lawyers/editForm/${this.state.lawyerID}/${this.state.companyID}`, sentData)
      .then(res=>alert(res.data.message))
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
     console.log(relativeindex)
     const formData=this.state.filledform
     formData[relativeindex]=e.target.value
     this.setState({filledform:formData})
     console.log(this.state.filledform)
     
  }
  findForm = async ()=>{
    const res= await Axios.get(`api/companies/${this.state.companyID}`) 
    console.log(res.data.data)
    await this.setState({oldData:res.data.data.form.data,formType:res.data.data.type})
    console.log(this.state.oldData)
    await this.state.formType==="SSC"?(this.setState({form:form.SSC})):(this.setState({form:form.SPC}))
    this.setState({filledform:this.state.oldData})
    await this.setState({idEntered:true})
  }
  componentDidMount(){
    if(window.location.pathname.includes('lawyers')){
      this.setState({lawyer:true})
    }
  }
  render () {
    const renderSections = this.state.form.sections.map((section, i) => {
      return (
        <Container>
          <h1> {section.sectionName} </h1>
          <Section form={this.state.form} number={i} section={section} edit={true} oldData={this.state.oldData} change={this.handleChange} />
        </Container>
      )
    })

    return this.state.error? <h1>and error has occured please try again!</h1>: (!this.state.idEntered?
    (     
        <div>
          {
            this.state.lawyer? 
            <input
            type="text"
            placeholder={"LaywerID"}
            onChange={this.handleLawyerIDChange}
            />  
        :
            <h1>Update Form</h1>
        }
            <input
                type="text"
                placeholder={"FormID"}
                onChange={this.handleIDChange}
            />
            <Button variant="primary" onClick={()=>this.findForm()} >Select Form</Button>
        </div>
    )
      :
    (
        <div>
            <Form onSubmit={(e) => this.submitForm(e)}>
            {renderSections}
            <Button >Submit</Button>
            </Form>
        </div>
    )
  )    
  }
}

export default UpdateForm
