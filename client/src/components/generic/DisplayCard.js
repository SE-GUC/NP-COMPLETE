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
      <Card.Header>{props.title}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      <Button basic color='grey' id={props.id} onClick={e => props.click(e)}>
        {props.buttonText}
      </Button>

    </Card.Content>
  </Card>
  )
}

export default DisplayCard
