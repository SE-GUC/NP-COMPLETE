import React, { Component } from 'react'
import '../../App.css'
import LoginForm from '../../pages/LoginForm'
import { Card, Container, Header } from 'semantic-ui-react'
import DisplayCard from '../../components/generic/DisplayCard'

class InternalUserLogIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: ''
    }
    this.pickType = this.pickType.bind(this)
  }

  pickType (e) {
    const type = e.target.id
    this.setState({ type: type })
  }

  render () {
    if (this.state.type === '') {
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
          <Header inverted as='h1'>Internal Portal Login</Header>
          <Card.Group>
            <DisplayCard title='Admin' text='Log in as an admin' buttonText='I am an admin' id='admins' click={e => this.pickType(e)} />
            <DisplayCard title='Lawyer' text='Log in as a lawyer' buttonText='I am a lawyer' id='lawyers' click={e => this.pickType(e)} />
            <DisplayCard title='Reviewer' text='Log in as a reviewer' buttonText='I am a reviewer' id='reviewers' click={e => this.pickType(e)} />
          </Card.Group>
        </Container>
      )
    }

    return <LoginForm type={this.state.type} />
  }
}

export default InternalUserLogIn
