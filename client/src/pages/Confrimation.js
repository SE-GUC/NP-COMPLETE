import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export class Confrimation extends Component {
  render () {
    const { model } = this.props.match.params
    const { emailToken } = this.props.match.params
    axios
      .get(`/api/${model}/confirmation/${emailToken}`)
      .then(res => alert(res.data.message))
      .catch(error => alert(error.message))
    return <Redirect to='../../../investors/login' />
  }
}

export default Confrimation
