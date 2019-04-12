import React, * as react from 'react'
import CaseCard from './CaseCard'
export class MapCases extends react.Component {
  render () {
    return (
      this.props.cases.map(company => {
        return <CaseCard data={company}/>
      })
    )
  }
}
export default MapCases