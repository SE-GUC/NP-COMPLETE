import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'

export class RegisterField extends Component {
  render () {
    return (
      <Form.Group>
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control
          type={this.props.type}
          placeholder={this.props.placeholder}
          onChange={this.props.onChange} />
        <Form.Text className='text-muted'>
          {this.props.mutedText}
        </Form.Text>
      </Form.Group>
    )
  }
}

export default RegisterField
