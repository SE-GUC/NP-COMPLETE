import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
export class MyCompaniesCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount () {
    Object.keys(this.props.data).forEach(key => {
      this.setState({ [key]: this.props.data[key] })
    })
  }
  render () {
    return (
      <CardDeck>
        <Card>
          <Card.Body>
            <Card.Title>{this.state.name}</Card.Title>
            <Card.Text>
              {this.state.type}
            </Card.Text>
            <Card.Text>
              {this.state.establishmentDate}
            </Card.Text>
            <Card.Text>
              {this.state.feedback}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>

    )
  }
}

export default MyCompaniesCard
