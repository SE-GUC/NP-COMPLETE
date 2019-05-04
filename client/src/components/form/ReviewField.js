import React, { Component } from 'react'
import { Col, FormGroup, Label } from 'reactstrap'

class ReviewField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      form: props.form,
      fieldName: props.fields.fieldName,
      required: props.fields.required,
      inputType: props.fields.inputType,
      validations: props.fields.validations,
      placeholder: props.fields.placeholder,
      validate: '',
      errorMessage: '',
      value: '',
      oldData: props.oldData,
      index: props.index,
      number: props.number,
      relative: 0
    }
  }
  async componentDidMount () {
    var relativeindex = await this.state.index
    for (var i = 0; i < this.state.number; i++) {
      relativeindex += this.state.form.sections[i].numberOfFields
    }
    await this.setState({ relative: relativeindex })
  }
  render () {
    return (
      <FormGroup row>
        <Label for={this.state.fieldName} sm={2}> {this.state.fieldName} </Label>
        <Col sm={10}>
          <fieldset disabled>
            <div >
              <div class='col-sm-10'>
                <input type='text' id='disabledTextInput' class='form-control' placeholder={this.state.oldData[this.state.relative]} />
              </div>
            </div>
          </fieldset>
        </Col>
      </FormGroup>

    )
  }
}

export default ReviewField
