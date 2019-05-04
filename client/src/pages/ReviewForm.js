import React, { Component } from 'react'
import { Form, Container, Button } from 'reactstrap'
import Axios from 'axios';
import ReviewSection from '../components/form/ReviewSection';
import ShowCompanies from '../components/fees/ShowCompanies';
const form = require('../components/form/DynamicForm.json')

class ReviewForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {sections:[]},
      filledform: [],
      allForms:[],
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
      ready:false,
      formReady:false
    }
  }
  handleIDChange =(e)=>{
  }
  handleLawyerIDChange =(e)=>{
  }

  handleChange = (e, index,section)=>
  {
  }
 
 async componentDidMount(){
    if(window.location.pathname.includes('lawyers')){
      this.setState({lawyer:true})
    }
    const res= await Axios.get(`/api/companies/`) 
    console.log(res.data.data)
    await this.setState({allForms:res.data.data,idEntered:false})
    console.log(this.state.allForms)
    await this.setState({filledform:this.state.oldData,ready:true})
  }
  chooseForm = async (id,F)=>{
    await this.setState({companyID:id,idEntered:true})
    const resp= await Axios.get(`/api/companies/${id}`) 
    console.log(resp.data.data)
    console.log(resp.data.data.type)
    await this.setState({oldData:resp.data.data.form,formType:resp.data.data.type,idEntered:true})
    console.log(this.state.oldData)
    console.log(this.state.type)
    await this.state.formType==="SSC"?(this.setState({form:form.SSC})):(this.setState({form:form.SPC}))
    await this.setState({filledform:this.state.oldData,ready:true})
    await this.setState({formReady:true})
  }
  render () {
    const renderSections = this.state.form.sections.map((section, i) => {
      return (
        <Container>
          <h1> {section.sectionName} </h1>
          <ReviewSection form={this.state.form} number={i} section={section} edit={true} oldData={this.state.oldData} change={this.handleChange} />
        </Container>
      )
    })

    return this.state.error? <h1>and error has occured please try again!</h1>: !this.state.ready?
    <div>
      <h1>loading please wait</h1>
    </div>
    :
     (!this.state.idEntered?
    (     
        <div>
            <h1>Review Form</h1>
            <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
        </div>
    )
      :
      !this.state.formReady?
      <div>
        <h1>loading form data please wait</h1>
      </div>
    :
    (
        <div>
            <Form >
            {renderSections}
            </Form>
        </div>
    )
  )    
  }
}

export default ReviewForm
