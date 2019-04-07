import React, { Component } from 'react';
import Header from '../components/Header'
import Forms from '../components/Forms'
import Axios from 'axios';


class acceptOrReject extends Component {

  state = {
    forms: [
      {
        id: 1,
        title: 'balabizo1'
      }
    ]
  }
  accept = () =>{
    const { reviewerId , companyId } = this.props.match.params
    Axios
    .put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`  , {decision: true})
    .then(res => {
      console.log(res.data.data)  
    })
    .catch(err => {
      console.log(err)
    })
  }
  reject = () =>{
    const { reviewerId , companyId } = this.props.match.params

    Axios
    .put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`  , {decision: false})
    .then(res => {
      console.log(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="App">
      <Header/>
      <Forms forms = {this.state.forms}
         accept = {this.accept}
         reject = {this.reject}
      />      
      </div>
    );
  }
}

export default acceptOrReject;
