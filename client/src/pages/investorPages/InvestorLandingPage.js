import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap'
import Header2 from '../../components/Header2'
import '../../layout/styles.css'
import DisplayCard from '../../components/generic/DisplayCard'
import Faqs from './Faqs'
import ChooseForm from './ChooseForm'
import { Redirect } from 'react-router-dom'

class InvestorLandingPage extends Component {
  constructor(props) {
  super(props)
    this.state = {
      type: '',
      id: localStorage.getItem('id')
    }
  }
}

  click = (e) => {
    const type = e.target.id
    this.setState({type:type})
  }
 

  render () {
    console.log(this.state.type)
    if(this.state.type === ''){

      return (
        <div>
          <Header2 title='Welcome Investor' />
          {/* <button type="button" class="acceptBtn">Accept</button> */}
          <Row>
            <Col sm='6'>
              <DisplayCard title="Establish a company" text="Start your investments" buttonText="fill form" id="fillForm" click={this.click} />
            </Col>
            <Col sm='6'>
            <DisplayCard title="FAQ" text="Need help? check our helpful documentations" buttonText="help" id="faq" click={this.click} />
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
    if(this.state.type === 'company') {
      return <Redirect to='/investors/MyCompanies' />
    }
    if(this.state.type === 'faq') {
      return <Redirect to='/investors/Faqs' />
    }
    if(this.state.type === 'fillForm') {
      return <Redirect to='/investors/fillForm' />
    }
  }

export default InvestorLandingPage
