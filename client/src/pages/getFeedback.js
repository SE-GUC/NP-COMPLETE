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
    Axios
    
    .get(`http://localhost:8000/api/admins/getFeedback/1`)
    .then(res => this.setState({feedbacks : 
      (res.data.data.length === 0)?
      []
      :
    (res.data.data)
    }))
    .then(res => this.setState({loading: false}))
    // .then(res => console.log(this.state.feedbacks ))

    .catch(err => {
      console.log(err)
    })
    console.log(this.state)
}

  render() {
    return (
      <div className="App">
      {this.state.loading? <h1>loading please be patient</h1>: 
      <h1>{this.state.feedbacks}</h1>      
      }     
      </div>
    )
  }
}

export default getFeedback 