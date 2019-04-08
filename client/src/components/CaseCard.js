import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
export class CaseCard extends Component {
  render () {
    return (
      <div>
        <CardDeck>
          <Card border="primary">
            <Card.Body>
              <Card.Title><h4>{this.props.data.name}</h4></Card.Title>
              <Card.Text>
                {this.props.data.type}
                {/* <p />
                {this.props.data.}
                <p />
                {this.props.data.} */}
              </Card.Text>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    )
  }
}

export default CaseCard
