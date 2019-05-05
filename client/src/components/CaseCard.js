import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import { Collapse, Button } from 'reactstrap'
export class CaseCard extends Component {
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
        // <div>
        <CardDeck>
          <Card className='text-muted' >
            <Button color='secondary' onClick={this.toggle} >{this.props.data.name}</Button>
            <Collapse isOpen={this.state.collapse}>
              <Card.Body>
                <Card.Title><h4>Name : {this.props.data.name}</h4></Card.Title>
                <Card.Text>
                Type : {this.props.data.type}
                  <p />
                It was filled by a Lawyer
                  {/* <p />
                {this.props.data.} */}
                </Card.Text>
              </Card.Body>
            </Collapse>
          </Card>
        </CardDeck>
        // </div>
      )
    } else {
      return (
        // <div>
        <CardDeck>
          <Card className='text-muted'>
            <Button variant='secondary' onClick={this.toggle} >{this.props.data.name}</Button>
            <Collapse isOpen={this.state.collapse}>
              <Card.Body>
                <Card.Title><h4>الاسم : {this.props.data.name}</h4></Card.Title>
                <Card.Text>
                  النوع : {this.props.data.type}
                  <p />
                    تم كتابتها عن طريق محامي
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
}

export default CaseCard
