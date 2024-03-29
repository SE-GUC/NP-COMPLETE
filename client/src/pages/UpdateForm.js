import React, { Component } from 'react'
import Section from '../components/form/Section'
import { Form, Container, Button } from 'reactstrap'
import Axios from 'axios'
import ShowCompanies from '../components/fees/ShowCompanies'
import {Spinner , Alert} from 'react-bootstrap'

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
      lawyer:false,
      allForms:[]
    }
  }
  submitForm = (e)=>{
    this.setState({error: false , loading: true})
    e.preventDefault()
    var sentData={data:this.state.filledform}
   if(!this.state.lawyer)
    {
      Axios
      .put(`/api/investors/editForm/${this.state.companyID}`, sentData)
      .then(res=>alert(res.data.message))
      .then(res => this.setState({loading: false}))
      .catch(err => this.setState({loading: false , error: true}))
    }
    else {
      Axios
      .put(`/api/lawyers/editForm/${this.state.lawyerID}/${this.state.companyID}`, sentData)
      .then(res=>alert(res.data.message))
      .then(res => this.setState({loading: false}))
      .catch(err => this.setState({loading: false , error: true}))
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
  chooseForm = async (id, F)=>{
    const res= await Axios.get(`/api/companies/${id}`) 
    console.log(res.data.data)
    await this.setState({oldData:res.data.data.form.data,formType:res.data.data.type,companyID:res.data.data._id})
    console.log(this.state.oldData)
    console.log(this.state.companyID)
    await this.state.formType==="SSC"?(this.setState({form:form.SSC})):(this.setState({form:form.SPC}))
    this.setState({filledform:this.state.oldData})
    await this.setState({idEntered:true})
  }
  componentDidMount(){
    if(window.location.pathname.includes('lawyers')){
      this.setState({error: false , loading: true, lawyer:true,lawyerID:localStorage.getItem('id')})
      Axios
      .get(`/api/lawyers/casesPage/${localStorage.getItem('id')} `)
      .then(res=>this.setState({allForms:res.data.data,loading:false}))
      .catch(error=>this.setState({error:true , loading: false}))
    }else
    {
      this.setState({error: false , loading: true , lawyer:false,investorID:localStorage.getItem('id')})
      Axios
      .get(`/api/investors/getCompanies/${localStorage.getItem('id')} `)
      .then(res=>this.setState({allForms:res.data.data,loading:false}))
      .catch(error=>this.setState({error:true , loading: false}))
    }
    

  }
  render () {
    if (localStorage.getItem('language') === 'English') {
    const renderSections = this.state.form.sections.map((section, i) => {
      return (
        <Container>
          <h1> {section.sectionName} </h1>
          <Section form={this.state.form} number={i} section={section} edit={true} oldData={this.state.oldData} change={this.handleChange} />
        </Container>
      )
    })

    return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>
    :
    this.state.loading?
    <div className='App'><Spinner animation="border" variant= "primary" /></div>
    : (!this.state.idEntered?
    (   this.state.allForms.length===0?
          <Alert className='App' variant='danger'>you currently have no Forms to edit</Alert>
      :  
          <div>
            <h1>Choose form</h1>
            <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
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
  } else {
    const renderSections = this.state.form.sections.map((section, i) => {
      return (
        <Container>
          <h1> {section.sectionName} </h1>
          <Section form={this.state.form} number={i} section={section} edit={true} oldData={this.state.oldData} change={this.handleChange} />
        </Container>
      )
    })

    return this.state.error? <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>: (!this.state.idEntered?
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
            <h1>تحديث الاستمارة</h1>
        }
            <input
                type="text"
                placeholder={"FormID"}
                onChange={this.handleIDChange}
            />
            <Button variant="primary" onClick={()=>this.findForm()} >اختر الاستمارة</Button>
        </div>
    )
      :
    (
        <div>
            <Form onSubmit={(e) => this.submitForm(e)}>
            {renderSections}
            <Button >ادخال</Button>
            </Form>
        </div>
    )
  )
  }
}
}

export default UpdateForm
