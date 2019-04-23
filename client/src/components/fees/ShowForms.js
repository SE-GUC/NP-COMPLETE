import React, * as react from 'react'
import FormCard from './FormCard'
export class ShowForms extends react.Component {
  render () {
    return (
      this.props.cases.map(company => {
        return <FormCard data = {company} chooseForm={this.props.chooseForm} />
      })
    )
  }
}
export default ShowForms
