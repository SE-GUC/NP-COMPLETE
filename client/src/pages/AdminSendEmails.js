import React from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import axios from 'axios'



export class AdminSendEmails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
      recipients:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)

  }

  handleChange = (e) => {
      this.setState({[e.target.name] : e.target.value})
     
  }

   handleSend = (e) => {
      e.preventDefault()
      const{name, email, message, recipients} = this.state
      axios
      .post('/api/admins/sendAnnouncement',{
        name,
        email,
        message,
        recipients
      })
      .then(res => { alert(res.data.msg)})
      .catch(error => {
        alert(error)
        console.log(error)})
      
  }
  render () {
    return (
      <Form onSubmit = {this.handleSend} style={{ width: '600px' }}>
        <FormGroup >
          <Label for='name'>Name:</Label>
          <Input
            type='text'
            name='name'
            placeholder='Admin'
            onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for='email'>Email:</Label>
          <Input
            type='email'
            name='email'
            placeholder='gafiweb2019@gmail.com'
            onChange={this.handleChange} />
        </FormGroup>

        <FormGroup>
          <Label for='message'>Message:</Label>
          <Input
            type='textarea'
            name='message'
            onChange={this.handleChange} />
        </FormGroup>
    
        <FormGroup>
          <Label for="recipients">Send To:</Label>
          <Input type="select" name="recipients" id="recipients"  value={this.state.recipients} onChange={this.handleChange} 
>
            <option>Investors</option>
            <option>Lawyers</option>
            <option>Reviewers</option>
          </Input>
        </FormGroup>
        <Button>Send</Button>
      </Form>
    )
  }
}

export default AdminSendEmails
