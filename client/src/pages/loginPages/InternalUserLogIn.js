import React, { Component } from 'react'
import '../../App.css'
import LoginForm from '../../pages/LoginForm'
import { Button, Card, CardTitle, Col, Row } from 'reactstrap'
import Header2 from '../../components/Header2'

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

        <div>
          <Header2 title='Internal Portal Login' />
          <Row>
            <Col sm='6'>
              <Card body>
                <CardTitle>Admin</CardTitle>
                <Button id='admins' variant='primary' onClick={e => this.pickType(e)}>I am an Admin</Button>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm='6'>
              <Card body>
                <CardTitle>Lawyer</CardTitle>
                <Button id='lawyers' variant='primary' onClick={e => this.pickType(e)} >I am a Lawyer</Button>
              </Card>
            </Col>
            <Col sm='6'>
              <Card body>
                <CardTitle>Reviewer</CardTitle>
                <Button id='reviewers' variant='primary' onClick={e => this.pickType(e)}>I am a Reviewer</Button>
              </Card>
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <div className='App-header'>
        <div className='box-controller'>
          <div className='box-container'>
            <LoginForm type={this.state.type} />
          </div>
        </div>
      </div>
    )
  }
}

export default InternalUserLogIn
