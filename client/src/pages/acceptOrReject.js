import React, { Component } from 'react';
import DecisionForms from '../components/DecisionForms'
import Axios from 'axios';
import ShowCompanies from '../components/fees/ShowCompanies';
import {Spinner , Alert} from 'react-bootstrap/Spinner'

class acceptOrReject extends Component {

  state = {
    loading: true,
    forms: [],
    companyId: "",
    error:false,
    idEntered:false,
    allForms:[],
    loading: true,
    ready:false
  }

  componentDidMount() {
    console.log("mostafa")
    if (this.state.idEntered) {
      alert("be555")
      Axios
      .get(`/api/companies/${this.state.companyId}`)
      .then(res => {
        alert(res.data.data.name)
        this.setState({forms : res.data.data.form , loading:false})
      })
        .catch(err => {
          this.setState({error:true , loading: false})
        })
        this._isMounted = true
      }
    else{
      Axios
      .get('/api/companies/')
      .then(res=>{
        const data=res.data.data
        const forms = data.filter((form)=>{
          return (form.form.acceptedByReviewer!==1)
        })
        if(forms.length===0)
            alert('no forms to review')
        this.setState({allForms:forms,loading:false})
      })
      .catch(err=>this.setState({error:true}))
    }
}

  chooseForm = async (id, F)=>{
    await this.setState({companyId:id,idEntered:true,loading:false})
    await this.setState({ready:true})
  }
  accept = (e , root) =>{
    e.preventDefault()
    const reviewerId= localStorage.getItem('id')
    this.setState({error: false ,loading: true})
    Axios
    .put(`/api/reviewers/decideAnApplication/${reviewerId}/${this.state.companyId}`  , {decision: true})
    .then(res => {
      this.setState({ forms: [] , loading: false})
    })
    .catch( err => this.setState({error: true , loading :false}))
  }
  reject = (e , root) =>{
    e.preventDefault()
    const reviewerId= localStorage.getItem('id')
    this.setState({error: false , loading: true})
    Axios
    .put(`/api/reviewers/decideAnApplication/${reviewerId}/${this.state.companyId}`  , {decision: false})
    .then(res => {
      this.setState({ forms: [] , loading: false})
    })
    .catch(err => this.setState({error: true , loading: false}))
  }

  render() {
    return (
     
      this.state.loading ?
        <div>
          <h1>Loading please wait</h1>
          {/* <Spinner animation="border" variant= "primary" /> */}
        </div>
        :
      this.state.error ?
          <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>
        :
      !this.state.idEntered ? 
          <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
        :
      !this.state.ready?
      <h1>just a moment please</h1>
      :
          <DecisionForms forms = {[this.state.forms]} accept = {this.accept} reject = {this.reject} root = {this}/>
           
    )
  }
}

export default acceptOrReject
