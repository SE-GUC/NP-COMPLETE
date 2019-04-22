import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import {ListGroup} from 'reactstrap'

export default class SettingsPage extends React.Component {
  
    onClick = (e) => {
    const id = localStorage.getItem('id')
    const type = localStorage.getItem('type')

    switch(type) {
        case 'Investor': axios.delete('/api/investors/'+ id)
        .then(res => console.log(res.message))
        .catch(error => console.log(error.message));break;
        case 'Reviewer': axios.delete('/api/reviewers/'+ id)
        .then(res => console.log(res.message))
        .catch(error => console.log(error.message));break;
        case 'Lawyer': axios.delete('/api/lawyers/'+ id)
        .then(res => console.log(res.message))
        .catch(error => console.log(error.message));break;
        case 'Admin': axios.delete('/api/admins/'+ id)
        .then(res => console.log(res.message))
        .catch(error => console.log(error.message));break;
        }  

  }
  
    render () {
    return (
      <div>
        <h3>Settings </h3>
        <ListGroup >
          <Button href='/user/UpdateProfile'> Update Profile </Button>
          <br></br>
          <Button href='/ForgetPassword'> Reset Password</Button>
          <br></br>
          <Button href='/login' href = '/login/' onClick= {this.onClick}> Delete Account</Button>
        </ListGroup>
      </div>
    )
  }
}
