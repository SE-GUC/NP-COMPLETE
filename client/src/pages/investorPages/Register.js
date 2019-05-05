import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Container, Col } from 'reactstrap'
import { Button, Header } from 'semantic-ui-react'
import RegisterField from '../../components/form/RegisterField'
import axios from 'axios'

export class Register extends Component {
    
  render () {
    if (localStorage.getItem('language') === 'English') {
    return (
      <Container className='App'>
      <Col sm="12" md={{ size: 6, offset: 3 }}>
      <Header inverted centered as='h1'>Sign up to Gafi Web</Header>
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
      </Col>
      </Container>
    )
  }else{
    return (
      <Form>
        <RegisterField
          label='البريد الالكتروني'
          type='email'
          placeholder='ادخل البريد الالكتروني'
          mutedText={'لن نقوم ايدا بمشاركته مع اي احد اخر'}
          onChange={e => this.setState({email: e.target.value})}
           />

        <RegisterField
          label='كلمة السر'
          type='password'
          placeholder='كلمة السر'
          onChange={e => this.setState({password: e.target.value})} />

        <RegisterField
          label='الاسم كامل'
          placeholder='ادخل الاسم كاملا'
          onChange={e => this.setState({fullName: e.target.value})} />

        <RegisterField
          label='تاريخ الميلاد'
          type='date'
          placeholder='ادخل تاريخ الميلاد'
          onChange={e => this.setState({birthdate: e.target.value})} />

        <Button inverted type='submit' onClick={e => this.clicked(e)}>
          سجل
        </Button>
      </Form>
    )
  }
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
