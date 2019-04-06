import React, { Component } from 'react'
import CompanyItem from './CompanyItem'
import PropTypes from 'prop-types'

class CompaniesPage extends Component {
  render () {
    if (this.props.companies.length === 0) {
      return <h1> No companies established yet</h1>
    }
    return this.props.companies.map(com => (
      <CompanyItem key={com._id} com={com} />

    ))
  }
}

CompaniesPage.propTypes = {
  companies: PropTypes.array
}

export default CompaniesPage
