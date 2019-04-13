import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

export class InvestorLandingPage extends Component {

    render() {
        return(
            <div> 
                <h1>
                    Welcome Investor
                </h1>
        <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>Establish a company</CardTitle>
          <CardText>Start your investments</CardText>
          <Button variant='primary'>fill form</Button>
        </Card>
      </Col>
      <Col sm="6">
        <Card body>
          <CardTitle>FAQ</CardTitle>
          <CardText>need help? check our helpful documentations</CardText>
          <Button variant='primary' href='/investors/Faqs'>Click me</Button>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col sm="6">
        <Card body>
          <CardTitle>My companies</CardTitle>
          <CardText>Keep track of your companies</CardText>
          <Button variant='primary'>View list of companies - Adel</Button>
        </Card>
      </Col>
      <Col sm="6">
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

export default InvestorLandingPage