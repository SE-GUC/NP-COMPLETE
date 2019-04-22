import React, * as react from 'react'
import LawyerCaseCard from './LawyerCaseCard'
export class LawyerMapCases extends react.Component {
  render () {
    return (
      this.props.cases.map(company => {
        return <LawyerCaseCard data = {company} />
      })
    )
  }
}
export default LawyerMapCases
