import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
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
      <Card fluid>
        <Card.Content>
          <Card.Header>{this.state.name}</Card.Header>
          <Card.Description>
            {this.state.type}
          </Card.Description>
          <Card.Description>
            {this.state.establishmentDate}
          </Card.Description>
          <Card.Description>
            {this.state.feedback}
          </Card.Description>
        </Card.Content>
      </Card>

    )
  }
}

export default MyCompaniesCard
