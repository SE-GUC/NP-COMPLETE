import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
export class UserCard extends Component {
  
  render() {
    return (
      <div>
        <CardDeck>
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title><h4>{this.props.data.fullName}</h4></Card.Title>
    <Card.Text>
        {this.props.data.email}
        <p></p>
        {this.props.data.birthdate}
        <p></p>
        {this.props.data.startDate}
    </Card.Text>
    <Button variant="danger" onClick = {this.props.ondelete.bind(this, this.props.data._id)}>Delete</Button>
  </Card.Body>
</Card> 
</CardDeck>
      </div>
    )
  }
}

export default UserCard
