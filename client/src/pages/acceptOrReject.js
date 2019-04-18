import React, { Component } from 'react';
import Header from '../components/Header'
import DecisionForms from '../components/DecisionForms'
import Axios from 'axios';
import ShowCompanies from '../components/fees/ShowCompanies';


class acceptOrReject extends Component {

  state = {
    loading: true,
    forms: [],
    companyId: "",
    error:false,
    idEntered:false,
    allForms:[],
    loading:true
  }

  componentDidMount() {
    if (this.state.idEntered) {
      this._isMounted = true
    Axios
    .get(`/api/companies/${this.state.companyId}`)
    .then(res => this.setState({forms : 
      (res.data.data.form.acceptedByReviewer !== -1)?
      []
      :
    (res.data.data.form )
    ,loading:false}))
    .catch(err => {
      this.setState({error:true})
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
    Axios
    .put(`/api/reviewers/decideAnApplication/${reviewerId}/${this.state.companyId}`  , {decision: true})
    .then(res => {
      console.log(res.data.data)  
      this.setState({ forms: [] })
    })
    .catch(err => {
      console.log(err)
    })
  }
  reject = (e , root) =>{
    e.preventDefault()
    const reviewerId= localStorage.getItem('id')

    Axios
    .put(`/api/reviewers/decideAnApplication/${reviewerId}/${this.state.companyId}`  , {decision: false})
    .then(res => {
      console.log(res.data.data)
      this.setState({ forms: [] })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
      <Header/>
      {this.state.loading? <h1>loading please be patient</h1>:this.state.error?
      <h1>Error has occured please try again</h1>
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
    );
  }
}

export default acceptOrReject;