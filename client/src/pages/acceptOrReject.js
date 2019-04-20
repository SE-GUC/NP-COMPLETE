import React, { Component } from 'react';
import DecisionForms from '../components/DecisionForms'
import Axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'


class acceptOrReject extends Component {

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
      (res.data.data.form.acceptedByReviewer !== -1)?
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
      {this.state.loading? <Spinner animation="border" variant= "primary" />: 
         <div>     
            <DecisionForms forms = {[this.state.forms]}
              accept = {this.accept}
              reject = {this.reject}
              root = {this}
            />  
        </div>
      }     
      </div>
    )
  }
}

export default acceptOrReject;