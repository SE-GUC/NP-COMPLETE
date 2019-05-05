import React from 'react'
import { Card, Button } from 'semantic-ui-react'

const DisplayCard = (props) => {
  if (props.text) {
    return (
      <Card centered>
        <Card.Content>
          <Card.Header textAlign='center' centered>{props.title}</Card.Header>

          <Card.Description textAlign='center' centered>
            {props.text}
          </Card.Description>
        </Card.Content>
        <Card.Content extra textAlign='center' centered>
          <Button basic color='grey' id={props.id} onClick={e => props.click(e)}>
            {props.buttonText}
          </Button>

        </Card.Content>
      </Card>
    )
  }

  return (
    <Card centered padded='horizontally'>
      <Card.Content textAlign='center' centered>
        <Card.Header textAlign='center' centered>{props.title}</Card.Header>
      </Card.Content>
      <Card.Content extra textAlign='center' centered>
        <Button basic color='grey' id={props.id} onClick={e => props.click(e)}>
          {props.buttonText}
        </Button>

      </Card.Content>
    </Card>
  )
}

export default DisplayCard
