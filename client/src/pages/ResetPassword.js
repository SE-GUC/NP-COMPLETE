import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import RegisterField from '../components/form/RegisterField'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
export class ResetPassword extends Component {
  state= {
    firstPassword: undefined,
    secondPassword: undefined
  }
  render () {
    return (
      <Form>
        <RegisterField
          label='New Password'
          type='password'
          placeholder='Password'
          onChange={e => this.setState({ firstPassword: e.target.value })}
          mutedText={this.validatePassword()? '': this.errors()[0]} />

        <RegisterField
          label='Re-type Password'
          type='password'
          placeholder='Re-type Password'
          onChange={e => this.setState({ secondPassword: e.target.value })}
          mutedText ={this.checkMatching()}/>
        <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
      Save
        </Button>
      </Form>
    )
  }
  validatePassword = () =>{
    const passwordRegx = /(?=.*[!@#$%^&*_])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
    return passwordRegx.test(this.state.firstPassword)? true : false 
  }
  errors = () => {
    var errors = []
    if(this.state.firstPassword){
    if (this.state.firstPassword.length < 8) {
      errors.push('Your password must be at least 8 characters')
    }
    if (this.state.firstPassword.search(/[a-z]/i) < 0) {
      errors.push('Your password must contain at least one small letter')
    }
    if (this.state.firstPassword.search(/[A-Z]/) < 0) {
      errors.push('Your password must contain at least one capital letter')
    }
    if (this.state.firstPassword.search(/[0-9]/) < 0) {
      errors.push('Your password must contain at least one digit.')
    }
    if (this.state.firstPassword.search(/[!@#$%^&*_]/) < 0) {
      errors.push('Your password must contain at least one special character like * ! ^ !')
    }
  }
    return errors
  }

  clicked = e => {
    const { model } = this.props.match.params
    const { emailToken } = this.props.match.params
    e.preventDefault()
    axios
        .post(`/api/${model}/resetPassword/${emailToken}`, this.state)
        .then(res => alert(res.data.message),<Redirect to='../../../investors/login' />)
        .catch(error => alert(error.response.data.message))
    } 
    checkMatching = ()=>{
      if(!this.state.secondPassword){
        return ''
      }
      return  (this.state.firstPassword===this.state.secondPassword)? '' : `Passwords don't match`
    }
}

export default ResetPassword
