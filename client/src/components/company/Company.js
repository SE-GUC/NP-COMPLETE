import React, { Component } from 'react'
import CItem from './CItem'

export class Company extends Component {
  render () {
    return this.props.forms.map((form) => (
      <CItem key={form.id} form={form} publish={this.props.publish} />
    ))
  }
}

export default Company
