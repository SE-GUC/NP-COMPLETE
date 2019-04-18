import React from 'react'
import { Card, Button, CardTitle, CardText } from 'reactstrap'

const DisplayCard = (props) => {
  if (props.text) {
    return (
      <Card body>
        <CardTitle>{props.title}</CardTitle>
        <CardText>{props.text}</CardText>
        <Button id={props.id} class='acceptBtn' onClick={e => props.click(e)}>{props.buttonText}</Button>
      </Card>
    )
  }

  return (
    <Card body>
      <CardTitle>{props.title}</CardTitle>
      <Button class='acceptBtn' onClick={props.click}>{props.buttonText}</Button>
    </Card>
  )
}

export default DisplayCard
