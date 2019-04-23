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
      fullName: undefined,
      birthdate: undefined,
      email: undefined,
      oldPassword : undefined,
      firstPassword: undefined,
      secondPassword: undefined,
      collapsePersonal: false,
      collapseSecured: false,
      collapsePassword: false,
      collapseEmail: false
    }
  }
  togglePersonal () {
    this.setState(state => ({ collapsePersonal: !state.collapsePersonal }))
  }
  toggleSecured () {
    this.setState(state => ({ collapseSecured: !state.collapseSecured }))
  }
  togglePassword () {
    this.setState(state => ({ collapsePassword: !state.collapsePassword }))
  }
  toggleEmail () {
    this.setState(state => ({ collapseEmail: !state.collapseEmail }))
  }
  render() {
    if (localStorage.getItem('language') === 'English') {
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
      <RegisterField
        label='New Password'
        type='password'
        placeholder='Password'
        mutedText={this.validatePassword()? '': this.errors()[0]} 
        />
        
      
      <RegisterField
        label='Confirm New Password'
        type='password'
        placeholder='Re-type Password'
        mutedText ={this.checkMatching()}
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
        label='Current Password address'
        type='password'
        placeholder='current password'
        onChange={e => this.setState({oldPassword: e.target.value})}
         />

      <RegisterField
        label='New Email address'
        type='email'
        placeholder='new email'
        onChange={e => this.setState({email: e.target.value})} />
      <Button variant='primary' onClick={e => this.updateEmail(e)}>
         Update Email
      </Button>
      </Form>
      </Collapse>

      </Collapse>
      <br/>
      
    </div>
    )
  }else{
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
          label='البريد الالكتروني'
          type='email'
          placeholder='تحديث البريد الالكتروني'
          onChange={e => this.setState({email: e.target.value})}
           />

        <RegisterField
          label='كلمة السر'
          type='text'
          placeholder='كلمة السر'
          onChange={e => this.setState({password: e.target.value})} />

        <RegisterField
          label='الاسم الكامل'
          placeholder='الاسم الكامل'
          onChange={e => this.setState({fullName: e.target.value})} />

        <RegisterField
          label='تاريخ الميلاد'
          type='date'
          placeholder='تاريخ الميلاد'
          onChange={e => this.setState({birthdate: e.target.value})} />

        <Button variant='secondry' type='submit' onClick={e => this.clicked(e)}>
           تحديث
        </Button>
        </Form>
        
      </div>
    )
  }
  }
  clicked = e => {
    e.preventDefault()
    const updatedData = {fullName:this.state.fullName,
      birthdate:this.state.birthdate}
      console.log(updatedData)
      const id = localStorage.getItem('id') 
      const temp = {}
      Object.keys(updatedData).forEach(key=>{
        if(this.state[key]!== undefined && this.state[key]!=="" ) {
          temp[key]=updatedData[key]
        }
      })
      console.log(temp)
        axios
        .put(`/api/investors/${id}`, temp)
        .then(res => alert(`Profile updated successfully`))
        .catch(error => alert(error.response.data.message))
    }
    updatePassword = e =>{
      e.preventDefault()
      const data = {
        currentPassword:this.state.oldPassword,
        firstPassword:this.state.firstPassword,
        secondPassword:this.state.secondPassword
      }
      const id = localStorage.getItem('id') 
      axios
      .put(`/api/user/updatePassword/${id}}`,data)
      .then(res => alert(res.data.message))
      .catch(error => alert(error.message))
      this.setState({collapsePassword:false})
    }
    updateEmail = e =>{
      e.preventDefault()
      const data = {
        currentPassword:this.state.oldPassword,
        email:this.state.email
      }
      const id = localStorage.getItem('id') 
      axios
      .put(`/api/user/updateEmail/${id}}`,data)
      .then(res => alert(res.data.message))
      .catch(error => alert(error.message))
      this.setState({collapseEmail:false})
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
    checkMatching = ()=>{
      if(!this.state.secondPassword){
        return ''
      }
      return  (this.state.firstPassword===this.state.secondPassword)? '' : `Passwords don't match`
    }
    validatePassword = () =>{
      const passwordRegx = /(?=.*[!@#$%^&*_])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/
      return passwordRegx.test(this.state.firstPassword)? true : false 
    }
}

export default UpdateProfile
