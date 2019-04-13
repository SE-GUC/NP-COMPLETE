import React, { Component } from 'react';
import Header from '../components/Header'
import Forms from '../components/Forms'
import Axios from 'axios';


class acceptOrRejectInvestorForm extends Component {

  state = {
    loading: true,
    forms: []
  }

  componentDidMount() {
    const { companyId } = this.props.match.params 
    this._isMounted = true
    this.setState({loading: true})
    Axios
    
    .get(`http://localhost:8000/api/companies/${companyId}`)
    .then(res => this.setState({forms : 
      (res.data.data.form.acceptedByLawyer !== -1)?
      []
      :
    (res.data.data.form )
    }))
    .then(res => this.setState({loading: false}))
    .catch(err => {
      console.log(err)
    })
}


  accept = (e , root) =>{
    e.preventDefault()
    const { lawyerId , companyId } = this.props.match.params
    Axios
    .put(`http://localhost:8000/api/lawyers/review/${lawyerId}/${companyId}`  , {acceptedByLawyer: 1 , comment: ' '})
    .then(res => {
      this.setState({ forms: [] })
    })
    .catch(err => {
      console.log(err)
    })
  }
  reject = (e , root) =>{
    e.preventDefault()
    const { lawyerId , companyId } = this.props.match.params

    Axios
    .put(`http://localhost:8000/api/lawyers/review/${lawyerId}/${companyId}`  , {acceptedByLawyer: 0 , comment: ' '})
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