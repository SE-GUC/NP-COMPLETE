import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import Header2 from '../../components/Header2'
import '../../layout/styles.css'

class InvestorLandingPage extends Component {
  // state = {
  //   id: this.props.match.params
  // }

  fillForm=()=>{
    console.log(localStorage.getItem('id'), ':you must be logged in')
    if(!localStorage.getItem('id') || !localStorage.getItem('type') === 'investor'){
      window.location.href='/LogIn'
    }
    else{
      window.location.href='/investors/fillForm'
    }
    
  }

  myCompanies=()=>{
    console.log(localStorage.getItem('id'), ':you must be logged in')
    if(!localStorage.getItem('id') || !localStorage.getItem('type') === 'investor'){
      window.location.href='/LogIn'
    }
    else{
      window.location.href='/investors/fillForm'
    }
    
  }
 

  render () {
    // console.log(this.state.id)
    return (
      <div>
        <Header2 title='Welcome Investor' />
        {/* <button type="button" class="acceptBtn">Accept</button> */}
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle>Establish a company</CardTitle>
              <CardText>Start your investments</CardText>
              <Button class="acceptBtn" onClick={this.fillForm}>fill form</Button>
            </Card>
          </Col>
          <Col sm='6'>
            <Card body>
              <CardTitle>FAQ</CardTitle>
              <CardText>need help? check our helpful documentations</CardText>
              <Button variant='primary' href='/investors/Faqs'>help</Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col sm='6'>
            <Card body>
              <CardTitle>My companies</CardTitle>
              <CardText>Keep track of your companies</CardText>
              <Button variant='primary' href= '/investors/MyCompanies' onClick={this.myCompanies} >View list of companies</Button>
            </Card>
          </Col>
          <Col sm='6'>
            <Card body>
              <CardTitle>Additional functionality</CardTitle>
              <CardText>Coming soon...</CardText>
            </Card>
          </Col>
        </Row>

      </div>

    )
  }
}

export default InvestorLandingPage
