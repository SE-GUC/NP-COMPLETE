import React from 'react'
import { Card, Button } from 'semantic-ui-react'

const DisplayCard = (props) => {
  if (props.text) {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{props.title}</Card.Header>

          <Card.Description>
            {props.text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='grey' id={props.id} onClick={e => props.click(e)}>
            {props.buttonText}
          </Button>

        </Card.Content>
      </Card>
    )
  }

  return (
    <Card>
      <Card.Content>
        <Card.Header>Steve Sanders</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}

export default DisplayCard
