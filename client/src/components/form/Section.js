import React, { Component } from 'react'
import DropDown from './DropDown'
import TextField from './TextField'
// import Container from 'react-bootstrap/Container'

class Section extends Component {
  constructor (props) {
    super(props)
    this.state = {
      number: props.number,
      sectionName: props.section.sectionName,
      fields: props.section.fields,
      oldData: props.oldData
    }
  }

  render () {
    return (
      this.state.fields.map((fields, i) => {
        if (fields.fieldType === 'dropdownList') {
          return <DropDown form={this.props.form} index={i} fields={fields} edit={this.props.edit} oldData={this.state.oldData} number={this.props.number} change={this.props.change} />
        } else if (fields.fieldType === 'textField') {
          return <TextField form={this.props.form} index={i} fields={fields} edit={this.props.edit} oldData={this.state.oldData} number={this.props.number} change={this.props.change} />
        }
      })
    )
  }
}

export default Section
