import React, { Component } from 'react'
import '../../App.css'
import LoginForm from '../../pages/LoginForm'
import InternalUserLogIn from './InternalUserLogIn'
import { Container, Button, Card, CardTitle, Col, Row } from 'reactstrap'
import { Header } from 'semantic-ui-react'
import Header2 from '../../components/Header2'
import { Link } from 'react-router-dom'
class LogIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      portal: ''
    }
    this.pickType = this.pickType.bind(this)
  }

  pickType (e) {
    const portal = e.target.id
    this.setState({ portal: portal })
  }

  render () {
    if (this.state.portal === '') {
      return (
        <Container>
          <Header>Login </Header>
          <Header2 title='Login' />
          <Row>
            <Col sm='6'>
              <Card body>
                <CardTitle>Log in to Investor Portal</CardTitle>
                <Button id='InvestorPortal' variant='primary' onClick={e => this.pickType(e)} >I am an Investor</Button>
              </Card>
            </Col>
            <Col sm='6'>
              <Card body>
                <CardTitle>Log in to Internal Portal</CardTitle>
                <Button id='InternalPortal' variant='primary' onClick={e => this.pickType(e)}>I am an Internal User</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      )
    }

    if (this.state.portal === 'InvestorPortal') {
      return <LoginForm type='investors' />
    }
    return <InternalUserLogIn />
  }
}

export default LogIn
