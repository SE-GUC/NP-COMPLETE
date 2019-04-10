import React, { Component } from 'react'
import FormItem from './FormItem'

class Forms extends Component {
  render () {
    console.log( this.props.forms+'lolo')
    console.log(this.props.forms+ 'here')
    return this.props.forms.map((form) => (
      <FormItem key={form.id} form={form}
        accept = {this.props.accept} reject = {this.props.reject} root={this.props.root} />
    ))
  }
}

export default Forms
