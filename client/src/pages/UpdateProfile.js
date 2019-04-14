import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../components/form/RegisterField'
import axios from 'axios'

export class UpdateProfile extends Component {

 

  state = {
    id: undefined,
    fullName: undefined,
    birthdate: undefined,
    email: undefined
}

  render() {
    return (
      <div>
        <Form>
        <RegisterField
          label='Id'
          type='id'
          placeholder='userId'
          // eslint-disable-next-line no-const-assign
          onChange={e => this.setState({id: e.target.value})}
           />

        <RegisterField
          label='Email address'
          type='email'
          placeholder='update email'
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

        <Button variant='secondry' type='submit' onClick={e => this.clicked(e)}>
           Update
        </Button>
        </Form>
        
      </div>
    )
  }

  clicked = e => {
    e.preventDefault()
    console.log(this.state)
    const updatedData = {fullName:this.state.fullName,birthdate:this.state.birthdate,email:this.state.email}
    axios
        .put(`http://localhost:8000/api/investors/${this.state.id}`, updatedData)
        .then(res => alert(`Profile updated successfully`))
        .catch(error => alert(error.response.data.message))
    } 

}

export default UpdateProfile
