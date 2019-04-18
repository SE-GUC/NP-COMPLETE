import React, { Component } from 'react';
import Header from '../components/Header'
import DecisionForms from '../components/DecisionForms'
import Axios from 'axios';


class acceptOrReject extends Component {

  state = {
    loading: true,
    forms: []
  }

  componentDidMount() {
    const { companyId } = this.props.match.params 
    this._isMounted = true
    // console.log("form from axios starts")
    this.setState({loading: true})
    Axios
    
    .get(`http://localhost:8000/api/companies/${companyId}`)
    // .then(console.log("form from axios starts"))
    // .then(res => this.setState({ forms: res.data.data }))
    .then(res => this.setState({forms : 
      (res.data.data.form.acceptedByReviewer !== -1)?
      []
      :
    (res.data.data.form )
    }))
    .then(res => this.setState({loading: false}))
    .then(res => console.log(this.state.forms ))

    // .then(console.log("form from axios ends"))
    .catch(err => {
      console.log(err)
    })
    // console.log("form from axios ends")
    console.log(this.state)
}


  accept = (e , root) =>{
    e.preventDefault()
    const { reviewerId , companyId } = this.props.match.params
    Axios
    .put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`  , {decision: true})
    .then(res => {
      this.setState({ forms: [] })
    })
    .catch(err => {
      console.log(err)
    })
  }
  reject = (e , root) =>{
    e.preventDefault()
    const { reviewerId , companyId } = this.props.match.params

    Axios
    .put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`  , {decision: false})
    .then(res => {
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
      {this.state.loading? <h1>loading please be patient</h1>: 
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