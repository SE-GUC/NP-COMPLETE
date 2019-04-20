import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../components/form/RegisterField'
import axios from 'axios'

export class UpdateProfile extends Component {

 

  state = {
    id: localStorage.getItem('id'),
    fullName: undefined,
    birthdate: undefined,
    email: undefined,
    password: undefined
}

  render() {
    return (
      <div>
        <Form>

        <RegisterField
          label='Email address'
          type='email'
          placeholder='update email'
          onChange={e => this.setState({email: e.target.value})}
           />

        <RegisterField
          label='Password'
          type='text'
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

        <Button variant='secondry' type='submit' onClick={e => this.clicked(e)}>
           Update
        </Button>
        </Form>
        
      </div>
    )
  }

  clicked = e => {
    e.preventDefault()
    const updatedData = {fullName:this.state.fullName,
      birthdate:this.state.birthdate,
      email:this.state.email,
      password:this.state.password}
      const temp = {}
      Object.keys(updatedData).forEach(key=>{
        if(this.state[key]!== undefined) {
          temp[key]=updatedData[key]
        }
      })
        axios
        .put(`/api/investors/${this.state.id}`, temp)
        .then(res => alert(`Profile updated successfully`))
        .catch(error => alert(error.response.data.message))
    } 

}

export default UpdateProfile
