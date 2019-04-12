import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export class AdminLandingPage extends Component {

  render() {
    return (
      <div>
        <h1>Welcome Admin</h1>
        <Card>
            <Card.Body>
              <Card.Title><h4>Cases Page</h4></Card.Title>
              <Card.Text>
                View all cases in the system
              </Card.Text>
             <Button variant='primary' href='http://localhost:3000/admins/viewAllCases/5cafc730199ec12808cac488'>Click me</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title><h4>Publish Page</h4></Card.Title>
              <Card.Text>
                Publish a company
                <br/>
                lsa lujine bt3mlha
              </Card.Text>
             <Button variant='primary' href='http://localhost:3000/admins/viewAllCases/5cafc730199ec12808cac488'>Click me</Button>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title><h4>Account Page</h4></Card.Title>
              <Card.Text>
                View my account information
                <br/>
                do we have one aslan ??????????????????!!!!!!!!!!!!!!!!!!!!!!
              </Card.Text>
             <Button variant='primary' href='http://localhost:3000/admins/deleteAdmin'>Admins</Button>
             <Button variant='primary' href='http://localhost:3000/admins/deleteLawyer'>Lawyers</Button>
             <Button variant='primary' href='http://localhost:3000/admins/deleteReviewer'>Reviewers</Button>
             <Button variant='primary' href='http://localhost:3000/admins/deleteInvestor'>Investors</Button>
            </Card.Body>
          </Card>
      </div>
    )
  }
}

export default AdminLandingPage
