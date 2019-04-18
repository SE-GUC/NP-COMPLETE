import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import RegisterField from '../components/form/RegisterField'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export class ResetPassword extends Component {
  render () {
    return (
      <Form>
        <RegisterField
          label='New Password'
          type='password'
          placeholder='Password'
          onChange={e => this.setState({ firstPassword: e.target.value })} />

        <RegisterField
          label='Re-type Password'
          type='password'
          placeholder='Password'
          onChange={e => this.setState({ secondPassword: e.target.value })} />
        <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
      Save
        </Button>
      </Form>
    )
  }
  clicked = e => {
    const { model } = this.props.match.params
    const { emailToken } = this.props.match.params
    e.preventDefault()
    axios
        .post(`http://localhost:8000/api/${model}/resetPassword/${emailToken}`, this.state)
        .then(res => alert(res.data.message),<Redirect to='../../../investors/login' />)
        .catch(error => alert(error.response.data.message))
    } 
}

export default ResetPassword
