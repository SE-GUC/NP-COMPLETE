import React, { Component } from 'react'
import FormItem from './FormItem'
import '../../App.css'

class FormDisplay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fields: this.props.fields,
      data: this.props.form
    }
  }

  render () {
    return (
      this.state.data.map((field, i) => (
        <div>
          <FormItem name={this.state.fields[i]} value={field} />
        </div>
      ))
    )
  }
}

export default FormDisplay
