import React, { Component } from 'react';
import Companies from '../components/fees/Companies'
import Axios from 'axios';


class payFees extends Component {

  state = {
    loading: true,
    companies: []
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
    .then(res => this.setState({companies : 
      (res.data.data.form.paid)?
      []
      :
    (res.data.data )
    }))
    .then(res => this.setState({loading: false}))
    .then(res => console.log(this.state.companies ))

    // .then(console.log("form from axios ends"))
    .catch(err => {
      console.log(err)
    })
    // console.log("form from axios ends")
    console.log(this.state)
}


  pay = (e , root) =>{
    e.preventDefault()
    const { investorId , companyId } = this.props.match.params
    Axios
    .put(`http://localhost:8000/api/investors/payFees/${investorId}`  , {id: companyId})
    .then(res => {
      console.log(res.data.data)  
      this.setState({ companies: [] })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
      {this.state.loading? <h1>loading please be patient</h1>: 
      <Companies companies = {[this.state.companies]}
         pay = {this.pay}
         root = {this}
      />      }     
      </div>
    );
  }
}

export default payFees