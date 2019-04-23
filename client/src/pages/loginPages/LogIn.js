import React, { Component } from 'react'
import '../../App.css'
import LoginForm from '../../pages/LoginForm'
import InternalUserLogIn from './InternalUserLogIn'
import { Button, Card, CardTitle, Col, Row } from 'reactstrap'
import Header2 from '../../components/Header2'

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
        <div>
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
        </div>
      )
    }

    if (this.state.portal === 'InvestorPortal') {
      return (
        <div className='App-header'>
          <div className='box-controller'>
            <div className='box-container'>
              <LoginForm type='investors' />
            </div>
          </div>
        </div>
      )
    }
    return <InternalUserLogIn />
  }
}

export default LogIn