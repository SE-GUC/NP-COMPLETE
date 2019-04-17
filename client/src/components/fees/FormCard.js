import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { Collapse } from 'reactstrap'
export class FormCard extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)

    this.state = {
      collapse: false
    }
  }

  toggle () {
    this.setState(state => ({ collapse: !state.collapse }))
  }

  render () {
    return (
      // <div>
      <CardDeck>
        <Card>
          <Button variant ='primary' onClick={this.toggle}>{this.props.data.name}</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card.Body>
              <Card.Title><h4>Name : {this.props.data.name}</h4></Card.Title>
              <Card.Text>
                Type : {this.props.data.type}
              </Card.Text>
              <Card.Text>
                Fees : {this.props.data.fees}
              </Card.Text>
              <Button variant = 'primary' onClick={() => this.props.chooseForm(this.props.data._id, this.props.data.fees)}>Choose form</Button>
            </Card.Body>
          </Collapse>
        </Card>
      </CardDeck>
      // </div>
    )
  }
}

export default FormCard
