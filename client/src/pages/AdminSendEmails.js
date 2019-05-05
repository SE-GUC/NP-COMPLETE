import React from 'react'
import { Form, FormGroup, Input, Label, Button, Container, Col } from 'reactstrap'
import { Header } from 'semantic-ui-react'
import axios from 'axios'
import '../App.css'


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
        {alert('Message cannot be empty') }
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
      <Container className='App'>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Header inverted centered as='h1'>Send Custom Announcements</Header>
          <Form onSubmit = {this.handleSend} style={{alignContent:'center', width: '600px' }}>
            <FormGroup>
              <Label for='message'>Announcement Message:</Label>
              <Input
                type='textarea'
                name='message'
                onChange={this.handleChange} />
            </FormGroup>
        
            <FormGroup>
              <Label for="recipients">Send To:</Label>
              <Input type="select" name="recipients" id="recipients"  mutedText ='test' value={this.state.recipients} onChange={this.handleChange}>
              <option> </option>
                <option>Investors</option>
                <option>Lawyers</option>
                <option>Reviewers</option>
                <option>Everyone</option>
              </Input>
              <h>
                If you don't specfiy , the message will be sent to all members of the system.
              </h>
            </FormGroup>
            <Button>Send</Button>
          </Form>
        </Col>
      </Container>
    )
  }
}

export default AdminSendEmails
