import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../components/form/RegisterField'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export class ForgetPassword extends Component {
  render () {
    
    return (
      <Form>
        <RegisterField
          label='Email address'
          type='email'
          placeholder='Enter email'
          onChange={e => this.setState({ email: e.target.value })}
        />
        <Button variant='primary' type='Reset' onClick={e => this.clicked(e)}>
          Send
        </Button>
      </Form>
    )
  }
  clicked = e => {
    e.preventDefault()
    axios
        .post(`/api/user/forgetPassword/`, this.state)
        .then(res => alert(res.data.message))
        .catch(error => alert(error.message))
    }
}

export default ForgetPassword
