import React, { Component } from 'react'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'
import CardDeck from 'react-bootstrap/CardDeck'
export class EjournalCard extends Component {
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
        <Card className='text-muted' body inverse>
          <CardBody>
            <CardTitle>{this.state.name}</CardTitle>
            {/* {
                Object.keys(this.props.data).map(item =>
                  <Card.Text>
                    {this.props.data[item]}
                  </Card.Text>
                )} */}
            <CardText>
              {this.state.type}
            </CardText>
            <CardText>
              {this.state.establishmentDate}
            </CardText>
          </CardBody>
        </Card>
      </CardDeck>

    )
  }
}
export default EjournalCard
