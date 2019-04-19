import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../components/form/RegisterField'
import axios from 'axios'
import { Collapse } from 'reactstrap'
export class UpdateProfile extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      id: undefined,
      fullName: undefined,
      birthdate: undefined,
      email: undefined,
      password: undefined,
      collapse: false
    }
  }
  toggle () {
    this.setState(state => ({ collapse: !state.collapse }))
  }

  render() {
    return (
      <div>
        <Button color='outline-primary' onClick={this.toggle} style={{ marginBottom: '1rem' }}> Edit personal information </Button>
        {console.log(this.state.collapse)}
        <Collapse isOpen={this.state.collapse}>
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

        <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
           Update
        </Button>
        </Form>
        </Collapse>
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
