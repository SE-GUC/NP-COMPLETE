import React, { Component } from 'react'
import FormItem from './FormItem'

class Forms extends Component {
  render () {
    return this.props.forms.map((form) => (
      <FormItem form={form}
        accept = {this.props.accept} reject = {this.props.reject} root = {this.props.root} />
    ))
  }
}

export default Forms