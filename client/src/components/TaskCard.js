import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { Collapse} from 'reactstrap'

export class TaskCard extends Component {
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

  render() {
    return (
        <CardDeck> 
          <Card>
          <Button variant = 'primary' onClick={this.toggle} >{this.props.data.deadline}</Button>
          <Collapse isOpen={this.state.collapse}>
            <Card.Body>
              <Card.Title><h4>Description : {this.props.data.description}</h4></Card.Title>
              <Card.Text>
                Creation Date : {this.props.data.creationDate}
                <p />
                Department : {this.props.data.department}
                 <p />
                {/* {this.props.data.} */}
              </Card.Text>
            </Card.Body>
           </Collapse> 
          </Card>
        </CardDeck>
    )
  }
}
// Todo task description badl task name
export default TaskCard
