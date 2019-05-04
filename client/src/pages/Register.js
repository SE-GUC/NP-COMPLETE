import React, { Component } from 'react'
import { Button, Form, Segment, Header } from 'semantic-ui-react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { Radio } from 'semantic-ui-react'
import axios from 'axios'
export class Register extends Component {
    state = {
        fullName:'',
        email:'',
        firstPassword:'',
        secondPassword:'',
        birthdate:'',
        accepted:false,
        type:'',
        matched:true
    }
  render () {
    return (
      <Segment inverted>
        <Header
          as='h1'
          content='Join Gafi today'
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '1.5em'
          }}
        />

        <Form inverted>
        <div class="ui big form">
        <Form>
        <Form.Field required fluid label = 'Selected value' >
        <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            id = "rad1"
            label='Admin'
            name='radioGroup'
            onChange={e=> this.setState({type:'Admin'})}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            id = "rad2"
            label='Lawyer'
            name='radioGroup'
            onChange={e=> this.setState({type:'Lawyer'})}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            id = "rad2"
            label='Lawyer'
            name='radioGroup'
            onChange={e=> this.setState({type:'Lawyer'})}
          />
        </Form.Field>
        <Form.Field>
          <Radio
             id = "rad3"
            label='Investor'
            name='radioGroup'
            // value='that'
            // checked={this.state.value === 'that'}
            onChange={e=> this.setState({type:'Investor'})}
          />
        </Form.Field>
      </Form>
          <Form.Group align='center' >
            <div className='col-sm' >
              <Form.Input required  fluid label='Full Name' placeholder='First name' width={6}  
              onChange={e => this.setState({fullName: e.target.value})}
              />
            </div>
          </Form.Group>
          <Form.Group align='center'>
            <div className='col-sm'>
              <Form.Input required fluid label='Email' placeholder='Last name' width={6} 
              onChange={e => this.setState({email: e.target.value})}/>
            </div>
          </Form.Group>
          <Form.Group align='center'>
            <div className='col-sm'>
              <Form.Input required fluid label='Password' placeholder='Last name' width={6} type='password' fontSize='50' 
              onChange={e => this.setState({firstPassword: e.target.value})}/>
            </div>
          </Form.Group>
          <Form.Group align='center'>
            <div className='col-sm'>
              <Form.Input required fluid label='Re-type Password' placeholder='Last name' width={6} type='password' 
              onChange={e => this.setState({secondPassword: e.target.value})}/>
            </div>
          </Form.Group>
          <Form.Group align='center'>
            <div className='col-sm'>
              <Form.Input required  fluid label='Birthdate' placeholder='Last name' width={6} type='date' 
              onChange={e => this.setState({birthdate: e.target.value})}/>
            </div>
          </Form.Group>
          {/* <Form.Checkbox label='I agree to the Terms and Conditions' onChange={e => this.setState({accepted: !this.state.accepted })}/> */}
          <Button type='submit' onClick={e => this.clicked(e)} >Submit</Button>
          </div>
        </Form>
        
      </Segment>
    )
  }
  clicked = e => {
    e.preventDefault()
    const data = {
        fullName:this.state.fullName,
        email:this.state.email,
        password:this.state.firstPassword,
        birthdate:this.state.birthdate
    }
    if(this.state.firstPassword===this.state.secondPassword){
   switch(this.state.type){
       case 'Admin' : 
       axios
           .post(`/api/admins/register`, data)
           .then(res => alert('A confirmation email was sent to you, please check your mail'))
           .catch(error => alert(error.response.data.message)); break ;
        case 'Lawyer' :
        axios
           .post(`/api/lawyers/register`, data)
           .then(res => alert('A confirmation email was sent to you, please check your mail'))
           .catch(error => alert(error.response.data.message)); 
           break ;
        case 'Investor':
        axios
           .post(`/api/investors/register`, data)
           .then(res => alert('A confirmation email was sent to you, please check your mail'))
           .catch(error => alert(error.response.data.message)); break ;
        case 'Reviewer':
        axios
           .post(`/api/reviewers/register`, data)
           .then(res => alert('A confirmation email was sent to you, please check your mail'))
           .catch(error => alert(error.response.data.message)); break ;

   }
    }
    else {
        this.setState({matched: false})
    }
}
    handleChange = (e, { value }) => this.setState({ type: value })
}

export default Register

