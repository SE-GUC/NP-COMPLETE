import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../App.css'

class FormItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.name,
      value: this.props.value
    }
  }

  render () {
    return (

      <Row>
        <Col> {this.state.name} </Col>
        <Col> {this.state.value} </Col>
      </Row>

    )
    
    }
}

export default FormItem
