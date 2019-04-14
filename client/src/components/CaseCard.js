import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { Collapse } from 'reactstrap'
export class CaseCard extends Component {
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
          <Button variant ='primary' onClick={this.toggle} >{this.props.data.name}</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card.Body>
              <Card.Title><h4>Name : {this.props.data.name}</h4></Card.Title>
              <Card.Text>
                Type : {this.props.data.type}
                {/* <p />
                {this.props.data.form.data} */}
                {/* <p />
                {this.props.data.} */}
              </Card.Text>
            </Card.Body>
          </Collapse>
        </Card>
      </CardDeck>
      // </div>
    )
  }
}

export default CaseCard
