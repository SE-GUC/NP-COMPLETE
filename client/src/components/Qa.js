import React, { Component } from 'react'
import { Collapse, Button } from 'reactstrap'
import { Card } from 'semantic-ui-react'

class Qa extends Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)

    this.state = {
      title: props.title,
      body: props.body,
      collapse: false
    }
  }

  toggle () {
    this.setState(state => ({ collapse: !state.collapse }))
  }

  render () {
    return (
      <div>
        <Button outline color='secondary' onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.state.title}</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card centered>
            <Card.Content>
              <Card.Description>{this.state.body}</Card.Description>
            </Card.Content>
          </Card>
        </Collapse>
      </div>
    )
  }
}

export default Qa
