import React, { Component } from 'react';
import Forms from '../components/Forms'
import Axios from 'axios';
import ShowCompanies from '../components/fees/ShowCompanies';
import Spinner from 'react-bootstrap/Spinner'


class acceptOrRejectInvestorForm extends Component {

  state = {
    loading: true,
    forms: [],
    idEntered:false,
    companyId:"",
    loading:true,
    allForms:[]
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
    .then(this.setState({loading: false}))
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
  chooseForm = (id,F)=>{
    this.setState({companyId:id,idEntered:true,loading:false})
  }
  render() {
    return (
      <div className="App">
      {this.state.loading? <Spinner animation="border" variant= "primary" />: 
      this.state.error? <h1>Error please try again</h1>
      :
      !this.state.idEntered?
      <ShowCompanies Forms={this.state.allForms} chooseForm={this.chooseForm}/>
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