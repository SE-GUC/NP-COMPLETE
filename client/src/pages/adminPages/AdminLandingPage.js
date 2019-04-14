import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'

export class AdminLandingPage extends Component {
  render () {
    return (
      <div>
        <h1>Welcome Admin</h1>
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle><h4>Cases Page</h4></CardTitle>
              <CardText> View all cases in the system</CardText>
              <Button variant='primary' href='/admins/viewAllCases/5cafc730199ec12808cac488'>Click me</Button>
            </Card>
          </Col>
          <Col sm='6'>
            <Card body>
              <CardTitle><h4>Publish Page</h4></CardTitle>
              <CardText>Publish a company</CardText>
              {/* <Button variant='primary' href='/admins/viewAllCases/5cafc730199ec12808cac488'>Click me</Button> */}
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle><h4>Accounts Page</h4></CardTitle>
              <CardText>View my account information</CardText>
              <Button variant='primary' href='/admins/deleteAdmin'>Admins</Button>
              <Button variant='primary' href='/admins/deleteLawyer'>Lawyers</Button>
              <Button variant='primary' href='/admins/deleteReviewer'>Reviewers</Button>
              <Button variant='primary' href='/admins/deleteInvestor'>Investors</Button>
            </Card>
          </Col>
          <Col sm='6'>
            <Card body>
              <CardTitle>Additional functionality</CardTitle>
              <CardText>Coming soon...</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }
}

export default AdminLandingPage
