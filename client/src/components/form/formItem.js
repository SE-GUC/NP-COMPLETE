import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap/Button'
import '../../App.css'

class FormItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // name: this.props.name,
      value: this.props.value
    }
  }

  render () {
    return (
      <Container>
        <Row>
          <Col> Fixed </Col>
          <Col> {this.props.value} </Col>
        </Row>
      </Container>
    )
  }
}

export default FormItem
