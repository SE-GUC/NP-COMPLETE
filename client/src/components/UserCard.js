import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
export class UserCard extends Component {
  render () {
    const func = !this.props.approve ? 'Delete' : 'Approve'
    const funcAr = !this.props.approve ? 'امسح' : 'وافق'

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
                <Button variant='danger' onClick={this.props.ondelete.bind(this, this.props.data._id)}>{func}</Button>
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
                <Button variant='danger' onClick={this.props.ondelete.bind(this, this.props.data._id)}>{funcAr}</Button>
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      )
    }
  }
}

export default UserCard
