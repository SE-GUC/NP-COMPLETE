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
    this.togglePassword = this.togglePassword.bind(this)
    this.toggleEmail = this.toggleEmail.bind(this)

    this.state = {
      id: undefined,
      fullName: undefined,
      birthdate: undefined,
      email: undefined,
      oldPassword : undefined,
      firstPssword: undefined,
      secondPassword: undefined,
      collapsePersonal: false,
      collapseSecured: false,
      collapsePassword: false,
      collapseEmail: false
    }
  }
  togglePersonal () {
    console.log(this.state.collapseEmail)
    this.setState(state => ({ collapsePersonal: !state.collapsePersonal }))
  }
  toggleSecured () {
    this.setState(state => ({ collapseSecured: !state.collapseSecured }))
  }
  togglePassword () {
    this.setState(state => ({ collapsePassword: !state.collapsePassword }))
  }
  toggleEmail () {
    console.log(this)
    this.setState(state => ({ collapseEmail: !state.collapseEmail }))
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
      <Button color='outline-primary' onClick={this.togglePassword} style={{ marginBottom: '1rem' }}> Edit Your Password </Button>
      <Collapse isOpen={this.state.collapsePassword}>
      <Form>
       <RegisterField
        label='Curent Password'
        type='password'
        placeholder='Old Password'
        onChange={e => this.setState({oldPassword: e.target.value})}
         />
{/* koko wawa edit target e value placeholfers kolo */}
      <RegisterField
        label='New Password'
        type='password'
        placeholder='Password'
        onChange={e => this.setState({firstPssword: e.target.value})} />
      
      <RegisterField
        label='Confirm New Password'
        type='password'
        placeholder='Re-type Password'
        onChange={e => this.setState({secondPassword: e.target.value})} />

      <Button variant='primary'  onClick={e => this.updatePassword(e)}>
         Update Password
      </Button>
      </Form>
      </Collapse>
      <br/>
      <Button color='outline-primary' onClick={this.toggleEmail} style={{ marginBottom: '1rem' }}> Edit Your Email </Button>
      <Collapse isOpen={this.state.collapseEmail}>
      <Form>
       <RegisterField
        label='Current Email address'
        type='email'
        placeholder='current email'
        onChange={e => this.setState({email: e.target.value})}
         />

      <RegisterField
        label='New Email address'
        type='email'
        placeholder='new email'
        onChange={e => this.setState({password: e.target.value})} />
      <Button variant='primary' onClick={this.toggleEmail}>
         Update
      </Button>
      </Form>
      </Collapse>

      </Collapse>
      <br/>
      
    </div>
    )
  }

// <Form>
//       <RegisterField
//         label='Email address'
//         type='email'
//         placeholder='update email'
//         onChange={e => this.setState({email: e.target.value})}
//          />

//       <RegisterField
//         label='Password'
//         type='text'
//         placeholder='Password'
//         onChange={e => this.setState({password: e.target.value})} />
//       <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
//          Update
//       </Button>
//       </Form>




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
    updatePassword = e =>{
      e.preventDefault()
      const data = {
        currentPassword:this.state.oldPassword,
        firstPssword:this.state.firstPssword,
        secondPassword:this.state.secondPassword
      }
      const id = localStorage.getItem('id') 
      axios
      .put(`api/user/5cbba53e39f80847203d1b7c`,data)
      .then(res => alert(`Profile password successfully`))
      .catch(error => alert(error.response.data.message))
    }

}

export default UpdateProfile
