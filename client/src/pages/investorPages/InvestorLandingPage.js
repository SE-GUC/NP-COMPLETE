import React, { Component } from 'react'
import { Row, Col } from 'reactstrap'
import Header2 from '../../components/Header2'
import { Container, Header } from 'semantic-ui-react'
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


  click = (e) => {
    const type = e.target.id
    this.setState({type:type})
  }
 

  render () {
    console.log(this.state.type)
    if(this.state.type === ''){

      return (
        <Container>
          <Header inverted as='h1'>Welcome Investor </ Header>
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
            <DisplayCard title="My Companies" text="Keep track of your companies" buttonText="show companies" id="company" click={this.click} />
            </Col>
            <Col sm='6'>
            <DisplayCard title="Additional functionality" text="Coming soon..." buttonText="show companies" id="company" click={this.click} />
            </Col>
          </Row>
  
        </Container>
  
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
}

export default InvestorLandingPage
