import React, { Component } from 'react';
import Header from '../components/Header'
import Forms from '../components/Forms'
import Axios from 'axios';


class acceptOrReject extends Component {
  constructor(props) {
    super(props)
  this.state = {
    loading: true,
    forms: []
  }
  }
  componentDidMount() {
    const { reviewerId } = this.props.match.params 
    this._isMounted = true
    console.log("form from axios starts")
    this.setState({loading: true})
    Axios
    
    .get(`http://localhost:8000/api/reviewers/formsToReview/${reviewerId}`)
    // .then(console.log("form from axios starts"))
    // .then(res => this.setState({ forms: res.data.data }))
    .then(res => this.setState({forms : res.data.data , loading: false}))
    // .then(console.log("form from axios ends"))
    .catch(err => this.setState({ error: true }))
    console.log("form from axios ends")
    console.log(this.state)
}

  accept = (e , companyId, root) =>{
    e.preventDefault()
    const { reviewerId } = this.props.match.params
    Axios
    .put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`  , {decision: true})
    .then(res => {
      console.log("hi")  

      console.log(res.data.data)  
      console.log("bye")  


      root.setState({ forms: res.data.data })
      console.log(res.data.data)  
    })
    .catch(err => {
      console.log(err)
    })
  }
  reject = (e , companyId, root) =>{
    e.preventDefault()

    const { reviewerId } = this.props.match.params

    Axios
    .put(`http://localhost:8000/api/reviewers/decideAnApplication/${reviewerId}/${companyId}`  , {decision: false})
    .then(res => {
      root.setState({ forms: res.data.data })
      console.log(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div>
      <Header/>
      <h1>{this.state.forms.length}</h1>
     <div>
     {this.state.loading? <h1>loading please be patient</h1>: 
      <Forms forms = {this.state.forms}
         accept = {this.accept}
         reject = {this.reject}
         root = {this}
      />      }
      </div>
      </div>
    );
  }
}

export default acceptOrReject;
