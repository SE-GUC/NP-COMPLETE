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
    loading: true
  }

  componentDidMount() {
    this.setState({error: false , loading: true})
    if (this.state.idEntered) {
      this._isMounted = true
    Axios
    .get(`/api/companies/${this.state.companyId}`)
    .then(res => this.setState({forms : 
      (res.data.data.form.acceptedByReviewer !== -1)?
      []
      :
    (res.data.data.form ), loading:false}))
    .catch(err => {
      this.setState({error:true , loading: false})
    })}
    else{
      Axios
      .get('/api/companies/')
      .then(res=>this.setState({allForms:res.data.data,loading:false}))
    }
}

  chooseForm = (id, F)=>{
    this.setState({companyId:id,idEntered:true,loading:false})
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
      <div className="App">
      {this.state.loading? <Spinner animation="border" variant= "primary" />:
      this.state.error?
      <Alert className='App' variant='danger'>Looks like something has gone wrong</Alert>
      :
      !this.state.idEntered? 
      <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
      :
      <DecisionForms forms = {[this.state.forms]}
         accept = {this.accept}
         reject = {this.reject}
         root = {this}
      />      }     
      </div>
    )
  }
}

export default acceptOrReject
