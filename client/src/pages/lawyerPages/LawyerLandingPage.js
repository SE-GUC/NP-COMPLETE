import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'

export class LawyerLandingPage extends Component {
  render () {
    return (
      <div>
        <h1>Welcome Lawyer</h1>
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle>Fill a form</CardTitle>
              <CardText>Delegated by investor</CardText>
              <Button variant='primary'>fill form</Button>
            </Card>
          </Col>
          <Col sm='6'>
            <Card body>
              <CardTitle><h4>Cases Page</h4></CardTitle>
              <CardText> View all cases in the system</CardText>
              <Button variant='primary' href='/lawyers/viewAllCases/:id'>Click me</Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle>My companies</CardTitle>
              <CardText>Keep track of your companies</CardText>
              <Button variant='primary'>View list of companies - Adel</Button>
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

export default LawyerLandingPage
