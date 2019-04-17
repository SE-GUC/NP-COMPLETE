import React, { Component } from 'react';
import Header from '../components/Header'
import Forms from '../components/Forms'
import Axios from 'axios';


class acceptOrRejectInvestorForm extends Component {

  state = {
    loading: true,
    forms: [],
    idEntered:false,
    companyId:""
  }

  componentDidMount() {
   if (this.state.idEntered) {
      this._isMounted = true
    this.setState({loading: true})
    Axios
    
    .get(`/api/companies/${this.state.companyId}`)
    .then(res => this.setState({forms : 
      (res.data.data.form.acceptedByLawyer !== -1)?
      []
      :
    (res.data.data.form )
    }))
    .then(res => this.setState({loading: false}))
    .catch(err => {
      console.log(err)
    })}
}


  accept = (e , root) =>{
    e.preventDefault()
    const lawyerId= localStorage.getItem('id')
    Axios
    .put(`/api/lawyers/review/${lawyerId}/${this.state.companyId}`  , {acceptedByLawyer: 1 , comment: ' '})
    .then(res => {
      this.setState({ forms: [] })
    })
    .catch(err => {
      console.log(err)
    })
  }
  reject = (e , root) =>{
    e.preventDefault()
    const lawyerId= localStorage.getItem('id')
    Axios
    .put(`/api/lawyers/review/${lawyerId}/${this.state.companyId}`  , {acceptedByLawyer: 0 , comment: ' '})
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
      this.state.error? <h1>Error please try again</h1>
      :
      !this.state.idEntered?
      <div>
        <label>companyID</label>
        <input 
          type="text"
          value={this.state.companyId}
          onChange={(e)=>this.setState({companyId:e.target.value})}
        /> 
        <button onClick={()=>{this.setState({idEntered:true})}}>search</button>
      </div>
      :
      <Forms forms = {[this.state.forms]}
         accept = {this.accept}
         reject = {this.reject}
         root = {this}
      />      }     
      </div>
    );
  }
}

export default acceptOrRejectInvestorForm