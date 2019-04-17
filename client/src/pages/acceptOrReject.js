import React, { Component } from 'react';
import Header from '../components/Header'
import DecisionForms from '../components/DecisionForms'
import Axios from 'axios';


class acceptOrReject extends Component {

  state = {
    loading: true,
    forms: [],
    companyId: "",
    error:false,
    idEntered:false
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
    }))
    .then(res => this.setState({loading: false}))
    .then(res => console.log(this.state.forms ))
    .catch(err => {
      this.setState({error:true})
    })}
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
      <div>
        <label>Company ID</label>
        <input
          type="text"
          value={this.state.companyId}
          onChange={(e)=>this.setState({companyId:e.target.value})}
        />
      </div>
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