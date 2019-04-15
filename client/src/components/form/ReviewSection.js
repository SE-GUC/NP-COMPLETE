import React, { Component } from 'react'
import ReviewField from './ReviewField'

class ReviewSection extends Component {
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
        return <ReviewField form={this.props.form} index={i} fields={fields} edit={this.props.edit} oldData={this.state.oldData} number={this.props.number} change={this.props.change} />
      })
    )
  }
}

export default ReviewSection
