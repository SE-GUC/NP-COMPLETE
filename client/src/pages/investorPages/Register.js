import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../../components/form/RegisterField'
import axios from 'axios'

export class Register extends Component {
    
    state = {
        fullName: undefined,
        birthdate: undefined,
        email: undefined
    }

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
          placeholder='Password' />

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
    console.log(this.state)
    axios
        .post(`http://localhost:8000/api/investors/`, this.state)
        .then(res => alert(`You are now registered with id ${res.data.data._id}`))
        .catch(error => alert(error.response.data.message))
    } 
}

export default Register
