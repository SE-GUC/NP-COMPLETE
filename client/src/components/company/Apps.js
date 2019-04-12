import React, { Component } from 'react'
import AppItem from './AppItem'

export class Apps extends Component {
  
  render () { 
    return this.props.forms.map((form) => (
      <AppItem key={form.id} form={form} cancel={this.props.cancel} />
    ))
  }
}

export default Apps
