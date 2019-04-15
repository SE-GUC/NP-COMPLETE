import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import Header2 from '../../components/Header2'

class InvestorLandingPage extends Component {
  state = {
    id: this.props.match.params
  }
 

  render () {
    console.log(this.state.id)
    return (
      <div>
        <Header2 title='Welcome Investor' />
        
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle>Establish a company</CardTitle>
              <CardText>Start your investments</CardText>
              <Button variant='primary' href='/investors/fillForm'>fill form</Button>
            </Card>
          </Col>
          <Col sm='6'>
            <Card body>
              <CardTitle>FAQ</CardTitle>
              <CardText>need help? check our helpful documentations</CardText>
              <Button variant='primary' href='/investors/Faqs'>Click me</Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle>My companies</CardTitle>
              <CardText>Keep track of your companies</CardText>
              <Button variant='primary' href={`/investors/MyCompanies/${this.state.id}`} >View list of companies</Button>
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

export default InvestorLandingPage
