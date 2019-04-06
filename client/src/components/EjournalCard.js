import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
export class EjournalCard extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     key: ''
  //   }
  // }
  render () {
    return (
      <div>
        <CardDeck>
          <Card>
            <Card.Body>
              <Card.Title>{this.props.data.name}</Card.Title>
              {
                Object.keys(this.props.data).splice(1, Object.keys.length + 1).map(item =>
                  <Card.Text>
                    {this.props.data[item]}
                  </Card.Text>
                )}
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    )
  }
  // componentDidMount () {
  //   this.setState({ key: this.props.data._id })
  // }
}
export default EjournalCard
