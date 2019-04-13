import React, { Component } from 'react'
import { Col, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap'

class TextField extends Component {
    constructor(props){
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
            edit:props.edit,
            relativeIndex: props.relativeIndex,
            oldData: props.oldData,
            index: props.index,
            section: props.number
        }
        this.validate = this.validate.bind(this)
    }


  validate = async (e) => {
    if (this.state.validations) {
      
        const min = this.state.validations[0].min
        if (Number(e) < min) {
          this.setState({ validate: 'danger', errorMessage: `Minimum amount is ${min}` })
        } else {
          this.setState({ validate: 'safe', errorMessage: '' })
        }
        console.log(`e: ${e}, type of e ${typeof e} min: ${this.state.validations[0].min}, state: ${this.setState.validate}, errorM: ${this.setState.errorMessage}`)
    }
    await this.setState({value:e})
  }
  componentDidMount () {
    var relativeindex = this.state.index
    for (var i = 0; i < this.state.section; i++) {
      relativeindex += this.state.form.sections[i].numberOfFields
    }
    this.setState({ relativeIndex: relativeindex })
  }
  render () {
      const value = this.state.value
    return (
      <FormGroup row>
        <Label for={this.state.fieldName} sm={2}> {this.state.fieldName} </Label>
        <Col sm={10}>
          <Input type={this.state.inputType}
            name={this.state.fieldName}
            id={this.state.fieldName}
            placeholder={this.state.edit? this.state.oldData[this.state.relativeIndex]:this.state.placeholder}
            value={value}
            valid={this.state.validate === 'safe'}
            invalid={this.state.validate === 'danger'}
            onChange={e => {
              const { target } = e
              const value = target.type === 'checkbox' ? target.checked : target.value
              this.validate(value)
              this.props.change(e, this.props.index, this.props.number)
            }}
          />
          <FormFeedback valid>
            All good!
          </FormFeedback>
          <FormFeedback>
            {`Uh Oh! ${this.state.errorMessage}`}
          </FormFeedback>
          <FormText>This is most likely your {this.state.fieldName}.</FormText>
        </Col>
      </FormGroup>

    )
  }
}

export default TextField
