import React from 'react'
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'
import axios from 'axios'



export class AdminSendEmails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
      const{ message, recipients} = this.state
      if(!message){
        {alert('Message cannot be empty')}
      }
      else {
        console.log(this.state.recipients)
      axios
      .post('/api/admins/sendAnnouncement',{message,recipients})
      .then(res => { alert(res.data.message)})
      .catch(error => {alert(error.message)})
      }
  }
  render () {
    return (
      <Form onSubmit = {this.handleSend} style={{ width: '600px' }}>
        <FormGroup>
          <Label for='message'>Message:</Label>
          <Input
            type='textarea'
            name='message'
            onChange={this.handleChange} />
        </FormGroup>
    
        <FormGroup>
          <Label for="recipients">Send To:</Label>
          <Input type="select" name="recipients" id="recipients"  mutedText ='asas' value={this.state.recipients} onChange={this.handleChange}>
          <option> </option>
            <option>Investors</option>
            <option>Lawyers</option>
            <option>Reviewers</option>
          </Input>
          <h>
            If you don't specfiy , message will be sent to all members on the system
          </h>
        </FormGroup>
        <Button>Send</Button>
      </Form>
    )
  }
}

export default AdminSendEmails
