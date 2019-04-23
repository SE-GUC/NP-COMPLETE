import React, * as react from 'react'
import CaseCard from './CaseCard'
export class MapCases extends react.Component {
  render () {
    return (
      this.props.cases.map(company => {
        console.log(`Lawyer: ${company.form.filledByLawyer} walk in: ${this.props.walkIn}`)
        if (company.form.filledByLawyer === this.props.walkIn) {
          return <CaseCard data={company} />
        }
      })
    )
  }
}
export default MapCases
