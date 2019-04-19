import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../components/form/RegisterField'
import axios from 'axios'
import { Collapse } from 'reactstrap'
export class UpdateProfile extends Component {
  constructor (props) {
    super(props)
    this.togglePersonal = this.togglePersonal.bind(this)
    this.toggleSecured = this.toggleSecured.bind(this)
    this.state = {
      id: undefined,
      fullName: undefined,
      birthdate: undefined,
      email: undefined,
      password: undefined,
      collapsePersonal: false,
      collapseSecured: false
    }
  }
  togglePersonal () {
    this.setState(state => ({ collapsePersonal: !state.collapsePersonal }))
  }
  toggleSecured () {
    this.setState(state => ({ collapseSecured: !state.collapseSecured }))
  }
  render() {
    return (
      <div>
        <Button color='outline-primary' onClick={this.togglePersonal} style={{ marginBottom: '1rem' }}> Edit personal information </Button>
        <Collapse isOpen={this.state.collapsePersonal}>
        <Form>

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
        <br/>
      <Button color='outline-primary' onClick={this.toggleSecured} style={{ marginBottom: '1rem' }}> Edit secured information </Button>
      <Collapse isOpen={this.state.collapseSecured}>
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
