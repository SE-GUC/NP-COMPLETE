import React, { Component } from 'react'
import '../../App.css'
import LoginForm from '../../pages/LoginForm'
import InternalUserLogIn from './InternalUserLogIn'
import { Container, Card, Header } from 'semantic-ui-react'
import DisplayCard from '../../components/generic/DisplayCard'

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

        <Container fluid >
          <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
          </style>
          <Header inverted as='h1'>Log In</Header>
          <Card.Group centered>
            <DisplayCard title='Log in to Investor Portal:' buttonText='I am an Investor' id='InvestorPortal' click={e => this.pickType(e)} />
            <DisplayCard title='Log in to Internal Portal:' buttonText='I am an Internal User' id='InternalPortal' click={e => this.pickType(e)} />
          </Card.Group>
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
