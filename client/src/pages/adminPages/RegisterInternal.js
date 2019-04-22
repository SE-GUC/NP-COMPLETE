import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import RegisterField from '../../components/form/RegisterField'
import axios from 'axios'

export class RegisterInternal extends Component {
    state = {
    }

  render() {
    if (localStorage.getItem('language') === 'English') {
    return (
      <Form>
        <RegisterField
          label='Type'
          type='text'
          placeholder='Choose type'
          onChange={e => this.setState({type: e.target.value})}
           />  

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

        <RegisterField
          label='workingHours'
          type='text'
          placeholder='workingHours'
          onChange={e => this.setState({workingHours: e.target.value})} />

        <RegisterField
          label='salary'
          type='text'
          placeholder='salary'
          onChange={e => this.setState({salary: e.target.value})} />

        <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
          Submit
        </Button>
      </Form>
    )
  } else {
    return (
      <Form>
        <RegisterField
          label='النوع'
          type='text'
          placeholder='اختر النوع'
          onChange={e => this.setState({type: e.target.value})}
           />  

        <RegisterField
          label='البريد الالكتروني'
          type='email'
          placeholder='ادخل البريد الالكتروني'
          mutedText={'لن نقوم ابدا بمشاركته مع اي احد'}
          onChange={e => this.setState({email: e.target.value})}
           />

        <RegisterField
          label='كلمة السر'
          type='password'
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

        <RegisterField
          label='عدد ساعات العمل'
          type='text'
          placeholder='عدد ساعات العمل'
          onChange={e => this.setState({workingHours: e.target.value})} />

        <RegisterField
          label='المرتب'
          type='text'
          placeholder='المرتب'
          onChange={e => this.setState({salary: e.target.value})} />

        <Button variant='primary' type='submit' onClick={e => this.clicked(e)}>
          ادخال
        </Button>
      </Form>
    )
  }
  }
  
  clicked = e => {
    e.preventDefault()
    const type = this.state.type
    var data = {startDate: new Date()}
    Object.keys(this.state).forEach( key=>{
            if(key!=='type'){
                data[key]=this.state[key]
            }
        }
    )
    axios
        .post(`/api/${type}/register/`, data)
        .then(res => alert(`You registered one ${type} with id ${res.data.data._id}`))
        .catch(error => alert(error.response.data.message))
    } 

}

export default RegisterInternal
