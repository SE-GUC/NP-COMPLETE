import React, { Component } from 'react';
import Forms from '../components/Forms'
import Axios from 'axios';
import Alert from 'react-bootstrap/Alert'

class acceptOrRejectInvestorForm extends Component {

  state = {
    loading: true,
    error: false,
    msg:'',
    forms: []
  }

  componentDidMount() {
    const { companyId } = this.props.match.params 
    this._isMounted = true
    this.setState({loading: true})
    Axios
    
    .get(`/api/companies/${companyId}`)
    .then(res => this.setState({forms : 
      (res.data.data.form.acceptedByLawyer !== -1)?
      []
      :
    (res.data.data.form )
    }))
    .then(res => this.setState({loading: false}))
    .catch(err => {
      this.setState({error: true , loading: false})   
     })
}


  accept = (e , root) =>{
    e.preventDefault()
    const { lawyerId , companyId } = this.props.match.params
    Axios
    .put(`/api/lawyers/review/${lawyerId}/${companyId}`  , {acceptedByLawyer: 1 , comment: ' '})
    .then(res => {
      this.setState({ forms: [] })
    })
    .catch(err => {
      this.setState({error: true , loading: false})    
    })
  }
  reject = (e , root) =>{
    e.preventDefault()
    const { lawyerId , companyId } = this.props.match.params

    Axios
    .put(`/api/lawyers/review/${lawyerId}/${companyId}`  , {acceptedByLawyer: 0 , comment: ' '})
    .then(res => {
      this.setState({ forms: [] })
    })
    .catch(err => {
      this.setState({error: true , loading: false})    
    })
  }

  render() {
    return (
      <div className="App">
      {this.state.loading? <h1>loading please be patient</h1>: 
      (this.state.error?<Alert variant="danger">
        Appears like something has gone wrong please try again
      </Alert>:
      <Forms forms = {[this.state.forms]}
         accept = {this.accept}
         reject = {this.reject}
         root = {this}
      />   )   }     
      </div>
    );
  }
}

export default acceptOrRejectInvestorForm