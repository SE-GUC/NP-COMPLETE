import React, * as react from 'react'
import ReviewerCaseCard from './ReviewerCaseCard'
export class ReviewerMapCases extends react.Component {
  render () {
    return (
      this.props.cases.map(company => {
        return <ReviewerCaseCard data = {company} />
      })
    )
  }
}
export default ReviewerMapCases
