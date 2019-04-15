import React, { Component } from 'react'
import DecisionItem from './DecisionItem'

class DecisionForms extends Component {
  render () {
    return this.props.forms.map((form) => (
      <DecisionItem form={form}
        accept = {this.props.accept} reject = {this.props.reject} root = {this.props.root} />
    ))
  }
}

export default DecisionForms