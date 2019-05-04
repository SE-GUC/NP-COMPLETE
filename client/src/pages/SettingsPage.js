import React from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import {ListGroup,Collapse, CardBody, Card} from 'reactstrap'
import { Link } from 'react-router-dom'

export default class SettingsPage extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
      }
      toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
      }
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
        <Link to='/user/UpdateProfile'><Button> Update Profile </Button></Link>
          <br />
          <Link to='/ForgetPassword'><Button> Reset Password </Button></Link>
          <br />
          <Button color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Delete Account</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Are you sure you want to delete this account? This cannot be undone.
            </CardBody>
            <Button variant="primary" href='/login' onClick= {this.onClick}>Yes</Button>
            <br />
            <Button variant="primary" onClick= {this.toggle}>No</Button>
            <br />
          </Card>
        </Collapse>
        </ListGroup>
      </div>
    )
  }
}
