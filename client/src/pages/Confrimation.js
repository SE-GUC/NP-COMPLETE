import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export class Confrimation extends Component {
  render () {
    const { model } = this.props.match.params
    const { emailToken } = this.props.match.params
    var returned
    console.log('model'+model)
    axios
      .get(`localhost:8000/api/${model}/confirmation/${emailToken}`)
      .then(res => {
        console.log('res')
        console.log(res)
        console.log('data')
        console.log(res.data)
        returned = res.data.message
        alert(res.data.message)
      })
      .catch(error => {
        console.log('error')
        console.log(error)
        alert(error.response.data.message)})
    // return <Redirect to='/login' />
    return <div>{returned}</div>
  }
}

export default Confrimation
