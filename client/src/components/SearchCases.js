import React, * as react from 'react'
import CaseCardSearch from './CaseCardSearch'
export class SearchCases extends react.Component {
  render () {
    return (
      this.props.cases.map(company => {
        return <CaseCardSearch data={company} />
      })
    )
  }
}
export default SearchCases
