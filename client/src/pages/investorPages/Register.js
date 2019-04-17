import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../../components/form/RegisterField'
import axios from 'axios'

export class Register extends Component {
    
  render () {
    return (
      <Form>
        <RegisterField
          label='Email address'
          type='email'
          placeholder='Enter email'
          mutedText={'We\'ll never share your email with anyone else'}
          onChange={e => this.setState({email: e.target.value})}
           />

        <RegisterField
          label='Password'
          type='password'
          placeholder='Password'
          onChange={e => this.setState({password: e.target.value})} />

        <RegisterField
          label='fullName'
          placeholder='Enter full name'
          onChange={e => this.setState({fullName: e.target.value})} />

        <RegisterField
          label='birthdate'
          type='date'
          placeholder='Enter birthdate'
          onChange={e => this.setState({birthdate: e.target.value})} />

        <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
          Submit
        </Button>
      </Form>
    )
  }

  clicked = e => {
    e.preventDefault()
    axios
        .post(`/api/investors/register`, this.state)
        .then(res => alert('A confirmation email was sent to you, please check your mail'))
        .catch(error => alert(error.response.data.message))
    } 
}

export default Register
