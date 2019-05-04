import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { Collapse } from 'reactstrap'
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
            <Card border='danger'>
              <Card.Body>
                <Card.Title><h4>{this.props.data.fullName}</h4></Card.Title>
                <Card.Text>
                  {this.props.data.email}
                  <p />
                  {this.props.data.birthdate}
                  <p />
                  {this.props.data.startDate}
                </Card.Text>
                <Button variant='danger' onClick={this.toggle}>Delete</Button>
                <Collapse isOpen={this.state.collapse}>
                  <br />
                  <Button variant='danger' onClick={this.props.ondelete.bind(this, this.props.data._id)}>Yes</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant='danger' onClick={this.toggle}>No</Button>
                </Collapse>
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      )
    } else {
      return (
        <div>
          <CardDeck>
            <Card border='danger'>
              <Card.Body>
                <Card.Title><h4>{this.props.data.fullName}</h4></Card.Title>
                <Card.Text>
                  {this.props.data.email}
                  <p />
                  {this.props.data.birthdate}
                  <p />
                  {this.props.data.startDate}
                </Card.Text>
                <Button variant='danger' onClick={this.props.ondelete.bind(this, this.props.data._id)}>امسح</Button>
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      )
    }
  }
}

export default UserCard
