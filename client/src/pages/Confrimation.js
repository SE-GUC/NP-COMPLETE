import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export class Confrimation extends Component {
  render () {
    const { model } = this.props.match.params
    const { emailToken } = this.props.match.params
    var returned
    axios
      .get(`/api/${model}/confirmation/${emailToken}`)
      .then(res => {
        returned = res.data.message
        alert(res.data.message)
      })
      .catch(error => alert(error.response.data.message))
    // return <Redirect to='/login' />
    return <div>{returned}</div>
  }
}

export default Confrimation
