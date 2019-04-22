import React, { Component } from 'react';
import Axios from 'axios';


class getFeedback extends Component {

  state = {
    loading: true,
    feedbacks: []
  }

  componentDidMount() {
    const { companyId } = this.props.match.params 
    this._isMounted = true
    this.setState({loading: true})
    const adminId = localStorage.getItem('id')
    Axios
    .get(`/api/admins/getFeedback/${adminId}`)
    .then(res => this.setState({feedbacks : 
      (res.data.data.length === 0)?
      []
      :
    (res.data.data)
    }))
    .then(res => this.setState({loading: false}))
    .catch(err => {
      console.log(err)
    })
    console.log(this.state)
}

  render() {
    return (
      <div>
      {this.state.loading? <h1>loading please be patient</h1>: 
     this.state.feedbacks.map((x) => (
     <h1>{x}</h1>      
     ))
      }     
      </div>
    )
  }
}

export default getFeedback 