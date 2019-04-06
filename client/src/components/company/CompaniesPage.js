import React, { Component } from 'react'
import CompanyItem from './CompanyItem'
import PropTypes from 'prop-types'

class CompaniesPage extends Component {
  render () {
    return this.props.companies.map(com => (
     <CompanyItem key={com._id} com={com}/>

    ))
  }
}

CompaniesPage.propTypes = {
  companies: PropTypes.array
}

export default CompaniesPage
