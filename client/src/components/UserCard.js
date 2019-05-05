import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { Collapse, Card, CardTitle, CardText, CardBody } from 'reactstrap'
export class UserCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collapse: false
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle () {
    this.setState(state => ({ collapse: !state.collapse }))
  }
  render () {
    if (localStorage.getItem('language') === 'English') {
      return (
        <div>
          <CardDeck>
            <Card className='text-muted' body inverse>
              <CardBody>
                <CardTitle><h4>{this.props.data.fullName}</h4></CardTitle>
                <CardText>
                  {this.props.data.email}
                  <p />
                  {this.props.data.birthdate}
                  <p />
                  {this.props.data.startDate}
                </CardText>
                <Button variant='secondary' onClick={this.toggle}>Delete</Button>
                <Collapse isOpen={this.state.collapse}>
                  <br />
                  <Button variant='secondary' onClick={this.props.ondelete.bind(this, this.props.data._id)}>Yes</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant='secondary' onClick={this.toggle}>No</Button>
                </Collapse>
              </CardBody>
            </Card>
          </CardDeck>
        </div>
      )
    } else {
      return (
        <div>
          <CardDeck>
            <Card className='text-muted' body inverse>
              <CardBody>
                <CardTitle><h4>{this.props.data.fullName}</h4></CardTitle>
                <CardText>
                  {this.props.data.email}
                  <p />
                  {this.props.data.birthdate}
                  <p />
                  {this.props.data.startDate}
                </CardText>
                <Button variant='secondary'onClick={this.toggle}>امسح</Button>
                <Collapse isOpen={this.state.collapse}>
                  <br />
                  <Button variant='secondary' onClick={this.props.ondelete.bind(this, this.props.data._id)}>Yes</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant='secondary' onClick={this.toggle}>No</Button>
                </Collapse>
              </CardBody>
            </Card>
          </CardDeck>
        </div>
      )
    }
  }
}

export default UserCard
