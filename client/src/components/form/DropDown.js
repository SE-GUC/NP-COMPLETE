import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'

class DropDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fieldName: props.fields.fieldName,
      dropdownOptions: props.fields.dropdownOptions,
      required: props.fields.required
    }
  }

  render () {
    const renderOptions = this.state.dropdownOptions.map(option => {
      return <option diabeled> {option} </option>
    })
    return (

      <FormGroup row>
        <Label for={this.state.fieldName} sm={2}> {this.state.fieldName} </Label>
        <Col sm={10}>
          <Input type='select' name={this.state.fieldName}
            id={this.state.fieldName}
            onChange={(e) => {
              console.log(e.target.value)
              this.props.change(e, this.props.index, this.props.number)
            }}>
            <option default>Select an option</option>
            {renderOptions}
          </Input>
        </Col>
      </FormGroup>

    )
  }
}

export default DropDown
