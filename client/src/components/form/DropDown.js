import React, { Component } from 'react'
import { Col, FormGroup, Label, Input } from 'reactstrap'

class DropDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: props.form,
      fieldName: props.fields.fieldName,
      dropdownOptions: props.fields.dropdownOptions,
      required: props.fields.required,
      relativeIndex: 0,
      oldData: props.oldData,
      edit: props.edit,
      index: props.index,
      section: props.number
    }
  }
  componentDidMount () {
    if (this.state.edit) {
      var relativeindex = this.state.index
      for (var i = 0; i < this.state.section; i++) {
        relativeindex += this.state.form.sections[i].numberOfFields
      }
      this.setState({ relativeIndex: relativeindex })
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
            <option default>{this.state.edit ? (this.state.oldData[this.state.relativeIndex]) : 'Please Select An Option'}</option>
            {renderOptions}
          </Input>
        </Col>
      </FormGroup>

    )
  }
}

export default DropDown
