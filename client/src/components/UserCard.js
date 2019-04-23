import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
export class UserCard extends Component {
  render () {
    const func = !this.props.approve ? 'Delete' : 'Approve'
    const funcAr = !this.props.approve ? 'امسح' : 'وافق'
    const But = !this.props.approve ? <Button variant='danger' onClick={this.props.ondelete.bind(this, this.props.data._id)}>{func}</Button>
      : <Button variant='danger' onClick={this.props.onApprove.bind(this, this.props.data._id)}>{func}</Button>
    const text = !this.props.approve ? <p />
      : <div>
        <input type='text' placeholder='Salary' onChange={this.props.handleSalary} />
        <input type='text' placeholder='workingHours' onChange={this.props.handleWorkingHours} />
      </div>
    if (localStorage.getItem('language') === 'English') {
      return (
        <div>
          <CardDeck>
            <Card border='danger'>
              <Card.Body>
                <Card.Title><h2>{this.props.data.fullName}</h2></Card.Title>
                <Card.Text>
                  <h4>Email</h4>
                  {this.props.data.email}
                  <p />
                  <h4>Birthdate</h4>
                  {this.props.data.birthdate}
                  <p />
                  <h4>StartDate</h4>
                  {this.props.data.startDate}
                </Card.Text>
                {But}
                {text}
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
                {text}
              </Card.Body>
            </Card>
          </CardDeck>
        </div>
      )
    }
  }
}

export default UserCard
